<template>
  <div class="student-page">
    <h2>Add New Student</h2>
    <form @submit.prevent="createStudent">
      <label for="firstName">First Name</label>
      <input type="text" id="firstName" v-model="newStudent.firstName" required />
      <br />
      <label for="lastName">Last Name</label>
      <input type="text" id="lastName" v-model="newStudent.lastName" required />
      <br />
      <label for="yearAndSection">Year and Section</label>
      <input type="text" id="yearAndSection" v-model="newStudent.yearAndSection" required />
      <br />
      <button type="submit">Add Student</button>
    </form>

    <div v-if="successMessage" class="success-message">
      <p>{{ successMessage }}</p>
    </div>

    <hr />

    <h2>Student List</h2>
    <div v-if="students.length > 0" class="student-list">
      <ul>
        <li v-for="student in students" :key="student.id">
          <div v-if="editingStudentId !== student.id">
            <span>{{ student.firstName }} {{ student.lastName }} - {{ student.yearAndSection }}</span>
            <button @click="startEditing(student)">Edit</button>
            <button @click="deleteStudent(student.id)">Delete</button>
          </div>

          <div v-else class="edit-form">
            <input v-model="editedStudent.firstName" />
            <input v-model="editedStudent.lastName" />
            <input v-model="editedStudent.yearAndSection" />
            <button @click="updateStudent">Save</button>
            <button @click="cancelEditing">Cancel</button>
          </div>
        </li>
      </ul>
    </div>
    <p v-else>No students found.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const students = ref([]);
const newStudent = ref({
  firstName: '',
  lastName: '',
  yearAndSection: '',
});
const successMessage = ref('');

const editingStudentId = ref(null);
const editedStudent = ref({});

const fetchStudents = async () => {
  try {
    const response = await fetch('http://localhost:5000/students');
    if (!response.ok) throw new Error('Failed to fetch students.');
    students.value = await response.json();
  } catch (error) {
    console.error('Error fetching students:', error);
    successMessage.value = 'An error occurred while fetching students.';
  }
};

const createStudent = async () => {
  try {
    const response = await fetch('http://localhost:5000/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStudent.value),
    });
    if (!response.ok) throw new Error('Failed to create student.');
    
    const data = await response.json();
    console.log('Server response:', data);
    successMessage.value = data.message;
    newStudent.value = { firstName: '', lastName: '', yearAndSection: '' };
    fetchStudents(); 
  } catch (error) {
    console.error('Error creating student:', error);
    successMessage.value = 'An error occurred. Please try again.';
  }
};

const deleteStudent = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/students/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete student.');
    
    const data = await response.json();
    successMessage.value = data.message;
    fetchStudents(); 
  } catch (error) {
    console.error('Error deleting student:', error);
    successMessage.value = 'An error occurred while deleting the student.';
  }
};

const startEditing = (student) => {
  editingStudentId.value = student.id;
  editedStudent.value = { ...student }; 
};

const cancelEditing = () => {
  editingStudentId.value = null;
  editedStudent.value = {};
};

const updateStudent = async () => {
  try {
    const response = await fetch(`http://localhost:5000/students/${editedStudent.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedStudent.value),
    });
    if (!response.ok) throw new Error('Failed to update student.');
    
    const data = await response.json();
    successMessage.value = data.message;
    cancelEditing(); 
    fetchStudents();
  } catch (error) {
    console.error('Error updating student:', error);
    successMessage.value = 'An error occurred while updating the student.';
  }
};

onMounted(fetchStudents);
</script>