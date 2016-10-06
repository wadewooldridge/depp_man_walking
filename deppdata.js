/* deppdata.js - JavaScript data structures for "Depp Man Walking" matching game. */
/* This file should be sourced first, before deppscripts.js. */

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

/* Pseudo-object for real-life data. */
var gRealLifeRole =
    {   name:       'Johnny Depp',
        movie:      'Real Life',
        year:       '2016',
        cost:       '',
        gross:      '',

        imdb:       'http://www.imdb.com/name/nm0000136/',
        tomatoes:   '',
        wikipedia:  'https://en.wikipedia.org/wiki/Johnny_Depp',
        netflix:    '',

        imageFile:  'images/johnny_depp.jpg',
        movieFile:  null,
        soundFile:  null,
        basicText:  'John Christopher "Johnny Depp II (born Jule 9, 1963) is an American actor, producer, and \
        musician. He has won the Golden Globe Award and Screen Actors Guild Award for Best Actor.'
    };

/* Basic information for each role; these indices match the ROLE constants above. */
var gaRoles = [
//============================================================================================================//
    {   name:       'Barnabas Collins',
        movie:      'Dark Shadows',
        year:       '2012',
        cost:       '$nnnM',
        gross:      '$nnnM',

        imdb:       'http://www.imdb.com/title/tt1077368/?ref_=nm_flmg_act_21',
        tomatoes:   '',
        wikipedia:  '',
        netflix:    '',

        imageFile:  'images/barnabas_collins.jpg',
        movieFile:  null,
        soundFile:  null,
        basicText:  'An imprisoned vampire, Barnabas Collins, is set free and returns to his ancestral home, \ ' +
        'where his dysfunctional descendants are in need of his protection.'
    },
//============================================================================================================//
    {   name:       'Dean Corso',
        movie:      'The Ninth Gate',
        year:       '1999',
        cost:       '$nnnM',
        gross:      '$nnnM',

        imdb:       'http://www.imdb.com/title/tt0142688/?ref_=nm_flmg_act_58',
        tomatoes:   '',
        wikipedia:  '',
        netflix:    '',

        imageFile:  'images/dean_corso.jpg',
        movieFile:  null,
        soundFile:  null,
        basicText:  'A rare book dealer, while seeking out the last two copies of a demon text, gets drawn into \ ' +
        'a conspiracy with supernatural overtones.'
    },
//============================================================================================================//
    {   name:       'Don Juan DeMarco',
        movie:      'Don Juan DeMarco',
        year:       '1994',
        cost:       '$nnnM',
        gross:      '$nnnM',

        imdb:       'http://www.imdb.com/title/tt0112883/?ref_=nm_flmg_act_65',
        tomatoes:   '',
        wikipedia:  '',
        netflix:    '',

        imageFile:  'images/don_juan_demarco.jpg',
        movieFile:  null,
        soundFile: null,
        basicText:  'A psychiatrist must cure a young patient that presents himself as Don Juan, the greatest \ ' +
        'lover in the world.'
    },
//============================================================================================================//
    {   name:       'Donnie Brasco',
        movie:      'Donnie Brasco',
        year:       '1997',
        cost:       '$nnnM',
        gross:      '$nnnM',

        imdb:       'http://www.imdb.com/title/tt0119008/?ref_=nm_flmg_act_62',
        tomatoes:   '',
        wikipedia:  '',
        netflix:    '',

        imageFile:  'images/donnie_brasco.jpg',
        movieFile:  null,
        soundFile:  null,
        basicText:  'An FBI undercover agent infiltrates the mob and finds himself identifying more with the mafia \ ' +
        'life, at the expense of his regular one.'
    },
//============================================================================================================//
    {   name:       'Ed Wood',
        movie:      'Ed Wood',
        year:       '1994',
        cost:       '$nnnM',
        gross:      '$nnnM',

        imdb:       'http://www.imdb.com/title/tt0109707/?ref_=nm_flmg_act_66',
        tomatoes:   '',
        wikipedia:  '',
        netflix:    '',

        imageFile:  'images/ed_wood.jpg',
        movieFile:  null,
        soundFile:  null,
        basicText:  'An ambitious but troubled movie director tries his best to fulfill his dream, despite his \ ' +
        'lack of support.'
    },
//============================================================================================================//
    {   name:       'Edward Scissorhands',
        movie:      'Edward Scissorhands',
        year:       '1990',
        cost:       '$nnnM',
        gross:      '$nnnM',

        imdb:       'http://www.imdb.com/title/tt0099487/?ref_=nm_flmg_act_71',
        tomatoes:   '',
        wikipedia:  '',
        netflix:    '',

        imageFile: 'images/edward_scissorhands.jpg',
        movieFile:  null,
        soundFile: 'sounds/edward_scissorhands.wav',
        basicText:  'A gentle man, with scissors for hands, is brought into a new community after living in isolation.'
    },
//============================================================================================================//
    {   name:       'George Jung',
        movie:      'Blow',
        year:       '2001',
        cost:       '$nnnM',
        gross:      '$nnnM',

        imdb:       'http://www.imdb.com/title/tt0221027/?ref_=nm_flmg_act_51',
        tomatoes:   '',
        wikipedia:  '',
        netflix:    '',

        imageFile:  'images/george_jung.jpg',
        movieFile:  null,
        soundFile:  null,
        basicText:  'The story of George Jung, the man who established the American cocaine market in the 1970s.'
    },
//============================================================================================================//
    {   name:       'Gilbert Grape',
        movie:      'What\'s Eating Gilbert Grape',
        year:       '1993',
        cost:       '$nnnM',
        gross:      '$nnnM',

        imdb:       'http://www.imdb.com/title/tt0108550/?ref_=nm_flmg_act_67',
        tomatoes:   '',
        wikipedia:  '',
        netflix:    '',

        imageFile:  'images/gilbert_grape.jpg',
        movieFile:  null,
        soundFile:  null,
        basicText:  'After his father\'s death, Gilbert has to care for his mentally disabled brother, Arnie, \ ' +
        'and his morbidly obese mother, which is suddenly challenged when love walks into his life.'
    },
//============================================================================================================//
    {   name:       'Ichabod Crane',
        movie:      'Sleepy Hollow',
        year:       '1999',
        cost:       '$nnnM',
        gross:      '$nnnM',

        imdb:       'http://www.imdb.com/title/tt0162661/?ref_=nm_flmg_act_56',
        tomatoes:   '',
        wikipedia:  '',
        netflix:    '',

        imageFile:  'images/ichabod_crane.jpg',
        movieFile:  null,
        soundFile:  'sounds/ichabod_crane.mp3',
        basicText:  'Ichabod Crane is sent to Sleepy Hollow to investigate the decapitations of 3 people with the \ ' +
        'culprit being the legendary apparition, the Headless Horseman.'
    },
//============================================================================================================//
    {   name:       'Jack Sparrow',
        movie:      'Pirates of the Caribbean: The Curse of the Black Pearl',
        year:       '2003',
        cost:       '$nnnM',
        gross:      '$nnnM',

        imdb:       'http://www.imdb.com/title/tt0325980/?ref_=nm_flmg_act_49',
        tomatoes:   '',
        wikipedia:  '',
        netflix:    '',

        imageFile:  'images/jack_sparrow.jpg',
        movieFile:  null,
        soundFile:  'sounds/jack_sparrow.wav',
        basicText:  'Blacksmith Will Turner teams up with eccentric pirate "Captain" Jack Sparrow to save his \ ' +
        'love, the governor\'s daughter, from Jack\'s former pirate allies, who are now undead.'
    },
//============================================================================================================//
    {   name:       'John Dillinger',
        movie:      'Public Enemies',
        year:       '2009',
        cost:       '$nnnM',
        gross:      '$nnnM',

        imdb:       'http://www.imdb.com/title/tt1152836/?ref_=nm_flmg_act_31',
        tomatoes:   '',
        wikipedia:  '',
        netflix:    '',

        imageFile:  'images/john_dillinger.jpg',
        movieFile:  null,
        soundFile:  null,
        basicText:  'The Feds try to take down notorious American gangsters John Dillinger, Baby Face Nelson \ ' +
        'and Pretty Boy Floyd during a booming crime wave in the 1930s.'
    },
//============================================================================================================//
    {   name:       'Lerner',
        movie:      '',
        year:       '2016',
        cost:       '$nnnM',
        gross:      '$nnnM',

        imdb:       '',
        tomatoes:   '',
        wikipedia:  '',
        netflix:    '',

        imageFile:  'images/lerner.jpg',
        movieFile:  null,
        soundFile:  null,
        basicText:  ''
    },
//============================================================================================================//
    {   name:       'Mortdecai',
        movie:      'Mortdecai',
        year:       '2015',
        cost:       '$nnnM',
        gross:      '$nnnM',

        imdb:       'http://www.imdb.com/title/tt3045616/?ref_=nm_flmg_act_13',
        tomatoes:   '',
        wikipedia:  '',
        netflix:    '',

        imageFile:  'images/mortdecai.jpg',
        movieFile:  null,
        soundFile:  null,
        basicText:  'Juggling angry Russians, the British Mi5, and an international terrorist, debonair art \ ' +
        'dealer and part time rogue Charlie Mortdecai races to recover a stolen painting rumored to contain a \ ' +
        'code that leads to lost Nazi gold.'
    },
//============================================================================================================//
    {   name:       'Rango (voice)',
        movie:      'Rango',
        year:       '2011',
        cost:       '$nnnM',
        gross:      '$nnnM',

        imdb:       'http://www.imdb.com/title/tt1192628/?ref_=nm_flmg_act_28',
        tomatoes:   '',
        wikipedia:  '',
        netflix:    '',

        imageFile:  'images/rango.jpg',
        movieFile:  null,
        soundFile:  null,
        basicText:  'Rango is an ordinary chameleon who accidentally winds up in the town of Dirt, a \ ' +
        'lawless outpost in the Wild West in desperate need of a new sheriff.'
    },
//============================================================================================================//
    {   name:       'Roux',
        movie:      'Chocolat',
        year:       '2000',
        cost:       '$nnnM',
        gross:      '$nnnM',

        imdb:       'http://www.imdb.com/title/tt0241303/?ref_=nm_flmg_act_53',
        tomatoes:   '',
        wikipedia:  '',
        netflix:    '',

        imageFile:  'images/roux.jpg',
        movieFile:  null,
        soundFile:  null,
        basicText:  'A woman and her daughter open a chocolate shop in a small French village that shakes up \ ' +
        'the rigid morality of the community.'
    },
//============================================================================================================//
    {   name:       'Sweeney Todd',
        movie:      'Sweeney Todd: The Demon Barber of Fleet Street',
        year:       '2007',
        cost:       '$nnnM',
        gross:      '$nnnM',

        imdb:       'http://www.imdb.com/title/tt0408236/?ref_=nm_flmg_act_34',
        tomatoes:   '',
        wikipedia:  '',
        netflix:    '',

        imageFile:  'images/sweeney_todd.jpg',
        movieFile:  null,
        soundFile:  'sounds/sweeney_todd.wav',
        basicText:  'The infamous story of Benjamin Barker, AKA Sweeney Todd, who sets up a barber shop down in \ ' +
        'London which is the basis for a sinister partnership with his fellow tenant, Mrs. Lovett. Based on the \ ' +
        'hit Broadway musical.'
    },
//============================================================================================================//
    {   name:       'The Mad Hatter',
        movie:      'Alice in Wonderland',
        year:       '2010',
        cost:       '$nnnM',
        gross:      '$nnnM',

        imdb:       'http://www.imdb.com/title/tt1014759/?ref_=nm_flmg_act_30',
        tomatoes:   '',
        wikipedia:  '',
        netflix:    '',

        imageFile:  'images/mad_hatter.jpg',
        movieFile:  null,
        soundFile:  'sounds/mad_hatter.wav',
        basicText:  'Nineteen-year-old Alice returns to the magical world from her childhood adventure, where \ ' +
        'she reunites with her old friends and learns of her true destiny: to end the Red Queen\'s reign of terror.'
    },
//============================================================================================================//
    {   name:       'The Wolf',
        movie:      'Into the Woods',
        year:       '2014',
        cost:       '$nnnM',
        gross:      '$nnnM',

        imdb:       'http://www.imdb.com/title/tt2180411/?ref_=nm_flmg_act_14',
        tomatoes:   '',
        wikipedia:  '',
        netflix:    '',

        imageFile:  'images/the_wolf.jpg',
        movieFile:  null,
        soundFile:  'sounds/the_wolf.mp3',
        basicText:  'A witch tasks a childless baker and his wife with procuring magical items from classic \ ' +
        'fairy tales to reverse the curse put on their family tree.'
    },
//============================================================================================================//
    {   name:       'Tom Hanson',
        movie:      '21 Jump Street (TV Series)',
        year:       '1987-2001',
        cost:       '$nnnM',
        gross:      '$nnnM',

        imdb:       'http://www.imdb.com/title/tt0092312/?ref_=nm_flmg_act_72',
        tomatoes:   '',
        wikipedia:  '',
        netflix:    '',

        imageFile:  'images/tom_hanson.jpg',
        movieFile:  null,
        soundFile:  'sounds/tom_hanson.mp3',
        basicText:  'The cases of an undercover police unit composed of young looking officers specializing in \ ' +
        'youth crime.'
    },
//============================================================================================================//
    {   name:       'Tonto',
        movie:      'The Lone Ranger',
        year:       '2013',
        cost:       '$nnnM',
        gross:      '$nnnM',

        imdb:       'http://www.imdb.com/title/tt1210819/?ref_=nm_flmg_act_18',
        tomatoes:   '',
        wikipedia:  '',
        netflix:    '',

        imageFile:  'images/tonto.jpg',
        movieFile:  null,
        soundFile:  'sounds/tonto.mp3',
        basicText:  'Native American warrior Tonto recounts the untold tales that transformed John Reid, a man \ ' +
        'of the law, into a legend of justice.'
    },
//============================================================================================================//
    {   name:       'Willy Wonka',
        movie:      'Charlie and the Chocolate Factory',
        year:       '2005',
        cost:       '$nnnM',
        gross:      '$nnnM',

        imdb:       'http://www.imdb.com/title/tt0367594/?ref_=nm_flmg_act_41',
        tomatoes:   '',
        wikipedia:  '',
        netflix:    '',

        imageFile:  'images/willy_wonka.jpg',
        movieFile:  null,
        soundFile:  'sounds/willy_wonka.wav',
        basicText:  'A young boy wins a tour through the most magnificent chocolate factory in the world, led by \ ' +
        'the world\'s most unusual candy maker.'
    }
//============================================================================================================//
];
