/**
 * Created by shenyineng on 15/6/9.
 */
require.config({
    paths:{
        'zrender' : 'zrender',
        'zrender/shape/BezierCurve' : 'zrender',
        'customLine' : 'customLine',
        'customPoint' : 'customPoint',

        'jquery' : 'jquery-1.11.2'
    }
});

require(
    [
        'zrender',
        'customPoint',
        'customLine',
        'zrender/shape/BezierCurve',
        'jquery'
    ],
    function(zrender, Circle, Line, BezierCurve, $) {
        var zr = zrender.init(document.getElementById('main'));
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
                    ondblclick: function(params){
                        var _this = this;
                        var targetX = params.event.offsetX;
                        var targetY = params.event.offsetY;

                        //remove original line
                        zr.delShape(_this.newLine)

                        // new point at your mouse position
                        this.p_new = new Circle({
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

                                    // mouse position
                                    this.targetX = params.event.offsetX;
                                    this.targetY = params.event.offsetY;

                                    // calculate offset
                                    this.offsetX = _this.halfLine1.style.xEnd - this.targetX;
                                    this.offsetY = _this.halfLine1.style.yEnd - this.targetY;

                                    // set anchor1
                                    _this.p_anchor1.style.x -= this.offsetX;
                                    _this.p_anchor1.style.y -= this.offsetY;
                                    zr.modShape(_this.p_anchor1);

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
                                    zr.modShape(_this.p_anchor2);

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
                        });

                        this.anchor1 = Triangle.findAnchor(this.p_new.style.x, this.p_new.style.y, this.style.xEnd, this.style.yEnd, 50);
                        this.p_anchor1 = new Circle({
                            style: {
                                x : this.anchor1.x,
                                y : this.anchor1.y,
                                r : 5,
                                color : "white",
                                brushType : "both",
                                strokeColor : "black",
                                lineWidth : 1
                            },
                        });

                        this.line_anchor1 = new Line({
                            style:{
                                xStart: this.p_anchor1.style.x,
                                yStart: this.p_anchor1.style.y,
                                xEnd: this.p_new.style.x,
                                yEnd: this.p_new.style.y,
                                strokeColor: 'black',
                                lineWidth: 2
                            }
                        });
                        zr.addShape(this.line_anchor1);
                        zr.addShape(this.p_anchor1);


                        // new to end
                        this.halfLine1 = new BezierCurve($.extend({
                            style: {
                                xStart: this.style.xEnd,
                                yStart: this.style.yEnd,
                                cpX1 : this.anchor1.x,
                                cpY1 : this.anchor1.y,
                                xEnd: this.targetX,
                                yEnd: this.targetY,
                                strokeColor: 'black',
                                lineWidth: 3,
                            }
                        }, newLineStyle));
                        zr.addShape(this.halfLine1);


                        this.anchor2 = Triangle.findAnchor(this.p_new.style.x, this.p_new.style.y, this.style.xStart, this.style.yStart, -50);
                        this.p_anchor2 = new Circle({
                            style: {
                                x : this.anchor2.x,
                                y : this.anchor2.y,
                                r : 5,
                                color : "white",
                                brushType : "both",
                                strokeColor : "black",
                                lineWidth : 1
                            },
                        });

                        this.line_anchor2 = new Line({
                            style:{
                                xStart: this.p_anchor2.style.x,
                                yStart: this.p_anchor2.style.y,
                                xEnd: this.p_new.style.x,
                                yEnd: this.p_new.style.y,
                                strokeColor: 'black',
                                lineWidth: 2
                            }
                        });
                        zr.addShape(this.line_anchor2);
                        zr.addShape(this.p_anchor2);

                        // start to new

                        this.halfLine2 = new BezierCurve($.extend({
                            style: {
                                xStart: this.style.xStart,
                                yStart: this.style.yStart,
                                cpX1 : this.anchor2.x,
                                cpY1 : this.anchor2.y,
                                xEnd: this.targetX,
                                yEnd: this.targetY,
                                strokeColor: 'black',
                                lineWidth: 3,
                            }
                        }, newLineStyle));
                        zr.addShape(this.halfLine2);

                        zr.addShape(this.p_new);
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
