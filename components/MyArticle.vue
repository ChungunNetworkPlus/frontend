<style scoped>
#sellArticle {
  border-radius: 20px;
  background-color: var(--UnSkyblue);
  border: var(--UnBorder);
  box-shadow: var(--UnShadow);
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 15px;
  transition: height 0.3s, padding-top 0.3s, padding-bottom 0.3s,
    margin-bottom 0.3s, opacity 0.3s, border-width 0.3s;
  overflow: hidden;
  box-sizing: border-box;
}

.compression {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  margin-bottom: 0px !important;
  opacity: 0;
  border-width: 0px !important;
}

#priceSeries {
  display: flex;
  gap: 20px;
  align-items: center;
}

#mainPart {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#subPart {
  display: flex;
  justify-content: space-between;
  color: gray;
  font-family: 'Pretendard-Regular';
}

.subject {
  font-family: 'Pretendard-Regular';
  padding: 5px 12px !important;
}

#price {
  font-size: 40px;
  font-family: 'Pretendard-Regular';
  display: flex;
  align-items: center;
  gap: 10px;
}

.boldText {
  font-family: 'Pretendard-ExtraBold';
  font-size: 40px;
}

.removeArticle {
  font-family: 'Pretendard-Regular';
  color: red;
}

#priceInput {
  font-size: 40px;
  width: 130px;
  outline: none;
  border: none;
  border-radius: 15px;
  padding: 0 15px;
}

#subjectSelection {
  text-align: center;
  font-family: 'Pretendard-Regular';
  border: none;
  background-color: rgba(0, 0, 0, 0);
  outline: none;
  font-size: 15px;
}

#unpills {
  display: flex;
  gap: 15px;
}

.mint {
  background-color: rgb(180, 235, 230);
}
.pink {
  background-color: rgb(254, 210, 226);
}
</style>

<script setup>
const props = defineProps([
  'type',
  'price',
  'seller',
  'modify_time',
  'subject',
  'code',
]);
const emits = defineEmits(['onchange', 'onremove']);

const sellArticle = ref();

let selectedValue = ref(props.subject);
let priceValue = ref(props.price);

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

function onchangesubject() {
  emits('onchange', props.code, 'init', getCurrentTime(), selectedValue.value);
}

function onchangeprice() {
  emits('onchange', props.code, priceValue.value, getCurrentTime(), 'init');
}

function oninitiative() {
  emits('onchange', props.code, 'initiative', getCurrentTime(), 'init');
}

function onremove() {
  sellArticle.value.style.height = '0px';
  sellArticle.value.classList.add('compression');
  setTimeout(() => {
    emits('onremove', props.code);
  }, 500);
}

onMounted(() => {
  sellArticle.value.style.height = sellArticle.value.offsetHeight + 'px';
});
</script>

<template>
  <div id="sellArticle" ref="sellArticle">
    <div id="mainPart">
      <div id="priceSeries">
        <UnPill class="subject" :class="props.type === 'sell' ? 'mint' : 'pink'"
          ><select
            v-model="selectedValue"
            id="subjectSelection"
            @change="onchangesubject"
          >
            <option value="none">--선택--</option>
            <option value="토요일 석식">토요일 석식</option>
            <option value="일요일 조식">일요일 조식</option>
            <option value="일요일 석식">일요일 석식</option>
          </select></UnPill
        >
        <div v-if="props.price === 'initiative'" class="boldText">
          선제시 받아요
        </div>
        <div id="price" v-else>
          ₩
          <input
            type="number"
            class="boldText"
            id="priceInput"
            v-model="priceValue"
            @input="onchangeprice"
          />
        </div>
      </div>
      <div id="unpills">
        <UnPill v-if="props.price !== 'initiative'" @click="oninitiative"
          >선제시받기</UnPill
        >
        <UnPill class="removeArticle" @click="onremove">삭제하기</UnPill>
      </div>
    </div>
    <div id="subPart">
      <div>최종 수정 시간 : {{ props.modify_time }}</div>
    </div>
  </div>
</template>
