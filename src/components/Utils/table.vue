<template>
    <div class="login-container">
        <table class="custom-table">
            <thead>
                <tr>
                    <th v-for="(header, index) in headers" :key="index" @click="sortTable(index)">
                        {{ header }} <span v-if="sortColumn === index">{{ this.sortAsc ? '▲' : '▼' }}</span>
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
            console.log(this.rows);
            if (this.sortColumn === null) {
                return this.rows;
            }
            // Copy the rows and sort them
            return [...this.rows].sort((a, b) => {
                const aVal = a[this.sortColumn];
                const bVal = b[this.sortColumn];

                // Log to check values being compared
                console.log(`Comparing ${aVal} and ${bVal}`);

                // Handle null or undefined values (put them last)
                if (aVal == null) return this.sortAsc ? -1 : 1;
                if (bVal == null) return this.sortAsc ? 1 : -1;

                // Handle number comparison
                if (typeof aVal === 'number' && typeof bVal === 'number') {
                    return this.sortAsc ? aVal - bVal : bVal - aVal;
                }

                // Handle date comparison (check if values are dates)
                const dateA = new Date(aVal);
                const dateB = new Date(bVal);
                if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
                    return this.sortAsc ? dateA - dateB : dateB - dateA;
                }

                // Handle string comparison (case insensitive)
                if (typeof aVal === 'string' && typeof bVal === 'string') {
                    return this.sortAsc
                        ? aVal.toLowerCase().localeCompare(bVal.toLowerCase())
                        : bVal.toLowerCase().localeCompare(aVal.toLowerCase());
                }

                // Fallback for unknown types
                return 0;
            });
        }
    },
    methods: {
        sortTable(index) {
            console.log(index);
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