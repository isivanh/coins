<script setup>
import * as yup from "yup";
import { ref } from 'vue';
import { toTypedSchema } from '@vee-validate/yup';
import { useForm } from "vee-validate";
import { useRouter } from 'vue-router';
import api from "@/common/api-service";

const router = useRouter();
const errorLog = ref('');
const { errors, defineField } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
      firstName: yup.string().required(),
      lastName: yup.string().required(),
    }),
  ),
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const [firstName, firstNameAttrs] = defineField('firstName');
const [lastName, lastNameAttrs] = defineField('lastName');

const onSubmit = async() => {
  const result = await api.AuthService.register(email.value, password.value, firstName.value, lastName.value);
  if (result.success) {
    console.log('Usuario autenticado:', result.data);
    router.push('/');
  } else {
    errorLog.value = result.error;
  }
};
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col s12 m10 offset-m1 l10 offset-l1" style="margin-top: 10px;">
        <form @submit.prevent="onSubmit" class="form-container">
          <div class="input-field">
            <i class="material-icons prefix tiny">email</i>
            <input type="email" v-model="email" v-bind="emailAttrs" id="email" name="email" placeholder="Email" required>
            <span class="helper-text red-text">{{ errors.email }}</span>
          </div>
          <div class="input-field">
            <i class="material-icons prefix">lock</i>
            <input type="password" v-model="password" v-bind="passwordAttrs" id="password" name="password" placeholder="Password" required>
            <span class="helper-text red-text">{{ errors.password}}</span>
          </div>
          <div class="input-field">
            <i class="material-icons prefix">title</i>
            <input type="text" v-model="firstName" v-bind="firstNameAttrs" id="firstName" name="firstName"  placeholder="First Name" required>
            <span class="helper-text red-text">{{ errors.firstName}}</span>
          </div>
          <div class="input-field">
            <i class="material-icons prefix">title</i>
            <input type="text" v-model="lastName" v-bind="lastNameAttrs" id="lastName" name="lastName" placeholder="Last Name" required>
            <span class="helper-text red-text">{{ errors.lastName}}</span>
          </div>
          <div class="center-align">
            <button class="waves-effect waves-light btn" :disabled="Object.keys(errors).length > 0"type="submit">Create acount</button>
          </div>
            
        </form>
        <p>{{ errorLog }}</p>
      </div>
    </div>

  </div>
  
</template>
<style>
</style>
