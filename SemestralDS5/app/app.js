(function () {
    const App = (() => {
        // Cache DOM elements
        const searchBar = document.querySelector(".search-bar");
        const methodSelector = document.querySelector(".http-method");
        const sendButton = document.querySelector(".btn-submit");
        const requestBodyInput = document.querySelector("#request-params");
        const responseBox = document.querySelector("#response-box");

        // Maneja la solicitud a la API
        const handleApiRequest = async () => {
            responseBox.value = ""; // Limpiar respuesta previa

            const endpoint = searchBar.value.trim();
            const method = methodSelector.value;
            let body = null;

            // Validar endpoint
            if (!endpoint) {
                alert("Por favor, introduce un endpoint válido.");
                return;
            }

            // Validar JSON del cuerpo (si aplica)
            try {
                if (requestBodyInput.value) {
                    body = JSON.parse(requestBodyInput.value);
                }
            } catch (error) {
                alert("El cuerpo de la solicitud debe ser un JSON válido.");
                console.error("Error al parsear el JSON:", error.message);
                return;
            }

            // Realizar la solicitud a la API
            try {
                console.log(`Enviando solicitud a: ${endpoint}`);
                console.log(`Método: ${method}`);
                console.log(`Cuerpo: ${body ? JSON.stringify(body) : "N/A"}`);

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
                console.log("Datos recibidos:", responseData);

                responseBox.value = JSON.stringify(responseData, null, 4); // Mostrar datos en el cuadro de respuesta
            } catch (error) {
                console.error("Error en la solicitud:", error.message);
                responseBox.value = `Error: ${error.message}`;
            }
        };

        // Vincular eventos
        const bindEvents = () => {
            sendButton.addEventListener("click", handleApiRequest);
        };

        // Inicializar la aplicación
        const init = () => {
            bindEvents();
            console.log("Aplicación inicializada correctamente.");
        };

        return {
            init,
        };
    })();

    App.init();
})();
