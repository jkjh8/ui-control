<template>
  <q-table
    flat
    :rows="list"
    :columns="[
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
        <q-td key="name" :props="props">
          {{ props.row.name }}
        </q-td>
        <q-td key="ipaddress" :props="props">
          {{ props.row.ipaddress }}
        </q-td>
        <q-td key="actions" :props="props">
          <q-btn
            round
            flat
            :icon="
              props.row.connected
                ? 'svguse:icons.svg#check-circle'
                : 'svguse:icons.svg#ban'
            "
            :color="props.row.connedted ? 'green' : 'red-10'"
          >
            <q-tooltip>Connect</q-tooltip>
          </q-btn>
          <q-btn round flat icon="svguse:icons.svg#trash" color="red-10">
            <q-tooltip>Delete</q-tooltip>
          </q-btn>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const list = ref([])
    return {
      list
    }
  }
}
</script>
