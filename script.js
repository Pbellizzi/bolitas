


let startTime =  new Date().getTime();

const arcs = [
"#2e2859",
"#342d64",
"#38357b",
"#4559d2",
"#4071e2",
"#3294eb",
"#18c9bc",
"#0eecdd",
"#10f7c1",
"#42ee78",
"#62e34c",
"#92f138",
"#aff825",
"#ceef28",
"#d9e427",
"#dfc127",
"#e8cc3b",
"#f0bb3a",
"#f67b06",
"#f46110",
"#f43f08",
"#e42708",
"#f52e0c",
"#f8180b",
"#e00805",
"#de0808",
"#98050c",
"#6d040e"
]







/** @type {HTMLCanvasElement} */
const paper = document.querySelector("#paper")
const pen = paper.getContext("2d")

const draw = () => {
    const currentTime = new Date().getTime(),
    elapsedTime = (currentTime - startTime) / 1000

    paper.width = paper.clientWidth;
    paper.height = paper.clientHeight;

/*Start and end of the line*/
const start = {
    x: paper.width * 0.1,
    y: paper.height * 0.9
}

const end = {
    x: paper.width * 0.9,
    y: paper.height * 0.9
}

/*Centro del arco*/ 
const center = {
    x: paper.width * 0.5,
    y: paper.height * 0.9
}

const length = end.x - start.x

const maxAngle = 2 * Math.PI
const InitialArcRadius = length * 0.05 
const distance =  Math.PI + (elapsedTime * 1) /*This number defines the speed*/ 
const modDistance = distance % maxAngle
const adjustedDistance = modDistance >= Math.PI ? modDistance : maxAngle - modDistance

const spacing = (length/2 - InitialArcRadius) / arcs.length



// draw line
pen.strokeStyle = "white";
pen.lineWidth = 5;

pen.beginPath();
pen.moveTo(start.x, start.y);
pen.lineTo(end.x, end.y);
pen.stroke();

arcs.forEach((arc,index) => {

    const arcRadius = InitialArcRadius + (index * spacing)

/*Defines Circle Movement*/
const x = center.x + arcRadius * Math.cos(adjustedDistance)
      y = center.y + arcRadius * Math.sin(adjustedDistance)

    // draw arc
    pen.beginPath();
    pen.strokeStyle = arc
    pen.arc(center.x, center.y, arcRadius, Math.PI, Math.PI * 2);
    pen.stroke()

    // draw circle
    pen.beginPath();
    pen.fillStyle = "white"
    pen.strokeStyle = "white"
    pen.arc(x, y, length * 0.0065, 0, Math.PI * 2);
    pen.stroke()
    pen.fill()
})



requestAnimationFrame(draw)

}

draw() 