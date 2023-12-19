const root = document.getElementById("root");
const reactionTest = document.getElementById("reactionTest");

// Constants
const FONTTYPE1 = "oblique normal bold 60px 'Times New Roman', serif";
const FONTTYPE2 = "normal normal bold 20px 'Arial', sans-serif";
const FONTTYPE3 = "normal normal bold 30px 'Times New Roman', serif";
const FONTTYPE4 = "oblique normal bold 50px/0.1 'Times New Roman', serif";
class Minigame {
    constructor() {
        this.guiElements = [];
        this.highscore = NaN;
    }
    
    createGame() { // är nu startsidan av default pga oväntade ändringar i strukturen.
        // GUI Element skapas
        createText("startTitle", "GrymmaSpelTM", "darkgreen", FONTTYPE4);

        createImage("https://www.shutterstock.com/shutterstock/photos/277499918/display_1500/stock-photo-cool-skeleton-heart-a-cool-skeleton-wearing-a-leather-jacket-and-sunglasses-with-a-smoke-in-his-277499918.jpg", 
            "startBild",
            300,
            300);

        createButton("activateReactionTest", "Reaktionsförmåge Test", activateReactionTest);

        createText("startText", "Välj ett spel för att komma igång!", "black", FONTTYPE2);

        // GUI Element delas in i sitt objekt
        let startTitle = document.getElementById("startTitle");
        startSida.guiElements.push(startTitle);
        
        let startText = document.getElementById("startText");
        startSida.guiElements.push(startText);

        let startImage = document.getElementById("startBild");
        startSida.guiElements.push(startImage);
        
        let activateReactionButton = document.getElementById("activateReactionTest"); 
        startSida.guiElements.push(activateReactionButton);

        
    }

    removeGame() {   
        for (let element of this.guiElements) {
            root.removeChild(element);
        }
        this.guiElements = [];
    }
}

class ReactionSpeedTest extends Minigame {
    constructor() {
        super();
        this.currentTime = NaN;
        this.displayMessage = "Vänta!";
        this.totalTries = [];
        this.randomWaitTime = 0;
        this.startTime = null;
        this.rounds = 1;
    }

    createGame() {
        this.currentTime = NaN;
        this.displayMessage = "Vänta!";
        this.totalTries = [];

        //GUI Element Skapas
        createText("reactionTitle", "Reaktions Test", "black", FONTTYPE1);

        createImage("https://archive.is/dl1VH/80bfd71fe2ef1eb38780e9263424c34e1966eba8.jpg", "coolSmiley", 100, 100);
        
        createImage("https://i.pinimg.com/originals/eb/d0/52/ebd0520f733cc1e8edbc352cec076fb5.gif", "sadSmiley", 100, 100);

        createText("reaktionsBeskrivning1", "Du kommer att visas 2 bilder i slumpmessig ordning", "black", FONTTYPE2);
        createText("reaktionsBeskrivning2", `Klicka på bilden som säger cool så snabbt som möjligt så får du ett betyg efter ${this.rounds} försök!`, "black", FONTTYPE2);

        createButton("reaktionsStart", "Start!", this.reactionTestStart);

        // GUI Element indelas i minigames
        let reactionTitle = document.getElementById("reactionTitle");
        this.guiElements.push(reactionTitle);

        let coolSmiley = document.getElementById("coolSmiley");
        this.guiElements.push(coolSmiley);

        let sadSmiley = document.getElementById("sadSmiley");
        this.guiElements.push(sadSmiley);

        let reaktionsBeskrivning1 = document.getElementById("reaktionsBeskrivning1");
        this.guiElements.push(reaktionsBeskrivning1);

        let reaktionsBeskrivning2 = document.getElementById("reaktionsBeskrivning2");
        this.guiElements.push(reaktionsBeskrivning2);
        
        let reactionStart = document.getElementById("reaktionsStart");
        this.guiElements.push(reactionStart);
        
    }

    resetGame() {
        this.removeGame();
        this.createGame();
    }
    
