domain.level.Ball=function(){"use strict";var t=300,e=3,i=function(t,e,i){this.x=e.x,this.y=e.y,this.dimension=t,this.setParent(i)},n=i.prototype=new domain.common.Sprite;return n.maxX=e,n.maxY=e,n.createDom=function(){return this.$dom=$($("#tpl-ball").text()).css({width:this.dimension.unit+"px",height:this.dimension.unit+"px"}),this.locate(),this.$dom},n.appearAnim="ball-appear",n.appearDur=t,n.disappearAnim="ball-disappear",n.disappearDur=t,n.locateDur=t,n.move=function(t){return this.setPos(this.posAhead(t))},n.pos=function(){return{x:this.x,y:this.y}},n.posAhead=function(t){switch(t){case"up":return this.relativePos(0,-1);case"down":return this.relativePos(0,1);case"left":return this.relativePos(-1,0);case"right":return this.relativePos(1,0)}},n.relativePos=function(t,e){return{x:(this.x+t+this.maxX)%this.maxX,y:(this.y+e+this.maxY)%this.maxY}},n.setPos=function(t){return this.x=t.x,this.y=t.y,this.locate()},n.locate=function(){return this.$dom.css("top",this.dimension.top+this.y*this.dimension.unit+"px"),this.$dom.css("left",this.dimension.left+this.x*this.dimension.unit+"px"),wait(this.locateDur)},n.refuseToMove=function(t){return"up"===t||"down"===t?this.$dom.anim("ball-refuse-y",this.locateDur):this.$dom.anim("ball-refuse-x",this.locateDur)},i}(),domain.level.BallMoveMobLeaveService=function(){"use strict";var t=function(t,e){this.ball=t,this.mobs=new i(e),this.pmds=new domain.level.PossibleMoveDetectionService(this.ball,e)},e=t.prototype;e.ballMoveAndLeaveOne=function(t){var e=this.ball.posAhead(t);return null==this.mobs.find(e)?(this.ball.refuseToMove(t),null):(this.ball.move(t),this.leaveAtPos(e))},e.leaveLastOneAtBall=function(){return this.mobs.leave(this.ball.pos()).setLastOne()},e.leaveAtPos=function(t){var e=this,i=this.mobs.leave(t);return this.pmds.possible()?i:(console.log("no more move!"),this.pmds.cellRemainsAtBall()?(console.log("cell remains at ball"),[i,wait(600).then(function(){return e.leaveLastOneAtBall()})].toFlatStream()):(console.log("no cell left"),i.setLastOne()))};var i=function(t){this.cells=t},n=i.prototype;return n.isEmpty=function(){return this.cells.isEmpty()},n.leave=function(t){var e=this.cells.select(t);return this.cells.remove(e),e=e[0],this.cells.selectRange(t).forEach(function(t){t.up()}),e},n.find=function(t){return this.cells.find(t)},t}(),domain.level.Cell=function(){"use strict";var t=function(e,i){this.setGene(e),this.setTransitionDuration(300),this.parent=i||"body",this.__isLastOne=!1,this.__isEvolved=!1,t.allList.push(this)};t.allList=[],t.disappear=function(){var e=Promise.resolve();return t.allList.forEach(function(t){e=e.then(function(){return t.disappear(),wait(10)})}),e.then(function(){return wait(500)})};var e=t.prototype;return e.setDimension=function(t){return this.dimension=t,this.width=Math.floor(t.unit/2),this.gutter=Math.floor(t.unit/4),this},e.setTransitionDuration=function(t){return this.locateDur=t,this.setTransitionDuration_()},e.setTransitionDuration_=function(){return this.$dom&&this.$dom.css("transition-duration",this.locateDur+"ms"),wait(0,this)},e.setGene=function(t){return this.gene=t,this},e.setXY=function(t){return this.x=t[1],this.y=t[0],this},e.setLastOne=function(){return this.__isLastOne=!0,this},e.unsetLastOne=function(){return this.__isLastOne=!1,this},e.isLastOne=function(){return this.__isLastOne},e.setEvolved=function(){return this.__evolved=!0,this},e.unsetEvolved=function(){return this.__evolved=!1,this},e.isEvolved=function(){return this.__evolved},e.selectImage=function(){if("f"===this.gene)return"images/neef.svg";if("m"===this.gene)return"images/nim.svg";var t=domain.common.BomTable[this.gene.length];return"images/"+t+".svg"},e.createDom=function(){var t=this;if(this.$dom)return this.$dom;var e=this.$dom=$('<object type="image/svg+xml" />').css({position:"absolute",width:this.width+"px",height:this.width+"px"});return e.attr("data",this.selectImage()).prependTo(this.parent),this.$dom.once("load").then(function(){t.setTransitionDuration_(),t.locate();for(var i=t.gene.split(""),n=$(t.$dom[0].contentDocument),s=0;s<i.length;s++)$("#"+s,n).attr("class",i[s]);return e})},e.remorph=function(){this.$dom.css({width:this.width+"px",height:this.width+"px"})},e.appearDur=500,e.appear=function(){var t=this;return Promise.resolve(this.createDom()).then(function(){return t.remorph(),Promise.all([t.locate(),t.$dom.anim("bom-appear",t.appearDur)])}).then(function(){return t})},e.disappearDur=500,e.disappear=function(){var t=this;return this.$dom.css("visibility","hidden"),this.$dom.anim("bom-disappear",this.disappearDur).then(function(){t.remove()})},e.locate=function(){return this.$dom.css("top",this.dimension.top+this.dimension.unit*this.y+this.gutter+"px"),this.$dom.css("left",this.dimension.left+this.dimension.unit*this.x+this.gutter+"px"),wait(this.locateDur,this)},e.remove=function(){this.$dom.remove(),t.allList.splice(t.allList.indexOf(this),1)},e.move=function(t,e){return this.x+=t,this.y+=e,this.locate()},e.up=function(){return this.move(0,-1)},e.down=function(){return this.move(0,1)},e.left=function(){return this.move(-1,0)},e.right=function(){return this.move(1,0)},e.toObject=function(){return{gene:this.gene}},t}(),domain.level.ExitQueue=function(){"use strict";var t=function(t){this.dimension=t,this.queue=[]},e=t.prototype;e.enqueue=function(t){var e=this;return this.involve(new i(t)).then(function(){return e.goForward()})},e.releaseCells=function(){return this.queue.splice(0).map(function(t){return t.cell})},e.goForward=function(){var t=200/this.queue.length;return this.queue.map(function(e,i){return e.goForward(),wait(i*t).then(function(){return e.locate()})}).pop()},e.involve=function(t){return this.queue.push(t),t.goOrigin().setDimension(this.dimension).setTransitionDuration(600)},e.reset=function(){this.queue=[]};var i=function(t){this.cell=t},n=i.prototype;return n.goForward=function(){return this.cell.x<4?this.cell.x+=1:this.cell.y+=1,this},n.locate=function(){return this.cell.locate()},n.remove=function(){this.cell.remove()},n.goOrigin=function(){return this.cell.x=-1,this.cell.y=0,this},n.setTransitionDuration=function(t){return this.cell.setTransitionDuration(t)},n.setDimension=function(t){return this.cell.setDimension(t),this},t}(),domain.level.Field=function(){"use strict";var t=200,e=function(e){var i=6;this.left=e.left-i,this.top=e.top-i,this.unit=e.unit,this.width=e.width+2*i,this.dur=t},i=e.prototype;return i.appear=function(){var t=this;return loadImage("images/field.svg","field-grid",document.body).then(function(e){return t.$dom=e,e.css("left",t.left+"px"),e.css("top",t.top+"px"),e.css("width",t.width+"px"),e.anim("field-appear",t.dur)})},i.disappear=function(){var t=this;return this.$dom.anim("field-disappear",400).then(function(){t.$dom.remove()})},e}(),domain.level.FieldCells=function(){"use strict";var t=function(t,e){this.cells=[],this.$dom=$(e),this.dimension=t},e=t.prototype;return e.createCellFromObject=function(t){return new domain.level.Cell(t.gene,this.$dom).setDimension(this.dimension)},e.isEmpty=function(){return 0===this.cells.length},e.loadFromObjectList=function(t){var e=(new util.FieldIndexGenerator).generate(t.length,this.usedIndices());return t.forEach(function(t,i){this.push(this.createCellFromObject(t).setXY(e[i]))},this),this},e.loadList=function(t){var e=(new util.FieldIndexGenerator).generate(t.length,this.usedIndices());return t.forEach(function(t,i){t.setXY(e[i]).setDimension(this.dimension).unsetLastOne(),this.push(t)},this),this},e.push=function(t){this.cells.push(t)},e.appear=function(){return this.cells.map(function(t,e){return wait(56*e).then(function(){t.appear()})}).pop()},e.commandAll=function(t,e){this.cells.forEach(function(i){i[t](e)})},e.select=function(t){return this.cells.filter(function(e){return e.x===t.x&&e.y===t.y})},e.find=function(t){var e=this.select(t);return 0===e.length?null:e[0]},e.selectRange=function(t){return this.cells.filter(function(e){return e.x===t.x&&e.y>t.y})},e.remove=function(t){this.cells=this.cells.filter(function(e){return t.indexOf(e)<0})},e.usedIndices=function(){return this.cells.map(function(t){return[t.x,t.y]})},e.toJSON=function(t){return JSON.stringify(this.toArray(),null,t)},e.toArray=function(){var t=(new util.FieldIndexGenerator).generate(this.cells.length);return t.map(function(t){return this.find({x:t[1],y:t[0]}).toObject()},this)},t}(),domain.level.FusionPair=function(){"use strict";var t=function(t,e){this.left=t,this.right=e},e=function(t){return t?t.gene:""},i=function(t){return t?t.isLastOne():!1},n=t.prototype;n.newGene=function(){return this.__newGene__=this.__newGene__||s(this.leftGene(),this.rightGene()),this.__newGene__},n.isEvolving=function(){return this.newGene().length>Math.max(this.leftGene().length,this.rightGene().length)},n.isLastOne=function(){return i(this.left)||i(this.right)},n.leftGene=function(){return e(this.left)},n.rightGene=function(){return e(this.right)},n.score=function(){var t=this.newGene().length,e=10*Math.pow(t,2);return this.isLastOne()&&(e*=2),e};var s=function(t,e){return(t+e).replace(/(\w)(\1)/g,"$1")};return t}(),domain.level.FusionPreparationService=function(){"use strict";var t=function(t){this.stack=new i(t)},e=t.prototype;e.take=function(t){return this.stack.push(t),this.stack.isPrepared()?Promise.all(this.stack.getStack()):null};var i=function(t){this.dimension=t,this.stack=[],this.isFinished=!1},n=i.prototype;return n.takeDur=700,n.push=function(t){this.isFinished=t.isLastOne(),this.stack.push(this.locate(t,this.stack.length))},n.locate=function(t,e){return t.setDimension(this.dimension),t.x=e,t.y=0,t.setTransitionDuration(this.takeDur).then(function(){return t.locate()})},n.isPrepared=function(){return this.isFinished||this.isFull()},n.isFull=function(){return this.stack.length>=2},n.getStack=function(){return this.stack.splice(0)},t}(),domain.level.FusionService=function(){"use strict";var t=function(t,e){this.metrics=t,this.$dom=$(e)},e=t.prototype;return e.performFusion=function(t){var e=this;return this.getToReactor(t).then(function(){return e.fusion(t)})},e.getToReactor=function(t){var e=1e3;return t.right&&t.right.$dom.anim("get-to-reactor-right",e).then(function(){return t.right.remove()}),t.left.$dom.anim("get-to-reactor-left",e).then(function(){t.left.remove()})},e.fusion=function(t){var e=600,i=new domain.level.Cell(t.newGene(),this.$dom).setDimension(this.metrics).setXY([0,0]);return t.isLastOne()&&i.setLastOne(),t.isEvolving()&&i.setEvolved(),i.appear(e)},t}(),domain.level.PieceOfPaper=function(){"use strict";var t=function(){},e=t.prototype=new domain.common.CharSprite;return e.x=0,e.y=0,e.w=50,e.h=50,e.image="images/paper.svg",e.cssClass="sprite piece-of-paper",e.appearAnim="paper-appear",e.disappearAnim="paper-disappear",t}(),domain.level.PositionFactory=function(){"use strict";var t=50,e=50,i=1.5,n=function(){this.calc()},s=n.prototype;return s.calcAvailableArea=function(){var i=this.width=$(window).width(),n=this.height=$(window).height();this.availableHeight=n-t-e,this.availableWidth=i},s.calcBestArea=function(){this.calcAvailableArea(),this.availableWidth*i>this.availableHeight?(this.bestWidth=this.availableHeight/i,this.bestHeight=this.availableHeight):(this.bestWidth=this.availableWidth,this.bestHeight=this.availableWidth*i)},s.calcLeft=function(){this.left=(this.width-this.bestWidth)/2},s.calc=function(){this.calcBestArea(),this.calcLeft(),this.UNIT=this.bestWidth/4,this.LEFT=this.left+this.UNIT/2,this.TOP=t},s.topUIPosition=function(){return{top:0,left:this.left}},s.gridPosition=function(t,e,i){var n=this.UNIT;return{top:this.TOP+n*e,left:this.LEFT+n*t,unit:n,width:n*i}},s.fieldPosition=function(){return this.gridPosition(0,2,3)},s.evalRoomPosition=function(){return this.gridPosition(0,1,2)},s.leftDoorPosition=function(){return this.gridPosition(0,0,1)},s.rightDoorPosition=function(){return this.gridPosition(2,1,1)},s.queuePosition=function(){var t=this.gridPosition(1,0,1);return t.unit/=2,t.left-=t.unit/4,t},s.fusionBoxPosition=function(){var t=this.gridPosition(1,1,1);return t.unit/=1.5,t.left-=t.unit/4,t},s.paperPosition=function(){return{left:this.width/2,top:this.TOP+4*this.UNIT}},s.resultPanePosition=function(){var t=this.gridPosition(0,2,3);return t.left=15,t.height=t.width,t.width=this.width,t.width-=2*t.left,t},s.scoreboardDimension=function(){return{left:this.left,top:0,width:this.bestWidth/2,height:t}},n}(),domain.level.PossibleMoveDetectionService=function(){"use strict";var t=function(t,e){this.ball=t,this.cells=e},e=t.prototype;return e.possible=function(){return this.cells.find(this.ball.posAhead("up"))?!0:this.cells.find(this.ball.posAhead("down"))?!0:this.cells.find(this.ball.posAhead("left"))?!0:this.cells.find(this.ball.posAhead("right"))?!0:!1},e.cellRemainsAtBall=function(){return null!=this.cells.find(this.ball.pos())},t}(),scene.level.IntroScene=function(){"use strict";var t=function(t){this.level=t.level,this.pos=new domain.level.PositionFactory,this.paper=new domain.level.PieceOfPaper,this.chr=t.chr,this.ball=new domain.level.Ball(this.pos.fieldPosition(),{x:1,y:1},"#main")},e=t.prototype=new scene.common.Scene;return e.start=function(){var t=this,e=this.pos.paperPosition();this.chr.x=e.left,this.chr.y=800,this.chr.put(),this.paper.x=e.left,this.paper.y=e.top,this.paper.put(),ui.common.BackgroundService.turnWhite(),Promise.resolve().then(function(){return t.chr.moveTo("y",e.top,600)}).then(function(){t.paper.disappear(1e3);var e=$("<p />").text(t.level.goal.toString());return t.chr.speak(e,{cancelDom:".wrapper"})}).then(function(){return t.chr.disappear(1e3),t.ball.appear()}).then(function(){return t.finish()})},t}(),scene.level.LevelLoader=function(){"use strict";var t=function(){this.lvRepo=new datadomain.LevelRepository,this.charPosRepo=new datadomain.CharPositionRepository,this.chr=new domain.common.Ma},e=t.prototype=new scene.common.Scene;return e.start=function(){var t=this;this.getCharPosition().then(function(e){return t.getLevel(e.getLevel())}).then(function(e){t.level=e,t.finish()})},e.getCharPosition=function(){return this.charPosRepo.getCharPosition(this.chr.name)},e.getLevel=function(t){return this.lvRepo.loadByLevel(t)},t}(),scene.level.OutroScene=function(){"use strict";var t=function(t){this.prevScene=t,this.pos=this.prevScene.pos,this.ball=new i(t.ball),this.chr=t.chr,this.field=t.field,this.menuButton=t.menuButton,this.scoreBoard=t.scoreBoard;var e=this.pos.resultPanePosition();this.resPane=new ui.level.ResultPane(e,e.width,e.height,"#main",".wrapper")},e=t.prototype=new scene.common.Scene;e.start=function(){var t=this;return this.resPane.setScore(this.scoreBoard.score),this.resPane.show(3e7).then(function(){return domain.level.Cell.disappear(),t.menuButton.hide(),t.scoreBoard.disappear(),t.field.disappear()}).then(function(){return t.ball.goCenterX()}).then(function(){return t.ball.goCenterY()}).then(function(){return Promise.all([t.chr.appear(400),t.ball.disappear()])}).then(function(){return t.chr.moveTo("y",800,1e3)}).then(function(){return ui.common.BackgroundService.turnBlack()}).then(function(){t.finish()})};var i=function(t){this.ball=t},n=i.prototype;return n.goCenterX=function(){var t=this.ball.pos();return t.x=1,this.ball.setPos(t)},n.goCenterY=function(){var t=this.ball.pos();return t.y=1,this.ball.setPos(t)},n.disappear=function(){return this.ball.disappear()},t}(),scene.level.PlayScene=function(){"use strict";var t=function(t){var e=this.pos=t.pos;this.ball=t.ball,this.level=t.level,this.chr=t.chr;var i=e.fieldPosition(),n=e.evalRoomPosition(),s=e.queuePosition(),r=e.fusionBoxPosition();this.playingState=new datadomain.PlayingState.createInitialState(this.chr.name),this.cells=new domain.level.FieldCells(i,"#main"),this.cells.loadFromObjectList(this.level.cells),this.field=new domain.level.Field(i),this.fps=new domain.level.FusionPreparationService(n),this.fusionService=new domain.level.FusionService(r,"#main"),this.exitQueue=new domain.level.ExitQueue(s),this.bms=new domain.level.BallMoveMobLeaveService(this.ball,this.cells),this.swipe=new ui.level.SwipeEvent(".wrapper"),this.scoreBoard=new ui.level.Scoreboard(e.scoreboardDimension()),this.menuButton=$(".menu-button").menuButton($("#level-menu")),this.fCounter=new debug.FusionCounter},e=t.prototype=new scene.common.Scene;return e.bindEventHandlers=function(t){var e=this;return t.pipe(function(t){return e.playingState.add(t),e.playingState.save(),e.bms.ballMoveAndLeaveOne(t)}).filterNull().pipe(function(t){return e.fps.take(t)}).filterNull().map(function(t){return new domain.level.FusionPair(t[0],t[1])}).pipe(function(t){return e.fCounter.count(t),console.log(e.fCounter.toString()),e.scoreBoard.addScore(t.score()),e.fusionService.performFusion(t)}).pipe(function(t){return e.exitQueue.enqueue(t)}).filter(function(t){return t.isLastOne()}).pipe(function(){return e.playingState.bump(),e.cells.loadList(e.exitQueue.releaseCells()).appear()}).getPromise().then(function(){return wait(500)})},e.start=function(){var t=this;return this.scoreBoard.appear(),this.menuButton.show(),this.field.appear().then(function(){return t.chr.speechEndPromise}).then(function(){return t.playingState.restore()}).then(function(){return t.cells.appear()}).then(function(){return t.playingState.release().reduce(function(e,i){return e.then(function(){var e=i.map(function(t,e){return wait(180*e,t)});return t.bindEventHandlers(e.toFlatStream())})},Promise.resolve())}).then(function(){return console.log("start!"),t.bindEventHandlers(t.swipe.getStream())})},e.resetPlayingState=function(){this.playingState.rounds=[[]],this.playingState.save()},t}(),ui.level.ResultPane=function(){"use strict";var t=function(t,e,i,n,s){this.position=t,this.width=e,this.height=i,this.parent=n,this.cancelDom=s,this.score=0,this.star=0},e=t.prototype;return e.setScore=function(t){this.score=t},e.setStar=function(t){this.star=t},e.createDom=function(){var t=$("<div />").addClass("result-pane").width(this.width).height(this.height).css({left:this.position.left,top:this.position.top,position:"absolute"});return $("<div />").addClass("result-content").text("score = "+this.score).css({opacity:0,position:"relative"}).appendTo(t),t.appendTo(this.parent)},e.show=function(t){var e=this;return this.$dom=this.$dom||this.createDom(),this.ip=this.$dom.infoPane(9,7),this.ip.show().then(function(){return Promise.race([wait(t),$(e.cancelDom).once("click touchstart")])}).then(function(){return e.hide()})},e.hide=function(){return this.ip.hide()},t}(),ui.level.Scoreboard=function(){"use strict";var t=4,e=function(e,i){this.dim=e,this.score=i||0,this.margin=t},i=e.prototype=new domain.common.Sprite;return i.appearAnim="bom-appear",i.appearDur=400,i.disappearAnim="bom-disappear",i.disappearDur=400,i.createDom=function(){return this.$dom=$("<div />").addClass("board scoreboard").offset(this.dim).width(this.dim.width-2*this.margin).height(this.dim.height-2*this.margin).text(this.score),this.$dom},i.update=function(){this.$dom.text(this.score)},i.addScore=function(t){return this.score+=t,this.update(),this},i.setScore=function(t){return this.score=t,this.update(),this},e}(),ui.level.SwipeEvent=function(){"use strict";var t=function(t){this.dom=t},e=t.prototype;return e.createDom=function(){return $(this.dom).swipeCross()},e.getStream=function(){return this.$dom=this.$dom||this.createDom(),this.$document=this.$document||$(document).arrowkeys(),Rx.Observable.merge(this.$dom.streamOf("swipeup").map("up"),this.$dom.streamOf("swipedown").map("down"),this.$dom.streamOf("swipeleft").map("left"),this.$dom.streamOf("swiperight").map("right"),this.$document.streamOf("upkey").map("up"),this.$document.streamOf("downkey").map("down"),this.$document.streamOf("leftkey").map("left"),this.$document.streamOf("rightkey").map("right"))},e.unbind=function(){return this.$dom.swipeCrossUnbind(),delete this.$dom,$(document).arrowkeysUnbind(),this},t}(),function(t,e){"use strict";e.fn.arrowkeys=function(){var t=this;return this._arrowkeysHandler=function(e){switch(e.keyCode){case 37:e.preventDefault(),t.trigger("leftkey");break;case 38:e.preventDefault(),t.trigger("upkey");break;case 39:e.preventDefault(),t.trigger("rightkey");break;case 40:e.preventDefault(),t.trigger("downkey")}},this.on("keydown",this._arrowkeysHandler),this},e.fn.arrowkeysUnbind=function(){return this.off("keydown",this._arrowkeysHandler),delete this._arrowkeysHandler,this}}(window,window.$),this.SwipeEvent=function(t,e){"use strict";var i={SWIPE:{CANCEL:"swipecancel",END:"swipeend"}},n=function(t){t=t||{},this.elm=t.elm,this.fingerCount=0,this.touchCurrent=null,this.touchInitial=null,this.bindEvents()};n.isTouchDevice=function(){return"ontouchstart"in t.document.documentElement};var s=n.prototype;return s.dispatchEvent=function(t){this.elm.dispatchEvent(new CustomEvent(t,{detail:{startX:this.touchInitial.pageX,startY:this.touchInitial.pageY,endX:this.touchCurrent.pageX,endY:this.touchCurrent.pageY}}))},s.swipeEnd=function(){return 1!==this.fingerCount?void(this.fingerCount=0):(this.fingerCount=0,void this.dispatchEvent(i.SWIPE.END))},s.touchStart=function(t){this.touchInitial={pageX:t.pageX,pageY:t.pageY},this.touchCurrent=t,this.fingerCount=1},s.touchMove=function(t){this.touchCurrent=t},s.touchEnd=function(){this.swipeEnd()},s.touchCancel=function(){this.fingerCount>0&&(this.fingerCount=0,this.dispatchEvent(i.SWIPE.CANCEL))},s.createHandlers=function(){var t=this;this.handlers={touchStart:function(e){e.preventDefault(),1===e.touches.length?t.touchStart(e.touches[0]):t.touchCancel()},touchMove:function(e){e.preventDefault(),1===t.fingerCount?t.touchMove(e.touches[0]):t.touchCancel()},touchEnd:function(e){e.preventDefault(),1===t.fingerCount?t.touchEnd():t.touchCancel()},touchCancel:function(e){e.preventDefault(),t.touchCancel()},mouseDown:function(e){e.preventDefault(),t.touchStart(e)},mouseMove:function(e){e.preventDefault(),t.touchMove(e)},mouseUp:function(e){e.preventDefault(),t.touchEnd()},mouseOut:function(e){e.preventDefault(),t.touchCancel()}}},s.bindEvents=function(){this.createHandlers(),n.isTouchDevice()?(this.elm.addEventListener("touchstart",this.handlers.touchStart,!1),this.elm.addEventListener("touchmove",this.handlers.touchMove,!1),this.elm.addEventListener("touchend",this.handlers.touchEnd,!1),this.elm.addEventListener("touchcancel",this.handlers.touchCancel,!1)):(this.elm.addEventListener("mousedown",this.handlers.mouseDown,!1),this.elm.addEventListener("mousemove",this.handlers.mouseMove,!1),this.elm.addEventListener("mouseout",this.handlers.mouseOut,!1),this.elm.addEventListener("mouseup",this.handlers.mouseUp,!1))},s.unbindEvents=function(){n.isTouchDevice()?(this.elm.removeEventListener("touchstart",this.handlers.touchStart,!1),this.elm.removeEventListener("touchmove",this.handlers.touchMove,!1),this.elm.removeEventListener("touchend",this.handlers.touchEnd,!1),this.elm.removeEventListener("touchcancel",this.handlers.touchCancel,!1)):(this.elm.removeEventListener("mousedown",this.handlers.mouseDown,!1),this.elm.removeEventListener("mousemove",this.handlers.mouseMove,!1),this.elm.removeEventListener("mouseout",this.handlers.mouseOut,!1),this.elm.removeEventListener("mouseup",this.handlers.mouseUp,!1))},null!=e&&null!=e.fn&&(e.fn.swipeEvent=function(){return this._swipeEvent=new n({elm:this[0]}),this},e.fn.swipeEventUnbind=function(){return null!=this._swipeEvent&&this._swipeEvent.unbindEvents(),this._swipeEvent=null,this}),n}(window,window.$),window.SwipeEvent.SwipeCross=function(t,e){"use strict";var i={THRESHOLD:3},n={UP:0,DOWN:1,RIGHT:2,LEFT:3},s={SWIPE:{UP:"swipeup",RIGHT:"swiperight",DOWN:"swipedown",LEFT:"swipeleft"}},r=function(t){t=t||{},this.elm=t.elm,this.bindEvents()},o=r.prototype;o.createHandlers=function(){var t=this;this.handler=function(e){e.preventDefault();var r=new h(e.detail.startX,e.detail.startY,e.detail.endX,e.detail.endY);if(!(r.distance()<=i.THRESHOLD)){var o=r.direction();t.dispatchEvent(o===n.UP?s.SWIPE.UP:o===n.LEFT?s.SWIPE.LEFT:o===n.RIGHT?s.SWIPE.RIGHT:s.SWIPE.DOWN)}}},o.bindEvents=function(){this.createHandlers(),this.elm.addEventListener("swipeend",this.handler,!1)},o.unbindEvents=function(){this.elm.removeEventListener("swipeend",this.handler,!1)},o.dispatchEvent=function(t){this.elm.dispatchEvent(new CustomEvent(t,{}))};var h=function(t,e,i,n){this.startX=t,this.startY=e,this.endX=i,this.endY=n},a=h.prototype;return a.distance=function(){var t=this.endX-this.startX,e=this.endY-this.startY;return Math.max(Math.abs(t),Math.abs(e))},a.angle=function(){var t=Math.atan2(this.endY-this.startY,this.endX-this.startX);return(Math.floor(180*t/Math.PI)+360)%360},a.direction=function(){var t=this.angle();return 45>t||t>=315?n.RIGHT:t>=45&&135>t?n.DOWN:t>=135&&225>t?n.LEFT:n.UP},null!=e&&null!=e.fn&&(e.fn.swipeCross=function(){return null==this._swipeEvent&&(this._swipeEvent=new t.SwipeEvent({elm:this[0]})),this._swipeCross=new r({elm:this[0]}),this},e.fn.swipeCrossUnbind=function(){return null!=this._swipeEvent&&(this._swipeEvent.unbindEvents(),this._swipeEvent=null),null!=this._swipeCross&&this._swipeCross.unbindEvents(),this._swipeCross=null,this}),r}(window,window.$),debug.FusionCounter=function(){"use strict";var t=function(){this.table={}},e=t.prototype;return e.count=function(t){var e=t.newGene();this.table[e]=this.table[e]||0,this.table[e]++},e.toString=function(){return Object.keys(this.table).map(function(t){return t+"("+this.table[t]+")"},this).join(" ")},t}();