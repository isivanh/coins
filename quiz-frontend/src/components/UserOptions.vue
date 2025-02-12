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
    <div class="container">
        <div class="row">
            <div class="col s12">
                <nav class="transparent z-depth-0">
                    <div class="nav-wrapper">
                        <div class="left valign-wrapper">
                            <i class="material-icons large black-text text-darken-4">account_circle</i>
                            <div class="user-info">
                                <h4 class="no-margin black-text text-darken-3">{{ firstName + ' ' + lastName }}</h4>
                                <h6 class="no-margin grey-text">{{ email }}</h6>
                            </div>
                        </div>
                        <div class="right">
                            <a class="waves-effect waves-teal red lighten-2 btn-large" @click="logout">
                                <i class="material-icons left">exit_to_app</i>
                                Logout
                            </a>
                        </div>
                    </div>
                </nav>          
            </div>
            <div class="col s12 center-align divider" style="margin-top: 20px;"></div>
            <div class="col s12 center-align" style="margin-top: 20px; margin-bottom: 20px;">
                <h3>You have <strong class="teal-text">{{ coins }}</strong> coins</h3>
            </div>
        </div>
    </div>
</template>
<style scoped>

.material-icons.large {
    font-size: 5rem;
    margin-right: 8px;
}
a.waves-effect.waves-teal.red.lighten-2.btn-large {
    display: flex;
    align-items: center;
}
div.nav-wrapper
{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
div.left.valign-wrapper{
    display: flex;
    align-items: center;
}
h4.no-margin {
    margin: 0;
}
h6.no-margin {
    margin: 0;
}
</style>