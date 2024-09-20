<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required class="form-control" />
            </div>

            <div class="form-group">
                <label for="password">Password:</label>
                <div class="password-wrapper">
                    <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required
                        minlength="6" class="form-control" />
                    <button type="button" @click="togglePassword" class="toggle-password-btn">
                        {{ showPassword ? 'Hide' : 'Show' }}
                    </button>
                </div>
            </div>

            <button type="submit" class="btn btn-primary">Login</button>
        </form>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
</template>

<script>
import getUsers from '../Api/Users/usersApi.js';

export default {
    name: 'loginVue',
    data() {
        return {
            email: "",
            password: "",
            showPassword: false,  // Boolean to track whether to show or hide the password
            errorMessage: ""
        };
    },
    methods: {
        async submitForm() {
            if (this.validateForm()) {
                try {
                    const req =  {
                        email: this.email,
                        password: this.password
                    }
                    const response = await getUsers(req);
                    
                    if(response.user.isAdmin){
                        this.$router.push('/dashboard-admin');
                    }else{
                        this.$router.push('/dashboard-user');
                    }

                } catch (error) {
                    // Handle error response
                    if (error.response) {
                        this.errorMessage = error.response.data.message || 'Login failed';
                    } else {
                        this.errorMessage = 'An error occurred: ' + error.message;
                    }
                }
            }
        },
        validateForm() {
            if (!this.email || !this.password) {
                this.errorMessage = "Both fields are required.";
                return false;
            }

            if (!this.isValidEmail(this.email)) {
                this.errorMessage = "Invalid email format.";
                return false;
            }

            if (this.password.length < 6) {
                this.errorMessage = "Password must be at least 6 characters.";
                return false;
            }

            this.errorMessage = "";
            return true;
        },
        isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },
        togglePassword() {
            this.showPassword = !this.showPassword;  // Toggle the password visibility
        }
    }
}
</script>


<style scoped>
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

.password-wrapper {
    position: relative;
}

input {
    width: 100%;
    padding: 8px;
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

.error-message {
    color: red;
    margin-top: 10px;
}
</style>