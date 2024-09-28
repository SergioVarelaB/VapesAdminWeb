<!-- Modal.vue -->
<template>
    <div v-if="isOpen" class="modal">
        <div class="modal-content">
            <div class="header-row">
                <!-- Centered h1 tag -->
                <h5 class="header-title"> Estas seguro de eliminar este usuario? {{ idUser }}</h5>
                <!-- Button to open the modal, aligned to the right -->
                <span class="close" @click="closeModal">&times;</span>
            </div>
            <p v-if="errorMessage" class="error-message"> {{ errorMessage }}</p>
            <button @click="submit" class="btn btn-primary">Aceptar</button>
        </div>
    </div>
</template>

<script>
import { deleteUser } from '../../Api/Users/usersApi.js';
import { toast } from 'vue3-toastify';

export default {
    props: {
        isOpen: {
            type: Boolean,
            required: true
        },
        idUser: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            id: '',
        };
    },
    methods: {
        async submit() {
            try {
                const response = await deleteUser({ id: this.idUser });
                if (response.status === 200) {
                    toast.success("Usuario eliminado correctamente");
                    this.userDeleted()
                }
            }catch(error){
                toast.error("No fue posible eliminar este registro");
            }
        },
        closeModal() {
            this.id = '';
            this.errorMessage = '';
            this.$emit('close');
        },
        userDeleted() {
            this.id = '';
            this.errorMessage = '';
            this.$emit('deleted');
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
    width: 90%;
    max-width: 600px;
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


.btn {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
}

.error-message {
    color: red;
    margin-top: 10px;
}

/* Flex container for h1 and button */
.header-row {
    display: flex;
    justify-content: space-between;
    /* This ensures space between h1 and button */
    align-items: center;
    /* Aligns items vertically centered */
    padding: 10px;
}
</style>