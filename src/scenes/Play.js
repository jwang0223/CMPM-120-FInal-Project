var control = false;

var mouse;
var input; 

var fireball; 

var worldBounds;

class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('window', './assets/window.png');
        this.load.image('cage1', './assets/cage_resized2.png');
        this.load.image('fireball', './assets/fireball.png');
        this.load.spritesheet('firebird', './assets/bird.png', {frameWidth: 125, frameHeight: 400, startFrame: 0, endFrame: 4})
        this.load.image('arm','./assets/arm.png');


    }

    create(){

        this.gameOver = false; 

        this.armHealth = 100;
        this.armDirection = Dir.Right;

        this.background = this.add.tileSprite(0, 0, 640, 480, 'window').setOrigin(0,0);
        this.cage = this.add.tileSprite(-80, -40, 800, 550, 'cage1').setOrigin(0,0);
        this.player = this.physics.add.sprite(320, 240, 'firebird').setScale(0.35);
        this.player.body.setSize(200, 150, true); // fix this 
        
        
        this.arm = this.physics.add.sprite(-400, 170, 'arm').setScale(0.3);
  
        fireball = this.physics.add.sprite(700, 700, 'fireball');

        //this.moveRight = true;
        this.armMoving = true;

        worldBounds = this.physics.world.bounds;

        let scoreConfig = {
            fontSize: '30px',
            fill: '#ffffff',
    
        };

        this.catHP = this.add.text(0 , 0, 'Robot Health: ' + this.armHealth, scoreConfig);



        // Animation Config for player
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('firebird', { start: 1, end: 2, first: 1}),
            frameRate: 8,
            repeat: -1
        });

        this.player.play('fly');

        // controls
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
       
        mouse = this.input.mousePointer;
        input = this.input;
       
        
    }

  
    update(){

        if (this.armHealth <= 0 || this.gameOver == true){
            this.catHP.setText("Robot Health: " + this.armHealth);
            this.gameDone();
        }
        
        if(this.gameOver == true && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }

        if(this.gameOver == true && Phaser.Input.Keyboard.JustDown(keyM)){
            this.scene.start("menuScene");
        }

        if(this.gameOver == false){



            // Spawn arm with random direction
            if (this.armReachedEnd()) {

                this.spawnarm();
            }
    
            // arm movement
            if (this.armMoving && !this.armReachedEnd()){
                // if moving left or right
                if (this.armDirection == Dir.Left || this.armDirection == Dir.Right) {
                    this.arm.x += 10 * this.armDirection[0];
                }

                else if (this.armDirection == Dir.Up || this.armDirection == Dir.Down) {
                    this.arm.y += 10 * this.armDirection[1];
                }




            }


            if (control == false && mouse.isDown){
                // create fireball when firing
                fireball = this.physics.add.sprite(this.player.x - 70, this.player.y - 7, 'fireball');
                // shoot fireball in direction of cursor
                this.physics.moveTo(fireball, input.x, input.y, 500);
                control = true;
            }
    
            
    
            if (fireball.x > worldBounds.width || fireball.y > worldBounds.height || fireball.x < 0 || fireball.y < 0){
                fireball.destroy();
                control = false;
            }
    
            if(keyLEFT.isDown && 150 < this.player.x) { // change width based on bird cage
                this.player.x -= 5;
                this.player.flipX = false;
            }
            if (keyRIGHT.isDown && this.player.x < 500) { // change width based on bird cage
                this.player.x += 5;
                this.player.flipX = true; 
            }
            if (keyUP.isDown && 170 < this.player.y) { // change width based on bird cage
                this.player.y -= 5;
            }
            if (keyDOWN.isDown && this.player.y < 400) { // change width based on bird cage
                this.player.y += 5;
            }

            this.physics.add.overlap(fireball, this.arm, reset, null, this);
            // Tracking for player and arm collision
            this.physics.add.overlap(this.player, this.arm, gameLost, null, this);
            this.catHP.setText("Robot Health: " + this.armHealth);
        }
    }

    gameDone(){
        let textConfig = {
            fontSize: '30px',
            fill: '#ffffff',
            stroke: 'black',
    
        };
        this.gameOver = true;
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', textConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or (M) to Menu', textConfig).setOrigin(0.5);
        
    }

    spawnarm() {
        // Pick and set random direction
        var rand = Math.floor(Math.random() * (Object.keys(Dir).length));
        this.armDirection = Dir[Object.keys(Dir)[rand]];

        // Set sprite rotation and hitbox
        switch(this.armDirection) {
            case Dir.Right:
                this.arm.setAngle(0);
                this.arm.body.setSize(980, 425);
                break;
            case Dir.Left:
                this.arm.setAngle(180);
                this.arm.body.setSize(980, 425);
                break;
            case Dir.Up:
                this.arm.setAngle(270);
                this.arm.body.setSize(425, 980);
                break;
            case Dir.Down:
                this.arm.setAngle(90);
                this.arm.body.setSize(425, 980);
                break;
        }

        // Left/right: Spawn arm with x depending on direction and random y within range, and move danger
        if (this.armDirection == Dir.Left || this.armDirection == Dir.Right) {
            this.arm.y = Math.floor(Phaser.Math.Between(170, 400));
            this.arm.x = 320 - (720 * this.armDirection[0]);

        }
        
        // Up/down: Spawn arm with y depending on direction and random x within range, and move danger
        else if (this.armDirection == Dir.Up || this.armDirection == Dir.Down) {
            this.arm.x = Math.floor(Phaser.Math.Between(170, 400));
            this.arm.y = 240 - (720 * this.armDirection[1]);

        }
    }

    // returns true or false depending on if arm has passed edge (when it should reset position)
    armReachedEnd() {
        if (this.armDirection == Dir.Right && this.arm.x >= 900) {
            return true;
        }
        
        else if (this.armDirection == Dir.Left && this.arm.x <= -260) {
            return true;
        }

        else if (this.armDirection == Dir.Up && this.arm.y <= -260) {
            return true;
        }

        else if (this.armDirection == Dir.Down && this.arm.y >= 740) {
            return true;
        }

        else return false;
    }
}

function reset(fireball, arm) {
    fireball.destroy();
    this.armMoving = false;
    this.spawnarm();

    this.Delayarm = this.time.addEvent({delay: 2000, callback: () => {
        this.armMoving = true;

    }, scope: this, loop: false});
    this.armHealth -= 5;
    this.arm.x -= 80 * this.armDirection[0];
    control = false;
}

function gameLost() {
    this.gameOver = true;
}


   


   
    
  

