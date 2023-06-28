import {
  ImgAntarctica,
  ImgAsia,
  ImgCentralAmerica,
  ImgEurope,
  ImgLogo,
  ImgNorthAmerica,
  ImgOceania,
  ImgSouthAmerica,
  ImgAfrica,
  ImgDottedAirplane,
} from '@/res/images';
import { ROUTE_LOGIN, ROUTE_WHERETOTRAVEL } from '@/res/routes';
import destinations from '@/utils/destinations';
import { ArrowDownOutlined, ShareAltOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useResizeObserver from 'use-resize-observer';
import ShareModal from './ShareModal';
import Bubble from './ui/Bubble';
import Container from './ui/Container';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';

const Button = dynamic(() => import('antd').then((module) => module.Button));
const Col = dynamic(() => import('antd').then((module) => module.Col));
const Divider = dynamic(() => import('antd').then((module) => module.Divider));
const Row = dynamic(() => import('antd').then((module) => module.Row));

interface Props {
  visitedDestinations: string[];
  user: any;
  isProfileContext?: boolean;
  onSave?: boolean;
}

const Results: React.FC<Props> = ({
  visitedDestinations,
  user,
  isProfileContext = false,
  onSave = false,
}) => {
  const { t } = useTranslation('common');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { ref, width = 1 } = useResizeObserver<HTMLDivElement>();

  useEffect(() => {
    if (onSave) {
      scrollToResults();
      setTimeout(() => {
        setIsShareModalOpen(true);
      }, 500);
    }
  }, [onSave]);

  function scrollToResults(): void {
    const element = document.getElementById('results');
    if (!element) {
      console.error(`Element with id 'results' not found`);
      return;
    }

    element.scrollIntoView({ behavior: 'smooth' });
  }

  const continentPercentage = (continent: string) => {
    return Math.trunc(
      (visitedDestinations.filter(
        (c) => destinations.find((e) => e.id == c)?.continent == continent,
      ).length /
        destinations.filter((c) => c.continent == continent).length) *
        100,
    );
  };

  const size = () => {
    return width > 1350 ? 150 : width / 9;
  };

  const onShareModalClose = () => {
    setIsShareModalOpen(false);
  };

  return (
    <div
      className="bg-gradient-to-t from-[#8E8EA4] to-[#f5f5f7]"
      ref={ref}
      id="results">
      {isShareModalOpen && (
        <ShareModal
          open={isShareModalOpen}
          onClose={onShareModalClose}
          visitedDestinations={visitedDestinations}
          result={
            Math.trunc(
              (visitedDestinations.length / destinations.length) * 10000,
            ) / 100
          }
        />
      )}
      <Container>
        <Divider>
          <Button
            shape="circle"
            size="large"
            style={{ backgroundColor: 'transparent' }}
            icon={<ArrowDownOutlined />}
            onClick={() => scrollToResults()}
          />
        </Divider>
        <div className="flex align-middle justify-center">
          <ImgLogo />
        </div>
        {isProfileContext ? (
          <div className="flex align-middle justify-center my-3 text-lg font-medium text-center">
            {t('results.result_profile', {
              percentage:
                Math.trunc(
                  (visitedDestinations.length / destinations.length) * 10000,
                ) / 100,
              n: visitedDestinations.length,
              s: visitedDestinations.length > 1 ? 's' : '',
              total: destinations.length,
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center p-4">
            <div className="flex align-middle my-3 mr-3 text-lg font-medium text-center">
              {t('results.result_home', {
                percentage:
                  Math.trunc(
                    (visitedDestinations.length / destinations.length) * 10000,
                  ) / 100,
                n: visitedDestinations.length,
                s: visitedDestinations.length > 1 ? 's' : '',
                total: destinations.length,
              })}
            </div>
            <Button
              type="primary"
              icon={<ShareAltOutlined />}
              onClick={() => setIsShareModalOpen(true)}>
              {t('results.share')}
            </Button>
          </div>
        )}
        <div
          className="sm:py-8 py-4"
          style={{ marginRight: `${size() / 2}px` }}>
          <Row justify="center">
            <Col span={5}>
              <Bubble
                className="mx-auto relative"
                img={ImgAfrica}
                title={t('continents.' + 'Africa')}
                text={continentPercentage('Africa') + '%'}
                size={size()}
              />
            </Col>
            <Col span={5}>
              <Bubble
                className="mx-auto relative"
                img={ImgAntarctica}
                title={t('continents.' + 'Antarctica')}
                text={continentPercentage('Antarctica') + '%'}
                size={size()}
              />
            </Col>
            <Col span={5}>
              <Bubble
                className="mx-auto relative"
                img={ImgAsia}
                title={t('continents.' + 'Asia')}
                text={continentPercentage('Asia') + '%'}
                size={size()}
              />
            </Col>
            <Col span={5}>
              <Bubble
                className="mx-auto relative"
                img={ImgCentralAmerica}
                title={t('continents.' + 'Central America')}
                text={continentPercentage('Central America') + '%'}
                size={size()}
              />
            </Col>
          </Row>
          <Row
            justify="center"
            style={{ height: `${size()}px` }}
            className="sm:mt-0 mt-4">
            <Col span={5}>
              <Bubble
                style={{ right: `-${size() / 2}px` }}
                className="absolute"
                img={ImgEurope}
                title={t('continents.' + 'Europe')}
                text={continentPercentage('Europe') + '%'}
                size={size()}
              />
            </Col>
            <Col span={5}>
              <Bubble
                style={{ right: `-${size() / 2}px` }}
                className="absolute"
                img={ImgNorthAmerica}
                title={t('continents.' + 'North America')}
                text={continentPercentage('North America') + '%'}
                size={size()}
              />
            </Col>
            <Col span={5}>
              <Bubble
                style={{ right: `-${size() / 2}px` }}
                className="absolute"
                img={ImgOceania}
                title={t('continents.' + 'Oceania')}
                text={continentPercentage('Oceania') + '%'}
                size={size()}
              />
            </Col>
            <Col span={5}>
              <Bubble
                style={{ right: `-${size() / 2}px` }}
                className="absolute"
                img={ImgSouthAmerica}
                title={t('continents.' + 'South America')}
                text={continentPercentage('South America') + '%'}
                size={size()}
              />
            </Col>
          </Row>
        </div>
      </Container>
      {!user && !isProfileContext && (
        <div className="justify-center">
          <div className="flex align-middle justify-center mt-3 text-lg font-medium text-center px-4">
            {t('results.create_text')}
          </div>
          <div>
            <Link href={ROUTE_LOGIN} className="w-[280px] contents">
              <button className="hover:bg-[#92638C] py-[14px] w-[280px] rounded-full font-medium bg-[#865B81] mt-4 text-white mx-auto block">
                {t('results.Create an account')}
              </button>
            </Link>
          </div>
        </div>
      )}
      {!isProfileContext && (
        <div className="sm:my-8 my-4 justify-center">
          <div>
            <ImgDottedAirplane className="m-auto" />
            <Link href={ROUTE_WHERETOTRAVEL} className="w-[300px] contents">
              <button className="hover:bg-[#92638C] py-[14px] w-[300px] rounded-full font-medium bg-[#865B81] mt-4 text-white mx-auto block">
                {t('results.Find your next destination')}
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
