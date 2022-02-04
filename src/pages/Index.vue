<template>
  <q-page class="q-mx-md">
    <q-card class="shadow-10" style="margin: 2% 5% 0 5%">
      <q-card-section>
        <div class="q-mx-md row justify-between">
          <div class="q-gutter-x-sm row items-center">
            <div>
              <q-icon name="svguse:icons.svg#ethernet" size="md" />
            </div>
            <div>
              <div class="listname">Client List</div>
              <div class="caption">총 대의 믹서가 등록되었습니다.</div>
            </div>
          </div>
          <div>
            <q-btn flat round icon="svguse:icons.svg#plus-circle" @click="add"
              ><q-tooltip>Add Device</q-tooltip></q-btn
            >
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
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import Table from '../components/table.vue'
import addDevice from '../components/add'

export default defineComponent({
  name: 'PageIndex',
  components: { Table },
  setup() {
    const $q = useQuasar()

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
    return {
      add
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
