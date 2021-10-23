// answer upvote
let answerContainerDivs = document.getElementsByClassName("answer-container");
// console.log("wert", answerContainerDivs); // HTMLCollection

// answer upvote
let htmlCltnArray = Array.from(answerContainerDivs);
// console.log(htmlCltnArray);

// answer upvote
htmlCltnArray.forEach((ele) => {
    let ulScoreData = ele.children[0].children; // HtmlCollection of UL. array
    // console.log(ulScoreData);
    let upVoteQScore = ulScoreData[0];
    let downVoteQScore = ulScoreData[2];
    let middleLIQScore = ulScoreData[1];

    upVoteQScore.addEventListener("click", async() => {
        // middleLIQScore.innerHTML ---- object

        const answerId = upVoteQScore.id.split("-")[1];
        const res = await fetch(`/answers/${answerId}/upvote`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        // console.log(answerId);
        let answerUpScore = await res.json()
        middleLIQScore.innerHTML = answerUpScore.answerScore;
        // console.log("up vote score", answerUpScore.answerScore);



    });

    downVoteQScore.addEventListener("click", async() => {
        let count = middleLIQScore.innerHTML;
        count--;
        middleLIQScore.innerHTML = count;
    });

    //update voting database ---- answers.js



});
