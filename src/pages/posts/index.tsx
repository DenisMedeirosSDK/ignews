import { GetStaticProps } from 'next';
import Head from 'next/head';
import * as prismic from '@prismicio/client';
import { PrismicDocument } from '@prismicio/types';
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

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | ig news</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <a key={post.slug} href="#">
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
            </a>
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
    return {
      slug: post.id,
      title: RichText.asText(post.data.title),
      excerpt:
        post.data.content.find(content => content.type === 'paragraph')?.text ??
        '',
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
