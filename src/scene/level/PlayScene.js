/**
 * PlayScene controlls the main playing scene of the level page.
 *
 * @class
 * @extends domain.common.Role
 */
scene.level.PlayScene = subclass(scene.level.Context, function (pt, parent) {
    'use strict'

    /**
     * The entry point
     */
    pt.main = function () {

        parent.main.apply(this, arguments)

    }.event('main.play-scene')

    /**
     * Sets up the components.
     */
    pt.setUp = function () {

        var layout = new scene.level.PlaySceneLayout()

        this.character = this.getCharacter().character
        this.level = this.elem.cc.get('intro-scene').level

        // models
        this.cells = this.elem.cc.get('cell-collection')
        this.cells.setGrid(layout.playGrid())
        this.cells.loadFromObjectList(this.level.cells.cells)

        this.getField().setRect(layout.fieldRect())

        // services
        this.fps = new domain.level.FusionPreparationService(layout.evalRoomGrid())
        this.fusionService = this.elem.cc.get('fusion-service').setGrid(layout.fusionBoxGrid())
        this.exitQueue = new domain.level.ExitQueue(layout.queueGrid())

        // ball move service
        this.bms = new domain.level.BallMoveMobLeaveService(this.getBall(), this.cells)

        // init scoreboard dimension
        this.getScoreboard().setRect(layout.scoreboardRect())

    }

    /**
     * Records the stream of the directions.
     *
     * @param {Rx.Observable<String>} dirs
     */
    pt.recordDirStream = function (dirStream) {

        var self = this

        dirStream.forEach(function (dir) {

            self.character.playingState.add(dir)

            self.character.savePlayingState()

        })

    }

    /**
     * Hooks the playing state bump to the stream
     *
     * @param {Rx.Observable} stream The stream
     * @return {Rx.Observable}
     */
    pt.hookPlayingStateBumping = function (stream) {

        var self = this

        return stream.filter(function () {

            self.character.playingState.bump()

            return true

        })

    }

    /**
     * Binds event handlers to the stream.
     *
     * @param {Rx.Observable} dirStream The stream of directions
     * @return {Promise}
     */
    pt.playLoop = function (dirStream) {

        var cellStream = this.bms.processDirStream(dirStream)

        var fusionPairStream = this.fps.processCellStream(cellStream)

        fusionPairStream = this.getScoreboard().hookToFusionPairStream(fusionPairStream)

        var newCellStream = this.fusionService.processFusionPairStream(fusionPairStream)

        var releasedCellStream = this.exitQueue.processNewCellStream(newCellStream)

        releasedCellStream = this.hookPlayingStateBumping(releasedCellStream)

        return this.cells.processCellStream(releasedCellStream).getPromise()

    }

    /**
     * Replays the saved playing state.
     *
     * @return {Promise}
     */
    pt.replayRounds = function () {

        var self = this

        return this.character.playingState.rounds.reduce(function (promise, round) {

            return promise.then(function () {

                var dirs = round.map(function (dir, i) { return wait(i * 180, dir) })

                return self.playLoop(dirs.toFlatStream())

            })

        }, Promise.resolve())

    }

    /**
     * @return {Promise}
     */
    pt.userPlay = function () {

        var userDirStream = this.getUserSwipeStream()

        this.recordDirStream(userDirStream)

        return this.playLoop(userDirStream)

    }

    /**
     * Starts the scene.
     *
     * @return {Promise}
     */
    pt.start = function () {

        var that = this

        this.getScoreboard().show()
        this.getMenuButton().show()

        return this.getField().show().then(function () {

            return that.getCharacter().speechEndPromise

        }).then(function () {

            return that.character.reloadPlayingState()

        }).then(function () {

            return that.cells.appear()

        }).then(function () {

            return that.replayRounds()

        }).then(function () {

            return that.userPlay()

        }).then(function () {

            return that.removeSwipeField()

        }).then(function () {

            that.elem.trigger('finish.play-scene')

        })

    }

    /**
     * Gets the stream of direction symbols from the user's swipe operation.
     *
     * @return {Rx.Observable}
     */
    pt.getUserSwipeStream = function () {

        var field = $('.swipe-field')

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
    pt.removeSwipeField = function () {

        $('.swipe-field').remove()

    }

    /**
     * Ends the playing scene, clear playing data, and kicks the next scene.
     *
     * @param {Boolean} playerWon True if the player won the game
     */
    pt.finish = function (e, playerWon) {

        this.character.clearPlayingState()

        this.elem.trigger(playerWon ? 'play-scene-success' : 'play-scene-failure')

    }.event('finish.play-scene')

})

$.cc.assign('play-scene', scene.level.PlayScene)
