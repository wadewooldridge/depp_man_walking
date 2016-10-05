/* deppscript.js - JavaScript code for "Depp Man Walking" matching game. */

/* Constant values. */
CARD_COUNT = 18;

/* Which images go with which sounds. */
var gImagesAndSounds = {
    'images/21_jump_street.jpg'         : 'sounds/21_jump_street.mp3',
    'images/edward_scissorhands.jpg'    : 'sounds/edward_scissorhands.wav',
    'images/ichabod_crane.jpg'          : 'sounds/ichabod_crane.mp3',
    'images/jack_sparrow.jpg'           : 'sounds/jack_sparrow.wav',
    'images/mad_hatter.jpg'             : 'sounds/mad_hatter.wav',
    'images/sweeney_todd.jpg'           : 'sounds/sweeney_todd.wav',
    'images/the_wolf.jpg'               : 'sounds/the_wolf.mp3',
    'images/tonto.jpg'                  : 'sounds/tonto.mp3',
    'images/willy_wonka.jpg'            : 'sounds/willy_wonka.wav'
};

/* Global data. */
var gFirstCardClicked = null;
var gSecondCardClicked = null;
var gAttempts = 0;
var gTotalMatchesPossible = CARD_COUNT / 2;
var gTotalMatchesSoFar = 0;
var gGameLocked = false;                        // true while waiting for flip timeout.
var gGameOver = false;                          // true once all matches have been found.

/* Program initialization on document ready. */
$(document).ready(function() {
    /* TODO: Shuffle cards upon startup. */

    /* Set up click handler for the cards. */
    $('#game-area').on('click', '.card', onCardClick);
});

/* Main handler when user clicks on a card. */
function onCardClick() {
    console.log('onCardClick:', this);

    /* Prevent card turning while waiting for turn back, or if the game is over.
       Likewise prevent the user from clicking on the first card a second time. */
    if (gGameLocked || gGameOver || (this === gFirstCardClicked)) {
        var badCard = this;
        $(badCard).css({ transition: 'transform 0.3s', transform: 'rotate(10deg)'});
        window.setTimeout( function() { $(badCard).css({ transition: 'transform 0.3s', transform: 'rotate(-10deg)' }) }, 300);
        window.setTimeout( function() { $(badCard).css({ transition: 'transform 0.3s', transform: 'rotate(0deg)' }) }, 600);
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
        console.log('onCard Click compare: ' + firstCardSrc + ' vs. ' + secondCardSrc);
        if (firstCardSrc === secondCardSrc) {
            /* Found a match. */
            console.log('onCardClick found match for', firstCardSrc);
            playSoundForMatch(firstCardSrc);

            gFirstCardClicked = gSecondCardClicked = null;
            gTotalMatchesSoFar++;
            if (gTotalMatchesSoFar === gTotalMatchesPossible) {
                /* Game is complete. */
                gGameOver = true;
            } else {
                /* Still more matches to find. */
            }
        } else {
            /* Not a match, turn them back. */
            window.setTimeout(onFlipTimeout, 2000);
            gGameLocked = true;
        }

        /* Update the statistics display. */
        var accuracy = (gTotalMatchesSoFar / gAttempts) * 100;
        $('.attempts .value').text(gAttempts.toString());
        $('.accuracy .value').text(accuracy.toFixed(0) + "%");
    }
}

/* Callback after timeout to turn cards back. */
function onFlipTimeout() {
    console.log('onFlipTimeout');

    /* Turn the cards back by showing the back side again. */
    $(gFirstCardClicked).find('.back').show();
    $(gSecondCardClicked).find('.back').show();
    gFirstCardClicked = gSecondCardClicked = null;
    gGameLocked = false;
}

/* Function to look up the corresponding sound for a card. */
function playSoundForMatch(srcString) {
    console.log('playSoundForMatch:', srcString);
    var key;
    var soundSrc = null;

    for (key in gImagesAndSounds) {
        if (srcString.search(key) != -1) {
            soundSrc = gImagesAndSounds[key];
        }
    }
    if (soundSrc != null) {
        var audio = new Audio(soundSrc);
        audio.play();
    }
    console.log('playSoundForMatch:', soundSrc);
}