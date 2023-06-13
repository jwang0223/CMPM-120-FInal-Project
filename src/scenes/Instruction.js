class Instruction extends Phaser.Scene {
    constructor(){
        super("instructionScene");
    }
    create(){
        this.background= this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0,0);
        
        let instructionConfig = {
            fontSize: '25px', 
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
            fontSize: '15px', 
            backgroundColor: 'transparent',
            color: 'blue',
            align: 'center',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 0
        };
        const mssg = `"Far From Home" is a 2D game about a Bird Trying to Escape from the AI. 
        Your goal in the game is to escape the room by 
        defeating the robot trying to kill you.
        The Game is Influence by the popular movie 
        '2001: A Space Odyssey' in one of the scene
        where the main character had to fight against AI to survive. 
        But in this case is the 
        bird trying to live as human race 
        no longer exist as AI took over the world.
        Use WASD to move and Left Click to Protect Yourself
        `;
        this.add.text(game.config.width/2, game.config.height/7 - borderUISize - borderPadding, 'Instructions', instructionConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 250, mssg , mssgConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 450, 'Click <- to go back to menu' , instructionConfig).setOrigin(0.5);

        

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

        

    }
    update(){
        
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {

              this.scene.start("menuScene");    
        }
    }

}
