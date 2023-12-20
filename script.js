
//로그인, 회원가입 
document.getElementById('loginButton').addEventListener('click', showLoginForm);
document.getElementById('loginButton').addEventListener('click', login);

// function showLoginForm() {
//     var loginForm = document.getElementById('loginForm');
//     loginForm.style.display = 'block';
// }
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

//업그레이드 부분 

function upgradeSword() {
    // 업그레이드 확률 설정 (예: 30% 확률로 업그레이드)
    var upgradeChance = Math.random() * 100; // 0 ~ 100 사이의 난수 생성
    var successRate = 90; // 업그레이드 성공 확률 설정

    if (upgradeChance < successRate) {
        // 업그레이드 성공 시 동작
        document.querySelecor('#msg').innerHTML = "강화 성공!";
        // 여기에 업그레이드 성공 시 추가적인 작업을 추가하세요.
    } else {
        // 업그레이드 실패 시 동작
        document.querySelecor('#msg').innerHTML = "강화 실패!";
        // 여기에 업그레이드 실패 시 추가적인 작업을 추가하세요.
    }
}