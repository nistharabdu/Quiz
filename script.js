import { question } from './question.js';

var submitBtn = document.querySelector('.submitBtn');
var quizScreenQuestion  = document.querySelector('.quiz-screen__question');
var quizScreenAnswer  = document.querySelector('.quiz-screen__answer');
var successScreen =  document.querySelector('.success-screen');
var playAgain = document.querySelector('.playAgain');
var correctAnswerEle = document.querySelector('.correct-answer');
var wrongAnswerEle = document.querySelector('.wrong-answer');
var scoreEle = document.querySelector('.score');

var qIndex = 1;
var correctAnswerCount = 0;
var wrongAnswerCount = 0;
var score = 0;
console.log(question)


submitBtn.addEventListener('click',function(event){
    if(!checkRadioBtns(qIndex)){
        alert('Please choose an answer')
    }
    else{
        qIndex++;
        showQuestion(qIndex);
    }
});

function checkRadioBtns(ind){
    var selectedAnswer;
    var isSelected = false;
    const radioButtons = document.querySelectorAll('input[name="answer"]');
    var correctAnswer; 
    question[ind-1].answers.forEach(function(eachAnswer){
        if(eachAnswer.isCorrect){
            correctAnswer = eachAnswer.answer;
        }
    });
    radioButtons.forEach(function(eachRadioBtn){
        if(eachRadioBtn.checked){
            isSelected = true;
            selectedAnswer = eachRadioBtn.value;
            if(correctAnswer == selectedAnswer){
                correctAnswerCount++;
            }
            else{
                wrongAnswerCount++;
            }
        }
    })
    return isSelected;
}

playAgain.addEventListener('click',function(){
    successScreen.classList.remove('active');
    correctAnswerCount = 0;
    wrongAnswerCount = 0;
    score = 0;
    showQuestion(1);
});

function showQuestion(ind){
    quizScreenQuestion.innerHTML = "";
    quizScreenAnswer.innerHTML = "";
    if(ind<=question.length){
        quizScreenQuestion.innerHTML = question[ind-1].question;
        question[ind-1].answers.forEach(function(ele){
            var eachInput = document.createElement('div');
            eachInput.classList.add('quiz-screen__answer__each');
            eachInput.innerHTML  = '<input type="radio" name="answer" value="'+ele.answer+'" /> <span>'+ele.answer+'</span>';
            quizScreenAnswer.append(eachInput);
        });
    }else{
        qIndex = 1;
        showSuccessScreen();
    }

}

function showSuccessScreen(){
    correctAnswerEle.innerHTML = 'Correct answer: <span>'+correctAnswerCount+'</span>';
    wrongAnswerEle.innerHTML = 'Wrong answer: <span>'+wrongAnswerCount+'</span>';
    scoreEle.innerHTML = 'Score: <span>'+correctAnswerCount*5+'</span>';
    successScreen.classList.add('active');
}

showQuestion(qIndex);
