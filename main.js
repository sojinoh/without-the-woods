
var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
    },
    audio: {
        disableWebAudio: true
    }
};

game = new Phaser.Game(config);

var content = [

    [//Scene 1 Amnesia:
        "Your eyes gradually open as you slowly float into consciousness. With your head",
        "",
        "pounding you open your eyes to realize you are lying flat on your back in the",
        "",
        "middle of Smail gallery. You glance to the backdoors only to realize it is pitch",
        "",
        "black outside. There is an eerie stillness to the place. The building itself is",
        "",
        "completely dark except for a light emanating from the top floor. Suddenly you",
        "",
        "hear a crash coming for the geology wing."
    ],
    [//Scene 2a. Top
        "You stand carefully. You feel slightly off balance as you walk up the main",
        "",
        "staircase to the third floor. There, sitting at the one of the circular tables",
        "",
        "of the top floor is man. From his young features, you figure he must be a student.",
        "",
        "You walk over to him. You need to try to understand what is going on.",

    ],
    [//Scene 2b. Dino
        "You stand carefully. You feel slightly off balance as you walk down the",
        "",
        "stairs towards the crash. As you come closer, you notice shards of glass",
        "",
        "scattered around a case containing a dinosaur skull. The case is broken,",
        "",
        "and you notice a note pinned between the dinosaur’s teeth. You pick up",
        "",
        "(action) the note. The notes reads, “They who hath awoken, hath stumbled",
        "",
        "upon the broken. Here upon these bones shall lead you deep into the unknown.",
        "",
        "Follow the red or suffer with dread.” You wonder what William Shakespeare",
        "",
        "was doing in OLRI. You also notice a trail of blood leading towards the staircase.",
        "",
        "You follow it and end up in a old part of the building, down a hallway you didn’t",
        "",
        "know existed. Along the way, you notice an orange and pick it up. It might be a clue.",
        "",
        "A small door opens at the end of the hallway, you crawl through."
    ]
];
var line = [];
var wordIndex = 0;
var lineIndex = 0;
var wordDelay = 120;
var lineDelay = 120;
var button1;
var button2;
var text1;
var currentDecision = 0;

function preload(){

    //load the audio asset

    this.load.audio('theme','assets/creepy.mp3');
}


function create() {

    //adds theme music to scene
    var theme = this.sound.add('theme');
    theme.play();

    //adds text to scene
    text1 = this.add.text(50, 100, '', { font: "14px Courier New", fill: "#ffffff", lineSpacing: 15 });
    nextLine(this);
    nextWord(this);
    button1 = this.add.text(150, 500, 'Go to the top floor', {font: "16px Courier New", fill: "#c51b7d"},actionOnClick1, this, 2, 1, 0)
        .setInteractive()
        .on('pointerdown', () => actionOnClick1(this) );
    button1.visible =! button1.visible
    button2 = this.add.text(450, 500, 'Go to the Geology wing', {font: "16px Courier New", fill: "#c51b7d"},actionOnClick2, this, 2, 1, 0)
        .setInteractive()
        .on('pointerdown', () => actionOnClick2(this) );
    button2.visible =! button2.visible
}
function nextLine(game) {
    if (lineIndex != content[currentDecision].length)
    {
        //  Split the current line on spaces, so one word per array element
        line = content[currentDecision][lineIndex].split(' ');
        console.log(line)
        //  Reset the word index to zero (the first word in the line)
        wordIndex = 0;
        //  Call the 'nextWord' function once for each word in the line (line.length)
        //console.log(game);
        game.time.addEvent({ delay: wordDelay, callback: () => nextWord(game), repeat: line.length -1, callbackScope: this});
        //  Advance to the next line
        lineIndex++;
    } else{
        button1.visible =! button1.visible
        button2.visible =! button2.visible
    }
}

function nextWord(game) {
    text1.y -= 2;
    //  Add the next word onto the text string, followed by a space
    if(line[wordIndex]){ text1.text = text1.text.concat(line[wordIndex] + " "); }
    //  Advance the word index to the next word in the line
    wordIndex++;
    //  Last word?
    if (wordIndex === line.length)
    {
        //  Add a carriage return
        text1.text = text1.text.concat("\n");
        console.log(game);
        //  Get the next line after the lineDelay amount of ms has elapsed
        game.time.addEvent({ delay: lineDelay, callback: () => nextLine(game), callbackScope: this});
        console.log(game + "passed");
        //nextLine(game);  //just trying to get it to work... go back to game.time
    }
}
function actionOnClick1 (game) {
    text1.text = "";
    text1.y = 100;
    button1.text = "";
    button2.text = "";
    currentDecision = 1;
    line = [];
    wordIndex = 0;
    lineIndex = 0;
    nextLine(game);
    nextWord(game);



}
function actionOnClick2 (game) {
    text1.text = "";
    text1.y = 100;
    button1.text = "";
    button2.text = "";
    currentDecision = 2;
    line = [];
    wordIndex = 0;
    lineIndex = 0;
    nextLine(game);
    nextWord(game);
}




// var StateLoad = new Phaser.Class({
//
//     Extends: Phaser.Scene,
//
//     initialize:
//
//         function StateLoad() {
//             Phaser.Scene.call(this, {key: 'stateLoad'});
//         },
//
//     preload: function () {
//
//         //https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/?a=13
//
//         //creates the progress bar for time loading assets
//
//         var progressBar = this.add.graphics();
//         var progressBox = this.add.graphics();
//         progressBox.fillStyle(0x222222, 0.8);
//         progressBox.fillRect(240, 270, 320, 50);
//
//
//         this.load.audio('theme', 'assets/creepy.mp3');
//         // this.load.image('background', 'assets/bandermac.png');
//
//         this.load.on('progress', function (value) {
//             console.log(value);
//             progressBar.clear();
//             progressBar.fillStyle(0xffffff, 1);
//             progressBar.fillRect(250, 280, 300 * value, 30);
//         });
//
//         this.load.on('fileprogress', function (file) {
//             console.log(file.src);
//         });
//
//         this.load.on('complete', function () {
//             console.log('complete');
//             progressBar.destroy();
//             progressBox.destroy();
//         });
//     },
//
//     create: function () {
//
//
//         var theme = this.sound.add('theme');
//         theme.play();
//         //
//         var background = this.add.sprite(0,0,'background');
//         background.setOrigin(0,0);
//
//
//
//
//         // //only fires after preload is done
//         // var statText = game.add.text(game.width / 2, 100, "Loading game assets....", {
//         //     fill: '#ffffff'
//         // });
//         // statText.anchor.set(.5, .5);
//
//     },
//
//     // update: function () {
//     //     if (this.cache.isSoundDecoded('music')) {
//     //         this.scene.start('stateMain');
//     //     }
//     // }
// });
//
// var StateMain = new Phaser.Class({
//
//     Extends: Phaser.Scene,
//
//     initialize:
//
//         function SceneB ()
//         {
//             Phaser.Scene.call(this, { key: 'stateMain' });
//         },
//
//     preload: function ()
//     {
//
//     },
//
//     create: function ()
//     {
//         var background = this.add.sprite(0,0,'background');
//         background.setOrigin(0,0);
//
//         var theme = this.sound.add('theme');
//         theme.play();
//     },
//
//     update: function (time, delta)
//     {
//
//     }
//
// });