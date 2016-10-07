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

    /* Display the basic information about Johnny Depp in the Trivia Corner. */
    displayRoleObject(gRealLifeRole);

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

/* Display a role object in the Trivia Corner. */
function displayRoleObject(roleObj) {
    console.log('displayRoleObject:', roleObj);

    /* Display all the basic fields. */
    $('#trivia-name').text(roleObj.name);
    $('#trivia-movie').text(roleObj.movie + ' (' + roleObj.year + ')');
    var triviaBasicDiv = $('#trivia-basic');
    triviaBasicDiv.find('img').attr('src', roleObj.imageFile);
    triviaBasicDiv.find('p').text(roleObj.basicText);

    /* Update the links for the buttons to point at the new links. */
    updateLink('imdb-link', roleObj.imdb);
    updateLink('wikipedia-link', roleObj.wikipedia);
    updateLink('tomatoes-link', roleObj.tomatoes);
    updateLink('netflix-link', roleObj.netflix);
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

/* Function to execute special actions for roles. */
function executeSpecial(roleNum) {
    var roleObj = gaRoles[roleNum];
    console.log('executeSpecial:', roleObj.name);
    var selector = '[role=' + roleNum + ']';
    var cards = $(selector);

    switch (roleNum) {
        /* These are all the normal badges. */
        case ROLE_BARNABAS_COLLINS:
        case ROLE_JACK_SPARROW:
        case ROLE_LERNER:
        case ROLE_SWEENEY_TODD:
        case ROLE_THE_MAD_HATTER:
        case ROLE_TOM_HANSON:
        case ROLE_WILLY_WONKA:
            $(cards).find('.special').addClass('revealed');
            break;

        default:
            break;
    }
}

/* Function to look up the role index from the src string. */
function getroleNumFromImageSrc(srcString) {
    //console.log('getroleNumFromImageSrc:', srcString);

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
       or a card that is already shown. */
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
            var roleNum = getroleNumFromImageSrc(firstCardSrc);
            //console.log('onCardClick found match for', gaRoles[roleNum].name);
            displayRoleObject(gaRoles[roleNum]);
            playSound(roleNum);
            executeSpecial(roleNum);

            /* Reveal the card-text at the bottom that has been held off. */
            $(gFirstCardClicked).find('.front').find('.card-text').removeClass('deferred');
            $(gSecondCardClicked).find('.front').find('.card-text').removeClass('deferred');

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

/* Function to look up the corresponding sound for a card. */
function playSound(roleNum) {
    //console.log('playSound:', gaRoles[roleNum].name);
    var soundFile = gaRoles[roleNum].soundFile;
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

    /* Un-fade any previous matches by clearing any matched class. */
    gameArea.find('.matched').removeClass('matched');

    /* Hide all the card-text areas by setting them back to deferred. */
    gameArea.find('.card-text').addClass('deferred');

    /* Remove any badges from the special areas from the last game. */
    gameArea.find('.special img').attr('src', '');

    /* Hide all the special areas by clearing the revealed class. */
    gameArea.find('.special').removeClass('revealed');

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

    /* Set up the card tree structure. */
    gameArea.find('.card').each(function(index) {
        var roleNum = deck[index];
        var roleObj = gaRoles[roleNum];
        //console.log(index, ":", roleObj.imageFile);

        /* Add an attribute to the card that holds the roleNum. */
        $(this).attr('role', roleNum);

        /* Set the front image. */
        $(this).find('.front img').attr('src', roleObj.imageFile);

        /* Set the front text to the budget or box office. */
        var newCardText = '';
        if ((roleObj.usageCount % 2) === 0) {
            newCardText = 'Budget: ' + roleObj.budget;
        } else {
            newCardText = 'Box Office: ' + roleObj.boxOffice;
        }
        $(this).find('.card-text').text(newCardText);
        roleObj.usageCount++;

        /* Set up the special image based on what the role is. */
        setUpSpecial(this, roleNum);
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

        var frontTextDiv = $('<div>').addClass('card-text deferred');
        frontDiv.append(frontTextDiv);

        var backDiv = $('<div>').addClass('back');
        cardDiv.append(backDiv);

        var backImgElem = $('<img>');
        backDiv.append(backImgElem);

        var specialDiv = $('<div>').addClass('special');
        cardDiv.append(specialDiv);

        var specialImgElem = $('<img>');
        specialDiv.append(specialImgElem);
    }
}

/* Set up the special image based on what the character is. */
function setUpSpecial(cardDiv, roleNum) {
    var roleObj = gaRoles[roleNum];
    console.log('setUpSpecial:', roleObj.name);

    switch (roleNum) {
        case ROLE_BARNABAS_COLLINS:
        case ROLE_JACK_SPARROW:
        case ROLE_LERNER:
        case ROLE_SWEENEY_TODD:
        case ROLE_THE_MAD_HATTER:
        case ROLE_TOM_HANSON:
        case ROLE_WILLY_WONKA:
            $(cardDiv).find('.special img').attr('src', roleObj.badgeFile);
            break;

        default:
            break;
    }

}

/* Update a button based on the link information; disable the button if no link. */
function updateLink(linkId, newLink) {
    var theLink = $('#' + linkId);
    var theButton = $(theLink).find('button');

    if (newLink === null || newLink === '') {
        /* No link; disable the button. */
        theLink.removeAttr('href');
        theButton.addClass('disabled');
    } else {
        /* Link provided, update the href and enable. */
        theLink.attr('href', newLink);
        theButton.removeClass('disabled');
    }
}