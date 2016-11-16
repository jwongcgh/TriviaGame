$(document).ready(function() {

        // ********************************* variables and library here ********************************* //

        var wins = 0;
        var losses = 0;
        var minutes = 0; // current time allowance change below were pertinent. Is a minute too long?
        var time = 0; // goes with minutes variable
        var secs = 0;
        var q;
        var selected;
        var k = 0;
        var main = false;
        var start = false;
        var pseudoIndex = [];  // used for random selection of question
        var scrambled = [];
        var reset = true;   // used to reset array for random question selection
        var correct = "0"   // keeps track of correct answer since choices are randomized
                            // without scrambling of choices, right answer is always the first one

        var library = {
                "1": {
                    "quest": "kitties are not",
                    // "answer": "2",
                    "choices": {
                        "0": "doggies index 0",
                        "1": "this is index 1",
                        "2": "this is index 2",
                        "3": "this is index 3",
                        "test": "test",
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
        // interval countdown allows readyness of player and for main countdown event
        // calls function to show up randomly selected question and corresponding choices
        function countPre() {
            $("#start").hide(500, 0); // hiding start button, option to prevent another click after start
            console.log("reset values is: " + reset);
            if (reset) { pseudo(); }
            // console.log("0" + minutes + ":" + "0" + secs);
            $("#countDown").html("0" + minutes + ":" + "0" + secs);
            k = 0;
            secs = 4;       //  sets time wait before showing next word
            scrambled = []; // emptying array
            scramble();     // scrambles choices to be loaded in divs
            delayPre = setInterval(count, 1000);
        } // end of countPre

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
                if (!main) {
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
for (i=0; i < Object.keys(library).length; i++) {
            pseudoIndex.push(i+1);
        }
        console.log("pseudoIndex array: " + pseudoIndex);
    reset = false;
    console.log("reset value changed to: " + reset);
}   // end pseudo

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
        var choicesArr = [0,1,2,3];
        for (i=0; i<Object.keys(library[1].choices).length; i++) {
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
            secs = 4;   // sets time allowance for guess
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
                    $(".answ" + i).fadeTo(100, 0.2);
                }
                // rewriting property for selected one
                $(this).fadeTo(100, 1);
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
                $("#inquiry").html("correct!");
                if (pseudoIndex.length > 0) {
                    $("#choices").html("next in: ");
                    countPre(); 
                } else { showStats();}
            } else {
                console.log("wrong");
                losses++;
                // $("#inquiry").html("wrong! Right answer is: " + library[q].answer);
                $("#inquiry").html("wrong! Right answer is: " + correct);
                if (pseudoIndex.length > 0) {
                    $("#choices").html("next in: ");
                    countPre();
                } else {
                    showStats();
                }
            }
        

    } // end of compare


    // ************************************* notification ************************************* //

    function showStats() {
        console.log("wins= " + wins);
        console.log("losses= " + losses);
        wins = 0;
        losses = 0;
        reset = true;
        console.log("reset back to: " + reset)
        $("#start").show();
    }


    // ************************************* start new game ************************************* //
    // button for start new game if player quits current game or game ends


    }); // end document ready