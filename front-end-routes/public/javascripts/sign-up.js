import { handleErrors } from "./utils.js";

const signUpForm = document.querySelector(".sign-up-form");

signUpForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(signUpForm);
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const body = { email, username, password };
    console.log("fetch request is starting #1");
  try {
    const res = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        },

    });
    console.log("fetch request happened #2");
    if (!res.ok) {
      throw res;
    }
    const {
      user: { id },
    } = await res.json();
    // TODO ---- SESSION STORAGE

    // redirect to home page to see all tweets:
    window.location.href = "/";
  } catch (err) {
      handleErrors(err);
      console.log("fetch not happening");
  }
});
