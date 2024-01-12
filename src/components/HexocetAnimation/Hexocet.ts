import Victor from 'victor';

class Hexocet {
  seeds: any[] = [];
  stepCount: number = 0;
  birthPeriod: number = 1;
  hexSize: number = 80;
  targetBounceChance: number = 0.05;
  springStiffness: number = 0.01;
  viscosity: number = 0.5;
  particleOpacity: number = 0.8;
  fade: boolean = true;
  fadeLayerOpacity: number = 0.1;
  canvas: HTMLCanvasElement | null = null;
  ctx: CanvasRenderingContext2D | null = null;
  canvasBase: number = 0;
  xC: number = 0;
  yC: number = 0;

  setupCanvas(container: HTMLElement): void {
    // Check if a canvas with the same ID already exists
    let existingCanvas = container.querySelector('#hexocet');
    if (existingCanvas) {
      // If canvas exists, use the existing one
      this.canvas = existingCanvas as HTMLCanvasElement;
    } else {
      // Create a new canvas if it doesn't exist
      let canvas = document.createElement('canvas');
      canvas.id = 'hexocet';
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      container.appendChild(canvas);
      this.canvas = canvas;
    }

    this.ctx = this.canvas.getContext('2d');

    this.canvasBase = Math.min(this.canvas.width, this.canvas.height);
    this.xC = this.canvas.width / 2;
    this.yC = this.canvas.height / 2;
  }

  hexCoordsToXY(Hx: number, Hy: number): { x: number; y: number } {
    // Hx and Hy are integers corresponding to vertices coordinates in Hex space
    let xPrime, yPrime, XYprime, XY;
    let isSumEven = (Hx + Hy) % 2 == 0 ? 1 : 0;
    xPrime = 1 * Hx;
    yPrime = (1 / Math.sqrt(3)) * (3 * Hy + 1 + isSumEven);

    XYprime = new Victor(xPrime * this.hexSize, yPrime * this.hexSize);
    XY = XYprime.clone().rotateDeg(30);

    return { x: XY.x, y: XY.y };
  }

  XYtoHexCoords(x: number, y: number): { Hx: number; Hy: number } {
    // Approximate
    let XYprime = new Victor(x / this.hexSize, y / this.hexSize).rotateDeg(-30);
    let Hx = XYprime.x,
      Hy = (Math.sqrt(3) * XYprime.y) / 3;
    return { Hx: Math.floor(Hx), Hy: Math.floor(Hy) };
  }

  update(): void {
    this.stepCount++;

    // Birthrate management
    if (this.stepCount % this.birthPeriod == 0 && this.stepCount < 60000) {
      this.birth();
    }

    this.move();
    this.draw();
  }

  birth(xBirth?: number, yBirth?: number, seed?: any): void {
    // Give birth around the canvas center
    var targetH = this.XYtoHexCoords(xBirth || this.xC, yBirth || this.yC);
    // I said AROUND
    var spreadArea = 1;
    targetH.Hx += Math.floor(spreadArea * (-0.5 + Math.random()));
    targetH.Hy += Math.floor(spreadArea * (-0.5 + Math.random()));
    // Convert in Cartesian coords
    var targetXY = this.hexCoordsToXY(targetH.Hx, targetH.Hy);

    var seed = seed || {
      xLast: targetXY.x,
      x: targetXY.x,
      xSpeed: 0,
      yLast: targetXY.y,
      y: targetXY.y,
      ySpeed: 0,
      targetHx: targetH.Hx,
      targetHy: targetH.Hy,
      age: 0,
      hue: 190 + 15 * Math.sin(this.stepCount / 50),
    };
    this.seeds.push(seed);
  }

