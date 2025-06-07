<template>
  <div>
    <!-- Banner Section -->
    <section
      class="bg-cover bg-center h-[400px] flex items-center justify-center text-white"
      :style="{ backgroundImage: 'url(' + require('@/assets/travel-bg.jpg') + ')' }"
    >
      <div class="bg-black bg-opacity-50 p-6 rounded text-center">
        <h1 class="text-4xl font-bold">Explore the World with Us</h1>
        <p class="mt-2 text-lg">Your journey starts here — let’s plan your next adventure!</p>
      </div>
    </section>

    <!-- Query Form Section -->
    <section class="bg-gray-100 py-10 px-4">
      <QueryForm />
    </section>

    <!-- Popular Destinations -->
    <section class="py-12 px-4 max-w-6xl mx-auto">
      <h2 class="text-3xl font-bold text-center mb-8">Popular Destinations</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white rounded shadow p-4 text-center">
          <img src="@/assets/images/paris.jpg" alt="Paris" class="rounded mb-4 h-40 w-full object-cover" />
          <h3 class="text-xl font-semibold mb-2">Paris, France</h3>
          <p class="text-gray-600">Romantic city of lights, art, and fashion.</p>
        </div>
        <div class="bg-white rounded shadow p-4 text-center">
          <img src="@/assets/images/bali.png" alt="Bali" class="rounded mb-4 h-40 w-full object-cover" />
          <h3 class="text-xl font-semibold mb-2">Bali, Indonesia</h3>
          <p class="text-gray-600">Tropical paradise with serene beaches and temples.</p>
        </div>
        <div class="bg-white rounded shadow p-4 text-center">
          <img src="@/assets/images/newyork.jpg" alt="New York" class="rounded mb-4 h-40 w-full object-cover" />
          <h3 class="text-xl font-semibold mb-2">New York, USA</h3>
          <p class="text-gray-600">The city that never sleeps — endless experiences await.</p>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="bg-green-100 py-12 px-4">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">Why Choose Us?</h2>
        <p class="text-gray-700 mb-8">We offer more than just travel. Here's what makes us unique:</p>
        <div class="grid md:grid-cols-3 gap-6 text-left">
          <div>
            <h4 class="text-xl font-semibold mb-2">✔ Expert Guidance</h4>
            <p class="text-gray-600">Personalized travel planning from experienced professionals.</p>
          </div>
          <div>
            <h4 class="text-xl font-semibold mb-2">✔ Best Price Guarantee</h4>
            <p class="text-gray-600">We ensure top travel deals with unmatched value.</p>
          </div>
          <div>
            <h4 class="text-xl font-semibold mb-2">✔ 24/7 Support</h4>
            <p class="text-gray-600">Always here to help, wherever you are in the world.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-12 px-4 max-w-5xl mx-auto">
      <h2 class="text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-white p-6 rounded shadow">
          <p class="text-gray-700 mb-2">"An unforgettable journey! The planning, support, and experiences were beyond our expectations."</p>
          <p class="font-semibold text-green-900">— Anjali M., Delhi</p>
        </div>
        <div class="bg-white p-6 rounded shadow">
          <p class="text-gray-700 mb-2">"Great value and expert service. We’ll definitely book with you again!"</p>
          <p class="font-semibold text-green-900">— Rajeev P., Bangalore</p>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="bg-green-900 text-white text-center py-10 px-4">
      <h2 class="text-3xl font-bold mb-4">Ready to Book Your Dream Vacation?</h2>
      <p class="mb-6">Let us take care of the planning — you just pack your bags.</p>
      <button class="bg-white text-green-900 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition">
        Get a Free Quote
      </button>
    </section>
  </div>
</template>

<script>
import QueryForm from '@/components/QueryForm.vue';

export default {
  name: 'HomeView',
  components: {
    QueryForm,
  },
};
</script>
