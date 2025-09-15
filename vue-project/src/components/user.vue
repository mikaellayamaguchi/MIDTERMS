<template>
  <div class="user-page">
    <form @submit.prevent="submitForm">
      <label for="firstName">First Name</label>
      <input type="text" id="firstName" v-model="formData.firstName" />
      <br />
      <label for="lastName">Last Name</label>
      <input type="text" id="lastName" v-model="formData.lastName" />
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
  firstName: '',
  lastName: '',
});

function submitForm() {
  console.log('Submitting User data:', formData.value);
 
}
</script>

<style scoped>

</style>