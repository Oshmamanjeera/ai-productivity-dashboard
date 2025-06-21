// openai.js
// Minor comment to force redeploy
import axios from 'axios';

export async function getGPTResponse(message) {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/chat`,
      { prompt: message },
      { timeout: 10000 }
    );
    return res.data.reply;
  } catch (err) {
    console.error('Error from backend:', err);
    return err.response?.data?.error || 'Sorry, AI is not responding.';
  }
}
