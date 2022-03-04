window.onload = async () => {
  const response = await fetch(
    `https://angesagter.herokuapp.com/?request=allRoads`
  );
  const result = await response.json();
  const roads = result.map((el) => {
    const logs = el[1].split(";");
    const dots = logs.map((el) => {
      return {
        x: +el.split(",")[0],
        y: +el.split(",")[1],
      };
    });
    return {
      name: el[0],
      dots: dots,
      color: `#${el[2]}`,
    };
  });
  const objResponse = await fetch(
    `https://angesagter.herokuapp.com/?request=allObjects`
  );
  const objResult = await objResponse.json();
 const objects = objResult.map((el) => {
    const x = +el[1].split(",")[0];
    const y = +el[1].split(",")[1];
    return {
      name: el[0],
      x: x,
      y: y,
      color: `#${el[2]}`,
      type: el[3],
      size: el[4],
    };
  });
  renderRoads(roads, objects);
};
