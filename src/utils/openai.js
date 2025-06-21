import axios from 'axios'


export async function getGPTResponse(message) {
  try {
    const res = await axios.post(
      'http://localhost:5050/api/chat',
      { prompt: message },  // ✅ fixed key here
      { timeout: 10000 }
    );
    return res.data.reply // ✅ correctly return reply
  } catch (err) {
    console.error('Error from backend:', err);
    return err.response?.data?.error || 'Sorry, AI is not responding.';
  }
}
