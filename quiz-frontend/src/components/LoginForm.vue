<script setup>
import { ref } from 'vue';
import * as yup from "yup";
import { toTypedSchema } from '@vee-validate/yup';
import { useForm } from "vee-validate";
import { useRouter } from 'vue-router';
import api from "@/common/api-service";

const router = useRouter();
const errorLog = ref('');
const { errors, defineField } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup.string('').email('Email not valid').required('Email is required'),
      password: yup.string().min(6,'Minimun 6 characters').required('Password is required'),
    }),
  ),
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

const onSubmit = async() => {
    const result = await api.AuthService.login(email.value, password.value);
    if (result.success) {
      router.push('/');
    } else {
      errorLog.value = result.error;
    }
};
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col s12 m10 offset-m1 l10 offset-l1" style="margin-top: 20px;">
        <form @submit.prevent="onSubmit">
          <div class="input-field">
            <i class="material-icons prefix">email</i>
            <input type="email" v-model="email" v-bind="emailAttrs" id="email" name="email" placeholder="Email" required>
            <span class="helper-text red-text">{{ errors.email }}</span>
          </div>
          <div class="input-field">
            <i class="material-icons prefix">lock</i>
            <input type="password" v-model="password" v-bind="passwordAttrs" id="password" name="password" placeholder="Password" required>
            <span class="helper-text red-text">{{ errors.password}}</span>
          </div>
          <div class="center-align">
            <button class="waves-effect waves-light btn" :disabled="Object.keys(errors).length > 0" type="submit">Sign in</button>
          </div>
          
        </form>
      </div>
      <div class="col s12 center-align">
        <p>{{ errorLog }}</p>
      </div>
    </div>
  </div>
  
</template>
<style>
</style>
