<script setup>
import LoginForm from '@/components/LoginForm.vue';
</script>
<template>
    <div class="container">
        <div class="row valign-wrapper" style="min-height: 100vh;">
            <div class="col s12 m10 offset-m1 l10 offset-l1">
                <h3 class="center-align">Welcome again!</h3>
                <h5 class="center-align">Sign in with your account</h5>
                <LoginForm/>
                <div class="center-align">
                    No account?
                    <router-link to="/signup"> create one </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
</style>