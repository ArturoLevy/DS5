const App = (function() {
    const htmlElements = {
        candidateForm: document.getElementById('candidate-form'),
        candidateName: document.getElementById('candidate-name'),
        candidateColor: document.getElementById('candidate-color'),
        addCandidateButton: document.getElementById('add-candidate'),
        candidatesList: document.getElementById('candidates-list'),
        chart: document.getElementById('chart')
    };

    let candidates = [];

    function addCandidate() {
        const name = htmlElements.candidateName.value.trim();
        const color = htmlElements.candidateColor.value;

        if (name && !candidates.some(function(candidate) { return candidate.name === name; })) {
            candidates.push({ name: name, color: color, points: 0 });
            renderCandidates();
            renderChart();
        }
    }

    function renderCandidates() {
        htmlElements.candidatesList.innerHTML = '';
        candidates.forEach(function(candidate) {
            const candidateElement = document.createElement('div');
            candidateElement.className = 'candidate';
            candidateElement.innerHTML = 
                '<span class="name">' + candidate.name + '</span>' +
                '<span class="color" style="background-color: ' + candidate.color + ';"></span>' +
                '<span class="points">' + candidate.points + '</span>' +
                '<button class="add-point">+1</button>' +
                '<button class="remove-candidate">Eliminar</button>';
            htmlElements.candidatesList.appendChild(candidateElement);

            candidateElement.querySelector('.add-point').addEventListener('click', function() {
                candidate.points += 1;
                renderCandidates();
                renderChart();
            });

            candidateElement.querySelector('.remove-candidate').addEventListener('click', function() {
                candidates = candidates.filter(function(c) { return c.name !== candidate.name; });
                renderCandidates();
                renderChart();
            });
        });
    }

    function renderChart() {
        htmlElements.chart.innerHTML = '';
        const totalPoints = candidates.reduce(function(sum, candidate) { return sum + candidate.points; }, 0);
        candidates.forEach(function(candidate) {
            const bar = document.createElement('div');
            bar.className = 'bar';
            const percentage = totalPoints ? (candidate.points / totalPoints) * 100 : 0;
            bar.style.width = percentage + '%';
            bar.style.backgroundColor = candidate.color;

            const barText = document.createElement('span');
            barText.className = 'bar-text';
            barText.textContent = candidate.name + ' (' + Math.round(percentage) + '%)';
            bar.appendChild(barText);

            htmlElements.chart.appendChild(bar);
        });
    }

    function bindEvents() {
        htmlElements.addCandidateButton.addEventListener('click', addCandidate);
    }

    return {
        init: function() {
            bindEvents();
        }
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    App.init();
});