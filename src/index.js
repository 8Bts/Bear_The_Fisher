import Phaser from 'phaser';
import config from './config';
import LoginScene from './LoginScene';
import PreloadScene from './PreloadScene';
import MainScene from './MainScene';
import GameOverScene from './GameOverScene';
import './assets/styles/style.css';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('loginScene', LoginScene);
    this.scene.add('preloadScene', PreloadScene);
    this.scene.add('mainScene', MainScene);
    this.scene.add('preloadScene', GameOverScene);
    this.scene.start('loginScene');
  }
}

window.game = new Game();
