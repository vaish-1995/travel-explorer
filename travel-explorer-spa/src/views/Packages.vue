<template>
  <div class="p-6">
    <button @click="openFormForAdd" class="bg-green-600 text-white px-4 py-2 rounded mb-4">
      Add New Package
    </button>

    <!-- Modal Form for Add/Edit -->
    <PackageForm
      :visible="showForm"
      :editData="editData"
      @close="closeForm"
      @refresh="fetchPackages"
    />

    <!-- Package List Display -->
    <PackageList
      :packages="packages"
      @refresh="fetchPackages"
      @edit="handleEdit"
    />
  </div>
</template>

<script>
import PackageForm from '@/components/PackageForm.vue';
import PackageList from '@/components/PackageList.vue';
import axios from 'axios';

export default {
  components: { PackageList, PackageForm },
  name: "PackagesView",
  data() {
    return {
      packages: [],
      showForm: false,
      editData: null,
    };
  },
  methods: {
    async fetchPackages() {
      const res = await axios.get('http://localhost:3000/api/packages');
      this.packages = res.data;
    },
    handleEdit(pkg) {
      console.log("Edit Double clicked:"); // ✅ add this
      this.editData = pkg;
      this.showForm = true;
    },
    openFormForAdd() {
      this.editData = null;
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
      this.editData = null;
    },
  },
  mounted() {
    this.fetchPackages();
  },
};
</script>
