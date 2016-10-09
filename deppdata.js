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
        budget:     '',
        boxOffice:  '',

        imdb:       'http://www.imdb.com/name/nm0000136/',
        tomatoes:   'https://www.rottentomatoes.com/celebrity/johnny_depp/',
        wikipedia:  'https://en.wikipedia.org/wiki/Johnny_Depp',
        netflix:    'https://dvd.netflix.com/RoleDisplay/Johnny-Depp/23954',

        badgeFile:  null,
        imageFile:  'images/johnny_depp.jpg',
        youtube:    null,
        basicText:  'John Christopher "Johnny" Depp II (born Jule 9, 1963) is an American actor, producer, and \
        musician. He has won the Golden Globe Award and Screen Actors Guild Award for Best Actor.',
        notes:      []
    };

/* Basic information for each role; these indices match the ROLE_xxx constants above. */
var gaRoles = [
//============================================================================================================//
    {   name:       'Barnabas Collins',
        movie:      'Dark Shadows',
        year:       '2012',
        budget:     '$150M',
        boxOffice:  '$79.7M',
        usageCount: 0,

        imdb:       'http://www.imdb.com/title/tt1077368/?ref_=nm_flmg_act_21',
        tomatoes:   'https://www.rottentomatoes.com/m/dark-shadows-2010',
        wikipedia:  'https://en.wikipedia.org/wiki/Dark_Shadows_(film)',
        netflix:    'https://dvd.netflix.com/Movie/Dark-Shadows/70217909',

        badgeFile:  'images/badge_kids_choice.jpg',
        imageFile:  'images/barnabas_collins.jpg',
        youtube:    {videoId: 'QqY7f0Lvbj0', startSeconds: 15, endSeconds: 25},
        basicText:  'An imprisoned vampire, Barnabas Collins, is set free and returns to his ancestral home, \ ' +
        'where his dysfunctional descendants are in need of his protection.',
        notes:      []
    },
//============================================================================================================//
    {   name:       'Dean Corso',
        movie:      'The Ninth Gate',
        year:       '1999',
        budget:     '$38M',
        boxOffice:  '$58.4M',
        usageCount: 0,

        imdb:       'http://www.imdb.com/title/tt0142688/?ref_=nm_flmg_act_58',
        tomatoes:   'https://www.rottentomatoes.com/m/ninth_gate',
        wikipedia:  'https://en.wikipedia.org/wiki/The_Ninth_Gate',
        netflix:    'https://dvd.netflix.com/Movie/The-Ninth-Gate/60000200',

        badgeFile:  null,
        imageFile:  'images/dean_corso.jpg',
        youtube:    {videoId: '2wv06DKLXmI', startSeconds: 191, endSeconds: 203},
        basicText:  'A rare book dealer, while seeking out the last two copies of a demon text, gets drawn into \ ' +
        'a conspiracy with supernatural overtones.',
        notes:      []
    },
//============================================================================================================//
    {   name:       'Don Juan DeMarco',
        movie:      'Don Juan DeMarco',
        year:       '1994',
        budget:     '$22M',
        boxOffice:  '$68.8M',
        usageCount: 0,

        imdb:       'http://www.imdb.com/title/tt0112883/?ref_=nm_flmg_act_65',
        tomatoes:   'https://www.rottentomatoes.com/m/don-juan-demarco',
        wikipedia:  'https://en.wikipedia.org/wiki/Don_Juan_DeMarco',
        netflix:    'https://dvd.netflix.com/Movie/Don-Juan-DeMarco/452226',

        badgeFile:  null,
        imageFile:  'images/don_juan_demarco.jpg',
        youtube:    {videoId: 'vkmSVmV_E4g', startSeconds: 2, endSeconds: 27},
        basicText:  'A psychiatrist must cure a young patient that presents himself as Don Juan, the greatest \ ' +
        'lover in the world.',
        notes:      []
    },
//============================================================================================================//
    {   name:       'Donnie Brasco',
        movie:      'Donnie Brasco',
        year:       '1997',
        budget:     '$35M',
        boxOffice:  '$124.9M',
        usageCount: 0,

        imdb:       'http://www.imdb.com/title/tt0119008/?ref_=nm_flmg_act_62',
        tomatoes:   'https://www.rottentomatoes.com/m/donnie_brasco',
        wikipedia:  'https://en.wikipedia.org/wiki/Donnie_Brasco_(film)',
        netflix:    'https://dvd.netflix.com/Movie/Donnie-Brasco/1151721',

        badgeFile:  null,
        imageFile:  'images/donnie_brasco.jpg',
        youtube:    {videoId: 'twkjN0xQsWw', startSeconds: 96, endSeconds: 107},
        basicText:  'An FBI undercover agent infiltrates the mob and finds himself identifying more with the mafia \ ' +
        'life, at the expense of his regular one.',
        notes:      []
    },
//============================================================================================================//
    {   name:       'Ed Wood',
        movie:      'Ed Wood',
        year:       '1994',
        budget:     '$18M',
        boxOffice:  '$5.9M',
        usageCount: 0,

        imdb:       'http://www.imdb.com/title/tt0109707/?ref_=nm_flmg_act_66',
        tomatoes:   'https://www.rottentomatoes.com/m/ed_wood',
        wikipedia:  'https://en.wikipedia.org/wiki/Ed_Wood_(film)',
        netflix:    'https://dvd.netflix.com/Movie/Ed-Wood/60010313',

        badgeFile:  null,
        imageFile:  'images/ed_wood.jpg',
        youtube:    {videoId: 'ZOenlU1qATY', startSeconds: 38, endSeconds: 52},
        basicText:  'An ambitious but troubled movie director tries his best to fulfill his dream, despite his \ ' +
        'lack of support.',
        notes:      []
    },
//============================================================================================================//
    {   name:       'Edward Scissorhands',
        movie:      'Edward Scissorhands',
        year:       '1990',
        budget:     '$20M',
        boxOffice:  '$86M',
        usageCount: 0,

        imdb:       'http://www.imdb.com/title/tt0099487/?ref_=nm_flmg_act_71',
        tomatoes:   'https://www.rottentomatoes.com/m/edward_scissorhands',
        wikipedia:  'https://en.wikipedia.org/wiki/Edward_Scissorhands',
        netflix:    'https://dvd.netflix.com/Movie/Edward-Scissorhands/60000527',

        badgeFile:  null,
        imageFile: 'images/edward_scissorhands.jpg',
        youtube:    {videoId: 'P4gTvnpO1fM', startSeconds: 49, endSeconds: 67},
        basicText:  'A gentle man, with scissors for hands, is brought into a new community after living in isolation.',
        notes:      []
    },
//============================================================================================================//
    {   name:       'George Jung',
        movie:      'Blow',
        year:       '2001',
        budget:     '$30M',
        boxOffice:  '$83.3M',
        usageCount: 0,

        imdb:       'http://www.imdb.com/title/tt0221027/?ref_=nm_flmg_act_51',
        tomatoes:   'https://www.rottentomatoes.com/m/blow',
        wikipedia:  'https://en.wikipedia.org/wiki/Blow_(film)',
        netflix:    'https://dvd.netflix.com/Movie/Blow/60020891',

        badgeFile:  null,
        imageFile:  'images/george_jung.jpg',
        youtube:    {videoId: 'JVVlF-QVUXI', startSeconds: 109, endSeconds: 125},
        basicText:  'The story of George Jung, the man who established the American cocaine market in the 1970s.',
        notes:      []
    },
//============================================================================================================//
    {   name:       'Gilbert Grape',
        movie:      'What\'s Eating Gilbert Grape',
        year:       '1993',
        budget:     '$11M',
        boxOffice:  '$10M',
        usageCount: 0,

        imdb:       'http://www.imdb.com/title/tt0108550/?ref_=nm_flmg_act_67',
        tomatoes:   'https://www.rottentomatoes.com/m/whats_eating_gilbert_grape',
        wikipedia:  'https://en.wikipedia.org/wiki/What%27s_Eating_Gilbert_Grape',
        netflix:    'https://dvd.netflix.com/Movie/What-s-Eating-Gilbert-Grape/60011552',

        badgeFile:  null,
        imageFile:  'images/gilbert_grape.jpg',
        youtube:    {videoId: 'i5KBVCoKYt0', startSeconds: 32, endSeconds: 47},
        basicText:  'After his father\'s death, Gilbert has to care for his mentally disabled brother, Arnie, \ ' +
        'and his morbidly obese mother, which is suddenly challenged when love walks into his life.',
        notes:      []
    },
//============================================================================================================//
    {   name:       'Ichabod Crane',
        movie:      'Sleepy Hollow',
        year:       '1999',
        budget:     '$70M',
        boxOffice:  '$206.1M',
        usageCount: 0,

        imdb:       'http://www.imdb.com/title/tt0162661/?ref_=nm_flmg_act_56',
        tomatoes:   'https://www.rottentomatoes.com/m/sleepy_hollow',
        wikipedia:  'https://en.wikipedia.org/wiki/Sleepy_Hollow_(film)',
        netflix:    'https://dvd.netflix.com/Movie/Sleepy-Hollow/60000207',

        badgeFile:  null,
        imageFile:  'images/ichabod_crane.jpg',
        youtube:    {videoId: 'ry-_MF6TEFU', startSeconds: 49, endSeconds: 59},
        basicText:  'Ichabod Crane is sent to Sleepy Hollow to investigate the decapitations of 3 people with the \ ' +
        'culprit being the legendary apparition, the Headless Horseman.',
        notes:      []
    },
//============================================================================================================//
    {   name:       'Jack Sparrow',
        movie:      'Pirates of the Caribbean: The Curse of the Black Pearl',
        year:       '2003',
        budget:     '$140M',
        boxOffice:  '$654.3M',
        usageCount: 0,

        imdb:       'http://www.imdb.com/title/tt0325980/?ref_=nm_flmg_act_49',
        tomatoes:   'https://www.rottentomatoes.com/m/pirates_of_the_caribbean_the_curse_of_the_black_pearl',
        wikipedia:  'https://en.wikipedia.org/wiki/Pirates_of_the_Caribbean:_The_Curse_of_the_Black_Pearl',
        netflix:    'https://dvd.netflix.com/Movie/Pirates-of-the-Caribbean-The-Curse-of-the-Black-Pearl/60029157',

        badgeFile:  'images/badge_peoples_choice.jpg',
        imageFile:  'images/jack_sparrow.jpg',
        youtube:    {videoId: 'wtUYgk4JGiA', startSeconds: 276, endSeconds: 292},
        basicText:  'Blacksmith Will Turner teams up with eccentric pirate "Captain" Jack Sparrow to save his \ ' +
        'love, the governor\'s daughter, from Jack\'s former pirate allies, who are now undead.',
        notes:      []
    },
//============================================================================================================//
    {   name:       'John Dillinger',
        movie:      'Public Enemies',
        year:       '2009',
        budget:     '$80M',
        boxOffice:  '$97M',
        usageCount: 0,

        imdb:       'http://www.imdb.com/title/tt1152836/?ref_=nm_flmg_act_31',
        tomatoes:   'https://www.rottentomatoes.com/m/10009526-public_enemies',
        wikipedia:  'https://en.wikipedia.org/wiki/Public_Enemies_(2009_film)',
        netflix:    'https://dvd.netflix.com/Movie/Public-Enemies/70111115',

        badgeFile:  null,
        imageFile:  'images/john_dillinger.jpg',
        youtube:    {videoId: 'wTz_kSiZaIM', startSeconds: 71, endSeconds: 90},
        basicText:  'The Feds try to take down notorious American gangsters John Dillinger, Baby Face Nelson \ ' +
        'and Pretty Boy Floyd during a booming crime wave in the 1930s.',
        notes:      []
    },
//============================================================================================================//
    {   name:       'Lerner',
        movie:      'Platoon',
        year:       '1986',
        budget:     '$13M',
        boxOffice:  '$138.5M',
        usageCount: 0,

        imdb:       'http://www.imdb.com/title/tt0091763/',
        tomatoes:   'https://www.rottentomatoes.com/m/platoon',
        wikipedia:  'https://en.wikipedia.org/wiki/Platoon_(film)',
        netflix:    'https://dvd.netflix.com/Movie/Platoon/860591',

        badgeFile:  'images/badge_hollywood_star.jpg',
        imageFile:  'images/lerner.jpg',
        youtube:    {videoId: 'fQD0IFW7I0k', startSeconds: 0, endSeconds: 10},
        basicText:  'A young recruit in Vietnam faces a moral crisis when confronted with the horrors of war \ ' +
        'and the duality of man.',
        notes:      []
    },
//============================================================================================================//
    {   name:       'Mortdecai',
        movie:      'Mortdecai',
        year:       '2015',
        budget:     '$60M',
        boxOffice:  '$47M',
        usageCount: 0,

        imdb:       'http://www.imdb.com/title/tt3045616/?ref_=nm_flmg_act_13',
        tomatoes:   'https://www.rottentomatoes.com/m/mortdecai',
        wikipedia:  'https://en.wikipedia.org/wiki/Mortdecai_(film)',
        netflix:    'https://dvd.netflix.com/Movie/Mortdecai/80000467',

        badgeFile:  null,
        imageFile:  'images/mortdecai.jpg',
        youtube:    {videoId: '8YsSbKcR3LY', startSeconds: 50, endSeconds: 60},
        basicText:  'Juggling angry Russians, the British Mi5, and an international terrorist, debonair art \ ' +
        'dealer and part time rogue Charlie Mortdecai races to recover a stolen painting rumored to contain a \ ' +
        'code that leads to lost Nazi gold.',
        notes:      []
    },
//============================================================================================================//
    {   name:       'Rango (voice)',
        movie:      'Rango',
        year:       '2011',
        budget:     '$135M',
        boxOffice:  '$123.2M',
        usageCount: 0,

        imdb:       'http://www.imdb.com/title/tt1192628/?ref_=nm_flmg_act_28',
        tomatoes:   'https://www.rottentomatoes.com/m/rango',
        wikipedia:  'https://en.wikipedia.org/wiki/Rango_(2011_film)',
        netflix:    'https://dvd.netflix.com/Movie/Rango/70137742',

        badgeFile:  null,
        imageFile:  'images/rango.jpg',
        youtube:    {videoId: 'hptQDGywkyQ', startSeconds: 5, endSeconds: 21},
        basicText:  'Rango is an ordinary chameleon who accidentally winds up in the town of Dirt, a \ ' +
        'lawless outpost in the Wild West in desperate need of a new sheriff.',
        notes:      []
    },
//============================================================================================================//
    {   name:       'Roux',
        movie:      'Chocolat',
        year:       '2000',
        budget:     '$25M',
        boxOffice:  '$14.1M',
        usageCount: 0,

        imdb:       'http://www.imdb.com/title/tt0241303/?ref_=nm_flmg_act_53',
        tomatoes:   'https://www.rottentomatoes.com/m/1103080-chocolat',
        wikipedia:  'https://en.wikipedia.org/wiki/Chocolat_(2000_film)',
        netflix:    'https://dvd.netflix.com/Movie/Chocolat/60003116',

        badgeFile:  null,
        imageFile:  'images/roux.jpg',
        youtube:    {videoId: 'yoGdST0RFuc', startSeconds: 117, endSeconds: 130},
        basicText:  'A woman and her daughter open a chocolate shop in a small French village that shakes up \ ' +
        'the rigid morality of the community.',
        notes:      []
    },
//============================================================================================================//
    {   name:       'Sweeney Todd',
        movie:      'Sweeney Todd: The Demon Barber of Fleet Street',
        year:       '2007',
        budget:     '$50M',
        boxOffice:  '$52.9M',
        usageCount: 0,

        imdb:       'http://www.imdb.com/title/tt0408236/?ref_=nm_flmg_act_34',
        tomatoes:   'https://www.rottentomatoes.com/m/sweeney_todd_the_demon_barber_of_fleet_street_2007',
        wikipedia:  'https://en.wikipedia.org/wiki/Sweeney_Todd:_The_Demon_Barber_of_Fleet_Street_(2007_film)',
        netflix:    'https://dvd.netflix.com/Movie/Sweeney-Todd/70077544',

        badgeFile:  'images/badge_golden_globe.jpg',
        imageFile:  'images/sweeney_todd.jpg',
        youtube:    {videoId: 'xamDprXBtBg', startSeconds: 34, endSeconds: 51},
        basicText:  'The infamous story of Benjamin Barker, AKA Sweeney Todd, who sets up a barber shop down in \ ' +
        'London which is the basis for a sinister partnership with his fellow tenant, Mrs. Lovett. Based on the \ ' +
        'hit Broadway musical.',
        notes:      []
    },
//============================================================================================================//
    {   name:       'The Mad Hatter',
        movie:      'Alice in Wonderland',
        year:       '2010',
        budget:     '$200M',
        boxOffice:  '$319.2M',
        usageCount: 0,

        imdb:       'http://www.imdb.com/title/tt1014759/?ref_=nm_flmg_act_30',
        tomatoes:   'https://www.rottentomatoes.com/m/1221547-alice_in_wonderland',
        wikipedia:  'https://en.wikipedia.org/wiki/Alice_in_Wonderland_(2010_film)',
        netflix:    'https://dvd.netflix.com/Movie/Alice-in-Wonderland/70113536',

        badgeFile:  'images/badge_rembrandt.jpg',
        imageFile:  'images/mad_hatter.jpg',
        youtube:    {videoId: 'kzkfQK4I5eE', startSeconds: 67, endSeconds: 85},
        basicText:  'Nineteen-year-old Alice returns to the magical world from her childhood adventure, where \ ' +
        'she reunites with her old friends and learns of her true destiny: to end the Red Queen\'s reign of terror.',
        notes:      []
    },
//============================================================================================================//
    {   name:       'The Wolf',
        movie:      'Into the Woods',
        year:       '2014',
        budget:     '$50M',
        boxOffice:  '$213.1M',
        usageCount: 0,

        imdb:       'http://www.imdb.com/title/tt2180411/?ref_=nm_flmg_act_14',
        tomatoes:   'https://www.rottentomatoes.com/m/into_the_woods_2014',
        wikipedia:  'https://en.wikipedia.org/wiki/Into_the_Woods_(film)',
        netflix:    'https://dvd.netflix.com/Movie/Into-the-Woods/70305948',

        badgeFile:  null,
        imageFile:  'images/the_wolf.jpg',
        youtube:    {videoId: 'ryAyTzGA-dk', startSeconds: 1, endSeconds: 17},
        basicText:  'A witch tasks a childless baker and his wife with procuring magical items from classic \ ' +
        'fairy tales to reverse the curse put on their family tree.',
        notes:      []
    },
//============================================================================================================//
    {   name:       'Tom Hanson',
        movie:      '21 Jump Street (TV Series)',
        year:       '1987-2001',
        budget:     'n/a',
        boxOffice:  'n/a',
        usageCount: 0,

        imdb:       'http://www.imdb.com/title/tt0092312/?ref_=nm_flmg_act_72',
        tomatoes:   'https://www.rottentomatoes.com/m/21-jump-street',
        wikipedia:  'https://en.wikipedia.org/wiki/21_Jump_Street',
        netflix:    'https://dvd.netflix.com/Movie/21-Jump-Street/70140349',

        badgeFile:  'images/badge_imagen.jpg',
        imageFile:  'images/tom_hanson.jpg',
        youtube:    {videoId: 'H3IUL9SwfgA', startSeconds: 1, endSeconds: 15},
        basicText:  'The cases of an undercover police unit composed of young looking officers specializing in \ ' +
        'youth crime.',
        notes:      []
    },
//============================================================================================================//
    {   name:       'Tonto',
        movie:      'The Lone Ranger',
        year:       '2013',
        budget:     '$225M',
        boxOffice:  '$89.3M',
        usageCount: 0,

        imdb:       'http://www.imdb.com/title/tt1210819/?ref_=nm_flmg_act_18',
        tomatoes:   'https://www.rottentomatoes.com/m/the_lone_ranger',
        wikipedia:  'https://en.wikipedia.org/wiki/The_Lone_Ranger_(2013_film)',
        netflix:    'https://dvd.netflix.com/Movie/The-Lone-Ranger/70243361',

        badgeFile:  null,
        imageFile:  'images/tonto.jpg',
        youtube:    {videoId: 'JjFsNSoDZK8', startSeconds: 64, endSeconds: 81},
        basicText:  'Native American warrior Tonto recounts the untold tales that transformed John Reid, a man \ ' +
        'of the law, into a legend of justice.',
        notes:      []
    },
//============================================================================================================//
    {   name:       'Willy Wonka',
        movie:      'Charlie and the Chocolate Factory',
        year:       '2005',
        budget:     '$150M',
        boxOffice:  '$475M',
        usageCount: 0,

        imdb:       'http://www.imdb.com/title/tt0367594/?ref_=nm_flmg_act_41',
        tomatoes:   'https://www.rottentomatoes.com/m/charlie_and_the_chocolate_factory',
        wikipedia:  'https://en.wikipedia.org/wiki/Charlie_and_the_Chocolate_Factory_(film)',
        netflix:    'https://dvd.netflix.com/Movie/Charlie-and-the-Chocolate-Factory/70021648',

        badgeFile:  'images/badge_teen_choice.jpg',
        imageFile:  'images/willy_wonka.jpg',
        youtube:    {videoId: 'DbaO7LfjzGQ', startSeconds: 50, endSeconds: 61},
        basicText:  'A young boy wins a tour through the most magnificent chocolate factory in the world, led by \ ' +
        'the world\'s most unusual candy maker.',
        notes:      []
    }
//============================================================================================================//
];
