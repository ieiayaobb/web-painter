function Triangle(){
}


Triangle.findAnchor = function(x1, y1, x2, y2, dis){
  var x;
  var y;

  var angle = Math.atan((y2 - y1) / (x2 - x1));

  x = x1 + Math.cos(angle) * dis;
  y = y1 + Math.sin(angle) * dis;

  return {
    x : x,
    y : y
  }
}
