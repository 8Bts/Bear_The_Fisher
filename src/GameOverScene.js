import Phaser from 'phaser';
import _gameOverCont from './partials/_game_over.html';
import Table from './helpers/highscore_table';

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
    const { score, maxScorePromise } = this.scene.get('mainScene');

    const gameOverCont = this.add.dom(width / 2, height / 2).createFromCache('gameOverCont');

    gameOverCont.getChildByID('scoreTotal').innerText = `Your score: ${score}`;

    maxScorePromise.then(maxScore => {
      gameOverCont.getChildByID('scoreBest').innerText = `Best score: ${maxScore}`;
    });

    gameOverCont.getChildByID('gameOverName').innerText = window.username;

    gameOverCont.addListener('click');

    gameOverCont.on('click', (event) => {
      if (event.target.name === 'try-again-btn') {
        this.scene.start('mainScene');
        this.scene.stop();
      } else if (event.target.name === 'leaderboard-btn') {
        Table.renderTable(this);
      }
    });
  }
}