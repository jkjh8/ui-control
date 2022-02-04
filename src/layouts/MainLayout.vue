<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-10">
      <q-toolbar>
        <q-img
          :src="url"
          class="q-mx-lg q-mt-lg"
          style="height: 80px; max-width: 200px"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const leftDrawerOpen = ref(false)
    const url = ref(
      process.env.DEV
        ? 'soundcraft-by-harman-logo.png'
        : `${process.resourcesPath}/soundcraft-by-harman-logo.png`
    )

    return {
      url
    }
  }
})
</script>
