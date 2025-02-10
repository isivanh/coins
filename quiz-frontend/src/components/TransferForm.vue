<script setup>
import { ref } from 'vue';

const props = defineProps({
    onTransfer: {
        type: Function,
        required: true
    }
});

const email = ref('');
const amount = ref(0);

const handleTransfer = () => {
    if (props.onTransfer) {
        props.onTransfer({ email: email.value, amount: amount.value });
    }
};
</script>
<template>
    <div class="transfer-form">
        <h3>Transferir</h3>
        <label>
            <input type="number" v-model="amount" placeholder="monto a transferir" />
        </label>
        <h3>coin(s) a</h3>
        <label>
            <input type="text" v-model="email" placeholder="correo de usuario" />
        </label>
        
        <button class="button" @click="handleTransfer"> Transferir </button>
    </div>
</template>
<style scoped>
.transfer-form {
    padding-top: 20px;
    display: flex;
    gap: 20px;
    align-items: center;
}
.button {
    padding: 6px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 2px;
    cursor: pointer;
}
@media (max-width: 768px) {
    .transfer-form {
        flex-direction: column;
    }
}
</style>