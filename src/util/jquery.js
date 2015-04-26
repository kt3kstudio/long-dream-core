/**
 * jQuery class
 *
 * @class jQuery
 */
(function ($) {
    'use strict';


    /**
     * Performs the animation.
     *
     * @param {String} animation The css animation
     */
    $.fn.animation = function (animation) {
        this.css('-webkit-animation', '').reflow().css('-webkit-animation', animation);

        return this;
    };

    /**
     * Reflows the dom.
     */
    $.fn.reflow = function () {
        $(this).size($(this).size());

        return this;
    };

    /**
     * Performs the animation in the duration and returns a promise.
     *
     * @param {String} animation The animation name
     * @param {Number} dur The duration of the animation
     * @return {Promise}
     */
    $.fn.anim = function (animation, dur) {
        this.animation(animation + ' ' + dur + 'ms');

        return wait(dur, this);
    };


    /**
     * Binds event once and returns promise.
     *
     * @param {String} events The list of events names
     * @return {Promise}
     */
    $.fn.once = function (events) {
        var that = this;

        return new Promise(function (resolve) {

            that.one(events, function (event) {

                resolve(event);

            });

        });
    };

    /**
     * Returns Observable of an event stream.
     *
     * @param {String} events The list of event names
     * @return {Rx.Observable}
     */
    $.fn.streamOf = function (events) {
        return Rx.Observable.fromEvent(this, events);
    };


    /**
     * Assign a class as the defining class of the custom html class.
     *
     *
     * @param {String} name The name of the custom class
     * @param {Function} definingClass The definig class
     */
    $.assignClass = function (name, definingClass) {

        $.registerCustomClass(name, function (elem) {

            new definingClass(elem);

        });

    };

}(window.jQuery));
