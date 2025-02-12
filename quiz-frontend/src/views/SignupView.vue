<script setup>
import SignupForm from '@/components/SignupForm.vue';
</script>

<template>
    <div class="container">
        <div class="row valign-wrapper" style="min-height: 80vh;">
            <div class="col s12 m10 offset-m1 l10 offset-l1">
                <h3 class="center-align">New account</h3>
                <SignupForm/>
                <div class="center-align">
                    Already have an account?
                    <router-link to="/login">Sign in</router-link>
                </div>
            </div>
        </div>
    </div>
    
</template>
<style scoped>
</style>