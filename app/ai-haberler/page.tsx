import { getAiNewsArticles } from '@/lib/notion'
import AiNewsClient from './AiNewsClient'

export const revalidate = 3600 // ISR: saatte bir yenile

export default async function AiNewsPage() {
  const articles = await getAiNewsArticles()
  return <AiNewsClient articles={articles} />
}
