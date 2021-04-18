import Phaser from 'phaser';
import _loginForm from './partials/_login.html';

export default class LoginScene extends Phaser.Scene {
  constructor() {
    super('loginScene');
  }

  preload() {
    this.load.html('loginForm', _loginForm);
  }

  create() {
    this.cameras.main.setBackgroundColor('#3d3d6c');
    const { width, height } = this.cameras.main;

    const element = this.add.dom(width / 2, height / 2).createFromCache('loginForm');

    element.addListener('click');

    element.on('click', (event) => {
      event.preventDefault();
      if (event.target.name === 'play-btn') {
        const inputUsername = element.getChildByID('username');

        if (inputUsername.value !== '') {
          //  Turn off the click events
          element.removeListener('click');
          this.scene.start('preloadScene');
        }
      }
    });
  }
}