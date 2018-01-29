var Terminus = {

  ENTER  :  false,
  avail  :  { home          : true,
              forest        : true,
              academy       : true,
              lessons       : true,
              practiceRoom  : true,
              Box           : false,
              Library       : true,
              practiceRoom  : true,
              meadow        : true,
              mountains     : false,
              cave          : true,
              Staircase     : true,
              DarkCorridor  : true,
              DankRoom      : true,
              SmallHole     : true,
              Tunnel        : false,
              StoneChamber  : true,
              Portal        : true,
              TownSquare    : true,
              TSLibrary     : true,
              BackRoom      : true,
              Marketplace   : true,
              ArtisansShop  : true,
              RockyPath     : true,
              Farm          : true,
              BrokenBridge  : true,
              Clearing      : false,
              OminousPath   : true,
              Cave          : true,
              Cage          : false,
              root          : true,
              basement      : true,
              creakyStairs  : true,
              musicRoom     : true,
              MagicRoom     : true
            },
  Pnew   :  { home          : true, 
              forest        : true,
              academy       : true,
              lessons       : true,
              Library       : true,
              pracroom      : true,
              meadow        : true,
              mountains     : true,
              cave          : true,
              Staircase     : true,
              DarkCorridor  : true,
              DankRoom      : true,
              SmallHole     : true,
              Tunnel        : true,
              StoneChamber  : true,
              Portal        : true,
              TownSquare    : true,
              TSLibrary     : true,
              Marketplace   : true,
              ArtisansShop  : true,
              RockyPath     : true,
              Farm          : true,
              BrokenBridge  : true,
              Clearing      : true,
              OminousPath   : true,
              Cave          : true,
              root          : true,
              basement      : true,
              creakyStairs  : true,
              musicRoom     : true,
              MagicRoom     : true
            },

  prompting :  false,
  cash      :  0,
  price     :  { backpack   : 0,
                 rmSpell    : 15,
                 mkdirSpell : 30
               },
  itemOnSale:  { 
    name       : "",
    backpack   : { 
             y : ["You quickly snatch the backpack from the table. This could come in handy.",
                  "From now on, you can say 'mv <item> backpack' to put items into your backpack."
                 ],
             n : ["You decide to leave the backpack where it is for now."]
    },
    rmSpell    : { 
             y : ["The vendor snatches the gold from your hand and then hands",
                  "you the scroll, leering as he does so. \"Ah, yes, the rm spell,\" he muses. \"Simply say 'rm'",
                  "followed by the name of an item or person, and they will disappear from this plane...",
                  "forever. D'you have the guts to use it, I wonder?\" You can now use the 'rm' spell."
                 ],
             n : ["You leave the rmSpell on the table."],
             m : ["You don't have enough money to buy the 'rm' spell."]
    },
    mkdirSpell : { 
             y : ["The vendor cackles. \"An ambitious one, eh? Very well. Just",
                  "say 'mkdir' followed by any name that pleases you, and you can create a new place wot",
                  "never existed there before. Ha! Not very useful, if y'ask me...\" you can now use the 'mkdir' spell."
                 ],
             n : ["You leave the mkdirSpell on the table."],
             m : ["You don’t have enough money to buy the 'mkdir' spell."]
    }
  },
  count     :  0,
  textY     :  15,
  clsNow    :  0,
  canvas    :  document.getElementById("terminal"),
  ctx       :  document.getElementById("terminal").getContext("2d"),

  dir    :  { home         :  "~",
              forest       :  "~/forest",
              academy      :  "~/forest/academy",
              lessons      :  "~/forest/academy/lessons",
              practiceRoom :  "~/forest/academy/lessons/practiceRoom",
              Box          :  "~/forest/academy/lessons/practiceRoom/Box",
              Library      :  "~/forest/academy/Library",
              meadow       :  "~/meadow",
              mountains    :  "~/meadow/mountains",
              cave         :  "~/meadow/mountains/cave",
              Staircase    :  "~/meadow/mountains/cave/Staircase",
              DarkCorridor :  "~/meadow/mountains/cave/DarkCorridor",
              DankRoom     :  "~/meadow/mountains/cave/DarkCorridor/DankRoom",
              SmallHole    :  "~/meadow/mountains/cave/DarkCorridor/DankRoom/SmallHole",
              Tunnel       :  "~/meadow/mountains/cave/DarkCorridor/DankRoom/Tunnel",
              StoneChamber :  "~/meadow/mountains/cave/DarkCorridor/DankRoom/Tunnel/StoneChamber",
              Portal       :  "~/meadow/mountains/cave/DarkCorridor/DankRoom/Tunnel/StoneChamber/Portal",
              TownSquare   :  "~/TownSquare",
              TSLibrary    :  "~/TownSquare/TSLibrary",
              BackRoom     :  "~/TownSquare/TSLibrary/BackRoom",
              Marketplace  :  "~/TownSquare/Marketplace",
              ArtisansShop :  "~/TownSquare/ArtisansShop",
              RockyPath    :  "~/TownSquare/RockyPath",
              Farm         :  "~/TownSquare/RockyPath/Farm",
              BrokenBridge :  "~/TownSquare/RockyPath/BrokenBridge",
              Clearing     :  "~/TownSquare/RockyPath/BrokenBridge/Clearing",
              OminousPath  :  "~/TownSquare/RockyPath/BrokenBridge/Clearing/OminousPath",
              Cave         :  "~/TownSquare/RockyPath/BrokenBridge/Clearing/OminousPath/Cave",
              Cage         :  "~/TownSquare/RockyPath/BrokenBridge/Clearing/OminousPath/Cave/Cage",
              root         :  "/",
              basement     :  "/basement",
              creakyStairs :  "/creakyStairs",
              MagicRoom    :  "/creakyStairs/MagicRoom",
              musicRoom    :  "/musicRoom",
              pwd          :  "~", 
              lwd          :  "~",
              portalWD     :  "~"
            },
  cmd    :  {},
  item   :  { 
    home    :  { 
    letter  :  ["You are a novice dropped into the mysterious land of Terminus!",
                "By exploring your surroundings and acquiring magic spells, ",
                "you are destined to defeat the dark wizard plaguing the local citizens.",
                "Go to the academy to practice using your new-learned spells; from there, find the cave that ",
                "will allow you access to a portal that will take you to the TownSquare...",
                "Help citizens to earn gold coins to buy new spells, which you can use to defeat the dark wizard.",
                "If you are new to the game, here are a few tips:",
                " ~Look at your surroundings with the spell: ls [PLACE]\(always do this after entering a new location\)",
                " ~Move to a new location with: cd [location]",
                " ~You can backtrack with the spell: cd ..",
                " ~Interact with things in the world with: less ITEM (look at, examine, or speak to ITEM)",
                " ~Get a list of useful commands by typing 'help'.",
                "ANYTHING WITHIN [ ] IS OPTIONAL FOR ALL SPELLS",
                "Go ahead. Explore. We hope you like what you find."
               ],
    forest  :  'forest',
    meadow  :  'meadow'
  },
              
  forest    :  { 
    letter  :  ["You enter and travel deep into the forest. Eventually, the path ",
                "leads to a clearing with a large impressive building. ",
                "A sign on it reads: \"Spell Casting Academy: The Elite School of Magic.\""
               ],
    sign    :  ["Spell Casting Academy: The Elite School of Magic.", 
                "Today Only: Free Introductory Lessons! Novices Welcome!"
               ],
    academy :  'academy'
  },

  academy   :  { 
    letter  :  ["The halls are filled with the hustle and bustle of academy students ",
                "scurrying to and from classes. The inside of the academy is as impressive ",
                "as it is on the outside \- with a high ceiling and gothic arches, it ",
                "seems even larger on the inside." 
               ],
    student :  ["You to speak to a hurrying student. ",
                "The student runs into you and falls to the ground. ",
                "The student quickly gets up and apologizes to you, asking if you are okay. ",
                "You are sturdier than you look and you're undamaged. ",
                "\"I'm so sorry, I was in such a hurry that I didn't see you there... Say, I haven't seen you here",
                " before. You're new here aren't\-cha?\" the student winks at you, ",
                "\"Don't worry there's tons of newbies around today, why ",
                " don't you try checking out one of the free intro lessons they're ",
                " doing today? I'd show you were to go, but I gotta run to class. ",
                " Just head into the Lessons hall and someone should help you out. ",
                " See you 'round.\" The student runs past you. You notice that the student ",
                "is pretty cute, and probably around your age. Unfortunately, the student disappears ",
                "around a corner before you can ask for a name."
               ],
    lessons :  'lessons',
    Library :  'Library'
  }, 

  lessons        : { 
    letter       : ["You enter the Lessons hall ready and eager. It's much quieter here,", 
                    "as many of the lessons have already started. You\'re quickly ushered into the ", 
                    "Introductory Lesson, which has already begun.", 
                    "You enter the class on the \"Move Spell.\"" 
                   ], 
    professor    : [ "The professor is difficult to understand, but you pick up just enough to learn 3 things:",
                     "  1. You can use 'mv' to move things in the world",
                     "  2. You have to indicate the object and the new location (i.e.: mv [object] [new location])",
                     "  3. This spell will only work on certain objects, for example the PracticeDummy’s in the PracticeRoom",
                     "You did not pay enough attention to learn which types of objects are unmovable.",
                     "Oh well, experimenting was always more of your style anyways. But be careful!" 
                    ],
    practiceRoom :  'practiceRoom'
  },

  Library   : { 
    letter  : ["Welcome to the Library; here the only book you have access to is the manual (aka man)."],
    man     : ["This is the manual that explains spells better for the user.",
							 "Type: \"man SPELL\" to get info about SPELL. P.S.: exclude the quotation marks when writing \"man SPELL\""
              ]
  },

  practiceRoom    :  { 
    letter        :  ["The room is filled with practice dummies for students to practice their new spells on."],
    Instructions  :  ["Welcome to the Practice Room.",
                      "Here you will find practice dummies to try your new spells on.",
                      "Go ahead, give it a go!", 
                      "Practice dummies will respawn in their original location once you leave the Practice Room.",
                      "If you don't know any spells yet, go ahead and check out some Lessons." 
                     ],
    Box           :  "Box"
  },

  Box             :  { 
    dummy1        :  ["It\'s a practice dummy."],
    dummy2        :  ["It\'s a practice dummy."],
    dummy3        :  ["It\'s a practice dummy."],
    dummy4        :  ["It\'s a practice dummy."],
    dummy5        :  ["It\'s a practice dummy."]
  },

  meadow          : { 
    letter        : ["This is a beautiful green meadow. A plump but majestic pony prances happily about."],
    Pony          : ["You go up to the pony and attempt to ride it.",
                     "It complies and you ride the pony around in circles for a bit.",
                     "It then grows tired of having you as a burden and knocks you off.",
                     "It then looks towards the east as if suggesting that you head in that direction." 
                    ]
  },

  mountains       : { 
    letter        : ["You travel through a mountain path, which eventually leads you to the entrance of a cave.",
                     "Sitting right outside this cave is an old man."
                    ],
    OldMan        : ["You speak with the old man. He greets you warmly as if you were old friends. You feel at ease with him.",
                     "\"Hello adventurer! Top of the morning to you! ",
                     "You seem like a young and energetic explorer.",
                     "If you're brave enough, your destiny awaits within this cave.",
                     "That destiny will manifest itself as a portal.",
                     "Enter this portal and begin the next chapter of your life. \"",
                     "The old man sees the shock on your face and smiles a comforting smile,",
                     "\"I am but a fragile old man, and cannot accompany you through this cave, but what I",
                     "can provide are a few simple spells that will help you along your way. Just read my old",
                     "manuscripts and try out those spells.\""
                    ],
    oldmanuscripts: ["If you ever forget a spell just use \'help\' and a list of available spells will appear.",
                     "If you need details on how to use a specific spell, use \'man\' followed by spell.",
                     "For example, if you were interested in details on how to use the \'mv\' spell you would use: \'man mv\'",
										 "P.S.: make sure to exclude the quotation marks when writing 'man mv'"
                    ],
    cave          : 'cave'
  },

  cave            : { 
    letter        : ["It's your typical cave: dark and dank."],
    Staircase     : "Staircase",
    DarkCorridor  : "DarkCorridor"
  },

  Staircase       : { 
    letter        : ["The rocky staircase leads you to a dead end and a sign indicating such."],
    Sign          : ["DEAD END"]
  },

  DarkCorridor    : { 
    letter        : ["You travel through the dark corridor and find a small dank room at the end."],
    DankRoom      : "DankRoom"
  },

  DankRoom         : { 
    letter         : ["It's a musty dank room. A round boulder sits to the right side of the room."],
    Boulder        : ["You feel a slight breeze coming from behind the boulder.",
                      "Tip: try moving the boulder into the hole to see where the breeze is coming from."
                     ],
    SmallHole      : "SmallHole"
  },

  SmallHole        : { 
    letter         : ["It's a hole, there's nothing exciting to do here."]
  },
  
  Tunnel           : { 
    letter         : ["It's quite moist in here.",
                      "You notice a small furry movement in the corner of your vision.",
                      "It's most likely a rat. A very large rat. Perhaps a mongoose.",
                      "At the end of the tunnel you find a stone chamber."
                     ],
    Rat            : ["Upon further inspection, you determine that the furry presence is in fact a rat…",
                      "the size of a small dog. It bites you. You are very displeased."
                     ],
    StoneChamber   : "StoneChamber"
  },
  
  StoneChamber   : { 
    letter       : ["The whole rooms glows a dim blue light. The source of this light is a portal standing",
                    "in the middle of the room. This is obviously the portal of which the old man spoke."
                   ],
    Portal       : "Portal"
  },

  TownSquare       : { 
    letter         : ["You are in a sunny and spacious town square. There is a pedestal at the center of",
                      "the cobblestone turnabout, but no statue on it. The architecture is charming, ",
                      "but everyone here seems nervous for some reason."
                     ],
    randomCitizen1 : ["\"Excuse me,\" you begin. The man turns, startled. \"Oh, hello! Welcome to Terminus.",
                      "You'll have to forgive me, but we're all a little on edge lately, what with ",
                      "the Dark Wizard spreading corruption all along the coast. You should be careful!\""
                     ],
    randomCitizen2 : ["The man looks up from his newspaper when he notices you staring. \"Have",
                      "you read this?\" he exclaims, shaking the latest edition of \"The Last Word\" in your face.",
                      "\"It says here the wizard's corruption has spread as far as Oston to the south, and New",
                      "Console is completely unrecoverable! These are dangerous times,\" he mutters, shaking",
                      "his head and turning back to his reading."
                     ],
    distraughtLady : ["The woman is sobbing uncontrollably, her face in her hands. \"My baby,\" she cries,",
                      "\"They kidnapped my baby! I just know that wizard had something to do with it.\""
                     ],
    TSLibrary      : "TSLibrary",
    Marketplace    : "Marketplace",
    ArtisansShop   : "ArtisansShop",
    RockyPath      : "RockyPath" 
  },

  TSLibrary             : { 
    letter              : ["The Library is dimly lit and smells like mildew.",
                           "Still, it's warm in here and the soft red carpet makes it seem kind of cozy."
                          ],
    totallyRadSpellBook : ["Legends speak of a great word of power that allows the speaker to perform",
                           "any action on any item. \"sudo\", as the ancients called it, conveys complete mastery over",
                           "the elements. Unfortunately, or perhaps fortunately, the mystical password has been lost",
                           "to the sands of time."
                          ],
    paperbackRomance    : ["You flip the paperback open to a random page. \"Oh, Horatio!\" Antonia",
                           "exclaimed, her bosom heaving as Horatio deftly ripped the bodice from her lithe frame.",
                           "Horatio gave an animalistic growl and he clasped her fingers in his strong hands and",
                           "brought them to rest upon his swollen— You close the book, disinterested, and place it",
                           "back on the shelf."
                          ],
   "History-Of-Terminus": ["It looks like an interesting book, but it’s way too long and the print is too tiny."],
    inconspicuousLever  : ["You spot an inconspicuous lever behind the shelves. Curious, you pull it, and",
                           "a panel slides open to reveal a secret back room."
                          ],
    man                 : ["This is the manual that explains spells better for the user.",
												 	 "Type: \"man SPELL\" to get info about SPELL. P.S.: "+
													 "exclude the quotation marks when writing \"man SPELL\""
                          ]
  },

  BackRoom      : { 
    Grep        : ["The exceptionally ugly elf turns to you with a sour expression. \"Greeeeeep\", he says sullenly."],
    Librarian   : ["\"Hm? Oh, hello. I apologize for the mess, but I'm",
                   "very busy doing research on the dark wizard. Would you do me a favor? Go look up all",
                   "references to \"dark wizard\" in the History-Of-Terminus. My assistant, Grep, can help you.\"",
                   "Grep eyes you balefully. \"Greeepp.\"",
                   "\"To search the contents of the book, just type 'grep [phrase] [document]', where [phrase]",
                   "is the phrase you want to search for in quotation marks, and [document] is the name of the",
                   "book you want to search."
                  ]
  },
  
  Marketplace   : { 
    letter      : ["It seems like Terminus has fallen on hard times; there's only one stall in the",
                   "marketplace. A sleazy-looking vendor lounges behind a table piled with strange wares."
                  ],
    vendor      : ["\"Ello there.\" The vendor smiles at you unpleasantly, revealing a mouth full of",
                   "gold teeth. \"Well? Wot are you looking for?\"" 
                  ],
    backpack    : ["There's a beat-up looking backpack on the table with no price tag. Its cloth",
                   "looks frayed, but sturdy. You glance quickly at the vendor, but his attention is elsewhere.",
                   "Do you take the backpack? y\/n"
                  ],
    rmSpell     : ["There's a spell scroll on the table labeled \"Remove.\"",
                   "Do you want to buy it for 15 gold pieces? y\/n"
                  ],
    mkdirSpell  : ["There's a spell scroll on the table labeled \"Make dreams into reality.\"",
                   "Do you want to buy it for 30 gold pieces? y\/n"
                  ]
  },
 
  backpack      : {},

  ArtisansShop      : { 
    letter          : ["The walls of the shop are covered in clocks, all slightly out of sync. At the",
                       "workbench, a woman in an enormous pair of goggles is wielding a blowtorch with",
                       "frightening enthusiasm."
                      ],
    strangeTrinket  : ["It looks like a crystal of some sort. It’s very beautiful."],
    clockworkDragon : ["An adorable dragon the size of a small dog is frolicking about the room.",
                       "You'd think it was real if it weren't for the wind-up key sticking out of its back"
                      ],
    Artisan         : ["The Artisan lifts up her goggles and peers at you in surprise.",
                       "\"Are you the new assistant? You're late! ...You say you aren't my assistant?",
                       "Well, that doesn't mean you can't make yourself useful. I need some gears, quickly!",
                       "...",
                       "You don’t even know how to make things? Hmph. Some assistant you are.",
                       "Just say 'nano ITEM' alright? Where ITEM is the name of the thing you want to create.",
                       "Now make me a Gear!\""
                      ]
  },

  RockyPath      : { 
    letter       : ["The weed-choked path leads off into the fields. However, there is an enormous boulder blocking the way."],
    largeBoulder : ["It's much too big to move."]
  },

  Farm        : { 
    letter    : ["There was once a farm of some sort here, but now the fields are scorched and brown."],
    earOfCorn : ["The corn is sad and withered-looking."],
    Farmer    : ["\"Ruined! I'm ruined! Look at these crops... almost nothing left!",
                 "The wizard's minions were here last week... they destroyed everything. How will I feed my",
                 "10 children with just one ear of corn?\""
                ]
  },

  BrokenBridge  : {
    letter      : ["A creaky wooden bridge stretches across a chasm. But it's missing a plank, and the gap is too far to jump."],
    Clearing    : "Clearing"
  },

  Clearing      : {
    letter      : ["There's a small grassy clearing here, with a man sitting on a stone and sobbing.", 
                   "Behind him is a pile of rubble."
                  ],
    cryingMan   : ["man: \"You! You're a magic-user! I can tell, you've got that look. Come to finish",
                   "  the job, have you? Well, go ahead, do your worst— there's nothing else you",
                   "  can take from me. Not since the rest of you were here a few days ago.\"",
                   "you: \"What happened?\"",
                   "man: \"You DARE ask?! You know perfectly well what happened.",
                   "  Your friends, the wizaard's minions, destroyed my house and kidnapped my poor daughter, that's what!",
                   "  My wife even went into town to look for help, and I haven't heard from her since!\"",
                   "you: \"I'm not the wizard's minion, Sir. I seek only to destroy the wizard.\"",
                   "man: \"Hm? Well, I guess it's true that you don't look like one of the wizard's minions. Still, I don't",
                   "  trust you magicfolk. If you really are who you say you are, then prove your good intentions",
                   "  by making me a new house!\""
                  ],
  },

  OminousPath      : {
    letter         : ["The path leads toward a dark cave. It's an ordinary cobblestone path,",
                      "but for some reason it fills you with dread."
                     ],
    thornyBrambles : ["This thicket of brambles is covered with wicked-looking thorns. You",
                      "can't go around it, and you definitely aren't about to go through it."
                     ],
    Cave           : "Cave"
  },

  Cave : {
    letter                 : ["The cave is dark and smells like... feet? Oh, right, it's probably the trolls.",
                              "There's a scared-looking kid in a cage by the far wall."
                             ],
    uglyTroll              : ["He looks mad, and really ugly."],
    uglierTroll            : ["He looks mad, and really, really ugly."],
    absolutelyHideousTroll : ["You probably don't want to look at this guy. Trust me on this one."],
    Cage                   : "Cage"
  },
  
  Cage : {
    kidnappedChild : ["You know it's kind of mean, but you can't help but think that that is one funny-looking kid."]
  },

  root           : {
    letter       : ["You enter the lair of the wizard: It is a dimly lit castle filled by a chilling silence.",
                    "The candle holders are skulls of elves, with three candles sticking out of each mouth.",
                    "The walls are surprisingly elegant considering how despicable the wizard is, and fine paintings",
                    "hang from them. The floor is covered in a scarlet carpet of fine quality.",
                    "The castle is furnished in oak cupboards and shelves covered in all sorts of magic manuals and grimoires."
                   ],
    dustyDiary   : ["My beloved Novice was only a babe when I last saw him; fearing that",
                    "the evil wizard would soon find a way to break the barrier protecting our home and overthrow",
                    "me as ruler of Terminus, my dear wife fled with him to a land neighbouring the meadow and forest.",
                    "It's been years now since I've seen either of them: over the years, my sorrow has gradually",
                    "deteriorated my health and strength. On the other hand, the dark wizard has been increasing his",
                    "strength preparing to attack. I now fear that my beloved Darcia was right to fear for her life",
                    "and that of our son... the dark wizard, my dear brother, has been totally consumed by darkness",
                    "and his heart grows colder each day from his hatred and rage. How I long to see my son once more...",
                    "How I long to make peace with my dear brother.",
                    "This crown I inherited has proven to be an unnecessary burden which has torn the beautiful",
                    "relationship I once shared with my brother... Lo! The land of Terminus is in peril and the",
                    "only hope of restoring the peace is to exterminate my brother - no amount of love could",
                    "bring light into his heart at this point.",
                    "The hope of Terminus now lies with my son, my dear Novice..."
                   ],
    basement     : "basement",
    creakyStairs : "creakyStairs",
    musicRoom    : "musicRoom",
    
  },

  basement     : {
    letter     : ["You go down the stairs leading into the basement. It's pitch black in here.",
                  "You fumble around and find a box of matches, which you use to light a nearby candle.",
                  "In the far corner is  a guillotine with a body kneeling before it..."
                 ],
    corpse     : ["You flip the body only to find out that it's been decapitated.",
                  "A trail of blood leads to a basket nearby. Inside is a head."
                 ],
    bloodyHead : ["You turn the head over - it's staring you in the eyes. You recognize it from the",
                  "paintings on the castle walls - it belongs to the Admin!"
                 ]
  },
  
  creakyStairs : {
    letter     : ["The stairs creak and squeak with each step you take."],
    shadow     : ["A dark shadow seeps from the magic room and dread takes a hold of you."],
    MagicRoom  : "MagicRoom"
  },
  
  musicRoom    : {
    letter     : ["Dark, eerie music plays on a record on a gramophone on the far end of the room..."],
    gramophone : ["You turn off the music. The air crackles in static as the arm moves off the record."]
  },

  MagicRoom : {
    letter  : ["The room has a large wooden double door. Inside is a L-shaped table with many drawers",
               "and compartments. The table's counter is littered in strange-coloured bottles with",
               "strange liquids."
              ],
    crystal : ["A maroon, shiny crystal the size of a half a brick on the counter attracts your attention.",
               "As you walk over, a snicker distracts you. It turns into a hollering laughter, which fills",
               "the room. Near a tall mirror stands the dark wizard."
              ],
    wizard  : ["\"Ha Ha Haa Ha Haaaa!!!\" laughs the wizard as he moves towards you in a calm, slow, motion.",
               "His magnificent robe flows as he moves closer, grinning. \"You must be the world-maker,",
               "considering you're here; I must hand it to you, you're quite a nuisance, lad.\" His expression",
               "turns grave as he studies you. \"Wait! You look familiar. Your eyes... they look like... Darcia's...",
               "that means... you're my... nephew...\" he gasps, noticably surprised. \"This shall be interesting...\"",
               "he says grinnig.",
               "...",
               "\"Hush, fiend!\" you lash at the wizard. \"I stand here to claim your life on behalf of the land.\"",
               "\"Oh, my! Foolish, like your father. May he rest in peace... or rather, he rests in pieces...\" and",
               "the dark wizard bursts into laughter once more. \"This shall be interesssting indeed.\" he says, and",
               "dashes towards you. He is incredibly fast. He knocks you across the room with a blow to the jaw...",
               "...",
               "\"Mmmwwaaaaahhh haa haa ha ha ha! Foolish child, why don't you run while you can like",
               "your mother did!?! Tsk, tsk, tsk! He thinks he's a match for me!\" he laughs, turning to the",
               "mirror, talking to his reflection, which seems to have a life of its own. The reflection laughs and",
               "gestures as if calling someone hidden from sight. A second reflection comes into focus.",
               "The first reflection says something inaudible to the second reflection and points to you. The",
               "reflections and wizard all laugh. You are quite baffled yet determined to fight.",
               "You stand and fix your jaw. You prepare to conjure up a blessed sword..."
              ]
  }
  },

  phrase : ["dark wizard"],
  book                   : { 
    "History-Of-Terminus": ["...old tales tell of a dark wizard who will fragment the land...",
                            "...only the world-maker can stop the dark wizard's virus from...",
                            "...that the power of \"sudo\" may be the dark wizard's only weakness..."
                           ]
  },
  command:  "",
  error  : [": command not found.",
            ": No such file or directory",
            " is a directory",
            ": Permission denied",
            ": cannot stat ",
            ": renaming not supported",
            ": Not a directory",
            ": cannot access ",
            "Missing filename",
            ": cannot create directory"
           ],

home                : function(command){
this.cmd[ 'NOTE'  ] = " : Anything written within [ ] is optional.";
this.cmd[ 'cd'    ] = " [PLACE] : moves you to PLACE.";
this.cmd[ 'clear' ] = " : clears the screen";
this.cmd[ 'less'  ] = " THING : lets you interact with THING.";
this.cmd[ 'ls'    ] = " [PLACE] : show you all things in PLACE.";
this.cmd[ 'pwd'   ] = " : print the full path of the place you're in.";
var  tmp            = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
switch(tmp[0]){
  case "cd"   : this.cd     ("home", tmp[1], "It seems like you don't have access to this place.");
                break;
  case "ls"   : this.ls     ("home", tmp[1], "It seems like you don't have access to this place.");
                break;
  case"less"  : this.less   ("home", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                break;
  case "clear": this.clear  ();
                break;
  case "nano" : this.nano   ("home", tmp[1], "This is just ", 
                             "\"You already have this; I won't let you change its value...\" says Nano.");
                break;
  case "cp"   : this.cp     ("home", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                             "Are you sure you have '"+tmp[1]+"' here??");
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("home", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                break;
  case "help" : this.help   ();
                break;
  case "rm"   : this.rm     ("home", tmp[1], "\"You want me to remove a place; "+
                             "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                             "Make sure you have '"+tmp[1]+"' here...");
                break;
  case "man"  : this.man    ("home", tmp[1]);
                break;
  case "mv"   : this.mv     ("home", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate "+
                             "surroundings. You can't move places!\"");
                break;
  case ""     : break;
  case "pwd"  : this.pwd    ();
                break;
  case "mkdir": this.mkdir("home", tmp[1], "This place already exists!");
                break;
  default     : 
    if  ( (35 + this.textY) > this.canvas.height){ this.clear();                                                       }
    this.display(tmp[0]+this.error[0]                        , "#F00"); 
}
},

forest        : function(command){
var tmp       = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
switch(tmp[0]){
  case "cd"   : this.cd     ("forest", tmp[1], "It seems like you don't have access to this place.");
                break;
  case "ls"   : this.ls     ("forest", tmp[1], "It seems like you don't have access to this place.");
                break;
  case"less"  : this.less   ("forest", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                break;
  case "clear": this.clear  ();
                break;
  case "nano" : this.nano   ("forest", tmp[1], "This is just ", 
                             "\"You already have this; I won't let you change its value...\" says Nano.");
                break;
  case "cp"   : this.cp     ("forest", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                             "Are you sure you have '"+tmp[1]+"' here??");
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("forest", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                break;
  case "help" : this.help   ();
                break;
  case "rm"   : this.rm     ("forest", tmp[1], "\"You want me to remove a place; "+
                             "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                             "Make sure you have '"+tmp[1]+"' here...");
                break;
  case "man"  : this.man    ("forest", tmp[1]);
                break;
  case "mv"   : this.mv     ("forest", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate "+
                             "surroundings. You can't move places!\"");
                break;
  case ""     : break;
  case "pwd"  : this.pwd    ();
                break;
  case "mkdir": this.mkdir("forest", tmp[1], "This place already exists!");
                break;
  default     : 
    if  ( (35 + this.textY) > this.canvas.height ){ this.clear();                                                       }
    this.display(tmp[0]+this.error[0]                        , "#F00"); 
}
},

academy       : function(command){
var tmp       = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
switch(tmp[0]){
  case "cd"   : this.cd     ("academy", tmp[1], "It seems like you don't have access to this place.");
                break;
  case "ls"   : this.ls     ("academy", tmp[1], "It seems like you don't have access to this place.");
                break;
  case"less"  : if(!this.item["academy"]["student"] && tmp[1] === "student"){
                  if(35+this.textY > this.canvas.height){ this.clear(); }
                  this.display("The student left a while ago...", "#FF0");
                }
                else{
                  this.less   ("academy", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                }
                if          (tmp[1] === "student"){ delete this.item['academy']['student']; }
                break;
  case "clear": this.clear  ();
                break;
  case "nano" : this.nano   ("academy", tmp[1], "This is just ", 
                             "\"You already have this; I won't let you change its value...\" says Nano.");
                break;
  case "cp"   : this.cp     ("academy", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                             "Are you sure you have '"+tmp[1]+"' here??");
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("academy", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                break;
  case "help" : this.help   ();
                break;
  case "rm"   : this.rm     ("academy", tmp[1], "\"You want me to remove a place; "+
                             "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                             "Make sure you have '"+tmp[1]+"' here...");
                break;
  case "mv"   : this.mv     ("academy", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate "+
                             "surroundings. You can't move places!\"");
                break;
  case "man"  : this.man    ("academy", tmp[1]);
                break;
  case ""     : break;
  case "pwd"  : this.pwd    ();
                break;
  case "mkdir": this.mkdir("academy", tmp[1], "This place already exists!");
                break;
  default     :
    if  ( (35 + this.textY) > this.canvas.height){ this.clear();                                                       }
    this.display(tmp[0]+this.error[0]                        , "#F00"); 
}
},

lessons        : function(command){
if(!this.cmd['mv']){
  this.cmd['mv'] = " ITEM DESTINATION : lets you move ITEM to DESTINATION e.g.: mv Box/dummy7 . \(The period\u002Fdot is important\)";
}
var tmp        = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
switch(tmp[0]){
  case "cd"   : this.cd     ("lessons", tmp[1], "It seems like you don't have access to this place.");
                break;
  case "ls"   : this.ls     ("lessons", tmp[1], "It seems like you don't have access to this place.");
                break;
  case"less"  : this.less   ("lessons", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                break;
  case "clear": this.clear  ();
                break;
  case "nano" : this.nano   ("lessons", tmp[1], "This is just ", 
                             "\"You already have this; I won't let you change its value...\" says Nano.");
                break;
  case "cp"   : this.cp     ("lessons", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                             "Are you sure you have '"+tmp[1]+"' here??");
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("lessons", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                break;
  case "help" : this.help   ();
                break;
  case "rm"   : this.rm     ("lessons", tmp[1], "\"You want me to remove a place; "+
                             "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                             "Make sure you have '"+tmp[1]+"' here...");
                break;
  case "man"  : this.man    ("lessons", tmp[1]);
                break;
  case "mv"   : this.mv     ("lessons", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate "+
                             "surroundings. You can't move places!\"");
                break;
  case ""     : break;
  case "pwd"  : this.pwd    ();
                break;
  case "mkdir": this.mkdir("lessons", tmp[1], "This place already exists!");
                break;
  default     :
    if  ( (35 + this.textY) > this.canvas.height){ this.clear   ();                                                     }
    this.display (tmp[0]+this.error[0]                        , "#F00"); 
} 
},

Library        : function(command){
var tmp        = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
switch(tmp[0]){
  case "cd"    : this.cd     ("Library", tmp[1], "It seems like you don't have access to this place.");
                 break;
  case "ls"    : this.ls     ("Library", tmp[1], "It seems like you don't have access to this place.");
                 break;
  case"less"   : this.less   ("Library", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                 break;
  case "clear" : this.clear  ();
                 break;
  case "nano"  : this.nano   ("Library", tmp[1], "This is just ", 
                              "\"You already have this; I won't let you change its value...\" says Nano.");
                 break;
  case "cp"    : this.cp     ("Library", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                              "Are you sure you have '"+tmp[1]+"' here??");
                 break;
  case "exit"  : this.exit   ();
                 break;
  case "grep"  : this.grep   ("Library", tmp, 
                              "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                 break;
  case "help"  : this.help   ();
                 break;
  case "rm"    : this.rm     ("Library", tmp[1], "\"You want me to remove a place; "+
                              "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                              "Make sure you have '"+tmp[1]+"' here...");
                 break;
  case "man"   : this.man    ("Library", tmp[1]);
                 break;
  case "mv"    : this.mv     ("Library", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                              "Mv shake his head and says, \"You can only move things to your immediate "+
                              "surroundings. You can't move places!\"");
                 break;
  case ""      : break;
  case "pwd"   : this.pwd    ();
                 break;
  case "mkdir" : this.mkdir("Library", tmp[1], "This place already exists!");
                break;
  default      :
    if((35 + this.textY) > this.canvas.height){ this.clear(); }
    this.display(tmp[0]+this.error[0], "#F00");
}
},

practiceRoom  : function(command){
var tmp       = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
switch(tmp[0]){
  case "cd"   : this.cd     ("practiceRoom", tmp[1], "The box is too small for you to fit into. "+
                             "Trying \"looking\" into the box to see what\'s inside \(ls Box\)");
  if  ( this.dir.pwd !== this.dir["practiceRoom"] ){
  for ( var i = 1; i < 6; i++                     ){
  if  ( this.item['practiceRoom']['dummy'+i]      ){ delete this.item['practiceRoom']["dummy"+i];               }
  if  ( this.item['Box']['dummy'+i] == undefined  ){ this.item['Box']['dummy'+i] = ["It\'s a practice dummy."]; }
                                                                                                                }
                                                                                                                }
                break;
  case "ls"   : this.ls     ("practiceRoom", tmp[1], "It seems like you don't have access to this place.");
                break;
  case"less"  : this.less   ("practiceRoom", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                break;
  case "clear": this.clear  ();
                break;
  case "nano" : this.nano   ("practiceRoom", tmp[1], "This is just ", 
                             "\"You already have this; I won't let you change its value...\" says Nano.");
                break;
  case "cp"   : this.cp     ("practiceRoom", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                             "Are you sure you have '"+tmp[1]+"' here??");
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("practiceRoom", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                break;
  case "help" : this.help   ();
                break;
  case "rm"   : this.rm     ("practiceRoom", tmp[1], "\"You want me to remove a place; "+
                             "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                             "Make sure you have '"+tmp[1]+"' here...");
                break;
  case "man"  : this.man    ("practiceRoom", tmp[1]);
                break;
  case "mv"   : this.mv     ("practiceRoom", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate "+
                             "surroundings. You can't move places!\"");
                break;
  case ""     : break;
  case "pwd"  : this.pwd    ();
                break;
  case "mkdir": this.mkdir("practiceRoom", tmp[1], "This place already exists!");
                break;
  default     :
    if  ( (35 + this.textY) > this.canvas.height){ this.clear   ();                                                     }
    this.display(tmp[0]+this.error[0]                         , "#F00"); 
}
},

meadow        : function(command){
var tmp       = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
switch(tmp[0]){
  case "cd"   : this.cd     ("meadow", tmp[1], "It seems like you don't have access to this place.");
                break;
  case "ls"   : this.ls     ("meadow", tmp[1], "It seems like you don't have access to this place.");
                break;
  case"less"  : this.less   ("meadow", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
  if( (!this.avail["mountains"]) && (tmp[1]==="Pony") ){
  this.avail      ["mountains"]  = true;
  this.item.meadow["mountains"]  = 'mountains';
  this.notifyOne  ("New Location Unlocked:","Mountains Now Available: look around!");
  }
                break;
  case "clear": this.clear();
                break;
  case "nano" : this.nano   ("meadow", tmp[1], "This is just ", 
                             "\"You already have this; I won't let you change its value...\" says Nano.");
                break;
  case "cp"   : this.cp     ("meadow", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                             "Are you sure you have '"+tmp[1]+"' here??");
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("meadow", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                break;
  case "help" : this.help   ();
                break;
  case "rm"   : this.rm     ("meadow", tmp[1], 
                             "\"You want me to remove a place; use 'rmdir' but it won't work: "+
                             "You don't have that power.\" says Rm shaking his head.", 
                             "Make sure you have '"+tmp[1]+"' here...");
                break;
  case "mv"   : this.mv     ("meadow", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate "+
                             "surroundings. You can't move places!\"");
                break;
  case "man"  : this.man    ("meadow", tmp[1]);
                break;
  case ""     : break;
  case "pwd"  : this.pwd    ();
                break;
  case "mkdir": this.mkdir("meadow", tmp[1], "This place already exists!");
                break;
  default     :
    if  ( (35 + this.textY) > this.canvas.height){ this.clear   ();                                                     }
    this.display (tmp[0]+this.error[0]                        , "#F00"); 
}
},

mountains         : function(command){
if(!this.cmd['man']){
  this.cmd['man'] = " SPELL : opens a manual with info about SPELL, which a player can use.";
}
var tmp           = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
switch(tmp[0]){
  case "cd"   : this.cd     ("mountains", tmp[1], "It seems like you don't have access to this place.");
                break;
  case "ls"   : this.ls     ("mountains", tmp[1], "It seems like you don't have access to this place.");
                break;
  case"less"  : this.less   ("mountains", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                break;
  case "clear": this.clear  ();
                break;
  case "nano" : this.nano   ("mountains", tmp[1], "This is just ", 
                             "\"You already have this; I won't let you change its value...\" says Nano.");
                break;
  case "cp"   : this.cp     ("mountains", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                             "Are you sure you have '"+tmp[1]+"' here??");
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("mountains", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                break;
  case "help" : this.help   ();
                break;
  case "rm"   : this.rm     ("mountains", tmp[1], "\"You want me to remove a place; "+
                             "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                             "Make sure you have '"+tmp[1]+"' here...");
                break;
  case "man"  : this.man    ("mountains", tmp[1]);
                break;
  case "mv"   : this.mv     ("mountains", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate "+
                             "surroundings. You can't move places!\"");
                break;
  case ""     : break;
  case "pwd"  : this.pwd    ();
                break;
  case "mkdir": this.mkdir("mountains", tmp[1], "This place already exists!");
                break;
  default     :
    if  ( (35 + this.textY) > this.canvas.height){ this.clear   ();                                                     }
    this.display (tmp[0]+this.error[0]                        , "#F00"); 
}
},

cave          : function(command){
var tmp       = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
switch(tmp[0]){
  case "cd"   : this.cd     ("cave", tmp[1], "It seems like you don't have access to this place.");
                break;
  case "ls"   : this.ls     ("cave", tmp[1], "It seems like you don't have access to this place.");
                break;
  case"less"  : this.less   ("cave", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                break;
  case "clear": this.clear  ();
                break;
  case "nano" : this.nano   ("cave", tmp[1], "This is just ", 
                             "\"You already have this; I won't let you change its value...\" says Nano.");
                break;
  case "cp"   : this.cp     ("cave", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                             "Are you sure you have '"+tmp[1]+"' here??");
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("cave", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                break;
  case "help" : this.help   ();
                break;
  case "rm"   : this.rm     ("cave", tmp[1], "\"You want me to remove a place; "+
                             "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                             "Make sure you have '"+tmp[1]+"' here...");
                break;
  case "man"  : this.man    ("cave", tmp[1]);
                break;
  case "mv"   : this.mv     ("cave", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate "+
                             "surroundings. You can't move places!\"");
                break;
  case ""     : break;
  case "pwd"  : this.pwd    ();
                break;
  case "mkdir": this.mkdir("cave", tmp[1], "This place already exists!");
                break;
  default     :
    if  ( (35 + this.textY) > this.canvas.height){ this.clear   ();                                                     }
    this.display (tmp[0]+this.error[0]                        , "#F00"); 
}
},

Staircase     : function(command){
var tmp       = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
switch(tmp[0]){
  case "cd"   : this.cd     ("Staircase", tmp[1], "It seems like you don't have access to this place.");
                break;
  case "ls"   : this.ls     ("Staircase", tmp[1], "It seems like you don't have access to this place.");
                break;
  case"less"  : this.less   ("Staircase", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                break;
  case "clear": this.clear  ();
                break;
  case "nano" : this.nano   ("Staircase", tmp[1], "This is just ", 
                             "\"You already have this; I won't let you change its value...\" says Nano.");
                break;
  case "cp"   : this.cp     ("Staircase", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                             "Are you sure you have '"+tmp[1]+"' here??");
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("Staircase", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                break;
  case "help" : this.help   ();
                break;
  case "rm"   : this.rm     ("Staircase", tmp[1], "\"You want me to remove a place; "+
                             "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                             "Make sure you have '"+tmp[1]+"' here...");
                break;
  case "man"  : this.man    ("Staircase", tmp[1]);
                break;
  case "mv"   : this.mv     ("Staircase", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate "+
                             "surroundings. You can't move places!\"");
                break;
  case ""     : break;
  case "pwd"  : this.pwd    ();
                break;
  case "mkdir": this.mkdir("Staircase", tmp[1], "This place already exists!");
                break;
  default     :
    if  ( (35 + this.textY) > this.canvas.height){ this.clear   ();                                                     }
    this.display (tmp[0]+this.error[0]                        , "#F00"); 
}
},

DarkCorridor  : function(command){
var tmp       = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
switch(tmp[0]){
  case "cd"   : this.cd     ("DarkCorridor", tmp[1], "It seems like you don't have access to this place.");
                break;
  case "ls"   : this.ls     ("DarkCorridor", tmp[1], "It seems like you don't have access to this place.");
                break;
  case"less"  : this.less   ("DarkCorridor", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                break;
  case "clear": this.clear  ();
                break;
  case "nano" : this.nano   ("DarkCorridor", tmp[1], "This is just ", 
                             "\"You already have this; I won't let you change its value...\" says Nano.");
                break;
  case "cp"   : this.cp     ("DarkCorridor", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                             "Are you sure you have '"+tmp[1]+"' here??");
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("DarkCorridor", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                break;
  case "help" : this.help   ();
                break;
  case "rm"   : this.rm     ("DarkCorridor", tmp[1], "\"You want me to remove a place; "+
                             "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                             "Make sure you have '"+tmp[1]+"' here...");
                break;
  case "man"  : this.man    ("DarkCorridor", tmp[1]);
                break;
  case "mv"   : this.mv     ("DarkCorridor", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate "+
                             "surroundings. You can't move places!\"");
                break;
  case ""     : break;
  case "pwd"  : this.pwd    ();
                break;
  case "mkdir": this.mkdir("DarkCorridor", tmp[1], "This place already exists!");
                break;
  default     :
    if  ( (35 + this.textY) > this.canvas.height){ this.clear   ();                                                     }
    this.display (tmp[0]+this.error[0]                        , "#F00"); 
}
},

DankRoom      : function(command){
var tmp       = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
switch(tmp[0]){
  case "cd"   : this.cd     ("DankRoom", tmp[1], "It seems like you don't have access to this place.");
                break;
  case "ls"   : this.ls     ("DankRoom", tmp[1], "It seems like you don't have access to this place.");
                break;
  case"less"  : this.less   ("DankRoom", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                break;
  case "clear": this.clear  ();
                break;
  case "nano" : this.nano   ("DankRoom", tmp[1], "This is just ", 
                             "\"You already have this; I won't let you change its value...\" says Nano.");
                break;
  case "cp"   : this.cp     ("DankRoom", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                             "Are you sure you have '"+tmp[1]+"' here??");
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("DankRoom", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                break;
  case "help" : this.help   ();
                break;
  case "rm"   : this.rm     ("DankRoom", tmp[1], "\"You want me to remove a place; "+
                             "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                             "Make sure you have '"+tmp[1]+"' here...");
                break;
  case "man"  : this.man    ("DankRoom", tmp[1]);
                break;
  case "mv"   : this.mv     ("DankRoom", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate "+
                             "surroundings. You can't move places!\"");
  if( this.item              ['SmallHole']['Boulder'] && 
      this.item              ['SmallHole']['Boulder'].length ===2){
      this.avail             ['Tunnel']               = true;
      this.item              ['DankRoom']['Tunnel']   = "Tunnel";
      this.item              ['SmallHole']['Boulder'] = ["You moved the boulder aside, revealing the entrance to a tunnel."];
      this.notifyOne         ("New Location Unlocked:", "Tunnel Now Available: look around!");
  }
                break;
  case ""     : break;
  case "pwd"  : this.pwd();
                break;
  case "mkdir": this.mkdir("DankRoom", tmp[1], "This place already exists!");
                break;
  default     :
    if  ( (35 + this.textY) > this.canvas.height){ this.clear   ();                                                     }
    this.display (tmp[0]+this.error[0]                        , "#F00"); 
}
},

Tunnel        : function(command){
var tmp       = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
switch(tmp[0]){
  case "cd"   : this.cd     ("Tunnel", tmp[1], "It seems like you don't have access to this place.");
                break;
  case "ls"   : this.ls     ("Tunnel", tmp[1], "It seems like you don't have access to this place.");
                break;
  case"less"  : this.less   ("Tunnel", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                break;
  case "clear": this.clear  ();
                break;
  case "nano" : this.nano   ("Tunnel", tmp[1], "This is just ", 
                             "\"You already have this; I won't let you change its value...\" says Nano.");
                break;
  case "cp"   : this.cp     ("Tunnel", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                             "Are you sure you have '"+tmp[1]+"' here??");
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("Tunnel", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                break;
  case "help" : this.help   ();
                break;
  case "rm"   : this.rm     ("Tunnel", tmp[1], "\"You want me to remove a place; "+
                             "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                             "Make sure you have '"+tmp[1]+"' here...");
                break;
  case "man"  : this.man    ("Tunnel", tmp[1]);
                break;
  case "mv"   : this.mv     ("Tunnel", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate "+
                             "surroundings. You can't move places!\"");
                break;
  case ""     : break;
  case "pwd"  : this.pwd();
                break;
  case "mkdir": this.mkdir("Tunnel", tmp[1], "This place already exists!");
                break;
  default     :
    if((35 + this.textY) > this.canvas.height){ this.clear   ();                                                     }
    this.display (tmp[0]+this.error[0], "#F00");
}
},

SmallHole     : function(command){
var tmp       = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
switch(tmp[0]){
  case "cd"   : this.cd     ("SmallHole", tmp[1], "It seems like you don't have access to this place.");
                break;
  case "ls"   : this.ls     ("SmallHole", tmp[1], "It seems like you don't have access to this place.");
                break;
  case"less"  : this.less   ("SmallHole", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                break;
  case "clear": this.clear  ();
                break;
  case "nano" : this.nano   ("SmallHole", tmp[1], "This is just ", 
                             "\"You already have this; I won't let you change its value...\" says Nano.");
                break;
  case "cp"   : this.cp     ("SmallHole", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                             "Are you sure you have '"+tmp[1]+"' here??");
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("SmallHole", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                break;
  case "help" : this.help   ();
                break;
  case "rm"   : this.rm     ("SmallHole", tmp[1], "\"You want me to remove a place; "+
                             "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                             "Make sure you have '"+tmp[1]+"' here...");
                break;
  case "man"  : this.man    ("SmallHole", tmp[1]);
                break;
  case "mv"   : this.mv     ("SmallHole", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate "+
                             "surroundings. You can't move places!\"");
  if( this.item             ['SmallHole']['Boulder'] && 
      this.item             ['SmallHole']['Boulder'].length===2){
      this.avail            ['Tunnel']               = true;
      this.item             ['DankRoom']['Tunnel']   = "Tunnel";
      this.item             ['SmallHole']['Boulder'] = ["You moved the boulder aside, revealing the entrance to a tunnel."];
      this.notifyOne        ("New Location Unlocked:", "Tunnel Now Available: look around!");
  }
                break;
  case ""     : break;
  case "pwd"  : this.pwd();
                break;
  case "mkdir": this.mkdir("SmallHole", tmp[1], "This place already exists!");
                break;
  default     :
    if  ( (35 + this.textY) > this.canvas.height){ this.clear   ();                                                     }
    this.display (tmp[0]+this.error[0]                        , "#F00"); 
}
},

StoneChamber  : function(command){
var tmp       = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
switch(tmp[0]){
  case "cd"   : this.cd     ("StoneChamber", tmp[1], "It seems like you don't have access to this place.");
                break;
  case "ls"   : this.ls     ("StoneChamber", tmp[1], "It seems like you don't have access to this place.");
                break;
  case"less"  : this.less   ("StoneChamber", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                break;
  case "clear": this.clear  ();
                break;
  case "nano" : this.nano   ("StoneChamber", tmp[1], "This is just ", 
                             "\"You already have this; I won't let you change its value...\" says Nano.");
                break;
  case "cp"   : this.cp     ("StoneChamber", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                             "Are you sure you have '"+tmp[1]+"' here??");
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("StoneChamber", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                break;
  case "help" : this.help   ();
                break;
  case "rm"   : this.rm     ("StoneChamber", tmp[1], "\"You want me to remove a place; "+
                             "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                             "Make sure you have '"+tmp[1]+"' here...");
                break;
  case "man"  : this.man    ("StoneChamber", tmp[1]);
                break;
  case "mv"   : this.mv     ("StoneChamber", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate surroundings. "+
                             "You can't move places!\"");
                break;
  case ""     : break;
  case "pwd"  : this.pwd();
                break;
  case "mkdir": this.mkdir("StoneChamber", tmp[1], "This place already exists!");
                break;
  default     :
    if  ( (35 + this.textY) > this.canvas.height){ this.clear   ();                                                     }
    this.display (tmp[0]+this.error[0]                        , "#F00"); 
}
},

TownSquare : function(command){
var tmp = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
switch(tmp[0]){
  case "cd"   : this.cd     ("TownSquare", tmp[1], "It seems like you don't have access to this place.");
                break;
  case "ls"   : this.ls     ("TownSquare", tmp[1], "It seems like you don't have access to this place.");
                break;
  case"less"  : this.less   ("TownSquare", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                break;
  case "clear": this.clear  ();
                break;
  case "nano" : this.nano   ("TownSquare", tmp[1], "This is just ", 
                             "\"You already have this; I won't let you change its value...\" says Nano.");
                break;
  case "cp"   : this.cp     ("TownSquare", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                             "Are you sure you have '"+tmp[1]+"' here??");
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("TownSquare", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                break;
  case "help" : this.help   ();
                break;
  case "rm"   : this.rm     ("TownSquare", tmp[1], "\"You want me to remove a place; "+
                             "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                             "Make sure you have '"+tmp[1]+"' here...");
                break;
  case "man"  : this.man    ("TownSquare", tmp[1]);
                break;
  case "mv"   : this.mv     ("TownSquare", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate "+
                             "surroundings. You can't move places!\"");
                break;
  case ""     : break;
  case "pwd"  : this.pwd();
                break;
  case "mkdir": this.mkdir("TownSquare", tmp[1], "This place already exists!");
                break;
  default     :
    if  ( (35 + this.textY) > this.canvas.height){ this.clear   ();                                                     }
    this.display (tmp[0]+this.error[0]                        , "#F00"); 
}
},

TSLibrary : function(command){
var tmp = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
switch(tmp[0]){
  case "man"  : 
                break;
  case "cd"   : this.cd     ("TSLibrary", tmp[1], "It seems like you don't have access to this place.");
                break;
  case "ls"   : this.ls     ("TSLibrary", tmp[1], "It seems like you don't have access to this place.");
                break;
  case"less"  : if(tmp[1] === "inconspicuousLever"){
                this.item     ["TSLibrary"]["BackRoom"] = "BackRoom";
                this.notifyOne("New Location Unlocked:", "The BackRoom is now available.");
                }
                this.less   ("TSLibrary", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                break;
  case "clear": this.clear  ();
                break;
  case "nano" : this.nano   ("TSLibrary", tmp[1], "This is just ", 
                             "\"You already have this; I won't let you change its value...\" says Nano.");
                break;
  case "cp"   : this.cp     ("TSLibrary", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                             "Are you sure you have '"+tmp[1]+"' here??");
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("TSLibrary", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                tmp[0] = "";
  if  (tmp.length > 2                                     ){ 
  for (var i=1; i<tmp.length-1; i++                       ){ tmp[0]+= tmp[i]+" "; } 
                                                                                  }
  if ((tmp[0].trim() === "\"dark wizard\"")        && 
     (this.item   ["TSLibrary"]["BackRoom"])       && 
     (this.item   ["BackRoom"]["Librarian"].length !== 2)){
      this.cash                                    += 5;
      this.display("\n");
      this.display("Thank you, you've been most helpful! Here, take this", "#FF0");
      this.display("for your troubles. It’s the least I can do.” The librarian hands you 5 gold pieces.", "#FF0");
      this.item   ["BackRoom"]["Librarian"] = ["You've been of great help to me...",
                                               "sadly, I have no more work to give you."
                                              ];
      this.notifyOne("Gold Earned:", "You have "+this.cash+" Gold pieces.");
  }
                break;
  case "help" : this.help   ();
                break;
  case "rm"   : this.rm     ("TSLibrary", tmp[1], "\"You want me to remove a place; "+
                             "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                             "Make sure you have '"+tmp[1]+"' here...");
                break;
  case "man"  : this.man    ("TSLibrary", tmp[1]);
                break;
  case "mv"   : this.mv     ("TSLibrary", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate "+
                             "surroundings. You can't move places!\"");
                break;
  case ""     : break;
  case "pwd"  : this.pwd    ();
                break;
  case "mkdir": this.mkdir("TSLibrary", tmp[1], "This place already exists!");
                break;
  default     :
    if  ( (35 + this.textY) > this.canvas.height){ this.clear   ();                                                     }
    this.display (tmp[0]+this.error[0]                        , "#F00"); 
}
},

BackRoom : function(command){
var tmp = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
if(!this.cmd['grep']){
  this.cmd['grep'] = " \"THE_PHRASE\" BOOK: finds all matches of \"THE_PHRASE\" in BOOK and shows them to you."
}
switch(tmp[0]){
  case "cd"   : this.cd     ("BackRoom", tmp[1], "It seems like you don't have access to this place.");
                break;
  case "ls"   : this.ls     ("BackRoom", tmp[1], "It seems like you don't have access to this place.");
                break;
  case"less"  : this.less   ("BackRoom", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                break;
  case "clear": this.clear  ();
                break;
  case "nano" : this.nano   ("BackRoom", tmp[1], "This is just ", 
                             "\"You already have this; I won't let you change its value...\" says Nano.");
                break;
  case "cp"   : this.cp     ("BackRoom", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                             "Are you sure you have '"+tmp[1]+"' here??");
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("BackRoom", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                break;
  case "help" : this.help   ();
                break;
  case "rm"   : this.rm     ("BackRoom", tmp[1], "\"You want me to remove a place; "+
                             "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                             "Make sure you have '"+tmp[1]+"' here...");
                break;
  case "man"  : this.man    ("BackRoom", tmp[1]);
                break;
  case "mv"   : this.mv     ("BackRoom", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate "+
                             "surroundings. You can't move places!\"");
                break;
  case ""     : break;
  case "pwd"  : this.pwd    ();
                break;
  case "mkdir": this.mkdir("BackRoom", tmp[1], "This place already exists!");
                break;
  default     :
    if  ( (35 + this.textY) > this.canvas.height){ this.clear   ();                                                     }
    this.display (tmp[0]+this.error[0]                        , "#F00"); 
}
},

Marketplace : function(command){
var tmp = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
switch(tmp[0]){
  case "cd"   : this.cd     ("Marketplace", tmp[1], "It seems like you can't go in there...");
                break;
  case "ls"   : this.ls     ("Marketplace", tmp[1], "It seems like you don't have access to this place.");
                break;
  case"less"  : this.less   ("Marketplace", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                if(this.item.Marketplace[ tmp[1] ] && tmp[1] !== "vendor" && !this.dir[ tmp[1] ] && this.itemOnSale[ tmp[1] ]){
                  this.prompting          = true;
                  this.itemOnSale["name"] = tmp[1];
                }
                break;
  case "clear": this.clear  ();
                break;
  case "nano" : if((35 + this.textY) > this.canvas.height){ this.clear(); }
                this.display("\"The use of this spell is not allowed here, be gone!\" the vendor hisses.", "#FF0");
                break;
  case "cp"   : if((35 + this.textY) > this.canvas.height){ this.clear(); }
                this.display("\"The use of this spell is not allowed here, be gone!\" the vendor hisses.", "#FF0");
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("Marketplace", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                break;
  case "help" : this.help();
                break;
  case "rm"   : if(tmp[1] === "vendor"){
                  if((35 + this.textY) > this.canvas.height){ this.clear(); }
                  this.display("\"Ha! That spell doesn't work on everything, you know."+ 
                               "I may have forgotten to mention that before I sold it to you...\"", "#FF0");
                  break;
                }
                this.rm     ("Marketplace", tmp[1], "\"You want me to remove a place; use 'rmdir' but it won't work: "+
                             "You don't have that power.\" says Rm shaking his head.", 
                             "Make sure you have '"+tmp[1]+"' here...");
                break;
  case "man"  : this.man    ("Marketplace", tmp[1]);
                break;
  case "mv"   : this.mv     ("Marketplace", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate "+
                             "surroundings. You can't move places!\"");
                break;
  case ""     : break;
  case "pwd"  : this.pwd    ();
                break;
  case "mkdir": this.mkdir("Marketplace", tmp[1], "This place already exists!");
                break;
  default     :
   if(this.prompting){
     this.prompting = false;
     try{
     if((tmp[0]).toLowerCase().charAt(0) === "y"   && 
     this.cash >= this.price[ this.itemOnSale["name"] ]){
     this.cash -= this.price[ this.itemOnSale["name"] ];
     if((this.itemOnSale    [ this.itemOnSale["name"] ]["y"].length+1)*17.5 + this.textY > this.canvas.height){
       this.clear();
     }
		 var end = this.itemOnSale[ this.itemOnSale["name"] ]["y"].length;
     for(var i = 0; i < end; i++){
       this.display(this.itemOnSale[ this.itemOnSale["name"] ]["y"][i], "#FF0");
     }
     if(this.itemOnSale["name"] === "backpack"){
       this.item.Marketplace["backpack"] = "backpack";
       this.dir             ["backpack"] = this.dir.pwd+"\u002Fbackpack";
       this.avail           ["backpack"] = false;
     }
     else if(this.itemOnSale["name"] === "mkdirSpell"){
       this.cmd["mkdir"] = " PLACE: allows you to magically make a new location called PLACE."
     }
     else if(this.itemOnSale["name"] === "rmSpell"){
       this.cmd["rm"] = " ITEM : lets you remove ITEM from this plane of existence.";
     }
     break;
     }
     else if((tmp[0]).toLowerCase().charAt(0) === "y" && 
     this.cash < this.price[ this.itemOnSale["name"] ]){
     if((this.itemOnSale[ this.itemOnSale["name"] ]["m"].length+1)*17.5 + this.textY > this.canvas.height){
       this.clear();
     }
		 var end = this.itemOnSale[ this.itemOnSale["name"] ]["m"].length;
     for(var i = 0; i < end; i++){
       this.display    (this.itemOnSale[ this.itemOnSale["name"] ]["m"][i], "#FF0");
     }
     break;
     }
     else{
     if((this.itemOnSale[ this.itemOnSale["name"] ]["n"].length+1)*17.5 + this.textY > this.canvas.height){
       this.clear();
     }
		 var end = this.itemOnSale[ this.itemOnSale["name"] ]["n"].length;
     for(var i = 0; i < end; i++){
       this.display    (this.itemOnSale[ this.itemOnSale["name"] ]["n"][i], "#FF0");
     }
     break;
     }
     }catch(error){}
     }
     if((35 + this.textY) > this.canvas.height){ this.clear(); }
     this.display(tmp[0]+this.error[0], "#F00");
  }
},

  ArtisansShop : function(command){
  var tmp = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
  if(!this.cmd['cp']){
    this.cmd[ 'cp' ] = " FILE1 FILE2 : lets you copy FILE1 to FILE2, and replaces FILE2 if it exists.";
  }
  if(!this.cmd['nano']){
    this.cmd['nano'] = " ITEM : lets you create ITEM.";
  }
    switch(tmp[0]){
      case "cd"   : this.cd     ("ArtisansShop", tmp[1], "It seems like you don't have access to this place.");
                    if(this.dir.pwd !== this.dir["ArtisansShop"]){
                      if(this.count < 5){
                        delete this.item["ArtisansShop"]["gear"];
                        for(var i=1; i < 6; i++){
                          if(this.item["ArtisansShop"]["gear"+i]){ 
                            delete this.item["ArtisansShop"]["gear"+i]; 
                          }
                        }
                      }
                    }
                    break;
      case "ls"   : this.ls     ("ArtisansShop", tmp[1], "It seems like you don't have access to this place.");
                    break;
      case"less"  : this.less   ("ArtisansShop", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                    break;
      case "clear": this.clear  ();
                    break;
      case "nano" : this.nano   ("ArtisansShop", tmp[1], "This is just ", 
                                 "\"You already have this; I won't let you change its value...\" says Nano.");
                    if(this.count === 0 && tmp[1].toLowerCase() === "gear"){
                      this.count += 1;
                      if(8*17.5 + this.textY > this.canvas.height){ this.clear(); }
                      this.display("\"Well that's lovely, thank you, but you can't expect me to make", "#FF0");
                      this.display("anything with just one gear! Can't you copy it?", "#FF0");
                      this.display("...", "#FF0");
                      this.display("*sigh* I can see you are going to need a lot of training. Just say 'cp [item] [newitem]'.", "#FF0");
                      this.display("[item]'s the name of the item that you want copy, and [newitem]'s the new name of the", "#FF0");
                      this.display("copy, got it? Then poof! You'll have shiny new item. I need five more gears so you'd better", "#FF0");
                      this.display("get started! Just call them gear1, gear2, gear3, gear4, and gear5, please.\"", "#FF0");
                    }
                    break;
      case "cp"   : var gear = /^(gear)([1-5])$/;
                    if(this.count < 5 && gear.test(tmp[2]) && !this.item["ArtisansShop"][ tmp[2] ]){
                      this.count += 1;
                    }
                    else if(this.count > 4){
                      if((3*17.5 + this.textY) > this.canvas.height){ this.clear(); }
                      this.display("\"Ha, finished already? I guess you learn fast. Well, thanks for your", "#FF0");
                      this.display("assistance. Take this.\" The Artisan hands you 10 gold pieces.", "#FF0");
                      this.cash += 10;
                      this.notifyOne("Gold Earned:", "You have "+this.cash+" Gold pieces.");
                    }
                    this.cp     ("ArtisansShop", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                                 "Are you sure you have '"+tmp[1]+"' here??");
                    break;
      case "exit" : this.exit   ();
                    break;
      case "grep" : this.grep   ("ArtisansShop", tmp, 
                                 "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                    break;
      case "help" : this.help   ();
                    break;
      case "rm"   : if((35 + this.textY) > this.canvas.height){ this.clear(); } 
                    this.display("Didn't your mother ever teach you that it's rude to erase other people's things from their plane of existence?", "#FF0");
                    break;
      case "man"  : this.man    ("ArtisansShop", tmp[1]);
                    break;
      case "mv"   : if((35 + this.textY) > this.canvas.height){ this.clear(); }
                    this.display("You can't take that, it's not yours!", "#FF0");
                    break;
      case ""     : break;
      case "pwd"  : this.pwd();
                    break;
      case "mkdir": this.mkdir("ArtisansShop", tmp[1], "This place already exists!");
                    break;
      default     :
                    if((35 + this.textY) > this.canvas.height){ this.clear(); }
                    this.display(tmp[0]+this.error[0], "#F00");
    }
  },

  RockyPath : function(command){
  var tmp = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
    switch(tmp[0]){
      case "cd"   : this.cd     ("RockyPath", tmp[1], "It seems like you don't have access to this place.");
                    break;
      case "ls"   : this.ls     ("RockyPath", tmp[1], "It seems like you don't have access to this place.");
                    break;
      case"less"  : this.less   ("RockyPath", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                    break;
      case "clear": this.clear  ();
                    break;
      case "nano" : this.nano   ("RockyPath", tmp[1], "This is just ", 
                                 "\"You already have this; I won't let you change its value...\" says Nano.");
                    break;
      case "cp"   : this.cp     ("RockyPath", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                                 "Are you sure you have '"+tmp[1]+"' here??");
                    break;
      case "exit" : this.exit   ();
                    break;
      case "grep" : this.grep   ("RockyPath", tmp, 
                                 "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                    break;
      case "help" : this.help   ();
                    break;
      case "rm"   : this.rm     ("RockyPath", tmp[1], "\"You want me to remove a place; "+
                                 "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                                 "Make sure you have '"+tmp[1]+"' here...");
                    if(!this.item["RockyPath"]["largeBoulder"]){
                      if(35+this.textY > this.canvas.height){ this.clear(); }
                      this.display("The boulder disappears with a pop. The way is clear now.", "#FF0");
                      this.item["RockyPath"]["Farm"] = "Farm";
                      this.item["RockyPath"]["BrokenBridge"] = "BrokenBridge";
                      this.notifyOne("New Locations Unlocked", "The paths to the Farm & BrokenBridge have been cleared.");
                    }
                    break;
  case "man"  : this.man    ("RockyPath", tmp[1]);
                break;
      case "mv"   : this.mv     ("RockyPath", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                                 "Mv shake his head and says, \"You can only move things to your immediate surroundings. You can't move places!\"");
                    break;
      case ""     : break;
      case "pwd"  : this.pwd    ();
                    break;
  case "mkdir": this.mkdir("RockyPath", tmp[1], "This place already exists!");
                break;
      default     :
                    if((35 + this.textY) > this.canvas.height){ this.clear(); }
                    this.display(tmp[0]+this.error[0], "#F00");
    }
  },

  Farm : function(command){
  var tmp = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
    switch(tmp[0]){
      case "cd"   : this.cd     ("Farm", tmp[1], "It seems like you don't have access to this place.");
                    if(this.dir.pwd !== this.dir["Farm"]){
                      if(this.count < 9){
                        for(var i=1; i<10; i++){ if(this.item.Farm["earOfCorn"+i]){ delete this.item.Farm["earOfCorn"+i]; } }
                      }
                    }
                    break;
      case "ls"   : this.ls     ("Farm", tmp[1], "It seems like you don't have access to this place.");
                    break;
      case"less"  : this.less   ("Farm", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                    break;
      case "clear": this.clear  ();
                    break;
      case "nano" : this.nano   ("Farm", tmp[1], "This is just ", 
                                 "\"You already have this; I won't let you change its value...\" says Nano.");
                    break;
      case "cp"   : var corn = /^(earOfCorn)([1-9])$/;
                    if(corn.test(tmp[2]) && this.count < 9 && !this.item["Farm"][ tmp[2] ]){
                      this.count++;
                    }
                    else if(this.count>8){
                      if(3*17.5 + this.textY > this.canvas.height){ this.clear(); }
                      this.display("\"It's a miracle! Thank you, friend. Take these 30 gold pieces as", "#FF0");
                      this.display("a token of my gratitude, and may the Admin bless you.\" exclaims the farmer.", "#FF0");
                      this.item.Farm["Farmer"] = ["I can now feed my children! Bless you, stranger..."];
                      this.cash += 30;
                      this.notifyOne("Gold Earned:", "You have "+this.cash+" Gold pieces.");
                    }
                    this.cp     ("Farm", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                                 "Are you sure you have '"+tmp[1]+"' here??");
                    break;
      case "exit" : this.exit   ();
                    break;
      case "grep" : this.grep   ("Farm", tmp, 
                                 "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                    break;
      case "help" : this.help   ();
                    break;
      case "rm"   : var corn = /^(earOfCorn)([1-9])?$/;
                    if(corn.test(tmp[1])){
                      if(35+this.textY > this.canvas.height){ this.clear(); }
                      this.display("Why would you destroy a starving man's only food?", "#FF0");
                      break;
                    }
                    this.rm     ("Farm", tmp[1], "\"You want me to remove a place; "+
                                 "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                                 "Make sure you have '"+tmp[1]+"' here...");

                    break;
  case "man"  : this.man    ("Farm", tmp[1]);
                break;
      case "mv"   : this.mv     ("Farm", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                                 "Mv shake his head and says, \"You can only move things to your immediate surroundings. You can't move places!\"");
                    break;
      case ""     : break;
      case "pwd"  : this.pwd    ();
                    break;
  case "mkdir"    : this.mkdir("Farm", tmp[1], "This place already exists!");
                    break;
      default     :
                    if((35 + this.textY) > this.canvas.height){ this.clear(); }
                    this.display(tmp[0]+this.error[0], "#F00");
    }
  },

BrokenBridge : function(command){
var tmp = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
if(!this.cmd['grep']){
  this.cmd['grep'] = " \"THE_PHRASE\" BOOK: finds all matches of \"THE_PHRASE\" in BOOK and shows them to you."
}
switch(tmp[0]){
  case "cd"   : this.cd     ("BrokenBridge", tmp[1], "You can't cross the bridge until you've replaced the missing Plank.");
                break;
  case "ls"   : this.ls     ("BrokenBridge", tmp[1], "It seems like you don't have access to this place.");
                break;
  case"less"  : this.less   ("BrokenBridge", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                break;
  case "clear": this.clear  ();
                break;
  case "nano" : this.nano   ("BrokenBridge", tmp[1], "This is just "+tmp[1]+"'", 
                             "\"You already have this; I won't let you change its value...\" says Nano.");
                            if(tmp[1].toLowerCase() === "plank"){
                              this.avail["Clearing"] = true;
                              delete this.item["BrokenBridge"][ tmp[1] ];
                              this.display("A creaky rope bridge stretches across the chasm.", "#FF0");
                              this.notifyOne("Location Unlocked:","Clearing is now accessible!\nGo on and explore...");
                            }
                break;
  case "cp"   : this.cp     ("BrokenBridge", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                             "Are you sure you have '"+tmp[1]+"' here??");
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("BrokenBridge", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                break;
  case "help" : this.help   ();
                break;
  case "rm"   : this.rm     ("BrokenBridge", tmp[1], "\"You want me to remove a place; "+
                             "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                             "Make sure you have '"+tmp[1]+"' here...");
                break;
  case "man"  : this.man    ("BrokenBridge", tmp[1]);
                break;
  case "mv"   : this.mv     ("BrokenBridge", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate "+
                             "surroundings. You can't move places!\"");
                break;
  case ""     : break;
  case "pwd"  : this.pwd    ();
                break;
  case "mkdir": this.mkdir("BrokenBridge", tmp[1], "This place already exists!");
                break;
  default     :
    if  ( (35 + this.textY) > this.canvas.height){ this.clear   ();                                                     }
    this.display (tmp[0]+this.error[0]                        , "#F00"); 
}   
},

Clearing : function(command){
var tmp = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
if(!this.cmd['grep']){
  this.cmd['grep'] = " \"THE_PHRASE\" BOOK: finds all matches of \"THE_PHRASE\" in BOOK and shows them to you."
}
switch(tmp[0]){
  case "cd"   : this.cd     ("Clearing", tmp[1], "It seems like you don't have access to this place.");
                break;
  case "ls"   : this.ls     ("Clearing", tmp[1], "It seems like you don't have access to this place.");
                break;
  case"less"  : this.less   ("Clearing", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                break;
  case "clear": this.clear  ();
                break;
  case "nano" : this.nano   ("Clearing", tmp[1], "This is just "+tmp[1]+"'", 
                             "\"You already have this; I won't let you change its value...\" says Nano.");
                break;
  case "cp"   : this.cp     ("Clearing", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                             "Are you sure you have '"+tmp[1]+"' here??");
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("Clearing", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                break;
  case "help" : this.help   ();
                break;
  case "rm"   : this.rm     ("Clearing", tmp[1], "\"You want me to remove a place; "+
                             "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                             "Make sure you have '"+tmp[1]+"' here...");
                break;
  case "man"  : this.man    ("Clearing", tmp[1]);
                break;
  case "mv"   : this.mv     ("Clearing", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate "+
                             "surroundings. You can't move places!\"");
                break;
  case ""     : break;
  case "pwd"  : this.pwd    ();
                break;
  case "mkdir": this.mkdir("Clearing", tmp[1], "This place already exists!");
                var house = /(house)/;
                if(house.test(tmp[1].toLowerCase()) && !this.cmd["sudo"]){
                  if(5*17.5+this.textY > this.canvas.height){ this.clear(); }
                  this.display("\"Maybe you aren't so bad after all. If you really want to help,", "#FF0");
                  this.display("though, you'll go save my daughter! They took her that way, down that ominous-looking", "#FF0");
                  this.display("path. I heard one of them mutter the word 'brambles_ b_gone' as they were leaving. It", "#FF0");
                  this.display("doesn't mean anything to me, but maybe it will help you on your journey.\"", "#FF0");
                  delete this.item["Clearing"]["cryingMan"];
                  this.notifyOne("Rank Update:", "You have been made a sudoer:\nThe PASSWORD is: brambles_b_gone\nBe careful!");
                  this.item["Clearing"]["OminousPath"] = "OminousPath";
                  this.notifyOne("New Location Unlocked:", "OminousPath is now accessible... \nBe careful!");
                  this.cmd["sudo"] = " COMMAND [ARGUMENT]: lets you run COMMAND as a super user, overriding any security measures in place.";
                }
                break;
  default     :
    if  ( (35 + this.textY) > this.canvas.height){ this.clear   ();                                                     }
    this.display (tmp[0]+this.error[0]                        , "#F00"); 
}   
},

OminousPath : function(command){
var tmp = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
switch(tmp[0]){
  case "cd"   : if(this.item["OminousPath"]["thornyBrambles"] && (tmp[1] === "Cave" || tmp[1] === this.dir.pwd+"\u002F"+"Cave")){
                  if(35+this.textY > this.canvas.height){ this.clear(); }
                  this.display("A patch of thorny brambles is growing at the mouth of the cave, blocking your way.", "#FF0");
                  break;
                }
                this.cd     ("OminousPath", tmp[1], "It seems like you don't have access to this place.");
                break;
  case "ls"   : this.ls     ("OminousPath", tmp[1], "It seems like you don't have access to this place.");
                break;
  case "less" : this.less   ("OminousPath", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                break;
  case "clear": this.clear  ();
                break;
  case "nano" : this.nano   ("OminousPath", tmp[1], "This is just "+tmp[1]+"'", 
                             "\"You already have this; I won't let you change its value...\" says Nano.");
                break;
  case "cp"   : this.cp     ("OminousPath", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                             "Are you sure you have '"+tmp[1]+"' here??");
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("OminousPath", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                break;
  case "help" : this.help   ();
                break;
  case "rm"   : if(tmp[1] === "thornyBrambles" && this.item["OminousPath"]["thornyBrambles"]){
                  if(4*17.5+this.textY > this.canvas.height){ this.clear(); }
                  this.display("You speak the words of the Remove spell and the brambles glimmer a deep", "#FF0");
                  this.display("blue. They seem to be protected by a password.", "#FF0");
                  this.display("[sudo] Enter password for novice: ", "#FF0");
                  this.prompting = true;
                  break;
                }
                this.rm     ("OminousPath", tmp[1], "\"You want me to remove a place; "+
                             "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                             "Make sure you have '"+tmp[1]+"' here...");
                break;
  case "man"  : this.man    ("OminousPath", tmp[1]);
                break;
  case "mv"   : if(tmp[1] === "thornyBrambles"){ 
                  if(35+this.textY > this.canvas.height){ this.clear(); }
                  this.display("You can't touch them because they are covered with thorns. Ouch!", "#FF0");
                  break;
                }
                this.mv     ("OminousPath", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate "+
                             "surroundings. You can't move places!\"");
                break;
  case ""     : break;
  case "pwd"  : this.pwd    ();
                break;
  case "mkdir": this.mkdir("OminousPath", tmp[1], "This place already exists!");
                break;
  default     :
    if(this.prompting){
      if(3*17.5+this.textY > this.canvas.height){ this.clear(); }
      if(tmp[0] === "brambles_b_gone"){
        delete this.item["OminousPath"]["thornyBrambles"];
        this.display("The brambles catch fire, choking you with a thick black smoke.", "#FF0");
        this.display("When the smoke clears, they're gone.", "#FF0");
      }
      else{
        this.display("Red sparks arc across the brambles before fizzling out.", "#FF0");
        this.display("They are definitely still there. Nice try though.", "#FF0");
      }
      this.prompting = false;
      break;
    }
    if  ( (35 + this.textY) > this.canvas.height){ this.clear   ();                                                     }
    this.display (tmp[0]+this.error[0]                        , "#F00");
}   
},

Cave : function(command){
var tmp = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
switch(tmp[0]){
  case "cd"   : if(tmp[1] === "Cage"){
                  (35 + this.textY > this.canvas.height)? this.clear() : window.console.log("An escape...");
                  this.display("You can't squeeze through the bars. Anyway, are you crazy? Why would you want to go into a cage?", "#FF0");
                  break;
                }
                this.cd     ("Cave", tmp[1], "It seems like you don't have access to this place.");
                break;
  case "ls"   : this.ls     ("Cave", tmp[1], "It seems like you don't have access to this place.");
                break;
  case"less"  : this.less   ("Cave", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                break;
  case "clear": this.clear  ();
                break;
  case "nano" : this.nano   ("Cave", tmp[1], "This is just "+tmp[1]+"'", 
                             "\"You already have this; I won't let you change its value...\" says Nano.");
                break;
  case "cp"   : this.cp     ("Cave", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                             "Are you sure you have '"+tmp[1]+"' here??");
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("Cave", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                break;
  case "help" : this.help   ();
                break;
  case "rm"   : if( tmp[1] === "absolutelyHideousTroll" && this.item["Cave"][ tmp[1] ]){
                  (3*17.5 + this.textY > this.canvas.height)? this.clear() : window.console.log("An escape...");
                  this.display("The troll belches spectacularly, and you could swear he actually smirks", "#FF0");
                  this.display("You won't get rid of him that easily, not without admin privileges.",     "#FF0");
                  return;
                }
                if(this.item["Cave"][ tmp[1] ] && !this.dir[ tmp[1] ]){
                  (35 + this.textY > this.canvas.height)? this.clear() : window.console.log("An escape...");
                  this.display("The troll looks briefy surprised, then vanishes with an unpleasant squelching sound.", "#FF0");
                }
                this.rm     ("Cave", tmp[1], "\"You want me to remove a place; "+
                             "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                             "Make sure you have '"+tmp[1]+"' here...");
                break;
  case "man"  : this.man    ("Cave", tmp[1]);
                break;
  case "mv"   : if( tmp[1] === "absolutelyHideousTroll"                        && 
                    this.item["Cave"][ tmp[1] ]                                &&
                  ( tmp[2] === "Cage" || tmp[2] === this.dir.pwd+"\u002FCage") &&
                  ( this.item["Cage"]["kidnappedChild"]                      ) ){
                  (3*17.5 + this.textY > this.canvas.height)? this.clear() : window.console.log("An escape...");
                  this.display("The troll vanishes with a pop and reappears inside of the cage.", "#FF0");
                  this.display("He scowls and then begins to chew on the kidnapped child’s leg.", "#FF0");
                }
                else if( tmp[1] === "absolutelyHideousTroll"                        && 
                         this.item["Cave"][ tmp[1] ]                                &&
                       ( tmp[2] === "Cage" || tmp[2] === this.dir.pwd+"\u002FCage") ){
                       (35 + this.textY > this.canvas.height)? this.clear() : window.console.log("An escape...");
                       this.display("The troll vanishes with a pop and reappears inside of the cage. He scowls and roars.", "#FF0");
                }
                else if( tmp[1] === "absolutelyHideousTroll"                        && 
                         this.item["Cave"][ tmp[1] ]                                &&
                       ( tmp[2] !== "Cage" || tmp[2] !== this.dir.pwd+"\u002FCage") ){
                       (35 + this.textY > this.canvas.height)? this.clear() : window.console.log("An escape...");
                       this.display("If you move him out of the cave, he'll terrorize the countryside. Also he will probably eat you.", "#FF0");
                       return;
                }
                this.mv     ("Cave", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate "+
                             "surroundings. You can't move places!\"");
                if(this.item["Cave"]["kidnappedChild"]){
                  this.clear();
                  this.display("The kid looks around, dazed, surprised to find himself out of the cage.", "#FF0");
                  this.display("You smile at him and speak in a gentle voice.", "#FF0");
                  this.display("\"You should probably be getting home, little boy. Someone is there waiting for you.\"", "#FF0");
                  this.display("\"I'm a girl,\" says the little girl smartly. Then she dashes past you, out of the cave,", "#FF0");
                  this.display("up the ominous path towards home.", "#FF0");
                  delete this.item["Cave"]["kidnappedChild"];
                }
                break;
  case ""     : break;
  case "pwd"  : this.pwd    ();
                break;
  case "mkdir": this.mkdir("Cave", tmp[1], "This place already exists!");
                break;
  default     :
    if  ( (35 + this.textY) > this.canvas.height){ this.clear   ();                                                     }
    this.display (tmp[0]+this.error[0]                        , "#F00");
}   

if(!this.item["Clearing"]["littleGirl"]         && 
   !this.item["Cage"]["kidnappedChild"]         &&
   !this.item["Cave"]["uglyTroll"             ] &&
   !this.item["Cave"]["uglierTroll"           ] &&
   !this.item["Cave"]["absolutelyHideousTroll"] ){
  this.item["Clearing"]["littleGirl"] = ["The child runs towards you and throws her arms around you in a hug!",
                                         "\"Hello, sir! I am so grateful that you have saved my life...\"",
                                         "she says with her face buried in your stomach."
                                        ];
  this.item["Clearing"]["happyMan"]   = ["The man approaches you wearing a huge smile on his face, clearly happy.",
                                         "\"My good sir, I am forever in your debt; how will I ever repay you?\" asks the man.",
                                         "You chuckle a little and smile gently. \"You don't owe me a thing, sir!",
                                         "I am only your servant as is the Admin.\" you reply."
                                        ];
  this.item["Clearing"]["fairWoman"]  = ["\"Hello! I remember you. You are the man from the Town Square. I heard you undid",
                                         "the evil wrought by the wizard on our family. Oh, thank you, kind stranger!\" says",
                                         "the lady as she bows her head to you."
                                        ];
  delete this.item["TownSquare"]["distraughtLady"];
  if(6*17.5 + this.textY > this.canvas.height){ this.clear(); }
  this.display("Now that you have gotten rid of all the trolls, a blue light reflected by the crystals", "#FF0");
  this.display("all over the cave walls converges to form a holographic magical note which reads:", "#FF0");
  this.display("  The One who has vanquished the Trolls to learn of the location of", "#00F");
  this.display("  the dark wizard's lair shall go to the root to challenge the wizard.", "#00F");
  this.display("  May the Admin fight alongside you...", "#00F");
  this.avail["root"] = true;
  this.notifyOne("Wizard's Location:", "Type:\n\tcd /\nto teleport into the wizard's lair.");
}
},

root : function(command){
var tmp = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
switch(tmp[0]){
  case "cd"   : this.cd     ("root", tmp[1], "It seems like you don't have access to this place.");
                break;
  case "ls"   : this.ls     ("root", tmp[1], "It seems like you don't have access to this place.");
                break;
  case"less"  : this.less   ("root", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                break;
  case "clear": this.clear  ();
                break;
  case "nano" : this.nano   ("root", tmp[1], "This is just "+tmp[1]+"'", 
                             "\"You already have this; I won't let you change its value...\" says Nano.");
                break;
  case "cp"   : this.cp     ("root", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                             "Are you sure you have '"+tmp[1]+"' here??");
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("root", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                break;
  case "help" : this.help   ();
                break;
  case "rm"   : this.rm     ("root", tmp[1], "\"You want me to remove a place; "+
                             "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                             "Make sure you have '"+tmp[1]+"' here...");
                break;
  case "man"  : this.man    ("root", tmp[1]);
                break;
  case "mv"   : this.mv     ("root", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate "+
                             "surroundings. You can't move places!\"");
                break;
  case ""     : break;
  case "pwd"  : this.pwd    ();
                break;
  case "mkdir": this.mkdir  ("root", tmp[1], "This place already exists!");
                break;
  default     :
    if  ( (35 + this.textY) > this.canvas.height){ this.clear   ();                                                     }
    this.display (tmp[0]+this.error[0]                        , "#F00");
}   
},

basement : function(command){
var tmp = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
switch(tmp[0]){
  case "cd"   : this.cd     ("basement", tmp[1], "It seems like you don't have access to this place.");
                break;
  case "ls"   : this.ls     ("basement", tmp[1], "It seems like you don't have access to this place.");
                break;
  case"less"  : this.less   ("basement", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                break;
  case "clear": this.clear  ();
                break;
  case "nano" : this.nano   ("basement", tmp[1], "This is just "+tmp[1]+"'", 
                             "\"You already have this; I won't let you change its value...\" says Nano.");
                break;
  case "cp"   : this.cp     ("basement", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                             "Are you sure you have '"+tmp[1]+"' here??");
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("basement", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                break;
  case "help" : this.help   ();
                break;
  case "rm"   : this.rm     ("basement", tmp[1], "\"You want me to remove a place; "+
                             "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                             "Make sure you have '"+tmp[1]+"' here...");
                break;
  case "man"  : this.man    ("basement", tmp[1]);
                break;
  case "mv"   : this.mv     ("basement", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate "+
                             "surroundings. You can't move places!\"");
                break;
  case ""     : break;
  case "pwd"  : this.pwd    ();
                break;
  case "mkdir": this.mkdir  ("basement", tmp[1], "This place already exists!");
                break;
  default     :
    if  ( (35 + this.textY) > this.canvas.height){ this.clear   ();                                                     }
    this.display (tmp[0]+this.error[0]                        , "#F00");
}   
},

creakyStairs : function(command){
var tmp = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
switch(tmp[0]){
  case "cd"   : this.cd     ("creakyStairs", tmp[1], "It seems like you don't have access to this place.");
                break;
  case "ls"   : this.ls     ("creakyStairs", tmp[1], "It seems like you don't have access to this place.");
                break;
  case"less"  : this.less   ("creakyStairs", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                break;
  case "clear": this.clear  ();
                break;
  case "nano" : this.nano   ("creakyStairs", tmp[1], "This is just "+tmp[1]+"'", 
                             "\"You already have this; I won't let you change its value...\" says Nano.");
                break;
  case "cp"   : this.cp     ("creakyStairs", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                             "Are you sure you have '"+tmp[1]+"' here??");
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("creakyStairs", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                break;
  case "help" : this.help   ();
                break;
  case "rm"   : this.rm     ("creakyStairs", tmp[1], "\"You want me to remove a place; "+
                             "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                             "Make sure you have '"+tmp[1]+"' here...");
                break;
  case "man"  : this.man    ("creakyStairs", tmp[1]);
                break;
  case "mv"   : this.mv     ("creakyStairs", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate "+
                             "surroundings. You can't move places!\"");
                break;
  case ""     : break;
  case "pwd"  : this.pwd    ();
                break;
  case "mkdir": this.mkdir  ("creakyStairs", tmp[1], "This place already exists!");
                break;
  default     :
    if  ( (35 + this.textY) > this.canvas.height){ this.clear   ();                                                     }
    this.display (tmp[0]+this.error[0]                        , "#F00");
}   
},

musicRoom : function(command){
var tmp = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
switch(tmp[0]){
  case "cd"   : this.cd     ("musicRoom", tmp[1], "It seems like you don't have access to this place.");
                break;
  case "ls"   : this.ls     ("musicRoom", tmp[1], "It seems like you don't have access to this place.");
                break;
  case"less"  : this.less   ("musicRoom", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                break;
  case "clear": this.clear  ();
                break;
  case "nano" : this.nano   ("musicRoom", tmp[1], "This is just "+tmp[1]+"'", 
                             "\"You already have this; I won't let you change its value...\" says Nano.");
                break;
  case "cp"   : this.cp     ("musicRoom", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                             "Are you sure you have '"+tmp[1]+"' here??");
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("musicRoom", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                break;
  case "help" : this.help   ();
                break;
  case "rm"   : this.rm     ("musicRoom", tmp[1], "\"You want me to remove a place; "+
                             "use 'rmdir' but it won't work: You don't have that power.\" says Rm shaking his head.", 
                             "Make sure you have '"+tmp[1]+"' here...");
                break;
  case "man"  : this.man    ("musicRoom", tmp[1]);
                break;
  case "mv"   : this.mv     ("musicRoom", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate "+
                             "surroundings. You can't move places!\"");
                break;
  case ""     : break;
  case "pwd"  : this.pwd    ();
                break;
  case "mkdir": this.mkdir  ("musicRoom", tmp[1], "This place already exists!");
                break;
  default     :
    if  ( (35 + this.textY) > this.canvas.height){ this.clear   ();                                                     }
    this.display (tmp[0]+this.error[0]                        , "#F00");
}   
},

MagicRoom : function(command){
var tmp = this.trnkate(command.trim().split("\u0020")); // split on a space (hex code for space is \u0020)
switch(tmp[0]){
  case "cd"   : this.cd     ("MagicRoom", tmp[1], "It seems like you don't have access to this place.");
                break;
  case "ls"   : this.ls     ("MagicRoom", tmp[1], "It seems like you don't have access to this place.");
                break;
  case"less"  : if(tmp[1] === "crystal" && !this.item["MagicRoom"]["longCrystal"] && this.item.MagicRoom.crystal.length>3){
                  this.notifyOne("Recommended:", "Copy the crystal:\n\tcp crystal longCrystal");
                }
                if(tmp[1] === "longCrystal" && this.item["MagicRoom"][ tmp[1] ]){
                  this.notifyOne("Recommended:", "Use the Remove spell on the wizard.");
                }
                this.less   ("MagicRoom", tmp[1], "Are you certain you can interact with '"+tmp[1]+"' in this plane??");
                if(tmp[1] === "wizard" && !this.item["MagicRoom"]["sword"]){
                  this.notifyOne("Recommended:", "Use:\n\tnano sword\nto conjure the blessed sword.");
                }
                break;
  case "clear": this.clear  ();
                break;
  case "nano" : this.nano   ("MagicRoom", tmp[1], "This is just "+tmp[1]+"'", 
                             "\"You already have this; I won't let you change its value...\" says Nano.");
                if(tmp[1] === "sword" && this.item["MagicRoom"]["sword"].length < 2){
                  this.item["MagicRoom"]["sword"] = [
                  "You conjure up a magnificent sword, its blade looks like a long flame.",
                  "The blade flickers and waves gracefully in your hands, one would swear",
                  "that it is not solid at all. Its handle is donned in various precious stones.",
                  "You clutch it tightly in your hands ready to attack but the wizard attacks first.",
                  "In a swift motion you dodge and slash across the wizard's chest, leaving him in awe...",
                  "\"This... magic, what is it? I haven't felt anything like it since grandfather",
                  "was Admin.\" wheezes the wizard. He lunges towards the mirror and you cut his hand.",
                  "He steps into the mirror and his reflection steps out grinning. The whole room turns",
                  "a blinding white; your eyes adjust to the new appearance. The table has vanished.",
                  "It's white as far as the eye can see. \"What game are you playing at, dear uncle?\" you ask.",
                  "\"Stay and you will see...,\" he smiles, \"...it's a little something I kept specially for you.\"",
                  "The dark wizard's robe grows skin-tight and he morphs into a leathery bull-horned-hyena-like",
                  "beast the size of a horse. He makes a noise resembling a cross of a howl and growl before",
                  "he charges."
                  ];
                  this.item["MagicRoom"]["crystal"] = [
                  "The crystal glows a bright maroon colour in front of you. It grows warmer as the creature",
                  "approaches you. A vision flashes through your mind in a microsecond:",
                  " #You see yourself copying the crystal so that there are two crystals in the end.",
                  " #The copy of the crystal is significantly longer and sharper.",
                  " #The creature leaps into the air and spins as it dives straight towards you.",
                  " #You take five steps forward with such incredible speed that time",
                  " #seems to slow down, you turn on the ball of your right foot and throw",
                  " #the spear into the belly of the beast. You watch it as it remains",
                  " #suspended in the air struggling.",
                  "As the vision fades and your sight returns, the creature leaps into the air...",
                  "you realize that the vision was foresight. You act out the vision..."
                  ];
                  this.notifyOne("Recommended:", "Use the crystal:\n\tless crystal");
                }
                break;
  case "cp"   : this.cp     ("MagicRoom", tmp[1], tmp[2], "This is just a copy of "+tmp[1], 
                             "Are you sure you have '"+tmp[1]+"' here??");
                if(this.item["MagicRoom"]["longCrystal"] && this.item["MagicRoom"]["longCrystal"].length>5){
                  this.item["MagicRoom"]["longCrystal"] = [
                  "...the creature spins as it dives straight towards you.",
                  "You take five steps forward with such incredible speed that time",
                  "seems to slow down, you turn on the ball of your right foot and throw",
                  "the spear into the belly of the beast. You watch it as it remains",
                  "suspended in the air struggling..."
                  ];
                }
                break;
  case "exit" : this.exit   ();
                break;
  case "grep" : this.grep   ("MagicRoom", tmp, 
                             "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.");
                break;
  case "help" : this.help   ();
                break;
  case "rm"   : if(tmp[1] === "wizard" && !this.item["MagicRoom"]["longCrystal"]){
                  if(35+this.textY > this.canvas.height){ this.clear(); }
                  this.display("You need to use the crystal to kill the wizard.", "#FF0");
                }
                else if(tmp[1] === "wizard" && this.item["MagicRoom"]["longCrystal"]){
                  if(5*17.5+this.textY > this.canvas.height){ this.clear(); }
                  this.display("Wicked thorny black brambles wrap around the creature and grow tighter.", "#FF0");
                  this.display("Anihilate this mess once and for all...", "#FF0");
                  this.display("[sudo] password for novice:", "#FF0");
                  this.prompting = true;
                }
                else{
                  if(35+this.textY > this.canvas.height){ this.clear(); }
                  this.display("Nothing leaves the Magic Room!", "#FF0");
                }
                break;
  case "man"  : this.man    ("MagicRoom", tmp[1]);
                break;
  case "mv"   : this.mv     ("MagicRoom", tmp[1], tmp[2], "It seems '"+tmp[1]+"' does not exist in this dimension.", 
                             "Mv shake his head and says, \"You can only move things to your immediate "+
                             "surroundings. You can't move places!\"");
                break;
  case ""     : break;
  case "pwd"  : this.pwd    ();
                break;
  case "mkdir": this.mkdir  ("MagicRoom", tmp[1], "This place already exists!");
                break;
  default     :
    if(this.prompting){
      if(tmp[0] === "brambles_b_gone"){
        this.rm("MagicRoom", "wizard");
        if(3*17.5+this.textY > this.canvas.height){ this.clear(); }
        this.display("The thorns crackle and spark, and a great fire blazes wildly.", "#FF0");
        this.display("Soon it disappears along with the wizard.", "#FF0");
        delete this.item.MagicRoom.crystal;
        delete this.item.MagicRoom.longCrystal;
        this.item.MagicRoom.sword = ["The sword is magnificent with its flame-like blade and rare jewel handle."];
      }
      else{
        if(35+this.textY > this.canvas.height){ this.clear(); }
        this.display("The creature struggles and howls but it doesn't go anywhere. The spell failed.", "#FF0");
      }
      this.prompting = false;
      break;
    }
    if  ( (35 + this.textY) > this.canvas.height){ this.clear   ();                                                     }
    this.display (tmp[0]+this.error[0]                        , "#F00");
}   
},

  invert : function(){
    var imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height),
        data      = imageData.data;
    for(var i = 0; i < data.length; i += 4){
      data[i]   = 255 - data[i];
      data[i+1] = 255 - data[i+1];
      data[i+2] = 255 - data[i+2];
    }
    this.ctx.putImageData(imageData, 0, 0);
  },

  getText         : function(){
                      if(this.ENTER){
                        this.command = document.getElementById("command").value;
                        document.getElementById("command").value = "";
                      }
                      return this.command;
                    },

  details         :  function(){
                       this.command       = document.getElementById("command").value;
                       this.ctx.font      = "15px Helvetica";
                       this.ctx.fillStyle = "rgba(0,140,255,1)";
                       (this.prompting)? this.ctx.fillText("  "+this.command+ "_", 2, this.textY) : 
                       this.ctx.fillText(" [ novice@terminus:"+ this.dir.pwd+ "$ ]  "+ this.command+ "_", 2, this.textY);
                     },

  display         :  function(words,color){
                       this.textY += 17.5;
                       this.ctx.font = "15px Heletica";
                       this.ctx.fillStyle = (color || "#fff");
                       this.ctx.fillText(" "+ words, 2, this.textY);
                     },

  clear           :  function(){
                       this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
                       this.textY = -2.5;
                       document.getElementById("command").value = "";
                     },

  help            :  function(){
                       for(var j in this.cmd){ this.clsNow += 17.5; }
                       if( (this.clsNow + 17.5 + this.textY) > this.canvas.height ){ 
                         this.clear(); 
                       }
                       for(var i in this.cmd){
                         this.display(i+this.cmd[i],"#f3e");
                       }
                     },
  
  exit            :  function(){
                       this.notifyOne('Leavnig?', "| May you be seen again in the land of Terminus! |");
                       document.location.reload();
                     },

  trnkate         :  function(arr){
                       var clnlist = new Array(arr[0]);
										   var end = arr.length;
                       for(var i = 1; i < end; i +=1){
                         if(arr[i] !== " " && arr[i] !== ""){
                           clnlist.push(arr[i]);
                         }
                       }
                       return clnlist || "1";
                     },

  notifyOne       :  function(theTitle, text, theIcon){
    var options = { body: text, icon: theIcon };

         if(!("Notification" in window)          ) { alert(text);                                           }
    else if(Notification.permission === "granted") { var notification = new Notification(theTitle, options);}
    else if(Notification.permission !== "denied" ) {
      Notification.requestPermission(function(permission){
        if(permission === "granted"){
          var notification = new Notification(theTitle, options);
        }
      });
    }
  },

  cd : function(PWD, DIR, ERR_MSG){

     //prettify path
     if(DIR != undefined){
       DIR = (DIR.charAt(DIR.length-1) === "\u002F" && DIR.length>1)? DIR.substring(0,DIR.length-1) : DIR;
     }

     var nwd;
     if(this.dir[ DIR ] && this.item[ PWD ][ DIR ] && this.avail[ DIR ]){
       this.dir.lwd      = this.dir.pwd;
       this.dir.portalWD = this.dir.pwd;
       this.dir.pwd      = this.dir[ DIR ];
     }
     else if(DIR === "\/" && this.avail["root"]){
       this.dir.lwd      = "\/";
       this.dir.portalWD = this.dir.pwd;
       this.dir.pwd      = "\/";
     }
     else if(DIR === ".."){
       var longwd        = this.dir[ PWD ].split("\u002F");
       if(this.dir.pwd.charAt(0) !== "\u002F"){
         this.dir.lwd      = this.dir[ (longwd[ longwd.length-3 ]) ] || "~";
         this.dir.portalWD = this.dir.pwd;
         this.dir.pwd      = this.dir[ (longwd[ longwd.length-2 ]) ] || "~";
       }
       else{
         this.dir.lwd      = this.dir.root;
         this.dir.portalWD = this.dir.pwd;
         this.dir.pwd      = this.dir[ longwd[ longwd.length-2 ] ] || "\u002F";
       }
     }
     else if(DIR === "."){ this.dir.portalWD = this.dir.pwd; }
     else if(DIR === "-"){
       var temp          = this.dir.pwd;
       this.dir.pwd      = this.dir.portalWD;
       this.dir.portalWD = temp;
       this.dir.lwd      = this.dir.pwd.substring(0, this.dir.pwd.lastIndexOf("\u002F")) || "~";
     }
     else if(DIR == undefined){
       this.dir.lwd      = this.dir.home;
       this.dir.portalWD = this.dir.pwd;
       this.dir.pwd      = this.dir.home;
     }
     else if(this.item[ PWD ][ DIR ] && !this.dir[ DIR ]){
       if((35 + this.textY) > this.canvas.height){
         this.clear();
       }
       this.display("cd"+this.error[6]);
     }
     else{
       var IsError = true;
       //token to be used to determine availability of path
       var temp          = DIR.split("\u002F");
       temp              = temp[ temp.length -1 ];
       temp              = (temp==="~")? "home" : temp;
       var tmpLongDIR    = DIR.substring(0, DIR.lastIndexOf("\u002F"));

       //check if path is absolute or relative, and available
       for(var i in this.dir){
         if((this.dir[i] === DIR || this.dir[i] === this.dir.pwd+"\u002F"+DIR) && this.avail[ temp ]){
           DIR = (this.dir[i] === this.dir.pwd+"\u002F"+DIR)? this.dir.pwd+"\u002F"+DIR: DIR;
           this.dir.portalWD = this.dir.pwd;
           this.dir.pwd      = DIR;
           this.dir.lwd      = this.dir.pwd.substring(0, this.dir.pwd.lastIndexOf("\u002F")) || "~";
           IsError           = false;
           break;
         }
         else if(this.dir.pwd+"\u002F"+DIR === this.dir[i] || DIR === this.dir[i]){
           if((3*17.5 + this.textY) > this.canvas.height){
             this.clear();
           }
           this.display(ERR_MSG, "#FF0");
           this.display("cd: "+DIR+this.error[3], "#F00");
           return;
         }
       }

       //check whether the given path is incorrect/not found
       if(IsError){
         if((3*17.5 + this.textY) > this.canvas.height){
           this.clear();
         }
         if(this.dir[ temp ] && this.item[ PWD ][ temp ]){
           this.display(ERR_MSG, "#FF0");
           this.display("cd: "+DIR+this.error[3], "#F00");
           return;
         }
         this.display(ERR_MSG, "#FF0");
         this.display("cd: "+DIR+this.error[1], "#F00");
       }
     }

     //let's reset some things and move the backpack along with the player
     if(this.dir.pwd !== this.dir[ PWD ]){
       if(this.dir["backpack"]){
         for(var j in this.dir){
           if(this.dir[j] === this.dir.pwd){
             this.item[ j ][ "backpack" ] = "backpack";
             this.dir.backpack = this.dir.pwd+"\u002Fbackpack";
             delete this.item[ PWD ]["backpack"];
             break;
             }
           }
         }
       }
  },

  ls : function(PWD, DIR, ERR_MSG){

     //prettify path
     if(DIR != undefined){
       DIR = (DIR.charAt(DIR.length-1) === "\u002F" && DIR.length>1)? DIR.substring(0,DIR.length-1) : DIR;
     }

     if(this.dir[ DIR ] && this.item[ PWD ][ DIR ]){
       for(var i in this.item[ DIR ]){ this.clsNow += 17.5; }
       if((this.clsNow + 17.5 + this.textY) > this.canvas.height ){
         this.clear();
       }
       this.clsNow = 0;
       for(var i in this.item[ DIR ]){
         if(this.dir[i]){
           this.display(i, "#0F0");
         }
         else if(i !== undefined){
           this.display(i);
         }
       }
     }
     else if(!this.dir[ DIR ] && this.item[ PWD ][ DIR ]){
        this.display(DIR);
     }
     else if(DIR === "\/"){
       for(var i in this.item["root"]){ this.clsNow += 17.5; }
       if((this.clsNow + 17.5 + this.textY) > this.canvas.height ){ this.clear(); }
       this.clsNow = 0;
       for(var i in this.item["root"]){
         (this.dir[i])? this.display(i, "#0F0"): (i !== undefined)? this.display(i): window.console.log("i: undefined.");
       }
     }
     else if(DIR === ".."){
       DIR = (this.dir[ PWD ].split("\u002F"));
       DIR = DIR[ DIR.length -2 ] || "home";
       DIR = (DIR==="~")? "home" : DIR;
       for(var i in this.item[ DIR ]){ this.clsNow += 17.5; }
       if((this.clsNow + 17.5 + this.textY) > this.canvas.height ){
         this.clear();
       }
       this.clsNow = 0;
       for(var i in this.item[ DIR ]){
         if(this.dir[i]){
           this.display(this.item[ DIR ][i], "#0F0");
         }
         else if(i !== undefined){
           this.display(i);
         }
       }
     }
     else if(DIR === "." || DIR == undefined){
       for(var i in this.item[ PWD ]){ this.clsNow += 17.5; }
       if((this.clsNow + 17.5 + this.textY) > this.canvas.height ){
         this.clear();
       }
       this.clsNow = 0;
       for(var i in this.item[ PWD ]){
         if(this.dir[i]){
           this.display(this.item[PWD][i], "#0F0");
         }
         else if(i !== undefined){
           this.display(i);
         }
       }
     }
     else{
       var IsError = true;
       //token to be used to determine availability of path
       var temp    = DIR.split("\u002F");
       var tempF   = temp[ temp.length -1 ];
       tempF       = (tempF==="~")? "home" : tempF;
       var tmpLongDIR    = DIR.substring(0, DIR.lastIndexOf("\u002F")),
           tmpShortDIR   = (temp.length > 2)? temp[ temp.length-2 ] : "home";

       //check if absolute path or relative path and its availability
       for(var i in this.dir){
         if((this.dir[i] === DIR || this.dir[i] === this.dir.pwd+"\u002F"+DIR)  && this.avail[ tempF ]){
           IsError = false;
           for(var m in this.item[i]){ this.clsNow += 17.5; }
           if((this.clsNow + 17.5 + this.textY) > this.canvas.height){
             this.clear();
           }
           this.clsNow = 0;
           for(var j in this.item[i]){
             if(this.dir[j]){
               this.display(this.item[i][j], "#0F0");
             }
             else if(j !== undefined){
               this.display(j);
             }
           }
         }
       
         //check if file exists through a relative or absolute path
         if((this.dir[i] === tmpLongDIR || this.dir[i] === this.dir.pwd+"\u002F"+tmpLongDIR) && 
             this.item[ tmpShortDIR ][ tempF ] && !this.dir[tempF]){
           this.display(DIR);
           IsError = false;
         }
       }
       //check whether the given path is incorrect/not found
       if(IsError){
         if((3*17.5 + this.textY) > this.canvas.height){
           this.clear();
         }
         if(this.dir[tempF]){
           this.display(ERR_MSG, "#FF0");
           this.display("ls"+this.error[7]+"'"+DIR+"'"+this.error[3], "#F00");
           return;
         }
         this.display(ERR_MSG, "#FF0");
         this.display("ls"+this.error[7]+"'"+DIR+"'"+this.error[1], "#F00");
       }
     }
  },

  less : function(PWD, FILE, ERR_MSG){
       
       if(this.item[ PWD ][ FILE ] && this.item[ PWD ][ FILE] !== undefined  && !this.dir[ FILE ]){
         if( ((this.item[ PWD ][ FILE ].length+1) * 17.5 + this.textY) > this.canvas.height ){
           this.clear();
         }
				 var end = this.item[ PWD ][ FILE ].length;
         for(var i = 0; i < end; i++){
           this.display(this.item[ PWD ][ FILE ][i], "#FF0");
         }
       }
       else if(FILE == null){
         if((3*17.5 + this.textY) > this.canvas.height){ this.clear(); }
         this.display(ERR_MSG, "#FF0");
         this.display(this.error[8], "#F00");
       }
       else{
         var exists = false;
         //prettify file
         var tDIR = FILE.split("");
         if(tDIR && (tDIR[ tDIR.length-1 ] === "\u002F")){
           FILE = FILE.substring(0,FILE.length-1);
         }

         //check if it's a path
         for(var i in this.dir){
         if((this.dir[ FILE ]                            || 
            (FILE === ".")                               || 
            (FILE === "..")                              || 
            (this.dir.pwd+"\u002F"+FILE === this.dir[i]) ||
            (this.dir[i] === FILE)                     )){
           exists = true;
           if((3*17.5 + this.textY) > this.canvas.height){ this.clear(); }
           this.display(ERR_MSG, "#FF0");
           this.display(FILE+this.error[2], "#F00");
           return;
         }
         }

         //check if it's a file on relative path or absolute path
         var DIR = FILE.substring(0, FILE.lastIndexOf("\u002F"));
         FILE = FILE.substring(FILE.lastIndexOf("\u002F")+1, FILE.length);
         for(var k in this.dir){
           try{
					 if(!this.item[k]){ var error = "Item_Not_Found"; throw error; }
           if(DIR === this.dir[k] && this.item[k][ FILE ]){
						 var end = this.item[k][ FILE ].length;
             if((end+1)*17.5 + this.textY > this.canvas.height){ this.clear(); }
             for(var i=0; i < end; i++){
               this.display(this.item[k][ FILE ][i], "#FF0");
             }
             return;
           }
           else if(this.dir.pwd+"\u002F"+DIR === this.dir[k] && this.item[k][ FILE ]){
             if((this.item[k][ FILE ].length+1)*17.5 + this.textY > this.canvas.height){ this.clear(); }
						 var end = this.item[k][ FILE ].length;
             for(var i=0; i < end; i++){
               this.display(this.item[k][ FILE ][i], "#FF0");
             }
             return;
           }
           }
           catch(error){}
         }

         if(!exists){
           if((3*17.5 + this.textY) > this.canvas.height){ this.clear(); }
           this.display(ERR_MSG, "#FF0");
           this.display(FILE+this.error[1], "#F00");
         }
       }
  },

  nano : function(PWD, FILENAME, DESCRIPTION, ERR_MSG){
       if(!FILENAME){
         if((this.textY + 35) > this.canvas.height){ this.clear(); }
         this.display("nano: usage: 'nano ITEM'", "#FF0");
       }
       else if(!this.item[ PWD ][ FILENAME ]){
         var vowel  = false, 
             vowels = ["a", "e", "i", "o", "u"];
         for(var i = 0; i < 5; i++){
           if(FILENAME.toLowerCase().charAt(0) === vowels[i]){
             vowel = true;
             break;
           }
         }
         
         this.item[ PWD ][ FILENAME ] = (vowel)? new Array(DESCRIPTION+"an '"+FILENAME+"'"): new Array(DESCRIPTION+"a '"+FILENAME+"'");
       }
       else{
         if((this.textY + 35) > this.canvas.height){
           this.clear();
         }
         this.display(ERR_MSG, "#FF0");
       }
  },

  cp : function(PWD, ORIG_FILE, COPY_FILE, DESCRIPTION, ERR_MSG){
     if(this.item[ PWD ][ ORIG_FILE ] && !this.item[ PWD ][ COPY_FILE ]){
       this.item[ PWD ][ COPY_FILE ] = this.item[ PWD ][ ORIG_FILE ];
     }
     else if(!this.item[ PWD ][ ORIG_FILE ]){
       if((3*17.5 + this.textY) > this.canvas.height){
         this.clear();
       }
       this.display(ERR_MSG, "#FF0");
       this.display("cp: "+ORIG_FILE+this.error[1], "#F00");
     }
  },

  grep : function(PWD, ARR, ERR_MSG){

       var data = ["",""];
			 var end = ARR.length;
       if(end > 3){
				 var END = end-1;
         for(var k=1; k < END; k++){ data[0] += " "+ARR[k]; }
         data[1] = ARR[ END ];
       }
       else if(end === 3){
         data[0] = '"'+ARR[1]+'"';
         data[1] = ARR[2];
       }
       else{
         data[0] = "gfvjsdk";
         data[1] = ARR[1] || ARR[0];
       }
       if(this.book[ data[1] ] && (this.item[ PWD ][ data[1] ] !== undefined)){
         var noPhrase = true;
				 var END = this.phrase.length;
         for(var i=0; i < END; i++){
           if('"'+this.phrase[i]+'"' === data[0].trim()){
             noPhrase = false;
             if(((this.book[ data[1] ].length+1)*17.5+ this.textY) > this.canvas.height){
               this.clear();
             }
						 var bookEND = this.book[ data[1] ].length;
             for(var i=0; i < bookEND; i++){
               this.display(this.book[ data[1] ][i], "#FF0");
             }
             break;
           }
         }

         if(noPhrase){
           if(35+this.textY > this.canvas.height){ this.clear(); }
           this.display(ERR_MSG, "#FF0");
         }
       }
       else if(!this.item[ PWD ][ data[1] ] || !this.book[ data[1] ]){
         if(3*17.5 + this.textY > this.canvas.height){ this.clear(); }
         this.display("Are you sure this is a book and that it's here?", "#FF0");
         this.display("grep: "+data[1]+this.error[1], "#F00");
       }

  },

  pwd : function(){
      if((35 + this.textY) > this.canvas.height){
        this.clear();
      }
      this.display(this.dir.pwd, "#0F0");
  },

  rm : function(PWD, FILE, ERR_MSG1, ERR_MSG2){
     FILE = (FILE.charAt(FILE.length-1)==="\u002F")? FILE.substring(0, FILE.length-1): FILE;
     if(this.item[ PWD ][ FILE ] && !this.dir[ FILE ]){
       delete this.item[ PWD ][ FILE ];
     }
     else if(this.dir[ FILE ] || FILE === "." || FILE === ".." || FILE === "~"){
       if((this.textY + 3*17.5) > this.canvas.height){
         this.clear();
       }
       this.display(ERR_MSG1, "#FF0");
       this.display("rm: cannot remove '"+FILE+"': "+this.error[2], "#F00");
     }
     else{
       //check for absolute path or relative path
       for(var i in this.dir){
         if(this.dir[i] === FILE || this.dir[i] === this.dir.pwd+"\u002F"+FILE){
           if((this.textY + 3*17.5) > this.canvas.height){
             this.clear();
           }
           this.display(ERR_MSG1, "#FF0");
           this.display("rm: cannot remove '"+FILE+"': "+this.error[2], "#F00");
           return;
         }
       }
       if((this.textY + 3*17.5) > this.canvas.height){
         this.clear();
       }
       this.display(ERR_MSG2, "#FF0");
       this.display("rm: "+FILE+this.error[1], "#F00");
     }
  },

  mv : function(PWD, FILE, DEST, FILE_ERR_MSG, DEST_ERR_MSG){
     FILE = FILE.split("\u002F");
     if( ( FILE[0]  ===  ".."        ) &&
       ( ( DEST     ===  "."         ) || 
         ( DEST     ===  this.dir.pwd) )){ 
       FILE = FILE[FILE.length-1];
       var exists = false;
       for(var j in this.dir){
         try{
           if(this.item[j] == undefined){ var error = "Item_Not_Found"; throw error; }
           if((this.dir[j] === this.dir.lwd) && (this.item[j][ FILE ] != undefined) && !this.dir[ FILE ]){
             this.item[ PWD ][ FILE ] = this.item[j][ FILE ];
             delete this.item[j][ FILE ];
             exists = true;
             break;
           }
         }
         catch(error){}
       }
       
       if(!exists){
         if((this.textY + 3*17.5) > this.canvas.height){
           this.clear();
         }
         this.display(FILE_ERR_MSG, "#FF0");
         this.display("mv: "+FILE+this.error[1], "#F00");
       }
     }
     else if( (DEST === ".") || (DEST === this.dir.pwd) ){
       var tDIR = FILE.join("\u002F");
       tDIR = tDIR.substring(0, tDIR.lastIndexOf("\u002F"));

       FILE = FILE[FILE.length-1];
       var exists = false;
       for(var j in this.dir){
         try{
           if(this.item[j] == undefined){ var error = "Item_Not_Found"; throw error; }
           if(((this.dir[j] === this.dir.pwd+"\u002F"+tDIR)  || 
               (this.dir[j] === tDIR))                       && 
               (this.item[j][ FILE ] != undefined)           &&
               (!this.dir[ FILE ])){
             this.item[ PWD ][ FILE ] = this.item[j][ FILE ];
             delete this.item[j][ FILE ];
             exists = true;
             break;
           }
         }
         catch(error){}
       }
       
       if(!exists){
         if((this.textY + 3*17.5) > this.canvas.height){
           this.clear();
         }
         this.display(FILE_ERR_MSG, "#FF0");
         this.display("mv: "+FILE+this.error[1], "#F00");
       }
     }
     else if((this.item[ PWD ][ DEST ] && this.dir[ DEST ]) && this.item[ PWD ][ FILE ] && !this.dir[ FILE ]){
       this.item[ DEST ][ FILE ] = this.item[ PWD ][ FILE ];
       delete this.item[ PWD ][ FILE ];
     }
     else{
       if((this.textY+35 ) > this.canvas.height){
         this.clear();
       }
       this.display(DEST_ERR_MSG, "#FF0");
     }
  }, 

  mkdir : function(PWD, FILENAME, ERR_MSG){
    if(!this.item[ PWD ][ FILENAME ]){
      this.item[ PWD ][ FILENAME ] = FILENAME;
      this.dir[ FILENAME ]         = this.dir.pwd+"\u002F"+FILENAME;
      this.avail[ FILENAME ]       = false;
    }
    else{
      if(3*17.5+this.textY > this.canvas.height){ this.clear(); }
      this.display(ERR_MSG, "#FF0");
      this.display("mkdir"+this.error[9]+" '"+FILENAME+"': File exists", "#F00");
    }
  },

  man : function(PWD, SPELL){
    if  ( this.cmd[ SPELL ] && this.item[ PWD ]["man"]){ window.location = "man.htm#"+SPELL; }
    else if(!this.cmd[ SPELL ] && this.item[ PWD ]["man"]){
      if  ( (35 + this.textY) > this.canvas.height ){ this.clear(); }
      this.display("No manual entry for "+SPELL, "#F00");
    }
    else{
      if  ( (35 + this.textY) > this.canvas.height ){ this.clear(); }
      this.display ("The manual is only available at a library.", "#FF0");
    }
  }

};

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // TO DO: + prettify code-work and optimise the code:
// //          - add return statements in functions so that when what is sought is found the function exits
// //        + add css for opera + chrome + ie + other
// //        + allow player to enquire about the amount of gold s/he possesses
