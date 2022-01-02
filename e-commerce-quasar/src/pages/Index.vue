<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
  </q-page>
  <Products></Products>
</template>

<script>
import { defineComponent } from 'vue';
import Products from 'pages/Products';

export default defineComponent({
  name: 'PageIndex',
  components: {
    Products
  }
})
</script>
