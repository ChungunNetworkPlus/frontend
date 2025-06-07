<style scoped>
#container {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 50px;
}

#core {
  width: 700px;
  /* border: 1px solid black; */
}

#title {
  font-size: 50px;
}

#topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Pretendard-Bold';
}

#setting {
  background-image: url('/images/setting.png');
  height: 80%;
  aspect-ratio: 1/1;
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  transition: transform 0.2s;
}

#setting:hover {
  transform: rotate(90deg);
}

#userInfo {
  display: flex;
  align-items: center;
  height: 35px;
  gap: 5px;
}

.articlesName {
  font-family: 'Pretendard-Bold';
  font-size: 20px;
}

img {
  object-fit: cover;
  height: 100%;
}

.writeNew {
  height: 15px;
  display: flex;
  gap: 5px;
}

#myArticles {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#myArticles,
#sellWantingArticles {
  margin-bottom: 10px;
}

#sellWantingArticles {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.articlesContainer {
  margin-bottom: 70px;
}

#information {
  background-color: var(--UnBlue);
  border-radius: 20px;
  padding: 30px;
  border: var(--UnBorder);
  font-family: 'Pretendard-Regular';
  box-shadow: var(--UnShadow);
  margin-bottom: 70px;
}

#informationTitle {
  font-family: 'Pretendard-Bold';
  font-size: 20px;
}

.closeForever {
  width: 100px;
  color: red;
}

.selectionContainer {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.sellCatagory {
  font-size: 14px;
}

#logoutButton {
  font-family: 'Pretendard-Regular';
  padding: 5px 20px;
  border-radius: 100px;
  background-color: rgb(237, 237, 237);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.2s;
}

#logoutButton:hover {
  color: red;
}

#logoutZone {
  display: flex;
  justify-content: right;
  margin-bottom: 70px;
}

#goWriteNew {
  border: var(--UnBorder);
  border-radius: 20px;
  background-color: var(--UnBlue);
  font-family: 'Pretendard-Bold';
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: var(--UnShadow);
  height: 80px;
  text-align: center;
}
</style>

<script setup>
useHead({
  title: () => 'Goorm | 희망식 거래 플랫폼',
});

const myarticles = ref([]);
const articles = ref([]);

const information = ref();
const gradeclassnumber = ref('#학년 #반 #번 아무개');

const myarticlesExist = computed(() => {
  return myarticles.value.length === 0;
});

let change1 = ref('판매하기');
let change2 = ref('모두');
let makingNewArticleAble = true;
let doneFetching = ref(false);

let interval;
let hash = 'none';
let gcnn = '##### 아무개';
let socket;

const filteredArticles = computed(() => {
  if (change2.value === '모두') {
    return articles.value;
  } else {
    return articles.value.filter(
      (article) => article.subject === change2.value
    );
  }
});

function onchange1(toWhat) {
  change1.value = toWhat;
}

function onchange2(toWhat) {
  change2.value = toWhat;
}

function closeInfoWindow() {
  information.value.remove();
  localStorage.setItem('information', 'close');
}

function logout() {
  localStorage.setItem('autologin', 'false');
  clearInterval(interval);
  document.cookie = 'hash=something;Max-Age=0';
  window.location.href = '/';
}

function getCurrentTime() {
  const date = new Date();

  const formatted = date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return formatted;
}

function makeNewArticle() {
  if (!makingNewArticleAble) return;
  makingNewArticleAble = false;
  const currentOrder =
    myarticles.value.length === 0 ? 1 : myarticles.value[0].order + 1;

  myarticles.value = [
    {
      price: '3000',
      modify_time: getCurrentTime(),
      subject: 'none',
      type: 'sell',
      order: currentOrder,
    },
    ...myarticles.value,
  ];
  fetch('http://localhost:3001/goorm/uploadArticle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      hash,
      subject: 'none',
      modify_time: getCurrentTime(),
      price: '3000',
      type: 'sell',
      order: currentOrder,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      makingNewArticleAble = true;
      if (result.error === 'UNDEFINED HASH') {
        alert('undefined hash');
        myarticles.value.unshift();
      }
      if (result.error === 'NONE') {
        myarticles.value[0].code = result.code;
        socket.send('ARTICLE MODIFIED');
      }
    });
}

function changeMyArticleValue(
  code,
  price = 'init',
  modify_time = 'init',
  subject = 'init'
) {
  for (let article of myarticles.value) {
    if (article.code === code) {
      if (price !== 'init') article.price = price;
      if (modify_time !== 'init') article.modify_time = modify_time;
      if (subject !== 'init') article.subject = subject;
    }
  }

  fetch('http://localhost:3001/goorm/modifyArticle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      hash,
      code,
      price,
      modify_time,
      subject,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.error === 'UNDEFINED HASH') {
        alert('undefined hash');
      }
      if (result.error === 'NO ARTICLE') {
        alert('no article');
      }
      if (result.error === 'ACCESS DENIED') {
        alert('access denied');
      }
      if (result.error === 'NONE') {
        socket.send('ARTICLE MODIFIED');
      }
    });
}

function removeMyArticle(code) {
  myarticles.value = myarticles.value.filter(
    (article) => article.code !== code
  );

  fetch('http://localhost:3001/goorm/removeArticle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      hash,
      code,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.error === 'UNDEFINED HASH') {
        alert('undefined hash');
      }
      if (result.error === 'NO ARTICLE') {
        alert('no article');
      }
      if (result.error === 'ACCESS DENIED') {
        alert('access denied');
      }
      if (result.error === 'NONE') {
        socket.send('ARTICLE MODIFIED');
      }
    });
}

