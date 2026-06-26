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
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: '60px 20px',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#a855f7',
          marginBottom: '8px',
        }}>
          ✍️ Content Generator
        </h1>
        <p style={{ color: '#aaaaaa', marginBottom: '40px', fontSize: '1rem' }}>
          Create content with AI
        </p>

        {/* Content Type */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#ffffff' }}>
            Content Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #a855f7',
              backgroundColor: '#0d0d1a',
              color: '#ffffff',
              outline: 'none',
            }}
          >
            {contentTypes.map((t) => (
              <option key={t} value={t} style={{ backgroundColor: '#0d0d1a' }}>{t}</option>
            ))}
          </select>
        </div>

        {/* Prompt */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#ffffff' }}>
            What do you want to write about?
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. The benefits of drinking more water every day"
            rows={4}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #a855f7',
              backgroundColor: '#0d0d1a',
              color: '#ffffff',
              outline: 'none',
              resize: 'vertical',
            }}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt}
          style={{
            backgroundColor: '#a855f7',
            color: '#ffffff',
            padding: '14px 32px',
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: '8px',
            border: 'none',
            cursor: loading || !prompt ? 'not-allowed' : 'pointer',
            opacity: loading || !prompt ? 0.6 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {loading ? 'Generating...' : 'Generate Content'}
        </button>

        {/* Result */}
        {result && (
          <div style={{
            marginTop: '40px',
            padding: '28px',
            backgroundColor: '#0d0d1a',
            borderRadius: '12px',
            border: '1px solid #a855f7',
            color: '#ffffff',
            lineHeight: '1.8',
            fontSize: '1rem',
          }}>
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        )}

      </div>
    </main>
  )
}