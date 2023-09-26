// HTML.
const squareRootInput = document.querySelector(".inputs__square-root");
const initialGuessInput = document.querySelector(".inputs__initial-guess");
const accuracyInput = document.querySelector(".inputs__accuracy");

const resultSection = document.querySelector(".result");
const resultHeader = document.querySelector(".result__header");
const resultTable = document.querySelector(".result__table");
const resultTableBody = document.querySelector(".result__table table tbody");
const resultFooter = document.querySelector(".result__footer");

function estimate() {
    const squareRoot = Number(squareRootInput.value);
    const initialGuess = Number(initialGuessInput.value);

    let iteration = 0;
    
    let errorRate;
    const accuracy = accuracyInput.value == "" ? 0.0001 : Number(accuracyInput.value);

    let approximate = initialGuess;

    resultTableBody.innerHTML = "";

    do {
        // Use iteration variable for number of x's.
        iteration++;

        // Declare errorRate here for condition checking.
        errorRate = Math.abs(getErrorRate(squareRoot, approximate));

        // Generate result of each iteration one by one as a table.
        generateTableRow(iteration, getFormula(squareRoot, approximate), getNextApprox(squareRoot, approximate), getErrorRate(squareRoot, approximate));
        
        // Update approximate for next iteration.
        approximate = getNextApprox(squareRoot, approximate);

    } while (errorRate > accuracy);

    updateResultHeader(squareRoot, initialGuess);
    updateResultFooter(squareRoot, approximate);
};

function getNextApprox(squareRoot, approximate) {
    return (approximate + squareRoot / approximate) / 2;
};

function getFormula(squareRoot, approximate) {
    return `(${approximate} + ${squareRoot} / ${approximate}) / 2`;
};

function getErrorRate(squareRoot, approximate) {
    return Number(getNextApprox(squareRoot, approximate) - approximate).toFixed(10);
};

function generateTableRow(iteration, formula, approximate, errorRate) {
    const tr = resultTableBody.insertRow();

    for (let i = 0; i < 4; i++) {
        const td = tr.insertCell();

        // Check the index of the column.
        switch (i) {
            case 0:
                td.innerHTML = `x<sub>${iteration}</sub>`;
                td.classList.add("table__first-column");
                break;

            case 1:
                td.innerText = formula;
                break;
        
            case 2:
                td.innerText = approximate;
                break;

            case 3:
                td.innerText = errorRate;
                break;
        };
    };
};

function updateResultHeader(squareRoot, initialGuess) {
    resultHeader.innerHTML = `<span>s = ${squareRoot}</span>
                              <span>x<sub>0</sub> = ${initialGuess}</span>`;
};

function updateResultFooter(squareRoot, approximate) {
    resultFooter.innerHTML = `<span>&#8730;${squareRoot}</span>=<span>${approximate}</span>`;
};

function openTable() {
    resultSection.ariaHidden = false;
    resultSection.dataset.opened = true;
    
    resultTable.tabIndex = 0;
    resultTable.style.overflow = "scroll";
};