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
        name: 'deviceType',
        align: 'center',
        label: 'Device Type',
        field: 'deviceType',
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
    <template #header-cell-status="props">
      <q-th :props="props">
        <div style="min-width: 150px">
          {{ props.col.label }}
        </div>
      </q-th>
    </template>
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
        <q-td key="deviceType" :props="props">
          {{ props.row.deviceType }}
        </q-td>

        <!-- status -->
        <q-td>
          <div
            class="row justify-center items-center q-gutter-x-sm"
            style="min-width: 150px"
          >
            <span>
              {{ props.row.status }}
            </span>
            <span
              v-if="
                props.row.status !== 'Connect' &&
                props.row.status !== 'Disconnect' &&
                props.row.status !== 'Close'
              "
              class="row items-end"
            >
              <!-- <Spin /> -->
              <!-- <q-spinner color="teal" size="1rem" :thickness="6" /> -->
              <svg class="loader" viewBox="0 0 24 24">
                <circle class="loader__value" cx="12" cy="12" r="10" />
                <circle class="loader__value" cx="12" cy="12" r="10" />
                <circle class="loader__value" cx="12" cy="12" r="10" />
                <circle class="loader__value" cx="12" cy="12" r="10" />
                <circle class="loader__value" cx="12" cy="12" r="10" />
                <circle class="loader__value" cx="12" cy="12" r="10" />
              </svg>
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
        rt.id = Number(rt.id)
        window.FN.onRequest({ command: 'edit', value: JSON.stringify(rt) })
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

<style lang="scss">
.tooltip {
  background: rgba(0, 0, 0, 0.5);
}
$loader-colors: dodgerblue, mediumspringgreen, crimson, peachpuff, chocolate,
  pink;
$loader-dash: 63;
$loader-duration: length($loader-colors) * 1s;
$loader-duration-alt: $loader-duration / length($loader-colors);
$loader-keyframe: 1 / (length($loader-colors) * 2) * 100;

.loader {
  animation: loader-turn $loader-duration-alt linear infinite;
  padding: 0rem;
  max-width: 20px;
  width: 100%;

  @keyframes loader-turn {
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(720deg);
    }
  }
}

.loader__value {
  animation: loader-stroke $loader-duration linear infinite;
  fill: none;
  stroke-dasharray: $loader-dash;
  stroke-dashoffset: $loader-dash;
  stroke-linecap: round;
  stroke-width: 4;

  @for $i from 1 through length($loader-colors) {
    &:nth-child(#{$i}) {
      stroke: nth($loader-colors, $i);

      @if $i > 1 {
        animation-delay: ($i - 1) * $loader-duration-alt;
      }
    }
  }

  @keyframes loader-stroke {
    #{$loader-keyframe * 1%} {
      stroke-dashoffset: 0;
    }
    #{$loader-keyframe * 2%},
    100% {
      stroke-dashoffset: $loader-dash;
    }
  }
}
</style>
