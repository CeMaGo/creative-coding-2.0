const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const Color = require('canvas-sketch-util/color');
const risoColors = require('riso-colors');


const settings = {
  dimensions: [ 1080, 1080 ],
  // animate: true, 
};

const sketch = ({context, width, height }) => {
  let x, y, w, h, fill, stroke, blend;
  let angle, rx, ry;

  const num = 40;
  const degrees = 30;

  const rects = [];
  
  const rectColors = [
    random.pick(risoColors),
    random.pick(risoColors),
    // random.pick(risoColors),
  ]

  const bgColor = random.pick(rectColors).hex;
  for (let i = 0; i < num; i++){
    let x = random.range( 0, width);
    let y = random.range(0, height);
    let w = random.range(600, width);
    let h = random.range(40, 200);

    fill = random.pick(risoColors).hex;
     // console.log('fill: ',fill);//`rgba(${random.range(0,255)} ,${random.range(0,255)},${random.range(0,255)}, 0.7)` //'rgba(0,0,255,1) ','rgb(0,0,255), 'blue', '#0000FF';
    stroke = random.pick(rectColors).hex;
     //  console.log('stroke: ',stroke);
    blend = (random.value()> 0.5) ? 'overlay' : 'source-over';
     
    rects.push({x, y, w, h, fill, stroke, blend })
    };


  return ({ context, width, height }) => {
    context.fillStyle = bgColor;
    context.fillRect(0, 0, width, height);


  context.save();
  context.translate(width * 0.5, height * 0.58);

  context.beginPath();
  context.moveTo(0 , -300);
  context.lineTo(300,200);
  context.lineTo(-300,200);
  context.closePath();
  
  context.lineWidth = 10;
  context.strokeStyle = 'black';
  context.stroke(); 

  context.clip();

  // context.restore();

  rects.forEach(rect => {
    const {x, y, w, h, fill, stroke, blend} = rect;
    let shadowColor;

    context.save();
    context.translate( width * - 0.5, height * - 0.5);
    context.translate(x, y ); 
    context.strokeStyle = stroke;
    context.fillStyle = fill;
    context.lineWidth= 10;

    context.globalCompositeOperation = blend;
  
    
    drawSkewRect({context, w, h, degrees});
    
    shadowColor = Color.offsetHSL( fill, 0, 0, -20);
    shadowColor.rgba[3] = 0.5;

    context.shadowColor = Color.style(shadowColor.rgba);
    context.shadowOffSetX = - 10;
    context.shadowOffSetY = - 20;
    context.fill();

    context.shadowColor = null;
    context.stroke( );

    context.globalCompositeOperation = 'source-over';
    
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.stroke();

    context.restore();

  });

  };
};

const drawSkewRect = ({ context, w = 600, h = 200, degrees = -45 }) => {
  
     const angle = math.degToRad(degrees );
     const rx = Math.cos(angle)* w;
     const ry = Math.sin(angle) * w; 

    context.save()
      context.translate(rx * -0.5,( ry + h) * -0.5);
  
      context.beginPath();
      context.moveTo(0,0);
      context.lineTo(rx,ry)
      context.lineTo(rx, ry + h);
      context.lineTo(0,h);
      context.closePath();  
      context.stroke();
      context.restore();
    };

canvasSketch(sketch, settings);
