async function fillMenuDiv() {
  let response = await fetch("/api/menu/all", {
    method: "GET",
  });

  let responseText = await response.text();

  menuDiv.innerHTML = responseText;
}

fillMenuDiv()