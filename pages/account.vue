<style scoped>
@import 'public/assets/account/account.css';
</style>

<template>
  <div id="container">
    <div id="core">
      <div id="title">내 정보 & 내 정보 바꾸기</div>
      <div id="myInfo">
        <p>이름 : <span class="highlight" id="nameShow">아무개</span></p>
        <p>학반번호 : <span class="highlight" id="gcnShow">40101</span></p>
        <p>
          계좌 :
          <span class="highlight" id="accountShow">없음</span>
        </p>
        <p>
          학교 메일 :
          <span class="highlight" id="emailShow">2440101@hcu.hs.kr</span>
        </p>
      </div>
      <div class="newThings">
        <div>현재 비밀번호<span class="fontred">*</span></div>
        <input
          type="password"
          placeholder="현재 비밀번호를 입력하세요"
          id="currentPassword"
        />
      </div>
      <div class="newThings">
        <div>새 비밀번호</div>
        <input
          type="password"
          placeholder="계좌번호만 바꾸려면 비우세요"
          id="newPassword"
        />
      </div>
      <div class="newThings">
        <div>계좌 은행</div>
        <select name="bank" id="newBank">
          <option value="none">--비밀번호만 바꾸려면 선택하지 마세요--</option>
          <option value="toss">토스뱅크</option>
          <option value="kakao">카카오뱅크</option>
          <option value="k">케이뱅크</option>
          <option value="naver">네이버페이</option>
          <option value="NH">NH콬뱅크</option>
        </select>
      </div>

      <div class="newThings">
        <div>새 계좌번호</div>
        <input
          type="text"
          placeholder="비밀번호만 바꾸려면 비우세요"
          id="newAccount"
        />
      </div>
      <button id="goChange">내 정보 바꾸기</button>
    </div>
  </div>
  <AppFooter></AppFooter>
</template>

<script setup>
import { onMounted } from 'vue';
onMounted(() => {
  useHead({
    title: () => '청운네트워크 + | 계정 정보',
    script: [
      {
        src: 'assets/account/account.js',
        async: true,
      },
    ],
  });
});
</script>
