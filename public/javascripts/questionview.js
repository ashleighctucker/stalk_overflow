const deleteQuestionButton = document.querySelector('#question-button-2');

const createConfirmDeleteButton = (questionId) => {
  const buttonContainer = document.querySelector('#question-button-1');
  const deletePost = document.createElement('form');
  deletePost.action = `/questions/delete/${questionId}`;
  deletePost.method = 'POST';
  const confirmDeleteButton = document.createElement('input');
  confirmDeleteButton.type = 'submit';
  confirmDeleteButton.name = 'confirm-delete-button';
  confirmDeleteButton.className = 'login-button';
  confirmDeleteButton.value = 'Confirm Delete';
  buttonContainer.innerHTML = ``;
  buttonContainer.appendChild(deletePost);
  deletePost.appendChild(confirmDeleteButton);
  return buttonContainer;
};

const createCancelButton = () => {
  const buttonContainer = document.querySelector('#question-button-2');
  const cancelButton = document.createElement('button');
  cancelButton.className = 'login-button';
  cancelButton.id = 'cancel-delete-button';
  cancelButton.innerText = 'Cancel';
  buttonContainer.innerHTML = ``;
  buttonContainer.appendChild(cancelButton);
  return buttonContainer;
};

deleteQuestionButton.addEventListener('click', (event) => {
  let targetElement = event.target;
  let selector = '#delete-question-button';
  if (targetElement.matches(selector)) {
    const url = document.URL.split('/');
    const questionId = url[5];
    const buttonContainer = document.querySelector('.question-edit-buttons');
    const confirmDeleteButton = createConfirmDeleteButton(questionId);
    const cancelButton = createCancelButton();
    const formDiv = document.createElement('div');
    formDiv.className = 'confirm-delete-container';
    formDiv.appendChild(confirmDeleteButton);
    formDiv.appendChild(cancelButton);
    buttonContainer.innerHTML = ``;
    buttonContainer.appendChild(formDiv);
  }
});