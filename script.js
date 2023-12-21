

//로그인, 회원가입 
document.getElementById('loginButton').addEventListener('click', showLoginForm);
function showLoginForm() {
    var loginForm = document.getElementById('loginForm');
    if (loginForm.style.display === 'block') {
        loginForm.style.display = 'none';
    } else {
        loginForm.style.display = 'block';
    }
}


function login() {
    var inputID = document.getElementById('inputID').value;
    var inputPW = document.getElementById('inputPW').value;

    var registeredID = localStorage.getItem('registeredID');
    var registeredPW = localStorage.getItem('registeredPW');

    if (inputID === registeredID && inputPW === registeredPW) {
        alert('로그인 되었습니다.');

        localStorage.setItem('loginUser',inputID);
        var savedGold = localStorage.getItem('gameDataGold');
        if (savedGold !== null) {
            globalGold = parseInt(savedGold);
            displayGold();
        }
        var userId = inputID;
        restorePurchasedItems(userId);
        var loginForm = document.getElementById('loginForm');
        loginForm.style.display = 'none';
    } else {
        alert('아이디 또는 비밀번호가 올바르지 않습니다');
    }
}

function showRegisterForm() {
    var loginForm = document.getElementById('loginForm');
    loginForm.style.display = 'none';

    var registerForm = document.getElementById('registerForm');
    registerForm.style.display = 'block';
}
function register() {
    var signupID = document.getElementById('signupID').value;
    var signupPW = document.getElementById('signupPW').value;

    
    localStorage.setItem('registeredID', signupID);
    localStorage.setItem('registeredPW', signupPW);

    alert('회원가입 정보가 저장되었습니다');
    
    var registerForm = document.getElementById('registerForm');
    registerForm.style.display = 'none';

    var loginForm = document.getElementById('loginForm');
    loginForm.style.display = 'block';
}

//저장 
function Save(){
    localStorage.setItem('gameDataGold', globalGold);
    alert('저장 성공!');
}
window.addEventListener('beforeunload', function(event) {
    localStorage.setItem('gameDataGold', globalGold);
    //localStorage.removeItem('gameDataGold');
});

//상점
document.getElementById('shopButton').addEventListener('click', function() {
    document.getElementById('shop').style.display = 'block';
});
function closeShop() {
    document.getElementById('shop').style.display = 'none';
}

//구매
function buyItem(itemId, price) {
    var itemImages = document.getElementById('itemImages');
    var images = itemImages.getElementsByTagName('img');
    var itemButton = document.querySelectorAll('.item-grid button')[itemId - 1]; 

    if (globalGold >= price && images[itemId - 1].style.display === 'none') {
        images[itemId - 1].style.display = 'inline-block'; 
        globalGold -= price;
        displayGold();
        itemButton.disabled = true;
        itemButton.textContent = '구매 완료';
        var loginUser = localStorage.getItem('loginUser');
        localStorage.setItem(loginUser + '_itemPurchased_' + itemId, 'purchased');
        localStorage.setItem('gameDataGold', globalGold); 

    } else if (images[itemId - 1].style.display !== 'none') {
        alert('이미 구매한 아이템입니다.');
    } else {
        alert('돈이 부족합니다.');
    }
}
function restorePurchasedItems(userId) {
    for (var i = 1; i <= 6; i++) {
        var itemImages = document.getElementById('itemImages');
        var images = itemImages.getElementsByTagName('img');
        var itemButton = document.querySelectorAll('.item-grid button')[i - 1];

        var purchasedItem = localStorage.getItem(userId + '_itemPurchased_' + i);

        if (purchasedItem === 'purchased') {
            images[i - 1].style.display = 'inline-block';
            itemButton.disabled = true;
            itemButton.textContent = '구매 완료';
        }
    }
}
//업그레이드 /판매 / 돈
var SwordImges = [
    'img/sword1.png',
    'img/sword2.png',
    'img/sword3.png',
    'img/sword4.png',
    'img/sword5.png',
    'img/sword6.png',
    'img/sword7.png',
    'img/sword8.png',
    'img/sword9.png'
]

var sellSp = 1;
var SwordCount = 0;
var successRate = 95; 
var cost = 100;

function displayGold(){
    var showGold = document.getElementById('showGold');
    showGold.innerHTML = 'G: '+ globalGold;
}

function displaySell(){
    var ShowSell = document.getElementById('ShowSell');
     ShowSell.innerHTML = '판매가:' + sellSp+ 'G';
}
function displayCost(){
    var Upcost = document.getElementById('Upcost');
    Upcost.innerHTML = "강화 비용:"+ cost +"G";
}

function upgradeSword() {
    var upgradeChance = Math.random() * 100;
    var minusRate = 10;
    

    var upgrademsg = document.getElementById('msg');
    var ShowRate = document.getElementById('ShowRate');
    var SwordImg = document.getElementById('SwordImg');
    
    if(SwordCount === SwordImges.length-1) {
        alert('최대 강화입니다! 축하드립니다!');
    }   
    else if(globalGold >= cost){
        if (upgradeChance < successRate) {
            globalGold -= cost;
            SwordCount = (SwordCount+1)%SwordImges.length;
            SwordImg.src = SwordImges[SwordCount];
            cost += 100;
            upgrademsg.innerHTML = '강화 성공!';
            successRate -= minusRate;
            ShowRate.innerHTML = '성공률: '+ successRate + '%';
            sellSp =+ sellSp*10;
            
            displayCost();
            displayGold();
            displaySell();
        } 
        else {
            SwordCount = 0;
            SwordImg.src = SwordImges[SwordCount];
            upgrademsg.innerHTML = '강화 실패!';
            successRate = 95;
            ShowRate.innerHTML = '성공률: '+ successRate + '%';
            sellSp = 1;
            globalGold -= cost;
            cost = 100;
            displayGold();
            displaySell();
            displayCost();
        }
    }
    else{
        alert('강화 비용이 부족합니다!');
    }
}
function sellSword(){
    globalGold += sellSp;
    cost = 100;
    SwordCount = 0;
    SwordImg.src = SwordImges[SwordCount];
    successRate = 95;
    ShowRate.innerHTML = '성공률: '+ successRate + '%';
    sellSp = 1;
    displaySell();
    displayGold();
    displayCost();
    
}

displaySell();
displayGold();
displayCost();
