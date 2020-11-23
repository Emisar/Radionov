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
            matrix[i][j] = value;
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
                elemType: (i == 0) ? "th" : "td",
                contentType: TEXT_TYPE,
                value: matrix[i][j]
            }   
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
    for (let i = 0; i < n; i++) {
        table[0][i] = {
            elemType: "th",
            contentType: TEXT_TYPE,
            value: "x" + (i + 1)
        }
    }
    table[0][n] = {
        elemType: "th",
        contentType: TEXT_TYPE,
        value: "Знак"
    }
    table[0][n + 1] = {
        elemType: "th",
        contentType: TEXT_TYPE,
        value: "Св член"
    }
    // Добавляем описание всех остальных ячеек таблицы
    for (let i = 1; i < m + 1; i++) {
        table[i] = [];
        for (let j = 0; j < n + 2; j++) {
            if (j != n) {
                table[i][j] = {
                    elemType: "td",
                    contentType: INPUT_TYPE
                }
            }
            else {
                table[i][j] = {
                    elemType: "td",
                    contentType: SELECT_TYPE,
                    selectOptions: ["=", ">=", "<="]
                }
            }
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
        sections[1].querySelector("." + SUBMIT_BUTTON_CLASS)
    ];
    // Навешиваем на событие "click" действие по "переключению" разделов
    buttons.forEach((button, index) => {
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