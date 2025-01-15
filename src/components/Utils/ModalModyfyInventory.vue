<!-- Modal.vue -->
<template>
    <div v-if="isOpen" class="modal">
        <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <form @submit.prevent="submitForm">
                <p>Repartidor: {{ repartidor.name }}</p>
                <p>Nombre del producto: {{ product.product }}</p>
                <div class="product-list">

                    <button class="btn btn-danger" type="button" @click="minusOne()" >-1</button>
                    <p> {{ productUpdateQuantity }} </p>
                    <button class="btn btn-primary" type="button" @click="plusOne()" >+1</button>

                </div>

                <button class="btn btn-primary" type="button" @click="submitForm()" > Actualizar </button>

            </form>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        isOpen: {
            type: Boolean,
            required: true
        },
        product: {
            type: Object,
            required: true
        },
        repartidor: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            productUpdateQuantity: this.product.quantity
        };
    },
    watch: {
        isOpen() {
            this.productUpdateQuantity = this.product.quantity
        },
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        plusOne(){
            this.productUpdateQuantity++;
        },
        minusOne(){
            if(this.productUpdateQuantity <= 0) return;
            this.productUpdateQuantity--;
        },
        submitForm() {
            const body = {
                vendor : this.repartidor._id,
                name : this.product.product,
                quantity : this.productUpdateQuantity
            }
            this.$emit('update-data', body);
            this.closeModal();
        }
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
    margin: 5%;
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
    display: ruby-text;;
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