const canv = document.getElementsByTagName('canvas')[0];
const ctx = canv.getContext('2d');

const render = (road) => {
  ctx.clearRect(0, 0, canv.width, canv.height);
  ctx.strokeStyle = road.color
  ctx.beginPath();
  if (road.dots.length) {
    ctx.moveTo(road.dots[0].x, road.dots[0].y);
    for (let i = 1; i < road.dots.length; i++) {
      ctx.lineTo(road.dots[i].x, road.dots[i].y);
    }
    ctx.stroke()
  }
}

const renderRoads = (roads) => {
  ctx.clearRect(0, 0, canv.width, canv.height);
  roads.forEach(road => {
    ctx.strokeStyle = road.color;
    ctx.beginPath();
    if (road.dots.length) {
      ctx.moveTo(road.dots[0].x, road.dots[0].y);
      for (let i = 1; i < road.dots.length; i++) {
        ctx.lineTo(road.dots[i].x, road.dots[i].y);
      }
      ctx.stroke();
    }
  });
}