function purchase(code) {
  for (let article of articles.value) {
    if (article.code === code) {
      article.trader_gcn = gcnn.split(' ')[0];
      article.trader_name = gcnn.split(' ')[1];
    }
  }

  fetch('http://localhost:3001/goorm/purchase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      hash,
      code,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.error === '') {
      }
    });
}

onMounted(() => {
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

  if (localStorage.getItem('information') === 'close') {
    information.value.remove();
  }

  fetch(`http://localhost:3001/home/getGCNN?hash=${hash}`)
    .then((res) => res.json())
    .then((result) => {
      if (result.error === 'UNDEFINED HASH') {
        gradeclassnumber.value = 'Undefined';
      }
      if (result.error === 'NONE') {
        const gcn = result.gcn;
        const name = result.name;
        const grade = gcn[0];
        const className = gcn.slice(2, 3);
        const number = gcn.slice(3);
        if (gcn === 'Admin') {
          gradeclassnumber.value = 'Admin account';
          gcnText.remove();
        } else {
          gradeclassnumber.value = `${grade}학년 ${className}반 ${number}번 ${name}`;
        }
        gcnn = `${gcn} ${name}`;
      }
      doneFetching.value = true;
    });

  fetch(`http://localhost:3001/goorm/getMyArticles?hash=${hash}`)
    .then((res) => res.json())
    .then((result) => {
      if (result.error === 'UNDEFINED HASH') {
        alert('undefined hash');
      }
      if (result.error === 'NONE') {
        myarticles.value = result.articles;
      }
    });

  function functionForSocket() {
    fetch(`http://localhost:3001/goorm/getSellingArticles?hash=${hash}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.error === 'UNDEFINED HASH') {
          alert('undefined hash');
        }
        if (result.error === 'NONE') {
          articles.value = result.articles;
        }
      });
  }

  functionForSocket();

  socket = new WebSocket('ws://localhost:3001');

  socket.onmessage = (event) => {
    if (event.data === 'RELOAD ARTICLES') {
      functionForSocket();
    }
  };
});
</script>

<template>
  <div id="container">
    <div id="core">
      <div id="topbar">
        <div id="title">Goorm</div>
        <div id="userInfo">
          <div id="gcnText">학반번호 :</div>
          <UnPill font="bold" background="blue" border="un" shadow="un">{{
            gradeclassnumber
          }}</UnPill>
          <a id="setting" href="/account" target="_blank"></a>
        </div>
      </div>
      <div id="logoutZone">
        <div id="logoutButton" @click="logout">로그아웃</div>
      </div>

      <div id="information" ref="information">
        <div id="informationTitle">알아둘 사항</div>
        <p>
          - 일요일 오후 9시 이후 모든 거래 희망글은 삭제되며, "이전 글" 란에서
          확인할 수 있습니다.
        </p>
        <p>- 금주 토요일, 일요일 희망식에 한해서만 거래할 수 있습니다.</p>
        <p>
          - 계좌번호가 없을 시 판매 글을 작성할 수 없습니다. 설정에서 계좌번호를
          추가하세요.
        </p>
        <p>
          - 계좌번호는 희망식 구매자가 귀하의 계좌번호를 알고 송금하기 위해
          복사하는 것을 제외한 용도로는 결코 이용되지 않습니다.
        </p>
        <div style="display: flex; justify-content: right">
          <UnPill class="closeForever" @click="closeInfoWindow"
            >영구히 닫기</UnPill
          >
        </div>
      </div>

      <div class="selectionContainer">
        <UnSelect
          :options="['판매하기', '이전 글', '구매하기']"
          backgroundColor="var(--UnBlue)"
          @onchange="onchange1"
        ></UnSelect>
      </div>

      <div class="articlesContainer">
        <div id="myArticles">
          <div class="articlesName">내 판매글들</div>
          <UnPill class="writeNew" border="un" @click="makeNewArticle"
            ><img src="/images/plus.svg" />새 판매글 쓰기</UnPill
          >
        </div>
        <div id="goWriteNew" v-if="myarticlesExist">
          새 판매글 쓰기를 눌러<br />판매글을 작성해보세요!
        </div>
        <MyArticle
          v-else
          v-for="article in myarticles"
          :type="article.type"
          :price="article.price"
          :seller="article.seller"
          :modify_time="article.modify_time"
          :subject="article.subject"
          :code="article.code"
          :key="article.code"
          @onchange="changeMyArticleValue"
          @onremove="removeMyArticle"
        ></MyArticle>
      </div>

      <div class="articlesContainer">
        <div id="sellWantingArticles">
          <div class="articlesName">판매를 희망하는 글들</div>
          <UnSelect
            :options="['모두', '토요일 석식', '일요일 조식', '일요일 석식']"
            backgroundColor="var(--UnSkyblue)"
            class="sellCatagory"
            @onchange="onchange2"
          ></UnSelect>
        </div>
        <Article
          v-if="doneFetching"
          v-for="article in filteredArticles"
          :type="article.type"
          :price="article.price"
          :owner="`${article.owner_gcn} ${article.owner_name}`"
          :modify_time="article.modify_time"
          :subject="article.subject"
          :code="article.code"
          :trader="`${article.trader_gcn} ${article.trader_name}`"
          :mygcnn="gcnn"
          :key="Math.random()"
          @onpurchase="purchase"
        ></Article>
      </div>
    </div>
  </div>
  <AppFooter></AppFooter>
</template>
