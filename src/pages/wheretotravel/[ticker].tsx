import { getDestinationByTicker } from '@/api/destination';
import Container from '@/components/ui/Container';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { IconCar, IconHotel, IconPlane, IconSimCard } from '@/res/icons';
import { ROUTE_HOME, ROUTE_WHERETOTRAVEL } from '@/res/routes';
import DestinationFull from '@/types/DestinationFull';
import destinationImageOwner from '@/utils/destinationImageOwner';
import { HomeOutlined, InstagramOutlined } from '@ant-design/icons';
import { NextPageContext } from 'next';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Col = dynamic(() => import('antd').then((module) => module.Col));
const Breadcrumb = dynamic(() =>
  import('antd').then((module) => module.Breadcrumb),
);
const Space = dynamic(() => import('antd').then((module) => module.Space));

const Tag = dynamic(() => import('antd').then((module) => module.Tag));
const Row = dynamic(() => import('antd').then((module) => module.Row));

const Activities = dynamic(() => import('@/components/Activities'));
const Cost = dynamic(() => import('@/components/Cost'));
const FlightSearch = dynamic(() => import('@/components/FlightSearch'));
const Period = dynamic(() => import('@/components/Period'));
const Security = dynamic(() => import('@/components/Security'));
const UsefulInfo = dynamic(() => import('@/components/UsefulInfo'));
const Plug = dynamic(() => import('@/components/Plug'));
const GetYourGuideActivities = dynamic(
  () => import('@/components/GetYourGuideActivities'),
);

interface Props {
  destination: DestinationFull;
}

const ProfilePage: React.FC<Props> = ({ destination }) => {
  const { lang } = useTranslation();
  const { t } = useTranslation('destinationPage');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const breadcrumbItems = [
    {
      href: ROUTE_HOME,
      title: <HomeOutlined />,
    },
    {
      href: (lang == 'fr' ? '/' + lang : '') + ROUTE_WHERETOTRAVEL,
      title: t('Destination List'),
    },
    {
      title: t('destinations:' + destination.name),
    },
  ];

  return (
    <>
      <NextSeo
        title={t('seo_titles.pattern_' + destination.description, {
          destination: t('destinations:' + destination.name),
        })}
        description={t('seo_descriptions.pattern_' + destination.description, {
          destination: t('destinations:' + destination.name),
        })}
      />
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="w-full h-[400px] flex items-center relative">
            <img
              className="absolute w-full h-full"
              src={`/destinations/${destination.idDestination}.jpg`}
              alt={t('Destination')}
              style={{
                objectFit: 'cover',
                filter: 'blur(6px)',
              }}
            />
            <div className="h-[400px] absolute w-full overflow-hidden flex items-center justify-center">
              <div className="h-[400px] w-[600px] relative">
                <img
                  className="shadow absolute w-full h-full"
                  src={`/destinations/${destination.idDestination}.jpg`}
                  alt={t('Destination')}
                  style={{
                    objectFit: 'cover',
                  }}
                />
                <div
                  className="w-full text-white absolute top-[50%] transform -translate-y-1/2 text-center"
                  style={{
                    textShadow: '0 0 6px #000',
                  }}>
                  <h1 className="w-[300px] inline-block text-4xl font-bold">
                    {t('destinations:' + destination.name)}
                  </h1>
                </div>
              </div>
            </div>
            <div
              className="absolute w-full h-[400px] text-right flex flex-col justify-end"
              style={{
                textShadow: '0 0 6px #000',
              }}>
              {destinationImageOwner(destination.idDestination) != '' && (
                <div className="pb-1">
                  <Link
                    href={`https://instagram.com/${destinationImageOwner(
                      destination.idDestination,
                    )}`}
                    target="_blank">
                    <Tag icon={<InstagramOutlined />} color="transparent">
                      {t('Picture by')} @
                      {destinationImageOwner(destination.idDestination)}
                    </Tag>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="w-full h-[40px] border-b border-[#e1e1eb] text-base flex items-center justify-center bg-white text-center">
            <Space className="max-w-[1250px]" size={20}>
              <div>
                <Link href="https://trip.tp.st/4NjLscaZ" target="_blank">
                  <label className="cursor-pointer flex items-center text-[#9C6D96] fill-[#9C6D96] hover:text-[#BD9EB9] hover:fill-[#BD9EB9]">
                    <IconPlane className="mr-1" />
                    {t('Flights')}
                  </label>
                </Link>
              </div>
              <div>
                <Link href="https://trip.tp.st/4NjLscaZ" target="_blank">
                  <label className="cursor-pointer flex items-center text-[#9C6D96] fill-[#9C6D96] hover:text-[#BD9EB9] hover:fill-[#BD9EB9]">
                    <IconHotel className="mr-1" />
                    {t('Hotels')}
                  </label>
                </Link>
              </div>
              <div>
                <Link
                  href="https://discovercars.tp.st/BTYpSCe5"
                  target="_blank">
                  <label className="cursor-pointer flex items-center text-[#9C6D96] fill-[#9C6D96] hover:text-[#BD9EB9] hover:fill-[#BD9EB9]">
                    <IconCar className="mr-1" />
                    {t('Cars')}
                  </label>
                </Link>
              </div>
              <div>
                <Link href="https://tp.st/P5s6ZZTL" target="_blank">
                  <label className="cursor-pointer flex items-center text-[#9C6D96] fill-[#9C6D96] hover:text-[#BD9EB9] hover:fill-[#BD9EB9]">
                    <IconSimCard className="mr-1" />
                    {t('eSIM')}
                  </label>
                </Link>
              </div>
            </Space>
          </div>

          <Container>
            <div className="mt-2 p-2">
              <Breadcrumb items={breadcrumbItems} />
            </div>

            <Row className="flex flex-wrap">
              <Col xs={24} sm={24} md={12} lg={8} xl={8} className="p-2">
                <Security securityLevel={destination.security} />
              </Col>
              <Col xs={24} sm={24} md={12} lg={8} xl={8} className="p-2">
                <Activities categories={destination.categories} />
              </Col>
              <Col xs={24} sm={24} md={12} lg={8} xl={8} className="p-2">
                <Period period={destination.period} />
              </Col>
              <Col xs={24} sm={24} md={12} lg={8} xl={8} className="p-2">
                <Cost cost={destination.cost} costRate={destination.costRate} />
              </Col>
              <Col xs={24} sm={24} md={12} lg={8} xl={8} className="p-2">
                <Plug
                  plugtype={destination.plugtype}
                  voltage={destination.voltage}
                  freq={destination.freq}
                  lang={lang}
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={8} xl={8} className="p-2">
                <UsefulInfo
                  id={destination.idDestination}
                  timezone={destination.timezone}
                  summertime={destination.summertime}
                  summerstart={destination.summerstart}
                  summerend={destination.summerend}
                  currency={destination.currency}
                  language={destination.language}
                />
              </Col>
              <Col xs={24} className="p-2 mb-2">
                <FlightSearch destination={destination.name} lang={lang} />
              </Col>
              {destination.getYourGuideId &&
                destination.getYourGuideId != '' && (
                  <Col xs={24} className="p-2 mb-2">
                    <GetYourGuideActivities
                      getYourGuideId={destination.getYourGuideId}
                      lang={lang}
                    />
                  </Col>
                )}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const { ticker } = ctx.query;

  let destination = null;

  try {
    destination = await getDestinationByTicker(ticker as string);
  } catch (e) {
    return;
  }

  if (!destination) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      destination,
    },
  };
}

export default ProfilePage;
