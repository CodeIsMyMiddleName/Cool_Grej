const root = document.getElementById("root");
const reactionTest = document.getElementById("reactionTest");

// Constants
const FONTTYPE1 = "oblique normal bold 60px/0.3 'Times New Roman', serif";
const FONTTYPE2 = "normal normal bold 20px 'Arial', sans-serif";

class Minigame {
    constructor() {
        this.guiElements = [];
        this.highscore = NaN;
        this.title = "";
    }
    
    createGame() { // är nu startsidan av default pga oväntade ändringar i strukturen.
        // GUI Element skapas
        createImage("https://www.shutterstock.com/shutterstock/photos/277499918/display_1500/stock-photo-cool-skeleton-heart-a-cool-skeleton-wearing-a-leather-jacket-and-sunglasses-with-a-smoke-in-his-277499918.jpg", 
            "startBild",
            300,
            300);

        createButton("activateReactionTest", "Reaktionsförmåge Test", activateReactionTest);

        createText("startText", "Välj ett spel för att komma igång!", "black", FONTTYPE2);

        // GUI Element delas in i sitt objekt
        var startTitle = document.getElementById("startText");
        startSida.guiElements.push(startTitle);
        
        var startImage = document.getElementById("startBild");
        startSida.guiElements.push(startImage);
        
        var activateReactionButton = document.getElementById("activateReactionTest"); 
        startSida.guiElements.push(activateReactionButton);

        
    }

    removeGame() {
        for (let element of this.guiElements) {
            root.removeChild(element);
        }
    }
}

class ReactionSpeedTest extends Minigame {
    constructor() {
        super();
        this.currentTime = NaN;
        this.totalTries = [];
        this.randomWaitTime = 0;
    }
    createGame() {
        //GUI Element Skapas
        createText("reactionTitle", "Reaktions Test", "black", FONTTYPE1);

        createImage("https://archive.is/dl1VH/80bfd71fe2ef1eb38780e9263424c34e1966eba8.jpg", "coolSmiley", 100, 100);
        
        createImage("https://i.pinimg.com/originals/eb/d0/52/ebd0520f733cc1e8edbc352cec076fb5.gif", "sadSmiley", 100, 100);

        createText("reaktionsBeskrivning1", "Du kommer att visas 2 bilder i slumpmessig ordning", "black", FONTTYPE2);
        createText("reaktionsBeskrivning2", "Klicka på bilden som säger cool så snabbt som möjligt så får du ett betyg efter 4 försök!", "black", FONTTYPE2);

        createButton("reaktionsStart", "Start!", reactionSpeedTest.reactionTestStart);

        // GUI Element indelas i minigames
        var reactionTitle = document.getElementById("reactionTitle");
        reactionSpeedTest.guiElements.push(reactionTitle);

        var coolSmiley = document.getElementById("coolSmiley");
        reactionSpeedTest.guiElements.push(coolSmiley);

        var sadSmiley = document.getElementById("sadSmiley");
        reactionSpeedTest.guiElements.push(sadSmiley);

        var reaktionsBeskrivning1 = document.getElementById("reaktionsBeskrivning1");
        reactionSpeedTest.guiElements.push(reaktionsBeskrivning1);

        var reaktionsBeskrivning2 = document.getElementById("reaktionsBeskrivning2");
        reactionSpeedTest.guiElements.push(reaktionsBeskrivning2);
        
        var reactionStart = document.getElementById("reaktionsStart");
        reactionSpeedTest.guiElements.push(reactionStart);
        
    }
    
    randomImageOrder() {
        var randint = Math.floor(Math.random() * 10);

        if(randint < 5) {
            createButton("imgButtonCool", "", this.correctPress, "https://archive.is/dl1VH/80bfd71fe2ef1eb38780e9263424c34e1966eba8.jpg", "100px", "100px");
            createButton("imgButtonSad", "", null, "https://i.pinimg.com/originals/eb/d0/52/ebd0520f733cc1e8edbc352cec076fb5.gif", "100px", "100px");
        } else {
            createButton("imgButtonSad", "", null, "https://i.pinimg.com/originals/eb/d0/52/ebd0520f733cc1e8edbc352cec076fb5.gif", "100px", "100px");
            createButton("imgButtonCool", "", this.correctPress, "https://archive.is/dl1VH/80bfd71fe2ef1eb38780e9263424c34e1966eba8.jpg", "100px", "100px");
        }
    }

    correctPress() {

    }
    
    reactionTestStart() {
        reactionSpeedTest.removeGame();
        
        //GUI Element Skapas
        createText("reactionTitle", "Reaktions Test", "black", FONTTYPE1);
        
        createText("latestSpeed", String(reactionSpeedTest.currentTime));
        
        // siffra mellan 3 och 6
        this.randomWaitTime = Math.floor(Math.random() * 3) + 3;
        
        // () => skapar en 
        //setTimeout(() => this.randomImageOrder(), this.randomWaitTime * 1000);
        console.log(this);
        this.randomImageOrder();
        
        // GUI Element indelas i minigames
        var reactionTitle = document.getElementById("reactionTitle");
        reactionSpeedTest.guiElements.push(reactionTitle);
        
        var coolSmiley = document.getElementById("coolSmiley");
        reactionSpeedTest.guiElements.push(coolSmiley);
        
        var sadSmiley = document.getElementById("sadSmiley");
        reactionSpeedTest.guiElements.push(sadSmiley);
        
        var latestSpeed = document.getElementById("latestSpeed");
        reactionSpeedTest.guiElements.push(latestSpeed);
    }
}
    

    function createImage(src, id, width, height) {
    var img = document.createElement("img");
    img.src = src;
    img.setAttribute("id", id)
    img.width = width;
    img.height = height;

    root.appendChild(img);
}

function createText(id, str, color, font) {
    var textNode = document.createTextNode(str);
    var paragraph = document.createElement("p");

    paragraph.setAttribute("id", id);
    paragraph.style.color = color;
    paragraph.style.font = font;

    paragraph.appendChild(textNode);
    root.appendChild(paragraph);
}

function createButton(id, name, onclick, src = null, height = 0, width = 0) {
    let button = document.createElement("button");
    button.setAttribute("id", id);
    button.textContent = name;
    
    if(onclick != null) {    
        button.addEventListener("click", onclick.bind(reactionSpeedTest));
    }

    if(src != null) {
        var imgElement = document.createElement('img');
        imgElement.src = src;
        imgElement.alt = "Bilden finns inte tillgänglig";
        imgElement.style.height = height;
        imgElement.style.width = width;

        button.appendChild(imgElement);
    }

    root.appendChild(button);
}

function activateGame(game, removedGame) {
    removedGame.removeGame();

    game.createGame();
    lastGame = reactionSpeedTest;
}

function activateReactionTest() {
    activateGame(reactionSpeedTest, lastGame);
}


// Skapa spelen
let startSida = new Minigame;
let reactionSpeedTest = new ReactionSpeedTest;

// variabel som underlättar byte av minigame
let lastGame = startSida;

//Aktivera Hemsidan
startSida.createGame();