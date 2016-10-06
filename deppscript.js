/* deppscript.js - JavaScript code for "Depp Man Walking" matching game. */

/* Constant values. */
var CARD_COUNT = 18;
var CARDS_PER_ROW = 6;
var CHARACTER_21_JUMP_STREET = 0;
var CHARACTER_EDWARD_SCISSORHANDS = 1;
var CHARACTER_ICHABOD_CRANE = 2;
var CHARACTER_JACK_SPARROW = 3;
var CHARACTER_MAD_HATTER = 4;
var CHARACTER_SWEENEY_TODD = 5;
var CHARACTER_THE_WOLF = 6;
var CHARACTER_TONTO = 7;
var CHARACTER_WILLY_WONKA = 8;

/* Which images go with which sounds; these indices match the CHARACTER constants above. */
var gaCharacters = [
    { name: 'Tom Hanson',           imageFile:'images/21_jump_street.jpg',       soundFile: 'sounds/21_jump_street.mp3' },
    { name: 'Edward Scissorhands',  imageFile:'images/edward_scissorhands.jpg',  soundFile: 'sounds/edward_scissorhands.wav' },
    { name: 'Ichabod Crane',        imageFile:'images/ichabod_crane.jpg',        soundFile: 'sounds/ichabod_crane.mp3' },
    { name: 'Jack Sparrow',         imageFile:'images/jack_sparrow.jpg',         soundFile: 'sounds/jack_sparrow.wav' },
    { name: 'The Mad Hatter',       imageFile:'images/mad_hatter.jpg',           soundFile: 'sounds/mad_hatter.wav' },
    { name: 'Sweeney Todd',         imageFile:'images/sweeney_todd.jpg',         soundFile: 'sounds/sweeney_todd.wav' },
    { name: 'The Wolf',             imageFile:'images/the_wolf.jpg',             soundFile: 'sounds/the_wolf.mp3' },
    { name: 'Tonto',                imageFile:'images/tonto.jpg',                soundFile: 'sounds/tonto.mp3' },
    { name: 'Willy Wonka',          imageFile:'images/willy_wonka.jpg',          soundFile: 'sounds/willy_wonka.wav' }
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

/* Function to look up the character index from the src string. */
function getCharacterIndexFromImageSrc(srcString) {
    //console.log('getCharacterIndexFromImageSrc:', srcString);

    for (var i = 0; i < gaCharacters.length; i++) {
        if (srcString.search(gaCharacters[i].imageFile) != -1) {
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
            var characterIndex = getCharacterIndexFromImageSrc(firstCardSrc);
            //console.log('onCardClick found match for', gaCharacters[characterIndex].name);
            playSound(characterIndex);
            performAnimation(characterIndex);

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

/* TODO: Function to perform animations for characters. */
function performAnimation(characterIndex) {
    //console.log('performAnimation:', gaCharacters[characterIndex].name);
}

/* Function to look up the corresponding sound for a card. */
function playSound(characterIndex) {
    //console.log('playSound:', gaCharacters[characterIndex].name);
    var soundFile = gaCharacters[characterIndex].soundFile;
    var audio = new Audio(soundFile);
    audio.play();
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

    /* Shuffle the deck. */
    var baseDeck = [
        CHARACTER_21_JUMP_STREET, CHARACTER_21_JUMP_STREET,
        CHARACTER_EDWARD_SCISSORHANDS, CHARACTER_EDWARD_SCISSORHANDS,
        CHARACTER_ICHABOD_CRANE, CHARACTER_ICHABOD_CRANE,
        CHARACTER_JACK_SPARROW, CHARACTER_JACK_SPARROW,
        CHARACTER_MAD_HATTER, CHARACTER_MAD_HATTER,
        CHARACTER_SWEENEY_TODD, CHARACTER_SWEENEY_TODD,
        CHARACTER_THE_WOLF, CHARACTER_THE_WOLF,
        CHARACTER_TONTO, CHARACTER_TONTO,
        CHARACTER_WILLY_WONKA, CHARACTER_WILLY_WONKA
    ];

    var deck = [];
    for (var i = 0; i < CARD_COUNT; i++) {
        var baseIndex = Math.floor(Math.random() * baseDeck.length);
        deck.push(baseDeck.splice(baseIndex, 1));
    }

    /* Set the source of the image for the each card front. */
    gameArea.find('.front img').each(function(index) {
        var characterNum = deck[index];
        var characterObj = gaCharacters[characterNum];

        //console.log(index, ":", characterObj.imageFile);
        $(this).attr('src', characterObj.imageFile);
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