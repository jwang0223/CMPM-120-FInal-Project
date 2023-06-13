class Credit extends Phaser.Scene {
    constructor(){
        super("creditScene");
    }
    create(){
        this.background= this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0,0);
        
        let creditConfig = { 
            fontSize: '22px', 
            backgroundColor: 'transparent',
            color: 'blue',
            align: 'right',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 0
        };

        let mssgConfig = {
            fontSize: '18px', 
            backgroundColor: 'transparent',
            color: 'blue',
            align: 'center',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 0
        };
        const mssg = 
        `Jackie Wang
       
        Built with: Phaser 3, Javascript 


        `;
        this.add.text(game.config.width/2, game.config.height/10 - borderUISize - borderPadding, 'Credits', creditConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/5, mssg , mssgConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3.5, 'Click <- to go back to menu' , creditConfig).setOrigin(0.5);


        

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

        

    }
    update(){

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
              this.scene.start("menuScene");    
        }
    }

}