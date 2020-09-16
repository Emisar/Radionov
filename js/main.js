var matrix;

function addEvent() {
    let button = document.getElementById("inputButton");
    button.addEventListener("click", function() {
        let inputField = document.getElementById("inputArea");
        let input = inputField.value;
        let matrix = new Array();
        let splittedInput = input.split("\n");
        for (let i = 0; i < splittedInput.length; i++) {
            matrix.push(new Array());
            let temp = splittedInput[i].split(" ");
            for (let j = 0; j < temp.length; j++) {
                matrix[i].push(temp[j] - 0);
            }
        }

        let inputRow = document.getElementById("row");
        let inputCol = document.getElementById("col");

        let row = inputRow.value - 0;
        let col = inputCol.value - 0;
        let result = jordan(matrix, row, col);
        output(result);
    })
}

function output(matrix) {
    let outputFiled = document.getElementById("outputArea");
    let tempString = "";
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] >= 0) tempString += " ";
            tempString += matrix[i][j].toFixed(2) + " ";
        }
        tempString += "\n";
    }
    outputFiled.value = tempString;
}

function jordan(matrix, row, column) {
    row -= 1;
    column -= 1;
    let tempMatrix = new Array();
    for (let i = 0; i < matrix.length; i++) {
        tempMatrix.push(new Array());
        for (let j = 0; j < matrix[i].length; j++) {
            let tempVal = (matrix[i][j] * matrix[row][column] - matrix[i][column] * matrix[row][j]) / matrix[row][column];
            tempMatrix[i].push(tempVal);
        }
    }
    for (let i = 0; i < matrix.length; i++) {
        tempMatrix[i][column] = matrix[i][column] / matrix[row][column] * -1;
    }
    for (let i = 0; i < matrix[row].length; i++) {
        tempMatrix[row][i] = matrix[row][i] / matrix[row][column];
    }
    tempMatrix[row][column] = 1 / matrix[row][column];
    return tempMatrix;
}

window.onload = function() {
    addEvent();
    // let matrix = [
    //     [-1, -2, 0],
    //     [-2, 0, 3],
    //     [0, -2, -2]
    // ]
    // let row = 2;
    // let column = 3;
}