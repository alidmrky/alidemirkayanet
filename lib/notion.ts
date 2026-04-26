import { Client } from '@notionhq/client'
import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

function getClient() {
  return new Client({ auth: process.env.NOTION_TOKEN })
}

/* ── Types ───────────────────────────────────────────────────────────── */
export interface AiNewsArticle {
  id: string
  title: string
  summary: string
  category: string
  date: string
  imageUrl: string | null
  published: boolean
}

const richTextToPlain = (rt: RichTextItemResponse[]): string =>
  rt.map((t) => t.plain_text).join('')

/* ── Fetch AI News list ──────────────────────────────────────────────── */
export async function getAiNewsArticles(): Promise<AiNewsArticle[]> {
  const notion = getClient()

  const response = await notion.databases.query({
    database_id: process.env.NOTION_AI_NEWS_DB_ID!,
    filter: {
      property: 'Published',
      checkbox: { equals: true },
    },
    sorts: [{ property: 'Date', direction: 'descending' }],
  })

  return response.results
    .filter((page): page is PageObjectResponse => page.object === 'page')
    .map((page) => {
      const props = page.properties

      const titleProp = props['Name'] ?? props['Title']
      const title =
        titleProp?.type === 'title' ? richTextToPlain(titleProp.title) : 'Başlıksız'

      const summaryProp = props['Summary']
      const summary =
        summaryProp?.type === 'rich_text' ? richTextToPlain(summaryProp.rich_text) : ''

      const categoryProp = props['Category']
      const category =
        categoryProp?.type === 'select' ? (categoryProp.select?.name ?? '') : ''

      const dateProp = props['Date']
      const date = dateProp?.type === 'date' ? (dateProp.date?.start ?? '') : ''

      const imageProp = props['URL'] ?? props['Image']
      const imageUrl = imageProp?.type === 'url' ? (imageProp.url ?? null) : null

      const publishedProp = props['Published']
      const published =
        publishedProp?.type === 'checkbox' ? publishedProp.checkbox : false

      return { id: page.id, title, summary, category, date, imageUrl, published }
    })
}

/* ── Blog post type ──────────────────────────────────────────────────── */
export interface BlogPost {
  id: string
  title: string
  summary: string
  category: string
  date: string
  imageUrl: string | null
  readTime: number
  published: boolean
}

/* ── Fetch Blog posts ────────────────────────────────────────────────── */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const notion = getClient()

  const response = await notion.databases.query({
    database_id: process.env.NOTION_BLOG_DB_ID!,
    filter: {
      property: 'Published',
      checkbox: { equals: true },
    },
    sorts: [{ property: 'Date', direction: 'descending' }],
  })

  return response.results
    .filter((page): page is PageObjectResponse => page.object === 'page')
    .map((page) => {
      const props = page.properties

      const titleProp = props['Name'] ?? props['Title']
      const title =
        titleProp?.type === 'title' ? richTextToPlain(titleProp.title) : 'Başlıksız'

      const summaryProp = props['Summary']
      const summary =
        summaryProp?.type === 'rich_text' ? richTextToPlain(summaryProp.rich_text) : ''

      const categoryProp = props['Category']
      const category =
        categoryProp?.type === 'select' ? (categoryProp.select?.name ?? '') : ''

      const dateProp = props['Date']
      const date = dateProp?.type === 'date' ? (dateProp.date?.start ?? '') : ''

      const imageProp = props['URL'] ?? props['Image']
      const imageUrl = imageProp?.type === 'url' ? (imageProp.url ?? null) : null

      const readTimeProp = props['ReadTime']
      const readTime =
        readTimeProp?.type === 'number' ? (readTimeProp.number ?? 3) : 3

      const publishedProp = props['Published']
      const published =
        publishedProp?.type === 'checkbox' ? publishedProp.checkbox : false

      return { id: page.id, title, summary, category, date, imageUrl, readTime, published }
    })
}

/* ── Fetch single article blocks ─────────────────────────────────────── */
export async function getArticleBlocks(pageId: string): Promise<BlockObjectResponse[]> {
  const notion = getClient()
  const response = await notion.blocks.children.list({ block_id: pageId })
  return response.results.filter(
    (block): block is BlockObjectResponse => 'type' in block
  )
}
