<template>
  <div class="container">
    <!-- Container for the h1 and button -->
    <div class="header-row">
      <!-- Centered h1 tag -->
      <h1 class="header-title"> Lista de Repartidores </h1>

      <!-- Button to open the modal, aligned to the right -->
      <button @click="openModal" class="open-button"> Crear Nuevo Usuario + </button>
    </div>
    <TableComponent :headers="tableHeadersUsers" :rows="tableRowsUsers" />
    <br><br>
    <!-- Modal component -->
    <Modal :isOpen="isModalOpen" @close="closeModal" />
    <h1 class="header-title" >Lista de ventas</h1>
    <TableComponent :headers="tableHeadersSales" :rows="tableRowsSales" />
  </div>
</template>

<script>
import TableComponent from './table.vue';
import { getUsers } from '../Api/Users/usersApi.js';
import { getOrders } from '../Api/Dashboard/dashboard.js';
import Modal from './ModalAdd.vue'; // Adjust the path based on your folder structure


export default {
  components: {
    TableComponent,
    Modal
  },
  data() {
    return {
      tableHeadersUsers: ['ID', 'email', 'nombre', 'Admin', 'telefono'],
      tableRowsUsers: [],
      tableHeadersSales: ['ID', 'Repartidor', 'Cantidad', 'Cliente', 'Fecha'],
      tableRowsSales: [],
      isModalOpen: false
    };
  },
  mounted() {
    this.getAllSales();
    this.getUsersVue();
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    async getUsersVue() {
      try {
        const response = await getUsers();
        console.log(response.data.data)
        this.tableRowsUsers = response.data.data;
      } catch (error) {
        // Handle error response
        if (error.response) {
          this.errorMessage = error.response.data.message || 'Fallido';
        } else {
          this.errorMessage = 'An error occurred: ' + error.message;
        }
      }
    },
    async getAllSales() {
      try {
        const response = await getOrders();
        console.log(response.data.sales)
        this.tableRowsSales = response.data.sales;
      } catch (error) {
        // Handle error response
        if (error.response) {
          this.errorMessage = error.response.data.message || 'Fallido';
        } else {
          this.errorMessage = 'An error occurred: ' + error.message;
        }
      }
    }
  },
};
</script>

<style scoped>
/* Flex container for h1 and button */
.header-row {
  display: flex;
  justify-content: space-between; /* This ensures space between h1 and button */
  align-items: center; /* Aligns items vertically centered */
  padding: 10px;
}


/* Style for the centered h1 */
.header-title {
  flex-grow: 1; /* Takes available space */
  text-align: center; /* Centers the text */
  margin: 0;
}

/* Style for the button, aligned to the right */
.open-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  white-space: nowrap; /* Prevents text from wrapping in small spaces */
}

</style>