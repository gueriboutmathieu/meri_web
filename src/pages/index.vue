<template>
    <div class="h-full w-full flex flex-col justify-center items-center bg-dark col">
        <SpeechButton @recordedAudio="onRecordedAudio" class="" />
        <div class="fixed bottom-10 m-10 p-5 bg-darkLight text-center rounded-md" v-if="llmResponse !== ''">
            <p class="text-white text-[15px]">{{ llmResponse }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type SpeechService } from "@/services/speechService";
import { type LlmService } from "@/services/llmService";
import { type StateStore } from "@/stores/stateStore";
import { appState } from "@/models/appState";

const speechService = useNuxtApp().$speechService as SpeechService;
const llmService = useNuxtApp().$llmService as LlmService;
const stateStore = useNuxtApp().$stateStore as StateStore;

let llmResponse = ref<string>("");

async function onRecordedAudio(audioBytes: Blob): Promise<void> {
    stateStore.setState(appState.waitingForResponse);
    llmResponse.value = "";
    const transcription = await speechService.speechToText(audioBytes);
    const response = await llmService.query(transcription);
    const speech = await speechService.textToSpeech(response);
    llmResponse.value = response;
    const audio = new Audio(URL.createObjectURL(speech));
    audio.onplay = function() {
        stateStore.setState(appState.playingResponse);
    };
    audio.onended = function() {
        stateStore.setState(appState.ready);
    };
    await audio.play();
}
</script>