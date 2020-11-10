'use strict';

const $run = document.getElementById('run');
const $input_fizz = document.getElementById('input-fizz');
const $input_buzz = document.getElementById('input-buzz');
const $answer = document.getElementById('answer');

const resetResult = () => {
  while ($answer.firstChild) {
    $answer.removeChild($answer.firstChild);
  }
}

const judgeInteger = () => {
  if($input_fizz.value.match(/^([1-9]\d*|0)$/) && $input_buzz.value.match(/^([1-9]\d*|0)$/)) {
    return cauculateNumber();
  } else {
    return outputResult('整数値を入力してください');
  }
}

const cauculateNumber = () => {
  let index = 1;
  while (index < 100) {
    if (index % $input_fizz.value === 0 && index % $input_buzz.value === 0) {
      outputResult(`FizzBuzz: ${index}`);
    } else if (index % $input_fizz.value === 0) {
      outputResult(`Fizz: ${index}`);
    } else if (index % $input_buzz.value === 0) {
      outputResult(`Buzz: ${index}`);
    }
    index++;
  }
}

const outputResult = (name) => {
  const $ans_text = document.createTextNode(name);
  const $add_p = document.createElement("p");
  $add_p.appendChild($ans_text);
  $answer.appendChild($add_p);
}

$run.onclick = function() {
  resetResult();
  judgeInteger();
};