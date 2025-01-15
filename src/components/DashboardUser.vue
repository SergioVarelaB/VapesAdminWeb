<template>
  <div class="container">
    <div v-if="user.isAdmin">
      <h1 class="header-title"> Hola {{ user.name }}!! </h1>
      <nav v-if="user.isAdmin">
        <button :class="{ active: currentPageAdmin == 'users'}" @click="currentPageAdmin = 'users'">Usarios</button>
        <button :class="{ active: currentPageAdmin == 'sales'}" @click="currentPageAdmin = 'sales'">Ventas</button>
        <button :class="{ active: currentPageAdmin == 'products'}" @click="currentPageAdmin = 'products'">Productos</button>
        <button :class="{ active: currentPageAdmin == 'inventory'}" @click="currentPageAdmin = 'inventory'">Inventarios</button>
      </nav>
      <div v-if="currentPageAdmin === 'users'">
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
        <ModalDeleteUsers :idUser="idUserDelete" :isOpen="isModalDeleteUsersOpen" @close="closeDeleteModal"
          @deleted="deletedUser" />
      </div>


      <div v-if="currentPageAdmin === 'sales'">
        <div class="header-row">
          <!-- Centered h1 tag -->
          <h1 class="header-title">Lista de ventas</h1>
          <!-- Button to open the modal, aligned to the right -->
          <button @click="downloadCSV" class="open-button"> descargar archivo de ventas </button>
        </div>
        <div class="header-row">
          <!-- Centered h1 tag -->
          <h1 class="header-title"></h1>
          <p class="header-title"> Seleccione un usuario: </p>
          <select class="form-control" v-model="userSales" style="width: 40%;">
            <option v-for="users in userSalesFilters" :key="users._id" :value="users">
              {{ users.email }}
            </option>
          </select>
          <p class="header-title">Fecha de inicio:</p>
          <input type="date" class="date-input" v-model="selectedDateStart" id="date" />
          <p class="header-title">Fecha de finalización:</p>
          <input type="date" class="date-input" v-model="selectedDateEnd" id="date" />
        </div>
        <div class="header-row">
          <!-- Centered h1 tag -->
          <h1 class="header-title"></h1>
          <p class="header-title">Total Efectivo: <strong> ${{ this.totalCash }}</strong> </p>
          <p class="header-title">Total de Transferencias: <strong>${{ this.totalTransactions }}</strong></p>
          <p class="header-title">Total: <strong>${{ this.total }}</strong></p>
          <p class="header-title">Total De Ganancias: <strong>${{ this.totalRevenue }}</strong></p>
        </div>
        <TableComponent :headers="tableHeadersSales" :rows="tableRowsSales" />
      </div>


      <div v-if="currentPageAdmin === 'products'">
        <div class="header-row">
          <!-- Centered h1 tag -->
          <h1 class="header-title"> Lista de Productos </h1>
          <!-- Button to open the modal, aligned to the right -->
          <button @click="openModalNewProduct" class="open-button"> Crear Nuevo producto + </button>
          <ModalCreeateProduct :isOpen="isModalnewproductOpen" @created="closeModalNewProduct"
            @close="closeModalNewProduct2" />
        </div>
        <TableComponent @update-data="updateOrDeleteProduct" :headers="tableHeadersProduct" :rows="tableRowProducts" />
        <ModelUpdateorDelete @update-data="updateOrDeleteProduct" :product="productEorD"
          :isOpen="isModalUpdateorDeleteOpen" @close="closeUorDProduct" @finish="productDeletedOrUpdated" />
      </div>

      <div v-if="currentPageAdmin === 'inventory'">
        <div class="header-row">
          <!-- Centered h1 tag -->
          <h1 class="header-title"> Inventarios de usuarios </h1>

          <!-- Button to open the modal, aligned to the right -->
          <button @click="openCreateInventory" class="open-button"> Crear Nuevo Inventario + </button>
        </div>
        <div class="header-row">
          <!-- Centered h1 tag -->
          <p class="header-title"> Seleccione un usuario: </p>
          <select class="form-control" style="display: flex;" v-model="userInventory">
            <option v-for="users in usersList" :key="users._id" :value="users">
              {{ users.email }}
            </option>
          </select>
        </div>
        <!-- <TableComponent @update-data="updateOrDeleteProduct" :headers="tableHeadersProduct" :rows="tableRowProducts" /> -->
        <ModalCreateInventory :users="usersList" :productList="tableRowProducts"
          :isOpen="isModalCreateInventoryOpen" @created="inventoryCreated" @close="closeCreateInventory" />
        <ModalModyfyInventory :repartidor="userInventory" :product="productInventory"
            @update-data="modyfyInventory" :isOpen="isModalModifyInventoryOpen" @close="closeInventory" />
        <TableComponent  @update-data="updateInventoryQty" :headers="tableHeadersUserInventory" :rows="userInventoryRows" />
        <!-- <ModelUpdateorDelete @update-data="updateOrDeleteProduct" :product="productEorD" -->
        <!-- :isOpen="isModalUpdateorDeleteOpen" @close="closeUorDProduct" @finish="productDeletedOrUpdated" /> -->
        <!-- Button to open the modal, aligned to the right -->
        <button style="margin-top: 2%;" @click="deleteInventory" class="btn-danger"> Eliminar inventario </button>
      </div>
    </div>


    <div v-else>
      <nav v-if="!user.isAdmin">
        <button :class="{ active: currentPage == 'sales'}" @click="currentPage = 'sales'">Ventas</button>
        <button :class="{ active: currentPage == 'inventory'}" @click="currentPage = 'inventory'">Inventario</button>
      </nav>
      

      <div v-if="currentPage === 'sales'">
        <div class="header-row">
          <!-- Centered h1 tag -->
          <h1 class="header-title"> Lista de ultimas ventas de {{ user.name }}</h1>
          <!-- Button to open the modal, aligned to the right -->
          <button @click="openModal" class="open-button"> Crear Nueva venta + </button>
        </div>
        <TableComponent :headers="tableHeadersSales" :rows="tableRowsSales" />
        <ModalNewSale :user=user._id :isOpen="isModalOpen" :productList=userInventoryProducts @close="closeModal"
        @created="salesCreated" />
      </div>

      <div v-if="currentPage === 'inventory'">
        <TableComponent :headers="tableHeadersUserInventory" :rows="userInventoryRows" />
      </div>
      
    </div>


  </div>