    randomImageOrder() {
        let randint = Math.floor(Math.random() * 10);

        this.startTime = new Date();

        document.getElementById("latestMessage").innerText = "Kör!";

        if(randint < 5) {
            createButton("imgButtonCool", "", this.correctPress, "https://archive.is/dl1VH/80bfd71fe2ef1eb38780e9263424c34e1966eba8.jpg", "100px", "100px");
            createButton("imgButtonSad", "", null, "https://i.pinimg.com/originals/eb/d0/52/ebd0520f733cc1e8edbc352cec076fb5.gif", "100px", "100px");
        } else {
            createButton("imgButtonSad", "", null, "https://i.pinimg.com/originals/eb/d0/52/ebd0520f733cc1e8edbc352cec076fb5.gif", "100px", "100px");
            createButton("imgButtonCool", "", this.correctPress, "https://archive.is/dl1VH/80bfd71fe2ef1eb38780e9263424c34e1966eba8.jpg", "100px", "100px");
        }
        // GUI Element indelas i minigames
        let imgButtonCool = document.getElementById("imgButtonCool");
        this.guiElements.push(imgButtonCool);

        let imgButtonSad = document.getElementById("imgButtonSad");
        this.guiElements.push(imgButtonSad);

    }

    scoreboard() {
        this.removeGame();
        
        //räknar ut genomsnittliga tiden
        let addedTime = 0;
        for (let element in this.totalTries) {
            addedTime += this.totalTries[element];
        }
        let averageTime = new Date(Math.round(addedTime / this.totalTries.length));

        //snabbaste tiden
        let fastestTime = new Date(Math.min(...this.totalTries));

        //GUI Element Skapas
        createText("reactionTitle", "Reaktions Test", "black", FONTTYPE1);
        createText("resultsTitle", "Resultat:", "black", FONTTYPE3);

        createText("averageTimeDisplay", `Din genomsnittliga tid var ${averageTime.toLocaleString("en-GB", { timeZone: "Europe/London", fractionalSecondDigits: 3, second: '2-digit' })}s.`, "black", FONTTYPE2);
        createText("fastestTimeDisplay", `Din snabbaste tid var ${fastestTime.toLocaleString("en-GB", { timeZone: "Europe/London", fractionalSecondDigits: 3, second: '2-digit' })}s.`, "black", FONTTYPE2);
        
        createButton("restartButton", "Försök igen?", this.resetGame);

        // GUI Element indelas i minigames
        let reactionTitle = document.getElementById("reactionTitle");
        this.guiElements.push(reactionTitle);

        let resultsTitle = document.getElementById("resultsTitle");
        this.guiElements.push(resultsTitle);

        let averageTimeDisplay = document.getElementById("averageTimeDisplay");
        this.guiElements.push(averageTimeDisplay);
        
        let fastestTimeDisplay = document.getElementById("fastestTimeDisplay");
        this.guiElements.push(fastestTimeDisplay);

        let restartButton = document.getElementById("restartButton");
        this.guiElements.push(restartButton);
    }

    correctPress() {
        let time = new Date();
        let deltaTime = time - this.startTime;
        this.currentTime = new Date(deltaTime);
        this.displayMessage = this.currentTime.toLocaleString("en-GB", { timeZone: "Europe/London", fractionalSecondDigits: 3, second: '2-digit' });
        
        this.totalTries.push(deltaTime);
        
        //Bestämmer hur många "försök" man får
        if (this.totalTries.length === this.rounds) {
            // visar scoreboard efter 2 sekunder
            setTimeout(() => this.scoreboard(), 2000);
            this.reactionTestStart();
        } else {
            this.reactionTestStart();
        }    
    }

    reactionTestStart() {
        this.removeGame();

        //GUI Element Skapas
        createText("reactionTitle", "Reaktions Test", "black", FONTTYPE1);
        
        createText("latestMessage", String(this.displayMessage), "black", FONTTYPE2);
        
        // siffra mellan 3 och 6
        this.randomWaitTime = Math.floor(Math.random() * 3) + 3;
        
        // GUI Element indelas i minigames
        let reactionTitle = document.getElementById("reactionTitle");
        this.guiElements.push(reactionTitle);
        
        let latestMessage = document.getElementById("latestMessage");
        this.guiElements.push(latestMessage);
        
        // så länge antalet rundor inte överskrids
        if (this.totalTries.length < this.rounds) { 
            // skapar emoji knapparna efter slumpmässig tid 
            setTimeout(() => this.randomImageOrder(), this.randomWaitTime * 1000);
            
            // ändrar meddelandet
            setTimeout(() => latestMessage.innerText = "Vänta!", 2000);
        }
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