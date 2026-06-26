'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

const contentTypes = [
  'Blog Post',
  'Twitter Thread',
  'LinkedIn Post',
  'Email Newsletter',
  'Product Description',
]

export default function ContentPage() {
  const [prompt, setPrompt] = useState('')
  const [type, setType] = useState('Blog Post')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!prompt) return
    setLoading(true)
    setResult('')

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, type }),
    })

    const data = await res.json()
    setResult(data.content)
    setLoading(false)
  }

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', color: '#000000' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '24px', color: '#000000' }}>
        ✍️ Content Generator
      </h1>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#000000' }}>
          Content Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '6px', border: '1px solid #ccc', color: '#000000', background: '#ffffff' }}
        >
          {contentTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#000000' }}>
          What do you want to write about?
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. The benefits of drinking more water every day"
          rows={4}
          style={{ width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '6px', border: '1px solid #ccc', color: '#000000', background: '#ffffff' }}
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading || !prompt}
        style={{
          backgroundColor: '#000000',
          color: '#ffffff',
          padding: '12px 24px',
          fontSize: '1rem',
          borderRadius: '6px',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading || !prompt ? 0.6 : 1,
        }}
      >
        {loading ? 'Generating...' : 'Generate Content'}
      </button>

      {result && (
        <div style={{ marginTop: '40px', padding: '24px', background: '#ffffff', borderRadius: '8px', border: '1px solid #ccc', color: '#000000' }}>
          <ReactMarkdown>{result}</ReactMarkdown>
        </div>
      )}
    </main>
  )
}