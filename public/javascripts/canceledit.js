const canelButton = document.querySelector('#cancel-delete-button');

const createEditQuestionButton = (questionId) => {
  const editQuestionButton = document.createElement('button');
  editQuestionButton.id = 'edit-question-button';
  const editQuestionLink = document.createElement('a');
  editQuestionLink.href = `/questions/${questionId}/edit`;
  editQuestionLink.innerText = 'Edit Question';
  editQuestionButton.appendChild(editQuestionLink);
  return editQuestionButton;
};

const createDeleteQuestionButton = () => {
  const deleteQuestionButton = document.createElement('button');
  deleteQuestionButton.id = 'delete-question-button';
  deleteQuestionButton.innerText = 'Delete Question';
  return deleteQuestionButton;
};

canelButton.addEventListener('click', (event) => {
  const url = document.URL.split('/');
  const questionId = url[5];
  const buttonContainer = document.querySelector('.question-edit-buttons');
  const editQuestionButton = createEditQuestionButton(questionId);
  const deleteQuestionButton = createDeleteQuestionButton();
  buttonContainer.innerHTML = ``;
  buttonContainer.appendChild(editQuestionButton);
  buttonContainer.appendChild(deleteQuestionButton);
});
