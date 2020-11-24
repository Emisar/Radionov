const SECTION_CLASS = "task_2-section";
const INPUT_FIELD_CLASS = "task_2-prop_block-input_field";
const SUBMIT_BUTTON_CLASS = "task_2-submit_button";
const TABLES_DIV = "task_2-tables_div";

/**
 * Функция для переключениями между секциями
 * 
 * @param {Node} section1 - активная секция
 * @param {Node} section2 - неактивная секция
 */
function switchSection(section1, section2) {
    if (!section1.classList.contains("hide")) {
        section1.classList.add("hide");
    }
    else {
        section1.classList.remove("hide");
    }

    if (!section2.classList.contains("hide")) {
        section2.classList.add("hide");
    }
    else {
        section2.classList.remove("hide");
    }
}

/**
 * Функция для пересчета матрицы
 * 
 * @param {Array of Array} matrix - матрица значений таблицы
 */
function recountMatrix(matrix) {
    // Избаляемся от отрицательных чисел на свободном члене
    for (let i = 0; i < matrix.length - 1; i++) {
        if (matrix[i][1] < 0) {
            for (let j = 1; j < matrix[i].length; j++) {
                matrix[i][j] *= -1;
            }
        }
    }
    let row = 1;
    let col = 1;


    // Возвращаем готовую матрицу
    return {row, col, matrix};
}

/**
 * Функция создания новой таблицы из матрицы.
 * Старая матрица пересчитывается и создается новая из которой создается таблица
 * 
 * @param {Array of Array} matrix - матрица старой таблицы
 * @param {Integer} order - порядковый номер новой таблицы
 */
function createNextTable(matrix, order) {
    // Пересчитываем матрицу
    const recount = recountMatrix(matrix);
    matrix = recount.matrix;
    // Создаем описание таблицы
    let options = createOutputOptions("Step " + order + ":", matrix);
    // Создаем таблицу по описанию и возвращаем её 
    return {
        row: recount.row,
        col: recount.col,
        table: createTable(options)
    };
}

/**
 * Функция создания таблицы из введенных значений
 * 
 * @param {Node} section - секция из которой будут браться данные для создания таблицы
 */
function createOutputTable(inputTable) {
    // Переводим таблицу в матрицу и избавляемся от отрицательных чисел на свободном члене
    let matrix = tableToMatrix(inputTable);
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][1] < 0) {
            for (let j = 1; j < matrix[i].length; j++) {
                matrix[i][j] *= -1;
            }
        }
    }
    // Добавляем в матрицу строку с функцией G
    matrix[matrix.length] = [];
    matrix[matrix.length - 1][0] = "g";
    for (let j = 1; j < matrix[0].length; j++) {
        let sum = 0;
        for (let i = 1; i < matrix.length - 1; i++) {
            sum += matrix[i][j] - 0;
        }
        matrix[matrix.length - 1][j] = -sum;
    }
    // Создаем описание таблицы
    let options = createOutputOptions("Step 0:", matrix);
    // Создаем таблицу по описанию и возвращаем её 
    return createTable(options);
}

/**
 * Функция создания таблицы для ввода значений
 * 
 * @param {Node} section - секция из которой будут браться данные для создания таблицы
 */
function createInputTable(n, m) {
    /*
     * Создаем описание таблицы
     */
    // Задаем класс таблицы и её заголовок
    let options = {};
    options.title = "Enter the matrix:";
    // Добавляем описание заголовочных ячеек таблицы
    // Их количество пропорционально количеству переменных в уравнении
    let table = [];
    table[0] = [];
    table[0][0] = {
        elemType: "th",
        contentType: TEXT_TYPE,
        value: " "
    }
    table[0][1] = {
        elemType: "th",
        contentType: TEXT_TYPE,
        value: "1"
    }
    for (let i = 0; i < n; i++) {
        table[0][i + 2] = {
            elemType: "th",
            contentType: TEXT_TYPE,
            value: "x" + (i + 1)
        }
    }
    // Добавляем описание всех остальных ячеек таблицы
    for (let i = 1; i <= m; i++) {
        table[i] = [];
        table[i][0] = {
            elemType: "th",
            contentType: TEXT_TYPE,
            value: "x" + (n + i)
        }
        table[i][1] = {
            elemType: "td",
            contentType: INPUT_TYPE
        }
        for (let j = 0; j < n; j++) {
            table[i][j + 2] = {
                elemType: "td",
                contentType: INPUT_TYPE
            }
        }
    }
    // Целевая функция
    table[m + 1] = [];
    table[m + 1][0] = {
        elemType: "th",
        contentType: TEXT_TYPE,
        value: "f"
    }
    table[m + 1][1] = {
        elemType: "td",
        contentType: TEXT_TYPE,
        value: "0"
    }
    for (let j = 0; j < n; j++) {
        table[m + 1][j + 2] = {
            elemType: "td",
            contentType: INPUT_TYPE
        }
    }
    options.table = table;
    // Создаем таблицу по описанию и возвращаем её 
    return createTable(options);
}

/**
 * Главная функция - логика программы
 */
window.onload = () => {
    // Берем все разделы
    let sections = document.querySelectorAll("." + SECTION_CLASS);
    // Берем кнопки из разделов
    let buttons = [
        sections[0].querySelector("." + SUBMIT_BUTTON_CLASS),
        sections[1].querySelector("." + SUBMIT_BUTTON_CLASS),
        sections[2].querySelector("." + SUBMIT_BUTTON_CLASS)
    ];

    // Добавляем событие "Создание таблицы для ввода значений" на кнопку из первого раздела
    buttons[0].addEventListener("click", () => {
        // Берем поля ввода параметров будущей таблицы
        let inputs = sections[0].querySelectorAll("." + INPUT_FIELD_CLASS)
        // Считываем данные с полей ввода
        let n = inputs[0].value - 0;    // Кол-во переменных в уравнениях
        let m = inputs[1].value - 0;    // Кол-во уравнений в системе
        // Проверка на пустой ввод
        if (n == 0) { alert("Количество переменных не задано!"); return; }
        if (m == 0) { alert("Количество уравнений не задано!"); return; }
        // Создаем таблицу для ввода данных
        let table = createInputTable(n, m);
        sections[1].querySelector("." + TABLES_DIV).appendChild(table);
        // Переключаем раздел
        switchSection(sections[0], sections[1])
    });

    // Добавляем событие "Создание таблицы из введеных значений" на кнопку из второго раздела
    buttons[1].addEventListener("click", () => {
        // Берем таблицу с введенными данными
        let inputTable = sections[1].querySelector("." + TABLES_DIV).children[0];
        // Создаем таблицу с выходными данными
        let table = createOutputTable(inputTable);
        sections[2].querySelector("." + TABLES_DIV).appendChild(table);
        // Переключаем раздел
        switchSection(sections[1], sections[2])
    });

    // Добавляем событие "Создание таблицы с пересчитанными значениями" на кнопку из третьего раздела
    buttons[2].addEventListener("click", () => {
        // Берем блок с таблицами
        let tablesDiv = sections[2].querySelector("." + TABLES_DIV);
        // Берем старую последнюю таблицу из блока и создаем её матрицу
        let oldTable = tablesDiv.children[tablesDiv.children.length - 1];
        let matrix = tableToMatrix(oldTable);
        // Создаем новую таблицу с пересчитанными данными
        let created = createNextTable(matrix, tablesDiv.children.length);
        tablesDiv.appendChild(created.table);
        // На старой таблице выделяем элемент
        oldTable.rows[created.row].cells[created.col].classList.add("selected");
    });
}