<template>
  <div>
    <h1>Lista de repartidores</h1>
    <TableComponent :headers="tableHeadersUsers" :rows="tableRowsUsers" />

    <br><br>
    <h1>Lista de ventas</h1>
    <TableComponent :headers="tableHeadersSales" :rows="tableRowsSales" />
  </div>
</template>

<script>
import TableComponent from './table.vue';
import { getUsers } from '../Api/Users/usersApi.js';
import { getOrders } from '../Api/Dashboard/dashboard.js';


export default {
  components: {
    TableComponent
  },
  data() {
    return {
      tableHeadersUsers: ['ID', 'email', 'nombre', 'Admin',  'telefono'],
      tableRowsUsers: [],
      tableHeadersSales: ['ID', 'Repartidor', 'Cantidad', 'Cliente',  'Fecha'],
      tableRowsSales: []
    };
  },
  mounted() {
    this.getAllSales();
    this.getUsersVue();
  },
  methods: {
    async getUsersVue()  {
      try {
        const response = await getUsers();
        console.log(response.data.data)
        this.tableRowsUsers = response.data.data;
      }catch (error) {
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