import { NextRequest, NextResponse } from 'next/server'
import { getArticleBlocks } from '@/lib/notion'

export async function GET(req: NextRequest) {
  const pageId = req.nextUrl.searchParams.get('pageId')
  if (!pageId) return NextResponse.json({ error: 'pageId required' }, { status: 400 })

  try {
    const blocks = await getArticleBlocks(pageId)
    return NextResponse.json({ blocks })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
