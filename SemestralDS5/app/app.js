(function () {
    const App = (() => {
     
        const searchBar = document.querySelector(".api-input");
        const methodSelector = document.querySelector(".api-method");
        const sendButton = document.querySelector(".btn-submit");
        const requestBodyInput = document.querySelector("#request-params");
        const responseBox = document.querySelector("#response-box");


        const handleApiRequest = async () => {
            responseBox.value = ""; 

            const endpoint = searchBar.value.trim();
            const method = methodSelector.value;
            let body = null;

            if (!endpoint) {
                alert("Por favor, introduce un endpoint válido.");
                return;
            }

            try {
                if (requestBodyInput.value) {
                    body = JSON.parse(requestBodyInput.value);
                }
            } catch (error) {
                alert("El cuerpo de la solicitud debe ser un JSON válido.");
                return;
            }

            try {
                const options = {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                if (method !== "GET" && body) {
                    options.body = JSON.stringify(body);
                }

                const response = await fetch(endpoint, options);

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const responseData = await response.json();
                responseBox.value = JSON.stringify(responseData, null, 4);

                saveToHistory(method, endpoint, response.status);
            } catch (error) {
                responseBox.value = `Error: ${error.message}`;
                saveToHistory(method, endpoint, "Error");
            }
        };

        const saveToHistory = (method, url, status) => {
            const historial = JSON.parse(localStorage.getItem("historial")) || [];
            const nuevaEntrada = {
                metodo: method,
                url: url,
                estado: status,
                fecha: new Date().toLocaleString(),
            };
            historial.push(nuevaEntrada);
            localStorage.setItem("historial", JSON.stringify(historial));
        };

      
        const bindEvents = () => {
            sendButton.addEventListener("click", handleApiRequest);
        };

        const init = () => {
            bindEvents();
        };

        return {
            init,
        };
    })();

    App.init();
})();
