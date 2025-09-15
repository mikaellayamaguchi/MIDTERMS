<template>
  <div class="admin-page">
    <h2>Add New Admin</h2>
    <form @submit.prevent="createAdmin">
      <label for="firstName">First Name</label>
      <input type="text" id="firstName" v-model="newAdmin.firstName" required />
      <br />
      <label for="lastName">Last Name</label>
      <input type="text" id="lastName" v-model="newAdmin.lastName" required />
      <br />
      <button type="submit">Add Admin</button>
    </form>

    <div v-if="successMessage" class="success-message">
      <p>{{ successMessage }}</p>
    </div>

    <hr />

    <h2>Admin List</h2>
    <div v-if="admins.length > 0" class="admin-list">
      <ul>
        <li v-for="admin in admins" :key="admin.id">
          <div v-if="editingAdminId !== admin.id">
            <span>{{ admin.firstName }} {{ admin.lastName }}</span>
            <button @click="startEditing(admin)">Edit</button>
            <button @click="deleteAdmin(admin.id)">Delete</button>
          </div>

          <div v-else class="edit-form">
            <input v-model="editedAdmin.firstName" />
            <input v-model="editedAdmin.lastName" />
            <button @click="updateAdmin">Save</button>
            <button @click="cancelEditing">Cancel</button>
          </div>
        </li>
      </ul>
    </div>
    <p v-else>No admins found.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const admins = ref([]);
const newAdmin = ref({
  firstName: '',
  lastName: '',
});
const successMessage = ref('');

const editingAdminId = ref(null);
const editedAdmin = ref({});

const fetchAdmins = async () => {
  try {
    const response = await fetch('http://localhost:5000/admins');
    if (!response.ok) throw new Error('Failed to fetch admins.');
    admins.value = await response.json();
  } catch (error) {
    console.error('Error fetching admins:', error);
    successMessage.value = 'An error occurred while fetching admins.';
  }
};

const createAdmin = async () => {
  try {
    const response = await fetch('http://localhost:5000/admins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAdmin.value),
    });
    if (!response.ok) throw new Error('Failed to create admin.');
    
    const data = await response.json();
    console.log('Server response:', data);
    successMessage.value = data.message;
    newAdmin.value = { firstName: '', lastName: '' };
    fetchAdmins(); 
  } catch (error) {
    console.error('Error creating admin:', error);
    successMessage.value = 'An error occurred. Please try again.';
  }
};

const deleteAdmin = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/admins/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete admin.');
    
    const data = await response.json();
    successMessage.value = data.message;
    fetchAdmins();
  } catch (error) {
    console.error('Error deleting admin:', error);
    successMessage.value = 'An error occurred while deleting the admin.';
  }
};

const startEditing = (admin) => {
  editingAdminId.value = admin.id;
  editedAdmin.value = { ...admin };
};

const cancelEditing = () => {
  editingAdminId.value = null;
  editedAdmin.value = {};
};

const updateAdmin = async () => {
  try {
    const response = await fetch(`http://localhost:5000/admins/${editedAdmin.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedAdmin.value),
    });
    if (!response.ok) throw new Error('Failed to update admin.');
    
    const data = await response.json();
    successMessage.value = data.message;
    cancelEditing(); 
    fetchAdmins(); 
  } catch (error) {
    console.error('Error updating admin:', error);
    successMessage.value = 'An error occurred while updating the admin.';
  }
};

onMounted(fetchAdmins);
</script>
