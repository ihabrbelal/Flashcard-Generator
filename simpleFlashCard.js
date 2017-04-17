var SimpleCard = require("./cards.js");
var inquirer = require("inquirer");
var dataFile = require("./data.txt");
var fs = require("fs");
var correctCounter = 0;
var wrongCounter = 0;
var x = 0;


function start() {
    inquirer.prompt([{
        type: "list",
        name: "userChoice",
        message: "Would like to go for the quiz",
        choices: ["Yes I would like to take the quiz", "No, Thank I want to quit"]
    }]).then(function(choice) {
        if (choice.userChoice === "Yes I would like to take the quiz") {
            quiz('data.txt', x);
        } else {
            inquirer.prompt([{
                type: "list",
                name: "confirm",
                message: "Are you sure?",
                choices: ["Yes", "No"]
            }]).then(function(confirm) {
                if (confirm.confirm === "Yes") {
                    console.log("Thank you, welcome back any time")
                } else {
                    quiz("data.txt", x)
                }
            });
        }
    })
}

var quiz = function(dataFile, x) {

    fs.readFile(dataFile, "utf8", function(error, data) {

        var jsonContent = JSON.parse(data);

        if (x < jsonContent.length) {

            if (jsonContent[x].hasOwnProperty("front")) {

                var gameCard = new SimpleCard(jsonContent[x].front, jsonContent[x].back);
                var gameQuestion = gameCard.front;
                var gameAnswer = gameCard.back.toLowerCase();
            }

            inquirer.prompt([{
                name: "question",
                message: gameQuestion,
                validate: function(value) {

                    if (value.length > 0) {
                        return true;
                    }
                    return 'Please choose an answer, or (ctr+c) to quit';
                }

            }]).then(function(answers) {

                if (answers.question.toLowerCase().indexOf(gameAnswer) > -1) {
                    console.log('Correct!');
                    correctCounter++;
                    x++;
                    quiz(dataFile, x);
                } else {
                    gameCard.printAnswer();
                    wrongCounter++;
                    x++;
                    quiz(dataFile, x);
                }

            })

        } else {
            console.log('**************************************************')

            console.log('Thank you for taking the quiz', "\n Your result: ");
            console.log('\n correct: ', correctCounter, '\n wrong: ', wrongCounter);

            console.log('**************************************************', '\n')

            correctCounter = 0;
            wrongCounter = 0;
        }
    });
};
start();

// quiz('data.txt', x);
