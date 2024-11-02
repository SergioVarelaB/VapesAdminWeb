<!-- Modal.vue -->
<template>
    <div v-if="isOpen" class="modal">
        <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <form @submit.prevent="submitForm">
                <p>{{ product._id }}</p>
                <div class="form-group">
                    <label for="name">Nombre:</label>
                    <input type="text" id="name" v-model="name" required class="form-control" />

                    <label for="description">Descripcion:</label>
                    <input type="text" id="description" v-model="description" required class="form-control" />

                    <label for="description">Costo:</label>
                    <input type="Number" id="cost" v-model="cost" required class="form-control" min="0" />
                </div>
                <div class="product-list">
                    <button @click="editProduct" class="btn btn-primary">Editar Producto</button>

                    <button @click="deleteProduct" style="background-color: #e6441c" class="btn btn-primary">Eliminar Producto</button>
                </div>

            </form>

        </div>
    </div>
</template>

<script>
import { updateProduct, deleteProduct } from '../../Api/Dashboard/dashboard.js';
import { toast } from 'vue3-toastify';
export default {
    props: {
        isOpen: {
            type: Boolean,
            required: true
        },
        product: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            name: this.product.name,
            errorMessage: '',
            description: this.product.description,
            cost: this.product.cost,
        };
    },
    watch: {
        isOpen() {
            if (!this.isOpen) {
                this.resetItems();
            } else {
                this.name = this.product.name
                this.description = this.product.description
                this.cost = this.product.cost
            }
        }
    },
    methods: {
        resetItems() {
            this.name = '';
            this.errorMessage = '';
            this.description = '';
            this.cost = '';
        },
        closeModal() {
            this.resetItems();
            this.$emit('close');
        },
        editOrDelete() {
            this.resetItems();
            this.$emit('finish');
        },
        async editProduct() {
            try {
                const productUpdate = {
                    name: this.name,
                    description: this.description,
                    cost: this.cost
                }
                const response = await updateProduct(this.product._id, productUpdate);
                if (response.status === 200) {
                    //Show toast
                    toast.success("Elemento editado correctamente");
                    this.editOrDelete();
                } else {
                    toast.error(response.message)
                    this.errorMessage = response.message;
                }
            } catch (error) {
                // Handle error response
                toast.error("Ha ocurrido un error al editar el producto");
                if (error.response) {
                    this.errorMessage = error.response.data.message || 'Fallido';
                } else {
                    this.errorMessage = 'An error occurred: ' + error.message;
                }
            }
        },
        async deleteProduct() {
            try {
                const response = await deleteProduct(this.product._id);
                if (response.status === 200) {
                    //Show toast
                    toast.success("Elemento eliminado correctamente");
                    this.editOrDelete();
                } else {
                    toast.error(response.message)
                    this.errorMessage = response.message;
                }
            } catch (error) {
                // Handle error response
                toast.error("Ha ocurrido un error al editar el producto");
                if (error.response) {
                    this.errorMessage = error.response.data.message || 'Fallido';
                } else {
                    this.errorMessage = 'An error occurred: ' + error.message;
                }
            }
        },
    }
};
</script>

<style scoped>
.modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background-color: #fff;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 400px;
    border-radius: 10px;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    display: flex;
    margin-left: auto;
}

.close:hover,
.close:focus {
    color: rgb(231, 53, 53);
    text-decoration: none;
    cursor: pointer;
}

.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

.label {
    display: block;
    margin-bottom: 5px;
}

.password-wrapper {
    position: relative;
}

input {
    width: 100%;
    padding: 8px;
    margin-bottom: 20px;
    box-sizing: border-box;
}

.input {
    padding: 8px;
    border: 1px solid #888;
    box-sizing: border-box;
}

.toggle-password-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    font-size: 14px;
}

.btn {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    margin: 1%;
    cursor: pointer;
}

.btn-danger {
    background-color: #e6441c;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
}

.error-message {
    color: red;
    margin-top: 10px;
}

.product-list,
.cart-items {
    display: flexbox;
    margin: 10px;
    justify-content: space-between;
    /* Distribute space between items */
    flex-wrap: wrap;
    /* Allows items to wrap onto the next line if they overflow */
}

.cart {
    margin-top: 10px;
}
</style>