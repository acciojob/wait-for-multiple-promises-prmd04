let table = document.getElementById("table");

let body = document.createElement("tbody");
body.id = "output";

body.innerHTML = `<tr id="loading">
  <td colspan="2">Loading...</td>
</tr>`;

table.appendChild(body);


  function randomPromise(index) {
    const delay = Math.floor(Math.random() * 2000 + 1000); // 1000–3000ms
    return new Promise(resolve => {
      setTimeout(() => {
        const time = +(delay / 1000).toFixed(3); // format to 3 decimals as number
        resolve({ index, time });
      }, delay);
    });
  }

  const p1 = randomPromise(1);
  const p2 = randomPromise(2);
  const p3 = randomPromise(3);

  Promise.all([p1, p2, p3]).then(results => {
    // Remove loading row
    document.getElementById("loading")?.remove();

    // Clear body
    body.innerHTML = "";

    // Add promise rows
    results.forEach(({ index, time }) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>Promise ${index}</td>
        <td>${time.toFixed(3)}</td>
      `;
      body.appendChild(row);
    });

    // Add total row (max of all)
    const maxTime = Math.max(...results.map(r => r.time)).toFixed(3);
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `
      <td>Total</td>
      <td>${maxTime}</td>
    `;
    body.appendChild(totalRow);
  });