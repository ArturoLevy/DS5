(function() {
    const App = (() => {
        const searchBar = document.querySelector(".search-bar");
        const tasks = document.querySelectorAll(".task");

        const bindEvents = () => {
            if (searchBar) {
                searchBar.addEventListener("focus", handleSearchBarFocus);
                searchBar.addEventListener("blur", handleSearchBarBlur);
            }

            tasks.forEach(task => {
                task.addEventListener("click", handleTaskClick);
            });
        };

        const handleSearchBarFocus = () => {
            searchBar.style.outline = "2px solid #e67e22";
        };

        const handleSearchBarBlur = () => {
            searchBar.style.outline = "none";
        };

        const handleTaskClick = (event) => {
            alert(`You clicked on ${event.target.textContent.trim()}`);
        };

        const init = () => {
            bindEvents();
        };

        return {
            init
        };
    })();

    App.init();
})();
