const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const risoColors = require('riso-colors');


const settings = {
  dimensions: [ 1080, 1080 ],
  // animate: true, 
};

const sketch = ({context, width, height }) => {
  let x, y, w, h;
  let angle, rx, ry;

  const num = 20;
  const degrees = 30;

  const rects = [];

  for (let i = 0; i < num; i++){
    let x = random.range( 0, width);
    let y = random.range(0, height);
    let w = random.range(200, 600);
    let h = random.range(40, 200);

    const fill = random.pick(risoColors).hex;

   console.log(fill);//`rgba(${random.range(0,255)} ,${random.range(0,255)},${random.range(0,255)}, 0.7)` //'rgba(0,0,255,1) ','rgb(0,0,255), 'blue', '#0000FF';
    
   const stroke = random.pick(risoColors).hex;
console.log('stroke: ',stroke);
    rects.push({x, y, w, h, fill, stroke })
  }
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

  rects.forEach(rect => {
    const {x, y, w, h, fill, stroke} = rect;

    context.save();
    context.translate(x, y ); 
    context.strokeStyle = stroke;
    context.fillStyle = fill;

    
    drawSkewRect({context, w, h, degrees});
    context.stroke( );
    context.fill();
  

    context.restore();

  })
    
  };
};

const drawSkewRect = ({ context, w = 600, h = 200, degrees = -45  }) => {
  
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
