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
                <div class="name" style="font-size: 1rem">장치 추가</div>
                <div class="caption" style="font-size: 0.5rem">
                  새로운 장치를 추가 합니다.
                </div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="q-mx-md q-mt-md">
            <div>
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
      name: '',
      ipaddress: '',
      connected: false
    })

    onMounted(async () => {
      if (props.item) {
        device.value = { ...device.value, ...props.item }
      }
    })

    async function onOKClick(args) {
      for (let i = 0; i < devices.value.length; i++) {
        if (devices.value[i].ipaddress == args.ipaddress) {
          return $q.notify({
            icon: 'svguse:icons.svg#exclamation',
            message: '아이피가 중복되었습니다',
            caption: '아이피를 확인해 주세요.',
            positon: 'top',
            color: 'nagative',
            textColor: 'white',
            actions: [
              {
                icon: 'close',
                round: true,
                size: 'sm',
                color: 'white',
                handler: () => {}
              }
            ]
          })
        }
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
