


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




// To play notes. need to read more about this.
var context=new AudioContext();
var o=null;
var g=null;
function playNote(frequency, type) {
setTimeout(function(){
  o = context.createOscillator();
    g = context.createGain();
    o.type = type;
    o.connect(g);
    o.frequency.value = frequency;
    g.connect(context.destination);
    o.start(0);
    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1);
},1000)
}
/*
const notes = [
playNote(130.8, 'sine'), 
playNote(146.8, 'sine'), 
playNote(164.8, 'sine'), 
playNote(174.6, 'sine'), 
playNote(196.0, 'sine'), 
playNote(220.0, 'sine'), 
playNote(246.9, 'sine'), 
playNote(261.6, 'sine'), 
playNote(293.7, 'sine'), 
playNote(329.6, 'sine'), 
playNote(349.2, 'sine'), 
playNote(392.0, 'sine'), 
playNote(440.0, 'sine'), 
playNote(493.9, 'sine'), 
playNote(523.3, 'sine'), 
playNote(587.3, 'sine'), 
playNote(659.3, 'sine'), 
playNote(698.5, 'sine'), 
playNote(784.0, 'sine'), 
playNote(880.0, 'sine'), 
playNote(987.8, 'sine'), 
playNote(1047, 'sine') ,
playNote(1175, 'sine') ,
playNote(1319, 'sine') ,
playNote(1397, 'sine') ,
playNote(1568, 'sine'),
playNote(1760, 'sine'),
playNote(1976, 'sine')
]
*/




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
    x: paper.width * 0.05,
    y: paper.height * 0.9
}

const end = {
    x: paper.width * 0.95,
    y: paper.height * 0.9
}

const length = end.x - start.x

const InitialArcRadius = length * 0.08 
const spacing = (length/2 - InitialArcRadius) / arcs.length


/*Centro del arco*/ 
const center = {
    x: paper.width * 0.5,
    y: paper.height * 0.9,
    arcY: paper.height * 0.886/*Manual adjusting so circles dont collide with the line*/
}


/*Variable Settings*/ 
const loopTime = (15/2) * 60 /*in seconds*/ 



const maxDistance = 2 * Math.PI /*Max angle, distance and a full loop*/

/*
const calculateNextImpactTime = (currentImpactTime, velocity) => {
    return currentImpactTime + (Math.PI / velocity) * 1000
}
*/

pen.lineWidth = 3;
arcs.forEach((arc,index) => {

    const numberOfLoops = Math.max(arcs.length, 40) - index / 2 /*Number of loops determines the speed and modifying the index alters the variation between arcs*/
    const velocity = (maxDistance * numberOfLoops) / loopTime
    const distance =  Math.PI + (elapsedTime * velocity) 
    const modDistance = distance % maxDistance
    const adjustedDistance = modDistance >= Math.PI ? modDistance : maxDistance - modDistance

    const arcRadius = InitialArcRadius + (index * spacing)

    const angle = Math.PI * 1.5
/*Defines Circle Movement*/
const x = center.x  + arcRadius  * Math.cos(adjustedDistance) 
      y = center.y /*center.arcY*/ + arcRadius  * Math.sin(adjustedDistance) 

      //if (index == 0 && (adjustedDistance < 3.16 ||	 adjustedDistance > 6.26 )) {playNote(1976, 'sine'); console.log("nota")   }
      //if (index == 0) {console.log(center.y, center.arcY,(paper.height / spacing) )}
    // draw arc
    pen.beginPath();
    pen.lineWidth = 4;
    pen.strokeStyle = arc
    pen.arc(center.x, center.y, arcRadius, Math.PI, Math.PI * 2);
    pen.stroke()

    // draw circle
    pen.beginPath();
    pen.lineWidth = 3;
    pen.fillStyle = arc
    pen.strokeStyle = "white"
     /* I tried to make the cicles exactly half the spacing between arcs but they still collided with the others. I have to think this again*/ 
    pen.arc(x, y, (spacing / 2.2) /*length * 0.004*/, 0, Math.PI * 2);
    pen.stroke()
    pen.fill()
})


// draw line
// this is down here because the drawing order is like the zIndex
pen.strokeStyle = "white";
pen.lineWidth = 5;

pen.beginPath();
pen.moveTo(start.x, paper.height * 0.91 /*start.y*/);
pen.lineTo(end.x, paper.height * 0.91 /*end.y*/);
pen.stroke();


requestAnimationFrame(draw)

}

draw() 