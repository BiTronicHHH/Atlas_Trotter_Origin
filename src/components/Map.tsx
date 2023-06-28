import { ROUTE_WHERETOTRAVEL } from '@/res/routes';
import defaultMapColors from '@/utils/defaultMapColors';
import { getNameFromId, getTickerFromId } from '@/utils/destinationHelpers';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const Tooltip = dynamic(() => import('antd').then((module) => module.Tooltip));

interface Props {
  visitedDestinations: string[];
  visitedColor1?: string;
  visitedColor2?: string;
  visitedColor3?: string;
  notVisitedColor1?: string;
  notVisitedColor2?: string;
  notVisitedColor3?: string;
  colorBorders?: string;
  isClickable?: boolean;
}

const Map: React.FC<Props> = ({
  visitedDestinations,
  visitedColor1 = '',
  visitedColor2 = '',
  visitedColor3 = '',
  notVisitedColor1 = '',
  notVisitedColor2 = '',
  notVisitedColor3 = '',
  colorBorders = '',
  isClickable = true,
}) => {
  const { lang } = useTranslation();
  const { t } = useTranslation('destinations');

  const handleClick = (id: string) => {
    const url = `${
      lang == 'fr' ? '/' + lang : ''
    }${ROUTE_WHERETOTRAVEL}/${getTickerFromId(id)}`;
    window.open(url, '_blank');
  };

  return (
    <ComposableMap
      projectionConfig={{ scale: 150, center: [0, 7] }}
      width={800}
      height={360}>
      <linearGradient id="gradientNotVisited" x2="1" y2="1">
        <stop
          offset="0%"
          stopColor={
            notVisitedColor1 != ''
              ? notVisitedColor1
              : defaultMapColors.notVisitedColor1
          }
        />
        <stop
          offset="50%"
          stopColor={
            notVisitedColor2 != ''
              ? notVisitedColor2
              : defaultMapColors.notVisitedColor2
          }
        />
        <stop
          offset="100%"
          stopColor={
            notVisitedColor3 != ''
              ? notVisitedColor3
              : defaultMapColors.notVisitedColor3
          }
        />
      </linearGradient>
      <linearGradient id="gradientVisited" x2="1" y2="1">
        <stop
          offset="0%"
          stopColor={
            visitedColor1 != '' ? visitedColor1 : defaultMapColors.visitedColor1
          }
        />
        <stop
          offset="50%"
          stopColor={
            visitedColor2 != '' ? visitedColor2 : defaultMapColors.visitedColor2
          }
        />
        <stop
          offset="100%"
          stopColor={
            visitedColor3 != '' ? visitedColor3 : defaultMapColors.visitedColor3
          }
        />
      </linearGradient>
      <Geographies geography="/mapdata.json">
        {({ geographies }: any) =>
          geographies.map((geo: any) => {
            const isVisited = visitedDestinations.find((c) => c === geo.id);
            return isClickable ? (
              <Tooltip
                title={t(getNameFromId(geo.id))}
                key={geo.id}
                destroyTooltipOnHide
                arrow={false}>
                <Geography
                  className="outline-none"
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleClick(geo.id)}
                  fill={
                    isVisited
                      ? "url('#gradientVisited')"
                      : "url('#gradientNotVisited')"
                  }
                  stroke={
                    colorBorders != ''
                      ? colorBorders
                      : defaultMapColors.colorBorders
                  }
                  strokeWidth={0.2}
                  style={{
                    default: { cursor: 'pointer' },
                    hover: { fill: '#4472CA', cursor: 'pointer' },
                  }}
                />
              </Tooltip>
            ) : (
              <Geography
                className="outline-none"
                key={geo.rsmKey}
                geography={geo}
                fill={
                  isVisited
                    ? "url('#gradientVisited')"
                    : "url('#gradientNotVisited')"
                }
                stroke={
                  colorBorders != ''
                    ? colorBorders
                    : defaultMapColors.colorBorders
                }
                strokeWidth={0.2}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default Map;
