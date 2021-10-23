window.addEventListener('load', (event) => {
    let container = document.querySelector("#search-result-container")
    let question = document.querySelector(".question-box-2");
        if(!question){
            container.className = "search-result-error-container";
            container.innerHTML = `<div class="search-result-error">
                                    <div class="search-result-error-container>
                                      <div class="error-center">Oops, it appears there are no questions that match your search terms! Try another search...</div>
                                    </div>
                                </div>`;
    }
})
