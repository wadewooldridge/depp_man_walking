/* deppscript.js - JavaScript code for "Depp Man Walking" matching game. */

/* Constant values. */
var ROLE_COUNT = 9;                             // Roles displayed.
var CARD_COUNT = ROLE_COUNT * 2;                // Cards displayed.
var ROW_COUNT = 3;                              // Number of rows.
var CARDS_PER_ROW = CARD_COUNT / ROW_COUNT;     // Cards in each row.

var ROLE_BARNABAS_COLLINS = 0;
var ROLE_DEAN_CORSO = 1;
var ROLE_DON_JUAN_DEMARCO = 2;
var ROLE_DONNIE_BRASCO = 3;
var ROLE_ED_WOOD = 4;
var ROLE_EDWARD_SCISSORHANDS = 5;
var ROLE_GEORGE_JUNG = 6;
var ROLE_GILBERT_GRAPE = 7;
var ROLE_ICHABOD_CRANE = 8;
var ROLE_JACK_SPARROW = 9;
var ROLE_JOHN_DILLINGER = 10;
var ROLE_LERNER = 11;
var ROLE_MORTDECAI = 12;
var ROLE_RANGO = 13;
var ROLE_ROUX = 14;
var ROLE_SWEENEY_TODD = 15;
var ROLE_THE_MAD_HATTER = 16;
var ROLE_THE_WOLF = 17;
var ROLE_TOM_HANSON = 18;
var ROLE_TONTO = 19;
var ROLE_WILLY_WONKA = 20;

/* Which images go with which sounds; these indices match the ROLE constants above. */
var gaRoles = [
    { name: 'Barnabas Colline',     imageFile: 'images/barnabas_collins.jpg',       soundFile: null },
    { name: 'Dean Corso',           imageFile: 'images/dean_corso.jpg',             soundFile: null },
    { name: 'Don Juan DeMarco',     imageFile: 'images/don_juan_demarco.jpg',       soundFile: null },
    { name: 'Donnie Brasco',        imageFile: 'images/donnie_brasco.jpg',          soundFile: null },
    { name: 'Ed Wood',              imageFile: 'images/ed_wood.jpg',                soundFile: null },
    { name: 'Edward Scissorhands',  imageFile: 'images/edward_scissorhands.jpg',    soundFile: 'sounds/edward_scissorhands.wav' },
    { name: 'George Jung',          imageFile: 'images/george_jung.jpg',            soundFile: null },
    { name: 'Gilbert Grape',        imageFile: 'images/gilbert_grape.jpg',          soundFile: null },
    { name: 'Ichabod Crane',        imageFile: 'images/ichabod_crane.jpg',          soundFile: 'sounds/ichabod_crane.mp3' },
    { name: 'Jack Sparrow',         imageFile: 'images/jack_sparrow.jpg',           soundFile: 'sounds/jack_sparrow.wav' },
    { name: 'John Dillinger',       imageFile: 'images/john_dillinger.jpg',         soundFile: null },
    { name: 'Lerner',               imageFile: 'images/lerner.jpg',                 soundFile: null },
    { name: 'Mortdecai',            imageFile: 'images/mortdecai.jpg',              soundFile: null },
    { name: 'Rango',                imageFile: 'images/rango.jpg',                  soundFile: null },
    { name: 'Roux',                 imageFile: 'images/roux.jpg',                   soundFile: null },
    { name: 'Sweeney Todd',         imageFile: 'images/sweeney_todd.jpg',           soundFile: 'sounds/sweeney_todd.wav' },
    { name: 'The Mad Hatter',       imageFile: 'images/mad_hatter.jpg',             soundFile: 'sounds/mad_hatter.wav' },
    { name: 'The Wolf',             imageFile: 'images/the_wolf.jpg',               soundFile: 'sounds/the_wolf.mp3' },
    { name: 'Tom Hanson',           imageFile: 'images/tom_hanson.jpg',             soundFile: 'sounds/tom_hanson.mp3' },
    { name: 'Tonto',                imageFile: 'images/tonto.jpg',                  soundFile: 'sounds/tonto.mp3' },
    { name: 'Willy Wonka',          imageFile: 'images/willy_wonka.jpg',            soundFile: 'sounds/willy_wonka.wav' }
];

