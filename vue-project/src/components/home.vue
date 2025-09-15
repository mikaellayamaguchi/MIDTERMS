<template>
  <div class="container">
    <header>
      <h1>WELCOME HOME</h1>
      <nav>
        <router-link to="/user">User</router-link>
        <router-link to="/student">Student</router-link>
        <router-link to="/admin">Admin</router-link>
      </nav>
    </header>

    <main class="main-content">
      <p>Welcome! Please select a user type above to get started.</p> </main>

    <footer>
      &copy; 2025 Yamaguchi. All rights reserved.
    </footer>
  </div>
</template>
<style>
@import '../assets/styles.css';
</style>