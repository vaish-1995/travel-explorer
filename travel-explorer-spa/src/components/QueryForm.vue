<template>
  <div class="bg-white shadow-lg rounded-lg p-6 md:p-10 mx-auto max-w-6xl h-auto">
    <!-- Heading -->
    <div class="flex flex-col md:flex-row md:items-start md:justify-between">
      <div>
        <h2 class="text-2xl md:text-3xl font-bold mb-2">Submit your Queries</h2>
        <p class="text-gray-700 mb-4">Get best travel deals from our expert.</p>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="submitForm" class="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
      <input type="text" v-model="form.name" placeholder="Name" class="border p-2 rounded" required />
      <input type="email" v-model="form.email" placeholder="Email ID" class="border p-2 rounded" required />
      <input type="tel" v-model="form.contact" placeholder="Contact Number" class="border p-2 rounded" required />
      <input type="text" v-model="form.message" placeholder="Message" class="border p-2 rounded" required />

      <div class="md:col-span-4 mt-4 flex justify-end">
        <button
          type="submit"
          class="bg-green-900 text-white font-semibold px-6 py-2 rounded hover:bg-green-800 shadow"
        >
          ENQUIRE
        </button>
      </div>
    </form>

    <!-- Notification -->
    <div
      v-if="showNotification"
      class="fixed bottom-5 right-5 bg-green-500 text-white py-2 px-4 rounded shadow-lg transition duration-300"
    >
      Query saved successfully!
    </div>
  </div>
</template>

<script>
export default {
  name: "QueryForm",
  data() {
    return {
      form: {
        name: "",
        email: "",
        contact: "",
        message: "",
      },
      showNotification: false,
    };
  },
  methods: {
    submitForm() {
      // Simulate saving the query (you can replace this with an actual API call)
      console.log("Saved Query:", this.form);

      // Reset form
      this.form = {
        name: "",
        email: "",
        contact: "",
        message: "",
      };

      // Show notification
      this.showNotification = true;

      // Hide after 3 seconds
      setTimeout(() => {
        this.showNotification = false;
      }, 3000);
    },
  },
};
</script>

<style scoped>
/* Optional: Transition effect for notification */
</style>
