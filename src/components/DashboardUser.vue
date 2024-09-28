<template>
  <div class="container">
    <div v-if="user.isAdmin">
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
      <ModalCreateUser :isOpen="isModalOpen" @close="closeModal" @created="userCreated" />
      <ModalDeleteUsers :idUser="idUserDelete" :isOpen="isModalDeleteUsersOpen" @close="closeDeleteModal" @deleted="deletedUser" />
      <div class="header-row">
        <!-- Centered h1 tag -->

        <h1 class="header-title"></h1>

        <p class="header-title" >Fecha de inicio:</p>
        <input type="date" class="open-button" v-model="selectedDateStart" id="date" />


        <p class="header-title">Fecha de finalización:</p>
        <input type="date" class="open-button" v-model="selectedDateEnd" id="date" />

      </div>
      <div class="header-row">
        <!-- Centered h1 tag -->
        <h1 class="header-title">Lista de ventas</h1>
        <!-- Button to open the modal, aligned to the right -->
        <button @click="downloadCSV" class="open-button"> descargar archivo de ventas </button>
      </div>
      <TableComponent :headers="tableHeadersSales" :rows="tableRowsSales" />
    </div>

    <div v-else>
      <div class="header-row">
        <!-- Centered h1 tag -->
        <h1 class="header-title"> Lista de ultimas ventas de {{ user.name }}</h1>
        <!-- Button to open the modal, aligned to the right -->
        <button @click="openModal" class="open-button"> Crear Nueva venta + </button>
      </div>
      <TableComponent :headers="tableHeadersSales" :rows="tableRowsSales" />
      <ModalNewSale :user=user._id :isOpen="isModalOpen" @close="closeModal" />
    </div>
  </div>
</template>

<script>
import TableComponent from './Utils/table.vue';
import ModalNewSale from './Utils/ModalNewSale.vue';
import { getOrdersByUser, createSale, getOrders } from '../Api/Dashboard/dashboard.js';
import { getUsers } from '../Api/Users/usersApi.js';
import ModalCreateUser from './Utils/ModalNewUser.vue'; // Adjust the path based on your folder structure
import ModalDeleteUsers from './Utils/ModalDeleteUsers.vue';
import { toast } from 'vue3-toastify';

export default {
  components: {
    TableComponent,
    ModalNewSale,
    ModalCreateUser,
    ModalDeleteUsers
  },
  data() {
    return {
      tableHeadersSales: ['ID', 'Cantidad', 'items', 'fecha', 'Repartidor'],
      tableRowsSales: [],
      tableHeadersUsers: ['ID', 'email', 'nombre', 'Admin', 'telefono'],
      tableRowsUsers: [],
      isModalOpen: false,
      user: {},
      errorMessage: '',
      isModalDeleteUsersOpen: false,
      idUserDelete: "",
      selectedDateStart: this.formatDate(new Date()),
      selectedDateEnd: null
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.loadUserInfo();
  },
  watch: {
    // Observa cuando 'startDate' o 'endDate' cambian y ejecuta la función
    selectedDateStart() {
      this.validateDates();
    },
    selectedDateEnd() {
      this.validateDates();
    }
  },
  methods: {
    loadUserInfo() {
      if (this.user.isAdmin) {
        this.setInitDates();
        this.getUsersVue();
      }
      this.getAllSales(this.user._id);
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    salesCreated() {
      this.getAllSales(this.user._id);
    },
    deleteUser(row_id) {
      this.isModalDeleteUsersOpen = true;
      this.idUserDelete = row_id;
    },
    closeDeleteModal() {
      this.isModalDeleteUsersOpen = false;
    },
    deletedUser() {
      this.isModalDeleteUsersOpen = false;
      this.getUsersVue();
    },
    userCreated() {
      this.isModalOpen = false;
      this.getUsersVue();
    },
    async getAllSales(user_id) {
      try {
        if (this.user.isAdmin) {
          const body = {
            startDate: this.selectedDateStart,
            endDate: this.selectedDateEnd
          }
          const response = await getOrders(body);
          this.tableRowsSales = response.data.sales;
          return;
        } else {
          const response = await getOrdersByUser(user_id);
          this.tableRowsSales = response.data.sales;
        }
      } catch (error) {
        // Handle error response
        if (error.response) {
          this.errorMessage = error.response.data.message || 'Fallido';
        } else {
          this.errorMessage = 'An error occurred: ' + error.message;
        }
      }
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
    async createSaleVue() {
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
    downloadCSV() {
      // Convert JSON to CSV
      const csvData = this.convertJSONToCSV(this.tableRowsSales);
      
      // Create a Blob with the CSV data
      const blob = new Blob([csvData], { type: 'text/csv' });

      // Create a link element
      const link = document.createElement('a');
      
      // Create a URL for the Blob and set it as the href attribute of the link
      link.href = URL.createObjectURL(blob);
      
      // Set the download attribute to define the filename
      link.download = 'ventas.csv';
      
      // Append the link to the body (required for Firefox)
      document.body.appendChild(link);
      
      // Programmatically click the link to trigger the download
      link.click();
      
      // Remove the link from the document
      document.body.removeChild(link);
    },
    convertJSONToCSV(jsonData) {
      // Get the headers (keys from the first object in the array)
      const headers = Object.keys(jsonData[0]).join(',');
      
      // Map over the JSON data and join values as CSV
      const rows = jsonData.map(obj =>
        Object.values(obj).map(val => `"${val}"`).join(',')
      );
      
      // Join headers and rows to form the CSV
      return [headers, ...rows].join('\n');
    },
    setInitDates(){
      const today = new Date();
      this.selectedDateEnd = this.formatDate(today);
      this.selectedDateStart = this.formatDate(new Date(today.setDate(today.getDate() - 7)));
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes en formato 2 dígitos
      const day = String(date.getDate()).padStart(2, '0'); // Día en formato 2 dígitos
      return `${year}-${month}-${day}`;
    },
    validateDates(){
      const start = new Date(this.selectedDateStart);
      const end = new Date(this.selectedDateEnd);
      if (start > end){
        toast.error("La fecha de inicio debe ser anterior a la fecha de finalización");
        this.setInitDates();
      }else{
        this.getAllSales(this.user._id);
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
  margin-left: 12px;
  /* Prevents text from wrapping in small spaces */
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
    border: 0px;
    box-shadow: none;
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

  .p{
    padding: 5px 5px;
    font-size: 10px;
  }

  .header-row {
    font-size: 15px;
  }

  /* Style for the centered h1 */
  .header-title {
    font-size: 15px;
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