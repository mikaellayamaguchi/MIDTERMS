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

    <main>
      <p>Welcome home! Use the navigation above to visit your page.</p>
    </main>

    <footer>
      &copy; 2025 Yamaguchi. All rights reserved.
    </footer>
  </div>
</template>

<script setup>

</script>

<style>

@import '../assets/styles.css';
</style>