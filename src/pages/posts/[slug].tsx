import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { RichText } from 'prismic-dom';

import { getPrimiscClient } from '../../services/prismic';

import styles from './post.module.scss';

interface PostPros {
  post: {
    uid: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function Post({ post }: PostPros) {
  return (
    <>
      <Head>
        <title>{post.title} | ignew</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });

  const { slug } = params;

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const prismicClient = getPrimiscClient(req);

  const response = await prismicClient.getByUID(
    'publication',
    String(slug),
    {}
  );

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }
    ),
  };

  return {
    props: { post },
  };
};
