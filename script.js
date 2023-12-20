const root = document.getElementById("root");
const special = document.getElementById("special");

// Constants
const FONTTYPE1 = "oblique normal bold 60px 'Times New Roman', serif";
const FONTTYPE2 = "normal normal bold 20px 'Arial', sans-serif";
const FONTTYPE3 = "normal normal bold 30px 'Times New Roman', serif";
const FONTTYPE4 = "oblique normal bold 50px 'Times New Roman', serif";
class Minigame {
    constructor() {
        this.guiElements = [];
        this.highscore = NaN;
    }
    
    createGame() { // är nu startsidan av default pga oväntade ändringar i strukturen.
        // GUI Element skapas
        createText("startTitle", "GrymmaSpelTM", "green", FONTTYPE4);

        createImage("https://www.shutterstock.com/shutterstock/photos/277499918/display_1500/stock-photo-cool-skeleton-heart-a-cool-skeleton-wearing-a-leather-jacket-and-sunglasses-with-a-smoke-in-his-277499918.jpg", 
            "startBild",
            300,
            300);

        createButton("activateReactionTest", "Reaktionsförmåge Test", activateReactionTest, this);
        createButton("activateNumberGuess", "Gissa Talet", activateNumberGuess, this);

        createText("startText", "Välj ett spel för att sätta igång!", "white", FONTTYPE2);

        // GUI Element delas in i sitt objekt
        let startTitle = document.getElementById("startTitle");
        startSida.guiElements.push(startTitle);
        
        let startText = document.getElementById("startText");
        startSida.guiElements.push(startText);

        let startImage = document.getElementById("startBild");
        startSida.guiElements.push(startImage);
        
        let activateReactionButton = document.getElementById("activateReactionTest"); 
        startSida.guiElements.push(activateReactionButton);

        let activateNumberGuessButton = document.getElementById("activateNumberGuess");
        startSida.guiElements.push(activateNumberGuessButton);
    }

    removeGame() {   
        for (let element of this.guiElements) {
            root.removeChild(element);
        }
        this.guiElements = [];
    }
    
    resetGame() {
        this.removeGame();
        this.createGame();
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
        this.rounds = 6;
    }

