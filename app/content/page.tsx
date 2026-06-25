'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function ContentPage() {
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState('blog post');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    setResult('');

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, contentType }),
    });

    const data = await response.json();
    setResult(data.content);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#a855f7', marginBottom: '30px' }}>
        ✍️ Content Generator
      </h1>

      <input
        type="text"
        placeholder="Enter your topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{
          width: '100%',
          padding: '14px',
          borderRadius: '12px',
          border: '1px solid #a855f7',
          background: '#1a1a2e',
          color: 'white',
          fontSize: '1rem',
          marginBottom: '16px',
          boxSizing: 'border-box',
        }}
      />

      <select
        value={contentType}
        onChange={(e) => setContentType(e.target.value)}
        style={{
          width: '100%',
          padding: '14px',
          borderRadius: '12px',
          border: '1px solid #a855f7',
          background: '#1a1a2e',
          color: 'white',
          fontSize: '1rem',
          marginBottom: '16px',
          boxSizing: 'border-box',
        }}
      >
        <option value="blog post">Blog Post</option>
        <option value="twitter thread">Twitter Thread</option>
        <option value="linkedin post">LinkedIn Post</option>
        <option value="email newsletter">Email Newsletter</option>
        <option value="product description">Product Description</option>
      </select>

      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{
          width: '100%',
          padding: '14px',
          borderRadius: '12px',
          background: loading ? '#6b21a8' : '#a855f7',
          color: 'white',
          fontSize: '1rem',
          fontWeight: 'bold',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '30px',
        }}
      >
        {loading ? 'Generating...' : 'Generate Content'}
      </button>

      {result && (
        <div
          style={{
            background: '#1a1a2e',
            border: '1px solid #a855f7',
            borderRadius: '12px',
            padding: '24px',
            color: '#e2e8f0',
            lineHeight: '1.8',
          }}
        >
          <ReactMarkdown>{result}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}