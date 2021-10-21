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
                <li class="question-score"> ${
                  question.questionScore ? question.questionScore : 0
                } </li>
            </ul>
            <div class="curr-question-section">
                <p> ${question.question} </p>
            </div>
        </div>
                `;

  questionContainer.innerHTML = questionHeader.concat(questionBody);
};

document.addEventListener('DOMContentLoaded', async (event) => {
  try {
    await fetchQuestion(3);
  } catch (err) {
    console.log(err);
  }
});
