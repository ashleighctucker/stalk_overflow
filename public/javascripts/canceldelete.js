const canelButton = document.querySelector('#question-button-2');

const createEditQuestionButton = (id, target, Target) => {
  const buttonContainer = document.querySelector('#question-button-1');
  const editQuestionButton = document.createElement('button');
  editQuestionButton.id = `edit-${target}-button`;
  editQuestionButton.className = 'login-button';
  const editQuestionLink = document.createElement('a');
  if (target === 'questions') {
    editQuestionLink.href = `/questions/${id}/edit`;
  } else if (target === 'answers') {
    editQuestionLink.href = `/answers/${id}/edit`;
  }
  editQuestionLink.innerText = `Edit ${Target}`;
  buttonContainer.innerHTML = ``;
  buttonContainer.appendChild(editQuestionButton);
  editQuestionButton.appendChild(editQuestionLink);
  return buttonContainer;
};

const createDeleteQuestionButton = (target, Target) => {
  const buttonContainer = document.querySelector('#question-button-2');
  const deleteButton = document.createElement('button');
  deleteButton.id = `delete-${target}-button`;
  deleteButton.innerText = `Delete ${Target}`;
  deleteButton.className = 'login-button';
  buttonContainer.innerHTML = ``;
  buttonContainer.appendChild(deleteButton);
  return buttonContainer;
};

canelButton.addEventListener('click', (event) => {
  let targetElement = event.target;
  let selector = '#cancel-delete-questions-button';
  console.log('here', targetElement.matches(selector));
  if (targetElement.matches(selector)) {
    const url = document.URL.split('/');
    const questionId = url[5];
    const buttonContainer = document.querySelector('.question-edit-buttons');
    const editQuestionButton = createEditQuestionButton(
      questionId,
      'question',
      'Question'
    );
    const deleteQuestionButton = createDeleteQuestionButton(
      'question',
      'Question'
    );
    buttonContainer.innerHTML = ``;
    buttonContainer.appendChild(editQuestionButton);
    buttonContainer.appendChild(deleteQuestionButton);
  }
});

canelButton.addEventListener('click', (event) => {
  let targetElement = event.target;
  let selector = '#cancel-delete-answers-button';
  if (targetElement.matches(selector)) {
    const url = document.URL.split('/');
    const questionId = url[5];
    const buttonContainer = document.querySelector('.question-edit-buttons');
    const editQuestionButton = createEditQuestionButton(
      questionId,
      'answers',
      'Answer'
    );
    const deleteQuestionButton = createDeleteQuestionButton(
      'answers',
      'Answer'
    );
    buttonContainer.innerHTML = ``;
    buttonContainer.appendChild(editQuestionButton);
    buttonContainer.appendChild(deleteQuestionButton);
  }
});
