(function () {
    const renderHistory = () => {
        const historyTableBody = document.querySelector("#history-table tbody");
        const historial = JSON.parse(localStorage.getItem("historial")) || [];

        historial.forEach((entrada) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${entrada.metodo}</td>
                <td>${entrada.url}</td>
                <td>${entrada.estado}</td>
                <td>${entrada.fecha}</td>
            `;
            historyTableBody.appendChild(row);
        });
    };

    renderHistory();
})();
