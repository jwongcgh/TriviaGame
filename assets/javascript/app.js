$(document).ready(function() {

    // ********************************* variables and library here ********************************* //

    var wins = 0;
    var losses = 0;
    var minutes = 0; // current time allowance change below were pertinent. Is a minute too long?
    var time = 0; // goes with minutes variable
    var secs = 0;
    var q;
    var selected = 9;
    var k = 0;
    var main = false; // differentiates countPre from mainCount timer
    var start = false;
    var pseudoIndex = []; // used for random selection of question
    var scrambled = [];
    var reset = true; // used to reset array for random question selection
    var correct = "0"; // keeps track of correct answer since choices are randomized
    // without scrambling of choices, right answer is always the first one
    var endGame = false;

    var library = {
            "1": {
                "quest": "kitties are not",
                // "answer": "2",
                "choices": {
                    "0": "doggies index 0",
                    "1": "this is index 1",
                    "2": "this is index 2",
                    "3": "this is index 3",
                }
            },
            "2": {
                "quest": "the sky is",
                // "answer": "0",
                "choices": {
                    "0": "blue index 0 q2",
                    "1": "this is index 1 q2",
                    "2": "this is index 2 q2",
                    "3": "this is index 3 q2"
                }
            },
            "3": {
                "quest": "forever",
                // "answer": "3",
                "choices": {
                    "0": "young is index 0 q3",
                    "1": "this is index 1 q3",
                    "2": "this is index 2 q3",
                    "3": "this is index 3 q3"
                }
            },
            "4": {
                "quest": "one plus one is",
                // "answer": "1",
                "choices": {
                    "0": "two index 0 q4",
                    "1": "this is index 1 q4",
                    "2": "this is index 2 q4",
                    "3": "this is index 3 q4"
                }
            },
        } // library end


    // ********************************* creating divs ********************************* //




    // ************************************* count down here ************************************* //
    // listen to start game button 



    $("#start").on("click", countPre); // here we wait for click, calls on countPre
    // countPre interval countdown allows readyness of player before question is loaded
    // countPre also resets values before new question is loaded, or to re-start game after questions cycle ended

    function countPre() {

        $("#start").hide(500, 0); // hiding start button after clicked to prevent additional clicks while running

        // console.log("reset values is: " + reset);
        // if reset true then game re-starts. Otherwise next question loads
        if (reset) {
            $("#choices").html("");
            pseudo();
        }

        k = 0;
        selected = 9; //  any value different from any of the choices values
        secs = 3; //  sets time wait before showing next word
        scrambled = []; // emptying array
        scramble(); // scrambles choices to be loaded in divs
        delayPre = setInterval(count, 1000);
    } // end of countPre

    // countPre allows calling endGame function; qRandom to show up randomly selected question
    // counPre also calls on compare function once mainCount ends
    function count() {
        k++;
        secs--;

        if (secs < 10) {
            console.log("00" + ":" + "0" + secs);
            $("#countDown").html("0" + minutes + ":" + "0" + secs);
        } else {
            console.log("00" + ":" + secs);
            $("#countDown").html("0" + minutes + ":" + secs);
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

    function pseudo() {


        // creating array with values from library
        console.log("inside pseudo");
        for (i = 0; i < Object.keys(library).length; i++) {
            pseudoIndex.push(i + 1);
        }
        console.log("pseudoIndex array: " + pseudoIndex);
        reset = false;
        console.log("reset value changed to: " + reset);
    } // end pseudo

    function qRandom() {

        // creating array with values from library
        // selecting a random number from array
        var rand = Math.floor(Math.random() * pseudoIndex.length);
        // assigning library key to q
        q = pseudoIndex[rand]
        console.log("random q: " + q);
        // removing the used array number that matches the key in library 
        pseudoIndex.splice(rand, 1);
        // in next pickQuest function call, the already used keys will not be selected
        console.log(pseudoIndex);

        pickQuest()

    } // end qRandom


    // ************************************* scramble choices ************************************* //

    function scramble() {
        // choicesArr length is same as number of choices in library
        // if number of choices is unknown, loop through library number of choices
        var choicesArr = [0, 1, 2, 3];
        for (i = 0; i < Object.keys(library[1].choices).length; i++) {
            var rand = Math.floor(Math.random() * choicesArr.length);
            scrambled.push(choicesArr[rand]);
            // console.log("choices being pushed: " + choicesArr[rand]);
            if (choicesArr[rand] == 0) {
                correct = i;
            }
            choicesArr.splice(rand, 1);
        }
        console.log("scrambled array: " + scrambled);
        console.log("correct= " + correct);
    }


    // do I want to get into the trouble of randomizing display order of choices?

    // ************************************* Pick question ************************************* //

    // randomly select question and relevant choices: qRandom & pseudo above
    // first: clear pre-game count down - moved to userChoice function
    // second: pick question
    // third: display question
    // fourth: display main countdown, go to compare to answer
    function pickQuest() {




        clearInterval(delayPre);
        // console.log("value of q= " + q);
        $("#choices").empty();
        $("#inquiry").html(library[q].quest);
        // console.log(library[q].quest);

        for (i = 0; i < 4; i++) {
            console.log(library[q].choices[i]);
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

    // remove question and choices pair from library
    // keep track of number of times this was accessed
    // keep track of length of library, call on end game function
    // call on click event here



    // ************************************* on click event here ************************************* //
    // listen to click 

    function userChoice() {
        console.log("inside userChoice function");
        // console.log("correct answer is: " + correct);
        k = 0;
        secs = 5; // sets time allowance for guess
        main = true;
        // console.log("main value= " + main);
        mainCount = setInterval(count, 1000);


        // onclick choice selection
        $(".answ").on("click", function() {
            console.log("clicked value of this: " + $(this).data("choice"));

            // testing an option to highlighting selected choice
            // testting with fadeTo, select something better than fadeTo
            // easy way change all onclick of any of them, then rewrite the selected one
            for (i = 0; i < 4; i++) {
                $(".answ" + i).css("border-color", "blue").css("color", "blue").fadeTo(100, 0.7).css("font-size", "1em");
            }
            // rewriting property for selected one
            $(this).css("border-color", "red").css("color", "#2CE823").fadeTo(100, 1).css("font-size", "1.2em");
            selected = $(this).data("choice");
            console.log("selected answer 'this is index " + selected + "'")

            // add button to submit and avoid waiting till time is up
        }); // end onclick

    } // end user choice

    // allow for change of answer while time is not over
    // add button to submit
    // compare to answer function


    // ************************************* compare to answer ************************************* //
    // was choice the correct one?
    function compare() {
        clearInterval(mainCount);
        main = false;
        // console.log("main value= " + main);
        // console.log("q is: "+ q);
        // console.log(pseudoIndex.length);
        // console.log(pseudoIndex);
        if (selected == correct) {
            console.log("correct");
            wins++;
            console.log("wins= " + wins)
            $("#inquiry").html("Well Done!");
            for (i = 0; i < 4; i++) {
                if (i != correct) {
                    $(".answ" + i).css("border-color", "blue").css("color", "blue").fadeTo(50, 0.1).css("font-size", "1em");
                } else { $(".answ" + i).css("text-shadow", "1px 1px blue") }
            } // end for loop
            if (pseudoIndex.length > 0) {
                countPre();
            } else {
                endGame = true;
                countPre();
            }
        } else {
            console.log("wrong");
            losses++;
            console.log("losses= " + losses)
                // $("#inquiry").html("wrong! Right answer is: " + library[q].answer);
            $("#inquiry").html("Nope! Right answer is: " + (correct + 1));

            console.log("correct value= " + correct);
            console.log("selected value= " + selected);
            for (i = 0; i < 4; i++) {
                if (i == correct) {
                    $(".answ" + i).css("border-color", "blue").css("color", "#2CE823").fadeTo(100, 1).css("font-size", "1.2em");
                } else if (i == selected) {
                    $(".answ" + i).css("border-color", "blue").css("color", "red").fadeTo(100, 1).css("font-size", "1em");
                } else {
                    $(".answ" + i).css("border-color", "blue").css("color", "blue").fadeTo(50, 0.1).css("font-size", "1em");
                }
            } // end for loop

            if (pseudoIndex.length > 0) {
                countPre();
            } else {
                endGame = true;
                countPre();
            }
        }
    } // end of compare



    // ************************************* notification ************************************* //

    function showStats() {
        clearInterval(delayPre)
        console.log("wins= " + wins);
        console.log("losses= " + losses);
        $("#inquiry").empty();
        $("#countDown").empty();
        $("#choices").empty();
        $("#choices").append('<p class="outcome">' + "Wins: " + wins + '</p>');
        $("#choices").append('<p class="outcome">' + "Losses: " + losses + '</p>');
        // $("#choices").append('<p class="again">' + "Play Again?" + '</p>');
        reset = true;
        wins = 0;
        losses = 0;
        endGame = false;
        console.log("reset back to: " + reset)
        $("#start").show();
    }


    // ************************************* start new game ************************************* //
    // button for start new game if player quits current game or game ends


}); // end document ready
