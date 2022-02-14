<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="max-width: 1920px; width: 90%">
      <q-card-section>
        <div class="row items-center q-gutter-x-sm">
          <q-img :src="url" style="height: 16px; max-width: 16px" />
          <div style="font-weight: 500">UI Control 도움말</div>
        </div>
      </q-card-section>

      <q-card-actions class="q-pt-none" align="right">
        <div class="q-mx-sm">
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
import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'
export default {
  emits: [...useDialogPluginComponent.emits],

  setup() {
    const { dialogRef, onDialogHide, onDialogCancel } =
      useDialogPluginComponent()

    const url = ref(
      process.env.DEV
        ? 'menu/logo.png'
        : `${process.resourcesPath}/menu/logo.png`
    )

    return {
      url,
      dialogRef,
      onDialogHide,
      onCancelClick: onDialogCancel
    }
  }
}
</script>
