const canelButton = document.querySelector('#question-button-2');

const createEditButton = (id, target, Target) => {
  const buttonContainer = document.querySelector('#question-button-1');
  const editQuestionButton = document.createElement('button');
  editQuestionButton.classList.add(`edit-${target}-button`, 'login-button');
  editQuestionButton.id = `${id}-edit`;
  const editQuestionLink = document.createElement('a');
  if (target === 'question') {
    editQuestionLink.href = `/questions/${id}/edit`;
  } else if (target === 'answer') {
    editQuestionLink.href = `/answers/${id}/edit`;
  }
  editQuestionLink.innerText = `Edit ${Target}`;
  buttonContainer.innerHTML = ``;
  buttonContainer.appendChild(editQuestionButton);
  editQuestionButton.appendChild(editQuestionLink);
  return buttonContainer;
};

const createDeleteButton = (id, target, Target) => {
  const buttonContainer = document.querySelector('#question-button-2');
  const deleteButton = document.createElement('button');
  deleteButton.id = `${id}-delete`;
  deleteButton.classList.add(`delete-${target}-button`, 'login-button');
  deleteButton.innerText = `Delete ${Target}`;
  buttonContainer.innerHTML = ``;
  buttonContainer.appendChild(deleteButton);
  return buttonContainer;
};

canelButton.addEventListener('click', (event) => {
  let targetElement = event.target;
  let selector = '.cancel-delete-questions-button';
  if (targetElement.matches(selector)) {
    const url = document.URL.split('/');
    const questionId = url[5];
    const buttonContainer = document.querySelector('.question-edit-buttons');
    const editQuestionButton = createEditButton(
      questionId,
      'question',
      'Question'
    );
    const deleteQuestionButton = createDeleteButton(
      questionId,
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
  let selector = '.cancel-delete-answers-button';
  if (targetElement.matches(selector)) {
    const answerId = targetElement.id.split('-')[0];
    const buttonContainer = document.querySelector('.question-edit-buttons');
    const editAnswerButton = createEditButton(answerId, 'answer', 'Answer');
    const deleteAnswerButton = createDeleteButton(answerId, 'answer', 'Answer');
    buttonContainer.innerHTML = ``;
    buttonContainer.appendChild(editAnswerButton);
    buttonContainer.appendChild(deleteAnswerButton);
  }
});
