export default function Ccanvas(){
  console.log('canvas');
  var canvas = document.querySelector('canvas'),
    c = canvas.getContext('2d'),
    particles = [],
    colorPalette = ['#F2E8C9', '#118CD6'],
    md = 0,
    alpha = 1;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }
  function randomColor(palette) {
    return palette[Math.floor(Math.random() * (palette.length - 1))];
  }

  function Particle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = colorPalette[Math.floor(rand(0, 2))];
    this.radian = Math.random() * Math.PI * 2;
    this.distance = rand(150, 1200);
    this.blur = rand(5, 10);
    this.velocity = 0.001;
    this.minVelocity = 0.001;
    this.maxVelocity = 0.01;
    this.acceleration = 0.0001;

    this.draw = function() {
      c.beginPath();
      c.fillStyle = this.color;
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      c.fill();
      c.strokeStyle = this.color;
      c.stroke();
    };

    this.update = function() {
      if (md && this.velocity <= this.maxVelocity) {
        this.velocity += this.acceleration;
      }
      if (!md && this.velocity >= this.minVelocity) {
        this.velocity -= this.acceleration;
      }
      this.radian += this.velocity;
      this.x = x + Math.cos(this.radian) * this.distance;
      this.y = y + Math.sin(this.radian) * this.distance;
      this.draw();
    };
  }

  for (let index = 0; index < 400; index++) {
    var x = canvas.width / 4 * 3,
      y = canvas.height / 3,
      radius = rand(0.1, 2);
    particles.push(new Particle(x, y, radius));
  }

  document.querySelector('#moon').addEventListener('mouseover', function(){
    md = 1;
  })
  document.querySelector('#moon').addEventListener('mouseout', function(){
    md = 0;
  })

  // window.addEventListener('mousedown', function() {
  //   md = 1;
  // });

  // window.addEventListener('mouseup', function() {
  //   md = 0;
  // });

  function animate() {
    requestAnimationFrame(animate);
    if (md && alpha >= 0.1) {
      alpha -= 0.01;
    }
    if (!md && alpha < 1) {
      alpha += 0.01;
    }
    c.fillStyle = 'rgba(12, 35, 47, ' + alpha + ')';
    c.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
      particle.update();
    });
  }
  animate();
};