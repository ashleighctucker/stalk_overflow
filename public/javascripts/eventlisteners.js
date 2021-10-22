let inputTextSearch = document.querySelector(".search-bar");
let searchForm = document.querySelector(".search-form");
let searchButton = document.getElementsByClassName("search-bar-submit-button");

inputTextSearch.addEventListener("input", async (event) => {
    searchForm.action = `/search/${event.target.value}`;
    console.log(searchForm);
});
