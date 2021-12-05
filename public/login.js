const form = document.querySelector("form");
const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const invalidCredsMsg = document.getElementById("invalidCredsMsg");

function storeToken(token) {
  window.sessionStorage.setItem("token", token);
  window.location.assign("/class_list.html");
}

function login(event) {
  invalidCredsMsg.classList.replace("visible", "invisible");
  event.preventDefault();
  event.stopPropagation();
  const loginData = {
    username: usernameInput.value,
    password: passwordInput.value,
  };
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  fetch("/tokens/generate", { method: "POST", body: JSON.stringify(loginData), headers: headers })
    .then((response) => {
      if (!response.ok) {
        invalidCredsMsg.classList.replace("invisible", "visible");
      }
      return response.json()
    })
    .then((data) => storeToken(data.token));


}

form.addEventListener("submit", login);
