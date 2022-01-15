<template>
  <div class="q-pa-md">
    <q-table
      title="Sushi Sets"
      :rows="rows"
      :columns="columns"
      row-key="id"
      @row-click="onRowClicked"
      selection="multiple"
      v-model:selected="selected"
      :filter="filter"
      grid
      hide-header
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card :class="props.selected ? 'bg-grey-2' : ''">
            <q-card-section>
              <q-checkbox dense v-model="props.selected" :label="props.row.name"/>
            </q-card-section>
              <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                <q-item-section>
                <q-img :src="require('../../public/images/' + col.value + '.jpg')"
                       spinner-color="white"
                       style="width: 100%;"
                       img-class="my-custom-image"
                       class="rounded-borders"
                       title={{col.value}}
                />
                </q-item-section>
              </q-item>
            <q-card-section class="">
              <div>Composition:</div>
              <strong><br>{{ props.row.description }}</strong>
            </q-card-section>
          </q-card>
        </div>
      </template>

    </q-table>
  </div>
</template>

<script>
import {ref} from 'vue'
import ProductsService from "src/services/ProductsService";

const columns = [
  // {
  //   name: 'name',
  //   required: true,
  //   //   // label: 'Dessert (100g serving)',
  //   align: 'left',
  //   field: row => row.name,
  //   format: val => `${val}`,
  //   sortable: true
  // },
  // { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  {name: 'img', field: row => row.img},
  // { name: 'description', label: 'Description', field: 'description' },
  // { name: 'protein', label: 'Protein (g)', field: 'protein' },
  // { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

const rows = [
  {
    id: 1,
    name: 'Set Yakuza',
    description: 'Rice, Shrimps, Souse Spicy, Cucumber, Nori',
    price: 34.0,
    img: '0a3b9386ba532548e8f9178600f880bd',
  },
  {
    id: 2,
    name: 'Set Classic',
    description: 'Rice, Shrimps, Souse Spicy, Cucumber, Nori',
    price: 25.0,
    img: ('0aa28a3293f32df8021be926b8e2d586'),
  },
  {
    id: 3,
    name: 'Set Warm',
    description: 'Rice, Shrimps, Souse Spicy, Cucumber, Nori',
    price: 36.0,
    img: ('0b3cc496de2b6e36fa0c52ab16f71c74'),
  },
  {
    id: 4,
    name: 'Set Diamond',
    description: 'Rice, Shrimps, Souse Spicy, Cucumber, Nori',
    price: 40.0,
    img: ('0e5b1c9d0e8ce30abbcc0eed770c937b'),
  },
  {
    id: 5,
    name: 'Set Yummy',
    description: 'Rice, Shrimps, Souse Spicy, Cucumber, Nori',
    price: 42.0,
    img: ('00e26d1005996b31696d33b91cdca724'),
  },
]

export default {
  setup() {
    return {
      filter: ref(''),
      selected: ref([]),
      columns,
      rows
    }
  },

  methods: {
    onRowClicked(e) {
      console.log(e);
    }
  },
  async mounted() {
    const products = await ProductsService.getAllProducts();
    console.log(products)
  }
}
</script>

<style lang="sass">
//.custom-image
//  width: 100%

.grid-style-transition
  transition: transform .28s, background-color .28s
</style>
