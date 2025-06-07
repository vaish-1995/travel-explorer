<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation Bar -->
    <nav class="bg-white shadow p-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-blue-600">Travel Explorer</h1>
      <div class="space-x-4">
        <router-link to="/" class="text-gray-700 hover:text-blue-600">Home</router-link>
        <router-link to="/packages" class="text-gray-700 hover:text-blue-600">Tour Packages</router-link>
        <router-link to="/about" class="text-gray-700 hover:text-blue-600">About</router-link>
      </div>
    </nav>

    <!-- Routed Views -->
    <main class="p-6">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Optional: Customize scrollbars or global styles here */
</style>
