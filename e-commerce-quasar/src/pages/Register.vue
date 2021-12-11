<template>
  <div>
    <q-layout view="lHh lpr lFf" container style="height: 400px">
      <div class="q-pa-md full-width row inline no-wrap justify-center items-start content-start shadow-2 rounded-borders">

        <q-form class="custom-form" action="https://some-url.com" method="post" @submit="createUser()" @reset="clearForm()">
          <q-toolbar class="bg-white shadow-1">
            <q-toolbar-title class="text-center">Register</q-toolbar-title>
          </q-toolbar>
          <q-input
            class="col"
            v-model="username"
            filled type="text"
            label="Your name *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            class="col"
            v-model="email"
            filled type="email"
            label="Your email *"
            lazy-rules
            :rules="[
        val => val !== null && val !== '' || 'Please type your email',
        ]"
          />
          <q-input
            class="col"
            v-model="password"
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
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" onclick="clearForm()" type="reset" color="primary" flat class="q-ml-sm"/>
          </div>
        </q-form>

      </div>
    </q-layout>
  </div>

</template>

<script>
import UserService from 'src/services/UserService'
import {useQuasar} from 'quasar'
import {ref} from 'vue'

const $q = useQuasar()

export default {
  setup() {
    const $q = useQuasar()

    const username = ref(null)
    const email = ref(null)
    const password = ref(null)
    const error = ref(null)

    return {
      username,
      email,
      password,
      error,
      async createUser() {
        try {
          const payload = {
            username: this.username,
            email: this.email,
            password: this.password
          }
          const response = await UserService.createUser(payload);
          if (response.status === 201 || response.statusText === 'Created') {
            this.clearForm();
            $q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'User created'
            })
          } else {
            $q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: response.data,
            })
            this.error = null;
          }
        } catch (error) {
          this.error = error.response.data.error;
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: error.response.data.error,
          })
        }
      },
      clearForm() {
        this.username = "";
        this.email = "";
        this.password = "";
      }
    }
  }
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
