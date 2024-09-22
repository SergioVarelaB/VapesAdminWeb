<template>
  <div>
    <h1>Ultimas ventas</h1>
    <TableComponent :headers="tableHeaders" :rows="tableRows" />
  </div>
</template>

<script>
import TableComponent from './Utils/table.vue';

export default {
  components: {
    TableComponent
  },
  data() {
    return {
      tableHeaders: ['ID', 'Name', 'Email', 'Role'],
      tableRows: [
        [1, 'John Doe', 'john@example.com', 'Admin'],
        [2, 'Jane Smith', 'jane@example.com', 'User'],
        [3, 'Sam Green', 'sam@example.com', 'Editor'],
        [4, 'Anna Blue', 'anna@example.com', 'User']
      ]
    };
  }
};
</script>