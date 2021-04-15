import Phaser from 'phaser';

const Fish = (gameObject, scope) => {
  // Immidiate actions
  (() => {
    gameObject.setPosition(-200, gameObject.texture.key === 'shark' ? 600 : 700);
    gameObject.body.setCollideWorldBounds(true);
    gameObject.setBodySize(gameObject.body.width * 0.25, gameObject.body.height * 0.4, false);
    gameObject.body.onWorldBounds = true;
  })();

  // Private properties
  const initSpeed = {};
  const initScale = {};

  let value = 0;
  let scorePivot = 0;
  let bonus = 0;
  let direction = 'right';


  switch (gameObject.texture.key) {
    case 'shark':
      initSpeed.a = 90;
      initSpeed.b = 130;
      initScale.a = 0.8;
      initScale.b = 1;
      value = 0;
      scorePivot = 0;
      bonus = 0;
      break;
    case 'purplefish':
      initSpeed.a = 50;
      initSpeed.b = 80;
      initScale.a = 0.3;
      initScale.b = 0.5;
      value = 150;
      scorePivot = 0.38;
      bonus = 100;
      break;
    case 'bluefish':
    case 'yellowfish':
    case 'redfish':
      initSpeed.a = 40;
      initSpeed.b = 60;
      initScale.a = 0.1;
      initScale.b = 0.16;
      value = 50;
      scorePivot = 0.14;
      bonus = 25;
      break;
    default:
  }

  const getScore = () => {
    console.log(`value(${value}) + (gameObject.scale(${gameObject.scale}) > scorePivot${scorePivot})? output: ${gameObject.scale > scorePivot})`);
    return (gameObject.scale > scorePivot) ? (value + bonus) : value;
  };

  const getDirection = () => direction;

  const spawn = (position = 'left') => {
    let pos;
    let offset;
    let moveToX;

    if (position === 'left') {
      direction = 'right';
      pos = { x: -50, y: Phaser.Math.Between(355, 580) };
      offset = { x: gameObject.body.sourceWidth * 2.8, y: gameObject.body.sourceHeight * 1.3 };
      moveToX = 2000;
      gameObject.setFlipX(false);
    } else {
      direction = 'left';
      pos = { x: 1250, y: Phaser.Math.Between(355, 580) };
      offset = { x: 0, y: gameObject.body.sourceHeight * 1.3 };
      moveToX = 0;
      gameObject.setFlipX(true);
    }

    gameObject.enableBody(true, pos.x, pos.y, true, true);

    gameObject.anims.play(gameObject.texture.key, true);

    gameObject.angle = 0;
    gameObject.setScale(Phaser.Math.FloatBetween(initScale.a, initScale.b));
    gameObject.body.setOffset(offset.x, offset.y);
    gameObject.body.setBoundsRectangle(new Phaser.Geom.Rectangle(-500, 150, 1900, 900));

    scope.physics.moveTo(gameObject, moveToX, pos.y, Phaser.Math.Between(initSpeed.a, initSpeed.b));

    return gameObject;
  };

  const obj = {
    gameObject, getScore, getDirection, spawn,
  };
  gameObject.fishClass = obj; // Add reference to actual game object

  return obj;
};

export default Fish;