<template>
  <q-page style="padding: 2% 5% 0 5%">
    <q-card class="shadow-10">
      <q-card-section>
        <div class="row no-wrap justify-between">
          <div class="q-gutter-x-sm row items-center">
            <div>
              <q-icon name="svguse:icons.svg#ethernet" size="md" />
            </div>
            <div>
              <div class="listname">Client List</div>
              <div class="caption">{{ count }} Mixers registered</div>
            </div>
          </div>
          <div class="q-gutter-x-sm">
            <q-btn
              flat
              round
              size="sm"
              icon="svguse:icons.svg#code"
              @click="test"
            >
              <q-tooltip class="tooltip">Test Codes</q-tooltip>
            </q-btn>
            <q-btn
              flat
              round
              size="sm"
              icon="svguse:icons.svg#refresh"
              @click="refresh"
            >
              <q-tooltip class="tooltip">Refresh List</q-tooltip>
            </q-btn>
            <q-btn
              flat
              round
              size="sm"
              icon="svguse:icons.svg#plus-circle"
              @click="add"
            >
              <q-tooltip class="tooltip">Add Device</q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div>
          <Table />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

import Table from '../components/table.vue'
import addDevice from '../components/add'
import testDevice from '../components/test'
import help from '../components/help.vue'

export default defineComponent({
  name: 'PageIndex',
  components: { Table },
  setup() {
    const { commit, getters } = useStore()
    const $q = useQuasar()

    const count = computed(() => getters['devices/devicesCount'])

    function add() {
      $q.dialog({
        component: addDevice
      }).onOk((rt) => {
        rt.id = Number(rt.id)
        console.log(rt)
        window.FN.onRequest({
          command: 'add',
          value: JSON.stringify(rt)
        })
      })
    }

    function test() {
      $q.dialog({
        component: testDevice
      })
    }

    function fnHelp() {
      $q.dialog({
        component: help
      })
    }

    function refresh() {
      window.FN.onRequest({ command: 'refresh' })
    }

    onBeforeMount(async () => {
      window.FN.onResponse((args) => {
        console.log('res', args)
        try {
          switch (args.command) {
            case 'list':
              commit('devices/updateDevices', args.value)
              break

            // case 'server':
            //   console.log('server', args)
            //   commit('setup/updateServerStatus', args.status)
            //   if (args.port) {
            //     commit('setup/updateServerPort', args.port)
            //   }
            //   break
            case 'help':
              fnHelp()
              break
            default:
              console.log(args)
              break
          }
        } catch (e) {
          console.error(e)
        }
      })

      // const r = await window.FN.checkServer()
      // await window.FN.onRequest({ command: 'start' })
      // if (r && r.status) {
      //   window.FN.onRequest({ command: 'start_server', port: r.port })
      //   commit('setup/updateServerStatus', r.status)
      //   commit('setup/updateServerPort', r.port)
      // } else {
      //   commit('setup/updateServerStatus', false)
      // }
    })

    return {
      add,
      count,
      test,
      refresh
    }
  }
})
</script>

<style scoped>
.listname {
  font-size: 1rem;
  font-weight: 700;
}
.caption {
  font-size: 0.8rem;
  font-weight: 400;
}
</style>
