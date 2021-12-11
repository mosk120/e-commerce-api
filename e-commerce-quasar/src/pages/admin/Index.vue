<template>
  <h1>Admin Page</h1>
  <h3>Hello {{getMe.username}}</h3>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Index",
  computed: {
    ...mapGetters('auth', ['getMe'])
  }
}
</script>

<style scoped>

</style>
