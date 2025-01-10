async function logOut() {
  const response = await fetch("/api/user/logOut", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let responseText = await response.text();

  alert(responseText);
  window.location = "/user/register"
}

document.getElementById("logOutButton").addEventListener("click", () => {
    logOut()
});
