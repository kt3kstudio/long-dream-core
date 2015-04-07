

/**
 * Staircase class represents the staircases in the map view.
 */
domain.map.Staircase = subclass(domain.map.WallObject, function (pt) {
    'use strict';

    pt.constructor = function (id, to, type) {
        this.id = id;
        this.to = to;
        this.type = type;
    };

    /**
     * Creates a Staircase from the FloorObject.
     *
     * @param {datadomain.FloorObject} obj The FloorObject
     * @return {domain.map.Staircase}
     */
    pt.constructor.createFromObject = function (obj) {

        var factory = new datadomain.CharPositionFactory();

        return new pt.constructor(

            obj.id,
            factory.createFromObject(obj.opts.to),
            obj.opts.type

        ).setPos(obj.offset).setSize(obj.size);
    };

    pt.createDom = function () {
        var that = this;

        this.$dom = $('<div />').addClass('staircase staircase-' + this.type);

        this.$dom.on('click touchstart', function () {

            that.cls.moveToWallObjectByName(that.id).then(function () {

                return that.cls.chr.setPosition(that.to);

            }).then(function () {

                return window.ms.reload();

            });

        });

        return this.$dom;
    };

});
