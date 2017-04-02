    $(document).ready(function() {

        // ********************************* variables and library here ********************************* //

        var wins = 0;
        var losses = 0;
        var minutes = 0; // current time allowance change below were pertinent. Is a minute too long?
        var time = 0;   // goes with minutes variable
        var secs = 1;   // initial value
        var q;  // see line 291 - stores library answer keys for question displayed
        var selected = 9;   // assigned a value that is different from any of the choices which ranges from 1 to 4
        var k = 0;  // remnant from previous version - check again before deleting
        var main = false; // differentiates countPre from mainCount timer
        var start = false;
        var pseudoIndex = []; // used for random selection of question
        var scrambled = [];
        var reset = true; // used to reset array for random question selection
        var correct = "0"; // keeps track of correct answer since choices are randomized
        // without scrambling of choices, right answer is always the first one
        var endGame = false;
        var flicker = true; // some css formatting
        var firstQ = true;  // first question shown after start is clicked
        var delayPre; // 1 second interval
        var mainCount;

        var library = {
                "1": {
                    "quest": "What do you call a group of hyenas",
                    "choices": {
                        "0": "A cackle of hyenas",
                        "1": "A herd of hyenas",
                        "2": "A troop of hyenas",
                        "3": "A pack of hyenas"
                    }
                },
                "2": {
                    "quest": "What do you call a group of Giraffes",
                    "choices": {
                        "0": "A tower of giraffes",
                        "1": "A bunch of giraffes",
                        "2": "A text of giraffes",
                        "3": "A forest of giraffes"
                    }
                },
                "3": {
                    "quest": "What do you call a group of Ferrets",
                    "choices": {
                        "0": "A business of ferrets",
                        "1": "A mob of ferrets",
                        "2": "A span of ferrets",
                        "3": "An intrigue of ferrets"
                    }
                },
                "4": {
                    "quest": "What do you call a group of Crows",
                    "choices": {
                        "0": "A murder of crows",
                        "1": "A leash of crows",
                        "2": "A deceit of crows",
                        "3": "A witchery of crows"
                    }
                },
                "5": {
                    "quest": "What do you call a group of Apes",
                    "choices": {
                        "0": "A shrewdness apes",
                        "1": "A company of apes",
                        "2": "A parliament of apes",
                        "3": "A division of apes"
                    }
                },
                "6": {
                    "quest": "What do you call a group of Kangaroos",
                    "choices": {
                        "0": "A mob of kangaroos",
                        "1": "A team of kangaroos",
                        "2": "A leap of kangaroos",
                        "3": "A tussle of kangaroos"
                    }
                },
                "7": {
                    "quest": "What do you call a group of Geese",
                    "choices": {
                        "0": "A gaggle of geese",
                        "1": "A colony of geese",
                        "2": "A cast of geese",
                        "3": "A scurry of geese"
                    }
                },
                "8": {
                    "quest": "What do you call a group of Hippopotami",
                    "choices": {
                        "0": "A bloat of hippopotami",
                        "1": "A grin of hippopotami",
                        "2": "A gulp of hippopotami",
                        "3": "A district of hippopotami"
                    }
                },
                "9": {
                    "quest": "What do you call a group of Rhinoceroses",
                    "choices": {
                        "0": "A crash of rhinoceroses",
                        "1": "A pride of rhinoceroses",
                        "2": "A thunder of rhinoceroses",
                        "3": "A wall of rhinoceroses"
                    }
                },
                "10": {
                    "quest": "What do you call a group of Leopards",
                    "choices": {
                        "0": "A leap of leopards",
                        "1": "A clowder of leopards",
                        "2": "A pounce of leopards",
                        "3": "A pride of leopards"
                    }
                },
                "11": {
                    "quest": "What do you call a group of Hawks",
                    "choices": {
                        "0": "A cast of hawks",
                        "1": "A scold of hawks",
                        "2": "A party of hawks",
                        "3": "A watch of hawks"
                    }
                },
                "12": {
                    "quest": "What do you call a group of Parrots",
                    "choices": {
                        "0": "A company of parrots",
                        "1": "A cackle of parrots",
                        "2": "A parliament of parrots",
                        "3": "A muster of parrots"
                    }
                },
                "13": {
                    "quest": "What do you call a group of Ravens",
                    "choices": {
                        "0": "An unkindness of ravens",
                        "1": "A  watch of ravens",
                        "2": "A horde of ravens",
                        "3": "A shrewdness of ravens"
                    }
                },
                "14": {
                    "quest": "What do you call a group of Peacoks",
                    "choices": {
                        "0": "An ostentation of peacocks",
                        "1": "A parade of peacocks",
                        "2": "A pretentiousness of peacocks",
                        "3": "An extravagance of peacoks"
                    }
                },
                "15": {
                    "quest": "What do you call a group of Rooks",
                    "choices": {
                        "0": "A building of rooks",
                        "1": "A rafter of rooks",
                        "2": "A nest of rooks",
                        "3": "A scold of rooks"
                    }
                },
                "16": {
                    "quest": "What do you call a group of Eagles",
                    "choices": {
                        "0": "A convocation of eagles",
                        "1": "A parliament of eagles",
                        "2": "A stand of eagles",
                        "3": "A siege of eagles"
                    }
                },
                "17": {
                    "quest": "What do you call a group of Flamingoes",
                    "choices": {
                        "0": "A stand of flamingoes",
                        "1": "A colony of flamingoes",
                        "2": "An exaltation of flamingoes",
                        "3": "A mustering of flamingoes"
                    }
                },
                "18": {
                    "quest": "What do you call a group of Woodpeckers",
                    "choices": {
                        "0": "A descent of woodpeckers",
                        "1": "A knock of woodpeckers",
                        "2": "A hammering of woodpeckers",
                        "3": "A batter of woodpeckers"
                    }
                },

                "19": {
                    "quest": "What do you call a group of Parrots",
                    "choices": {
                        "0": "A pandemonium of parrots",
                        "1": "A turmoil of parrots",
                        "2": "A peace of parrots",
                        "3": "A parcel of parrots"
                    }
                },
                "20": {
                    "quest": "What do you call a group of Kittens",
                    "choices": {
                        "0": "An intrigue of kittens",
                        "1": "A obstinacy of kittens",
                        "2": "A barrel of kittens",
                        "3": "A scurry of kittens"
                    }
                },
            } // library end

        // ************************************* count down here ************************************* //

        $("#start").on("click", countPre); // waiting for click, calls on countPre
        // countPre interval countdown allows readyness of player before question is loaded
        // countPre also resets values before new question is loaded, or to re-start game after questions cycle ended

        function countPre() {

            $("#start").hide(500, 0); // hiding start button to prevent additional clicks while running

            // if reset true then game re-starts. Otherwise next question loads
            if (reset) {
                firstQ = true;
                $("#inquiry").empty();
                $("#choices").html("");
                pseudo();
            }

            k = 0;
            selected = 9; //  any value different from any of the choices values
            if (firstQ) {
                secs = 1; // no delay before first question
                firstQ = false;
            } else {
                secs = 4; //  sets time wait before showing next word
            }
            scrambled = []; //  empties array
            scramble(); //  scrambles available choices before loading in divs
            delayPre = setInterval(count, 1000);
        } // end of countPre

        // countPre allows calling endGame function, or qRandom to show random selection of question
        // countPre also calls on compare function once mainCount ends
        function count() {
            k++;
            secs--;
            $("#countDown").fadeTo(100, 1);
            if (main) {

                if (flicker) {
                    $(".answ").css("border-color", "blue");
                    flicker = false;
                } else {
                    $(".answ").css("border-color", "red");
                    flicker = true;
                } // end flicker

                // minutes not needed but I like the looks of a real digital clock, that is 00:00
                if (secs < 10) {
                    $("#countDown").html("0" + minutes + ":" + "0" + secs);
                } else {
                    $("#countDown").html("0" + minutes + ":" + secs);
                }
            } else {
                $("#countDown").html("00:00");
            }

            if (secs <= 0) {
                if (endGame) {
                    showStats();
                } else if (!main) {
                    qRandom();
                } else {
                    compare();
                }
            }
        }

        // ************************************* random pick ************************************* //

        // creates (pseudo-library) array with values from library
        function pseudo() {
            for (i = 0; i < Object.keys(library).length; i++) {
                pseudoIndex.push(i + 1);
            }
            reset = false;
        } // end pseudo

        // selects a random number from array (pseudo-lybrary)
        function qRandom() {
            var rand = Math.floor(Math.random() * pseudoIndex.length);
            // assigns library key to q
            q = pseudoIndex[rand]
            // removes the used array number that matches the key in library
            pseudoIndex.splice(rand, 1);
            // in next pickQuest function call, the already used keys will not be selected

            pickQuest()

        } // end qRandom


        // ************************************* scramble choices ************************************* //

        // randomizes choices in library before loaded in divs for display
        // randomized choices are stored in scrambled array
        function scramble() {
            // choicesArr length is same as number of choices in library
            // added last minute, thus function-scramble was shaped to fit already available code while minimizing changes of the latter
            var choicesArr = [0, 1, 2, 3];
            for (i = 0; i < Object.keys(library[1].choices).length; i++) {
                var rand = Math.floor(Math.random() * choicesArr.length);
                scrambled.push(choicesArr[rand]);

                if (choicesArr[rand] == 0) {
                    correct = i;
                }
                choicesArr.splice(rand, 1);
            }
        }

        // ************************************* Pick question ************************************* //

        // displays question and choices to player
        function pickQuest() {
            clearInterval(delayPre);
            $("#choices").empty();
            $("#inquiry").html(library[q].quest);

            for (i = 0; i < 4; i++) {
                // creating divs for choices
                var $answ = $("<div>");
                $answ.addClass("answ");
                $answ.addClass("answ" + i);
                $answ.attr("data-choice", i);
                $("#choices").append($answ);
                $(".answ" + i).html(library[q].choices[scrambled[i]]);
            } // end of for loop
            userChoice();

        } // end of pickQuest

        // ************************************* on click event here ************************************* //

        // listens to user clicks and stores user-selected choice
        function userChoice() {
            k = 0;
            secs = 11; // sets time allowance for guess

            main = true; // specifies count down is the the main time user uses to guess word
            mainCount = setInterval(count, 1000);

            // onclick choice selection
            $(".answ").on("click", function() {

                // user clicks and selection is highlighted
                // lazy way: change all at on-click of any of them, then rewrites the selected one
                for (i = 0; i < 4; i++) {
                    // $(".answ" + i).css("border-color", "blue").css("color", "blue").fadeTo(100, 0.7).css("font-size", "1em");
                    $(".answ" + i).css("color", "blue").fadeTo(100, 0.7).css("font-size", "1em");
                }
                // rewriting property for selected one
                $(this).css("border-color", "red").css("color", "red").fadeTo(100, 1).css("font-size", "1.2em");
                selected = $(this).data("choice");
            }); // end onclick
        } // end user choice

        // ************************************* compare compacted ************************************* //

        function compare() {
            clearInterval(mainCount);
            main = false;

            // loops to find correct, selected, and other options. Highlights them accordingly
            for (i = 0; i < 4; i++) {
                if (i == correct) {
                    $(".answ" + i).css("border-color", "blue").css("color", "blue").fadeTo(100, 1).css("font-size", "1.25em").css("text-shadow", "1px 1px #2CE823");
                } else if (i == selected) {
                    $(".answ" + i).css("border-color", "red").css("color", "#FF564F").fadeTo(100, 1).css("font-size", "0.9em").css("text-shadow", "1px 1px grey");
                } else {
                    $(".answ" + i).css("border-color", "blue").css("color", "blue").fadeTo(50, 0.1).css("font-size", "0.9em");
                }
            } // end for loop

            // notifies which was right answer, shows user selection as well, if any
            switch (selected) {
                case correct:
                    wins++;
                    $("#inquiry").html("Well Done!");
                    break;
                case 9:
                    losses++;
                    $("#inquiry").html("Right answer is:");
                    break;
                default:
                    losses++;
                    $("#inquiry").html("Nope! You got it all wrong.");
                    break;
            } // end of switch

            // if pseudo-library questions were all visited, game ends
            if (pseudoIndex.length > 0) {
                countPre();
            } else {
                endGame = true;
                countPre();
            } // end of pseudo
        }

        // ************************************* End Game Stats ************************************* //

        function showStats() {
            clearInterval(delayPre)
            // $("#inquiry").empty();
            $("#inquiry").html("Score");
            $("#countDown").html("00:00").fadeTo(500, 0.3);
            $("#choices").empty();
            $("#choices").append('<p class="outcome">' + "Wins: " + wins + '</p>');
            $("#choices").append('<p class="outcome">' + "Losses: " + losses + '</p>');
            reset = true;
            wins = 0;
            losses = 0;
            endGame = false;

            // button was hidden, now it is displayed again to allow game to be started
            $("#start").show();
        }
    }); // end document ready
