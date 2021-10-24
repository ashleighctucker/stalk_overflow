let answerContainerDivs = document.getElementsByClassName("answer-container");
let answerHTMLCltnArray = Array.from(answerContainerDivs);

answerHTMLCltnArray.forEach((ele) => {
  let ulScoreData = ele.children[0].children;
  let answerUpVoteBtnLi = ulScoreData[0];
  let middleLITxtScore = ulScoreData[1];
  let answerDownVoteBtnLi = ulScoreData[2];

  // Answer Up vote
  answerUpVoteBtnLi.addEventListener("click", async () => {
    const answerId = answerUpVoteBtnLi.id.split("-")[1]; // from first LI's id middle ---- ${answer.id}

    const res = await fetch(`/answers/${answerId}/upvote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let answerUpScore = await res.json();
    middleLITxtScore.innerHTML = answerUpScore.answerScore;
  });

  // Answer Down vote
  answerDownVoteBtnLi.addEventListener("click", async () => {
    const answerId2 = answerDownVoteBtnLi.id.split("-")[1];

    const res = await fetch(`/answers/${answerId2}/downvote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let answerDownScore = await res.json();
    middleLITxtScore.innerHTML = answerDownScore.answerScore;
  });
});
