import Phaser from 'phaser';

const Fish = (gameObject) => {
  // Immidiate actions
  (() => {
    gameObject.disableBody(true, true);
    gameObject.setPostion(-200, 700);
    gameObject.body.setCollideWorldBounds(true);
    gameObject.body.onWorldBounds = true;
  })();

  // Public properties
  const fishType = gameObject.texture.key;

  // Private properties
  let initSpeed;
  let initScale;

  switch (fishType) {
    case 'shark':
      initSpeed.a = 90;
      initSpeed.b = 130;
      initScale.a = 0.8;
      initScale.b = 1.2;
      break;
    case 'purplefish':
      initSpeed.a = 30;
      initSpeed.b = 80;
      initScale.a = 0.3;
      initScale.b = 0.5;
      break;
    case 'bluefish':
    case 'yellowfish':
    case 'redfish':
      initSpeed.a = 20;
      initSpeed.b = 60;
      initScale.a = 0.1;
      initScale.b = 0.16;
      break;
    default:
  }

  const spawn = (position = 'left') => {
    let pos;
    let offset;
    let moveToX;

    if (position === 'left') {
      pos = { x: -400, y: Phaser.Math.Between(355, 580) };
      offset = { x: gameObject.body.width * 2.8, y: gameObject.body.height * 1.3 };
      moveToX = 2000;
      gameObject.setFlipX(false);
    } else {
      pos = { x: 2000, y: Phaser.Math.Between(355, 580) };
      offset = { x: 0, y: gameObject.body.height * 1.3 };
      moveToX = 0;
      gameObject.setFlipX(true);
    }

    gameObject.enableBody(true, pos.x, pos.y, true, true);

    gameObject.anims.play(fishType, true);

    gameObject.angle = 0;
    gameObject.setScale(Phaser.Math.FloatBetween(initScale.a, initScale.b));
    gameObject.setBodySize(gameObject.body.width * 0.25, gameObject.body.height * 0.4, false);
    gameObject.body.setOffset(offset.x, offset.y);
    gameObject.body.setBoundsRectangle(new Phaser.Geom.Rectangle(-600, 150, 2100, 600));

    this.physics.moveTo(gameObject, moveToX, pos.y, Phaser.Math.Between(initSpeed.a, initSpeed.b));
  };


  return { fishType, spawn };
};

export default Fish;