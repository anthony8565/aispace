import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const { prompt, type } = await req.json()

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful content writer. Generate high quality content based on the user request.',
      },
      {
        role: 'user',
        content: `Write ${type}: ${prompt}`,
      },
    ],
    max_tokens: 1000,
  })

  const content = completion.choices[0].message.content

  return NextResponse.json({ content })
}