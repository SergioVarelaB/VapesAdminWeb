<!-- Modal.vue -->
<template>
    <div v-if="isOpen" class="modal" >
        <div class="modal-content scrollable-container">
            <span class="close" @click="closeModal">&times;</span>
            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label for="name">Usuario asignado:</label>
                    <select class="form-control" style="display: flex;" v-model="userInventory">
                        <option v-for="users in users" :key="users._id" :value="users">
                            {{ users.email }}
                        </option>
                    </select>

                    <div class="product-list" style=" display: flex; gap: 10px; flex-wrap: nowrap;">
                        <p>Crear un paquete de mayoreo?</p>
                        <label class="toggle-switch">
                            <input type="checkbox" v-model="CreateBulk" />
                            <span class="slider"></span>
                        </label>
                    </div>

                    <div v-if="CreateBulk">

                        <form @submit.prevent="submitForm">
                            <div class="form-group">
                                <label for="name">Nombre:</label>
                                <input type="text" id="name" v-model="bulkName" required class="form-control" />
                            </div>
                            <button @click="addToCart({name: bulkName,_id: bulkItems}, '1', true)" class="btn btn-primary"> Agregar Producto</button>
                        </form>

                    </div>

                    <label style="padding: 10px;" for="amount;">Productos a agregar:</label>
                    <div class="product-list" style="    display: flex; gap: 10px; flex-wrap: nowrap;">
                        <select class="form-control" style="display: flex;" v-model="selectedOptions">
                            <option v-for="product in productList" :key="product._id" :value="product">
                                {{ product.name }}
                            </option>
                        </select>
                        <input type="Number" id="quantity" v-model="quantity" required class="form-control"
                            style="width: 20%;" min="0" />
                        <button @click="addToCart(selectedOptions, quantity, false)" class="btn btn-primary"
                            style="width: 20%; ">+</button>
                    </div>


                    <!-- Cart Section -->
                    <div v-if="arrayItems.length > 0">
                        <div class="cart product-list" v-for="item in arrayItems" :key="item._id">
                            <p>{{ item.name }} (x{{ item.quantity }})</p>
                            <button class="btn btn-danger" @click="removeFromCart(item.product_id)">Eliminar</button>
                        </div>
                    </div>

                </div>
                <button @click="create" class="btn btn-primary">Crear Producto</button>

            </form>

        </div>
    </div>
</template>

<script>
import { createInventory } from '../../Api/Dashboard/dashboard.js';
import { toast } from 'vue3-toastify';
export default {
    props: {
        isOpen: {
            type: Boolean,
            required: true
        },
        users: {
            type: Array,
            required: true
        },
        productList: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            name: "",
            bulkName: "",
            bulkItems: 0,
            errorMessage: '',
            product: {},
            description: "",
            userInventory: {},
            quantity: 0,
            arrayItems: [],
            selectedOptions: null,
            CreateBulk: false
        };
    },
    methods: {
        resetProducts() {
            this.quantity = 0;
            this.selectedOptions = null;
        },
        resetItems() {
            this.name = '';
            this.bulkName = "";
            this.bulkItems = 0;
            this.errorMessage = '';
            this.product = {};
            this.userInventory = {};
            this.quantity = 0;
            this.arrayItems = [];
            this.selectedOptions = null;
        },
        closeModal() {
            this.resetItems();
            this.$emit('close');
        },
        created() {
            this.resetItems();
            this.$emit('created');
        },
        addToCart(product, quantity, isbulk) {
            console.log(product)
            if (product && this.userInventory._id) {
                if(isbulk){
                    this.bulkName = "";
                    this.CreateBulk = false;
                    this.bulkItems+=1;
                }
                const existingItem = this.arrayItems.find(item => item.product_id === product._id);
                if (existingItem) {
                    existingItem.quantity = quantity;
                } else {
                    this.arrayItems.push({ name: product.name, product_id: product._id, quantity: quantity, vendor: this.userInventory._id , isBulk: isbulk });
                }
                this.resetProducts();
            } else {
                toast.error("Debe seleccionar un usuario y un producto");
            }
        },
        removeFromCart(product) {
            const index = this.arrayItems.findIndex(item => item.product_id === product);
            if (index !== -1) {
                this.arrayItems.splice(index, 1);
            }
        },
        async create() {
            try {
                const response = await createInventory(this.arrayItems);
                if (response.status === 200) {
                    //Show toast
                    this.resetItems();
                    toast.success("Elemento creado correctamente");
                    this.created();
                } else {
                    toast.error(response.message)
                    this.errorMessage = response.message;
                }
            } catch (error) {
                // Handle error response
                toast.error("Ha ocurrido un error al crear el producto");
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

.scrollable-container {
  max-height: 60%;
  overflow-y: auto; /* Enables vertical scrolling */
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

/* Basic styling for the toggle switch */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

</style>