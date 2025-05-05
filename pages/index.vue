<style scoped>
@import 'public/assets/main/main.css';
</style>

<template>
  <div id="container">
    <div id="core">
      <div id="projectName">Chungun Network +</div>
      <div id="selection">
        <div class="selectionButton" id="loginButton">로그인</div>
        <div class="selectionButton" id="signupButton">회원가입</div>
      </div>
      <div id="actionWindow">
        <div id="loginWindow">
          <div id="typeSelection">
            <div>
              <input
                type="radio"
                name="type"
                value="student"
                id="student"
                checked
              />
              <label for="student">학생</label>
            </div>
            <div>
              <input type="radio" name="type" value="teacher" id="teacher" />
              <label for="teacher">선생님</label>
            </div>
            <div>
              <input type="radio" name="type" value="admin" id="admin" />
              <label for="admin">관리자</label>
            </div>
          </div>
          <input
            id="gcn"
            class="idpw"
            type="text"
            placeholder="학반번호를 입력하세요"
          />
          <input
            id="password"
            class="idpw"
            type="password"
            placeholder="비밀번호를 입력하세요"
          />
          <div id="submitLogin">
            <button id="goLogin">로그인</button>
            <button id="goAutoLogin">자동 로그인</button>
          </div>
        </div>
        <div id="signupWindow">
          <div id="welcomeMSG">
            <div>Welcome Message</div>
            <p>반갑습니다. <span>청운네트워크 +</span>에 오신 걸 환영합니다.</p>
            <p>
              <span class="highlight">청운네트워크 +</span>에서는
              <span class="highlight">2024 움직임</span>, 청운급식네트워크
              <span class="highlight">Poorm & Goorm</span>, 청운질문게시판
              <span class="highlight">BlueBoard</span>를 이용하실 수 있습니다.
            </p>
            <p>이를 위해 회원가입 절차를 진행해주세요.</p>
          </div>
          <div class="signupReqs">
            <div class="inputInfo">학반번호<span class="fontred">*</span></div>
            <input
              class="inputArea"
              type="number"
              placeholder="예: 10616"
              id="signupGcn"
            />
          </div>
          <div class="signupReqs">
            <div class="inputInfo">비밀번호<span class="fontred">*</span></div>
            <input
              class="inputArea"
              type="password"
              placeholder="비밀번호를 입력하세요"
              id="signupPassword"
            />
          </div>
          <div class="signupReqs">
            <div class="inputInfo">이름<span class="fontred">*</span></div>
            <input
              class="inputArea"
              type="text"
              placeholder="이름을 입력하세요"
              id="signupName"
            />
          </div>
          <div class="signupReqs">
            <div class="inputInfo">계좌 은행</div>
            <select name="bank" id="signupBank" class="inputArea">
              <option value="none">--선택 안함--</option>
              <option value="toss">토스뱅크</option>
              <option value="kakao">카카오뱅크</option>
              <option value="k">케이뱅크</option>
              <option value="naver">네이버페이</option>
              <option value="NH">NH콬뱅크</option>
            </select>
          </div>
          <div class="signupReqs">
            <div class="inputInfo">계좌번호</div>
            <input
              type="text"
              placeholder="계좌번호를 입력하세요 (필수 아님)"
              id="signupAccount"
              class="inputArea"
            />
          </div>
          <div class="signupReqs">
            <div class="inputInfo">
              학교<br />메일주소<span class="fontred">*</span>
            </div>
            <div class="inputArea" id="mailContainer">
              <input
                type="text"
                placeholder="학교 메일주소를 입력하세요"
                id="signupEmail"
              />
              <div>@hcu.hs.kr</div>
            </div>
          </div>
          <div class="signupReqs">
            <div class="inputInfo">인증번호<span class="fontred">*</span></div>
            <div class="inputArea" id="verifyCodeContainer">
              <input
                type="text"
                placeholder="인증번호를 입력하세요"
                id="signupVerifyCode"
              />
              <div id="sendVerifyCode">인증번호 보내기</div>
            </div>
          </div>
          <div id="verifyInfo">
            학교 메일에서 인증번호를 확인하세요.<br />스팸 메일함에 들어있을
            수도 있습니다.
          </div>

          <div id="tacs">
            <div>약관</div>
            <p>
              - 귀하의 계좌번호는 "Goorm"에서 희망식 구매자가 귀하의 계좌번호를
              알고 송금하기 위해 복사하는 것을 제외한 용도로는 결코 이용되지
              않습니다.
            </p>
            <p>
              - "Goorm"에서 거래 희망글을 작성할 시 귀하의 기수, 학반번호,
              이름이 타인에게 노출됩니다.
            </p>
            <p>
              - "Goorm"에서 거래가 성사되었을 때 석식 구매자에게 귀하의
              계좌번호가 노출됩니다.
            </p>
            <p>
              - "BlueBoard"에서 귀하의 기수, 학반번호, 이름이 일반적인 상황에서
              노출되지 않으며 관리자만 열람할 수 있습니다.
            </p>
            <p style="color: rgb(120, 134, 199); font-weight: bold">
              - 비밀번호 찾기 기능을 지원하지 않으니 비밀번호를 잊어버렸을 때는
              계정을 삭제한 후 재가입해야 합니다. (문의:
              chungunnetworkplus@gmail.com)
            </p>
          </div>
          <div id="tacAgree">
            약관에 동의하십니까?<span class="fontred">*</span>
            <input type="checkbox" id="checkbox" />
          </div>
          <button id="goSignup" class="unsignupableduetotacs">회원가입</button>
        </div>
      </div>
    </div>
  </div>
  <AppFooter></AppFooter>
</template>

<script setup>
import { onMounted } from 'vue';
onMounted(() => {
  useHead({
    title: () => '청운네트워크 +',
    script: [
      {
        src: 'assets/main/main.js',
        async: true,
      },
    ],
  });
});
</script>
