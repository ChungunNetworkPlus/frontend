<style scoped>
@import 'public/assets/members/members.css';
</style>

<template>
  <div id="container">
    <div id="core">
      <div id="projectName">
        Chungun Network +<span
          class="empty"
          style="color: rgb(196, 217, 255)"
          id="adminText"
          >&nbsp;Admin</span
        >
      </div>
      <div id="aboutAccount">
        <div id="logoutButton">로그아웃</div>
        <div id="aboutMe">
          <div id="gcnText">학반번호 :</div>
          <div id="gradeclassnumber">#학년 #반 #번 아무개</div>
          <a id="setting" href="/account" target="_blank"></a>
        </div>
      </div>
      <div id="membersContainer">
        <a
          class="paper"
          id="umjigimPaper"
          href="https://umjigim.vercel.app/"
          target="_blank"
        >
          <div class="imageContainer">
            <img src="/images/umjigim_preview.png" class="previewImage" />
          </div>
          <div class="textContainer">
            <div>2024 움직임(Umjigim)</div>
            <div>청운인의 청운인을 위한 청운인에 의한 동아리 홍보 사이트</div>
          </div>
        </a>
        <div class="paper" id="poormPaper">
          <div class="imageContainer">
            <img src="/images/unknown_preview.png" class="previewImage" />
          </div>
          <div class="textContainer">
            <div>푸름(Poorm)</div>
            <div>
              청운급식네트워크 part1. QR 코드를 이용한 주말 희망식 출석 체커
            </div>
          </div>
        </div>
        <a class="paper" id="goormPaper" href="/goorm">
          <div class="imageContainer">
            <img src="/images/unknown_preview.png" class="previewImage" />
          </div>
          <div class="textContainer">
            <div>구름(Goorm)</div>
            <div>청운급식네트워크 part2. 주말 희망식 거래 플랫폼</div>
          </div>
        </a>
        <div class="paper" id="blueboardPaper">
          <div class="imageContainer">
            <img src="/images/unknown_preview.png" class="previewImage" />
          </div>
          <div class="textContainer">
            <div>블루보드(BlueBoard)</div>
            <div>청운 온라인 질문 게시판</div>
          </div>
        </div>
        <a
          class="paper"
          id="blueboardalphaPaper"
          style="background-color: lightgray !important"
          href="https://chungunnetworkplus.github.io/BlueBoardAlpha/"
          target="_blank"
        >
          <div class="imageContainer">
            <img
              src="/images/blueboardalpha_preview.png"
              class="previewImage"
            />
          </div>
          <div class="textContainer">
            <div>블루보드(BlueBoard) alpha</div>
            <div>청운 온라인 질문 게시판 알파 버전</div>
          </div>
        </a>
      </div>
    </div>
  </div>
  <AppFooter></AppFooter>
</template>

<script setup>
import { onMounted } from 'vue';
onMounted(() => {
  useHead({
    title: () => '청운네트워크 + | 구성원',
    script: [
      {
        src: 'assets/members/members.js',
        async: true,
      },
    ],
  });
});
</script>
