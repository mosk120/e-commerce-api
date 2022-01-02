<template>
  <div>
    <q-layout view="lHh lpr lFf" container style="height: 400px">
      <div
        class="q-pa-md full-width row inline no-wrap justify-center items-start content-start shadow-2 rounded-borders">

        <q-form class="custom-form">
          <q-toolbar class="bg-white shadow-1 col">
            <q-toolbar-title class="text-center">Menu</q-toolbar-title>
          </q-toolbar>
          <div class="q-pa-md row justify-center custom-form">
            <q-layout column>
            <div class="q-pa-md justify-center"
              v-for="product in products"
              :key="product.title"
            >
              {{product.title}}
              {{product.img}}
              {{product.price}}
            </div>
            </q-layout>
          </div>
        </q-form>

      </div>
    </q-layout>
  </div>

</template>

<script>

export default {
  data() {
    return {
      products: [
        {
          title: 'Poke Bowl Salmon',
          image: 'img1.png',
          price: 10
        },
        {
          title: 'Poke Bowl Salmon',
          image: 'img1.png',
          price: 10
        },
        {
          title: 'Poke Bowl Salmon',
          image: 'img1.png',
          price: 10
        },
        {
          title: 'Poke Bowl Salmon',
          image: 'img1.png',
          price: 10
        },
        {
          title: 'Poke Bowl Salmon',
          image: 'img1.png',
          price: 10
        },
      ]
    }
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
