import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';

import * as prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import { getPrimiscClient } from '../../services/prismic';
import styles from './styles.module.scss';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};
interface PostsProps {
  posts: Post[];
}

interface Response {
  uid: string;
  last_publication_date: string;
  data: {
    title: [
      {
        type: string;
        text: string;
        spans?: [];
      }
    ];
    content: [
      {
        type: string;
        text: string;
        spans?: [];
      }
    ];
  };
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | ig news</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link key={post.slug} href={`/posts/preview/${post.slug}`}>
              <a key={post.slug}>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismicClient = getPrimiscClient();

  const documents = await prismicClient.get({
    predicates: prismic.predicates.at('document.type', 'publication'),
    fetch: ['publication.title', 'publication.content'],
    pageSize: 10,
  });

  const posts = documents.results.map(post => {
    const findParagraph = post as unknown as Response;

    const paragraph =
      findParagraph.data.content.find(content => content.type === 'paragraph')
        ?.text ?? '';

    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: paragraph,
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }
      ),
    };
  });

  return {
    props: { posts },
  };
};
