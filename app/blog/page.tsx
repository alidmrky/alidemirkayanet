import { getBlogPosts } from '@/lib/notion'
import BlogClient from './BlogClient'

export const revalidate = 3600

export default async function BlogPage() {
  const posts = await getBlogPosts()
  return <BlogClient posts={posts} />
}
