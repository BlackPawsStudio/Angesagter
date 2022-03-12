const canv = document.getElementsByTagName("canvas")[0];
const ctx = canv.getContext("2d");

const render = (road) => {
  ctx.clearRect(0, 0, canv.width, canv.height);
  ctx.strokeStyle = road.color;
  ctx.beginPath();
  if (road.dots.length) {
    ctx.moveTo(road.dots[0].x, road.dots[0].y);
    ctx.arc(road.dots[0].x, road.dots[0].y, 1, 0, 360);

    ctx.moveTo(road.dots[0].x, road.dots[0].y);
    for (let i = 1; i < road.dots.length; i++) {
      ctx.lineTo(road.dots[i].x, road.dots[i].y);
    }
    ctx.stroke();
  }
};

const renderRoads = (roads, objects) => {
  ctx.clearRect(0, 0, canv.width, canv.height);
  if (roads.length) {
    roads.forEach((road) => {
      ctx.strokeStyle = road.color;
      ctx.beginPath();
      if (road.dots.length) {
        ctx.moveTo(road.dots[0].x, road.dots[0].y);
        ctx.arc(road.dots[0].x, road.dots[0].y, 1, 0, 360);

        ctx.moveTo(road.dots[0].x, road.dots[0].y);
        for (let i = 1; i < road.dots.length; i++) {
          ctx.lineTo(road.dots[i].x, road.dots[i].y);
        }
      }
      ctx.stroke();
    });
  }
  if (objects.length) {
    objects.forEach((obj) => {
      ctx.strokeStyle = obj.color;
      ctx.fillStyle = obj.color;
      ctx.beginPath();
      if (obj.type === "square") {
        ctx.rect(
          obj.x - obj.size / 2,
          obj.y - obj.size / 2,
          obj.size,
          obj.size
        );
      }
      if (obj.type === 'circle') {
        ctx.arc(obj.x - obj.size, obj.y - obj.size, obj.size, 0, 360);
      }
      ctx.fill();
      ctx.stroke();
    });
  }
};
