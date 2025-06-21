import React, { useState } from 'react';
import { getGPTResponse } from '../utils/openai';

function AIHelper() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState(() => {
    const stored = localStorage.getItem('aiHelperHistory');
    return stored ? JSON.parse(stored) : [];
  });

  const handleAskAI = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const reply = await getGPTResponse(input);
      setResponse(reply);

      const newEntry = { question: input, answer: reply };
      const updatedHistory = [...history, newEntry];

      setHistory(updatedHistory);
      localStorage.setItem('aiHelperHistory', JSON.stringify(updatedHistory));

    } catch (err) {
      console.error('❌ AI Error:', err);
      setError('Something went wrong. Please try again.');
    }

    setLoading(false);
    setInput('');
  };

  // ✅ Clear all history
  const handleClearHistory = () => {
    localStorage.removeItem('aiHelperHistory');
    setHistory([]);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '100%' }}>
      <h2>🧠 AI Productivity Assistant</h2>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something like: suggest a 10-min workout"
        style={{ width: '70%', padding: '0.5rem' }}
      />
      <button
        onClick={handleAskAI}
        style={{ marginLeft: '10px', padding: '0.5rem 1rem' }}
        disabled={loading}
      >
        {loading ? 'Thinking...' : 'Ask AI'}
      </button>

      {error && (
        <div style={{ marginTop: '1rem', color: 'red' }}>
          <strong>{error}</strong>
        </div>
      )}

      {response && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0f0f0' }}>
          <strong>AI says:</strong>
          <ul>
            {response.split(/\d+\.\s/).filter(Boolean).map((point, index) => (
              <li key={index}>{point.trim()}</li>
            ))}
          </ul>
        </div>
      )}

      {history.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>📚 AI History</h3>

          <button
            onClick={handleClearHistory}
            style={{
              backgroundColor: '#ff4d4f',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              marginBottom: '1rem',
              cursor: 'pointer'
            }}
          >
            🗑️ Clear History
          </button>

          {history.map((entry, index) => (
            <div key={index} style={{ marginBottom: '1rem', background: '#e7e7e7', padding: '1rem', borderRadius: '5px' }}>
              <strong>You asked:</strong> {entry.question}
              <br />
              <strong>AI replied:</strong>
              <ul>
                {entry.answer.split(/\d+\.\s/).filter(Boolean).map((point, i) => (
                  <li key={i}>{point.trim()}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AIHelper;
