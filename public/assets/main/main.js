const loginButton = document.querySelector('#loginButton');
const signupButton = document.querySelector('#signupButton');
const actionWindow = document.querySelector('#actionWindow');
const signupWindow = document.querySelector('#signupWindow');
const goLogin = document.querySelector('#goLogin');
const goAutoLogin = document.querySelector('#goAutoLogin');
const goSignup = document.querySelector('#goSignup');
const checkbox = document.querySelector('#checkbox');
const types = document.querySelectorAll("input[name='type']");
const gcn = document.querySelector('#gcn');
const password = document.querySelector('#password');
const sendVerifyCode = document.querySelector('#sendVerifyCode');

const actionWindowWidth = actionWindow.getBoundingClientRect().width;

let current = 'login';
let loginSubmitable = true;
let signupSubmitable = true;
let verifyCodeSendable = true;

let hash = 'none';
document.cookie.split(';').forEach((string) => {
  const splited = string.split('=');
  if (splited[0] === 'hash') {
    hash = splited[1];
  }
});

if (hash !== 'none') {
  window.location.href = '/members';
}

loginButton.addEventListener('click', () => {
  current = 'login';
  loginButton.classList.add('blue');
  signupButton.classList.remove('blue');
  actionWindow.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
});

signupButton.addEventListener('click', () => {
  current = 'signup';
  signupButton.classList.add('blue');
  loginButton.classList.remove('blue');
  actionWindow.scrollTo({
    top: 0,
    left: actionWindowWidth,
    behavior: 'smooth',
  });
});

sendVerifyCode.addEventListener('click', () => {
  if (!verifyCodeSendable) return;
  verifyCodeSendable = false;
  const signupEmail = document.querySelector('#signupEmail');
  alert(`${signupEmail.value}@hcu.hs.kr로 인증번호를 전송했어요.`);
  fetch(
    `http://localhost:3001/home/sendVerifyCode?address=${signupEmail.value}`
  )
    .then((res) => res.json())
    .then(() => {
      verifyCodeSendable = true;
    });
});

types.forEach((type) => {
  type.addEventListener('change', () => {
    const typeValue = document.querySelector(
      "input[name='type']:checked"
    ).value;
    switch (typeValue) {
      case 'student':
        gcn.placeholder = '학반번호를 입력하세요';
        password.placeholder = '비밀번호를 입력하세요';
        break;
      case 'teacher':
        gcn.placeholder = '성명을 입력하세요';
        password.placeholder = '비밀번호를 입력하세요';
        break;
      case 'admin':
        gcn.placeholder = 'Enter admin unique code';
        password.placeholder = 'Enter password for admin account';
        break;
    }
  });
});

function loginFunction() {
  if (!loginSubmitable) return;
  loginSubmitable = false;

  const gcn = document.querySelector('#gcn').value;
  const password = document.querySelector('#password').value;
  const type = document.querySelector("input[name='type']:checked").value;

  fetch('http://localhost:3001/home/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type,
      gcn,
      password,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      loginSubmitable = true;
      if (result.error === 'SOMETHING WRONG') {
        alert('SOMETHING WRONG');
      } else if (result.error === 'NONE') {
        if (localStorage.getItem('autologin') === 'true') {
          document.cookie = `hash=${result.hash};Max-Age=34560000`;
        } else {
          document.cookie = `hash=${result.hash};Max-Age=5`;
        }
        window.location.href = '/members';
      }
    });
}

goLogin.addEventListener('click', () => {
  localStorage.setItem('autologin', 'false');
  loginFunction();
});

goAutoLogin.addEventListener('click', () => {
  localStorage.setItem('autologin', 'true');
  loginFunction();
});

checkbox.addEventListener('click', () => {
  if (checkbox.checked) {
    goSignup.classList.remove('unsignupableduetotacs');
  } else {
    goSignup.classList.add('unsignupableduetotacs');
  }
});

password.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    goLogin.click();
  }
});

goSignup.addEventListener('click', () => {
  if (!signupSubmitable) return;
  if (!checkbox.checked) return;
  signupSubmitable = false;
  let banFetch = false;

  const signupGcn = document.querySelector('#signupGcn');
  const signupPassword = document.querySelector('#signupPassword');
  const signupName = document.querySelector('#signupName');
  const _signupBank = document.querySelector('#signupBank');
  const signupBank = _signupBank.options[_signupBank.selectedIndex];
  const signupAccount = document.querySelector('#signupAccount');
  const signupEmail = document.querySelector('#signupEmail');
  const signupVerifyCode = document.querySelector('#signupVerifyCode');

  const mailContainer = document.querySelector('#mailContainer');
  const verifyCodeContainer = document.querySelector('#verifyCodeContainer');

  signupGcn.classList.remove('borderRed');
  signupPassword.classList.remove('borderRed');
  signupName.classList.remove('borderRed');
  mailContainer.classList.remove('borderRed');
  verifyCodeContainer.classList.remove('borderRed');

  if (signupGcn.value === '') {
    signupGcn.classList.add('borderRed');
    banFetch = true;
  }

  if (signupPassword.value === '') {
    signupPassword.classList.add('borderRed');
    banFetch = true;
  }

  if (signupName.value === '') {
    signupName.classList.add('borderRed');
    banFetch = true;
  }

  if (signupEmail.value === '') {
    mailContainer.classList.add('borderRed');
    banFetch = true;
  }

  if (signupVerifyCode.value === '') {
    verifyCodeContainer.classList.add('borderRed');
    banFetch = true;
  }

  if (banFetch) {
    signupSubmitable = true;
    signupWindow.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    actionWindow.style.animation = 'shake 0.5s';
    setTimeout(() => {
      actionWindow.style.animation = '';
    }, 500);
    return;
  }

  fetch('http://localhost:3001/home/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      gcn: signupGcn.value,
      password: signupPassword.value,
      name: signupName.value,
      bank: signupBank.value,
      account: signupAccount.value ? signupAccount.value : 'none',
      email: signupEmail.value,
      verifyCode: signupVerifyCode.value,
    }),
  })
    .then((res) => res.json())
    .then(({ error }) => {
      signupSubmitable = true;
      switch (error) {
        case 'NONE':
          alert('계정 생성 완료!');
          location.reload();
          break;
        case 'INPUT ERROR':
          alert('입력에 문제 존재 -> 계정 생성 실패...');
          break;
        case 'ALREADY EXIST':
          alert('이미 계정 존재 -> 계정 생성 실패...');
          break;
        case 'VERIFY WRONG':
          alert('인증번호 틀림 -> 계정 생성 실패...');
          break;
        case 'USED EMAIL':
          alert('이미 사용된 메일 주소 -> 계정 생성 실패...');
          break;
      }
    });
});

loginButton.click();
