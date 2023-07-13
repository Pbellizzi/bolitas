


let startTime =  new Date().getTime();

/** @type {HTMLCanvasElement} */
const paper = document.querySelector("#paper")
const pen = paper.getContext("2d")

const draw = () => {
    const currentTime = new Date().getTime(),
    elapsedTime = (currentTime - startTime) / 1000

    paper.width = paper.clientWidth;
    paper.height = paper.clientHeight;

const start = {
    x: paper.width * 0.1,
    y: paper.height * 0.9
}

const end = {
    x: paper.width * 0.9,
    y: paper.height * 0.9
}

const center = {
    x: paper.width * 0.5,
    y: paper.height * 0.9
}

const length = end.x - start.x

const maxAngle = 2 * Math.PI
const arcRadius = length * 0.05
const distance =  Math.PI + (elapsedTime * 1)
const modDistance = distance % maxAngle
const adjustedDistance = modDistance >= Math.PI ? modDistance : maxAngle - modDistance

/*Defines Circle Movement*/
const x = center.x + arcRadius * Math.cos(adjustedDistance)
      y = center.y + arcRadius * Math.sin(adjustedDistance)


pen.strokeStyle = "white";
pen.lineWidth = 6;

pen.beginPath();
pen.moveTo(start.x, start.y);
pen.lineTo(end.x, end.y);
pen.stroke();

// draw arc
pen.beginPath();
pen.arc(center.x, center.y, arcRadius, Math.PI, Math.PI * 2);
pen.stroke()

// draw circle
pen.fillStyle = "white"
pen.beginPath();
pen.arc(x, y, length * 0.0065, 0, Math.PI * 2);
pen.stroke()
pen.fill()

requestAnimationFrame(draw)

}

draw() 