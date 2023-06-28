import { getUserDestinations } from '@/api/user';
import Container from '@/components/ui/Container';
import { auth } from '@/lib/firebase';
import { ROUTE_WHERETOTRAVEL } from '@/res/routes';
import Category from '@/types/Category';
import continents from '@/utils/continents';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import diacriticless from 'diacriticless';
import { NextSeo } from 'next-seo';
import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getCategories, getDestinations } from '../../api/destination';
import DestinationLight from '../../types/DestinationLight';
import useTranslation from 'next-translate/useTranslation';
import { Badge, MenuProps } from 'antd';

const Button = dynamic(() => import('antd').then((module) => module.Button));
const Card = dynamic(() => import('antd').then((module) => module.Card));
const Checkbox = dynamic(() =>
  import('antd').then((module) => module.Checkbox),
);
const Col = dynamic(() => import('antd').then((module) => module.Col));
const Dropdown = dynamic(() =>
  import('antd').then((module) => module.Dropdown),
);
const Input = dynamic(() => import('antd').then((module) => module.Input));

const Pagination = dynamic(() =>
  import('antd').then((module) => module.Pagination),
);
const Row = dynamic(() => import('antd').then((module) => module.Row));

interface Props {
  categories: Category[];
  destinations: DestinationLight[];
}

