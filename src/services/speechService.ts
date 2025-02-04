import OpenAI from "openai";

export type SpeechService = {
    speechToText: (audio: Blob) => Promise<string>;
    textToSpeech: (text: string) => Promise<Blob>;
};

export function createSpeechService(apiKey: string, sttModel: string, ttsModel: string): SpeechService {
    const client = new OpenAI({apiKey: apiKey, dangerouslyAllowBrowser: true});

    const speechToText = async function (audio: Blob): Promise<string> {
        const transcription = await client.audio.transcriptions.create({
            file: new File([audio], "audio.wav", {type: "audio/wav"}),
            model: sttModel,
        });
        return transcription.text;
    };

    const textToSpeech = async function (text: string): Promise<Blob> {
        const speech = await client.audio.speech.create({
            input: text,
            voice: "alloy",
            model: ttsModel,
            response_format: "wav",
        });
        return await speech.blob();
    };


    return {speechToText, textToSpeech};
}
