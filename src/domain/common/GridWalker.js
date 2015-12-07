/**
 * A GridWalker is a DimensionalBeing which walks along the given Grid.
 */
domain.common.GridWalker = subclass(domain.common.DimensionalBeing, function (pt) {
    'use strict'

    /**
     * @override
     * @property
     */
    pt.ratioX = 0.5

    /**
     * @override
     * @property
     */
    pt.ratioY = 0.5

    /**
     * @property {Number} m The horizontal grid position
     */
    pt.m = 0

    /**
     * @property {Number} n The vertical grid position
     */
    pt.n = 0

    /**
     * @property {Number} cellRatioX The ratio of how much the grid walker occupies the given cell width (default: 1)
     */
    pt.cellRatioX = 1

    /**
     * @property {Number} cellRatioX The ratio of how much the grid walker occupies the given cell height (default: 1)
     */
    pt.cellRatioY = 1

    /**
     * @override
     */
    pt.willShow = function () {

        return this.fitToGrid()

    }

    /**
     * Sets
     * @param {domain.common.Grid} grid The grid layout info
     * @param {Number} [m] The horizontal grid position
     * @param {Number} [n] The vertical grid position
     */
    pt.setGrid = function (grid, m, n) {

        this.grid = grid

        this.setGridPosition(m, n)

    }

    /**
     * Sets the grid position.
     *
     * @param {Number} [m] The horizontal grid position
     * @param {Number} [n] The vertical grid position
     */
    pt.setGridPosition = function (m, n) {

        if (typeof m === 'number') {

            this.m = m

        }

        if (typeof n === 'number') {

            this.n = n

        }

    }

    /**
     * Updates the element's dom state using the current grid state info.
     *
     * @return {Promise}
     */
    pt.updateElemOnGrid = function () {

        this.x = this.grid.getX(this.m)
        this.y = this.grid.getY(this.n)

        return this.updateElem()

    }

    /**
     * Fits the dimension into the (grid.cellWidth, grid.cellHeight) and moves to the current grid position.
     *
     * @return {Promise}
     */
    pt.fitToGrid = function () {

        this.dimension.fitInto(this.grid.cellWidth * this.cellRatioX, this.grid.cellHeight * this.cellRatioY)

        return this.updateElemOnGrid()

    }

    /**
     * Moves to the horizontal grid positon m.
     *
     * @param {Number} m The horizontal grid position
     * @return {Promise}
     */
    pt.moveToM = function (m) {

        this.x = this.grid.getX(this.m = m)

        return this.updateElem()

    }

    /**
     * Moves to the vertical grid position n.
     *
     * @param {Number} n The vertical grid position
     * @return {Promise}
     */
    pt.moveToN = function (n) {

        this.y = this.grid.getY(this.n = n)

        return this.updateElem()

    }

    /**
     * Moves to the given grid position.
     *
     * @param {Number} m The horizontal grid position
     * @param {Number} n The vertical grid position
     * @return {Promise}
     */
    pt.moveToGridPosition = function (m, n) {

        this.setGridPosition(m, n)

        return this.updateElemOnGrid()

    }

    /**
     * Moves along the grid.
     *
     * @param {Number} diffM The move distance along the horizontal line
     * @param {Number} diffN The move distance along the vertical line
     * @return {Promise}
     */
    pt.moveOnGrid = function (distM, distN) {

        return this.moveToGridPosition(this.m + distM, this.n + distN)

    }

    /**
     * Moves a unit upward along the grid.
     *
     * @return {Promise}
     */
    pt.moveUpOnGrid = function () { return this.moveOnGrid(0, -1) }

    /**
     * Moves a unit upward along the grid.
     *
     * @return {Promise}
     */
    pt.moveRightOnGrid = function () { return this.moveOnGrid(1, 0) }

    /**
     * Moves a unit upward along the grid.
     *
     * @return {Promise}
     */
    pt.moveDownOnGrid = function () { return this.moveOnGrid(0, 1) }

    /**
     * Moves a unit upward along the grid.
     *
     * @return {Promise}
     */
    pt.moveLeftOnGrid = function () { return this.moveOnGrid(-1, 0) }

})