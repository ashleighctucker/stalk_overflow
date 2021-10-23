const canelButton = document.querySelector('#question-button-2');

const createEditQuestionButton = (questionId) => {
  const buttonContainer = document.querySelector('#question-button-1');
  const editQuestionButton = document.createElement('button');
  editQuestionButton.id = 'edit-question-button';
  editQuestionButton.className = 'login-button';
  const editQuestionLink = document.createElement('a');
  editQuestionLink.href = `/questions/${questionId}/edit`;
  editQuestionLink.innerText = 'Edit Question';
  buttonContainer.innerHTML = ``;
  buttonContainer.appendChild(editQuestionButton);
  editQuestionButton.appendChild(editQuestionLink);
  return buttonContainer;
};

const createDeleteQuestionButton = () => {
  const buttonContainer = document.querySelector('#question-button-2');
  const deleteQuestionButton = document.createElement('button');
  deleteQuestionButton.id = 'delete-question-button';
  deleteQuestionButton.innerText = 'Delete Question';
  deleteQuestionButton.className = 'login-button';
  buttonContainer.innerHTML = ``;
  buttonContainer.appendChild(deleteQuestionButton);
  return buttonContainer;
};

canelButton.addEventListener('click', (event) => {
  let targetElement = event.target;
  let selector = '#cancel-delete-button';
  if (targetElement.matches(selector)) {
    const url = document.URL.split('/');
    const questionId = url[5];
    const buttonContainer = document.querySelector('.question-edit-buttons');
    const editQuestionButton = createEditQuestionButton(questionId);
    const deleteQuestionButton = createDeleteQuestionButton();
    buttonContainer.innerHTML = ``;
    buttonContainer.appendChild(editQuestionButton);
    buttonContainer.appendChild(deleteQuestionButton);
  }
});
