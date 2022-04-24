import type { GetStaticProps } from 'next'

import Head from 'next/head'
import { useQuery } from 'urql'

import { ArticlesDocument } from '$lib/generated/graphql'
import { client, ssrCache } from '$lib/urql'
import Article from '$components/Article'

export default function Home() {
  const [result] = useQuery({ query: ArticlesDocument })
  const { data, fetching, error } = result

  return (
    <>
      <Head>
        <title>Articles</title>
      </Head>

      {fetching ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Oh no... {error.message}</p>
      ) : (
        data!.articles!.map(article => (
          <Article key={article!.slug} article={article!} />
        ))
      )}
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  await client.query(ArticlesDocument).toPromise()

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
    revalidate: 60,
  }
}
