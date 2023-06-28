import { getUserDestinations } from '@/api/user';
import Container from '@/components/ui/Container';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { auth } from '@/lib/firebase';
import { NextSeo } from 'next-seo';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { updateVisitedDestinations } from '../api/user';
import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';

const Map = dynamic(() => import('@/components/Map'));
const Results = dynamic(() => import('@/components/Results'));
const DestinationsModal = dynamic(
  () => import('@/components/DestinationsModal'),
);

const HomePage = () => {
  const { t } = useTranslation('home');
  const [user, loading] = useAuthState(auth);
  const [visitedDestinations, setVisitedDestinations] = useState<string[]>([]);
  const [loadingMap, setLoadingMap] = useState(false);
  const [isDestinationsModalVisible, setIsDestinationsModalVisible] =
    useState(false);
  const [onSave, setOnSave] = useState(false);

  useEffect(() => {
    async function fetchUserDestinations() {
      const connectedUserDestinations = await getUserDestinations();
      if (connectedUserDestinations) {
        setVisitedDestinations(connectedUserDestinations);
        localStorage.setItem(
          'visitedDestinations',
          JSON.stringify(connectedUserDestinations),
        );
      } else {
        const visitedDestionationsFromCache = localStorage.getItem(
          'visitedDestinations',
        );

        if (visitedDestionationsFromCache) {
          setVisitedDestinations(JSON.parse(visitedDestionationsFromCache));
        }
      }
      setLoadingMap(false);
    }

    setLoadingMap(true);
    if (user) {
      fetchUserDestinations();
    } else if (!loading) {
      const visitedDestionationsFromCache = localStorage.getItem(
        'visitedDestinations',
      );

      if (visitedDestionationsFromCache) {
        setVisitedDestinations(JSON.parse(visitedDestionationsFromCache));
      }
      setLoadingMap(false);
    }
  }, [loading, user]);

  const handleOpenDestinationsModal = () => {
    setIsDestinationsModalVisible(true);
  };

  const handleCloseDestinationsModal = (
    saved: boolean,
    selectedDestinations: string[],
  ) => {
    if (saved) {
      const prevVisitedDestinations = visitedDestinations;
      if (user && selectedDestinations != visitedDestinations) {
        updateVisitedDestinations(selectedDestinations);
      }
      setVisitedDestinations(selectedDestinations);
      localStorage.setItem(
        'visitedDestinations',
        JSON.stringify(selectedDestinations),
      );

      if (
        selectedDestinations.length > 0 &&
        prevVisitedDestinations.length == 0
      ) {
        setOnSave(true);
      }
    }
    setIsDestinationsModalVisible(false);
  };

  return (
    <>
      <NextSeo
        title={`Atlas Trotter - ${t('Fill your map')}`}
        description={t('seo_description')}
        openGraph={{
          url: 'https://atlastrotter.com',
          title: 'Atlas Trotter',
          images: [
            {
              url: 'https://atlastrotter.com/mapShareImg.jpg',
              alt: 'twitter:image',
            },
          ],
          description: t('seo_description'),
          site_name: 'Atlas Trotter',
        }}
        twitter={{
          handle: '@AtlasTrotterCom',
          site: 'https://atlastrotter.com',
          cardType: 'summary_large_image',
        }}
      />
      <>
        {isDestinationsModalVisible && (
          <DestinationsModal
            open={isDestinationsModalVisible}
            onClose={handleCloseDestinationsModal}
            visitedDestinations={visitedDestinations}
          />
        )}
        <Container>
          <h1 className="text-center text-2xl font-bold px-4 mt-6">
            {t('discover')}
          </h1>
          <button
            className="bg-[#FFC847] hover:bg-[#FFD470] py-[10px] w-[200px] rounded-full font-medium text-white mx-auto block mb-6 mt-1"
            onClick={handleOpenDestinationsModal}>
            {t('Fill your map')}
          </button>
          {loading || loadingMap ? (
            <div className="h-[calc(100vh-200px)]">
              <LoadingScreen />
            </div>
          ) : (
            <Map visitedDestinations={visitedDestinations} />
          )}
        </Container>
        {!loading && !loadingMap && (
          <Results
            visitedDestinations={visitedDestinations}
            user={user}
            onSave={onSave}
          />
        )}
      </>
    </>
  );
};

export default HomePage;
