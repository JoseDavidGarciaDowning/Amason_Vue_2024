<template>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Confirmar Eliminación</h2>
        <p>¿Estás seguro de que deseas eliminar este producto?</p>
        <div class="form-actions">
          <button type="button" @click="closeModal" style="background-color: white; color: #0ea5e9; padding: 0.5rem 1rem; border: 1px solid #0ea5e9; border-radius: 0.25rem; cursor: pointer;">
            Cancelar
          </button>
          <button type="button" @click="confirmDelete" style="background-color: #e74c3c; color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.25rem; cursor: pointer;">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      showModal: Boolean
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      confirmDelete() {
        this.$emit('confirm');
      }
    }
  };
  </script>
  
  <style scoped>
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    background-color: #fefefe;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
  }
  
  .form-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  </style>
  