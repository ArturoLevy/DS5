(function () {
    const loadHistory = () => {
        const historyTable = document.querySelector("#history-table tbody");
        const historial = JSON.parse(localStorage.getItem("historial")) || [];

        historyTable.innerHTML = "";

        historial.forEach((entrada) => {
            const row = document.createElement("tr");

            const metodoCell = document.createElement("td");
            metodoCell.textContent = entrada.metodo;

            const urlCell = document.createElement("td");
            urlCell.textContent = entrada.url;

            const estadoCell = document.createElement("td");
            estadoCell.textContent = entrada.estado;

            const fechaCell = document.createElement("td");
            fechaCell.textContent = entrada.fecha;

            row.appendChild(metodoCell);
            row.appendChild(urlCell);
            row.appendChild(estadoCell);
            row.appendChild(fechaCell);

            historyTable.appendChild(row);
        });
    };

    document.addEventListener("DOMContentLoaded", loadHistory);
})();
