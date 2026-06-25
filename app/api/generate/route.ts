import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  const { topic, type } = await request.json()

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'You are an expert content creator. Create engaging content based on the topic and type provided.',
      },
      {
        role: 'user',
        content: `Create a ${type} about: ${topic}`,
      },
    ],
  })

  const content = completion.choices[0].message.content

  return NextResponse.json({ content })
}