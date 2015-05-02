
/**
 * CharSprite class handles the character sprite.
 *
 * @class
 * @extends domain.common.Sprite
 */
domain.common.CharSprite = subclass(domain.common.Sprite, function (pt) {
    'use strict';

    var defaultSpeechTimeout = 5000;

    /** sprite's x coordinate value */
    pt.x = 0;

    /** sprite's y coordinate value */
    pt.y = 0;

    /** sprite's width */
    pt.w = 0;

    /** sprite's width */
    pt.h = 0;

    /** sprite's image when going up */
    pt.upImage = '';

    /** sprite's image when going down */
    pt.downImage = '';

    /** sprite's image when going left */
    pt.leftImage = '';

    /** sprite's image when going right */
    pt.rightImage = '';


    /** the css class for <img /> of the sprite */
    pt.cssClass = 'sprite';


    /**
     * @constructor
     * @param {datadomain.Character} character The character
     */
    pt.constructor = function (elem) {

        this.$dom = elem;
        this.elem = elem;

        this.character = elem.data('character');
        this.characterRepository = new datadomain.CharacterRepository();

    };


    /**
     * Loads the data from the persistent layer.
     *
     * @return {Promise}
     */
    pt.load = function () {

        var that = this;

        console.log(this);

        return this.__loaded = this.characterRepository.getById(this.id).then(function (character) {

            that.character = character;

            return that;

        });

    };


    /**
     * Returns the promise which resolves when finishied loading.
     *
     * @return {Promise}
     */
    pt.loaded = function () {

        return this.__loaded;

    };


    /**
     * Gets the CharPosition object.
     *
     * @return {datadomain.CharPosition}
     */
    pt.getPosition = function () {

        return this.character.position;

    };


    /**
     * Sets the CharPosition object.
     */
    pt.setPosition = function (position) {

        this.character.position = position;

        return this.save();

    };


    /**
     * Sets the character's floorObjectId
     *
     * @param {String} floorObjectId The floor object id
     */
    pt.setFloorObjectId = function (floorObjectId) {

        this.character.position.floorObjectId = floorObjectId;

        return this.save();

    };


    /**
     * Synchronize current state of the character into the localStorage.
     */
    pt.save = function () {

        var that = this;

        return this.characterRepository.save(this.character).then(function () {

            return that;

        });

    };


    /**
     * Creates the dom of the character.
     *
     * @return {jQuery}
     */
    pt.setupDom = function () {

        return this.elem.addClass(this.cssClass).width(this.w).height(this.h).offset({
            // the center of bottom line of the image is the sprite's center.
            left: this.leftLimit(),
            top: this.y - this.h
        }).attr('src', this.downImage || this.image);

    };

    /**
     * Changes the direction the character currently heading for.
     *
     * @param {String} dir The direction (one of up, down, left or right)
     */
    pt.turn = function (dir) {
        var img;

        switch (dir) {
            case 'up': img = this.upImage; break;
            case 'down': img = this.downImage || this.image; break;
            case 'left': img = this.leftImage; break;
            case 'right': img = this.rightImage; break;
        }

        this.$dom.attr('src', img);
    };


    pt.getDirection = function (coordinate, to) {
        if (coordinate === 'x') {
            if (to > this.x) {
                return 'right';
            } else {
                return 'left';
            }
        } else {
            if (to > this.y) {
                return 'down';
            } else {
                return 'up';
            }
        }
    };

    pt.moveTo = function (coordinate, to, dur) {

        var dir = this.getDirection(coordinate, to);

        this.turn(dir);

        this.setDuration(dur);

        if (dir === 'up' || dir === 'down') {
            this.moveToY(dir, to);
        } else {
            this.moveToX(dir, to);
        }

        return wait(dur);
    };


    /**
     * Returns right limit x value.
     *
     * @return {Number} x value of the right limit of sprite
     */
    pt.rightLimit = function () {
        return this.x + this.w / 2;
    };

    /**
     * Returns left limit x value.
     *
     * @return {Number} x value of the left limit of sprite
     */
    pt.leftLimit = function () {
        return this.x - this.w / 2;
    };

    pt.moveToY = function (dir, to) {
        var offset = this.getOffset();

        this.y = to;

        offset.top = to - this.h; // the center of bottom line is the sprite's coordinate.

        this.setOffset(offset);
    };

    pt.moveToX = function (dir, to) {
        var offset = this.getOffset();

        this.x = to;

        offset.left = to - this.w / 2; // the center of bottom line is the sprite's coordinate.

        this.setOffset(offset);
    };

    pt.speak = function (speech, opts) {

        opts = opts || {};

        var cancelDom = opts.cancelDom || this.$dom;
        var timeout = opts.timeout || defaultSpeechTimeout;

        var bubbleShown = this.$dom.speechBubble(speech, {

            width: $(window).width() * 0.8,
            height: 50,
            color: '#328DE5',
            cssClass: this.name + '-speech',
            partitionY: 2,
            partitionX: 10,
            duration: 600

        }).show();

        this.speechEndPromise = bubbleShown.then(function (sb) {

            return new Promise(function (resolve) {

                setTimeout(resolve, timeout);

                $(cancelDom).one('click touchstart', resolve);

            }).then(function () {

                $(cancelDom).off('click touchstart');

                return sb.hide();

            });
        });

        return bubbleShown;

    };

});
