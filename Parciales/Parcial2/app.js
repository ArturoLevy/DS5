const App = (() => {
    const htmlElements = {
        generateButton: document.getElementById('generate'),
        sortAscButton: document.getElementById('sort-asc'),
        sortDescButton: document.getElementById('sort-desc'),
        numbersContainer: document.getElementById('numbers-container')
    };

    let numbers = [];
    const MAX_NUMBERS = 99; // Establece el límite de números aquí

    const handlers = {
        generateNumber: (() => {
            return () => {
                if (numbers.length >= MAX_NUMBERS) {
                    alert('Los números están completos, no se permiten mas números.'); //
                    return;
                }

                let newNumber;
                do {
                    newNumber = Math.floor(Math.random() * 99) + 1; // Genera números entre 1 y 99
                } while (numbers.includes(newNumber));
                
                numbers.push(newNumber); // agrega el numero al arreglo
                displayNumbers();
            };
        })(),
        sortNumbersAsc: (() => {
            return () => {
                numbers.sort((a, b) => a - b); // ordena ascendentemente
                displayNumbers();
            };
        })(),
        sortNumbersDesc: (() => {
            return () => {
                numbers.sort((a, b) => b - a); //ordena descendentemente
                displayNumbers();
            };
        })()
    };

    const displayNumbers = (() => { //genera los contenedores con el numero
        return () => {
            htmlElements.numbersContainer.innerHTML = '';
            numbers.forEach(number => {
                const numberElement = document.createElement('div');
                numberElement.className = 'number';
                numberElement.textContent = number < 10 ? `0${number}` : number; //donde se agrega el 0
                htmlElements.numbersContainer.appendChild(numberElement);
            });
        };
    })();

    const bindEvents = (() => {
        return () => {
            htmlElements.generateButton.addEventListener('click', handlers.generateNumber);
            htmlElements.sortAscButton.addEventListener('click', handlers.sortNumbersAsc);
            htmlElements.sortDescButton.addEventListener('click', handlers.sortNumbersDesc);
        };
    })();

    return {
        init() {
            bindEvents();
        }
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});