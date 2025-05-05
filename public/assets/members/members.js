const gradeclassnumber = document.querySelector('#gradeclassnumber');
const logoutButton = document.querySelector('#logoutButton');
const gcnText = document.querySelector('#gcnText');
const adminText = document.querySelector('#adminText');

let interval;

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

fetch(`http://localhost:3001/home/getGCNN?hash=${hash}`)
  .then((res) => res.json())
  .then((result) => {
    if (result.error === 'UNDEFINED HASH') {
      gradeclassnumber.textContent = 'Undefined';
    }
    if (result.error === 'NONE') {
      const gcn = result.gcn;
      const name = result.name;
      const grade = gcn[0];
      const className = gcn.slice(2, 3);
      const number = gcn.slice(3);
      if (gcn === 'Admin') {
        gradeclassnumber.textContent = 'Admin account';
        adminText.classList.remove('empty');
        gcnText.remove();
      } else {
        gradeclassnumber.textContent = `${grade}학년 ${className}반 ${number}번 ${name}`;
      }
    }
  });

logoutButton.addEventListener('click', () => {
  localStorage.setItem('autologin', 'false');
  clearInterval(interval);
  document.cookie = 'hash=something;Max-Age=0';
  window.location.href = '/';
});
