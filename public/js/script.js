async function getAll() {
  const response = await fetch("/api/menu/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let responseText = await response.text();

  resultDiv.innerHTML = responseText;
}

getAll();

const menuButton = document.getElementById("menuButton");

console.log(menuButton);

menuButton.addEventListener("click", () => {
  window.location = "/menu";
});

// async function sendPOSTfromCard(){

//   const response = await fetch("/api/order/send", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

// }
