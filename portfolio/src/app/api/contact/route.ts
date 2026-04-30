import { NextRequest, NextResponse } from 'next/server'

interface ContactPayload {
  name: string
  email: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactPayload
    const { name, email, message } = body

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    if (process.env.DATABASE_URL) {
      const { db } = await import('@/lib/db')
      const { messages } = await import('@/lib/db/schema')
      await db.insert(messages).values({ name: name.trim(), email: email.trim(), message: message.trim() })
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (error) {
    console.error('[/api/contact]', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
