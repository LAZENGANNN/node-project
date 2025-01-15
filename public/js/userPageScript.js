
//отправляет запрос чтобы выйти из аккаунта
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

b1.addEventListener("click", ()=>{
  window.location = `http://localhost:7777/user/general`
})

b2.addEventListener("click", ()=>{
  window.location = `http://localhost:7777/user/story`
})
