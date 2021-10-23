// answer upvote
let answerContainerDivs = document.getElementsByClassName("answer-container");
// console.log("wert", answerContainerDivs); // HTMLCollection
let answerHTMLCltnArray = Array.from(answerContainerDivs);
// console.log(answerHTMLCltnArray); // array

//

// ================================================================
// answer upvote
answerHTMLCltnArray.forEach((ele) => {
  let ulScoreData = ele.children[0].children; // HtmlCollection of UL. array
  // console.log(ulScoreData);
  let answerUpVoteBtnLi = ulScoreData[0]; // first LI (inside UL array)
  let middleLITxtScore = ulScoreData[1];  // 2nd LI
  let answerDownVoteBtnLi = ulScoreData[2]; // 3rd LI

  answerUpVoteBtnLi.addEventListener("click", async () => {
    // middleLITxtScore.innerHTML ---- object

    const answerId = answerUpVoteBtnLi.id.split("-")[1]; // from first LI's id ---- ${answer.id}

    const res = await fetch(`/answers/${answerId}/upvote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log("ytrd", answerId);
    let answerUpScore = await res.json();
    middleLITxtScore.innerHTML = answerUpScore.answerScore;
    // console.log("up vote score", answerUpScore.answerScore);
  });

  answerDownVoteBtnLi.addEventListener("click", async () => {
    // (BELOW) ---- without database
    // let count = middleLIBtnLi.innerHTML;
    // count--;
    // middleLIBtnLi.innerHTML = count;
    // ============================
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

  //update voting database ---- answers.js
});

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
