class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        this.load.image('background', './assets/background.png');
    }
    
    create(){
        this.background= this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0,0);

        let menuConfig = {
            fontSize: '28px', 
            backgroundColor: 'transparent',
            color: 'blue',
            align: 'right',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 0
        };
        this.add.text(game.config.width/2, game.config.height/7 - borderUISize - borderPadding, 'Far From Home', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/5.9, 'Press I for instructions', menuConfig).setOrigin(0.5);
    
        this.add.text(game.config.width/2, game.config.height/2, 'Press -> to start game', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/1.2, 'Press C for credits', menuConfig).setOrigin(0.5);
      

        //define keys
    
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);




    }
    update(){

        
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
           

              this.scene.start("playtransitionScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyI)) {
           
              this.scene.start("instructionScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
           

              this.scene.start("creditScene");    
        }
        


    }

}