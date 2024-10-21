//Объявление и инициализация переменных
const form = document.querySelectorAll("form");
const li = document.querySelectorAll("li");
const button_set = document.querySelectorAll(".setings");
const field = document.querySelectorAll("fieldset");

let settings = [];
let id = 0;
sessionStorage.getItem('id', id);
//Функция для задания конфигурации (настрек) уровня. Вызывает функцию, которая прописывает необходимые комментарии в зависимости от конфигурации
function Lvl_info(lvl) {
    switch (lvl) {
        case 1: lvl_config([lvl, 0, 0, 0, 1]); break;
        case 2: lvl_config([lvl, 1, 2, 1, 1]); break;
        case 3: lvl_config([lvl, 1, 1, 0, 2]); break;
        case 0: lvl_config([lvl, 1, 0, 0, 1]); break;
    }
}

function lvl_name(lvl) {
    switch (lvl) {
        case 0: return "Настрой";
        case 1: return "Лёгкий";
        case 2: return "Средний";
        case 3: return "Сложный";
    }
}

//Функция для заполнения списка настроек, в зависимости от конфигурации
function lvl_config([lvl, range, step, tabl, help]) {
    document.getElementById(`Poyasnenie0`).innerText = lvl_name(lvl);
    document.getElementById(`Poyasnenie1`).innerText = `от 0 до ${Math.pow(10, range + 1)}`;
    document.getElementById(`Poyasnenie2`).innerText = (!step && "Бесконечно") || `${5 * step}`;
    document.getElementById(`Poyasnenie3`).innerText = (tabl && "Включен") || (!tabl && "Выключен");
    document.getElementById(`Poyasnenie4`).innerText = (!help && "Подсказок нет") || (help === 1 ? "Подсказки от бота" : "5 уникальных вопросов, которые можно спросить у бота");
    settings = [lvl, range, step, tabl, help];
    sessionStorage.setItem('settings', settings);
}

//lvl_config(settings);


//Функция для отображения и скрытия кнопок
function On_Off_elements(element, start, finish, On) {
    for (let i = start; i < finish; i++) {
        if (On) { element[i].style.visibility = "visible" }
        else { element[i].style.visibility = "hidden" }
    }
}

//Обработчик события нажатие на кнопки выбора уровня. Выводит пояснения к уровню включает и выключает необходимые кнопки
for (let i = 0; i < 4; i++) {
    document.getElementById(`lvl${i}`).addEventListener('click', function (event) {
        Lvl_info(i);
        console.log(settings);
        On_Off_elements(form, 0, form.length, 1);
        On_Off_elements(field, 0, field.length, 0)
        //Отдельная настройка для нажтия на кнопку "Насраиваемый"
        if (!i) {
            On_Off_elements(form, 1, 2, 0);
            On_Off_elements(field, 0, field.length, 1);
            //включение подсветки радио кнопок в зависимости от настройки уровня
            for (let i = 1; i < settings.length; i++) {
                let but_id = (i - 1) * 3 + settings[i];
                button_set[but_id].checked = true;
            }
        }
    });
}

//Изменение настроек конфигурации особого режима при нажатии на соответсвтующие кнопки
for (let i = 0; i < button_set.length; i++) {
    button_set[i].addEventListener('click', function (event) {
        settings[Math.floor(i / 3) + 1] = i % 3;
        lvl_config(settings);
        console.log(settings);
    });
}



//sessionStorage.clear();//Очистка локальных данных