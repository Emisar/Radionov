const SECTION_CLASS = "task_2-section";
const SUBMIT_BUTTON_CLASS = "task_2-submit_button";
const TABLES_DIV = "task_2-tables_div";

const INPUT_FIELD_CLASS = "task_2-prop_block-input_field";

const INPUT_TABLE_CLASS = "task_2-input_table";
const OUTPUT_TABLE_CLASS = "task_2-output_table";

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

function addSelected(table) {
    for (let i = 0; i < table.rows.length; i++) {
        for (let j = 1; j < table.rows[i].cells.length; j++) {
            let elem = table.rows[i].cells[j];
            elem.addEventListener("click", ()=> {
                for (let i = 0; i < table.rows.length; i++) {
                    for (let j = 0; j < table.rows[i].cells.length; j++) {
                        let tableElem = table.rows[i].cells[j];
                        if (tableElem.classList.contains("selected")){
                            tableElem.classList.remove("selected");
                        }
                    }
                }
                elem.classList.add("selected");
            });
        }
    }
}

/**
 * Функция создания таблицы из введенных значений
 * 
 * @param {Node} section - секция из которой будут браться данные для создания таблицы
 */
function createOutputMatrix(section) {
    /*
    * Считываем таблицу с введенными значениями и заносим значения в матрицу
    */
    let inputTable = section.querySelector("." + INPUT_TABLE_CLASS);
    let matrix = [];
    for (let i = 0; i < inputTable.rows.length; i++) {
        matrix[i] = [];
        for (let j = 0; j < inputTable.rows[i].cells.length; j++) {
            let elem = inputTable.rows[i].cells[j];
            let value = elem.children[0].value;
            if (j != 0) {
                matrix[i][j] = (inputTable.rows[i].cells[1].children[0].value < 0) ? -value : value;
            }
            else {
                matrix[i][j] = value;
            }
        }
    }
    /*
     * Создаем описание таблицы
     */
    // Задаем класс таблицы и её заголовок
    let options = {};
    options.clazz = OUTPUT_TABLE_CLASS;
    options.title = "Step 0";
    // Добавляем описание ячеек таблицы соответственно полученной матрицы
    let table = [];
    for (let i = 0; i < matrix.length; i++) {
        table[i] = [];
        for (let j = 0; j < matrix[i].length; j++) {
            table[i][j] = {
                // Если это первая строка, то ячейки будут заголовочными
                elemType: (i == 0 || j == 0) ? "th" : "td",
                contentType: TEXT_TYPE,
                value: matrix[i][j]
            }   
        }
    }
    // Функция G
    table[matrix.length] = [];
    table[matrix.length][0] = {
        elemType: "th",
        contentType: TEXT_TYPE,
        value: "g"
    }
    for (let j = 1; j < matrix[matrix.length - 1].length; j++) {
        let sum = 0;
        for (let i = 1; i < matrix.length - 1; i++) {
            sum += matrix[i][j] - 0;
        }
        table[matrix.length][j] = {
            elemType: "td",
            contentType: TEXT_TYPE,
            value: -sum || "0"
        }
    }
    options.table = table;
    // Создаем таблицу по описанию и возвращаем её 
    return createTable(options);
}

/**
 * Функция создания таблицы для ввода значений
 * 
 * @param {Node} section - секция из которой будут браться данные для создания таблицы
 */
function createInputMatrix(section) {
    // Берем поля ввода параметров будущей таблицы
    let inputs = section.querySelectorAll("." + INPUT_FIELD_CLASS)
    // Считываем данные с полей ввода
    let n = inputs[0].value - 0;    // Кол-во переменных в уравнениях
    let m = inputs[1].value - 0;    // Кол-во уравнений в системе
    // Проверка на пустой ввод
    if (n == "") { 
        alert("Количество переменных не задано!"); 
        return; 
    }
    if (m == "") { 
        alert("Количество уравнений не задано!"); 
        return; 
    }

    /*
     * Создаем описание таблицы
     */
    // Задаем класс таблицы и её заголовок
    let options = {};
    options.clazz = INPUT_TABLE_CLASS;
    options.title = "Enter the matrix:";
    // Добавляем описание заголовочных ячеек таблицы
    // Их количество пропорционально количеству переменных в уравнении
    let table = [];
    table[0] = [];
    table[0][0] = {
        elemType: "th",
        contentType: TEXT_TYPE,
        value: ""
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
        elemType: "th",
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

    /*
     * Добавляем переключение разделов
     */
    // Берем кнопки из первых двух разделов
    let buttons = [
        sections[0].querySelector("." + SUBMIT_BUTTON_CLASS),
        sections[1].querySelector("." + SUBMIT_BUTTON_CLASS),
        sections[2].querySelector("." + SUBMIT_BUTTON_CLASS)
    ];
    // Навешиваем на событие "click" действие по "переключению" разделов
    [buttons[0], buttons[1]].forEach((button, index) => {
        button.addEventListener("click", () => switchSection(sections[index], sections[index + 1]));
    });

    /*
     * Добавляем событие "Создание таблицы для ввода значений" на кнопку из первого раздела
     */
    buttons[0].addEventListener("click", () => {
        let tablesDiv = sections[1].querySelector("." + TABLES_DIV);
        let table = createInputMatrix(sections[0]);
        tablesDiv.appendChild(table);
    });

    /*
     * Добавляем событие "Создание таблицы из введеных значений" на кнопку из второго раздела
     */
    buttons[1].addEventListener("click", () => {
        let tablesDiv = sections[2].querySelector("." + TABLES_DIV);
        let table = createOutputMatrix(sections[1]);
        table.classList.add("active");
        tablesDiv.appendChild(table);
    });

    /*
     * Добавляем событие "Создание таблицы с пересчитанными значениями" на кнопку из третьего раздела
     */
    buttons[2].addEventListener("click", () => {

    });
}