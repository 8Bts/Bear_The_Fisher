import Phaser from 'phaser';

import MainScene from './MainScene';

const config = {
  type: Phaser.AUTO,
  width: 950,
  height: 620,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  scene: [MainScene],
};
const game = new Phaser.Game(config);
