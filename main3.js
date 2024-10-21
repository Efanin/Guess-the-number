//удаляем лишние поля

//sessionStorage.removeItem('id');
//console.log(sessionStorage.key(0))

/*let player = sessionStorage.getItem(`${key_data[0]}`);
console.log(player, key_data[0]);

let td = `<td>${1}</td><td>${2}</td><td>${3}</td><td>${4}</td>`;
document.getElementById("table").insertAdjacentHTML('beforeend', td);*/
/*
const player = sessionStorage.getItem('settings').split(',');
for (let i = 0; i < settings.length; i++) {
    settings[i] = Number(settings[i])
}
//преобразование массива в объект с полями
const setting = {
    lvl: settings[0],
    range: Math.pow(10, settings[1] + 1),
    step: settings[2] * 5,
    tabl: settings[3],
    help: settings[4],
    id: sessionStorage.getItem('id'),
};
console.log(setting);
*/

const settings = sessionStorage.getItem('settings').split(',');
for (let i = 0; i < settings.length; i++) {
    settings[i] = Number(settings[i])
}


function sort_rating(player, lvl) {
    for (let k = 0; k < player.length; k++) {
        for (let i = 0; i < player.length - 1; i++) {
            //сортируем массив по парраметру
            if (player[i].step > player[i + 1].step) {
                let player_temp = player[i];
                player[i] = player[i + 1];
                player[i + 1] = player_temp;
                continue;
            }
        }
    }
}



let player = [];
function PlayersInArr(key) {
    const players = sessionStorage.getItem(key).split(',');
    const player = {
        name: players[0],
        lvl: Number(players[1]),
        step: Number(players[2]),
        data: key,
    }
    return player;
}

for (let i = 0; i < sessionStorage.length - 2; i++) {
    for (let k = i; k < sessionStorage.length; k++) {
        key = sessionStorage.key(k);
        if ((key !== 'id') && (key !== 'settings')) {
            player[i] = PlayersInArr(key);
            break;
        }
        else k++;
    }
}

sort_rating(player, settings[0]);

let id=1;
for (let k = 0; k < player.length; k++) {
    if (player[k].lvl === settings[0]) {
        let td = `<td>${id}</td><td>${player[k].name}</td><td>${player[k].lvl}</td><td>${player[k].step}</td><td>${player[k].data}</td>`;
        document.getElementById("table").insertAdjacentHTML('beforeend', td);
        id++;
    }
}


//Кнопка возвращения в меню
document.getElementById(`menu`).addEventListener('click', function (event) { window.history.go(-1) });