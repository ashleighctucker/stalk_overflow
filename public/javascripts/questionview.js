const fetchQuestion = async (id) => {
  const res = await fetch(`http://localhost:8080/questions/${id}`);
  const { question } = await res.json();
  const questionContainer = document.querySelector('.questions-section');
  //creates the header for the question page
  const questionHeader = `
    <ul class="questions-header">
        <li> <h2 class="questions-title"> ${question.title} </h2> </li>
        <li> <button type="submit" class="ask-question-button"> <a href='/'> Ask a Question </a> </button> </li>
    </ul>
  `;
  //creates the body for the question div
  const questionBody = `
        <div class="question-container">
            <ul class="score-data">
                <li class="question-score"> <a id="question-upvote" class="upvote"><i class="fas fa-chevron-up"></i></a></li>
                <li class="question-score"> ${
                  question.questionScore ? question.questionScore : 0
                } </li>
                <li class="question-score"> <a id="question-downvote" class="downvote"><i class="fas fa-chevron-down"></i></a></li>
            </ul>
            <div class="curr-question-section">
                <p> ${question.question} </p>
            </div>
        </div>
                `;

  //if there are no answers, this will render
  const knowSomebodySection = `
    <div class="know-container">
      <div class="know-section">
        <p> Know someone who can answer? Share a link to this <a class="know-link" href="/questions/view/${id}">question</a>!</p>
      </div>
    </div>`;

  //says how many answers there are, if there are more than 0
  const answersSection = `
    <div class="know-container">
      <div class="know-section">
        <p>${question.Answers.length} Answers</p>
      </div>
    </div>
  `;

  // creates divs with up/down buttons for each answer
  let answerHTML = [];
  question.Answers.forEach((answer) => {
    let answerBody = `
        <div class="answer-container">
            <ul class="score-data">
                <li class="question-score"> <a id="answer-${
                  answer.id
                }-upvote" class="upvote"><i class="fas fa-chevron-up"></i></a></li>
                <li class="question-score"> ${
                  answer.answerScore ? answer.answerScore : 0
                } </li>
                <li class="question-score"> <a id="question-${
                  answer.id
                }-downvote" class="downvote"><i class="fas fa-chevron-down"></i></a></li>
            </ul>
            <div class="curr-question-section">
                <p> ${answer.title} </p>
                <p> ${answer.answer} </p>
            </div>
        </div>
                `;
    answerHTML.push(answerBody);
  });
  answerHTML = answerHTML.join('');

  let pageHtml = questionHeader.concat(questionBody);
  //if there are no answers render the know someone section, otherwise render answers section
  if (question.Answers.length === 0) {
    pageHtml = pageHtml.concat(knowSomebodySection);
  } else {
    pageHtml = pageHtml.concat(answersSection).concat(answerHTML);
  }
  questionContainer.innerHTML = pageHtml;
};

document.addEventListener('DOMContentLoaded', async (event) => {
  const url = document.URL.split('/');

  try {
    await fetchQuestion(url[5]);
  } catch (err) {
    console.log(err);
  }
});
