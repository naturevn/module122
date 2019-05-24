(() => {
    const cells = document.querySelectorAll('#field div'),
        scoreBlock = document.querySelector('#score'),
        restartButton = document.querySelector('#restart');

    let score = 0;

    let areEqual = (...args) => (args[0].innerText && args[1].innerText && args[2].innerText) &&
        (args[0].innerText === args[1].innerText && args[1].innerText === args[2].innerText);

    let someoneWon = () => areEqual(cells[0], cells[1], cells[2]) ||
        areEqual(cells[3], cells[4], cells[5]) ||
        areEqual(cells[6], cells[7], cells[8]) ||
        areEqual(cells[0], cells[3], cells[6]) ||
        areEqual(cells[1], cells[4], cells[7]) ||
        areEqual(cells[2], cells[5], cells[8]) ||
        areEqual(cells[0], cells[4], cells[8]) ||
        areEqual(cells[2], cells[4], cells[6]);

    let noEmptyCells = () => ![...cells].filter(cell => !cell.innerText).length;

    cells.forEach(cell => {
        cell.addEventListener('click', e => {
            const playerCell = document.querySelector(`#${e.target.id}`);
            playerCell.innerText = 'O';
            playerCell.style.pointerEvents = 'none';

            if (someoneWon()) {
                cells.forEach(cell => {
                    cell.style.pointerEvents = 'none';
                });
                scoreBlock.innerText = `Score: ${++score}`;
                restartButton.style.visibility = 'visible';
                return;
            } else if (noEmptyCells()) {
                cells.forEach(cell => {
                    cell.style.pointerEvents = 'none';
                });
                restartButton.style.visibility = 'visible';
                return;
            }

            if (!noEmptyCells()) {
                let aiCell = cells[Math.floor(Math.random() * 9)];

                while (aiCell.innerText) {
                    aiCell = cells[Math.floor(Math.random() * 9)];
                }

                aiCell.innerText = 'X';
                aiCell.style.pointerEvents = 'none';

                if (someoneWon()) {
                    cells.forEach(cell => {
                        cell.style.pointerEvents = 'none';
                    });
                    scoreBlock.innerText = score === 0 ? `Score: ${score}` : `Score: ${--score}`;
                    restartButton.style.visibility = 'visible';
                }
            }
        });
    });

    restartButton.addEventListener('click', () => {
        cells.forEach(cell => {
            cell.innerText = '';
            cell.style.pointerEvents = 'auto';
        });
        restartButton.style.visibility = 'hidden';
    });
})();