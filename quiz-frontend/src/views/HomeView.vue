<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import UserOptions from '@/components/UserOptions.vue';
import TransferForm from '@/components/TransferForm.vue';
import api from "@/common/api-service";

const user = ref({
    firstName: '',
    lastName: '',
    email: '',
    coins: 0
});
const isLoaded = ref(false);
const errorLog = ref('');
const router = useRouter();
const checkToken = async () => {
    const result = await api.AuthService.validate();
    if (result.success) {
        setUser(result.data.user);
        isLoaded.value = true;
    } else {
        router.push('/login');
    }
};

onMounted(() => {
    checkToken();
});

const setUser = (newUser) => {
    Object.assign(user.value, newUser);
};
const handleTransfer = async({ email, amount }) => {
    const result = await api.UserService.transferCoins(email, amount);
    if (result.success) {
        user.value.coins = result.data.user.coins;
        errorLog.value = result.data.message;
    } else {
        errorLog.value = result.error;
    }
};
</script>
<template>
    <div v-if="!isLoaded" class="loader-container">
        <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div>
                <div class="gap-patch">
                    <div class="circle"></div>
                </div>
                <div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div>
        <h4>Cargando...</h4>
    </div>
    <div v-else class="row" style="margin-top: 20px;">
        <div class="col s12">
            <UserOptions :firstName="user.firstName" :lastName="user.lastName" :email="user.email" :coins="user.coins"/>
        </div>
        <div v-if="user.coins > 0" class="col s12 center-align">
            <span class="helper-text red-text">{{ errorLog }}</span>
            <TransferForm :onTransfer="handleTransfer"/>
        </div>
        <div v-else class="col s12 center-align">
            <h5>You don't have coins to transfer</h5>
        </div>
    </div>
</template>
<style scoped>
.loader-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    gap: 2rem;
}

h4 {
    color: #26a69a;
    margin: 0;
}
</style>