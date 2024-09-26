<template>
  <div class="container">
    <!-- Container for the h1 and button -->
    <h1 class="header-title"> Hola {{ user.name }}!! </h1>
    <br><br>
    <div class="header-row">
      <!-- Centered h1 tag -->
      <h1 class="header-title"> Lista de Repartidores </h1>
      <!-- Button to open the modal, aligned to the right -->
      <button @click="openModal" class="open-button"> Crear Nuevo Usuario + </button>
    </div>
    <TableComponent @update-data="deleteUser" :headers="tableHeadersUsers" :rows="tableRowsUsers" />
    <br><br>
    <!-- Modal component -->
    <Modal :isOpen="isModalOpen" @close="closeModal" />
    <ModalDeleteUsers :idUser="idUserDelete" :isOpen="isModalDeleteUsersOpen" @close="closeDeleteModal" />
    <h1 class="header-title">Lista de ventas</h1>
    <TableComponent :headers="tableHeadersSales" :rows="tableRowsSales" />
  </div>
</template>

<script>
import TableComponent from './Utils/table.vue';
import { getUsers } from '../Api/Users/usersApi.js';
import { getOrders } from '../Api/Dashboard/dashboard.js';
import Modal from './Utils/ModalNewUser.vue'; // Adjust the path based on your folder structure
import ModalDeleteUsers from './Utils/ModalDeleteUsers.vue';
import { toast } from 'vue3-toastify';


export default {
  components: {
    TableComponent,
    Modal,
    ModalDeleteUsers
  },
  data() {
    return {
      tableHeadersUsers: ['ID', 'email', 'nombre', 'Admin', 'telefono'],
      tableRowsUsers: [],
      tableHeadersSales: ['ID', 'Repartidor', 'Cantidad', 'Cliente', 'items', 'Fecha'],
      tableRowsSales: [],
      isModalOpen: false,
      isModalDeleteUsersOpen: false,
      idUserDelete: "",
      user: {}
    };
  },
  mounted() {
    this.loadUserInfo();
  },
  methods: {
    loadUserInfo() {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.getUsersVue();
      this.getAllSales();
    },
    openDeleteModal(row_id) {
      this.isModalDeleteUsersOpen = true;
      this.idUserDelete = row_id;
    },
    closeDeleteModal() {
      this.isModalDeleteUsersOpen = false;
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    userCreated() {
      toast.success('This is a success message!');
      this.getUsersVue();
    },
    salesCreated() {
      this.getAllSales();
    },
    deleteUser(row_id) {
      this.openDeleteModal(row_id);
    },
    async getUsersVue() {
      try {
        const response = await getUsers();
        this.tableRowsUsers = response.data.data;
      } catch (error) {
        // Handle error response
        toast.error(error.response);
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
  justify-content: space-between;
  /* This ensures space between h1 and button */
  align-items: center;
  /* Aligns items vertically centered */
  padding: 10px;
}


/* Style for the centered h1 */
.header-title {
  flex-grow: 1;
  /* Takes available space */
  text-align: center;
  /* Centers the text */
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
  white-space: nowrap;
  /* Prevents text from wrapping in small spaces */
}


/* Opcional: Ajusta las celdas en pantallas pequeñas */
@media screen and (max-width: 768px) {

  .header-row {
    font-size: smaller;
  }
  /* Style for the centered h1 */
  .header-title {
    font-size: 20px;
  }

  br {
    display: none;
  }

  /* Style for the button, aligned to the right */
  .open-button {
    padding: 5px 5px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-size: 10px;
  }

}
</style>