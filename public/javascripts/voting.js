//* ANSWER Vote ---- SECTION

// answer vote UL
let answerContainerDivs = document.getElementsByClassName("answer-container");
// console.log("wert", answerContainerDivs); // HTMLCollection
let answerHTMLCltnArray = Array.from(answerContainerDivs);
// console.log(answerHTMLCltnArray); // array

// ================================================================
// answer vote - front end
// foreach ---- bc if there are more than ONE answers.
answerHTMLCltnArray.forEach((ele) => {
  let ulScoreData = ele.children[0].children; // HtmlCollection of UL. array
  // console.log(ulScoreData);
  let answerUpVoteBtnLi = ulScoreData[0]; // first LI (inside UL array)
  let middleLITxtScore = ulScoreData[1]; // 2nd LI
  let answerDownVoteBtnLi = ulScoreData[2]; // 3rd LI

  // Answer Up vote
  answerUpVoteBtnLi.addEventListener("click", async () => {
    // middleLITxtScore.innerHTML ---- object

    const answerId = answerUpVoteBtnLi.id.split("-")[1]; // from first LI's id middle ---- ${answer.id}

    const res = await fetch(`/answers/${answerId}/upvote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let answerUpScore = await res.json();
    console.log("ytrd", answerUpScore);
    middleLITxtScore.innerHTML = answerUpScore.answerScore;
    // console.log("up vote score", answerUpScore.answerScore);
  });

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  // Answer Down vote
  answerDownVoteBtnLi.addEventListener("click", async () => {
    // (BELOW) ---- without database
    // let count = middleLIBtnLi.innerHTML;
    // count--;
    // middleLIBtnLi.innerHTML = count;
    // ============================
    const answerId2 = answerDownVoteBtnLi.id.split("-")[1]; // from 3rd LI's id middle ---- ${answer.id}

    const res = await fetch(`/answers/${answerId2}/downvote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let answerDownScore = await res.json();
    middleLITxtScore.innerHTML = answerDownScore.answerScore;
  });

  //update both ANSWER voting database ---- answers.js
});

