<template>
  <q-dialog ref="dialogRef" persistent @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="row justify-between items-center">
          <div class="row items-center q-gutter-md">
            <q-avatar size="2.5rem">
              <q-icon name="svguse:icons.svg#ethernet" size="1.5rem" />
            </q-avatar>
            <div>
              <div class="name" style="font-size: 1rem">테스트</div>
              <div class="caption" style="font-size: 0.5rem">
                장치를 선택하고 테스트 합니다.
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="q-mx-md q-mt-md q-gutter-y-md">
          <div>
            <q-select
              v-model="selected"
              dense
              filled
              :options="devices"
              emit-value
              map-options
            >
              <template #selected-item="scope">
                <q-item dense>
                  <q-item-section avatar>
                    <q-icon name="svguse:icons.svg#ethernet" size="xs" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      {{ scope.opt.name }}
                    </q-item-label>
                    <q-item-label caption>
                      {{ scope.opt.ipaddress }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>

              <template #option="scope">
                <q-item dense v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <q-icon name="svguse:icons.svg#ethernet" size="xs" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      {{ scope.opt.name }}
                    </q-item-label>
                    <q-item-label caption>
                      {{ scope.opt.ipaddress }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <q-input v-model="code" dense filled label="Code">
            <template #append>
              <q-icon class="cursor-pointer" name="send" @click="send" />
            </template>
          </q-input>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="bg-grey-2 q-mx-md" style="height: 3rem">
          <div
            class="text-grey-6"
            style="
              position: absolute;
              top: 0.2rem;
              left: 2.8rem;
              font-size: 0.8rem;
            "
          >
            Re
          </div>
          <div style="position: absolute; top: 1.5rem; left: 3rem">
            {{ replay }}
          </div>
        </div>
      </q-card-section>

      <!-- buttons example -->
      <q-card-actions align="right">
        <div class="q-mx-sm q-gutter-sm">
          <q-btn
            label="닫기"
            style="width: 5rem"
            unelevated
            @click="onCancelClick"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useQuasar, useDialogPluginComponent } from 'quasar'
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  emits: [...useDialogPluginComponent.emits],

  setup() {
    const { dialogRef, onDialogHide, onDialogCancel } =
      useDialogPluginComponent()

    const { state } = useStore()
    const $q = useQuasar()

    const devices = computed(() => state.devices.devices)
    const selected = ref(null)
    const replay = ref('')
    const code = ref('')

    function send() {
      window.FN.onRequest({
        command: 'test',
        device: selected.value.ipaddress,
        code: code.value
      })
    }

    onMounted(() => {
      window.FN.replay((message) => {
        replay.value = message
      })
    })

    return {
      replay,
      selected,
      devices,
      code,
      send,
      dialogRef,
      onDialogHide,
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
