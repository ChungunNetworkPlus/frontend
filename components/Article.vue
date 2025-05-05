<style scoped>
#sellArticle {
  border-radius: 20px;
  border: var(--UnBorder);
  box-shadow: var(--UnShadow);
  padding: 20px;
  margin-bottom: 15px;
  position: relative;
  overflow: hidden;
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
}

#price {
  font-size: 40px;
  font-family: 'Pretendard-Regular';
}

.boldText {
  font-family: 'Pretendard-ExtraBold';
}

.requestBuying {
  font-family: 'Pretendard-Bold';
}

#priceInput {
  font-size: 40px;
  width: 130px;
  outline: none;
  border: none;
  border-radius: 15px;
  padding: 0 15px;
  font-family: 'Pretendard-Bold';
}

.mint {
  background-color: rgb(180, 235, 230);
}
.pink {
  background-color: rgb(254, 210, 226);
}

#soldText,
#soldByMeText {
  font-family: 'Pretendard-Bold';
  font-size: 40px;
  color: black;
}

#sellerAccount {
  color: blue;
  text-decoration: underline;
}

.blueBG {
  background-color: var(--UnBlue);
}
.skyblueBG {
  background-color: var(--UnSkyblue);
}
</style>

<script setup>
const props = defineProps([
  'type',
  'price',
  'owner',
  'modify_time',
  'subject',
  'code',
  'trader',
  'mygcnn',
]);

const emits = defineEmits(['onpurchase']);

const sellArticleClass = computed(() => {
  if (props.trader === props.mygcnn) {
    return 'blueBG';
  } else {
    return 'skyblueBG';
  }
});

function requestPurchase() {}

function purchase() {
  emits('onpurchase', props.code);
}
</script>

<template>
  <div id="sellArticle" :class="sellArticleClass">
    <div id="mainPart">
      <div id="priceSeries">
        <UnPill
          class="subject"
          :class="props.type === 'sell' ? 'mint' : 'pink'"
          background="blue"
          >{{ props.subject }}</UnPill
        >
        <div id="price">
          ₩
          <input
            v-if="props.price === 'initiative'"
            type="text"
            id="priceInput"
            placeholder="희망가"
          />
          <span v-else class="boldText">{{ props.price }}</span>
        </div>
      </div>
      <UnPill
        class="requestBuying"
        v-if="props.trader === 'none none'"
        @click="purchase"
        >{{
          props.price === 'initiative' ? '구매 요청하기' : '구매하기'
        }}</UnPill
      >
      <div v-if="props.trader === props.mygcnn" id="soldByMeText">
        내가 구매함
      </div>
      <div
        v-if="props.trader !== props.mygcnn && props.trader !== 'none none'"
        id="soldText"
      >
        SOLD
      </div>
    </div>
    <div id="subPart">
      <div style="display: flex">
        <div>
          {{ props.type === 'sell' ? '판매자' : '구매자' }} : {{ props.owner }}
        </div>
        <div v-if="props.trader === props.mygcnn">
          &nbsp;&nbsp;·&nbsp;&nbsp;판매자의 계좌번호 :
          <span id="sellerAccount">{{ 'hello world' }}</span>
        </div>
      </div>
      <div>{{ props.modify_time }}</div>
    </div>
  </div>
</template>
