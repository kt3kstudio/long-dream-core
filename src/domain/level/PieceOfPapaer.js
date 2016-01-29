import {Animation} from 'spn'

/**
 * PieceOfPaper represents a piece of paper which is on the floor of each room (obsolete).
 *
 * @class
 * @extends domain.common.CharSprite
 */
domain.level.Paper = subclass(domain.common.StaticSprite, function (pt) {
    'use strict'

    pt.width = () => 50
    pt.height = () => 50

    pt.image = 'images/paper.svg'

    pt.showAnim = () => new Animation('paper-appear', 500)

    pt.hideAnim = () => new Animation('paper-disappear', 500)

})

$.cc.assign('paper', domain.level.Paper)
