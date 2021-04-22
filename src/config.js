import Phaser from 'phaser';


const config = {
  type: Phaser.AUTO,
  width: 950,
  height: 600,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  dom: {
    createContainer: true,
  },
};

export default config;