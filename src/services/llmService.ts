export type LlmService = {
    query: (prompt: string) => Promise<string>;
};

export function createLlmService(): LlmService {
    const baseUrl = "http://localhost:8080";

    const query = async function (prompt: string): Promise<string> {
        const query = `${baseUrl}/query?user_prompt=${prompt}`;
        const response = await fetch(query, { method: "POST" });
        return await response.json();
    };

    return { query };
}
