let inputTextSearch = document.querySelector(".search-bar");
let searchForm = document.querySelector(".search-form");
let searchButton = document.getElementsByClassName("search-bar-submit-button");

inputTextSearch.addEventListener("input", async (event) => {
    // case Insensitive in the FRONT END
    let caseInsensitiveVal =event.target.value.toLowerCase();
    searchForm.action = `/search/${caseInsensitiveVal}`;
    console.log(event.target.value);
});
