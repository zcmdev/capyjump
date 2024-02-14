/*Initialization*/
const charElement = document.querySelector('.capybara');
const orangeElement = document.querySelector('.orange');
const scoreElement = document.querySelector('.js-score');
const heart1Element = document.querySelector('.js-heart1');
const heart2Element = document.querySelector('.js-heart2');
const heart3Element = document.querySelector('.js-heart3');
const cloud1Element = document.querySelector('.js-cloud1');
const gameTextElement = document.querySelector('.js-gameText');
const gameBackgroundElement = document.querySelector('.middle-game-play');
const toptitleElement = document.querySelector('.top-title');
const rulesElement = document.querySelector('.bottom-middle');
const healthBackgroundElement = document.querySelector('.middle-hearts');
const skyBackgroundElement = document.querySelector('.middle-sky');
const groundElement = document.querySelector('.middle-game-ground');

const orangeStop = -60;
let orangemove = null;
let cloud1 = null;
let textReset = null;
let gameTextLostDisplay = null;
let removeText = null;
let delayGame = null;
let charPositionX = 0;
let charPositionY = 0;
let orangePositionX = 380;
let cloud1PositionX = 0;
let playing = false;
let jumping = false;
let play = false;
let score = 0;
let hit = 0;
let cloud1Forward = true;
let lost = false;
let stopped = true;
let playLevel = 1;
const block = 140;

let bg1 = new Image();
let bg2 = new Image();
let bg3 = new Image();
let bgplay1 = new Image();
let bgplay2 = new Image();
let bgplay3 = new Image();
let bglose1 = new Image();
let bglose2 = new Image();
let bglose3 = new Image();

initialGame();
preloadImage();

function preloadImage() {
  bg1.src = 'Style/Image/house.jpg';
  bg2.src = 'Style/Image/house2.jpg';
  bg3.src = 'Style/Image/house3.png';
  bgplay1.src = 'Style/Image/orangetree.jpg';
  bgplay2.src = 'Style/Image/playbg2.jpg';
  bgplay3.src = 'Style/Image/playbg3.png';
  bglose1.src = 'Style/Image/lost.jpg';
  bglose2.src = 'Style/Image/lost2.jpg';
  bglose3.src = 'Style/Image/lost3.png';
}

function initialGame() {
  /*Game General*/
  if(playLevel === 1) {
    backgroundSet("url('Style/Image/house.jpg')");
  } else if(playLevel === 2) {
    backgroundSet("url('Style/Image/house2.jpg')");
  } else if(playLevel === 3) {
    backgroundSet("url('Style/Image/house3.png')");
  } else {
    backgroundSet("url('Style/Image/house.jpg')");
  }

  /*Character*/
  charElement.style.position = 'relative';
  charElement.style.left = '200px';

  /*Orange*/
  orangeElement.style.position = 'relative';
  orangeElement.style.top = '0px';
  orangeElement.style.left = '380px';
  orangeElement.style.visibility = 'hidden';

  /*Cloud*/
  cloud1Element.style.position = 'relative';
  
  /*Score*/
  scoreElement.innerHTML = `Score: ${score}`;

  /*Game Text*/
  gameTextReset();
}

function delayStartGame() {
  delayGame = setTimeout(playGame,500);
}

function playGame() {
  if(lost) {
    /*Health*/
    resetHeart();
    lost = false;
  }

  if(!playing) {
    /*Game General*/
    play = true;
    playing = true;
    stopped = false;
    gameTextDisappear();
    if(playLevel === 1) {
      backgroundSet("url('Style/Image/orangetree.jpg')");
    } else if(playLevel === 2) {
      backgroundSet("url('Style/Image/playbg2.jpg')");
    } else if(playLevel === 3) {
      backgroundSet("url('Style/Image/playbg3.png')");
    } else {
      backgroundSet("url('Style/Image/orangetree.jpg')");
    }

    /*Orange*/
    orangeElement.style.visibility = 'visible';
    if(playLevel === 1) {
      orangemove = setInterval(animateOrange, 40);
    } else if(playLevel === 2) {
      orangemove = setInterval(animateOrange, 25);
    } else if(playLevel === 3) {
      orangemove = setInterval(animateOrange, 15);
    } else {
      orangemove = setInterval(animateOrange, 40);
    }

    /*Cloud*/
    cloud1 = setInterval(cloud1Move, 1000);
  }
}