/* Global data. */
var gGameCount = 0;                             // Count total games.
var gTotalMatchesPossible = CARD_COUNT / 2;
var gFirstCardClicked = null;
var gSecondCardClicked = null;
var gAttempts = 0;                              // Count card match attempts.
var gTotalMatchesSoFar = 0;                     // Count card match successes.
var gGameLocked = false;                        // true while waiting for flip timeout.
var gGameOver = false;                          // true once all matches have been found.

/* Program initialization on document ready. */
$(document).ready(function() {
    /* Set up the click handler for the various buttons. */
    $('.reset-game').click(resetGame);
    $('.cheat').click(onCheatButton);
    $('.test').click(onTestButton).hide();      // Hide for normal distribution.

    /* Set up the initial configuration on cards in rows. */
    setUpGameArea();

    /* Set up click handler for the cards. */
    $('#game-area').on('click', '.card', onCardClick);

    /* Do the initial restart of the game. */
    resetGame();
});

/* Display handlers. These get the data from the global variables. */
function displayGameCount() {
    $('.games-played .value').text(gGameCount);
}

function displayStats() {
    var accuracy;

    if (gAttempts == 0) {
        accuracy = "TBD";
    }
    else {
        accuracy = ((gTotalMatchesSoFar / gAttempts) * 100).toFixed(0) + "%";
    }
    $('.attempts .value').text(gAttempts);
    $('.accuracy .value').text(accuracy);
}

/* Function to look up the role index from the src string. */
function getroleIndexFromImageSrc(srcString) {
    //console.log('getroleIndexFromImageSrc:', srcString);

    for (var i = 0; i < gaRoles.length; i++) {
        if (srcString.search(gaRoles[i].imageFile) != -1) {
            return i;
        }
    }
    return -1;
}

/* Main handler when user clicks on a card. */
function onCardClick() {
    //console.log('onCardClick:', this);

    /* Prevent card turning while waiting for turn back, or if the game is over.
       Likewise prevent the user from clicking on the first card a second time,
       or a card that is already revealed. */
    if (gGameLocked || gGameOver || ($(this).find('.back').is(':hidden'))) {
        var badCard = this;
        $(badCard).addClass('shaky');
        window.setTimeout( function() { $(badCard).removeClass('shaky'); }, 1000);
        return;
    }

    /* Reveal the card face (by hiding the back). */
    $(this).find('.back').hide();

    if (!gFirstCardClicked) {
        /* Handle click on the first card. */
        gFirstCardClicked = this;
    } else {
        /* Handle click on the second card. */
        gSecondCardClicked = this;
        gAttempts++;

        var firstCardSrc = $(gFirstCardClicked).find('.front').find('img')[0].src;
        var secondCardSrc = $(gSecondCardClicked).find('.front').find('img')[0].src;
        //console.log('onCard Click compare: ' + firstCardSrc + ' vs. ' + secondCardSrc);
        if (firstCardSrc === secondCardSrc) {
            /* Found a match. */
            var roleIndex = getroleIndexFromImageSrc(firstCardSrc);
            //console.log('onCardClick found match for', gaRoles[roleIndex].name);
            playSound(roleIndex);
            performAnimation(roleIndex);

            gTotalMatchesSoFar++;
            if (gTotalMatchesSoFar === gTotalMatchesPossible) {
                /* Game is complete. */
                $('#game-area').find('img').removeClass('matched');
                gGameOver = true;
            } else {
                /* Still more matches to find. */
                $(gFirstCardClicked).find('.front').find('img').addClass('matched');
                $(gSecondCardClicked).find('.front').find('img').addClass('matched');
            }
            gFirstCardClicked = gSecondCardClicked = null;
        } else {
            /* Not a match, turn them back. */
            window.setTimeout(onCardFlipTimeout, 2000);
            gGameLocked = true;
        }

        /* Update the statistics display. */
        displayStats();
    }
}

/* Callback after timeout to turn cards back. */
function onCardFlipTimeout() {
    /* Turn the cards back by showing the back side again. */
    $(gFirstCardClicked).find('.back').show();
    $(gSecondCardClicked).find('.back').show();
    gFirstCardClicked = gSecondCardClicked = null;
    gGameLocked = false;
}

/* Handle the cheat button. */
var gaStateBeforeCheat = [];

function onCheatButton() {
    if (gGameLocked || gGameOver) {
        return;
    }

    /* Find the backs that are visible (hiding fronts), and show and save them. */
    $('#game-area').find('.back:visible').each( function() {
        gaStateBeforeCheat.push(this);
        $(this).hide();
    });

    window.setTimeout(onCheatButtonTimeout, 2000);
    gGameLocked = true;
}

