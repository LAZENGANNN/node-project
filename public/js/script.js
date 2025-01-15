
//отпраляет запрос за карточкаи продуктов и добваляет их на страницу
async function getAllProds() {
  const response = await fetch("/api/menu/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let responseText = await response.text();

  resultDiv.innerHTML = responseText;
}

getAllProds();

const menuButton = document.getElementById("menuButton");

console.log(menuButton);

menuButton.addEventListener("click", () => {
  window.location = "/menu";
});

