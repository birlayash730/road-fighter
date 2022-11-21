



// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBiKRMelrn6xgkCNzvnzWs_pccXa7-sIHA",
    authDomain: "road-race-25ac8.firebaseapp.com",
    projectId: "road-race-25ac8",
    storageBucket: "road-race-25ac8.appspot.com",
    messagingSenderId: "278793487439",
    appId: "1:278793487439:web:43ee0f1332d2427a48563a",
    measurementId: "G-YT1865R5HR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


import { getDatabase, set, ref, child, get, onValue, update }
    from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";

const db = getDatabase();





let currentUserNickName = localStorage.getItem('Name');
// let gameUniqueId =localStorage.getItem('gameUniqueId')
let gameUniqueId = localStorage.getItem('gameUniqueId')
let funcall = false;

// const initialDataRefgameList = ref(db, 'gameList/');
let allGame = [];
let sizeOfAllGame;
let key = document.getElementById("gameId");


let currentPlayer1, currentPlayer2;
const dbref = ref(db);
console.log(gameUniqueId)
const initialDataRef = ref(db, 'gameList/' + gameUniqueId);



onValue(initialDataRef, (snapshot) => {
    let data = snapshot.val();
    // console.log(data.Player1.status)
    let player1Status = data.Player1.status;
    let player2Status = data.Player2.status;
    console.log(data);
    if (data[opponentPlayer]) {
        opponentUserStatus = data[opponentPlayer].status;
        console.log(data[opponentPlayer].status)
    }


    console.log("player 1" + player1Status)
    console.log("player 2" + player2Status)
    if (player1Status == "gameover" && player2Status == "gameover") {
        playerWin();
    }

});

//========================================Firebase-Database==========================================



let currentPLayer, opponentPlayer;
let main = document.getElementById('main');
let currentUserStatus, opponentUserStatus;
let winResult = document.createElement('a');
winResult.setAttribute('id', 'gameover');
winResult.style.display = "none";
main.prepend(winResult);


//get user current status
function getUserStatus() {

    // get(child(dbref , "gameList/" + gameUniqueId +"/" + currentPLayer)).then((snapshot)=>{
    //      let data = snapshot.val();
    //      currentUserStatus = data.status;

    // })
    get(child(dbref, "gameList/" + gameUniqueId + "/" + opponentPlayer)).then((snapshot) => {
        let data = snapshot.val();
        opponentUserStatus = data.status;

    })


}


// Result  , name of player who win- -------------------------------------------
function playerWin() {
    let score1, score2;
    get(child(dbref, 'gameList/' + gameUniqueId)).then((snapshot) => {
        // console.log(snapshot.val())
        let data = snapshot.val()
        score1 = data.Player1.score;
        score2 = data.Player2.score;
        //  console.log(score1)
        //  console.log(score2)

        winResult.style.display = "block";
        //  winResult.setAttribute('id', 'gameover');
        winResult.href = "./car_race_index.html";
        //  main.prepend(winResult);
        if (score1 > score2) {
            winResult.innerHTML = currentPlayer1 + " Won!!!";
            //  console.log("1  "+currentPlayer1)
        }

        else if (score2 > score1) {
            winResult.innerHTML = currentPlayer2 + " Won!!!";
            //  console.log("2  "+currentPlayer2)
        }


    })
}
const findCurrentPlayer = new Promise((resolve, reject) => {

    // fetch nickname of player1 from a game room
    get(child(dbref, 'gameList/' + gameUniqueId + "/Player1/")).then((snapshot) => {
        // console.log(snapshot.val())
        // console.log(gameUniqueId)
        currentPlayer1 = snapshot.val();
        // console.log(currentPlayer1);
        if (currentPlayer1) {
            currentPlayer1 = currentPlayer1.nickname;
        }
        return get(child(dbref, 'gameList/' + gameUniqueId + "/Player2/"));
        // console.log(currentPlayer1);
    }).then((snapshot) => {
        currentPlayer2 = snapshot.val();
        // console.log(currentPlayer2);
        if (currentPlayer2) {
            currentPlayer2 = currentPlayer2.nickname;
        }
        // console.log("method : "+ currentPlayer +" " + currentPlayer2)
        if (currentPlayer1 == currentUserNickName) {
            currentPLayer = 'Player1';
            opponentPlayer = "Player2";
            //    console.log(currentPLayer);
            //    console.log(currentUserNickName);
        }
        else if (currentPlayer2 == currentUserNickName) {
            currentPLayer = 'Player2';
            opponentPlayer = "Player1";
            //    console.log(currentPLayer);
            //    console.log(currentUserNickName);
        }
        resolve(true);
        // console.log(currentPlayer2);
    })


});

