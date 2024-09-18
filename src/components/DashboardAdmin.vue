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
import axios from 'axios';

export default {
  components: {
    TableComponent
  },
  data() {
    return {
      tableHeadersUsers: ['ID', 'Repartidor', 'Cantidad', 'Cliente',  'Fecha'],
      tableRowsUsers: [],
      tableHeadersSales: ['ID', 'Repartidor', 'Cantidad', 'Cliente',  'Fecha'],
      tableRowsSales: []
    };
  },
  mounted() {
    this.getAllSales();
  },
  methods: {
    async getAllSales() {
      try {
        const response = await axios.post('https://284d-2806-2f0-34e0-a285-bdae-9098-b4ae-3c33.ngrok-free.app/orders/get_sales', {} , {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'  // Adding CORS header
          }
        });
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