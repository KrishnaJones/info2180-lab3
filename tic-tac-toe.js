document.addEventListener("DOMContentLoaded", function () {
    const squares = document.querySelectorAll("#board div");
    const newGameButton = document.querySelector(".btn");
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [2, 5, 8], [1, 4, 7]];
    let counter = 0;
    let gameOver = false;

    newGameButton.addEventListener("click", () => location.reload());

    squares.forEach((square, index) => {
        square.classList.add("square");
        square.addEventListener("click", () => makeMove(square, index));
        square.addEventListener("mouseover", () => square.classList.add("hover"));
        square.addEventListener("mouseout", () => square.classList.remove("hover"));
    });

    function makeMove(square, index) {
        if (gameOver || square.innerHTML !== "") return;
        let symbol = counter % 2 === 0 ? "X" : "O";
        square.innerHTML = symbol;
        square.classList.add(symbol);
        gameState[index] = symbol;
        checkWinner();
        counter++;
    }

    function checkWinner() {
        for (let combo of winCombos) {
            let [a, b, c] = combo;
            let pos1 = gameState[a];
            let pos2 = gameState[b];
            let pos3 = gameState[c];
            if (pos1 === "" || pos2 === "" || pos3 === "") continue;
            if (pos1 === pos2 && pos2 === pos3) {
                let status = document.getElementById("status");
                status.innerHTML = `Congratulations! ${pos1} is the winner!`;
                status.classList.add("status", "you-won");
                gameOver = true;
                break;
            }
        }
    }
});
