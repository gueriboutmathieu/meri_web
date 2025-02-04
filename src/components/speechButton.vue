<template>
    <div class="h-64 w-64 rounded-full">
        <button
            v-if="state === appState.initializing"
            class="h-full w-full bg-purple rounded-full text-[50px]"
            disabled
        >
            <FontAwesomeIcon icon="fa-solid fa-microphone" />
        </button>
        <button
            v-if="state === appState.ready"
            @click="startRecording"
            class="h-full w-full bg-purple rounded-full text-[50px]"
        >
            <FontAwesomeIcon icon="fa-solid fa-microphone" />
        </button>
        <button
            v-if="state === appState.recording"
            @click="stopRecording"
            class="h-full w-full bg-red rounded-full text-[50px] animate-pulse"
        >
            <FontAwesomeIcon icon="fa-solid fa-stop" />
        </button>
        <button
            v-if="state === appState.waitingForResponse"
            class="h-full w-full bg-orange rounded-full text-[50px] animate-spin"
            disabled
        >
            <FontAwesomeIcon icon="fa-solid fa-spinner" />
        </button>
        <button
            v-if="state === appState.playingResponse"
            class="h-full w-full bg-green rounded-full text-[50px]"
            disabled
        >
            <FontAwesomeIcon icon="fa-solid fa-volume-high" class="animate-bounce" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { type StateStore } from "@/stores/stateStore";
import { appState } from "@/models/appState";

const emit = defineEmits<{
    recordedAudio: [audio: Blob];
}>();

const stateStore = useNuxtApp().$stateStore as StateStore;
const state = computed(function() { return stateStore.state.appState });

const stream = ref<MediaStream | undefined>(undefined);
const mediaRecorder = ref<MediaRecorder | undefined>(undefined);

onMounted(async function() {
    stream.value = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.value = new MediaRecorder(stream.value);
    stateStore.setState(appState.ready);
    console.log(state.value);
});

async function startRecording(): Promise<void> {
    stateStore.setState(appState.recording);

    let audioChunks: Blob[] = [];

    mediaRecorder.value!.ondataavailable = async function(event) {
        if (event.data.size > 0) {
            audioChunks.push(event.data);
        }
    };

    mediaRecorder.value!.onstop = async function() {
        emit(
            "recordedAudio",
            new Blob(audioChunks, { type: "audio/wav" })
        );
    }

    mediaRecorder.value!.start();
}

function stopRecording(): void {
    mediaRecorder.value!.stop();
}
</script>
