var gg = parseInt(localStorage.getItem('gameDataGold')) || 0;

document.addEventListener("DOMContentLoaded", function () {
    var showGold1 = document.getElementById('showGold1');
    showGold1.innerHTML = 'G: ' + gg;
});

function buyItem(itemId) {
    var itemPrice = 0;
    switch(itemId) {
        case 1:
            itemPrice = 1000;
            break;
        case 2:
            itemPrice = 10000;
            break;
        case 3:
            itemPrice = 100000;
            break;
        case 4:
            itemPrice = 10000000;
            break;
        case 5:
            itemPrice = 1000000000;
            break;
        case 6:
            itemPrice = 10000000000;
            break;
        default:
            itemPrice = 0;
            break;
    }

    if (gg >= itemPrice) {
        gg -= itemPrice;
        alert('아이템을 구매하였습니다!');
        var showGold1 = document.getElementById('showGold1');
        showGold1.innerHTML = 'G: ' + gg;
        displayGold();
        localStorage.setItem('gameDataGold', gg);
        var gameGold = document.getElementById('showGold');
        gameGold.innerHTML = 'G: ' + gg;
    } else {
        alert('골드가 부족합니다!');
    }
}

function displayGold() {
    var showGold1 = document.getElementById('showGold1');
    showGold1.innerHTML = 'G: ' + gg;
}
