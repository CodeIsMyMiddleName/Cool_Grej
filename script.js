const root = document.getElementById("root");
const reactionTest = document.getElementById("reactionTest");

// Constants
const FONTTYPE1 = "oblique normal bold 60px/0.3 'Times New Roman', serif";
const FONTTYPE2 = "normal normal bold 20px 'Arial', sans-serif";

class Minigame {
    constructor() {
        this.guiElements = [];
        this.highscore = NaN;
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
        let startTitle = document.getElementById("startText");
        startSida.guiElements.push(startTitle);
        
        let startImage = document.getElementById("startBild");
        startSida.guiElements.push(startImage);
        
        let activateReactionButton = document.getElementById("activateReactionTest"); 
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
        this.startTime = 0;
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
        let reactionTitle = document.getElementById("reactionTitle");
        reactionSpeedTest.guiElements.push(reactionTitle);

        let coolSmiley = document.getElementById("coolSmiley");
        reactionSpeedTest.guiElements.push(coolSmiley);

        let sadSmiley = document.getElementById("sadSmiley");
        reactionSpeedTest.guiElements.push(sadSmiley);

        let reaktionsBeskrivning1 = document.getElementById("reaktionsBeskrivning1");
        reactionSpeedTest.guiElements.push(reaktionsBeskrivning1);

        let reaktionsBeskrivning2 = document.getElementById("reaktionsBeskrivning2");
        reactionSpeedTest.guiElements.push(reaktionsBeskrivning2);
        
        let reactionStart = document.getElementById("reaktionsStart");
        reactionSpeedTest.guiElements.push(reactionStart);
        
    }
    
    randomImageOrder() {
        let randint = Math.floor(Math.random() * 10);

        this.startTime = new Date();

        if(randint < 5) {
            createButton("imgButtonCool", "", this.correctPress, "https://archive.is/dl1VH/80bfd71fe2ef1eb38780e9263424c34e1966eba8.jpg", "100px", "100px");
            createButton("imgButtonSad", "", null, "https://i.pinimg.com/originals/eb/d0/52/ebd0520f733cc1e8edbc352cec076fb5.gif", "100px", "100px");
        } else {
            createButton("imgButtonSad", "", null, "https://i.pinimg.com/originals/eb/d0/52/ebd0520f733cc1e8edbc352cec076fb5.gif", "100px", "100px");
            createButton("imgButtonCool", "", this.correctPress, "https://archive.is/dl1VH/80bfd71fe2ef1eb38780e9263424c34e1966eba8.jpg", "100px", "100px");
        }
    }

    correctPress() {
        let time = new Date();
        let deltaTime = time - this.startTime;
        this.currentTime = new Date(deltaTime);
        console.log(deltaTime);
        console.log(this.currentTime.toLocaleString("en-GB", { timeZone: "Europe/London", fractionalSecondDigits: 3, minute: '2-digit', second: '2-digit' }));
    }
    
    reactionTestStart() {
        reactionSpeedTest.removeGame();

        //GUI Element Skapas
        createText("reactionTitle", "Reaktions Test", "black", FONTTYPE1);
        
        createText("latestSpeed", String(reactionSpeedTest.currentTime));
        
        // siffra mellan 3 och 6
        this.randomWaitTime = Math.floor(Math.random() * 3) + 3;
        
        // () => skapar en 
        setTimeout(() => this.randomImageOrder(), this.randomWaitTime * 1000);
        
        // GUI Element indelas i minigames
        let reactionTitle = document.getElementById("reactionTitle");
        reactionSpeedTest.guiElements.push(reactionTitle);
        
        let coolSmiley = document.getElementById("coolSmiley");
        reactionSpeedTest.guiElements.push(coolSmiley);
        
        let sadSmiley = document.getElementById("sadSmiley");
        reactionSpeedTest.guiElements.push(sadSmiley);
        
        let latestSpeed = document.getElementById("latestSpeed");
        reactionSpeedTest.guiElements.push(latestSpeed);
    }
}
    

    function createImage(src, id, width, height) {
    let img = document.createElement("img");
    img.src = src;
    img.setAttribute("id", id)
    img.width = width;
    img.height = height;

    root.appendChild(img);
}

function createText(id, str, color, font) {
    let textNode = document.createTextNode(str);
    let paragraph = document.createElement("p");

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
        let imgElement = document.createElement('img');
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