const deleteQuestionButton = document.querySelector('#delete-question-button');

const createConfirmDeleteButton = (questionId) => {
  const confirmDeleteButton = document.createElement('button');
  confirmDeleteButton.className = 'login-button';
  confirmDeleteButton.id = 'confirm-delete-button';
  const deleteLink = document.createElement('a');
  deleteLink.href = `/questions/delete/${questionId}`;
  deleteLink.innerText = 'Confirm Delete';
  confirmDeleteButton.appendChild(deleteLink);
  return confirmDeleteButton;
};

deleteQuestionButton.addEventListener('click', async (event) => {
  const url = document.URL.split('/');
  const questionId = url[5];
  const buttonContainer = document.querySelector('.question-edit-buttons');
  const confirmDeleteButton = createConfirmDeleteButton(questionId);
});
