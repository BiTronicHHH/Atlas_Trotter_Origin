import { GetServerSideProps } from 'next';
import { getServerSideSitemapLegacy } from 'next-sitemap';

import { getDestinations } from '@/api/destination';

import {
  ROUTE_LOGIN,
  ROUTE_PRIVACY,
  ROUTE_TERMS,
  ROUTE_WHERETOTRAVEL,
} from '@/res/routes';
import DestinationLight from '@/types/DestinationLight';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let destinations = null;

  const staticUrlList = [ROUTE_LOGIN, ROUTE_PRIVACY, ROUTE_TERMS];

  const highPriorityUrlList = ['/', ROUTE_WHERETOTRAVEL];

  const staticFields = staticUrlList.map((url) => ({
    loc: `https://atlastrotter.com${url}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: '0.7',
    alternateRefs: [
      {
        rel: 'alternate',
        href: `https://atlastrotter.com/fr${url}`,
        hreflang: 'fr',
      },
    ],
  }));

  const highPriorityFields = highPriorityUrlList.map((url) => ({
    loc: `https://atlastrotter.com${url}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: '1.0',
    alternateRefs: [
      {
        rel: 'alternate',
        href: `https://atlastrotter.com/fr${url}`,
        hreflang: 'fr',
      },
    ],
  }));

  try {
    destinations = await getDestinations();
  } catch (error) {
    console.log(error);
  }

  const destinationFields = (destinations || []).map(
    (dest: DestinationLight) => ({
      loc: `https://atlastrotter.com/wheretotravel/${dest.ticker}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: '0.7',
      alternateRefs: [
        {
          rel: 'alternate',
          href: `https://atlastrotter.com/fr/wheretotravel/${dest.ticker}`,
          hreflang: 'fr',
        },
      ],
    }),
  );

  const allFields = [
    ...highPriorityFields,
    ...staticFields,
    ...destinationFields,
  ];

  return getServerSideSitemapLegacy(ctx, allFields);
};

// Default export to prevent next.js errors

// eslint-disable-next-line @typescript-eslint/no-empty-function
export default () => {};
