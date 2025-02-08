<script setup>
import * as yup from "yup";
import { toTypedSchema } from '@vee-validate/yup';
import { useForm } from "vee-validate";

const { errors, defineField } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
    }),
  ),
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

const onSubmit = async() => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }

    const data = await response.json();
    alert(`Formulario enviado con éxito: ${data.message}`);
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
};

</script>
<template>
  <div class="login-form">
    <h1 class="green">Login</h1>
    <form @submit.prevent="onSubmit" class="form-container">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="email" v-bind="emailAttrs" id="email" name="email" required>
        <p>{{ errors.email }}</p>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" v-model="password" v-bind="passwordAttrs" id="password" name="password" required>
        <p>{{ errors.password}}</p>
      </div>

      <button type="submit">Login</button>
    </form>
  </div>
</template>
<style>
.form-container {
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
input {
  padding: 5px;
  border: 1px solid #ccc;
}
p {
  color: red;
  font-size: 12px;
}
.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
