/**
 * Created by shenyineng on 15/6/9.
 */
require.config({
    paths:{
        'zrender' : 'zrender',
        'CustomLine' : 'CustomLine',
        'CustomPoint' : 'CustomPoint',
        'jquery' : 'jquery-1.11.2'
    }
});

require(
    [
        'zrender',
        'CustomPoint',
        'CustomLine',
        'jquery'
    ],
    function(zrender, Circle, Line, $) {
        window.zr = zrender.init(document.getElementById('main'));
        function EditableLine(){
            var _this = this;
            var drawFunction = function(params){
                _this.p_end.style.x = params.event.offsetX;
                _this.p_end.style.y = params.event.offsetY;
                zr.modShape(_this.p_end);
                _this.newLine.style.xEnd = _this.p_end.style.x;
                _this.newLine.style.yEnd = _this.p_end.style.y;
                zr.modShape(_this.newLine);
            }

            var drawingFlag = false;

            var drawLine = function(params){
                drawingFlag = true;
                zr.on('mousemove', drawFunction);

                _this.p_start = new Circle({
                    x : params.event.offsetX,
                    y : params.event.offsetY,
                });

                _this.p_end = new Circle({
                    x : params.event.offsetX,
                    y : params.event.offsetY,
                });

                _this.newLine = new Line({
                    startPoint : _this.p_start,
                    endPoint : _this.p_end
                });

                zr.addShape(_this.newLine);
                zr.addShape(_this.p_start);
                zr.addShape(_this.p_end);
            }

            return {
                drawLine : drawLine,
                drawFunction : drawFunction
            }
        };

        function CircleGraph(){
            var _this = this;
            var drawFunction = function(params){
                _this.p_end.style.x = params.event.offsetX;
                _this.p_end.style.y = params.event.offsetY;
                zr.modShape(_this.p_end);
                _this.newLine.style.xEnd = _this.p_end.style.x;
                _this.newLine.style.yEnd = _this.p_end.style.y;
                zr.modShape(_this.newLine);

                var radix = Math.sqrt(Math.pow(_this.p_end.style.x - _this.p_start.style.x, 2) + Math.pow(_this.p_end.style.y - _this.p_start.style.y, 2));

                _this.newCircle.style.r = radix;
                zr.modShape(_this.newCircle);
            }

            var drawLine = function(params){
                zr.on('mousemove', drawFunction);

                _this.p_start = new Circle({
                    style: {
                        x : params.event.offsetX,
                        y : params.event.offsetY,
                        r : 5,
                        color : "white",
                        brushType : "both",
                        strokeColor : "black",
                        lineWidth : 1
                    }
                });

                _this.p_end = new Circle({
                    style: {
                        x : params.event.offsetX,
                        y : params.event.offsetY,
                        r : 5,
                        color : "white",
                        brushType : "both",
                        strokeColor : "black",
                        lineWidth : 1
                    },
                    onmouseup : function(params){
                        onmousemove = null;
                    }
                });

                _this.newLine = new Line({
                    style:{
                        xStart: _this.p_start.style.x,
                        yStart: _this.p_start.style.y,
                        xEnd: _this.p_end.style.x,
                        yEnd: _this.p_end.style.y,
                        strokeColor: 'black',
                        lineWidth: 2
                    }
                });
                _this.newCircle = new Circle({
                    style: {
                        x : params.event.offsetX,
                        y : params.event.offsetY,
                        r : 0,
                        brushType : "stroke",
                        strokeColor : "black",
                        lineWidth : 1
                    }
                })
                zr.addShape(_this.newLine);
                zr.addShape(_this.p_start);
                zr.addShape(_this.p_end);
                zr.addShape(_this.newCircle);
            }

            return {
                drawLine : drawLine,
                drawFunction : drawFunction
            }
        }

        $('#line').click(function(){
            var lineBuilder;
            zr.on('mousedown', function(params){
                editableLine = new EditableLine();
                editableLine.drawLine(params);
            });
            zr.on('mouseup', function(){
                zr.un('mousemove');
            });
        });

        $('#pointer').click(function(){
            zr.un('mousedown');
        });

        $("#circle").click(function(){
            var circleGraph;
            zr.on('mousedown', function(params){
                circleGraph = new CircleGraph();
                circleGraph.drawLine(params);
            });
            zr.on('mouseup', function(){
                zr.un('mousemove');
            });
        });

        $("#erase").click(function(){

        });
    });
