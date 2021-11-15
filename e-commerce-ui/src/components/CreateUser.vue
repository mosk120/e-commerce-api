<template>
  <div class="container">
    <div class="row">
      <div class="col-md-7 mrgnbtm">
        <h2>Create User</h2>
        <form>
          <div class="row">
            <div class="form-group col-md-6">
              <label htmlFor="exampleInputEmail1">Username</label>
              <input type="text" class="form-control" v-model="username" name="username" id="username" aria-describedby="emailHelp" placeholder="Username" />
            </div>
            <div class="form-group col-md-6">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input type="email" class="form-control" v-model="email" name="email" id="email" placeholder="Email" />
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-12">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" v-model="password" name="password" id="password" aria-describedby="emailHelp" placeholder="Password" />
            </div>
          </div>
          <button type="button" @click='createUser()' class="btn btn-danger">Create</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CreateUser',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    createUser() {
      console.log(this.username)
      const payload = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      this.$emit('createUser', payload)
      this.clearForm();
    },
    clearForm() {
      this.username = "";
      this.email = "";
      this.password = "";
    }
  }
}
</script>