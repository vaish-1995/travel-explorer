<template>
  <div>
    <h2 class="text-xl font-semibold mb-2">Tour Packages</h2>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="pkg in packages"
        :key="pkg.id"
        class="relative group border p-4 rounded-lg shadow overflow-hidden bg-white transition-all duration-200 hover:shadow-md transform origin-center"
      >
        <!-- Clickable Image with Zoom Effect -->
        <div
          class="relative overflow-hidden rounded-t-lg cursor-pointer"
          @click="openLightbox(pkg)"
        >
          <img
            :src="resolveImage(pkg.image)"
            class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <!-- Hover Description -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
          >
            <p class="text-white text-sm">{{ pkg.description }}</p>
          </div>
        </div>

        <!-- Package Info -->
        <div class="mt-3 px-2">
          <h3 class="text-lg font-bold line-clamp-1">{{ pkg.name }}</h3>
          <p class="text-sm text-gray-500">{{ pkg.category }}</p>
          <p class="text-green-600 font-semibold mt-1">${{ pkg.price }}</p>
          <!-- <p class="text-gray-600 text-sm mt-2 line-clamp-2">{{ pkg.description }}</p> -->
        </div>

        <!-- Edit/Delete Buttons -->
        <div class="mt-3 flex gap-2 px-2">
          <button
            @click.stop="editPackage(pkg)"
            class="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </button>
          <button
            @click.stop="deletePackage(pkg.id)"
            class="text-sm px-3 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <transition name="lightbox">
      <div
        v-if="lightboxPackage"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        @click.self="closeLightbox"
      >
        <div class="relative max-w-6xl w-full max-h-[90vh]">
          <!-- Close Button -->
          <button
            @click="closeLightbox"
            class="absolute -top-12 right-0 z-10 text-white hover:text-gray-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Image with Zoom Animation -->
          <div class="flex flex-col md:flex-row gap-6">
            <div class="md:w-2/3 h-full overflow-hidden rounded-xl">
              <img
                :src="resolveImage(lightboxPackage.image)"
                class="w-full h-full object-contain transition-transform duration-300"
                :style="{ transform: zoomLevel }"
                @click="toggleZoom"
              />
            </div>

            <!-- Package Details -->
            <div class="md:w-1/3 text-white overflow-y-auto">
              <h2 class="text-3xl font-bold mb-3">{{ lightboxPackage.name }}</h2>
              <div class="flex items-center gap-3 mb-4">
                <span class="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                  {{ lightboxPackage.category }}
                </span>
                <span class="text-xl font-bold text-green-400">${{ lightboxPackage.price }}</span>
              </div>
              <p class="text-gray-300 mb-6">{{ lightboxPackage.description }}</p>

              <!-- Additional Info -->
              <div class="space-y-3 text-gray-300">
                <div v-if="lightboxPackage.duration" class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{{ lightboxPackage.duration }} tour</span>
                </div>
                <!-- Add more details as needed -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Add this modal near your lightbox modal -->
    <transition name="fade">
      <div
        v-if="showDeleteConfirm"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 class="text-lg font-bold mb-4">Confirm Delete</h3>
          <p class="mb-6">Are you sure you want to delete this package?</p>
          <div class="flex justify-end gap-3">
            <button
              @click="showDeleteConfirm = false"
              class="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              @click="confirmDelete"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['packages'],
  data() {
    return {
      lightboxPackage: null,
      isZoomed: false,
      showDeleteConfirm: false,
      packageToDelete: null,
    }
  },
  computed: {
    zoomLevel() {
      return this.isZoomed ? 'scale(1.5)' : 'scale(1)'
    },
  },
  methods: {
    resolveImage(imagePath) {
      // If image path starts with "assets/upload", require it so webpack bundles it
      if (imagePath && imagePath.startsWith('assets/upload/')) {
        try {
          return require(`@/${imagePath}`)
        } catch (e) {
          console.warn('Image not found:', imagePath)
          return ''
        }
      }
      // Else assume it's a valid URL or base64 and return as is
      return imagePath
    },
    openLightbox(pkg) {
      this.lightboxPackage = pkg
      document.body.style.overflow = 'hidden'
    },
    closeLightbox() {
      this.lightboxPackage = null
      this.isZoomed = false
      document.body.style.overflow = ''
    },
    toggleZoom() {
      this.isZoomed = !this.isZoomed
    },
    editPackage(pkg) {
      this.$emit('edit', pkg)
    },
    async deletePackage(id) {
      this.packageToDelete = id
      this.showDeleteConfirm = true
    },
    async confirmDelete() {
      await this.$emit('delete', this.packageToDelete)
      await axios.delete(`http://localhost:3000/api/packages/${this.packageToDelete}`)
      this.$emit('refresh')

      this.showDeleteConfirm = false
      this.packageToDelete = null

      // Close lightbox if open and showing deleted package
      if (this.lightboxPackage?.id === this.packageToDelete) {
        this.closeLightbox()
      }
    },
  },
}
</script>

<style scoped>
/* Lightbox Transition */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

/* Image Zoom Effect */
img {
  cursor: zoom-in;
  transition: transform 0.3s cubic-bezier(0.2, 0, 0.2, 1);
}

/* Line clamping for text */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
