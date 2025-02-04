import {defineStore} from "pinia";
import cloneDeep from "lodash.clonedeep";

import { appState, type AppState } from "@/models/appState";

export const createStateStore = defineStore("state", function() {
    const _state = reactive<{
        appState: AppState;
    }>({
        appState: appState.initializing,
    });

    const state = computed(function() {
        const stateCopy = cloneDeep(_state);
        return Object.freeze(stateCopy);
    });

    const setState = function(newState: AppState): void {
        _state.appState = newState;
    };

    return {
        state,
        setState,
    };
});

export type StateStore = ReturnType<typeof createStateStore>;
