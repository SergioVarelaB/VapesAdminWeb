<!-- Modal.vue -->
<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="amount">Cantidad en pesos:</label>
          <input type="number" id="amount" v-model="amount" required class="form-control" />
        </div>

        <div class="product-list">
          <label>Productos a agregar:</label>
          <select class="label" v-model="selectedOptions">
            <option v-for="product in productList" :key="product._id" :value="product">
              {{ product.name }}
            </option>
          </select>

          <!-- Button to add +1 submitForm -->
          <button class="btn btn-primary"  type="button" @click="addToCart(selectedOptions)" >+1</button>
        </div>

        <!-- Cart Section -->
        <div v-if="arrayItems.length > 0">
          <div class="cart product-list" v-for="item in arrayItems" :key="item._id">
            <p class=label>{{ item.name }} (x{{ item.quantity }})</p>
            <button class="btn btn-danger" @click="removeFromCart(item._id)">Eliminar</button>
          </div>
        </div>

        <!-- Empty Cart Message -->
        <p v-else>No hay productos agregados</p>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>


        <button type="submit" class="btn btn-primary">Crear venta</button>

      </form>

    </div>
  </div>
</template>

<script>
import { createSale } from '../../Api/Dashboard/dashboard.js';
import { toast } from 'vue3-toastify';
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    productList: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      amount: '',
      showPassword: false,
      errorMessage: '',
      items: '',
      arrayItems: [],
      selectedOptions: null,
    };
  },
  methods: {
    resetItems() {
      this.amount = '';
      this.items = [];
      this.arrayItems = [];
      this.errorMessage = '';
      this.selectedOptions = null;
    },
    closeModal() {
      this.resetItems();
      this.$emit('close');
    },
    saleCreated() {
      this.resetItems();
      this.$emit('created');
    },
    addToCart(product) {
      console.log(this.arrayItems)
      if (product) {
        const existingItem = this.arrayItems.find(item => item._id === product._id);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          this.arrayItems.push({ name: product.name, _id: product._id, quantity: 1 });
        }
      }
    },
    removeFromCart(product) {
      const index = this.arrayItems.findIndex(item => item._id === product);
      if (index !== -1) {
        this.arrayItems.splice(index, 1);
      }
    },
    async submitForm() {
      if (this.validateForm()) {
        try {
          const Order = {
            user: this.user,
            amount: this.amount,
            items: this.arrayItems,
          }
          const response = await createSale(Order);
          if (response.status === 201) {
            //Show toast
            toast.success("Venta creado correctamente");
            this.saleCreated();
          } else {
            toast.error(response.message)
            this.errorMessage = response.message;
          }
        } catch (error) {
          // Handle error response
          toast.error("Ha ocurrido un error al crear el usuario");
          if (error.response) {
            this.errorMessage = error.response.data.message || 'Fallido';
          } else {
            this.errorMessage = 'An error occurred: ' + error.message;
          }
        }
      }
    },
    validateForm() {
      if (!this.amount || this.arrayItems.length === 0) {
        this.errorMessage = "Todos los campos son requeridos";
        return false;
      }
      this.errorMessage = "";
      return true;
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
  display: flex;
  justify-content: space-between;
  /* Distribute space between items */
  flex-wrap: wrap;
  /* Allows items to wrap onto the next line if they overflow */
}

.cart {
  margin-top: 10px;
}
</style>