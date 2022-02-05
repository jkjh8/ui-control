<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-10 q-mt-md q-mx-lg">
      <q-toolbar class="row justify-between items-start">
        <q-img :src="url" style="height: 50px; max-width: 200px" />
        <div class="q-gutter-x-md row no-wrap items-start">
          <q-input v-model="port" filled dense type="number"></q-input>
          <q-btn
            style="width: 6rem; height: 2.4rem"
            :color="serverStatus ? 'green-10' : 'red-10'"
            @click="connectServer"
          >
            <div style="font-size: 0.7rem">
              {{ serverStatus ? 'Disconnect' : 'Connect' }}
            </div>
          </q-btn>
        </div>
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
    const url = ref(
      process.env.DEV
        ? 'soundcraft-by-harman-logo.png'
        : `${process.resourcesPath}/soundcraft-by-harman-logo.png`
    )
    const port = ref(9999)
    const serverStatus = ref(false)

    function connectServer() {
      serverStatus.value = !serverStatus.value
      if (serverStatus.value) {
        window.FN.onRequest({ command: 'start_server', port: port.value })
      } else {
        window.FN.onRequest({ command: 'stop_server' })
      }
    }

    return {
      port,
      url,
      serverStatus,
      connectServer
    }
  }
})
</script>
