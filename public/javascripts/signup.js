const fetchLogin = async () => {
  const res = await fetch("http://localhost:8080/login");
};

window.addEventListener("DOMContentLoaded", (event) => {
  let formButton = document.querySelectorAll(".user-form-button");

  formButton.addEventListener("click", async (event) => {
    if (container.includes)
      document.querySelectorAll("#sign-up-form").className = "error-sign-up-form";
  });
});
