<template>
  <div>
    <h1>Register</h1>

    <input type="text" name="username" placeholder="Username" v-model="username"/>
    <br>
    <input type="email" name="email" placeholder="Email" v-model="email"/>
    <br>
    <input type="password" name="password" placeholder="Password" v-model="password"/>
    <br>
    <div class="error" v-html="error"/>
    <button @click='createUser()'>Register</button>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
export default {
  name: "Register",
  data() {
    return {
      username: '',
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async createUser() {
      try {
        const payload = {
          username: this.username,
          email: this.email,
          password: this.password
        }
        const response = await UserService.createUser(payload);
        if (response.data === 'username already taken') {
          this.error = response.data;
        }
      } catch (error) {
        this.error = error.response.data.error;
      }
    },

    clearForm() {
      this.username = "";
      this.email = "";
      this.password = "";
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>