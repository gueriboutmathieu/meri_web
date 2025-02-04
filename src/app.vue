<template>
    <div class="h-screen w-screen">
        <NuxtPage />
    </div>
</template>

<script setup lang="ts">
import { createLlmService, type LlmService } from "@/services/llmService";
import { createSpeechService, type SpeechService } from "@/services/speechService";
import { createStateStore, type StateStore } from "@/stores/stateStore";

const runtimeConfig = useRuntimeConfig()

const llmService: LlmService = createLlmService();
const speechService: SpeechService = createSpeechService(
    runtimeConfig.public.openai.apiKey,
    runtimeConfig.public.openai.sttModel,
    runtimeConfig.public.openai.ttsModel,
);
const stateStore: StateStore = createStateStore();

const nuxtApp = useNuxtApp();
nuxtApp.provide("llmService", llmService);
nuxtApp.provide("speechService", speechService);
nuxtApp.provide("stateStore", stateStore);
</script>
