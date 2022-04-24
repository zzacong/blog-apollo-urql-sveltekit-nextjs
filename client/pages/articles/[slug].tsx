import type { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from 'urql'

import { ArticleBySlugDocument, ArticlesDocument } from 'lib/generated/graphql'
import Article from '$components/Article'
import { client, ssrCache } from '$lib/urql'

export default function ArticlePage({}: ArticlePageProps) {
  const router = useRouter()
  const [result] = useQuery({
    query: ArticleBySlugDocument,
    variables: { slug: router.query.slug as string },
  })
  const { data, fetching, error } = result

  return (
    <>
      <Head>
        <title>{data?.articleBySlug?.title}</title>
      </Head>

      {!data || fetching ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Oh no... {error.message}</p>
      ) : (
        <Article article={data.articleBySlug!} />
      )}
    </>
  )
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const result = await client.query(ArticlesDocument).toPromise()

  return {
    paths:
      result.data?.articles?.map(art => ({ params: { slug: art!.slug } })) ??
      [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<
  { urqlState: ReturnType<typeof ssrCache.extractData> },
  { slug: string }
> = async ({ params }) => {
  await client.query(ArticleBySlugDocument, { slug: params!.slug }).toPromise()

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
    revalidate: 60,
  }
}

type ArticlePageProps = {}
