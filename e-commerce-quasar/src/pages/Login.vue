<template>
  <div>
    <q-layout view="lHh lpr lFf" container style="height: 400px">
      <div
        class="q-pa-md full-width row inline no-wrap justify-center items-start content-start shadow-2 rounded-borders">

        <q-form class="custom-form" action="https://some-url.com" method="post" @submit="submitForm()">
          <q-toolbar class="bg-white shadow-1 ">
            <q-toolbar-title class="text-center">Login</q-toolbar-title>
          </q-toolbar>
          <q-input
            class="col"
            v-model="login.username"
            filled type="text"
            label="Your name *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            class="col"
            v-model="login.password"
            filled :type="isPwd ? 'text' : 'password'"
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
          <div class="q-pa-md row justify-center">
            <q-btn label="Login" type="submit" color="primary"/>
          </div>
        </q-form>

      </div>
    </q-layout>
  </div>

</template>

<script>
import {mapActions} from 'vuex'
import {useQuasar} from 'quasar'
let $q;

export default {
  name: 'Login',
  data() {
    return {
      login: {
        username: 'mosk120',
        password: '1488Oblivion',
      },
      error: ''
    }
  },
  methods: {
    ...mapActions('auth', ['doLogin']),
    async submitForm() {
      try {
        const response = await this.doLogin(this.login);
        if (response.status === 200 || response.statusText === 'OK') {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Succeed login'
          })
          await this.$routes.push({path: '/'});
        }
      } catch (error) {
        this.error = error.response.data;
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: error.response.data,
        })
      }
    }
  }
  ,
  mounted() {
    $q = useQuasar()
  }
}
</script>

<style scoped>

.col {
  width: 700px;
}

.custom-form {
  border: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
