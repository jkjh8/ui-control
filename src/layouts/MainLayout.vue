<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-10">
      <div
        class="row no-wrap justify-between items-start"
        style="padding: 2% 5% 0 5%"
      >
        <div style="width: 100%">
          <q-img :src="url" style="height: 50px; max-width: 200px" />
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
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const { state, commit } = useStore()

    const url = ref(
      process.env.DEV
        ? 'soundcraft-by-harman-logo.png'
        : `${process.resourcesPath}/soundcraft-by-harman-logo.png`
    )
    const port = computed({
      get() {
        return state.setup.server_port
      },
      set(v) {
        return commit('setup/updateServerPort', v)
      }
    })
    const serverStatus = computed(() => state.setup.server_status)

    function connectServer() {
      commit('setup/updateServerStatus', !serverStatus.value)
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