</template>

<script>
import TableComponent from './Utils/table.vue';
import ModalNewSale from './Utils/ModalNewSale.vue';
import { modyfyInventory, getOrdersByUser, createSale, getOrders, getProductList, getInventory, deleteUserInventory } from '../Api/Dashboard/dashboard.js';
import { getUsers } from '../Api/Users/usersApi.js';
import ModalCreateUser from './Utils/ModalNewUser.vue'; // Adjust the path based on your folder structure
import ModalDeleteUsers from './Utils/ModalDeleteUsers.vue';
import ModelUpdateorDelete from './Utils/ModalUpOrDelProd.vue';
import ModalCreeateProduct from './Utils/ModalCreeateProduct.vue';
import ModalCreateInventory from './Utils/ModalCreateInventory.vue';
import ModalModyfyInventory from './Utils/ModalModyfyInventory.vue';
import { toast } from 'vue3-toastify';

export default {
  components: {
    TableComponent,
    ModalNewSale,
    ModalCreateUser,
    ModalDeleteUsers,
    ModelUpdateorDelete,
    ModalCreeateProduct,
    ModalCreateInventory,
    ModalModyfyInventory
  },
  data() {
    return {
      currentPageAdmin: 'users', // Set default page
      currentPage: 'sales',
      tableHeadersSales: ['Metodo de pago', 'Articulos vendidos', "Efectivo", 'Transferencia', 'Total', 'Fecha'],
      tableHeadersSalesAdmin: ['Metodo de pago', 'Articulos vendidos', "Efectivo", 'Transferencia', 'Total', 'Ganancia', 'Fecha', 'Repartidor'],
      tableRowsSales: [],
      tableHeadersUsers: ['ID', 'Email', 'Nombre', 'Admin', 'Telefono'],
      tableRowsUsers: [],
      tableHeadersProduct: ['ID', 'Nombre', 'Descripcion', 'costo'],
      tableRowProducts: [],
      isModalOpen: false,
      user: {_id:""},
      errorMessage: '',
      isModalDeleteUsersOpen: false,
      idUserDelete: "",
      isModalModifyInventoryOpen: false,
      productInventory: {},
      selectedDateStart: this.formatDate(new Date()),
      selectedDateEnd: null,
      userSales:null,
      isModalUpdateorDeleteOpen: false,
      productEorD: {},
      isModalnewproductOpen: false,
      totalCash: 0,
      totalTransactions: 0,
      total: 0,
      totalRevenue: 0,
      userInventory: {},
      isModalCreateInventoryOpen: false,
      tableHeadersUserInventory: ['Cantidad', 'Producto', 'Fecha de asignación'],
      userInventoryRows: [],
      userInventoryProducts: [],
      usersList: [],
      userSalesFilters: []
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
    },
    userSales() {
      this.getAllSales(this.userSales._id);
    },
    userInventory() {
      //getUser inventory
      this.loadUserInventory(this.userInventory._id);
    }
  },
  methods: {
    loadUserInfo() {
      if (this.user.isAdmin) {
        this.tableHeadersSales = this.tableHeadersSalesAdmin;
        this.setInitDates();
        this.getUsersVue();
      }else{
        this.loadUserInventory(this.user._id);
        this.getAllSales(this.user._id);
      }
      this.getProductList()
    },
    async loadUserInventory(user_id) {
      // user_id
      try {
        const response = await getInventory(user_id);
        if (response.status === 200) {
          //Show toast
          this.userInventoryRows = response.data.inventory.map(item => ({
            quantity: item.quantity,
            product: item.name,
            date: item.date
          }));
          this.userInventoryProducts = response.data.inventory;
        } else {
          toast.error(response.message)
          this.errorMessage = response.message;
        }
      } catch (error) {
        // Handle error response
        toast.error("Ha ocurrido un error al cargar el inventario");
        if (error.response) {
          this.errorMessage = error.response.data.message || 'Fallido';
        } else {
          this.errorMessage = 'An error occurred: ' + error.message;
        }
      }
      // /get_inventory
    },
    async deleteInventory() {
      const user_id = this.userInventory._id;
      try {
        if (user_id) {
          const response = await deleteUserInventory(user_id);
          if (response.status === 200) {
            //Show toast
            toast.success("Inventario eliminado correctamente");
            this.loadUserInventory(user_id);
          } else {
            toast.error(response.message)
            this.errorMessage = response.message;
          }
        } else {
          toast.error("No se ha seleccionado un usuario");
        }
      } catch (error) {
        // Handle error response
        toast.error("Ha ocurrido un error al cargar el inventario");
        if (error.response) {
          this.errorMessage = error.response.data.message || 'Fallido';
        } else {
          this.errorMessage = 'An error occurred: ' + error.message;
        }
      }
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    closeUorDProduct() {
      this.isModalUpdateorDeleteOpen = false;
    },
    closeModalNewProduct() {
      this.getProductList();
      this.isModalnewproductOpen = false;
    },
    closeModalNewProduct2() {
      this.isModalnewproductOpen = false;
    },
    openModalNewProduct() {
      this.isModalnewproductOpen = true;
    },
    productDeletedOrUpdated() {
      this.isModalUpdateorDeleteOpen = false;
      this.getProductList();
    },
    salesCreated() {
      this.isModalOpen = false;
      this.loadUserInventory(this.user._id);
      this.getAllSales(this.user._id);
    },
    deleteUser(row_id) {
      this.isModalDeleteUsersOpen = true;
      this.idUserDelete = row_id._id;
    },
    updateOrDeleteProduct(product) {
      this.productEorD = this.tableRowProducts.find(item => item._id === product._id);
      this.isModalUpdateorDeleteOpen = true;
    },
    updateInventoryQty(product) {
      this.productInventory = product;
      this.isModalModifyInventoryOpen = true;
    },
    openDeleteModal() {
      this.isModalDeleteUsersOpen = true;
    },
    closeInventory() {
      this.isModalModifyInventoryOpen = false;
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
    openCreateInventory() {
      this.isModalCreateInventoryOpen = true;
    },
    closeCreateInventory() {
      this.isModalCreateInventoryOpen = false;
    },
    inventoryCreated() {
      // get all the new inventories
      this.isModalCreateInventoryOpen = false;
      this.loadUserInventory(this.userInventory._id);
    },
    async getAllSales(user_id) {
      try {
        if (this.user.isAdmin) {
          const body = {
            startDate: this.selectedDateStart,
            endDate: this.selectedDateEnd,
          }
          if(user_id) body.vendor = user_id;
          const response = await getOrders(body);
          this.tableRowsSales = response.data.sales;
          this.totalCash = response.data.totalSalesCash;
          this.totalTransactions = response.data.totalSalesTranfer;
          this.total = response.data.totalSales;
          this.totalRevenue = response.data.totalSalesRevenue;
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
    async getProductList() {

      try {
        const response = await getProductList();

        this.tableRowProducts = response.data.products;
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
    async getUsersVue() {
      try {
        const response = await getUsers();
        this.tableRowsUsers = response.data.data;

        this.usersList = response.data.data.filter(user => !user.isAdmin);

        this.userSalesFilters = [...this.usersList]
        this.userSalesFilters.push({
          "_id":null,
          "name": "Todos",
          "email": "Todos"
        })

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

      const csv = [ ...this.tableRowsSales ];
      const newRow = {
        paymentMethod: "",
        items: "",
        cash: "$" + this.totalCash + ".00",
        transactions: "$" + this.totalTransactions + ".00",
        total: "$" + this.total + ".00",
        revenue: "$" + this.totalRevenue + ".00"
      }
      csv.push(newRow);
      const csvData = this.convertJSONToCSV(csv);

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
    setInitDates() {
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
    validateDates() {
      const start = new Date(this.selectedDateStart);
      const end = new Date(this.selectedDateEnd);
      if (start > end) {
        toast.error("La fecha de inicio debe ser anterior a la fecha de finalización");
        this.setInitDates();
      } else {
        this.getAllSales(this.userInventory._id? this.userInventory._id : null);
      }
    },
    async modyfyInventory(body) { 
      try {
        const response = await modyfyInventory(body);
        if (response.status === 200) {
            //Show toast
            toast.success("Inventario actualizado correctamente");
            this.loadUserInventory(this.userInventory._id);
          } else {
            toast.error(response.message)
            this.errorMessage = response.message;
          }
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


/* Style for the button, aligned to the right */
.date-input {
  padding: 10px 20px;
  background-color: #007bff1e;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  white-space: nowrap;
  margin-left: 12px;
  /* Prevents text from wrapping in small spaces */
}


.btn-danger {
  background-color: #e6441c;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

nav {
  display: flex;
  padding: 10px;
  gap: 10px;
  justify-content: center;
}

button {
  padding: 10px;
  cursor: pointer;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 4px;
}

.active {
  background-color: aliceblue;
  color: black;
  padding: 10px;
  cursor: pointer;
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  border: 1px solid #007bff;
  border-radius: 4px;
}


/* button:hover {
  background-color: #0056b3;
} */

/* Opcional: Ajusta las celdas en pantallas pequeñas */
@media screen and (max-width: 768px) {
  .table-container {
    overflow-x: hidden;
    /* Agrega desplazamiento horizontal */
    -webkit-overflow-scrolling: touch;
    /* Para suavizar el scroll en dispositivos iOS */
  }

  .header-row {
    width: 100%;
    padding: 10px;
    flex-wrap: wrap
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

  .p {
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