//получение данных с настройками уровня / преобразование этих данных в массив / преобразование значений в числовой тип
const settings = sessionStorage.getItem('settings').split(',');
for (let i = 0; i < settings.length; i++) {
    settings[i] = Number(settings[i])
}
//преобразование массива в объект с полями
const setting = {
    lvl:  Number(settings[0]),
    range: Math.pow(10,  Number(settings[1]) + 1),
    step:  Number(settings[2]) * 5,
    tabl:  Number(settings[3]),
    help:  Number(settings[4]),
    id:  Number(sessionStorage.getItem('id')),
};
console.log(setting);

let a = 0;
let b;
const button_quest = document.querySelectorAll(".question");
let step = setting.step;

//Генерация случайных чисел
function* Random_Nomber(range) {
    a = Math.random() * range;
    a = Math.round(a);
    yield a;
}
//функция генерации индексов безымянных игроков
function* index(id) {
    id++;
    yield id;
}
//Пишет ответ от бота пользователю
function Otvet(a, b) {
    if (a === b) return "Да, как вы догадались?  \u{1F600}";
    if (a > b) return "Нет, моё число БОЛЬШЕ";
    if (a < b) return "Нет, моё число  МЕНЬШЕ";
}
//Функция включения и выключения видимости элементов
function On_Off_elements(element, start, finish, On) {
    for (let i = start; i < finish; i++) {
        if (On) { element[i].style.visibility = "visible" }
        else { element[i].style.visibility = "hidden" }
    }
}
//Функция проверки на простое число
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}
//Перекрашивает цвет кнопки в зависимости от верности условия
function button_bg(On, i) {
    On ? button_quest[i].style.backgroundColor = "#2bb52b" : button_quest[i].style.backgroundColor = "#cc0000";
}
//Меняет надпись в зависимости от количества попыток
function Steps(step) {
    document.getElementById(`lvl_steps`).innerText = `${step} попыток`;
    if (step === 1) {
        document.getElementById(`lvl_steps`).innerText = `${step} попытка`;
        return 'попытка'
    }
    if ((step === 2) || (step === 3) || (step === 4)) {
        document.getElementById(`lvl_steps`).innerText = `${step} попытки`;
        return 'попытки'
    }
    return 'попыток';
}

function Victore(lvl, step, id) {
    if (!lvl) {
        document.getElementById("b").style.visibility = "hidden";
        document.getElementById(`lvl_steps`).innerText = ` потраченого всего ${step} ${Steps(step)}, молодец!`;
        document.getElementById(`lvl_help`).innerText = " Ты угадал число! можешь попробовать ещё раз с новым чилом, или сыграть на рекорд выбрав уровень сложности!";
        return;
    }
    id = index(id).next().value;
    let player = [];
    player[0] = prompt("Ты угадал! Твой результат запишется в таблицу рекордов. Не хочешь увековечить своё имя в истории? Как тебя зовут?", `игрок${id}`);
    player[1] = lvl;
    player[2] = step;
    console.log(player);
    sessionStorage.setItem('id', id);
    sessionStorage.setItem(`${new Date()}`, player);
    //player.time //Время потраченное на прохождение уровня
    location.replace("./Сайт_игра_3.html");
}

//Название уровня в шапке
function lvl_name(lvl) {
    switch (lvl) {
        case 0: return "Персональный";
        case 1: return "Лёгкий";
        case 2: return "Средний";
        case 3: return "Сложный";
    }
}
//отображение информации о подсказках для игрока
function lvl_help(help, range) {
    switch (help) {
        case 0: return "Подсказок нет";
        case 1: return "Подсказки от бота";
        case 2: {
            On_Off_elements(button_quest, 0, button_quest.length, 1);
            button_quest[4].innerText = `Это число больше ${range / 2}?`
        } return "5 уникальных вопросов, которые можно спросить у бота";
    }
}

//Отображение контента на странице в зависимости от настроек уровня
function html_set(lvl, range, step, tabl, help) {
    document.getElementById(`lvl_lvl`).innerText = lvl_name(lvl);
    document.getElementById(`lvl_rang`).innerText = `от 0 до ${range}`;
    document.getElementById(`lvl_steps`).innerText = (!step && "неограниченное количество попыток") || `${step} попыток`;
    document.getElementById(`lvl_help`).innerText = lvl_help(help, range);
    On_Off_elements(document.querySelectorAll("table"), 0, 1, tabl);
    a = Random_Nomber(range).next().value;
    console.log(a);
}

html_set(setting.lvl, setting.range, setting.step, setting.tabl, setting.help);


//Переход по страницам меню и рейтинг и обновление данной страницы
document.getElementById('menu').addEventListener('click', function (event) { window.history.go(-1) });
document.getElementById('again').addEventListener('click', function (event) { window.history.go(0) })
document.getElementById("rating").addEventListener('click', function (event) { location.replace("./Сайт_игра_3.html") });

//Отправка чисел и пересчёт попыток
document.getElementById('inp_b').addEventListener('submit', function (event) {
    event.preventDefault();
    let b = document.getElementById("b").value;//Получаем значение b из текстового поля
    b = Number(b);//преобразуем в число
    //Проверка на дебила. Пользователь должен ввести нормальное число
    if (isNaN(b)) {
        alert("Кажется, то что вы ввели не похоже на число. Напишите по другому")
        throw new Error("Игрок ввёл число не правильно");
        return;
    }
    step--;

    //если включена таблица
    if (setting.tabl) {
        let comm = "Не подходит";
        //если есть подсказки от бота они наишутся в комментарии
        if (setting.help === 1) { comm = Otvet(a, b) }
        let td = `<td>${b}</td><td>${comm}</td>`;
        document.getElementById("table").insertAdjacentHTML('beforeend', td);
    }
    if (setting.help === 1) {
        let otvet = document.getElementById("lvl_help");
        otvet.innerText = Otvet(a, b);
    }
    if (step > 0) {
        Steps(step);
    }
    if (!step) {
        console.log("Ваши попытки кончились");
        document.getElementById("b").style.visibility = "hidden";
        document.getElementById(`lvl_steps`).innerText = " больше не осталось попыток";
        document.getElementById(`lvl_help`).innerText = " В этот раз не повезло. Попробуй ещё раз!";
    }
    if (a === b) {
        Victore(setting.lvl, setting.step - step, setting.id);
    }

    event.target.reset(); // очищаем форму
});

//При нажатии на кнопку она меняет цвет в зависимости от выполняемого условия
for (let i = 0; i < button_quest.length; i++) {
    button_quest[i].addEventListener('click', function (event) {
        event.preventDefault();
        switch (i) {
            case 0: button_bg(isPrime(a), i); break;
            case 1: button_bg(!(a % 2), i); break;
            case 2: button_bg(!(a % 3), i); break;
            case 3: button_bg(!(a % 5), i); break;
            case 4: button_bg(a > (setting.range / 2), i); break;
        }
    })
}