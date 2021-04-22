import Phaser from 'phaser';
import Fish from './fish';
import Leaderboard from './leaderboard';

let backMusic;

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'mainScene' });
    this.player = null;
    this.cursors = null;
    this.score = 0;
    this.maxScorePromise = null;
    this.checkpoint = 250;
    this.scoreText = null;
    this.tempScoreText = null;
    this.hook = null;
    this.boat = null;
    this.line = null;
    this.graphics = null;
    this.fishes = null;

    this.hookIsBusy = false;
    this.hookIsDown = false;
    this.hookIsOnMove = false;
    this.sharkIsOn = false;

    this.waterFx = null;
    this.scream = null;
    this.scoreTween = null;
  }

  create() {
    this.createAnims();
    this.score = 0;

    this.add.image(483, 83, 'island').setScale(0.96);
    this.add.image(400, 444, 'water');

    if (backMusic === undefined) {
      backMusic = this.sound.add('sky-loop', { loop: true });
      backMusic.play();
    }
    this.waterFx = this.sound.add('waterFx', { loop: false });
    this.scream = this.sound.add('scream', { loop: false });

    this.boat = this.physics.add.staticSprite(400, 268, 'boat');
    this.boat.setScale(0.5);
    this.boat.setBodySize(300, 100, true);
    this.boat.setOffset(100, 0);

    this.player = this.physics.add.staticSprite(370, 198, 'bear');
    this.player.setScale(1.5);

    this.hook = this.physics.add.sprite(409, 283, 'hook');

    this.hook.setBodySize(10, 10, true);
    this.hook.body.debugBodyColor = '008';
    this.hook.body.onWorldBounds = true;
    this.hook.body.setCollideWorldBounds(true);

    this.line = new Phaser.Geom.Line(413, 175, 413, this.hook.y - 5);

    this.graphics = this.add.graphics({ lineStyle: { width: 1, color: 0xb3d5ff } });
    this.graphics.strokeLineShape(this.line);

    this.fishes = this.physics.add.group();

    const shark = this.fishes.create(0, 0, 'shark');

    Fish(shark, this).spawn('left');

    Fish(this.fishes.create(0, 0, 'bluefish'), this).spawn('left');
    Fish(this.fishes.create(0, 0, 'bluefish'), this).spawn('right');
    Fish(this.fishes.create(0, 0, 'bluefish'), this).spawn('left');

    Fish(this.fishes.create(0, 0, 'yellowfish'), this).spawn('left');
    Fish(this.fishes.create(0, 0, 'yellowfish'), this).spawn('right');
    Fish(this.fishes.create(0, 0, 'yellowfish'), this).spawn('right');

    Fish(this.fishes.create(0, 0, 'redfish'), this).spawn('left');
    Fish(this.fishes.create(0, 0, 'redfish'), this).spawn('right');

    Fish(this.fishes.create(0, 0, 'purplefish'), this).spawn('right');

    this.player.anims.play('bear', true);

    // colliders
    this.physics.add.collider(this.fishes, this.boat, this.cought, null, this);
    this.physics.add.overlap(this.fishes, shark, MainScene.sharkAttack, null, this);
    this.physics.add.overlap(this.fishes, this.hook, this.onHook, null, this);
    this.physics.add.overlap(this.boat, this.hook, () => {
      this.hook.setVelocityY(0);
      this.hookIsOnMove = false;
    }, null, this);

    // onWorldBounds event
    this.physics.world.on('worldbounds', (body, up, down, left) => {
      // if the body belongs to this.hook object and it has collided with bottom border
      if (body.gameObject.texture.key === 'hook' && down) {
        this.hookIsOnMove = false;
        body.gameObject.setVelocityY(0);
        return;
      }

      body.gameObject.setVelocityX(0);
      // If the object is at left
      if (left) {
        body.gameObject.fishClass.spawn('left');
      } else {
        body.gameObject.fishClass.spawn('right');
      }
    });

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    //  The score
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#feffea', fontStyle: 'bold' });
    this.tempScoreText = this.add.text(420, 170, '', { fontSize: '24px', fill: '#00ff00', fontStyle: 'bold' });

    this.scoreTween = this.tweens.add({
      targets: this.tempScoreText,
      props: {
        y: { value: '-=90', duration: 3600, ease: 'Linear' },
        alpha: { value: 0, duration: 3500, ease: 'Quad.easeOut' },
      },
    });
    this.scoreTween.pause();
  }

  update() {
    this.line.y2 = this.hook.y - 5;
    this.graphics.clear();
    this.graphics.strokeLineShape(this.line);

    if (this.cursors.space.isDown) {
      if (this.hookIsOnMove) return;
      if (this.hookIsDown) this.physics.moveTo(this.hook, this.hook.x, 409, 100);
      else {
        this.hookIsDown = true;
        this.physics.moveTo(this.hook, this.hook.x, 588, 100);
      }
      this.hookIsOnMove = true;
    }
  }

  createAnims() {
    this.anims.create({
      key: 'shark',
      frames: this.anims.generateFrameNumbers('shark', { start: 0, end: 9 }),
      frameRate: 7,
      repeat: -1,
    });

    this.anims.create({
      key: 'sharkBite',
      frames: this.anims.generateFrameNumbers('shark', { start: 10, end: 12 }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: 'redfish',
      frames: this.anims.generateFrameNumbers('redfish', { start: 0, end: 19 }),
      frameRate: 7,
      repeat: -1,
    });

    this.anims.create({
      key: 'bluefish',
      frames: this.anims.generateFrameNumbers('bluefish', { start: 0, end: 19 }),
      frameRate: 7,
      repeat: -1,
    });

    this.anims.create({
      key: 'yellowfish',
      frames: this.anims.generateFrameNumbers('yellowfish', { start: 0, end: 19 }),
      frameRate: 7,
      repeat: -1,
    });

    this.anims.create({
      key: 'purplefish',
      frames: this.anims.generateFrameNumbers('purplefish', { start: 0, end: 12 }),
      frameRate: 7,
      repeat: -1,
    });

    this.anims.create({
      key: 'bear',
      frames: [{ key: 'bear', frame: 0 }],
      frameRate: 1,
      repeat: -1,
    });

    this.anims.create({
      key: 'bearPulls',
      frames: this.anims.generateFrameNumbers('bear', { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1,
    });

    this.anims.create({
      key: 'bearSmile',
      frames: [{ key: 'bear', frame: 2 }],
      frameRate: 1,
    });
  }

  cought(boat, fish) {
    this.hook.setVelocityY(0);
    fish.disableBody(true, true);

    // Game Over condition
    if (fish.texture.key === 'shark') {
      this.physics.pause();
      this.player.anims.play('bear', false);
      this.scream.play();
      this.hookIsBusy = false;
      this.hookIsOnMove = false;
      this.sharkIsOn = false;
      this.maxScorePromise = Leaderboard.offerScore(window.username, this.score);
      this.scene.pause();
      this.scene.launch('gameOverScene');
      return;
    }
    const fishScore = fish.fishClass.getScore();

    this.player.anims.play('bearSmile', true);
    this.player.anims.playAfterDelay('bear', 2500);
    this.score += fishScore;
    this.tempScoreText.setText(fishScore);
    this.tempScoreText.setColor('#00ff00');

    if (this.score >= this.checkpoint) {
      this.checkpoint += 250;
      const newShark = Fish(this.fishes.create(0, 0, 'shark'), this).spawn('left');
      this.physics.add.overlap(this.fishes, newShark, MainScene.sharkAttack, null, this);
    }


    this.waterFx.play();
    this.scoreText.setText(`Score: ${this.score}`);

    this.hookIsBusy = false;
    this.hookIsOnMove = false;
    this.sharkIsOn = false;

    fish.fishClass.spawn('left');
    this.scoreTween.play();
  }

  pullOut(fish) {
    this.physics.moveTo(fish, fish.x, 229, 100);
    this.physics.moveTo(this.hook, this.hook.x, 229, 100);

    this.player.anims.play('bearPulls', true);
    if (fish.texture.key === 'shark') fish.anims.play('sharkBite', true);
  }

  onHook(hook, fish) {
    if (this.hookIsBusy && fish.texture.key !== 'shark') return;
    if (this.sharkIsOn) return;
    if (fish.texture.key === 'shark') this.sharkIsOn = true;

    this.hookIsBusy = true;
    this.hookIsOnMove = true;

    let mOffset;
    if (fish.fishClass.getDirection() === 'right') {
      mOffset = -5;
      fish.setOffset(fish.body.sourceWidth * 1.7, fish.body.sourceHeight * 0.5);
      fish.angle = 270;
    } else {
      mOffset = 10;
      fish.setOffset(fish.body.sourceWidth * 1.1, fish.body.sourceHeight * 0.4);
      fish.angle = 90;
    }

    fish.setPosition(this.hook.x + mOffset, this.hook.y);
    this.pullOut(fish);
  }


  static sharkAttack(shark, fish) {
    if (shark.texture.key === 'shark' && fish.texture.key !== 'shark') {
      if (((Math.round(shark.body.x) % 3 !== 0) || shark.isFull) && !this.hookIsBusy) return;

      shark.anims.play('sharkBite', false);
      fish.disableBody(true, true);
      fish.fishClass.spawn('right');
      shark.anims.playAfterDelay('shark', 1000);
      shark.isFull = true;
      this.time.delayedCall(Phaser.Math.Between(3000, 6000), () => {
        shark.isFull = false;
      }, null, this);
    }
  }
}

export default MainScene;