function resetGame() {
  /*Game General*/
  clearTimeout(delayGame);
  playing = false;
  play = false;
  if(playLevel === 1) {
    //backgroundSet("url('Style/Image/house.jpg')");
    gameBackgroundElement.style.backgroundImage = bg1;
  } else if(playLevel === 2) {
    //backgroundSet("url('Style/Image/house2.jpg')");
    gameBackgroundElement.style.backgroundImage = bg2;
  } else if(playLevel === 3) {
    //backgroundSet("url('Style/Image/house3.png')");
    gameBackgroundElement.style.backgroundImage = bg3;
  } else {
    //backgroundSet("url('Style/Image/house.jpg')");
    gameBackgroundElement.style.backgroundImage = bg1;
  }
  stopped = true;
  lost = false;

  /*Character*/

  /*Orange*/
  clearInterval(orangemove);
  originalPosition();
  orangeElement.style.visibility = 'hidden';

  /*Cloud*/
  clearInterval(cloud1);

  /*Score*/
  resetScore();

  /*Game Text*/
  textReset = setTimeout(gameTextReset, 900);

  /*Health*/
  resetHeart();
}

function stopGame() {
  clearTimeout(delayGame);
  if(!lost && !stopped) {
    resetGame();
  }
}


function lostGame() {
  /*Game General*/
  playing = false;
  play = false;
  if(playLevel === 1) {
    backgroundSet("url('Style/Image/lost.jpg')");
  } else if(playLevel === 2) {
    backgroundSet("url('Style/Image/lost2.jpg')");
  } else if(playLevel === 3) {
    backgroundSet("url('Style/Image/lost3.png')");
  } else {
    backgroundSet("url('Style/Image/lost.jpg')");
  }
  lost = true;
  stopped = true;

  /*Orange*/
  clearInterval(orangemove);
  originalPosition();
  orangeElement.style.visibility = 'hidden';

  /*Cloud*/
  clearInterval(cloud1);

  /*Score*/
  resetScore();

  /*Game Text*/
  gameTextLostDisplay = setTimeout(gameTextLost, 900);
}

function level1Initialization() {
  toptitleElement.style.backgroundColor = '#FFD6A5';
  rulesElement.style.backgroundColor = '#FFD6A5';
  toptitleElement.innerHTML = 'Level 1';
  healthBackgroundElement.style.backgroundColor = '#fcf4dd';
  skyBackgroundElement.style.backgroundColor = '#fcf4dd';
  cloud1Element.style.backgroundImage = "url('Style/Image/cloud.png')";
  backgroundSet("url('Style/Image/house.jpg')");
  groundElement.style.backgroundImage = "url('Style/Image/ground.jpg')";
  playLevel = 1;
  resetGame();
}

function level2Initialization() {
  toptitleElement.style.backgroundColor = '#DACFB0';
  rulesElement.style.backgroundColor = '#DACFB0';
  toptitleElement.innerHTML = 'Level 2';
  healthBackgroundElement.style.backgroundColor = '#2B4C5D';
  skyBackgroundElement.style.backgroundColor = '#2B4C5D';
  cloud1Element.style.backgroundImage = "url('Style/Image/moon.png')";
  backgroundSet("url('Style/Image/house2.jpg')");
  groundElement.style.backgroundImage = "url('Style/Image/ground2.jpg')";
  playLevel = 2;
  resetGame();
}

