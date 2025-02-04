export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    srcDir: "src/",
    modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
    css: ["@/assets/css/tailwind.css", "@fortawesome/fontawesome-svg-core/styles.css"],
    tailwindcss: {
        exposeConfig: true,
        config: {
            content: ["**/*.vue"],
            theme: {
                extend: {
                    colors: {
                        dark: "#282A36",
                        darkLight: "#44475A",
                        white: "#F8F8F2",
                        purple: "#BD93F9",
                        green: "#50FA7B",
                        red: "#FF5555",
                        yellow: "#F1FA8C",
                        orange: "#FFB86C",
                    },
                },
            },
        },
    },
    runtimeConfig: {
        public: {
            openai: {
                apiKey: process.env.OPENAI_API_KEY,
                sttModel: process.env.OPENAI_STT_MODEL,
                ttsModel: process.env.OPENAI_TTS_MODEL,
            },
        },
    },
});
