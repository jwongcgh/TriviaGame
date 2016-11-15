$(document).ready(function() {

                // ********************************* variables and library here ********************************* //

                var wins;
                var losses;
                var minutes = 1;   // current time allowance change below were pertinent. Is a minute too long?
                var time = 1;		// goes with minutes variable
                var seconds = 0;
                var q = 0;
                var selected;


                var library = {
                        "1": {
                            "quest": "this is question 1",
                            "answer": "2",
                            "choices": {
                                "0": "this is index 0",
                                "1": "this is index 1",
                                "2": "this is index 2",
                                "3": "this is index 3"
                            }
                        },
                        "2": {
                            "quest": "this is question 2",
                            "answer": "0",
                            "choices": {
                                "0": "this is index 0 q2",
                                "1": "this is index 1 q2",
                                "2": "this is index 2 q2",
                                "3": "this is index 3 q2"
                            }
                        },
                    } // library end


                // ********************************* creating divs for choices ********************************* //


                // ************************************* count down here ************************************* //
                // listen to start game button 
                // this is time count for 00:00 to be displayed

                $("#start").on("click", countPre); // here we wait for click, calls on countPre
                // countdown 1 shows to allow readyness of player
                // calls function to show up randomly selected question and corresponding choices
                function countPre() {
                    console.log("0" + minutes + ":" + "0" + seconds);
                    // var delayPre = setTimeOut(pickQuest(), 5000);    // time out is I wanted to just countdown
                    delayPre = setInterval(count, 1000); // first delay, instead of 5 s countdown, it will count every 1 s and dsiplay the countdown using time, calls function count
                } // end of countPre

                function count() {
                    time++;
                    // minute is set to last 1 seconds, change to 60 or seelcted time allowance when all working
                    // also minute variable is initialized at 1 min allowance to pick answer
                    if (time == 2) { // change 2 to 60 seconds for 1 min count
                        minutes--;
                        time = 1;
                    }

                    var seconds = 2 - time; // change 2 to 60 seconds for 1 min count
                    if (minutes < 0) {
                        pickQuest();
                    }

                    if (seconds < 10) {
                        seconds = "0" + seconds;
                    }
                    // if (minutes < 10) 
                    // { fix minutes display format for minutes > 9; not needed for this game though}
                    console.log("0" + minutes + ":" + seconds);

                } // end of function count

                // main countdown for player to pick answer


                // ************************************* Pick question ************************************* //

                // randomly select question and relevant choices
                // first: clear pre-game count down
                // second: pick question
                // third: display question
                // fourth: display main countdown, go to compare to answer
                function pickQuest() {
                    clearInterval(delayPre);
                    console.log("from time out 1");
                    q++; // question count
                    $("#choices").empty();
                    $("#inquiry").html(library[q].quest);
                    console.log(library[q].quest);

                    for (i = 0; i < 4; i++) {
                        console.log(library[q].choices[i]);
                        // creating divs for choices
                        var $answ = $("<div>");
                        $answ.addClass("answ");
                        $answ.addClass("answ" + i);
                        $answ.attr("data-choice", i);
                        $("#choices").append($answ);
                        $(".answ" + i).html(library[q].choices[i]);
                        } // end of for loop
                        console.log("go to listen to click choice aka userChoice")
                        userChoice();
                    
                } // end of pickQuest

                    // stop: function(){
                    //        clearInterval(counter);
                    //    },

                    // remove question and choices pair from library
                    // keep track of number of times this was accessed
                    // keep track of length of library, call on end game function
                    // call on click event here



                    // ************************************* on click event here ************************************* //
                    // listen to click 

                    function userChoice() {
                        console.log("inside userChoice function");
                        console.log("correct answer is: " + library[q].answer);

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
                        }); // end onclick

                        // $(".answ").on("click", function() {
                        // var selected = ($(this).data("choice"));
                        // console.log("choice= " + selected);
                        // if (selected == library[1].answer) {
                        // 	console.log("correct");
                        // } else {
                        // 	console.log("wrong");
                        // }
                        // update user choice here
                        // var choice = the ine user clicked;

                        // });
                    } // end user choice

                    // allow for change of answer while time is not over
                    // add button to submit
                    // compare to answer function


                    // ************************************* compare to answer ************************************* //
                    // was choice the correct one?
                    // if yes, show congrats! Pause here for a short pause before next question.
                    // if empty or wrong choice, show wrong!, show corrrect answer, a short pause before next question
                    // keep track of wins and losses
                    // retreive new question

                    // ************************************* end game ************************************* //
                    // show stats: wins, losses
                    // show "start new game" button


                    // ************************************* start new game ************************************* //
                    // button for start new game if player quits current game or game ends


                }); // end document ready