/**
 * Created by shenyineng on 15/6/19.
 */
define(
    ["zrender/shape/Line", "zrender/tool/util", "CustomPoint", "CustomBezier"],
    function(Line, util, CustomPoint, CustomBezier){
        var CustomLine = function(options){
            var _this = this;

            // bind point dragging event
            function bindDrag(){
                var currentPoint = this;
                window.zr.on('mousemove', function(params){
                    var targetX = params.event.offsetX;
                    var targetY = params.event.offsetY;
                    currentPoint.style.x = targetX
                    currentPoint.style.y = targetY
                    zr.modShape(currentPoint);
                    if(currentPoint == _startPoint){
                        _this.style.xStart = targetX
                        _this.style.yStart = targetY;
                    }else if(currentPoint == _endPoint){
                        _this.style.xEnd = targetX
                        _this.style.yEnd = targetY;
                    }

                    zr.modShape(_this)
                });
            }

            function drawLine(){
                window.zr.on('mousemove', function(params){
                    var targetX = params.event.offsetX;
                    var targetY = params.event.offsetY;
                    _startPoint.style.x = targetX
                    _startPoint.style.y = targetY
                    window.zr.modShape(_startPoint)
                    _this.style.xStart = targetX
                    _this.style.yStart = targetY;
                    window.zr.modShape(_this)
                });
            }


            // start point
            var _startPoint = options.startPoint;
            // end point
            var _endPoint = options.endPoint;

            console.log("startPoint : " + _startPoint.x + "," + _startPoint.y);
            console.log("endPoint : " + _endPoint.x + "," + _endPoint.y);

            _startPoint.onmousedown = bindDrag;
            _endPoint.onmousedown = bindDrag;

            _startPoint.onmouseup = function(params){
                _startPoint.onmousemove = null;
            };

            _endPoint.onmouseup = function(params){
                _startPoint.onmousemove = null;
            };

            options.style = {
                xStart: _startPoint.x,
                yStart: _startPoint.y,
                xEnd: _endPoint.x,
                yEnd: _endPoint.y,
                strokeColor: 'black',
                lineWidth: 2
            }
            options.onmousedown = drawLine;
            options.onmouseup = function(params){
                onmousemove = null;
            }

            options.clickable = true,
            options.ondblclick = function(params){
                var targetX = params.event.offsetX;
                var targetY = params.event.offsetY;

                //remove original line
                window.zr.delShape(_this)

                // new point at your mouse position
                var p_new = new CustomPoint({
                    x : targetX,
                    y : targetY
                });

                window.zr.addShape(p_new);

                var p_anchor1 = new CustomPoint(
                    Triangle.findAnchor(p_new.style.x, p_new.style.y, _endPoint.x, _endPoint.y, 50)
                );
                //window.zr.addShape(p_anchor1);

                var line_anchor1 = new Line({
                    startPoint : this.p_new,
                    endPoint : this.p_anchor1
                });
                //window.zr.addShape(line_anchor1);


                // start to new
                var halfLine1 = new CustomLine({
                    startPoint : _startPoint,
                    endPoint : p_new
                });
                window.zr.addShape(halfLine1);

                // new to end
                var halfLine2 = new CustomLine({
                    startPoint : p_new,
                    endPoint : _endPoint
                });
                window.zr.addShape(halfLine2);
            }

            Line.call(this, options);
        }


        util.inherits(CustomLine, Line);
        
        
        return CustomLine;
    }
)