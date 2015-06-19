define(
    ["zrender/shape/BezierCurve", "zrender/tool/util"],
    function(BezierCurve, util){
        var CustomBezier = function(options){
            options.style = {
                xStart: options.startPoint.x,
                yStart: options.startPoint.y,
                cpX1 : options.anchorPoint.x,
                cpY1 : options.anchorPoint.y,
                xEnd: options.endPoint.x,
                yEnd: options.endPoint.y,
                strokeColor: 'black',
                lineWidth: 3,
            }

            BezierCurve.call(this, options);
        }

        util.inherits(CustomBezier, BezierCurve);

        return CustomBezier;
    }
)