/**
 * Created by shenyineng on 15/6/19.
 */
define(
    ["zrender/shape/Circle", "zrender/tool/util"],
    function(Circle, util){
        var CustomPoint = function(options){
            var x = options.x;
            var y = options.y;
            options.style = {
                x : x,
                y : y,
                r : 5,
                color : "white",
                brushType : "both",
                strokeColor : "black",
                lineWidth : 1
            }

            function setAsNew(){
                options.draggable = true;
                options. onmousedown = function(params){
                    window.zr.on('mousemove', function(params){

                        // mouse position
                        this.targetX = params.event.offsetX;
                        this.targetY = params.event.offsetY;

                        // calculate offset
                        this.offsetX = _this.halfLine1.style.xEnd - this.targetX;
                        this.offsetY = _this.halfLine1.style.yEnd - this.targetY;

                        // set anchor1
                        _this.p_anchor1.style.x -= this.offsetX;
                        _this.p_anchor1.style.y -= this.offsetY;
                        window.zr.modShape(_this.p_anchor1);

                        _this.line_anchor1.style.xEnd = this.targetX;
                        _this.line_anchor1.style.yEnd = this.targetY;
                        _this.line_anchor1.style.xStart = _this.p_anchor1.style.x;
                        _this.line_anchor1.style.yStart = _this.p_anchor1.style.y;

                        _this.halfLine1.style.cpX1 = _this.p_anchor1.style.x;
                        _this.halfLine1.style.cpY1 = _this.p_anchor1.style.y;
                        _this.halfLine1.style.xEnd = this.targetX
                        _this.halfLine1.style.yEnd = this.targetY

                        // set anchor1
                        _this.p_anchor2.style.x -= this.offsetX;
                        _this.p_anchor2.style.y -= this.offsetY;
                        window.zr.modShape(_this.p_anchor2);

                        _this.line_anchor2.style.xEnd = this.targetX;
                        _this.line_anchor2.style.yEnd = this.targetY;
                        _this.line_anchor2.style.xStart = _this.p_anchor2.style.x;
                        _this.line_anchor2.style.yStart = _this.p_anchor2.style.y;

                        _this.halfLine2.style.cpX1 = _this.p_anchor2.style.x;
                        _this.halfLine2.style.cpY1 = _this.p_anchor2.style.y;
                        _this.halfLine2.style.xEnd = this.targetX
                        _this.halfLine2.style.yEnd = this.targetY
                    });
                }
            }

            Circle.call(this, options);
        }

        util.inherits(CustomPoint, Circle);

        return CustomPoint;
    }
)