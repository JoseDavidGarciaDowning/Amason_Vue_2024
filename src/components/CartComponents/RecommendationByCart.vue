<template>
  <div v-if="recomendaciones.length" class="recomendaciones">
    <h3>Productos Recomendados</h3>
    <div class="recomendaciones-container">
      <button @click="prevProduct" class="nav-button" :disabled="currentIndex === 0">←</button>
      <div class="producto" v-if="currentProduct">
        <h4>{{ currentProduct.name }}</h4>
        <p>Precio: ${{ currentProduct.price }}</p>

      </div>
      <button @click="nextProduct" class="nav-button" :disabled="currentIndex === recomendaciones.length - 1">→</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      recomendaciones: [],
      currentIndex: 0,  // Índice del producto actual
    };
  },
  computed: {
    currentProduct() {
      return this.recomendaciones[this.currentIndex]; // Obtener el producto actual
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/recommendationByCart', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      this.recomendaciones = response.data; // Asegúrate de que el API devuelva directamente una lista de productos
    } catch (error) {
      console.error('Error al obtener recomendaciones:', error);
    }
  },
  methods: {
    nextProduct() {
      if (this.currentIndex < this.recomendaciones.length - 1) {
        this.currentIndex++;
      }
    },
    prevProduct() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    }
  }
};
</script>

<style scoped>
.recomendaciones {
  margin-top: 10px;
  text-align: center; /* Centrar el contenido */
}

.recomendaciones-container {
  display: flex;
  justify-content: center; /* Centrar los botones y el producto */
  align-items: center;
  margin-top: 5px; /* Espacio entre el título y los productos */
}

.nav-button {
  background-color: #058dc3;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  margin: 0 10px;
}

.nav-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.producto {
  width: 200px; /* Ancho fijo para el producto */
  text-align: center;
}
</style>
