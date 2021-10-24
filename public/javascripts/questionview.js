const deleteButton = document.querySelector('#question-button-2');

const createConfirmDeleteButton = (id, target) => {
  const buttonContainer = document.querySelector('#question-button-1');
  const deletePost = document.createElement('form');
  deletePost.action = `/${target}/delete/${id}`;
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

const createCancelButton = (id, target) => {
  const buttonContainer = document.querySelector('#question-button-2');
  const cancelButton = document.createElement('button');
  cancelButton.classList.add(`cancel-delete-${target}-button`, 'login-button')
  cancelButton.id = `${id}-cancel-delete-${target}-button`;
  cancelButton.innerText = 'Cancel';
  buttonContainer.innerHTML = ``;
  buttonContainer.appendChild(cancelButton);
  return buttonContainer;
};

//deleting questions
deleteButton.addEventListener('click', (event) => {
  let targetElement = event.target;
  let selector = '#delete-question-button';
  if (targetElement.matches(selector)) {
    const url = document.URL.split('/');
    const questionId = url[5];
    const buttonContainer = document.querySelector('.question-edit-buttons');
    const confirmDeleteButton = createConfirmDeleteButton(
      questionId,
      'questions'
    );
    const cancelButton = createCancelButton(questionId, 'questions');
    const formDiv = document.createElement('div');
    formDiv.className = 'confirm-delete-container';
    formDiv.appendChild(confirmDeleteButton);
    formDiv.appendChild(cancelButton);
    buttonContainer.innerHTML = ``;
    buttonContainer.appendChild(formDiv);
  }
});

//deleting answers
deleteButton.addEventListener('click', (event) => {
  let targetElement = event.target;
  let selector = '.delete-answer-button';
  if (targetElement.matches(selector)) {
    const answerId = parseInt(targetElement.id.split('-')[0], 10);
    const buttonContainer = document.querySelector('.question-edit-buttons');
    const confirmDeleteButton = createConfirmDeleteButton(answerId, 'answers');
    const cancelButton = createCancelButton(answerId, 'answers');
    const formDiv = document.createElement('div');
    formDiv.className = 'confirm-delete-container';
    formDiv.appendChild(confirmDeleteButton);
    formDiv.appendChild(cancelButton);
    buttonContainer.innerHTML = ``;
    buttonContainer.appendChild(formDiv);
  }
});

