<script setup>
import LoginForm from './LoginForm.vue';
</script>

<template>
    <div class="login-view-form">
        <h1>Bienvenido nuevamente</h1>
        <h2>Ingresa tus datos para empezar a transferir!</h2>
        <label>
            <LoginForm/>
        </label>
        <div>
            ¿No tienes una cuenta?
            <router-link to="/signup">Crear una cuenta</router-link>
        </div>
    </div>
    
</template>
<style scoped>
.login-view-form {
    padding-top: 20%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
</style>