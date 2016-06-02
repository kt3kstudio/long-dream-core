import Context from './context'
import PlaySceneLayout from './layout/play-scene-layout'
import {wait} from 'spn'
import FusionPreparationService from './component/fusion-preparation-service'
import BallMoveMobLeaveService from './component/ball-move-mob-leave-service'
import ExitQueue from './component/exit-queue'

const {component, event, trigger} = $.cc

/**
 * PlayScene controlls the main playing scene of the level page.
 */
@component('play-scene')
class PlayScene extends Context {
    /**
     * The entry point
     */
    @event('intro-scene.finished')
    main() { super.main() }

    /**
     * Sets up the components.
     */
    setUp() {
        const layout = new PlaySceneLayout()

        this.character = this.getCharacter().character
        this.level = this.introScene().level

        this.cells().setGrid(layout.playGrid())
        this.cells().loadFromObjectList(this.level.cells.cells)

        this.getField().setRect(layout.fieldRect())

        // services
        this.fps = new FusionPreparationService(layout.evalRoomGrid())
        this.fusionService().setGrid(layout.fusionBoxGrid())
        this.exitQueue = new ExitQueue(layout.queueGrid())

        // ball move service
        this.bms = new BallMoveMobLeaveService(this.getBall(), this.cells())

        // init scoreboard dimension
        this.getScoreboard().setRect(layout.scoreboardRect())

        // sets goal-panel dimension
        this.goalPanel().setRect(layout.goalPanelRect())
    }

    /**
     * Records the stream of the directions.
     * @param {Rx.Observable<String>} dirs
     */
    recordDirStream(dirStream) {
        dirStream.forEach(dir => {
            this.character.playingState.add(dir)

            this.character.savePlayingState()
        })
    }

    /**
     * Hooks the playing state bump to the stream
     *
     * @param {Rx.Observable} stream The stream
     * @return {Rx.Observable}
     */
    hookPlayingStateBumping(stream) {
        return stream.filter(() => {
            this.character.playingState.bump()

            return true
        })
    }

    /**
     * Binds event handlers to the stream.
     * @param {Rx.Observable} dirStream The stream of directions
     * @return {Promise}
     */
    playLoop(dirStream) {
        const cellStream = this.bms.processDirStream(dirStream)

        let fusionPairStream = this.fps.processCellStream(cellStream)

        fusionPairStream = this.getScoreboard().hookToFusionPairStream(fusionPairStream)

        const newCellStream = this.fusionService().processFusionPairStream(fusionPairStream)

        let releasedCellStream = this.exitQueue.processNewCellStream(newCellStream)

        releasedCellStream = this.hookPlayingStateBumping(releasedCellStream)

        return this.cells().processCellStream(releasedCellStream).getPromise()
    }

    /**
     * Replays the saved playing state.
     * @return {Promise}
     */
    replayRounds() {
        return this.character.playingState.rounds.reduce((promise, round) =>
            promise.then(() =>
                this.playLoop(round.map((dir, i) => wait(i * 180, dir)).toFlatStream())
            ), Promise.resolve()
        )
    }

    /**
     * @return {Promise}
     */
    userPlay() {
        const userDirStream = this.getUserSwipeStream()

        this.recordDirStream(userDirStream)

        return this.playLoop(userDirStream)
    }

    /**
     * Starts the scene.
     *
     * @return {Promise}
     */
    @trigger(null, 'play-scene.finished')
    start() {
        this.getMenuButton().show()

        return this.getField().show()

        .then(() => this.getCharacter().speechEndPromise)

        .then(() => this.character.reloadPlayingState())

        .then(() => Promise.all(this.residents('moo').map(moo => moo.hide())))

        .then(() => this.cells().appear())

        .then(() => this.getScoreboard().show())

        .then(() => this.goalPanel().show())

        .then(() => this.replayRounds())

        .then(() => this.userPlay())

        .then(() => this.removeSwipeField())
    }

    /**
     * Gets the stream of direction symbols from the user's swipe operation.
     *
     * @return {Rx.Observable}
     */
    getUserSwipeStream() {
        const field = $('.swipe-field')

        return Rx.Observable.merge(
            field.streamOf('swipeup').map('up'),
            field.streamOf('swipedown').map('down'),
            field.streamOf('swipeleft').map('left'),
            field.streamOf('swiperight').map('right')
        )
    }

    /**
     * Removes the swipe field.
     */
    removeSwipeField() {

        $('.swipe-field').remove()

    }

    /**
     * Ends the playing scene, clear playing data, and kicks the next scene.
     *
     * @param {Event} e The event object (unused)
     * @param {Boolean} playerWon True if the player won the game
     */
    @event('play-scene.finished')
    finish(e, playerWon) {

        this.character.clearPlayingState()

        this.elem.trigger(playerWon ? 'play-scene.won' : 'play-scene.failed')

    }

}

module.exports = PlayScene
