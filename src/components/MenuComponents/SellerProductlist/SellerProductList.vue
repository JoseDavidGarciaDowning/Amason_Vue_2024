<template>
  <div class="product-list-container">
    <h2>Mis Productos</h2>

      <!-- Botón para abrir el modal de Crear Producto -->
      <button class="create-button" @click="openCreateModal">Crear Producto</button>

    <table class="product-table">
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Nombre del Producto</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>
            <img :src="product.imageUrl" :alt="product.name" class="product-image" />
          </td>
          <td>{{ product.name }}</td>
          <td>{{ formatCurrency(product.price) }}</td>
          <td class="action-buttons">
            <button class="edit-button" @click="openEditModal(product)">Editar</button>
            <button class="delete-button" @click="confirmDelete(product)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para editar producto -->
    <EditProductModal
      v-if="showEditModal"
      :product="selectedProduct"
      @close="closeEditModal"
      @save="saveProductChanges"
    />

     <!-- Modal para crear producto -->
     <CreateProduct
      v-if="showCreateModal"
      @close="closeCreateModal"
      @save="createNewProduct"
    />

    <!-- Modal de advertencia para eliminar producto -->
    <div v-if="showDeleteModal" class="delete-modal-overlay">
      <div class="delete-modal">
        <h3>¿Estás seguro que deseas eliminar {{ selectedProduct.name }}?</h3>
        <p>Esta acción no se puede deshacer.</p>
        <div class="modal-buttons">
          <button class="cancel-button" @click="cancelDelete">Cancelar</button>
          <button class="confirm-delete-button" @click="deleteProduct(selectedProduct.id)">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditProductModal from './EditProductModal.vue';
import CreateProduct from './CreateProduct.vue'; // Importa el componente CreateProduct

export default {
  components: {
    EditProductModal,
    CreateProduct
  },
  data() {
    return {
      showEditModal: false,
      showCreateModal: false, // Controla la visibilidad del modal de Crear Producto

      showDeleteModal: false,
      selectedProduct: null
    };
  },
  props: {
    products: Array
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
    },
    openEditModal(product) {
      this.selectedProduct = { ...product }; // Clonar el producto
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
    },
    saveProductChanges(updatedProduct) {
      // Actualizar la lista de productos
      const index = this.products.findIndex(p => p.id === updatedProduct.id);
      if (index !== -1) {
        this.$set(this.products, index, updatedProduct);
      }
      this.showEditModal = false;
    },
    openCreateModal() {
      this.showCreateModal = true;
    },
    closeCreateModal() {
      this.showCreateModal = false;
    }, 
    createNewProduct() {
      // Lógica para agregar el nuevo producto
   
      this.showCreateModal = false;
    },
    confirmDelete(product) {
      this.selectedProduct = product; // Guardar el producto que se desea eliminar
      this.showDeleteModal = true;
    },
    cancelDelete() {
      this.showDeleteModal = false;
    },
    deleteProduct(productId) {
      // Lógica para eliminar el producto
      this.$emit('delete-product', productId); // Emitir un evento para que el componente padre maneje la eliminación
      this.showDeleteModal = false; // Cerrar el modal después de eliminar
    }
  }
};
</script>

<style scoped>
.product-list-container {
  max-width: 900px;
  margin: 0 auto;
}
h2 {
  text-align: left;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}
.product-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #f9f9f9;
}
.product-table th,
.product-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  vertical-align: middle;
}
.product-table th {
  color: #555;
  font-size: 16px;
}
.product-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
.action-buttons {
  text-align: left;
  white-space: nowrap;
}
.edit-button,
.delete-button {
  display: inline-block;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 10px;
}
.edit-button {
  background-color: #f0f0f0;
  color: #333;
}
.delete-button {
  background-color: #e74c3c;
  color: white;
}
.product-table tr {
  height: 70px;
}

.delete-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.delete-modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.modal-buttons {
  margin-top: 20px;
}

.cancel-button {
  background-color: #ccc;
  color: #333;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 4px;
}

.confirm-delete-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
}
</style>
