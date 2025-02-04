export const appState = {
    initializing: "initializing",
    ready: "ready",
    recording: "recording",
    waitingForResponse: "waitingForResponse",
    playingResponse: "playingResponse",
}

export type AppState = typeof appState[keyof typeof appState];
