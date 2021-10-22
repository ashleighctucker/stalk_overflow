const fetchQuestion = async (id) => {
  const res = await fetch(`http://localhost:8080/questions/${id}`);
  const { question } = await res.json();
  const questionContainer = document.querySelector('.questions-section');
  const questionHeader = `
    <ul class="questions-header">
        <li> <h2 class="questions-title"> ${question.title} </h2> </li>
        <li> <button type="submit" class="ask-question-button"> <a href='/'> Ask a Question </a> </button> </li>
    </ul>
  `;
  const questionBody = `
        <div class="question-container">
            <ul class="score-data">
                <li class="question-score"> <a id="upvote"><i class="fas fa-chevron-up"></i></a></li>
                <li class="question-score"> ${
                  question.questionScore ? question.questionScore : 0
                } </li>
                <li class="question-score"> <a id="downvote"><i class="fas fa-chevron-down"></i></a></li>
            </ul>
            <div class="curr-question-section">
                <p> ${question.question} </p>
            </div>
        </div>
                `;

  const knowSomebodySection = `
    <div class="know-container">
      <div class="know-section">
        <p> Know someone who can answer? Share a link to this <a class="know-link" href="/questions/view/${id}">question</a>!</p>
      </div>
    </div>`;

  const answersSection = `
    <div class="know-container">
      <div class="know-section">
        <p>${question.Answers.length} Answers</p>
      </div>
    </div>
  `;

  let pageHtml = questionHeader.concat(questionBody);
  if (question.Answers.length === 0) {
    pageHtml = pageHtml.concat(knowSomebodySection);
  } else {
    pageHtml = pageHtml.concat(answersSection);
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
