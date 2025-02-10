<script setup>
import SignupForm from './SignupForm.vue';
</script>

<template>
    <div class="signup-view-form">
        <h2>Ingresa todos los datos para crear una cuenta nueva</h2>
        <label>
            <SignupForm/>
        </label>
        <div>
            ¿Ya tienes una cuenta?
            <router-link to="/login">Iniciar sesión</router-link>
        </div>
    </div>
    
</template>
<style scoped>
.signup-view-form {
    padding-top: 20%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
}
</style>