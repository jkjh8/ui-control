<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-10">
      <div
        class="row no-wrap justify-between items-start"
        style="padding: 2% 5% 0 5%"
      >
        <div style="width: 100%">
          <q-img
            src="soundcraft-by-harman-logo.png"
            style="height: 50px; max-width: 200px"
          />
          <q-spinner-radio v-if="serverStatus" color="cyan" />
        </div>

        <div class="q-gutter-x-md row no-wrap items-start">
          <q-input
            v-model="port"
            filled
            dense
            type="number"
            label="Server Port"
            :disable="serverStatus"
          ></q-input>
          <q-btn
            v-model="serverStatus"
            style="width: 5rem; height: 2.4rem"
            :color="serverStatus ? 'green-10' : 'red-10'"
            @click="connectServer"
          >
            <div style="font-size: 0.6rem">
              {{ serverStatus ? 'Disconnect' : 'Connect' }}
            </div>
          </q-btn>
        </div>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onBeforeMount } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  setup() {
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

    onBeforeMount(async () => {
      window.FN.onResponse((args) => {
        console.log('server', args)

        try {
          if (args.command === 'server') {
            port.value = args.port

            serverStatus.value = args.status
          }
        } catch (e) {
          console.error(e)
        }
      })

      window.FN.onRequest({ command: 'start' })
    })

    return {
      port,
      serverStatus,
      connectServer
    }
  }
})
</script>
