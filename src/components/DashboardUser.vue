<template>
  <div class="container">
    <!-- Container for the h1 and button -->
    <div class="header-row">
      <!-- Centered h1 tag -->
      <h1 class="header-title"> Lista de ultimas ventas de {{ user.name }}</h1>
      <!-- Button to open the modal, aligned to the right -->
      <button @click="openModal" class="open-button"> Crear Nueva venta + </button>
    </div>
    <TableComponent :headers="tableHeadersSales" :rows="tableRowsSales" />
    <ModalNewSale :user = user._id  :isOpen="isModalOpen" @close="closeModal" />
  </div>
</template>

<script>
import TableComponent from './Utils/table.vue';
import ModalNewSale from './Utils/ModalNewSale.vue';
import { getOrdersByUser, createSale } from '../Api/Dashboard/dashboard.js';


export default {
  components: {
    TableComponent,
    ModalNewSale
  },
  data() {
    return {
      tableHeadersSales: ['ID', 'Repartidor', 'Cantidad', 'Cliente', 'Fecha'],
      tableRowsSales: [],
      isModalOpen: false,
      user: {},
      errorMessage: '',
    };
  },
  mounted() {
    this.loadUserInfo();
  },
  methods: {
    loadUserInfo(){
      this.user = JSON.parse(localStorage.getItem('user'));
      this.getAllSales(this.user._id);
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.loadUserInfo();
      this.isModalOpen = false;
    },
    salesCreated(){
      this.getAllSales();
    },
    async getAllSales(user_id) {
      try {
        const response = await getOrdersByUser(user_id); 
        this.tableRowsSales = response.data.sales;
      } catch (error) {
        // Handle error response
        if (error.response) {
          this.errorMessage = error.response.data.message || 'Fallido';
        } else {
          this.errorMessage = 'An error occurred: ' + error.message;
        }
      }
    },
    async createSaleVue(){
      try {
        const response = await createSale(); 
        this.tableRowsSales = response.data.sales;
      } catch (error) {
        // Handle error response
        if (error.response) {
          this.errorMessage = error.response.data.message || 'Fallido';
        } else {
          this.errorMessage = 'An error occurred: ' + error.message;
        }
      }
    },
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


/* Opcional: Ajusta las celdas en pantallas pequeñas */
@media screen and (max-width: 768px) {
    .table-container {
        overflow-x: hidden;
        /* Agrega desplazamiento horizontal */
        -webkit-overflow-scrolling: touch;
        /* Para suavizar el scroll en dispositivos iOS */
    }

    .custom-table {
        width: 100%;
        font-size: 45%;
    }

    .custom-table th,
    .custom-table td {
        border: 1px solid #a0a0a0;
    }

    .login-container {
        border: 0px ;
        box-shadow: none;
    }
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