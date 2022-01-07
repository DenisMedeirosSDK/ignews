import Head from 'next/head';
import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | ig news</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>29 de janeiro de 2022</time>
            <strong>Axios - um cliente HTTP Full Stack</strong>
            <p>
              Axios é um cliente HTTP baseado em Promises para fazer
              requisições. Pode ser utilizado tanto no navegador quando no
              Node.js. É um projeto open source, disponível no Github, tem 77
              mil stars e 7 mil forks! Muito utilizado e está sendo bem mantido
              pela comunidade.
            </p>
          </a>
          <a href="#">
            <time>29 de janeiro de 2022</time>
            <strong>Axios - um cliente HTTP Full Stack</strong>
            <p>
              Axios é um cliente HTTP baseado em Promises para fazer
              requisições. Pode ser utilizado tanto no navegador quando no
              Node.js. É um projeto open source, disponível no Github, tem 77
              mil stars e 7 mil forks! Muito utilizado e está sendo bem mantido
              pela comunidade.
            </p>
          </a>
          <a href="#">
            <time>29 de janeiro de 2022</time>
            <strong>Axios - um cliente HTTP Full Stack</strong>
            <p>
              Axios é um cliente HTTP baseado em Promises para fazer
              requisições. Pode ser utilizado tanto no navegador quando no
              Node.js. É um projeto open source, disponível no Github, tem 77
              mil stars e 7 mil forks! Muito utilizado e está sendo bem mantido
              pela comunidade.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
