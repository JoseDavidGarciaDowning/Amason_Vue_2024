<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h1 class="form-title text-2xl font-bold mb-6 text-gray-800 text-center">Crear Nuevo Producto</h1>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="name" class="form-label block text-gray-700 font-medium mb-2">Nombre del Producto</label>
          <input
            id="name"
            name="name"
            v-model="product.name"
            required
            class="form-input w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label for="category" class="form-label block text-gray-700 font-medium mb-2">Categoría</label>
          <select
            id="category"
            v-model="product.category"
            required
            class="form-select w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option disabled value="">Seleccionar categoría</option>
            <option value="electronics">Electrónicos</option>
            <option value="clothing">Ropa</option>
            <option value="books">Libros</option>
          </select>
        </div>
        <button
          type="submit"
          class="form-button w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-bold text-lg"
        >
          Crear Producto
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['showModal'], // recibe si se debe mostrar el modal o no
  data() {
    return {
      product: {
        name: '',
        category: '',
        price: '',
        stock: '',
        description: ''
      }
    };
  },
  methods: {
    handleSubmit() {
      console.log('Product submitted:', this.product);
      // Aquí puedes agregar la lógica para enviar los datos al backend
    },
    closeModal() {
      this.$emit('close-modal'); // Emitir evento para cerrar el modal
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
}

.form-title {
  text-align: center;
}
</style>
