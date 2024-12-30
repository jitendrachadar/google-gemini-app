import axios from 'axios';

const apiUrl = import.meta.env.VITE_GOOGLE_GEMINI_API_URL;
const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;

export const fetchGeminiResponse = async (query) => {
  try {
    const response = await axios.post(
      apiUrl,
      { query },
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching response from Google Gemini:', error);
    throw error;
  }
};
