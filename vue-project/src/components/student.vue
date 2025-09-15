<template>
  <div class="student-page">
    <form @submit.prevent="submitForm">
      <label for="firstName">First Name</label>
      <input type="text" id="firstName" v-model="formData.firstName" />
      <br />
      <label for="lastName">Last Name</label>
      <input type="text" id="lastName" v-model="formData.lastName" />
      <br />
      <label for="yearAndSection">Year and Section</label>
      <input type="text" id="yearAndSection" v-model="formData.yearAndSection" />
      <br />
      <button type="submit">Submit</button>
    </form>

    <div v-if="successMessage" class="success-message">
      <p>{{ successMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
  firstName: '',
  lastName: '',
  yearAndSection: '',
});

const successMessage = ref('');

function submitForm() {
  successMessage.value = '';

  fetch('http://localhost:5000/getStudent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData.value),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Server response:', data);
    successMessage.value = data.message;
    formData.value = { firstName: '', lastName: '', yearAndSection: '' };
  })
  .catch(error => {
    console.error('Error:', error);
    successMessage.value = 'An error occurred. Please try again.';
  });
}
</script>

<style scoped>

.success-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #161616;
  color: #d1cfcf;
  border: 1px solid #0e0e0e;
  border-radius: 4px;
}
</style>