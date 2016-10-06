/* deppscript.js - JavaScript code for "Depp Man Walking" matching game. */
/* Relies on data in deppdata.js, which should be sourced first. */

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
    $('.test').click(onTestButton); //.hide();      // Hide for normal distribution.

    /* Set up the initial configuration on cards in rows. */
    setUpGameArea();

    /* Set up click handler for the cards. */
    $('#game-area').on('click', '.card', onCardClick);

    /* Do the initial restart of the game. */
    resetGame();
});

/* Display an updated game count. */
function displayGameCount() {
    $('.games-played .value').text(gGameCount);
}

/* Display updated statistics. */
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