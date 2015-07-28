/**
 * The factory class of the dimensions of various object on level scene.
 *
 * @class
 */
domain.level.DimensionFactory = (function () {
    'use strict';

    var TOP_UI_HEIGHT = 50; // the height of the score board at the top
    var BOTTOM_UI_HEIGHT = 50; // the height of the banner ad at the bottom of the screen

    // height / width
    var PLAY_FIELD_RATIO = 6 / 4;

    var exports = function () {
        this.calc();
    };

    var posPt = exports.prototype;

    posPt.calcAvailableArea = function () {
        var w = this.width = $(window).width();
        var h = this.height = $(window).height();

        this.availableHeight = h - TOP_UI_HEIGHT - BOTTOM_UI_HEIGHT;
        this.availableWidth = w;
    };

    posPt.calcBestArea = function () {
        this.calcAvailableArea();

        if (this.availableWidth * PLAY_FIELD_RATIO > this.availableHeight) {

            // height dominant screen
            this.bestWidth = this.availableHeight / PLAY_FIELD_RATIO;
            this.bestHeight = this.availableHeight;
        } else {

            // width dominant screen
            this.bestWidth = this.availableWidth;
            this.bestHeight = this.availableWidth * PLAY_FIELD_RATIO;
        }
    };

    posPt.calcLeft = function () {
        this.left = (this.width - this.bestWidth) / 2;
    };

    posPt.calc = function () {
        this.calcBestArea();
        this.calcLeft();

        this.UNIT = this.bestWidth / 4;
        this.LEFT = this.left + this.UNIT / 2;
        this.TOP = TOP_UI_HEIGHT;
    };

    posPt.topUIPosition = function () {
        return {top: 0, left: this.left};
    };

    posPt.gridPosition = function (x, y, w) {
        var u = this.UNIT;

        return {top: this.TOP + u * y, left: this.LEFT + u * x, unit: u, width: u * w};
    };

    posPt.fieldPosition = function () {
        return this.gridPosition(0, 2, 3);
    };

    posPt.evalRoomPosition = function () {
        return this.gridPosition(0, 1, 2);
    };

    posPt.leftDoorPosition = function () {
        return this.gridPosition(0, 0, 1);
    };

    posPt.rightDoorPosition = function () {
        return this.gridPosition(2, 1, 1);
    };

    posPt.queuePosition = function () {
        var pos = this.gridPosition(1, 0, 1);

        pos.unit /= 2;
        pos.left -= pos.unit / 4;

        return pos;
    };

    posPt.fusionBoxPosition = function () {
        var pos = this.gridPosition(1, 1, 1);

        pos.unit /= 1.5;
        pos.left -= pos.unit / 4;

        return pos;
    };

    posPt.paperPosition = function () {
        return {left: this.width / 2, top: this.TOP + this.UNIT * 4};
    };

    posPt.resultPanePosition = function () {
        var pos = this.gridPosition(0, 2, 3);

        pos.left = 15;

        pos.height = pos.width;
        pos.width = this.width;

        pos.width -= pos.left * 2;

        return pos;
    };

    /**
     * Returns the dimension for the scoreboard.
     *
     * @return {Dimension}
     */
    posPt.scoreboardDimension = function () {
        return {
            left: this.left,
            top: 0,
            width: this.bestWidth / 2,
            height: TOP_UI_HEIGHT
        };
    };

    return exports;

}());