/* Handle the cheat button timeout. */
function onCheatButtonTimeout() {
    //console.log('onCheatButtonTimeout');
    while (gaStateBeforeCheat.length > 0) {
        var back = gaStateBeforeCheat.pop();
        $(back).show();
    }

    gGameLocked = false;
}

/* Handle the test button. */
function onTestButton() {
    console.log('Test button clicked.');
}

/* TODO: Function to perform animations for roles. */
function performAnimation(roleIndex) {
    //console.log('performAnimation:', gaRoles[roleIndex].name);
}

/* Function to look up the corresponding sound for a card. */
function playSound(roleIndex) {
    //console.log('playSound:', gaRoles[roleIndex].name);
    var soundFile = gaRoles[roleIndex].soundFile;
    if (soundFile !== null) {
        var audio = new Audio(soundFile);
        audio.play();
    }
}

/* Reset game, either on initial document ready, or restarting.
   Note that we must reset everything, as we don't know the current state. */
function resetGame() {
    /* Set the source of the image for each card back. */
    var gameArea = $('#game-area');
    gameArea.find('.back img').each(function() {
        $(this).attr('src', 'images/card_back.gif')
    });

    /* Hide all the cards by showing all the backs. */
    gameArea.find('.back').show();

    /* Pick nine roles from the gaRoles database; the baseDeck contains two of each of the nine roles. */
    var roles = [   ROLE_BARNABAS_COLLINS, ROLE_DEAN_CORSO, ROLE_DON_JUAN_DEMARCO, ROLE_DONNIE_BRASCO,
                    ROLE_ED_WOOD, ROLE_EDWARD_SCISSORHANDS, ROLE_GEORGE_JUNG, ROLE_GILBERT_GRAPE,
                    ROLE_ICHABOD_CRANE, ROLE_JACK_SPARROW, ROLE_JOHN_DILLINGER, ROLE_LERNER, ROLE_MORTDECAI,
                    ROLE_RANGO, ROLE_ROUX, ROLE_SWEENEY_TODD, ROLE_THE_MAD_HATTER, ROLE_THE_WOLF,
                    ROLE_TOM_HANSON, ROLE_TONTO, ROLE_WILLY_WONKA ];

    var baseDeck = [];
    var i;
    var randomIndex;
    for (i = 0; i < ROLE_COUNT; i++) {
        randomIndex = Math.floor(Math.random() * roles.length);
        var temp = roles.splice(randomIndex, 1);
        baseDeck.push(temp[0]);
        baseDeck.push(temp[0]);
    }
    //console.log('baseDeck:', baseDeck);

    /* Now shuffle the baseDeck into the deck in random order. */
    var deck = [];
    for (var i = 0; i < CARD_COUNT; i++) {
        var baseIndex = Math.floor(Math.random() * baseDeck.length);
        deck.push(baseDeck.splice(baseIndex, 1)[0]);
    }
    //console.log('deck:', deck);

    /* Set the source of the image for the each card front. */
    gameArea.find('.front img').each(function(index) {
        var roleNum = deck[index];
        var roleObj = gaRoles[roleNum];

        //console.log(index, ":", roleObj.imageFile);
        $(this).attr('src', roleObj.imageFile);
    });

    /* Reset all the basic variables, except increment game count. */
    gFirstCardClicked = null;
    gSecondCardClicked = null;
    gGameLocked = false;
    gGameOver = false;

    gAttempts = 0;
    gTotalMatchesSoFar = 0;
    displayStats();

    gGameCount++;
    displayGameCount();
}

function setUpGameArea() {
    for (var i = 0; i < CARD_COUNT; i++) {
        if ((i % CARDS_PER_ROW) === 0) {
            var rowDiv = $('<div>').addClass('row');
            $('#game-area').append(rowDiv);
        }
        var cardDiv = $('<div>').addClass('card');
        rowDiv.append(cardDiv);

        var frontDiv = $('<div>').addClass('front');
        cardDiv.append(frontDiv);

        var frontImgElem = $('<img>');
        frontDiv.append(frontImgElem);

        var backDiv = $('<div>').addClass('back');
        cardDiv.append(backDiv);

        var backImgElem = $('<img>');
        backDiv.append(backImgElem);
    }
}