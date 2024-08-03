<template>
  <button type="button" @click="handleClick" :disabled="isDisabled">test</button>
  <p>{{ textValue }}</p>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const textValue = ref('');
const isDisabled = ref(false);

const handleClick = () => {
  fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then((response) => response.json())
    .then((data) => {
      textValue.value = data.title;
      isDisabled.value = true;
    })
    .catch((error) => alert(error));
};

onMounted(() => {
  fetch('https://jsonplaceholder.typicode.com/users/1')
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
});
</script>

<style scoped></style>
