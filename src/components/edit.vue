<template>
  <q-dialog ref="dialogRef" persistent @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-form @submit="onOKClick(device)">
        <q-card-section>
          <div class="row justify-between items-center">
            <div class="row items-center q-gutter-md">
              <q-avatar size="2.5rem">
                <q-icon name="svguse:icons.svg#ethernet" size="1.5rem" />
              </q-avatar>
              <div>
                <div class="name" style="font-size: 1rem">장치 수정</div>
                <div class="caption" style="font-size: 0.5rem">
                  장치를 설정을 수정합니다.
                </div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="q-mx-md q-mt-md">
            <div>
              <q-input
                v-model="device.id"
                dense
                filled
                type="number"
                label="ID"
                :rules="rules.required"
                lazy-rules
              />
              <q-input
                v-model="device.name"
                dense
                filled
                label="이름"
                :rules="rules.required"
                lazy-rules
              />

              <q-input
                v-model="device.ipaddress"
                dense
                filled
                label="IP Address"
                :rules="rules.ipaddress"
                lazy-rules
              />

              <q-select
                v-model="device.deviceType"
                dense
                filled
                label="Device Type"
                :options="['UI12', 'UI16', 'UI24']"
              />
            </div>
          </div>
        </q-card-section>

        <!-- buttons example -->
        <q-card-actions align="right">
          <div class="q-mx-sm q-gutter-sm">
            <q-btn
              label="취소"
              style="width: 5rem"
              unelevated
              @click="onCancelClick"
            />
            <q-btn
              label="확인"
              color="grey"
              unelevated
              style="width: 5rem"
              type="submit"
            />
          </div>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { useQuasar, useDialogPluginComponent } from 'quasar'
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  props: {
    item: Object
  },

  emits: [...useDialogPluginComponent.emits],

  setup(props) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent()

    const { state } = useStore()
    const $q = useQuasar()

    const devices = computed(() => state.devices.devices)

    const device = ref({
      id: 1,
      name: '',
      ipaddress: '',
      deviceType: 'UI24',
      status: 'Disconnect',
      connected: false
    })

    onMounted(async () => {
      console.log(props.item)
      device.value = { ...props.item }
    })

    async function onOKClick(args) {
      let exist = await window.FN.checkId(args.id)
      if (exist && exist._id !== args._id) {
        return $q.notify({
          message: 'ID has already been used',
          caption: 'Please check the id again',
          position: 'top',
          color: 'negative',
          textColor: 'white'
        })
      }
      exist = await window.FN.checkIp(args.ipaddress)
      if (exist && exist._id !== args._id) {
        return $q.notify({
          message: 'IP Address han already been used',
          caption: 'Please check the Ip Address again',
          position: 'top',
          color: 'negative',
          textColor: 'white'
        })
      }
      onDialogOK(args)
    }

    return {
      rules: {
        required: [(value) => !!value || '필수 항목 입니다'],
        NumberInt: [
          (value) => !!value || '필수 항목 입니다',
          (value) => value > 0 || '0 이상의 숫자를 입력하세요.'
        ],
        ipaddress: [
          (value) => !!value || 'IP Address를 입력하세요',
          (value) =>
            /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/gm.test(
              value
            ) || 'IPv4 형식이 아닙니다'
        ]
      },
      dialogRef,
      device,
      onDialogHide,
      onOKClick,
      onCancelClick: onDialogCancel
    }
  }
}
</script>

<style scoped>
.error {
  background: red;
  color: #fff;
  border-radius: 1rem;
  width: 100%;
  padding: 0.5rem 0.5rem;
  text-align: center;
}
</style>
