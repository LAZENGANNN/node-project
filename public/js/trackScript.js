
//синхронизирует и отсчитывет время
async function timeCounter() {
  const response = await fetch("/api/order/time", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ a: window.location.search }),
  });

  let time = await response.text();
  console.log(time);
  let browserTime = time;

  let timerId = setTimeout(function tick() {
    //скрипт который должен повторится

    browserTime = browserTime - 1;
    console.log(browserTime);
    timerH3.innerText = ` оставшееся время:${browserTime}`;


    setTimeout(() => {
      timeCounter();
    }, 5 * 60 * 1000);
    //повтор
    if (time >= 1) {
      timerId = setTimeout(tick, 1000);
    } else {
      timerId = null;
    }
  }, 1000);
}

window.addEventListener("load", () => {
  timeCounter();
});

