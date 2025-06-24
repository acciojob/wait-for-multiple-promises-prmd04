//your JS code here. If required.
let table = document.getElementById("table");

let body = document.createElement("tbody");
body.id = "output";

body.innerHTML = `<tr>
<td colspan=2>Loading...</td>
</tr>
`;

table.appendChild(body);

function randomPromise(index) {
  const delay = Math.floor(Math.random() * 2000 + 1000);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({index,time:(delay/1000).toFixed(2)});
    }, delay);
  });
}

const promise1 = randomPromise(1);
const promise2 = randomPromise(2);
const promise3 = randomPromise(3);

Promise.all([promise1, promise2, promise3]).then((result) => {
  body.innerHTML = ""; // Clear the "Loading..." row
  let timeTaken = 0;

  result.forEach(({ index, time }) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>Promise ${index}</td>
      <td>${time} </td>
    `;
    timeTaken+=time
    body.appendChild(row);
  });

  const maxTime = Math.max(...result.map(r=> parseFloat(r.time).toFixed(3)));

  const row = document.createElement("tr");
    row.innerHTML = `
      <td>Total</td>
      <td>${maxTime}</td>
    `;

    body.appendChild(row);
});

