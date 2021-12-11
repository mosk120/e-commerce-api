<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-space/>
        <q-tabs>
          <!--        <q-toolbar-title>-->
          <!--          Sushi App-->
          <!--        </q-toolbar-title>-->
          <q-route-tab
            label="Home"
            to="/"
            exact
          />
          <q-route-tab
            label="Sign up"
            to="/register"
            exact
            v-if="!isAuthenticated"
          />
          <q-route-tab
            label="Login"
            to="/login"
            exact
            v-if="!isAuthenticated"
          />
          <q-route-tab
            label="Logout"
            exact
            @click="logout"
            v-else
          />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>

import {defineComponent, ref} from 'vue'
import {mapGetters} from 'vuex'

export default defineComponent({
  name: 'MainLayout',

  components: {},
  methods: {
    async logout() {
      await this.$store.dispatch('auth/signOut');
      await this.$router.push({path: '/'});
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  },
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
