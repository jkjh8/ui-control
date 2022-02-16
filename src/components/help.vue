<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="max-width: 1920px; width: 90%">
      <q-card-section>
        <div class="row items-center q-gutter-x-sm">
          <q-img :src="url" style="height: 16px; max-width: 16px" />
          <div style="font-weight: 500">UI Control 도움말</div>
        </div>
      </q-card-section>

      <q-card-section>
        <div>
          <ol class="q-gutter-y-md">
            <li>
              <div>TCP/IP 연결</div>
              <div>
                우측 상단의 서버포트 지정 및 Connect버튼을 눌러서 활성화 합니다.
              </div>
            </li>
            <li>
              <div>장비등록</div>
              <div>
                Client List우측의
                <q-icon name="svguse:icons.svg#plus-circle" />아이콘을 클릭하여
                팝업에 장비 이름, IP등을 입력하여 등록 합니다.
              </div>
            </li>
            <li>
              <div>장비연결</div>
              <div>
                리스트에서 해당 장비의 우측에
                <q-icon
                  name="svguse:icons.svg#connect"
                  color="red-10"
                />아이콘을 클릭하여 장비를 연결합니다.
              </div>
            </li>
            <li>
              <div>프로토콜</div>
              <div>
                프로토콜구조는 JSON형식의 문자열을 기반으로 합니다. 사용자의
                편의를 돕기 위해서 우측 상단에 테스트 버튼(<q-icon
                  name="svguse:icons.svg#code"
                />)를 준비 했으며, 테스트 팝업에서 Code스트링을 복사하여
                사용하시면 편리합니다. 리턴은 문자열 단답식으로 명령이
                성공적으로 실행되었으면 OK, 에러 발생시에는 어떤 에러가
                발생했는지 회신하며, 상태값을 물어 봤을때는 상태값이 리턴됩니다.
              </div>
            </li>
            <li>
              <div>프로토콜구조</div>
              <div>
                프로토콜상세 구조는 bus, buschannel, channeltype, channel,
                command, value로 나누어지며 JSON형태의 "bus":"master"식의 구조로
                이루어져있습니다. 상세한 내용은 코드테스트 팝업에서 확인할 수
                있습니다.
              </div>
            </li>
            <li>
              <div>값(value)</div>
              <div>
                상태값은 기본적으로 0 ~ 1사이의 값을 가집니다. Boolean값은 0과
                1로 dB값은 기본으로 -100 ~ 10으로 지정됩니다. 예를들어
                "setfaderlevel":"0.5"가 일반 값이며 dB기반의 값은
                "setfaderleveldb":"-5"등으로 표현됩니다.
              </div>
            </li>
          </ol>
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
