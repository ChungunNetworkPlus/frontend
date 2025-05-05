<script setup>
const props = defineProps(['font', 'background', 'border', 'shadow']);
const font = computed(() => {
  if (props.font === 'bold') {
    return 'boldFont';
  } else {
    return 'regularFont';
  }
});
const background = computed(() => {
  if (props.background === 'blue') {
    return 'blueBackground';
  } else {
    return 'justBackground';
  }
});
const border = computed(() => {
  if (props.border === 'un') {
    return 'unBorder';
  } else {
    return 'justBorder';
  }
});

const shadow = computed(() => {
  if (props.shadow === 'un') {
    return 'unShadow';
  } else {
    return 'justShadow';
  }
});
</script>

<style scoped>
#fancy {
  padding: 5px 20px;
  border-radius: 100px;
  text-align: center;
  /* transition: background-color 0.2s; */
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.regularFont {
  font-family: 'Pretendard-Regular';
}
.boldFont {
  font-family: 'Pretendard-Bold';
}

.blueBackground {
  background-color: rgb(196, 217, 255);
}
.justBackground {
  background-color: white;
}

.unBorder {
  border: 2.5px solid darkslategray;
}
.justBorder {
  border: none;
}

.unShadow {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.19), 0 4px 13px rgba(0, 0, 0, 0.05);
}
.justShadow {
  box-shadow: none;
}
</style>

<template>
  <span id="fancy" :class="[font, background, border, shadow]"
    ><slot></slot
  ></span>
</template>
