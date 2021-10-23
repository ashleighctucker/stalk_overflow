const deleteQuestionButton = document.querySelector('#delete-question-button');

const createConfirmDeleteButton = (questionId) => {
  const deletePost = document.createElement('form');
  deletePost.action = `/questions/delete/${questionId}`;
  deletePost.method = 'POST';
  const confirmDeleteButton = document.createElement('input');
  confirmDeleteButton.type = 'submit';
  confirmDeleteButton.name = 'confirm-delete-button';
  confirmDeleteButton.className = 'login-button';
  confirmDeleteButton.value = 'Confirm Delete';
  deletePost.appendChild(confirmDeleteButton);
  return deletePost;
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
