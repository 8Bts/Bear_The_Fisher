import Phaser from 'phaser';

import _bear from './assets/images/bear.png';
import _winter from './assets/images/winter.png';
import _boat from './assets/images/boat.png';
import _hook from './assets/images/hook.png';
import _water from './assets/images/water.jpg';
import _shark from './assets/images/shark.png';
import _purple from './assets/images/purplefish.png';
import _blue from './assets/images/bluefish.png';
import _yellow from './assets/images/yellowfish.png';
import _red from './assets/images/redfish.png';

import _skyLoop from './assets/audio/sky-loop.mp3';
import _waterFx from './assets/audio/water.mp3';
import _screamFx from './assets/audio/scream.mp3';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('preloadScene');
  }

  preload() {
    this.cameras.main.setBackgroundColor('#3d3d6c');

    // display progress bar
    const { width } = this.cameras.main;
    const { height } = this.cameras.main;

    const progressBox = this.add.graphics();
    const progressBar = this.add.graphics();
    const boxWidth = 420;
    const boxHeight = 50;
    const boxX = (width / 2 - boxWidth / 2);
    const boxY = (height / 2 - boxHeight / 2);

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(boxX, boxY, boxWidth, boxHeight);

    const loadingText = this.make.text({
      x: width / 2 + 10,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
        fontStyle: 'bold',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffb11c, 1);
      progressBar.fillRect(boxX + 10, boxY + 10, (boxWidth - 20) * value, boxHeight - 20);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      this.scene.start('mainScene');
    });

    // load assets needed in our game
    this.load.audio('sky-loop', _skyLoop);
    this.load.audio('waterFx', _waterFx);
    this.load.audio('scream', _screamFx);

    this.load.image('winter', _winter);
    this.load.image('water', _water);
    this.load.image('boat', _boat);
    this.load.image('hook', _hook);

    this.load.spritesheet('bear', _bear, { frameWidth: 61, frameHeight: 58 });
    this.load.spritesheet('shark', _shark, { frameWidth: 194, frameHeight: 70 });
    this.load.spritesheet('redfish', _red, { frameWidth: 497, frameHeight: 326 });
    this.load.spritesheet('bluefish', _blue, { frameWidth: 497, frameHeight: 326 });
    this.load.spritesheet('yellowfish', _yellow, { frameWidth: 497, frameHeight: 326 });
    this.load.spritesheet('purplefish', _purple, { frameWidth: 149, frameHeight: 113 });
  }
}