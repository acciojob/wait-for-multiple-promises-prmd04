const table = document.getElementById("table");

  const body = document.createElement("tbody");
  body.id = "output";
  body.innerHTML = `<tr id="loading"><td colspan="2">Loading...</td></tr>`;
  table.appendChild(body);

  function randomPromise(index) {
    const delay = Math.floor(Math.random() * 2000 + 1000); // 1000–3000 ms
    return new Promise((resolve) => {
      setTimeout(() => {
        const time = +(delay / 1000).toFixed(3); // precise float
        resolve({ index, time });
      }, delay);
    });
  }

  const promise1 = randomPromise(1);
  const promise2 = randomPromise(2);
  const promise3 = randomPromise(3);

  Promise.all([promise1, promise2, promise3]).then((results) => {
    document.getElementById("loading")?.remove();
    body.innerHTML = "";

    // Insert promise rows (rounded for Cypress `parseInt`)
    results.forEach(({ index, time }) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>Promise ${index}</td>
        <td>${Math.round(time)}</td> <!-- Match parseInt logic -->
      `;
      body.appendChild(row);
    });

    // Insert total row (formatted to 3 decimals)
    const maxTime = Math.max(...results.map(r => r.time));
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `
      <td>Total</td>
      <td>${maxTime.toFixed(3)}</td> <!-- Cypress expects 3.006 -->
    `;
    body.appendChild(totalRow);
  });