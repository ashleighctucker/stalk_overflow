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

const createCancelButton = () => {
  const cancelButton = document.createElement('button');
  cancelButton.className = 'login-button';
  cancelButton.id = 'cancel-delete-button';
  cancelButton.innerText = 'Cancel';
  return cancelButton;
};

deleteQuestionButton.addEventListener('click', async (event) => {
  const url = document.URL.split('/');
  const questionId = url[5];
  const buttonContainer = document.querySelector('.question-edit-buttons');
  const confirmDeleteButton = createConfirmDeleteButton(questionId);
  const cancelButton = createCancelButton();
  buttonContainer.innerHTML = ``;
  buttonContainer.appendChild(confirmDeleteButton);
  buttonContainer.appendChild(cancelButton);
});
