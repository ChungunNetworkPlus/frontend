const goChange = document.querySelector('#goChange');
const core = document.querySelector('#core');

let interval;
let submitable = true;

let hash = 'none';
document.cookie.split(';').forEach((string) => {
  const splited = string.split('=');
  if (splited[0] === 'hash') {
    hash = splited[1];
  }
});

if (hash === 'none') {
  window.location.href = '/';
} else {
  if (localStorage.getItem('autologin') === 'false') {
    document.cookie = `hash=${hash};Max-Age=5`;
    interval = setInterval(() => {
      document.cookie = `hash=${hash};Max-Age=5`;
    }, 5000);
  }
}

fetch(`http://localhost:3001/home/getEverything?hash=${hash}`)
  .then((res) => res.json())
  .then((result) => {
    const nameElement = document.querySelector('#nameShow');
    const gcnElement = document.querySelector('#gcnShow');
    const accountElement = document.querySelector('#accountShow');
    const emailElement = document.querySelector('#emailShow');

    if (result.error === 'UNDEFINED HASH') {
      nameElement.textContent = 'Undefined';
      gcnElement.textContent = 'Undefined';
      accountElement.textContent = 'Undefined';
      emailElement.textContent = 'Undefined';
    }
    if (result.error === 'NONE') {
      const name = result.name;
      const gcn = result.gcn;
      const account = result.account === 'none none' ? '없음' : result.account;
      const email = result.email + '@hcu.hs.kr';

      nameElement.textContent = name;
      gcnElement.textContent = gcn;
      accountElement.textContent = account;
      emailElement.textContent = email;
    }
  });

goChange.addEventListener('click', () => {
  if (!submitable) return;
  submitable = false;

  const currentPassword = document.querySelector('#currentPassword');
  const newPassword = document.querySelector('#newPassword');
  const _newBank = document.querySelector('#newBank');
  const newBank = _newBank.options[_newBank.selectedIndex];
  const newAccount = document.querySelector('#newAccount');

  currentPassword.classList.remove('borderRed');

  if (currentPassword.value === '') {
    currentPassword.classList.add('borderRed');
    submitable = true;
    core.style.animation = 'shake 0.5s';
    setTimeout(() => {
      core.style.animation = '';
    }, 500);
    return;
  }

  fetch('http://localhost:3001/home/changeInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      hash,
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
      newBank: newBank.value,
      newAccount: newAccount.value,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.error === 'WRONG PASSWORD') {
        alert('WRONG PASSWORD');
      }
      if (result.error === 'NONE') {
        alert('성공적으로 계정 정보를 업데이트 했습니다.');
        window.close();
      }
    });
});
