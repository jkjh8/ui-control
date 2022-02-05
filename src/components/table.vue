<template>
  <q-table
    flat
    :rows="list"
    :columns="[
      {
        name: 'id',
        align: 'center',
        label: 'ID',
        field: 'id',
        sortable: true
      },
      {
        name: 'name',
        align: 'center',
        label: 'Name',
        field: 'name',
        sortable: true
      },
      {
        name: 'ipaddress',
        align: 'center',
        label: 'IP address',
        field: 'ipaddress',
        sortable: true
      },
      {
        name: 'status',
        align: 'center',
        label: 'Status',
        field: 'status',
        sortable: true
      },
      {
        name: 'actions',
        align: 'center',
        label: 'Actions'
      }
    ]"
    row-key="_id"
    :pagination="{ rowPerPage: 20 }"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="id" :props="props">
          <q-avatar size="1.6rem">
            {{ props.row.id }}
            <q-badge
              v-if="props.row.status !== 'Connect'"
              rounded
              color="red"
              floating
            />
          </q-avatar>
        </q-td>
        <q-td key="name" :props="props">
          {{ props.row.name }}
        </q-td>
        <q-td key="ipaddress" :props="props">
          {{ props.row.ipaddress }}
        </q-td>
        <q-td>
          <div class="text-center">
            {{ props.row.status }}
            <span
              v-if="
                props.row.status !== 'Connect' &&
                props.row.status !== 'Disconnect' &&
                props.row.status !== 'Close'
              "
            >
              <q-spinner color="teal" size="1rem" :thickness="6" />
            </span>
          </div>
        </q-td>
        <q-td key="actions" :props="props">
          <q-btn
            round
            flat
            size="sm"
            icon="svguse:icons.svg#connect"
            :color="props.row.connedted ? 'green' : 'red-10'"
            @click="connect(props.row)"
          >
            <q-tooltip class="tooltip">Connect</q-tooltip>
          </q-btn>
          <q-btn
            round
            flat
            icon="svguse:icons.svg#pencil"
            size="sm"
            color="teal"
            @click="editDevice(props.row)"
          >
            <q-tooltip class="tooltip"> Edit </q-tooltip>
          </q-btn>
          <q-btn
            round
            flat
            icon="svguse:icons.svg#trash"
            size="sm"
            color="red-10"
            @click="deleteDevice(props.row)"
          >
            <q-tooltip class="tooltip">Delete</q-tooltip>
          </q-btn>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

import edit from './edit.vue'

export default {
  setup() {
    const { state } = useStore()
    const $q = useQuasar()

    const list = computed(() => state.devices.devices)

    function connect(device) {
      if (!device.connected) {
        window.FN.onRequest({
          command: 'connect',
          ipaddress: device.ipaddress,
          status: device.status
        })
      }
    }

    function editDevice(item) {
      $q.dialog({
        component: edit,
        componentProps: { item: item }
      }).onOk((rt) => {
        window.FN.onRequest({ command: 'add', value: JSON.stringify(rt) })
      })
    }

    function deleteDevice(device) {
      $q.dialog({
        title: 'Delete',
        message: `Are you sure you want to delete ${device.ipaddress}`,
        icon: 'trash',
        cancel: true
      }).onOk(() => {
        window.FN.onRequest({ command: 'delete', value: device._id })
      })
    }

    onMounted(() => {
      window.FN.onRequest({ command: 'refresh' })
    })
    return {
      list,
      connect,
      editDevice,
      deleteDevice
    }
  }
}
</script>

<style>
.tooltip {
  background: rgba(0, 0, 0, 0.5);
}
</style>
