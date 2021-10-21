window.addEventListener('load', async (event) => {
  //to do make sure they are logged in!!!
  const res = await fetch('http://localhost:8080/questions');
  const { questions } = await res.json();

  const questionContainer = document.querySelector('#questions-section');
  const questionsHeader = `
    <ul id="questions-header">
        <li> <h2 class="questions-title"> Top Questions </h2> </li>
        <li> <button type="submit" class="ask-question-button"> <a href='/'> Ask a Question </a> </button> </li>
    </ul>
  `;
  const questionsHTML = questions.map((question) => {
    return `
        <div class="questions-container">
            <ul class="question-data">
                <li class="question-answers-number"> ${question.Answers.length} </li>
                <li class="question-answer-title"> answers </li>
            </ul>
            <ul class="question-section">
                <li class="question-link"> <a href="/"> ${question.title} </a> </li>
                <li class="question-categories">
                    <span class="question-category-link"> <a href="/"> category </a> </span>
                    <span class="question-category-link"> <a href="/"> category </a> </span>
                    <span class="question-category-link"> <a href="/"> category </a> </span>
                </li>
            </ul>
        </div>
                `;
  });

  questionsHTML.unshift(questionsHeader);
  questionContainer.innerHTML = questionsHTML.join('');
});
