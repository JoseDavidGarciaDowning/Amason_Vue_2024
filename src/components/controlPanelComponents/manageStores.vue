<template>
    <div>
        <h2>Mis Tiendas</h2>
        <div v-if="stores.length" class="store-list">
            <div v-for="(store, index) in stores" :key="index" class="store-item">
                <div>
                    <span class="store-name">{{ store.name }}</span>
                    <p class="store-description">{{ store.description }}</p>
                </div>
                <div class="store-actions">
                    <button class="btn-products" @click="manageProducts(index)">
                        Productos
                    </button>
                    <button class="btn-report" @click="generateTopSellingReport(index)">
                        Más Vendidos
                    </button>
                    <button class="btn-edit" @click="editStore(index)">Editar</button>
                    <button class="btn-delete" @click="deleteStore(index)">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
        <p v-else class="empty-text">Aún no tienes tiendas creadas.</p>
    </div>
</template>

<script>
export default {
    props: {
        stores: Array,
        updateStores: Function,
    },
    methods: {
        editStore(index) {// el codigo que esta aqui es solo visual, es decir, todavia no esta funcionando con la base porque eso nos toca en la tercera iteracion
            const newName = prompt("Nuevo nombre:", this.stores[index].name);
            const newDescription = prompt(
                "Nueva descripción:",
                this.stores[index].description
            );
            if (newName && newDescription) {
                this.stores[index].name = newName;
                this.stores[index].description = newDescription;
                alert("¡Tienda actualizada!");
            }
        },
        deleteStore(index) {// el codigo que esta aqui es solo visual, es decir, todavia no esta funcionando con la base porque eso nos toca en la tercera iteracion
            if (confirm("¿Seguro que deseas eliminar esta tienda?")) {
                this.$emit("update-stores", index, true); 
                alert("Tienda eliminada.");
            }
        },
        manageProducts(index) {
            alert(`Gestionando productos de ${this.stores[index].name}`);
            this.$emit("change-view", "SellerProduct");
            
        },
        generateTopSellingReport(index) {
            alert(`Generando reporte de productos más vendidos para ${this.stores[index].name}`);
            

        },
    },
};
</script>

<style scoped>
.store-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.store-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #e0e0e0;
    padding: 10px;
    border-radius: 5px;
}

.store-name {
    font-weight: bold;
}

.store-description {
    font-size: 14px;
    color: #555;
}

.store-actions {
    display: flex;
    gap: 10px;
}

.btn-products,
.btn-report,
.btn-edit,
.btn-delete {
    padding: 5px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
}

.btn-products {
    background-color: #0077b6;
}

.btn-report {
    background-color: #17c3b2;
}

.btn-edit {
    background-color: #ffc107;
    color: black;
}

.btn-delete {
    background-color: #ff4d4d;
}

.empty-text {
    color: #888;
    font-style: italic;
}
</style>