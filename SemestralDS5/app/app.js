(function() {
    const App = (() => {
        // Cache DOM elements
        const searchBar = document.querySelector(".search-bar");
        const methodSelector = document.querySelector(".http-method");
        const sendButton = document.querySelector(".btn-submit");
        const requestBodyInput = document.querySelector("#request-params");
        const responseBox = document.querySelector("#response-box");

        //Save history
        const saveHistory = (method, url, status) => {
            const historial = JSON.parse(localStorage,getItem("historial")) || [];

            const nuevaEntrada = {
                metodo: method,
                url: url,
                estado: status,
                fecha: new Date().toLocaleString,
            };
            localStorage.setItem("historial", JSON.stringify(historial));
        };

        /*
        const handleApiRequest = async () => {
            responseBox.value = "";
        }
        */
        // Bind events
        const bindEvents = () => {
            sendButton.addEventListener("click", handleApiRequest);
        };

        // Event Handlers
        const handleApiRequest = async () => {
            // Clear previous response
            responseBox.value = "";

            const endpoint = searchBar.value.trim();
            const method = methodSelector.value;
            const body = requestBodyInput.value ? JSON.parse(requestBodyInput.value) : null;

            if (!endpoint) {
                alert("Please enter a valid API endpoint.");
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
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const responseData = await response.json();
                responseBox.value = JSON.stringify(responseData, null, 4);
            } catch (error) {
                responseBox.value = `Error: ${error.message}`;
            }
        };

        // Initialize App
        const init = () => {
            bindEvents();
        };

        return {
            init
        };
    })();

    // Initialize the application immediately
    App.init();
})();