//-----Start------Start------Start------Start------Start------Start------Start------Start------




// new Game===================tab===============
let newGame = document.createElement('div');
newGame.setAttribute('id', 'newgame');
main.prepend(newGame);
newGame.innerHTML = "New Game";

newGame.addEventListener("click", function () {
    loadGame();
    newGame.style.display = "none";
})
// ==================================================
let lifeCount = document.getElementById("lifecount")


let guestPlay = document.getElementById("guest_play")
// console.log(guestPlay)




let road = document.getElementById("road");
let player = { speed: 1 };
let strips, traffic, startPoint, startLineCarStyle;
let interval;
let requestID;
let isPaused = false;
let life = 0;
let lifeCountV = 3;
let level = 5;
let countStart = 1;

// Add music=====================================================================================
const music = new Audio('louis-the-child-big-time-x-games-theme-audio_PqfR7eAD.mp3');
music.loop = true;
music.playbackRate = 2;


const blast = new Audio('blast.mp3');
// music.loop =true;
blast.playbackRate = 1;

const drift = new Audio('drift.mp3');
// music.loop =true;
drift.playbackRate = 1;
// drift.volume=;

// ==============================================================================================


// providing information about the size of an element , its position , etc .=======
let boundaryRoad = road.getBoundingClientRect();
let currentScore = document.querySelector('#countDown')


// create dynamic Player Car==========================
let userCar = document.createElement("div");
userCar.setAttribute('class', 'userCar');
road.appendChild(userCar);



// score of opponent Player on current user Screen . 
function getOpponentScore() {
    // console.log(opponentPlayer)
    findCurrentPlayer.then(() => {
        // console.log("opponent player : "+ opponentPlayer )
        return get(child(dbref, 'gameList/' + gameUniqueId + "/" + opponentPlayer + "/"))
    }).then((snapshot) => {
        // console.log("currentPlayer :-" + currentPLayer);
        // console.log("opponentPlayer :-"+ opponentPlayer);    
        // console.log(snapshot.val())
        let opponentObject = snapshot.val();
        // console.log(opponentObject)
        let opponentScore = opponentObject.score;
        // console.log("Opponent Score :- "+opponentScore);
        let opScore = document.getElementById('opScore');
        opScore.innerHTML = opponentScore;
    });

}




function loadGame() {
    // gameOver.style.display="none";

    createWhiteLine();
    createTrafficCar();
    createStartLine();
    createStartLineCar();

    countDown();
    // findCurrentPlayer;

}

let startCount = document.createElement('div');
startCount.setAttribute('id', 'startcount');

let counter;
function countDown() {
    counter = 4;
    let x = setInterval(() => {
        // console.log(counter)
        counter--;
        //    create div for count
        road.prepend(startCount);
        startCount.innerHTML = counter;
        if (counter <= 0) {
            startCount.style.display = "none"
            clearInterval(x);
            //display none 
            playGame();
            // startCount.style.display="none";
        }
    }, 1000)

}


//play game==========================
function playGame() {


    player.start = true;
    // increaseCounter = true;
    // music.play();
    userCar.style.transform = "none";
    window.cancelAnimationFrame(requestID);
    // bar bar onclick pe spped badh ri thi 
    window.requestAnimationFrame(raceStart)

}


