<template>
    <div v-if="recomendaciones.length" class="recomendaciones">
      <h3>Productos Recomendados</h3>
      <div class="recomendaciones-list">
        <div v-for="producto in recomendaciones" :key="producto.product_id" class="producto">

  <h4>{{ producto.name }}</h4>
  <p>{{ producto.price }}</p>
</div>

      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        recomendaciones: []
      };
    },
    async mounted() {
      try {
        const response = await axios.get('/api/recommendationByCart', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.recomendaciones = response.data.recomendaciones;
      } catch (error) {
        console.error('Error al obtener recomendaciones:', error);
      }
    }
  };
  </script>
  
  <style scoped>
  .recomendaciones {
    margin-top: 20px;
  }
  .recomendaciones-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  .producto {
    width: 200px;
    text-align: center;
  }
  </style>
  