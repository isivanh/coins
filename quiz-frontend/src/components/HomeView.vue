<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import UserOptions from './UserOptions.vue';
import TransferForm from './TransferForm.vue';

const user = ref({
    firstName: '',
    lastName: '',
    email: '',
    coins: 0
});
const router = useRouter();
const checkToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        router.push('/login');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/auth/validate', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            const data = await response.json();
            setUser(data.user);
            console.log('Usuario autenticado:', data);
        } else {
            router.push('/login');
        }
    } catch (error) {
        console.error('Error al verificar el token:', error);
        router.push('/login');
    }
};

onMounted(() => {
    checkToken();
});

const setUser = (newUser) => {
    console.log('Nuevo usuario:', newUser);
    Object.assign(user.value, newUser);
};
const handleTransfer = ({ email, amount }) => {
    console.log(`Transfiriendo ${amount} a ${email}`);
    user.value.coins -= amount;
};
</script>

<template>
    <div class="home-view">
        <div class="home-content">
            <h1>Home</h1>
            
            <strong>Current route path:</strong> {{ $route.fullPath }}
            
        </div>
        
        <div>
            <UserOptions :firstName="user.firstName" :lastName="user.lastName" :email="user.email" :coins="user.coins"/>
        </div>
        <div class="transfer-container">
            <h2>Comparte coins con tus amigos</h2>
            <TransferForm :onTransfer="handleTransfer"/>
        </div>
    </div>
    
</template>

<style scoped>
    h1 {
        color: #cccccc;
    }
    .home-view {
        padding-top: 10px;
        min-width: 100%;
        max-width: 600px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .home-content {
        display: flex;
        flex-direction: row;
        gap: 10px;
        align-items: baseline;
    }
    .transfer-container {
        display: flex;
        flex-direction: column;
        padding-top: 20px;
    }
</style>