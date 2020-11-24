/**
* Описание полей объекта options
* 
* options.
*        .title - текст в блоке <caption> (заголовок таблицы)
*        .table - описание содержимого таблицы. Является двумерной матрицей
*        .table[][] - описание ячеек таблицы
*         
* options.table[][].
*                  .elemType - Тип элемента таблицы (th - <th> - заголовочкая ячейка, td - <td> - обычная ячейка)
*                  .elemClass - Класс ячейки таблицы (опционален)
*                  .contentType - Тип содержимого ячейки. (SELECT_TYPE - <select>, INPUT_TYPE - <input>, TEXT_TYPE - <span>)
*                  .value (параметр обязательный при contentType: TEXT_TYPE) - значение текстового поля
*                  .selectOptions (параметр обязательный при contentType: SELECT_TYPE) - массив значений блоков <option> у блока <select>
*/

const SELECT_TYPE = "select";
const INPUT_TYPE = "input";
const TEXT_TYPE = "value";

/**
 * Функция создания описания выходной таблицы
 * 
 * @param {String} tableClass - класс таблицы
 * @param {String} tableTitle - текст заголовка таблицы
 * @param {Array of Array} matrix - матрица значений таблицы
 */
function createOutputOptions(tableTitle, matrix) {
    // Добавляем класс и заголовок
    let options = {
        title: tableTitle
    }
    // Добавляем описание ячеек таблицы
    let table = [];
    for (let i = 0; i < matrix.length; i++) {
        table[i] = [];
        for (let j = 0; j < matrix[i].length; j++) {
            table[i][j] = {
                // Если это первая строка или столбец, то ячейки будут заголовочными
                elemType: (i == 0 || j == 0) ? "th" : "td",
                contentType: TEXT_TYPE,
                value: matrix[i][j] + ""
            }
        }
    }
    options.table = table;
    // Возращаем готовое описание
    return options;
}

/**
 * Функция создания матрицы из таблицы
 * 
 * @param {Node} table - таблица для перевода в матрицу
 */
function tableToMatrix(table) {
    let matrix = [];
    for (let i = 0; i < table.rows.length; i++) {
        matrix[i] = [];
        for (let j = 0; j < table.rows[i].cells.length; j++) {
            let elem = table.rows[i].cells[j];
            let value = elem.children[0].value;
            matrix[i][j] = (i == 0 || j == 0) ? value : value - 0;
        }
    }
    // Возращаем готовую матрицу
    return matrix;
}

/**
 * Функция создания таблицы
 * 
 * @param {Object} options - описание таблицы в виде объекта
 */
function createTable(options) {
    // Разархивируем поля объекта-описания
    let title = options.title;  // Заголовок
    let table = options.table;  // Описание ячеек (матрица объектов)
    // Создаем таблицу
    let newTable = document.createElement("table");
    // Создаем заголовок таблицы
    let caption = document.createElement("caption");
    caption.innerHTML = title;
    newTable.appendChild(caption);
    // Создаем строки таблицы
    table.forEach(rowOption => {
        let row = createTableRow(rowOption);
        newTable.appendChild(row);
    });
    // Возвращаем готовую таблицу
    return newTable;
}

/**
 * Функция создания строки таблицы
 * 
 * @param {Array} options - массив объектов описывающий создаваемые ячейки
 */
function createTableRow(options) {
    // Создаем строку
    let row = document.createElement("tr");
    // Создаем элементы строки
    options.forEach(option => {
        let elem = createTableElem(option);
        row.appendChild(elem);
    });
    // Возвращаем готовую строку
    return row;
}

/**
 * Функция создания ячейки таблицы
 * 
 * @param {Object} options - описание ячейки в виде объекта
 */
function createTableElem(options) {
    // Разархивируем поля объекта-описания
    let elemType = options.elemType;    // Тип ячейки
    let elemClass = options.elemClass;  // Класс ячейки
    let contentType = options.contentType;  // Тип содержимого ячейки
    let selectOptions = options.selectOptions || null;  // Массив значений блоков <option> у блока <select>
    let value = options.value || null;  // Значение текстового поля
    // Создаем ячейку таблицы
    let elem = document.createElement(elemType);
    // Если передан класс, то устанавливаем его
    if (elemClass != null) elem.classList.add(elemClass);
    // Добавляем содержимое для ячейки
    let content;
    switch (contentType) {
        case SELECT_TYPE:   // Тип <select>
            content = createSelect(selectOptions);
            break;
        case INPUT_TYPE:    // Тип <input>
            content = createInput();
            break;
        case TEXT_TYPE:     // Тип <span>
            content = createValue(value);
            break;
    }
    elem.appendChild(content);
    // Возвращаем готовую ячейку
    return elem;
}

/**
 * Функция создания содержимого типа <select> для ячейки таблицы
 * 
 * @param {Array} options - массив значений для блоков <option>
 */
function createSelect(options) {
    // Создаем <select>
    let select = document.createElement("select");
    // Добавляем блоки <option>
    options.forEach(option => {
        let selectElem = document.createElement("option");
        selectElem.value = option;
        selectElem.innerHTML = option;
        select.appendChild(selectElem);
    });
    // Возвращаем готовый <select>
    return select;
}

/**
 * Функция создания содержимого типа <input> для ячейки таблицы
 */
function createInput() {
    // Создаем <input>
    let input = document.createElement("input");
    // Устанавливает тип вводимых значений и начальное значение
    input.type = "number";
    input.value = 0;
    // Возвращаем готовый <input>
    return input;
}

/**
 * Функция создания содержимого типа <span> для ячейки таблицы
 * 
 * @param {String} value - значение текстового поля
 */
function createValue(value) {
    // Создаем <span> и устанавливаем ему значение
    let result = document.createElement("span");
    result.value = value;
    result.innerHTML = value;
    // Возвращаем готовый <span>
    return result;
}