function solve() {
    let button = document.getElementById("inputButton");
    button.addEventListener("click", function() {
        // Проверка на заполнение всех полей
        if (document.getElementById("inputArea").value == '') alert("Введите матрицу");
        else if (document.getElementById("row").value == '')  alert("Введите номер строки");
        else if (document.getElementById("col").value == '')  alert("Введите номер столбца");
        else {
            // Чиатем вводные данные
            let input = document.getElementById("inputArea").value;     // Матрица значений
            let inputRow = document.getElementById("row").value - 1;    // Номер строки для обмена
            let inputCol = document.getElementById("col").value - 1;    // Номер столбца для обмена

            // Преобразовываем вводные данные в матрицу
            let inputMatrix = new Array();
            input.split("\n").forEach(row => {
                inputMatrix.push(row.split(" ").filter(n => { return n != "" }));
            });

            // Заполняем вектор верхних значений
            let topVector = inputMatrix.shift();

            // Заполняем вектор боковых значений
            let sideVector = new Array();
            inputMatrix.forEach(row => {
                sideVector.push(row.shift());
            });

            // Оставшаяся матрица - матрица значений
            let matrix = inputMatrix;

            // Меняем указанные строки и столбцы в матрице
            let result = jordan(matrix, inputRow, inputCol);

            // Меняем указанные строки и столбцы у векторов боковых и верхних значений
            let cup = sideVector[inputRow];
            sideVector[inputRow] = (topVector[inputCol] == 0) ? topVector[inputCol] : topVector[inputCol].substring(1);
            topVector[inputCol] = (cup == 0) ? cup : "-" + cup;

            // Убираем лишние нули из вектора верхних значений
            topVector = topVector.filter((n) => { return n != 0 });

            // Выводим ответ
            output(result, topVector, sideVector);
        }
    })
}

function output(matrix, topVector, sideVector) {
    /* Правила оформления
        Число занимает 5 символов:
            - 1 символ для знака (-/+)
            - 1 символ для числа перед точкой
            - 1 символ для точки
            - 2 символа для чиста после точки
        Между числами отступ в 1 символ
        Выравнивание чисел идет по правой стороне
        Выравнивание заголовков строк идет по левому краю
        В заголовке в начале строки идет отступ в 1 число
        В заголовке значения занимают 3 символа и имеют формат типа -x#
        Первый столбец каждой строки может быть нулём или словом формата x#
    */

    // Строка на вывод с начальным отступом
    let tempString = "     ";

    // Заполняем заголовок
    for (let i = 0; i < topVector.length; i++) {
        tempString += "   " + topVector[i];     // 1 пробел - разделитель между столбцами и 2 пробела для выравнивания по правому краю
    }

    // Заполняем матрицу
    for (let i = 0; i < matrix.length; i++) {
        // Новая строка матрицы
        tempString += "\n";
        // Пишем заголовок строки
        tempString += sideVector[i];
        tempString += (sideVector[i] == 0) ? "    " : "   ";    // Отступы для выравнивания по левому краю (4 для нуля и 3 для слова)
        // Пишем числа матрицы
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] >= 0) tempString += " ";       // Отступ если нет знака (-/+)
            tempString += " " + matrix[i][j].toFixed(2);
        }
    }
    // Выводим получившуюся строку
    document.getElementById("outputArea").value = tempString;
}

function deleteColumn(a, n) {
    /*
        a - массив. где удаляем строку
        r - номер колонки, которую удаляем
    */
    var newArr = [];
    for(var i = 0; i < a.length; i++) {
        newArr[i] = [];
        var row = a[i];
        for(var j = 0; j < row.length; j++) {
            if (j != n) newArr[i].push(row[j]);
        }
    }
    
    return newArr;
}

function jordan(matrix, row, column) {
    let tempMatrix = [];
    // Пересчитываем всю матрицу
    for (let i = 0; i < matrix.length; i++) {
        tempMatrix[i] = [];
        for (let j = 0; j < matrix[i].length; j++) {
            let tempVal = (matrix[i][j] * matrix[row][column] - matrix[i][column] * matrix[row][j]) / matrix[row][column];
            tempMatrix[i][j] = tempVal;
        }
    }
    // Пересчитываем столбец
    for (let i = 0; i < matrix.length; i++) {
        tempMatrix[i][column] = matrix[i][column] / matrix[row][column] * -1;
    }
    // Пересчитываем строку
    for (let i = 0; i < matrix[row].length; i++) {
        tempMatrix[row][i] = matrix[row][i] / matrix[row][column] ;
    }
    // Пересчитываем указанное значение
    tempMatrix[row][column] = 1 / matrix[row][column];
    // Удаляем обнулившееся значение
    tempMatrix = deleteColumn(tempMatrix, column);
    return tempMatrix;
}



function clearAll() {
    let clearButton = document.getElementById("clearButton");
    clearButton.addEventListener("click", function() {
        document.getElementById("inputArea").value = '';
        document.getElementById("row").value = '';
        document.getElementById("col").value = '';
        document.getElementById("outputArea").value = '';
    })
}

function Change() {
    let changeButton = document.getElementById("changeButton")
    changeButton.addEventListener("click", function() {
        document.getElementById("inputArea").value = '';
        document.getElementById("inputArea").value = document.getElementById("outputArea").value;
        document.getElementById("outputArea").value = "";
    })
}

window.onload = function() {
    solve();
    clearAll();
    Change();
}