import Phaser from 'phaser';


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
};

export default config;