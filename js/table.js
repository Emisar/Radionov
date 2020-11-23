/**
* Описание полей объекта options
* 
* options.
*        .clazz - css-класс таблицы
*        .title - текст в блоке <caption> (заголовок таблицы)
*        .table - описание содержимого таблицы. Является двумерной матрицей
*        .table[][] - описание ячеек таблицы
*         
* options.table[][].
*                  .elemType - Тип элемента таблицы (th - <th> - заголовочкая ячейка, td - <td> - обычная ячейка)
*                  .contentType - Тип содержимого ячейки. (SELECT_TYPE - <select>, INPUT_TYPE - <input>, TEXT_TYPE - <span>)
*                  .value (параметр обязательный при contentType: TEXT_TYPE) - значение текстового поля
*                  .selectOptions (параметр обязательный при contentType: SELECT_TYPE) - массив значений блоков <option> у блока <select>
*/

const SELECT_CLASS = "task_2-input_table-select";
const TABLE_INPUT_FIELD_CLASS = "task_2-input_table-input_field";

const SELECT_TYPE = "select";
const INPUT_TYPE = "input";
const TEXT_TYPE = "value";

/**
 * Функция создания таблицы
 * 
 * @param {Object} options - описание таблицы в виде объекта
 */
function createTable(options) {
    // Разархивируем поля объекта-описания
    let clazz = options.clazz;  // Класс таблицы
    let title = options.title;  // Заголовок
    let table = options.table;  // Описание ячеек (матрица объектов)
    // Создаем таблицу и добавляем её класс
    let newTable = document.createElement("table");
    newTable.classList.add(clazz);
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
    let contentType = options.contentType;  // Тип содержимого ячейки
    let selectOptions = options.selectOptions || null;  // Массив значений блоков <option> у блока <select>
    let value = options.value || null;  // Значение текстового поля
    // Создаем ячейку таблицы 
    let elem = document.createElement(elemType);
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
    // Создаем <select> и добавляем его класс
    let select = document.createElement("select");
    select.classList.add(SELECT_CLASS);
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
    // Создаем <input> и добавляем его класс
    let input = document.createElement("input");
    input.classList.add(TABLE_INPUT_FIELD_CLASS);
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