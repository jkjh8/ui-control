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

      <q-separator />

      <q-card-section>
        <div class="q-mx-md q-gutter-y-sm">
          <div>
            <!-- Device -->
            <q-select
              v-model="selected"
              dense
              filled
              :options="devices"
              option-value="id"
              emit-value
              map-options
              label="Device"
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

          <!-- bus -->
          <q-select
            v-model="bus"
            filled
            dense
            label="Mix Bus"
            :options="[
              'master',
              'aux',
              'fx',
              'player',
              'mutegroup',
              'recorder',
              'show'
            ]"
          />
          <q-input
            v-if="bus === 'aux' || bus === 'fx'"
            v-model="buschannel"
            filled
            dense
            label="Bus Channel"
            type="number"
          />
          <!-- channel type -->
          <q-select
            v-if="bus === 'master'"
            v-model="channeltype"
            filled
            dense
            label="Channel Type"
            :options="['input', 'line', 'player', 'aux', 'fx', 'sub', 'vca']"
            clearable
          />
          <q-select
            v-if="bus === 'aux'"
            v-model="channeltype"
            filled
            dense
            label="Channel Type"
            :options="['input', 'line', 'player', 'fx']"
            clearable
          />
          <q-select
            v-if="bus === 'fx'"
            v-model="channeltype"
            filled
            dense
            label="Channel Type"
            :options="['input', 'line', 'player', 'sub']"
            clearable
          />
          <!-- channel -->
          <q-input
            v-if="channeltype && bus !== 'mutegroup'"
            v-model="channel"
            filled
            dense
            label="Channel"
            type="number"
          />
          <q-select
            v-if="bus === 'mutegroup'"
            v-model="channel"
            filled
            dense
            label="Channel"
            :options="[1, 2, 'fx', 'all']"
          />
          <!-- command -->
          <!-- master -->
          <q-select
            v-if="bus === 'master' && channeltype === null"
            v-model="command"
            filled
            dense
            label="Command"
            :options="[
              'setfaderlevel',
              'setfaderleveldb',
              'changefaderleveldv',
              'fadeto',
              'fadetodb',
              'pan',
              'getfaderlevel',
              'getfaderleveldb',
              'getpan'
            ]"
          />
          <!-- master channel -->
          <q-select
            v-if="bus === 'master' && channeltype !== null"
            v-model="command"
            filled
            dense
            label="Command"
            :options="[
              'setfaderlevel',
              'setfaderleveldb',
              'changefaderleveldv',
              'fadeto',
              'fadetodb',
              'setmute',
              'mute',
              'unmute',
              'togglemute',
              'getmute',
              'pan',
              'setsolo',
              'solo',
              'unsolo',
              'togglesolo',
              'getfaderlevel',
              'getfaderleveldb',
              'getsolo',
              'getpan'
            ]"
          />
          <q-select
            v-if="bus === 'aux'"
            v-model="command"
            filled
            dense
            label="Command"
            :options="[
              'pan',
              'pre',
              'post',
              'togglepost',
              'setpost',
              'preproc',
              'postproc',
              'setpostproc',
              'getpost',
              'getpan'
            ]"
          />
          <q-select
            v-if="bus === 'fx'"
            v-model="command"
            filled
            dense
            label="Command"
            :options="['pre', 'post', 'setpost', 'getpost']"
          />
          <q-select
            v-if="bus === 'mutegroup'"
            v-model="command"
            filled
            dense
            label="Command"
            :options="['mute', 'unmute', 'toggle', 'getstate']"
          />
          <q-select
            v-if="bus === 'player'"
            v-model="command"
            filled
            dense
            label="Command"
            :options="[
              'play',
              'pause',
              'stop',
              'next',
              'prev',
              'loadplaylist',
              'loadtrack',
              'setshuffle',
              'toggleshuffle',
              'setplaymode',
              'setmanual',
              'setauto',
              'getstate',
              'getplaylist',
              'gettrack',
              'getlength',
              'getelapsedtime',
              'getremainingtime',
              'getshuffle'
            ]"
          />
          <q-select
            v-if="bus === 'recorder'"
            v-model="command"
            filled
            dense
            label="Command"
            :options="['recordtoggle', 'getbusy', 'getstate']"
          />
          <q-select
            v-if="bus === 'show'"
            v-model="command"
            filled
            dense
            label="Command"
            :options="['loadshow', 'loadsnapshot', 'loadcue']"
          />
          <!--  value  -->
          <q-input
            v-if="
              command === 'loadshow' ||
              command === 'loadsnapshot' ||
              command === 'loadcue'
            "
            v-model="showname"
            filled
            dense
            label="Show Name"
          />
          <q-input
            v-if="command === 'loadsnapshot'"
            v-model="snapshot"
            filled
            dense
            label="Show Snapshot"
          />
          <q-input
            v-if="command === 'loadcue'"
            v-model="cue"
            filled
            dense
            label="Show Cue"
          />
          <q-input
            v-if="
              command === 'setfaderlevel' ||
              command === 'setfaderleveldb' ||
              command === 'changefaderleveldb' ||
              command === 'fadeto' ||
              command === 'fadetodb' ||
              command === 'pan' ||
              command === 'setmute' ||
              command === 'setsolo' ||
              command === 'setpost' ||
              command === 'setpostproc' ||
              command === 'setshuffle'
            "
            v-model="value"
            filled
            dense
            label="Command Value"
            type="number"
          />
          <q-input
            v-if="command === 'fadeto' || command === 'fadetodb'"
            v-model="time"
            filled
            dense
            label="Command Time(ms)"
            type="number"
          />
          <q-input
            v-if="
              command === 'loadplaylist' ||
              command === 'loadtrack' ||
              command === 'changefaderleveldb' ||
              command === 'fadeto' ||
              command === 'fadetodb' ||
              command === 'pan' ||
              command === 'setmute' ||
              command === 'setsolo' ||
              command === 'setpost' ||
              command === 'setpostproc'
            "
            v-model="list"
            filled
            dense
            label="Play List"
          />
          <q-input
            v-if="command === 'loadtrack'"
            v-model="track"
            filled
            dense
            type="number"
            label="Play Track"
          />
          <q-select
            v-if="command === 'setplaymode'"
            v-model="mode"
            filled
            dense
            label="Play Mode"
            :options="['manual', 'auto']"
          />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-py-sm">
        <div class="q-mx-md q-gutter-y-sm">
          <div class="row justify-between items-center text-grey">
            <div style="font-size: 0.5rem">Code</div>
            <q-btn
              round
              flat
              icon="svguse:icons.svg#copy"
              size="sm"
              color="green-10"
              @click="fnCopy(code)"
            >
              <q-tooltip
                style="background: rgba(0, 0, 0, 0.5); font-size: 0.5rem"
              >
                COPY
              </q-tooltip>
            </q-btn>
          </div>
          <div class="q-mx-xs" style="max-width: 350px; word-break: break-all">
            {{ code }}
          </div>
          <q-btn
            class="full-width"
            rounded
            unelevated
            color="primary"
            @click="send(code)"
            >SEND</q-btn
          >
        </div>
      </q-card-section>
      <q-separator />

      <q-card-section class="q-pb-none">
        <div class="q-mx-md" style="height: 3rem">
          <div class="text-grey" style="font-size: 0.5rem">Replay</div>
          <div class="q-mx-xs" style="max-width: 350px; word-break: break-all">
            {{ replay }}
          </div>
        </div>
      </q-card-section>

      <!-- buttons example -->
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
import { useQuasar, useDialogPluginComponent } from 'quasar'
import { ref, reactive, toRefs, computed, onMounted } from 'vue'
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
    const testCode = ref(null)
    const replay = ref('')
    const code = computed(() => {
      return JSON.stringify(
        Object.entries({ id: selected.value, ...command }).reduce(
          (a, [k, v]) => (v === null ? a : ((a[k] = v), a)),
          {}
        )
      )
    })
    const command = reactive({
      bus: null,
      buschannel: null,
      channeltype: null,
      channel: null,
      value: null,
      list: null,
      showname: null,
      snapshot: null,
      cue: null,
      time: null,
      command: null
    })

    function send(code) {
      window.FN.onRequest({
        command: 'test',
        code: code
      })
    }

    async function fnCopy(args) {
      await navigator.clipboard.writeText(args)
    }

    onMounted(() => {
      window.FN.replay((message) => {
        replay.value = message
      })
    })

    return {
      ...toRefs(command),
      replay,
      selected,
      devices,
      code,
      send,
      testCode,
      fnCopy,
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