setInterval(() => {
    updatePosition();
    getRaceScreen();
    // requestID = window.requestAnimationFrame();
}, 100)

//race start==============================

function raceStart() {
    // console.log('text');


    getOpponentScore();
    if (player.start) {
        // console.log("1")
        moveLines();
        moveTraffic(userCar);
        movestartLines();
        movestartLineCar();

        if (keys.ArrowLeft && player.x_axis > 0) { player.x_axis -= player.speed; }
        if (keys.ArrowRight && player.x_axis < (boundaryRoad.width - 58)) { player.x_axis += player.speed; }

        userCar.style.left = player.x_axis + "px";

        requestID = window.requestAnimationFrame(raceStart);
        // console.log("2")
    }

}


//size of user car with respect to x axis (horizontal)==========
player.x_axis = userCar.offsetLeft;
player.y_axis = userCar.offsetTop;


function getRaceScreen() {

    // //console.log(opponentPlayer)
    // console.log("race screen")
    get(child(dbref, 'gameList/' + gameUniqueId + "/" + opponentPlayer)).then((snapshot) => {
        let opponentScreen = snapshot.val();

        if (opponentScreen && opponentScreen.roadHtml) {
            opponentScreen = opponentScreen.roadHtml;
            // //console.log(opponentScreen)
            let road2 = document.getElementById("road2");
            road2.innerHTML = opponentScreen;


        }
    })


}



//create dynamic center road white lines===================
function createWhiteLine() {
    for (let i = 0; i < 10; i++) {
        let centerRoadLine = document.createElement("div");
        centerRoadLine.setAttribute('id', 'centerRoadLine')
        centerRoadLine.setAttribute('class', 'roadLine');
        centerRoadLine.y_axis = (i * 450);

        centerRoadLine.style.top = centerRoadLine.y_axis + "px";

        road.appendChild(centerRoadLine);

        strips = document.querySelectorAll('.roadLine');

    }
}

function carCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.left > bRect.right)
        || (aRect.right < bRect.left))

}

function endgame() {

    player.start = false;
}



//move lines==================================
let temp = 1;
let score = .009;
let previouScore = 0.009;
function moveLines() {
    findCurrentPlayer.then(() => {
        strips.forEach(function (item) {
            const mediaQuery = window.matchMedia('(min-width: 768px)')
            // Check if the media query is true
            if (mediaQuery.matches) {
                // Then trigger an alert
                // alert('Media Query Matched!')
            }

            if (item.y_axis > 700) {
                item.y_axis -= 750;
            }
            //  console.log(item)
            if (player.speed > level) {
                item.y_axis += level;
                item.style.top = item.y_axis + "px";

            }
            else {
                player.speed *= 1.001;
                item.y_axis += player.speed
                // console.log(player.speed);
                item.style.top = item.y_axis + "px";
            }

            score += (.01)
            // console.log(Math.ceil(score))
            currentScore.innerHTML = Math.ceil(score);
            let dbScore = Math.ceil(score);
            update(ref(db, "gameList/" + gameUniqueId + "/" + currentPLayer), {
                score: (Math.ceil(score))

            })

            // get(child(dbref , 'gameList/'+gameUniqueId+"/"+opponentPlayer)).then((snapshot)=>{

            // let opponentObject = snapshot.val();
            // let opponentScore = opponentObject.score;
            // console.log(opponentScore)

            // })

            if (Math.ceil(score) - Math.ceil(previouScore) === 100) {
                previouScore = score;
                level += 1;
            }


        })
    });

}


// =============================================================================road div=====================
// function updatePosition() {
//     let road = document.getElementById("road")
//     update(ref(db, "gameList/" + gameUniqueId + "/" + currentPLayer), {
//         roadHtml: road.innerHTML

//     })
// }



//keyboard press detect ========================


document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);


let spacekey = document.createElement("div");
spacekey.setAttribute("id", "spacekey");
main.appendChild(spacekey);


