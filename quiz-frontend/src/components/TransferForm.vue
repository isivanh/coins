<script setup>
import { ref, watch } from 'vue';
import api from "@/common/api-service";

const props = defineProps({
    onTransfer: {
        type: Function,
        required: true
    }
});

const email = ref('');
const amount = ref(0);
const suggestions = ref([]);
const showSuggestions = ref(false);

const handleTransfer = () => {
    props.onTransfer({ email: email.value, amount: amount.value });
    email.value = '';
    amount.value = 0;
};
const loadSuggestions = async (query) => {
    const result = await api.UserService.getUsers();
    if (result.success) {
        const filteredUsers = result.data.users.filter(user => 
            user.email.toLowerCase().includes(query.toLowerCase()) ||
            user.firstName.toLowerCase().includes(query.toLowerCase())
        );
        suggestions.value = filteredUsers.slice(0, 5);
        showSuggestions.value = true;
    } else {
        suggestions.value = [];
    }
};
const selectEmail = (selectedEmail) => {
    email.value = selectedEmail;
    showSuggestions.value = false;
};
watch(email, (newEmail) => {
    if (newEmail) {
        loadSuggestions(newEmail);
    } else {
        suggestions.value = [];
    }
});
</script>
<template>
    <div class="container">
        <div class="row">
            <div class="divider"></div>
            <div class="col s12 transfer-form center-align">
                <h6>Send</h6>
                <label>
                    <input type="number" v-model="amount" placeholder="Coin amount" />
                </label>
                <h6>to</h6>
                <label>
                    <input type="text" v-model="email" placeholder="Email or Name" />
                    <ul v-if="showSuggestions && suggestions.length" class="suggestions-list">
                        <li 
                            v-for="suggestion in suggestions" 
                            :key="suggestion.email"
                            @click="selectEmail(suggestion.email)"
                            class="suggestion-item"
                        >
                            {{ suggestion.email }} - {{ suggestion.firstName }}
                        </li>
                    </ul>
                </label>
                <button class="waves-effect waves-light btn" @click="handleTransfer"> Transferir </button>
            </div>
        </div>

    </div>
</template>
<style scoped>
.transfer-form {
    padding-top: 20px;
    display: flex;
    gap: 20px;
    flex-direction: row;
    justify-content: center;
}
@media screen and (max-width: 600px) {
    .transfer-form {
        flex-direction: column;
    }
}
button.waves-effect.waves-light.btn{
    align-items: center;
}
.suggestions-list {
    list-style: none;
    padding: 0;
    margin: 0;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    position: absolute;
    width: flex;
    z-index: 1000;
}

.suggestion-item {
    padding: 8px 12px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #4CAF50;
}

.suggestion-item::before {
    content: '👤';
}

.suggestion-item:hover {
    background-color: #f5f5f5;
}

.suggestion-item:last-child {
    border-bottom: none;
}
</style>