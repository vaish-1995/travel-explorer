<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-4xl relative">
      <button @click="$emit('close')"
        class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold">
        &times;
      </button>

      <h2 class="text-xl font-semibold mb-4">{{ isEdit ? 'Edit Package' : 'Add New Package' }}</h2>

      <div class="flex flex-col md:flex-row gap-6">
        <!-- Image Preview Section -->
        <div class="md:w-1/3">
          <div class="border rounded-lg overflow-hidden bg-gray-100 aspect-video mb-3">
            <img :src="resolveImage(imagePreview || pkg.image)"
             class="w-full h-full object-cover" :class="{ 'border-2 border-red-500': !isImageValid && pkg.image }" 
             />
          </div>

          <!-- Radio buttons to select image source -->
          <div class="mb-2">
            <label class="mr-4">
              <input type="radio" value="url" v-model="imageSource" />
              Use Online Image URL
            </label>
            <label>
              <input type="radio" value="upload" v-model="imageSource" />
              Upload Local Image
            </label>
          </div>

          <!-- URL input -->
          <div v-if="imageSource === 'url'">
            <input v-model="pkg.image" placeholder="Image URL" class="input w-full" required @input="validateImage" />
            <p v-if="!isImageValid && pkg.image" class="text-red-500 text-sm mt-1">
              Image failed to load. Please check the URL.
            </p>
          </div>

          <!-- File upload input -->
          <div v-else>
            <input type="file" class="input w-full" accept="image/*" @change="handleFileUpload" required />
          </div>
        </div>

        <!-- Form Fields Section -->
        <div class="md:w-2/3">
          <form @submit.prevent="submitForm" class="grid grid-cols-1 gap-4">
            <input v-model="pkg.name" placeholder="Package Name" class="input" required />
            <textarea v-model="pkg.description" placeholder="Description" class="input h-24" required></textarea>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <input v-model.number="pkg.price" type="number" placeholder="Price" class="input" required />
              </div>
              <div>
                <input v-model="pkg.category" placeholder="Category" class="input" required />
              </div>
            </div>

            <!-- Additional Fields -->
            <input v-model="pkg.duration" placeholder="Duration (e.g., 7 days)" class="input" />
            <input v-model="pkg.location" placeholder="Location" class="input" />

            <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-colors"
              :disabled="!isFormValid">
              {{ isEdit ? 'Update Package' : 'Add Package' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    visible: Boolean,
    editData: Object,
  },
  data() {
    return {
      pkg: {
        id: null,
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
        duration: '',
        location: ''
      },
      imageSource: 'upload', // track if user wants url or upload
      imageFile: null,    // store file for upload (optional)
      imagePreview: '',   // base64 preview only, not saved in pkg.image
      isEdit: false,
      isImageValid: true,
      imageCheckTimeout: null
    };
  },mounted() {
    this.setImageSource(this.pkg.image);
  },
  computed: {
    isFormValid() {
      return (
        this.pkg.name &&
        this.pkg.description &&
        this.pkg.price &&
        this.pkg.category// &&
       // this.pkg.image &&
       // this.isImageValid
      );
    }
  },
  watch: {
    visible(newVal) {
      if (newVal && this.editData) {
        this.pkg = { ...this.editData };
        this.isEdit = true;
        this.imageSource = 'upload';  // reset to URL mode for edit
        this.imagePreview = '';    // clear preview, rely on pkg.image path
        this.validateImage();
      } else if (newVal) {
        this.resetForm();
      }
    },
    'pkg.image'(newVal) {
      this.setImageSource(newVal);
    },
  },
  methods: {
    resetForm() {
      this.pkg = {
        id: null,
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
        duration: '',
        location: ''
      };
      this.imageSource = 'upload';
      this.imageFile = null;
      this.imagePreview = '';
      this.isEdit = false;
      this.isImageValid = true;
    },
    setImageSource(imagePath) {
      // Set based on whether the path is a URL or local path
      console.log('Setting image source for:', imagePath);
      if (imagePath && imagePath.startsWith('http')) {
        this.imageSource = 'url';
      } else if (imagePath.includes('assets/upload/')) {
        this.imageSource = 'upload';
      } else {
        this.imageSource = 'upload'; // fallback
      }

      console.log('Image source set to:', this.imageSource);
    },
    validateImage() {
      if (this.imageCheckTimeout) {
        clearTimeout(this.imageCheckTimeout);
      }
      if (!this.pkg.image) {
        this.isImageValid = true;
        return;
      }

      this.imageCheckTimeout = setTimeout(() => {
        const img = new Image();
        img.onload = () => {
          this.isImageValid = true;
        };
        img.onerror = () => {
          this.isImageValid = false;
        };
        img.src = this.pkg.image;
      }, 500);
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      // Save the file object if you want to upload later
      this.imageFile = file;

      // Set the pkg.image to the custom path string with folder + filename
      const filename = file.name;
      this.pkg.image = `assets/upload/${filename}`;

      // Create base64 preview for immediate UI display
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target.result;
        this.isImageValid = true;
      };
      reader.readAsDataURL(file);
    },
    async submitForm() {
      if (!this.isFormValid) return;

      try {
        // Here you would upload the file (this.imageFile) to your backend
        // at the path you specify (e.g., 'upload/images1/...') if needed.
        // The backend should save the file in the folder upload/images1 and
        // you send the path string in pkg.image.

        if (this.isEdit) {
          await axios.put(`http://localhost:3000/api/packages/${this.pkg.id}`, this.pkg);
        } else {
          await axios.post('http://localhost:3000/api/packages', this.pkg);
        }

        this.$emit('refresh');
        this.$emit('close');

        // Emit notification
        this.$emit('notify', {
          type: 'success',
          message: this.isEdit ? 'Package updated successfully!' : 'Package added successfully!',
        });

      } catch (error) {
        console.error('Error saving package:', error);
        alert('Failed to save package. Please try again.');
      }
    },
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
  }
};
</script>

<style scoped>
.input {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  width: 100%;
  transition: border-color 0.2s;
}

.input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #9ca3af;
}
</style>
