<script setup>
const props = defineProps(['firstName', 'lastName', 'email', 'coins']);
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
};

</script>
<template>
    <div class="user">
        <div class="user-info">
            <h1>{{ firstName + ' ' + lastName }}</h1>
            <h3>{{ email }}</h3>
        </div>
        <div class="user-options">
            <a @click="logout" >Logout</a>
        </div>
    </div>
    <div class="user-coins">
        <h2> Cuentas con <strong> {{ coins }} </strong>  Coinks</h2>
    </div>
</template>
<style scoped>
.user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}
.user-info {
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-items: baseline;
}
.user-options {
    display: flex;
    flex-direction: row;
    gap: 10px;
    min-width: 200px;
    justify-content: flex-end;
}

@media (max-width: 768px) {
    .user-options {
        min-width: auto;
        justify-content: flex-start;
    }
}

h1 {
    color: #cccccc;
}
.user-coins {
    padding-top: 20px;
    display: flex;
    justify-content: center;
}
strong {
    color: hsla(160, 100%, 37%, 1);
    font-size:xx-large;
}
</style>