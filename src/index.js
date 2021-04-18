import Phaser from 'phaser';
import config from './config';
import MainScene from './MainScene';
import PreloadScene from './PreloadScene';
import GameOverScene from './GameOverScene';
import './assets/styles/style.css';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('mainScene', MainScene);
    this.scene.add('preloadScene', PreloadScene);
    this.scene.add('preloadScene', GameOverScene);
    this.scene.start('preloadScene');
  }
}

window.game = new Game();
