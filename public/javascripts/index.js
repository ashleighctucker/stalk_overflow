window.addEventListener('load', async (event) => {
  const res = await fetch('http://localhost:8080/questions');
  const questionContainer = document.querySelector('#questions-section');
  console.log(questions);
});