let keys = { ArrowLeft: false, ArrowRight: false }
function keyDown(e) {
    keys[e.key] = true;
    if (e.key === " " && !isPaused) {
        player.start = false;
        // increaseCounter = false;
        isPaused = true;
        music.pause();
        let spacekey = document.createElement("div");
        spacekey.setAttribute("id", "spacekey");
        main.appendChild(spacekey);
    }
    else if (e.key === " " && isPaused) {
        isPaused = false;
        playGame();
    }
}

function keyUp(e) {
    keys[e.key] = false;
}


// random car generate function=====================
function createTrafficCar() {
    for (let i = 0; i < 5; i++) {
        let trafficCar = document.createElement("div");
        trafficCar.setAttribute('class', 'traffic');
        trafficCar.y_axis = ((i + 1) * 350) * -1;
        trafficCar.style.top = trafficCar.y_axis + "px";
        trafficCar.style.backgroundImage = "url(car-145009_960_720.png)";
        trafficCar.style.left = Math.floor(Math.random() * 350) + "px";
        road.appendChild(trafficCar);

        traffic = document.querySelectorAll(".traffic");
    }
}

//create dynamic center road white lines===================
function createStartLine() {

    for (let i = 0; i < 1; i++) {


        let startLine = document.createElement("div");
        startLine.setAttribute('id', 'startRoadLine')
        startLine.setAttribute('class', 'startLine');
        startLine.y_axis = (i * 7);

        startLine.style.top = startLine.y_axis + "px";

        road.appendChild(startLine);

        startPoint = document.querySelectorAll('.startLine');

    }
}



function movestartLines() {
    startPoint.forEach(function (i) {


        i.y_axis += player.speed;
        i.style.top = i.y_axis + "px";

    })
}

//move traffic================================

function moveTraffic(userCar) {
    traffic.forEach(function (item) {

        if (carCollide(userCar, item)) {
            // css translate transform property for collision animation
            // increaseCounter = false;
            player.start = false;
            music.pause();


            // ANIMATION=============
            userCar.style.transform = "rotate(45deg)";

            item.y_axis = -350;
            item.style.left = Math.floor(Math.random() * 350) + "px";
            life++;
            lifeCountV--
            lifeCount.innerHTML = lifeCountV;
            if (life === 3) {
                blast.play();


                update(ref(db, "gameList/" + gameUniqueId + "/" + currentPLayer), {
                    status: 'gameover'

                })
                // getUserStatus()
                console.log(opponentUserStatus)
                if (opponentUserStatus == 'running') {

                    winResult.style.display = "block";
                    winResult.innerHTML = "Wait till opponent Player complete the race";
                    //  main.prepend(winResult);
                }


            }
            if (life < 3) {
                drift.play();
                setTimeout(playGame, 4000);
            }
        }
        else {
            item.style.display = "block";
        }


        if (item.y_axis >= 700) {
            item.y_axis = -200;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y_axis += player.speed;
        item.style.top = item.y_axis + "px";
    })
}


function createStartLineCar() {
    for (let i = 1; i < 5; i++) {
        let startLineCar = document.createElement("div");
        startLineCar.setAttribute('id', 'startRoadLineCar')
        startLineCar.setAttribute('class', 'startLineCar');
        let n;
        if (i % 2 == 0) {
            // console.log('1');
            startLineCar.y_axis = 100
            startLineCar.style.top += (i * startLineCar.y_axis) + "px";
            startLineCar.style.left = 80 + "px"
            n = 2
        }
        else if (i % 2 !== 0) {
            // console.log('2');
            startLineCar.y_axis = 100
            startLineCar.style.top += ((i) * startLineCar.y_axis) + "px";
            startLineCar.style.left = 270 + "px";
            n = 1
        }
        // console.log(startLineCar)
        startLineCar.style.backgroundImage = "url(car-145009_960_720.png)";
        road.appendChild(startLineCar);

        startLineCarStyle = document.querySelectorAll('.startLineCar');

    }
}


function movestartLineCar() {
    startLineCarStyle.forEach(function (i) {
        i.y_axis -= 5;
        i.style.top = i.y_axis + "px";

    })
}




