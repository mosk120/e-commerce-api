<template>
  <div>
    <q-layout view="lHh lpr lFf" container style="height: 400px">
      <div class="q-pa-md full-width row inline no-wrap justify-center items-start content-start shadow-2 rounded-borders">

        <q-form class="custom-form" action="https://some-url.com" method="post" @submit="submitForm()" @reset="clearForm()">
          <q-toolbar class="bg-white shadow-2 rounded-borders">
            <q-toolbar-title class="text-center">Login</q-toolbar-title>
          </q-toolbar>
          <q-input
            class="col"
            v-model="login.username"
            filled type="text"
            hint="Username"
            label="Your name *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            class="col"
            v-model="login.email"
            filled type="email"
            hint="Email"
            label="Your email *"
            lazy-rules
            :rules="[
        val => val !== null && val !== '' || 'Please type your email',
        ]"
          />
          <q-input
            class="col"
            v-model="login.password"
            filled :type="isPwd ? 'text' : 'password'"
            hint="Password"
            label="Your password *"
            :rules="[
        val => val !== null && val !== '' || 'Please type your password',
        ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="error" v-html="error"/>
          <!--      <q-btn @click='createUser()' color="white" text-color="black" label="Register" />-->
          <div class="q-pa-md row justify-center">
            <q-btn label="Login" type="submit" color="primary"/>
<!--            <q-btn label="Reset" onclick="clearForm()" type="reset" color="primary" flat class="q-ml-sm"/>-->
          </div>
        </q-form>

      </div>
    </q-layout>
  </div>

</template>

<script>
import UserService from 'src/services/UserService'
import {mapActions} from 'vuex'
import {useQuasar} from 'quasar'
import {ref} from 'vue'

// const $q = useQuasar()
let $q;

export default {
  name: 'Login',
  data() {
    return {
      login: {
        username: 'mosk120',
        email: 'mosk1488@gmail.com',
        password: '1488Oblivion',
      }
    }
  },
  methods: {
    ...mapActions('auth', ['doLogin']),
    async submitForm() {
      try {
        await this.doLogin(this.login);
        await this.$router.push({path: '/'});
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted () {
    $q = useQuasar()
  }
  // setup() {
  //   const $q = useQuasar()
  //
  //   const username = ref(null)
  //   const email = ref(null)
  //   const password = ref(null)
  //   const error = ref(null)
  // }
  //
  //   return {
  //     username,
  //     email,
  //     password,
  //     error,
  //       ...mapActions('auth', ['doLogin']),
  //       async login() {
  //       console.log('test')
  //         await this.doLogin('test');
          // try {
          //   const payload = {
          //     username: this.username,
          //     email: this.email,
          //     password: this.password
          //   }
          //
          //   // const response = await UserService.login(payload);
          //   // console.log('test')
          //   await this.doLogin(payload);
          //   // await this.$store.dispatch('setToken', response.data.token);
          //   // await this.$store.dispatch('setUser', response.data.user);
          // } catch (error) {
          //   this.error = error.response.data.error
          // }
      // },
      // async login() {
      //   try {
      //     const payload = {
      //       username: this.username,
      //       email: this.email,
      //       password: this.password
      //     }
      //
      //     // const response = await UserService.login(payload);
      //     // console.log('test')
      //     await this.doLogin(payload);
      //     // await this.$store.dispatch('setToken', response.data.token);
      //     // await this.$store.dispatch('setUser', response.data.user);
      //   } catch (error) {
      //     this.error = error.response.data.error
      //   }
      //   try {
      //     const payload = {
      //       username: this.username,
      //       email: this.email,
      //       password: this.password
      //     }
      //     const response = await UserService.createUser(payload);
      //     if (response.status === 201 || response.statusText === 'Created') {
      //       this.clearForm();
      //       $q.notify({
      //         color: 'green-4',
      //         textColor: 'white',
      //         icon: 'cloud_done',
      //         message: 'User created'
      //       })
      //     } else {
      //       $q.notify({
      //         color: 'red-5',
      //         textColor: 'white',
      //         icon: 'warning',
      //         message: response.data,
      //       })
      //       this.error = null;
      //     }
      //   } catch (error) {
      //     this.error = error.response.data.error;
      //     $q.notify({
      //       color: 'red-5',
      //       textColor: 'white',
      //       icon: 'warning',
      //       message: error.response.data.error,
      //     })
      //   }
  //     clearForm() {
  //       this.username = "";
  //       this.email = "";
  //       this.password = "";
  //     }
  //   }
  // }
}
</script>

<style scoped>
.error {
  color: red;
}

.col {
  width: 700px;
}

.custom-form {
  border: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
