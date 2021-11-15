
<template>
  <div class="hello">
    <Header />
    <div class="container mrgnbtm">
      <div class="row">
        <div class="col-md-8">
          <CreateUser @createUser="userCreate($event)" />
        </div>
<!--        <div class="col-md-4">-->
<!--          <DisplayBoard :numberOfUsers="numberOfUsers" @getAllUsers="getAllUsers()" />-->
<!--        </div>-->
      </div>
    </div>
<!--    <div class="row mrgnbtm">-->
<!--      <Users v-if="users.length > 0" :users="users" />-->
<!--    </div>-->
  </div>
</template>

<script>
import CreateUser from './CreateUser.vue'
import UserService from '@/services/UserService'
export default {
  name: 'Dashboard',
  components: {
    CreateUser
  },
  data() {

  },
  methods: {
    async userCreate(data) {
      const response = await UserService.createUser(data)
        console.log(response, 'response');
    }
  },
  mounted () {
  }
}
</script>