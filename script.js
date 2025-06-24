let table = document.getElementById("table");

let body = document.createElement("tbody");
body.id = "output";

body.innerHTML = `<tr id="loading">
  <td colspan="2">Loading...</td>
</tr>`;

table.appendChild(body);

function randomPromise(index) {
  const delay = Math.floor(Math.random() * 2000 + 1000); // 1000–3000ms
  return new Promise((resolve) => {
    setTimeout(() => {
      const time = delay / 1000; // keep raw float value
      resolve({ index, time });
    }, delay);
  });
}

const promise1 = randomPromise(1);
const promise2 = randomPromise(2);
const promise3 = randomPromise(3);

Promise.all([promise1, promise2, promise3]).then((result) => {
  body.innerHTML = ""; // Clear "Loading..."

  // Render each promise row with rounded time
  result.forEach(({ index, time }) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>Promise ${index}</td>
      <td>${Math.round(time)}</td>
    `;
    body.appendChild(row);
  });

  // Compute precise max time
  const maxTime = Math.max(...result.map(r => r.time)).toFixed(3);

  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td>Total</td>
    <td>${maxTime}</td>
  `;
  body.appendChild(totalRow);
});