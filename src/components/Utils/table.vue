<template>
    <div class="login-container">
        <table class="custom-table">
            <thead>
                <tr>
                    <th v-for="(header, index) in headers" :key="index">
                        {{ header }} 
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr @click="modalDelete(index)" v-for="(row, index) in paginatedRows" :key="index">
                    <td v-for="(value, i) in row" :key="i">{{ value }}</td>
                </tr>
            </tbody>
        </table>
        <!-- Pagination Controls -->
        <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
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
        },
        rowsPerPage: {
            type: Number,
            default: 10, // Default number of rows per page
        },
    },
    data() {
        return {
            currentPage: 1,
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.rows.length / this.rowsPerPage);
        },
        paginatedRows() {
            const start = (this.currentPage - 1) * this.rowsPerPage;
            const end = start + this.rowsPerPage;
            return this.rows.slice(start, end);
        },
    },
    methods: {
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
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

.pagination {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    padding: 5px 10px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
    white-space: nowrap;
}

button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
    white-space: nowrap;
}

/* Opcional: Ajusta las celdas en pantallas pequeñas */
@media screen and (max-width: 768px) {
    .table-container {
        overflow-x: auto;
        /* Agrega desplazamiento horizontal */
        -webkit-overflow-scrolling: touch;
        /* Para suavizar el scroll en dispositivos iOS */
    }

    .custom-table {
        width: 100%;
        font-size: 40%;
    }

    .custom-table th,
    .custom-table td {
        overflow-x: hidden;
        border: 1px solid #a0a0a0;
    }

    .login-container {
        border: 0px;
        box-shadow: none;
        padding: 0%;
        margin: 5px;
    }
}
</style>