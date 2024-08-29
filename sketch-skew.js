const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  let x, y, w, h;

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    let x = width * 0.5;
    let y = height * 0.5;
    let w = width * 0.6;
    let h = height * 0.1;

    context.save();
    context.translate( x, y ); 

    context.strokeStyle = 'blue';
    // context.strokeRect( w * -0.5, h * -0.5, w, h); // + context.translate(x, y);
    // context.strokeRect( w * -0.5 + x, h * -0.5 + y , w, h);

    context.beginPath();
    context.moveTo(w * - 0.5, h * -0.5); 
    context.lineTo(w * 0.5, h * -0.5);
    context.stroke()

    context.restore();
     
  };
};

canvasSketch(sketch, settings);
