/**
 * Created by shenyineng on 15/6/9.
 */
require.config({
    paths:{
        'zrender' : 'zrender',
        'zrender/shape/Circle' : 'zrender',
        'zrender/shape/Line' : 'zrender',
        'zrender/shape/BezierCurve' : 'zrender',
        'jquery' : 'jquery-1.11.2'
    }
});

require(
    ['zrender', 'zrender/shape/Circle', 'zrender/shape/Line', 'zrender/shape/BezierCurve', 'jquery'],
    function(zrender, Circle, Line, BezierCurve, $) {
        var zr = zrender.init(document.getElementById('main'));
        function EditableLine(){
            var p_start;
            var p_end;

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
                    style: {
                        x : params.event.offsetX,
                        y : params.event.offsetY,
                        r : 5,
                        color : "white",
                        brushType : "both",
                        strokeColor : "black",
                        lineWidth : 1
                    },
                    clickable: true,
                    onmousedown: function(params){
                        zr.on('mousemove', function(params){
                            var targetX = params.event.offsetX;
                            var targetY = params.event.offsetY;
                            _this.p_start.style.x = targetX
                            _this.p_start.style.y = targetY
                            zr.modShape(_this.p_start)
                            _this.newLine.style.xStart = targetX
                            _this.newLine.style.yStart = targetY;
                            zr.modShape(_this.newLine)
                        });
                    },
                    onmouseup : function(params){
                        onmousemove = null;
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
                    onmousedown: function(params){
                        zr.on('mousemove', function(params){
                            var targetX = params.event.offsetX;
                            var targetY = params.event.offsetY;
                            _this.p_end.style.x = targetX
                            _this.p_end.style.y = targetY
                            zr.modShape(_this.p_end)
                            _this.newLine.style.xEnd = targetX
                            _this.newLine.style.yEnd = targetY;
                            zr.modShape(_this.newLine)
                        });
                    },
                    onmouseup : function(params){
                        onmousemove = null;
                    }
                });

                var newLineStyle = {
                    clickable: true,
                    // draggable: true,
                    onclick: function(params){

                    },
                    ondblclick: function(params){
                        var targetX = params.event.offsetX;
                        var targetY = params.event.offsetY;
                        var p_new = new Circle({
                            style: {
                                x : targetX,
                                y : targetY,
                                r : 5,
                                color : "white",
                                brushType : "both",
                                strokeColor : "black",
                                lineWidth : 1
                            },
                            draggable: true,
                            onmousedown: function(params){
                                zr.on('mousemove', function(params){
                                    var targetX = params.event.offsetX;
                                    var targetY = params.event.offsetY;
                                    var offsetX = halfLine.style.xEnd - targetX;
                                    var offsetY = halfLine.style.yEnd - targetY;
                                    p_anchor1.style.x -= offsetX;
                                    p_anchor1.style.y -= offsetY;
                                    zr.modShape(p_anchor1);

                                    line_anchor1.style.xEnd = targetX;
                                    line_anchor1.style.yEnd = targetY;
                                    line_anchor1.style.xStart = p_anchor1.style.x;
                                    line_anchor1.style.yStart = p_anchor1.style.y;

                                    halfLine.style.cpX1 = p_anchor1.style.x;
                                    halfLine.style.cpY1 = p_anchor1.style.y;
                                    halfLine.style.xEnd = targetX
                                    halfLine.style.yEnd = targetY

                                    _this.newLine.style.xEnd = targetX
                                    _this.newLine.style.yEnd = targetY;

                                });
                            }
                        });

                        var originalX = this.style.xEnd;
                        var originalY = this.style.yEnd;

                        var anchor1 = Triangle.findAnchor(p_new.style.x, p_new.style.y, originalX, originalY, 50);
                        var p_anchor1 = new Circle({
                            style: {
                                x : anchor1.x,
                                y : anchor1.y,
                                r : 5,
                                color : "white",
                                brushType : "both",
                                strokeColor : "black",
                                lineWidth : 1
                            },
                        });

                        var line_anchor1 = new Line({
                            style:{
                                xStart: p_anchor1.style.x,
                                yStart: p_anchor1.style.y,
                                xEnd: p_new.style.x,
                                yEnd: p_new.style.y,
                                strokeColor: 'black',
                                lineWidth: 2
                            }
                        });
                        zr.addShape(line_anchor1);
                        zr.addShape(p_anchor1);

                        var halfLine = new BezierCurve($.extend({
                            style: {
                                xStart: originalX,
                                yStart: originalY,
                                cpX1 : anchor1.x,
                                cpY1 : anchor1.y,
                                xEnd: targetX,
                                yEnd: targetY,
                                strokeColor: 'black',
                                lineWidth: 2
                            }
                        }, newLineStyle));

                        zr.addShape(halfLine);
                        zr.addShape(p_new);
                    }
                }

                _this.newLine = new Line($.extend({
                    style:{
                        xStart: _this.p_start.style.x,
                        yStart: _this.p_start.style.y,
                        xEnd: _this.p_end.style.x,
                        yEnd: _this.p_end.style.y,
                        strokeColor: 'black',
                        lineWidth: 2
                    }
                }, newLineStyle));
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