const WhereToTravelPage: React.FC<Props> = ({ categories, destinations }) => {
  const { t } = useTranslation('wheretotravel');
  const { lang } = useTranslation();
  const [user, loading] = useAuthState(auth);
  const [hideVisitedDestinations, setHideVisitedDestinations] = useState(false);
  const [visitedDestinations, setVisitedDestinations] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomedDestination, setZoomedDestination] = useState('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedContinents, setSelectedContinents] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<number[]>([]);

  const itemsPerPage = 12;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const scriptContainerRef = useRef<HTMLDivElement>(null);

  const filteredDestinations = destinations.filter(
    (destination) =>
      (selectedContinents.length == 0 ||
        selectedContinents.includes(destination.continent)) &&
      (selectedCategories.length == 0 ||
        selectedCategories.every((element) =>
          destination.categories.includes(element),
        )) &&
      (selectedPeriod.length == 0 ||
        selectedPeriod.some((item) => destination.period.includes(item))) &&
      (diacriticless(
        t('destinations:' + destination.name).toLowerCase(),
      ).includes(searchTerm) ||
        t('destinations:' + destination.name)
          .toLowerCase()
          .includes(searchTerm)),
  );

  const currentItems = filteredDestinations
    .filter(
      (d) =>
        !hideVisitedDestinations ||
        !visitedDestinations.includes(d.idDestination),
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    async function fetchUserDestinations() {
      const connectedUserDestinations = await getUserDestinations();
      if (connectedUserDestinations) {
        setVisitedDestinations(connectedUserDestinations);
      } else {
        const visitedDestionationsFromCache = localStorage.getItem(
          'visitedDestinations',
        );

        if (visitedDestionationsFromCache) {
          setVisitedDestinations(JSON.parse(visitedDestionationsFromCache));
        }
      }
    }

    if (user) {
      fetchUserDestinations();
    } else if (!loading) {
      const visitedDestionationsFromCache = localStorage.getItem(
        'visitedDestinations',
      );

      if (visitedDestionationsFromCache) {
        setVisitedDestinations(JSON.parse(visitedDestionationsFromCache));
      }
    }
  }, [loading, user]);

  useEffect(() => {
    const ref = scriptContainerRef.current;
    const script = document.createElement('script');
    script.setAttribute('data-affilid', 'atlastrotterwidget1');
    script.setAttribute('data-results-only', 'true');
    script.setAttribute('data-tile-limit', '10');
    script.setAttribute('data-limit', '3');
    script.setAttribute('data-lang', lang);
    script.setAttribute('data-background-primary-color', 'f5f5f7');
    script.setAttribute('data-background-secondary-color', 'f5f5f7');
    script.src = 'https://widgets.kiwi.com/scripts/widget-search-iframe.js';
    script.async = true;

    if (ref) {
      ref.appendChild(script);
    }

    return () => {
      if (ref) {
        ref.removeChild(script);
      }
    };
  }, [lang]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToList();
  };

  const handleDestinationClick = (destination: DestinationLight) => {
    const url = `${lang == 'fr' ? '/' + lang : ''}${ROUTE_WHERETOTRAVEL}/${
      destination.ticker
    }`;
    window.open(url, '_blank');
  };

  function scrollToList(): void {
    const element = document.getElementById('destinationsList');
    if (!element) {
      console.error(`Element with id 'destinationsList' not found`);
      return;
    }

    element.scrollIntoView({ behavior: 'smooth' });
  }

  const handleSearch = (value: string) => {
    if (currentPage != 1) setCurrentPage(1);
    setSearchTerm(value.toLowerCase());
  };

  const handleContinentSelection = (continent: string) => {
    if (currentPage != 1) setCurrentPage(1);
    setSelectedContinents((prevSelectedContinents: string[]) => {
      if (prevSelectedContinents.includes(continent)) {
        return prevSelectedContinents.filter((c) => c !== continent);
      } else {
        return [...prevSelectedContinents, continent];
      }
    });
  };

  const handleCategorySelection = (category: number) => {
    if (currentPage != 1) setCurrentPage(1);
    setSelectedCategories((prevSelectedCategories: number[]) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter((c) => c !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };

  const handlePeriodSelection = (month: number) => {
    if (currentPage != 1) setCurrentPage(1);
    setSelectedPeriod((prevSelectedPeriod: number[]) => {
      if (prevSelectedPeriod.includes(month)) {
        return prevSelectedPeriod.filter((m) => m !== month);
      } else {
        return [...prevSelectedPeriod, month];
      }
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedContinents([]);
    setSelectedPeriod([]);
  };

  const continentItems: MenuProps['items'] = continents.map(
    (continent, index) => ({
      label: (
        <div onClick={(e) => e?.stopPropagation()}>
          <Checkbox
            className="w-full"
            style={{ padding: '5px 12px' }}
            key={'cont-' + index}
            checked={selectedContinents.includes(continent)}
            onChange={() => handleContinentSelection(continent)}>
            {t('common:continents.' + continent)}
          </Checkbox>
        </div>
      ),
      key: index,
    }),
  );

  const activitiesItems: MenuProps['items'] = categories.map(
    (category, index) => ({
      label: (
        <div onClick={(e) => e?.stopPropagation()}>
          <Checkbox
            className="w-full"
            style={{ padding: '5px 12px' }}
            key={'cat-' + index}
            checked={selectedCategories.includes(category.idCategory)}
            onChange={() => handleCategorySelection(category.idCategory)}>
            {t('common:categories.' + category.name)}
          </Checkbox>
        </div>
      ),
      key: index,
    }),
  );

  const periodItems: MenuProps['items'] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ].map((month, index) => ({
    label: (
      <div onClick={(e) => e?.stopPropagation()}>
        <Checkbox
          className="w-full"
          style={{ padding: '5px 12px' }}
          key={'period-' + index}
          checked={selectedPeriod.includes(index + 1)}
          onChange={() => handlePeriodSelection(index + 1)}>
          {t('common:months.' + month)}
        </Checkbox>
      </div>
    ),
    key: index,
  }));

  return (
    <>
      <NextSeo
        title={t('title')}
        description={t('description')}
        openGraph={{
          url: 'https://atlastrotter.com/wheretotravel',
          title: 'Atlas Trotter',
          images: [
            {
              url: 'https://atlastrotter.com/shareImg.jpg',
              alt: 'twitter:image',
            },
          ],
          description: t('description'),
          site_name: 'Atlas Trotter',
        }}
        twitter={{
          handle: '@AtlasTrotterCom',
          site: 'https://atlastrotter.com/wheretotravel',
          cardType: 'summary_large_image',
        }}
      />
      <div className="h-[400px] w-full relative">
        <img
          src="/wtt_bg.jpg"
          className="w-full h-full"
          alt={'Banner background'}
          style={{
            objectFit: 'cover',
          }}
        />
        <div
          className="absolute w-full h-full text-white top-0"
          style={{
            textShadow: '0 0 6px #000',
          }}>
          <div className="max-w-[1250px] w-full p-4 mx-auto h-full">
            <div className="w-[70%] justify-center flex flex-col h-full">
              <h1 className="text-2xl sm:text-4xl font-bold sm:mb-5 mb-2">
                {t('Where to travel')}
              </h1>
              <h2 className="text-base sm:text-lg font-normal">
                {t('description')}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <Container>
        <div className="my-4" id="destinationsList">
          <Row className="flex flex-wrap items-center gap-3 py-2">
            <Col className="flex items-center" xs={24} md={8}>
              <Input
                addonBefore={<SearchOutlined />}
                placeholder={t('Search destinations')}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Col>
            <Row className="gap-1">
              <Dropdown
                menu={{ items: continentItems }}
                trigger={['hover']}
                className="w-[125px]">
                <Button icon={<FilterOutlined />}>{t('Continents')}</Button>
              </Dropdown>
              <Dropdown
                menu={{ items: activitiesItems }}
                trigger={['hover']}
                className="w-[125px]">
                <Button icon={<FilterOutlined />}>{t('Activities')}</Button>
              </Dropdown>
              <Dropdown
                menu={{ items: periodItems }}
                trigger={['hover']}
                className="w-[125px]">
                <Button icon={<FilterOutlined />}>{t('Best period')}</Button>
              </Dropdown>
            </Row>
            <label
              className="cursor-pointer text-blue-500"
              onClick={clearFilters}>
              {t('Clear filters')}
            </label>
            {visitedDestinations.length > 0 && (
              <Checkbox
                className="ml-auto"
                onChange={() =>
                  setHideVisitedDestinations(!hideVisitedDestinations)
                }
                checked={hideVisitedDestinations}>
                {t('Hide visited destinations')}
              </Checkbox>
            )}
          </Row>
          <Row
            gutter={[16, 16]}
            className="my-4 justify-center md:justify-start">
            {currentItems.length == 0 && (
              <div className="h-[300px] w-full text-2xl font-bold flex justify-center items-center">
                {t('No destination found')}
              </div>
            )}
            {currentItems.map((destination) => {
              const card = (
                <Card
                  onMouseEnter={() =>
                    setZoomedDestination(destination.idDestination)
                  }
                  onMouseLeave={() => setZoomedDestination('')}
                  style={{
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    height: '210px',
                    border: 0,
                  }}
                  onClick={() => handleDestinationClick(destination)}
                  className="relative">
                  <div className="absolute inset-0 overflow-hidden rounded">
                    <img
                      src={`/destinations/small/${destination.idDestination}.jpg`}
                      loading="lazy"
                      alt={t('destinations:' + destination.name)}
                      className={`object-cover rounded transition-all w-full h-full duration-500 ${
                        destination.idDestination == zoomedDestination
                          ? 'scale-125'
                          : ''
                      }`}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3
                      className="text-white text-2xl font-bold text-center p-2"
                      style={{
                        textShadow: '0 0 6px #000',
                      }}>
                      {t('destinations:' + destination.name)}
                    </h3>
                  </div>
                </Card>
              );

              return (
                <Col
                  xs={12}
                  sm={12}
                  md={8}
                  lg={6}
                  key={destination.idDestination}>
                  {visitedDestinations.includes(destination.idDestination) ? (
                    <Badge.Ribbon text={t('Visited')} color="green">
                      {card}
                    </Badge.Ribbon>
                  ) : (
                    card
                  )}
                </Col>
              );
            })}
          </Row>
          {filteredDestinations.length > itemsPerPage && (
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={filteredDestinations.length}
              onChange={handlePageChange}
              showSizeChanger={false}
              className="flex justify-end"
            />
          )}
        </div>
      </Container>
      <div
        ref={scriptContainerRef}
        id="widget-holder"
        className="max-w-[1300px] w-full mx-auto"></div>
    </>
  );
};

export async function getServerSideProps() {
  let categories = null;
  let destinations = null;

  try {
    categories = await getCategories();
    destinations = await getDestinations();
  } catch (e) {
    return;
  }

  return {
    props: {
      categories,
      destinations,
    },
  };
}

export default WhereToTravelPage;
