<template>
  <div class="user-page">
    <h2>Add New User</h2>
    <form @submit.prevent="createUser">
      <label for="firstName">First Name</label>
      <input type="text" id="firstName" v-model="newUser.firstName" required />
      <br />
      <label for="lastName">Last Name</label>
      <input type="text" id="lastName" v-model="newUser.lastName" required />
      <br />
      <button type="submit">Add User</button>
    </form>

    <div v-if="successMessage" class="success-message">
      <p>{{ successMessage }}</p>
    </div>

    <hr />

    <h2>User List</h2>
    <div v-if="users.length > 0" class="user-list">
      <ul>
        <li v-for="user in users" :key="user.id">
          <div v-if="editingUserId !== user.id">
            <span>{{ user.firstName }} {{ user.lastName }}</span>
            <button @click="startEditing(user)">Edit</button>
            <button @click="deleteUser(user.id)">Delete</button>
          </div>

          <div v-else class="edit-form">
            <input v-model="editedUser.firstName" />
            <input v-model="editedUser.lastName" />
            <button @click="updateUser">Save</button>
            <button @click="cancelEditing">Cancel</button>
          </div>
        </li>
      </ul>
    </div>
    <p v-else>No users found.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const users = ref([]);
const newUser = ref({
  firstName: '',
  lastName: '',
});
const successMessage = ref('');

const editingUserId = ref(null);
const editedUser = ref({});

const fetchUsers = async () => {
  try {
    const response = await fetch('http://localhost:5000/users');
    if (!response.ok) throw new Error('Failed to fetch users.');
    users.value = await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    successMessage.value = 'An error occurred while fetching users.';
  }
};

const createUser = async () => {
  try {
    const response = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser.value),
    });
    if (!response.ok) throw new Error('Failed to create user.');
    
    const data = await response.json();
    console.log('Server response:', data);
    successMessage.value = data.message;
    newUser.value = { firstName: '', lastName: '' };
    fetchUsers(); 
  } catch (error) {
    console.error('Error creating user:', error);
    successMessage.value = 'An error occurred. Please try again.';
  }
};

const deleteUser = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete user.');
    
    const data = await response.json();
    successMessage.value = data.message;
    fetchUsers(); 
  } catch (error) {
    console.error('Error deleting user:', error);
    successMessage.value = 'An error occurred while deleting the user.';
  }
};

const startEditing = (user) => {
  editingUserId.value = user.id;
  editedUser.value = { ...user }; 
};

const cancelEditing = () => {
  editingUserId.value = null;
  editedUser.value = {};
};

const updateUser = async () => {
  try {
    const response = await fetch(`http://localhost:5000/users/${editedUser.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedUser.value),
    });
    if (!response.ok) throw new Error('Failed to update user.');
    
    const data = await response.json();
    successMessage.value = data.message;
    cancelEditing(); 
    fetchUsers(); 
  } catch (error) {
    console.error('Error updating user:', error);
    successMessage.value = 'An error occurred while updating the user.';
  }
};

onMounted(fetchUsers);
</script>