  move(): void {
    // Move all particles
    for (var i = 0; i < this.seeds.length; i++) {
      var seed = this.seeds[i];
      // Get older
      seed.age++;
      // Save last position
      seed.xLast = seed.x;
      seed.yLast = seed.y;

      // Randomly change target
      if (Math.random() < this.targetBounceChance) {
        // Either move Hx or Hy, twice more likely to change Hx
        if (Math.random() > 0.33) {
          // Move Hx
          seed.targetHx += Math.random() > 0.5 ? 1 : -1;
        } else {
          // Increase Hy + Hx is even
          if ((seed.targetHx + seed.targetHy) % 2 == 0) {
            seed.targetHy += 1;
          } else {
            seed.targetHy -= 1;
          }
        }
      }

      // Acceleration based on target
      var targetXY = this.hexCoordsToXY(seed.targetHx, seed.targetHy);
      // Spring
      var K = this.springStiffness;
      var accX = -K * (seed.x - targetXY.x);
      var accY = -K * (seed.y - targetXY.y);
      // Viscosity
      var visc = this.viscosity;
      accX -= visc * seed.xSpeed;
      accY -= visc * seed.ySpeed;
      // Speed
      seed.xSpeed += accX;
      seed.ySpeed += accY;

      // Speed calmers (here normalizers)

      var fixedSpeed = 0.01;
      var maxSpeed = fixedSpeed,
        minSpeed = fixedSpeed;
      var speed = Math.sqrt(
        Math.pow(this.xSpeed, 2) + Math.pow(this.ySpeed, 2)
      );
      if (speed > maxSpeed) {
        seed.xSpeed *= maxSpeed / speed;
        seed.ySpeed *= maxSpeed / speed;
      }
      if (speed < minSpeed) {
        seed.xSpeed *= minSpeed / speed;
        seed.ySpeed *= minSpeed / speed;
      }

      // Position, with added canvas base size in order to maintain patterns accross zoom levels
      seed.x += 0.01 * seed.xSpeed * this.canvasBase;
      seed.y += 0.01 * seed.ySpeed * this.canvasBase;
    }
  }

  draw(): void {
    if (this.ctx && this.canvas) {
      // Add translucid layer for trace effect
      if (this.fade) {
        var opa = this.fadeLayerOpacity;
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'rgba(242, 242, 242, ' + opa + ')';
        this.ctx.fill();
      }
      for (var key in this.seeds) {
        var seed = this.seeds[key];

        // HSLA
        var hsla = {
          h: seed.hue,
          s: '0%',
          l: '100%',
          a: this.particleOpacity,
        };

        // Line width
        var wLine = 2;

        // Stroke
        this.ctx.strokeStyle =
          'hsla(' +
          hsla.h +
          ', ' +
          hsla.s +
          ', ' +
          hsla.l +
          ', ' +
          hsla.a +
          ')';
        this.ctx.lineWidth = wLine;
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();
        this.ctx.moveTo(seed.xLast, seed.yLast);
        this.ctx.lineTo(seed.x, seed.y);
        this.ctx.stroke();

        hsla = {
          h: seed.hue,
          s: '70%',
          l: '100%',
          a: 0.01,
        };

        wLine = 5;

        var targetXY = this.hexCoordsToXY(seed.targetHx, seed.targetHy);
        var tX = targetXY.x,
          tY = targetXY.y;
        this.ctx.lineWidth = wLine;
        this.ctx.strokeStyle =
          'hsla(' +
          hsla.h +
          ', ' +
          hsla.s +
          ', ' +
          hsla.l +
          ', ' +
          hsla.a +
          ')';
        this.ctx.beginPath();
        this.ctx.moveTo(tX, tY);
        this.ctx.lineTo(tX, tY);
        this.ctx.stroke();
      }
    }
  }

  testTheGrid(): void {
    if (this.ctx) {
      // Line width
      var wLine = 5;

      // Stroke
      this.ctx.lineWidth = wLine;
      this.ctx.lineCap = 'round';

      for (var i = -100; i < 100; i++) {
        for (var j = -100; j < 100; j++) {
          // HSLA
          var hsla = {
            h: 20 * j,
            s: '10%',
            l: '80%',
            a: 0.9,
          };
          this.ctx.strokeStyle =
            'hsla(' +
            hsla.h +
            ', ' +
            hsla.s +
            ', ' +
            hsla.l +
            ', ' +
            hsla.a +
            ')';
          this.ctx.beginPath();
          var XY = this.hexCoordsToXY(i, j);
          this.ctx.moveTo(XY.x, XY.y);
          this.ctx.lineTo(XY.x, XY.y);
          this.ctx.stroke();
        }
      }
    }
  }
}

export default Hexocet;
