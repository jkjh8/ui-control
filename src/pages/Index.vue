<template>
  <q-page class="q-mx-md">
    <q-card class="shadow-10" style="margin: 5% 5% 0 5%">
      <q-card-section>
        <div class="q-mx-md row no-wrap justify-between">
          <div class="q-gutter-x-sm row items-center">
            <div>
              <q-icon name="svguse:icons.svg#ethernet" size="md" />
            </div>
            <div>
              <div class="listname">Client List</div>
              <div class="caption">
                총 {{ count }}대의 믹서가 등록되었습니다.
              </div>
            </div>
          </div>
          <div>
            <q-btn flat round icon="svguse:icons.svg#refresh" @click="refresh">
              <q-tooltip>Refresh List</q-tooltip>
            </q-btn>
            <q-btn flat round icon="svguse:icons.svg#plus-circle" @click="add">
              <q-tooltip>Add Device</q-tooltip>
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
        console.log(rt)
        window.FN.onRequest({
          command: 'add',
          value: JSON.stringify(rt)
        })
      })
    }

    function refresh() {
      window.FN.onRequest({ command: 'refresh' })
    }

    onBeforeMount(() => {
      window.FN.onResponse((args) => {
        console.log(args)
        try {
          switch (args.command) {
            case 'list':
              commit('devices/updateDevices', args.value)
              break

            case 'server':
              commit('setup/updateServerStatus', args.status)
              if (args.port) {
                commit('setup/updateServerPort', args.port)
              }
              break
            default:
              console.log(args)
              break
          }
        } catch (e) {
          console.error(e)
        }
      })
    })

    return {
      add,
      count,
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
