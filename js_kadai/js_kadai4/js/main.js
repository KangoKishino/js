'use strict';

const url = 'https://opentdb.com/api.php?amount=10&type=multiple';
const title = document.getElementById('title');
const question = document.getElementById('question');
const start = document.getElementById('start');

start.addEventListener('click', () => {
    title.textContent = '取得中';
    question.textContent = '少々お待ちください';
    start.style.display = 'none';
    runQuestion();
});

const runQuestion = () => {
    fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setTimeout(() => {
                new Create(data);
            }, 3000)
        })
        .catch(error => {
            console.error(error);
        });
}

class Create {
    constructor(data) {
        this.data = data;
        this.answer_count = 0;
        this.round = 0;
        this.quiz_status = document.getElementById('quiz-status');
        this.answer_button = document.getElementById('answer-button');
        this.createQuestion();
    }

    createQuestion() {
        this.clearQuestion();
        this.displayQuestion(this.data);
    }

    clearQuestion(){
        while (this.quiz_status.firstChild) {
            this.quiz_status.removeChild(this.quiz_status.firstChild);
        }
        while (this.answer_button.firstChild) {
            this.answer_button.removeChild(this.answer_button.firstChild);
        }
    }
    
    displayQuestion() {
        title.innerHTML = `問題${this.round + 1}`;
        const make_category = document.createElement('h3');
        make_category.textContent = `[ジャンル]${this.data.results[this.round].category}`;
        this.quiz_status.appendChild(make_category);
        const make_difficulty = document.createElement('h3');
        make_difficulty.textContent = `[難易度]${this.data.results[this.round].difficulty}`;
        this.quiz_status.appendChild(make_difficulty);
        question.innerText = this.data.results[this.round].question;
        this.createAnswerList();
    }

    createAnswerList() {
        let question_choice = '';
        let question_choices = this.data.results[this.round].incorrect_answers;
        question_choices.push(this.data.results[this.round].correct_answer);
        for (let i = 0; i < 4; i++) {
            question_choice = question_choices.splice(Math.floor(Math.random() * question_choices.length), 1)[0];
            const make_button = document.createElement('button');
            make_button.textContent = `${question_choice}`;
            this.answer_button.appendChild(make_button);
            make_button.addEventListener('click', (event) => {
                this.judgeAnswer(event);
            });
        }
    }

    judgeAnswer(event) {
        if (this.data.results[this.round].correct_answer === event.target.textContent) {
            this.answer_count++;
        }
        this.round++;
        if (this.round < 10) {
            this.createQuestion(this.data);
        } else {
            this.outputFinalResult();
        }
    }

    outputFinalResult() {
        this.clearQuestion();
        title.textContent = `あなたの正答数は${this.answer_count}です！！`;
        question.textContent = '再度チャレンジしたい場合は以下をクリック！！';
        const make_button = document.createElement('button');
        make_button.textContent = 'ホームに戻る';
        this.answer_button.appendChild(make_button);
        make_button.addEventListener('click', () => {
            title.textContent = 'ようこそ';
            question.textContent = '以下のボタンをクリック';
            make_button.style.display = 'none';
            start.style.display = 'block';
        });
    }
}
