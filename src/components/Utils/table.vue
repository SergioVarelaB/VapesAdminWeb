<template>
    <div class="login-container">
        <table class="custom-table">
            <thead>
                <tr>
                    <th v-for="(header, index) in headers" :key="index" @click="sortTable(index)">
                        {{ header }} <span v-if="sortColumn === index">{{ sortAsc ? '▲' : '▼' }}</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr @click="modalDelete(index)" v-for="(row, index) in sortedRows" :key="index">
                    <td v-for="(value, i) in row" :key="i">{{ value }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'TableComponent',
    props: {
        headers: {
            type: Array,
            required: true
        },
        rows: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            sortColumn: null,
            sortAsc: true
        };
    },
    computed: {
        sortedRows() {
            if (this.sortColumn === null) {
                return this.rows;
            }
            return [...this.rows].sort((a, b) => {
                if (a[this.sortColumn] < b[this.sortColumn]) return this.sortAsc ? -1 : 1;
                if (a[this.sortColumn] > b[this.sortColumn]) return this.sortAsc ? 1 : -1;
                return 0;
            });
        }
    },
    methods: {
        sortTable(index) {
            if (this.sortColumn === index) {
                this.sortAsc = !this.sortAsc;
            } else {
                this.sortColumn = index;
                this.sortAsc = true;
            }
        },
        modalDelete(index) {
            this.$emit('update-data', this.rows[index]._id);
        }
    }
};
</script>

<style scoped>
.table-container {
    width: 100%;
    overflow-x: auto;
    /* Agrega desplazamiento horizontal */
    -webkit-overflow-scrolling: touch;
    /* Para suavizar el scroll en dispositivos iOS */
}

.custom-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    text-align: center;
}

.custom-table th,
.custom-table td {
    border: 1px solid #a0a0a0;
    padding: 8px;
}

.custom-table th {
    background-color: #7cb3ea;
    text-align: left;
}

.custom-table tr:hover {
    background-color: #b5def9;
}


.login-container {
    max-width: 2000px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

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
        padding: 0%;
        margin: 5px;
    }
}
</style>