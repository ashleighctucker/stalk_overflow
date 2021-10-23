window.addEventListener('load', (event) => {
    let container = document.querySelector("#search-result-container")
    let errorBox = document.querySelector("#content-container")
    let question = document.querySelector(".question-box-2");
    let center = document.querySelector(".center")
        if(!question){
            container.className = "search-result-error-container";
            container.innerHTML = `<div class="search-result-error">
                                    <div class="search-result-error-container>
                                      <div class="error-center">Oops, it appears there are no questions that match your search terms! Try another search...</div>
                                    </div>
                                </div>`;
            // errorBox.className = "search-result-error"
            // center.className = "error-center"
            // errorBox.innerText = "Oops, it appears there are no questions that match your search terms"
    }
})
