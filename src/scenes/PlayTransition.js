class PlayTransition extends Phaser.Scene {
    constructor(){
        super("playtransitionScene");
    }
    preload(){
        this.load.image('room', './assets/house.jpg');
        this.load.image('cage', './assets/new_cage.png');
        this.load.spritesheet('firebird', './assets/bird.png', {frameWidth: 600, frameHeight: 400})

    }

    create(){
        this.background = this.add.tileSprite(0, 0, 640, 480, 'room').setOrigin(0,0);
        this.cage = this.add.tileSprite(245, 45, 500, 500, 'cage').setOrigin(0,0).setScale(0.3);
        this.player = this.add.sprite(330, 150, 'firebird').setScale(0.2);

        // Animation config
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('firebird', { start: 1, end: 2, first: 1}),
            frameRate: 8,
            repeat: -1
        });



        this.player.play('fly');
        this.cameras.main.setBounds(0, 0, 640, 480);

        let camera = this.cameras.main;
        camera.setZoom(2.5);
        camera.pan(315, 125, 1000, 'Sine.easeInOut');
        camera.zoomTo(3, 3000);

        this.clock = this.time.addEvent({delay: 3000, callback: () => {
            this.scene.start('playScene');
        }, scope: this, loop: true});
    
    }

  }


   


   
    
  

