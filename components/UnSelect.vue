<style scoped>
#unSelect {
  display: inline-flex;
  border: var(--UnBorder);
  border-radius: 100px;
  box-shadow: var(--UnShadow);
  font-family: 'Pretendard-Regular';
  position: relative;
  overflow: hidden;
}

.items {
  /* border: 1px solid black; */
  padding: 7px 12px;
  opacity: 0;
}

.items:nth-child(1) {
  padding-left: 20px;
}

.items:nth-last-child(1) {
  padding-right: 20px;
}

.fakeItems {
  position: absolute;
  top: 0;
  text-align: center;
  padding: 7px 12px;
  box-sizing: border-box;
  cursor: pointer;
}

.fakeItems:nth-child(1) {
  padding-left: 20px;
}

.fakeItems:nth-last-child(1) {
  padding-right: 20px;
}

#real {
  display: flex;
}

#backspace {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  transition: left 0.3s, width 0.3s;
}

.bold {
  font-family: 'Pretendard-Bold' !important;
}
</style>

<script setup>
const props = defineProps(['options', 'backgroundColor']);
const emits = defineEmits(['onchange']);

const items = ref([]);
const fakeItems = ref([]);
const unSelect = ref();
const backspace = ref();

let current = 0;

onMounted(() => {
  backspace.value.style.backgroundColor = props.backgroundColor;

  const unSelectLeft = unSelect.value.getBoundingClientRect().left;
  for (let i = 0; i < items.value.length; i++) {
    const rect = items.value[i].getBoundingClientRect();
    fakeItems.value[i].style.left = rect.left - unSelectLeft - 2.5 + 'px';
    fakeItems.value[i].style.width = rect.width + 'px';
    fakeItems.value[i].style.height = rect.height + 'px';

    fakeItems.value[i].addEventListener('click', () => {
      emits('onchange', props.options[i]);
      current = i;
      backspace.value.style.left = rect.left - unSelectLeft - 2.5 + 'px';
      backspace.value.style.width = rect.width + 'px';
      for (let j = 0; j < items.value.length; j++) {
        if (i === j) continue;
        fakeItems.value[j].classList.remove('bold');
      }
      fakeItems.value[i].classList.add('bold');
    });
  }
  fakeItems.value[0].click();
});
</script>

<template>
  <div id="unSelect" ref="unSelect">
    <div id="real">
      <div v-for="option in props.options" class="items" ref="items" ref-in-for>
        {{ option }}
      </div>
    </div>
    <div id="backspace" ref="backspace"></div>
    <div id="fake">
      <div
        v-for="option in props.options"
        class="fakeItems"
        ref="fakeItems"
        ref-in-for
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>
