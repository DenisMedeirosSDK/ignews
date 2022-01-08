import * as prismic from '@prismicio/client';

const routes = [
  {
    type: 'page',
    path: '/:uid',
  },
];

export function getPrimiscClient(req?: unknown) {
  const repoName = 'ignews-dm';
  const endpoint = prismic.getEndpoint(repoName);
  const client = prismic.createClient(endpoint, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  client.enableAutoPreviewsFromReq(req);

  return client;
}
