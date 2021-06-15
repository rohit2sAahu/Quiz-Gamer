// Global Variables

const submit = document.querySelector('#form'); //Submit Form
const questionContainer = document.querySelector('.questionContainer'); // container div surrounding each question

const totalQuestions = document.querySelector('.score--total'); // span to input total number of questions
let   scoreChange = document.querySelector('.score--change'); // span to show current score
const totalQuestions1 = document.querySelector('.score--total1'); // span to input total number of questions
let   scoreChange1 = document.querySelector('.score--change1'); // span to show current score
const totalQuestions2 = document.querySelector('.score--total2'); // span to input total number of Correct questions
let   scoreChange2 = document.querySelector('.score--change2'); // span to show current total Correct Question score

const winner = document.querySelector('.winner'); // winner screen including play again buttons
const replayBtn = document.querySelector('.btn--yes'); // play again button
const playerName = document.querySelector('.player'); // close app button



submit.addEventListener('submit', function(e){
    e.preventDefault();
   
    getMeSomeQuestions();
    quizControls.style.display = 'none';

    
});

// the function to get the Question by fetching API From Hackerrank API

function getMeSomeQuestions(){
    
    const url = `https://jsonmock.hackerrank.com/api/questions`;

    // API Call (fetch)
    const fetchQuestionsAwait = async () => {
        const response = await fetch(url)
        // Converting the data to JSON
        const get = await response.json();
        
        createQuestions(get.data);
        // console.log(get.data);
    
    }
    
    fetchQuestionsAwait();
}



// function of Creating and appending question divs - questions variable is the json results
function createQuestions(questions){

    // Clear Previous Questions from questionContainer - so that divs don't stack on reload
    questionContainer.innerHTML = null;

    // Create new questions within the page.------------->
    questions.forEach((question, index) => {
        // here we create the answer by putting the option into the array and then returning the array 
        // with the answer-------------->

        var answers = createAnswers(question);
        questionContainer.innerHTML += 
        `<div class='question question${index + 1}'>
            <h2>Question ${index + 1}</h2>
            <h3>${question.question}</h3>
            <div class='answers ${index + 1}'>
                <p class='answer'>${answers[0]}</p>
                <p class='answer'>${answers[1]}</p>
                <p class='answer'>${answers[2]}</p>
                <p class='answer'>${answers[3]}</p>
            </div>
        </div>`;
        
    });
    
    // Add an Event Listener to all question elements and controls styles.
    selectAnswer(questions);
    
    // Display Question 1
    document.querySelector('.question1').style.display = 'block';
    
};

// this function is resposible to create the option for the given question --->
function createAnswers(answers){
    var answer = [];
    answer.push(answers.options[0]);
    answer.push(answers.options[1]);
    answer.push(answers.options[2]);
    answer.push(answers.options[3]);
    
    return answer;
}


// Selecting an answer
function selectAnswer(questions){
    // selects all answer elements
    var selector = document.querySelectorAll('.answer');
    // starts score at 0
    let yourScore = 0;
    var count=0;
    initializeScore(questions, yourScore);

    for(let i = 0; i < selector.length; i++){
        selector[i].addEventListener('mousedown', function(e){
        
        let correctAnswer = questions[e.target.parentNode.classList[1] - 1].answer;
                // console.log(questions[e.target.parentNode.classList[1] - 1].answer);
                
                console.log(`Correct answer is : ${correctAnswer}`);
                
                // console.log(`target Index : ${document.getElementById('answer').indexOf(e.target)}`);

                var chr=e.target.innerText.charCodeAt(0)-97;

                if(chr === correctAnswer){
                    // changes color to green if answer is correct
                    e.target.style.backgroundColor = '#66ff63';
                    yourScore += 10;
                    count+=1;
                    // insert updated score - converted to string for assignment
                    scoreChange.innerText = yourScore.toString();
                    scoreChange2.innerText=count.toString();

                    //  this function is help to prevent the next question to get come out fast Timeout functions stop next question from displaying too quickly.
                    // They hide the current question and display the next question in the sequence
                    setTimeout(function(){
                        if(e.target.parentElement.parentElement.nextElementSibling !== null){
                            e.target.parentElement.parentElement.style.display = 'none';
                            e.target.parentElement.parentElement.nextElementSibling.style.display = 'block'; 
                        } else{
                            e.target.parentElement.parentElement.style.display = 'none';
                            winner.style.display = 'block';
                        } 
                    
                    }, 1000);
                } else{
                    // answer turns red if incorrect
                    e.target.style.backgroundColor = '#ff6666'; 
                    
                    // Show the correct answer if you get an answer wrong
                    selector.forEach(function(selection){
                        if(selection.innerText === correctAnswer){
                            selection.style.backgroundColor = '#66ff63';
                        }
                    });
                    setTimeout(function(){
                        if(e.target.parentElement.parentElement.nextElementSibling !== null){
                            e.target.parentElement.parentElement.style.display = 'none';
                            e.target.parentElement.parentElement.nextElementSibling.style.display = 'block'; 
                        } else{
                            e.target.parentElement.parentElement.style.display = 'none';
                            winner.style.display = 'block';
                        } 
                    
                    }, 1000);
                };
            
        });
    }
}


// Initializes the score for each new game
function initializeScore(questions, yourScore){
   let totalScore = questions.length;
   totalQuestions.innerText = totalScore*10; 
   totalQuestions1.innerText = totalScore; 
   totalQuestions2.innerText = totalScore; 
    

   scoreChange.innerText = yourScore;
   scoreChange1.innerText = questions.length;
   scoreChange2.innerText = yourScore;
   
}


// Asking from player if they really want to leave the application depending on their confirmation display the message!! 
function confirmClose(){
    let msg = "Are you sure you don't want to play?";
    if(confirm(msg)){
        winner.innerHTML = `
        <h1>Bye Bye</h1>
        <h2>Thank You For Playing</h2>`
    }; 
}