function level3Initialization() {
  toptitleElement.style.backgroundColor = '#B7D1D3';
  rulesElement.style.backgroundColor = '#B7D1D3';
  toptitleElement.innerHTML = 'Level 3';
  cloud1Element.style.backgroundImage = "url('Style/Image/sun.png')";
  healthBackgroundElement.style.backgroundColor = '#E1ECEE';
  skyBackgroundElement.style.backgroundColor = '#E1ECEE';
  backgroundSet("url('Style/Image/house3.png')");
  groundElement.style.backgroundImage = "url('Style/Image/ground3.png')";
  playLevel = 3;
  resetGame();
}

/*** Functions ***/

/*** Game General ***/

function backgroundSet( urllink ) {
  gameBackgroundElement.style.backgroundImage = urllink;
}

/*** Character ***/

function jump() {
  if(!jumping && play) {
    charPositionY = charPositionY - 100;
    charElement.style.top = charPositionY + 'px';
    const returnJump = setTimeout(jumpDown, 400);
    jumping = true;
  }
}

function jumpDown() {
  charPositionY = charPositionY + 100;
  charElement.style.top = charPositionY + 'px';
  jumping = false;
}

/*** Orange ***/

function animateOrange() { //Move the Orange Hurdle
  if(orangePositionX === orangeStop) {
    originalPosition();
  } else {
    orangePositionX = orangePositionX - 5;
    orangeElement.style.left = orangePositionX + 'px';
    if(orangePositionX === block) {
      if(charPositionY === 0) {
        scoreBoard('0');
        hit++;
        removeHeart();
        if(hit === 3) {
          lostGame();
        } else {
          displayGameText('Missed!');
        }
      }
      else {
        scoreBoard('1');
        displayGameText('Nice!');
      }
    }
  }
}

function originalPosition() { //Reset the Orange Position
  orangeElement.style.left = '380px';
  orangePositionX = 380;
}

/*** Cloud ***/

function cloud1Move() {
  if(cloud1Forward) {
    if(cloud1PositionX === 380) {
      cloud1Forward = false;
    } else {
      cloud1PositionX = cloud1PositionX + 10;
      cloud1Element.style.left = cloud1PositionX + 'px';
    }
  } else {
    if(cloud1PositionX === 0) {
      cloud1Forward = true;
    } else {
      cloud1PositionX = cloud1PositionX - 10;
      cloud1Element.style.left = cloud1PositionX + 'px';
    }
  }
}

/*** Scoreboard ***/

function scoreBoard(win) {
  if(win === '1') {
    score++;
    scoreElement.innerHTML = `Score: ${score}`;
  }
}

function resetScore() {
  score = 0;
  hit = 0;
  scoreElement.innerHTML = `Score: ${score}`;
}

/*** Gametext ***/

function displayGameText(text) {
  gameTextElement.innerHTML = text;
  removeText = setTimeout(gameTextDisappear, 800);
}

function gameTextDisappear() {
  gameTextElement.innerHTML = '';
}

function gameTextReset() {
  gameTextElement.innerHTML = 'Click Play and jump over the orange';
}

function gameTextLost() {
  gameTextElement.innerHTML = 'Lost all Health, Play Again?';
}

/*** Health ***/

function removeHeart() {
  if(hit === 1) {
    /*heart1Element.style.backgroundColor = 'white';*/
    heart1Element.style.backgroundImage = "url('Style/Image/Greyheart.png')";
  }
  else if(hit === 2) {
    heart2Element.style.backgroundImage = "url('Style/Image/Greyheart.png')";
  }
  else if(hit === 3) {
    heart3Element.style.backgroundImage = "url('Style/Image/Greyheart.png')";
  }
}

function resetHeart() {
  heart1Element.style.backgroundImage = "url('Style/Image/heart.png')";
  heart2Element.style.backgroundImage = "url('Style/Image/heart.png')";
  heart3Element.style.backgroundImage = "url('Style/Image/heart.png')";
}

/*****************/