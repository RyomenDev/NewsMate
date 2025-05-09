import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Make sure to set this in your .env file
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

/**
 * Send a prompt to the Gemini API and get a response.
 * @param {string} userPrompt - User's input query.
 * @param {string[]} contextChunks - Retrieved context passages from vector store (optional).
 * @returns {string} Gemini's generated answer.
 */
export const getBotResponse = async (userPrompt, contextChunks = []) => {
  try {
    const contextText = contextChunks.length
      ? `Use the following context to answer the question:\n\n${contextChunks.join(
          "\n\n"
        )}`
      : "";

    const prompt = `${contextText}\n\nQuestion: ${userPrompt}`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const answer = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return answer || "I'm not sure how to answer that.";
  } catch (error) {
    console.error("Gemini API Error:", error?.response?.data || error.message);
    throw new Error("Failed to get response from Gemini API.");
  }
};