    createGame() {
        this.currentTime = NaN;
        this.displayMessage = "Vänta!";
        this.totalTries = [];

        //GUI Element Skapas
        createText("reactionTitle", "Reaktions Test", "white", FONTTYPE1);

        createImage("https://archive.is/dl1VH/80bfd71fe2ef1eb38780e9263424c34e1966eba8.jpg", "coolSmiley", 100, 100);
        
        createImage("https://i.pinimg.com/originals/eb/d0/52/ebd0520f733cc1e8edbc352cec076fb5.gif", "sadSmiley", 100, 100);

        createText("reaktionsBeskrivning1", "Du kommer att visas 2 bilder i slumpmessig ordning", "white", FONTTYPE2);
        createText("reaktionsBeskrivning2", `Klicka på bilden som säger cool så snabbt som möjligt så får du ett betyg efter ${this.rounds} försök!`, "white", FONTTYPE2);

        createButton("reaktionsStart", "Start!", this.reactionTestStart, this);

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
    
    randomImageOrder() {
        let randint = Math.floor(Math.random() * 10);

        this.startTime = new Date();

        document.getElementById("latestMessage").innerText = "Kör!";

        if(randint < 5) {
            createButton("imgButtonCool", "", this.correctPress, this, "https://archive.is/dl1VH/80bfd71fe2ef1eb38780e9263424c34e1966eba8.jpg", "100px", "100px");
            createButton("imgButtonSad", "", null, this, "https://i.pinimg.com/originals/eb/d0/52/ebd0520f733cc1e8edbc352cec076fb5.gif", "100px", "100px");
        } else {
            createButton("imgButtonSad", "", null, this, "https://i.pinimg.com/originals/eb/d0/52/ebd0520f733cc1e8edbc352cec076fb5.gif", "100px", "100px");
            createButton("imgButtonCool", "", this.correctPress, this, "https://archive.is/dl1VH/80bfd71fe2ef1eb38780e9263424c34e1966eba8.jpg", "100px", "100px");
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
        createText("reactionTitle", "Reaktions Test", "white", FONTTYPE1);
        createText("resultsTitle", "Resultat:", "white", FONTTYPE3);

        createText("averageTimeDisplay", `Din genomsnittliga tid var ${averageTime.toLocaleString("en-GB", { timeZone: "Europe/London", fractionalSecondDigits: 3, second: '2-digit' })}s.`, "white", FONTTYPE2);
        createText("fastestTimeDisplay", `Din snabbaste tid var ${fastestTime.toLocaleString("en-GB", { timeZone: "Europe/London", fractionalSecondDigits: 3, second: '2-digit' })}s.`, "white", FONTTYPE2);
        
        createButton("restartButton", "Försök igen?", this.resetGame, this);

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
        createText("reactionTitle", "Reaktions Test", "white", FONTTYPE1);
        
        createText("latestMessage", String(this.displayMessage), "white", FONTTYPE2);
        
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

class NumberGuess extends Minigame{ 
    constructor() {
        super();
        this.randomNumber = NaN;
        this.guessAmount = 0;
        this.guessFeedback = "";
    }

    createGame() {
        //GUI Element Skapas
        createText("numberGuessTitle", "Gissa Talet", "white", FONTTYPE1);
        
        createText("numberGuessExplination1", "Ett hemligt tal mellan 1 och 100 kommer att väljas ut av datorn", "white", FONTTYPE2);
        createText("numberGuessExplination2", "När du gör en gissning kommer du få veta om du gissade för högt eller för lågt", "white", FONTTYPE2);
        createText("numberGuessExplination3", "Försök lista ut rätt tal med så få gissningar som möjligt!", "white", FONTTYPE2);

        createButton("numberGuessStartButton", "Starta!", this.numberGuessStart, this);

        // GUI Element indelas i minigames
        let numberGuessTitle = document.getElementById("numberGuessTitle");
        this.guiElements.push(numberGuessTitle);

        let numberGuessExplination1 = document.getElementById("numberGuessExplination1");
        this.guiElements.push(numberGuessExplination1);
        
        let numberGuessExplination2 = document.getElementById("numberGuessExplination2");
        this.guiElements.push(numberGuessExplination2);
        
        let numberGuessExplination3 = document.getElementById("numberGuessExplination3");
        this.guiElements.push(numberGuessExplination3);

        let numberGuessStartButton = document.getElementById("numberGuessStartButton");
        this.guiElements.push(numberGuessStartButton);
    }

    scoreboard() {
        this.removeGame();

        //GUI Element Skapas
        createText("numberGuessTitle", "Gissa Talet", "white", FONTTYPE1);

        createText("resultsTitle", "Resultat:", "white", FONTTYPE3);

        createText("correctNumberText", `Rätt siffra var ${this.randomNumber}`);

        createText("guessAmountText", `Du listade ut det efter ${this.guessAmount} gissningar`);

        createButton("restartButton", "Försök igen?", this.resetGame, this);

        // GUI Element indelas i minigames
        let numberGuessTitle = document.getElementById("numberGuessTitle");
        this.guiElements.push(numberGuessTitle);

        let resultsTitle = document.getElementById("resultsTitle");
        this.guiElements.push(resultsTitle);
        
        let correctNumberText = document.getElementById("correctNumberText");
        this.guiElements.push(correctNumberText);
        
        let guessAmountText = document.getElementById("guessAmountText");
        this.guiElements.push(guessAmountText);

        let restartButton = document.getElementById("restartButton");
        this.guiElements.push(restartButton);

    }

    guessSubmitted() {
        this.guessAmount += 1;
        
        let numberGuessInput = document.getElementById("userGuess");
        let numberOfGuesses = document.getElementById("numberOfGuesses");
        let bigOrSmallGuess = document.getElementById("bigOrSmallGuess");

        // kollar om gissningen är samma, mindre eller större 
        if (String(numberGuessInput.value) === String(this.randomNumber)) {
            this.scoreboard();
        }else if (numberGuessInput.value < this.randomNumber) {
            this.guessFeedback = "liten";
        }else {
            this.guessFeedback = "stor";
        }

        //uppdaterar texten
        numberOfGuesses.innerText = `Du har gjort ${this.guessAmount} gissningar`;
        bigOrSmallGuess.innerText = `Din gissning var för ${this.guessFeedback}`;
    }

    numberGuessStart() {
        this.removeGame();

        this.randomNumber = Math.floor(Math.random() * 100) + 1;

        //GUI Elemnt Skapas
        createText("numberGuessTitle", "Gissa Talet", "white", FONTTYPE1);
        
        createText("numberOfGuesses", `Du har gjort ${this.guessAmount} gissningar`, "white", FONTTYPE2);
        createText("bigOrSmallGuess", "", "white", FONTTYPE2);
        
        createTextInputField("userGuess", "Gissa här!");
        
        createButton("confirmGuessButton", "Gissa", this.guessSubmitted, this);
        
        // GUI Element indelas i minigames
        let numberGuessTitle = document.getElementById("numberGuessTitle");
        this.guiElements.push(numberGuessTitle);
        
        let numberOfGuesses = document.getElementById("numberOfGuesses");
        this.guiElements.push(numberOfGuesses);
        
        let bigOrSmallGuess = document.getElementById("bigOrSmallGuess");
        this.guiElements.push(bigOrSmallGuess);
        
        let numberGuessInput = document.getElementById("userGuess");
        this.guiElements.push(numberGuessInput);
        
        let confirmGuessButton = document.getElementById("confirmGuessButton");
        this.guiElements.push(confirmGuessButton);
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

function createButton(id, name, onclick, minigame, src = null, height = 0, width = 0, isSpecial = false) {
    let button = document.createElement("button");
    button.setAttribute("id", id);
    button.textContent = name;
    
    if(onclick != null) {    
        button.addEventListener("click", onclick.bind(minigame));
    }

    if(src != null) {
        let imgElement = document.createElement('img');
        imgElement.src = src;
        imgElement.alt = "Bilden finns inte tillgänglig";
        imgElement.style.height = height;
        imgElement.style.width = width;

        button.appendChild(imgElement);
    }

    if (isSpecial) {
        special.appendChild(button);
    }else {
        root.appendChild(button);
    }
}

function createTextInputField(id, placeholder) {
    let inputfield = document.createElement("INPUT");
    inputfield.setAttribute("id", id);
    inputfield.placeholder = placeholder;
    inputfield.type = "number";

    root.appendChild(inputfield);
}

function activateGame(game, removedGame) {
    removedGame.removeGame();

    game.createGame();
    lastGame = game;
}

function activateReactionTest() {
    activateGame(reactionSpeedTest, lastGame);
}

function activateNumberGuess() {
    activateGame(numberGuess, lastGame);
}

function homePage() {
    activateGame(startSida, lastGame);
}

// Skapa spelen
let startSida = new Minigame;
let reactionSpeedTest = new ReactionSpeedTest;
let numberGuess = new NumberGuess;

// variabel som underlättar byte av minigame
let lastGame = startSida;

//Aktivera Hemsidan
startSida.createGame();

// Skapa hemknapp
createButton("homeButton", "", homePage, null, "https://cdn-icons-png.flaticon.com/512/61/61972.png", "30px", "30px", true);