import Phaser from 'phaser';
import _gameOverCont from './partials/_game_over.html';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('gameOverScene');
  }

  preload() {
    this.load.html('gameOverCont', _gameOverCont);
  }

  create() {
    this.cameras.main.setBackgroundColor('rgba(0, 6, 17, 0.37)');
    const { width, height } = this.cameras.main;
    const { score } = this.scene.get('mainScene');

    const element = this.add.dom(width / 2, height / 2).createFromCache('gameOverCont');

    element.getChildByID('scoreTotal').innerText = `Your score: ${score}`;
    element.getChildByID('gameOverName').innerText = username;

    element.addListener('click');

    element.on('click', (event) => {
      if (event.target.name === 'try-again-btn') {
        this.scene.start('mainScene');
        this.scene.stop();
      }
    });
  }
}