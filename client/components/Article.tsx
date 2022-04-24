import type { Article as ArticleType } from '$lib/generated/graphql'
import Link from 'next/link'

export default function Article({ article }: ArticleProps) {
  return (
    <div className="mb-10">
      <div className="border-b-2 border-gray-600">
        <Link href={`/articles/${article.slug}`} passHref>
          <a className="text-2xl font-bold uppercase text-indigo-500">
            {article.title}
          </a>
        </Link>
      </div>
      <div className="mt-6 mb-8">
        <p className="text-2xl">{article.content}</p>
      </div>
      <div className="flex justify-end mt-5">
        <p className="font-mono text-gray-600 italic">{article.author}</p>
      </div>
    </div>
  )
}

type ArticleProps = { article: ArticleType }
