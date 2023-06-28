import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import React from 'react';

const Card = dynamic(() => import('antd').then((module) => module.Card));
const Rate = dynamic(() => import('antd').then((module) => module.Rate));
const Space = dynamic(() => import('antd').then((module) => module.Space));

interface Props {
  cost: number;
  costRate: number;
}

const Cost: React.FC<Props> = ({ cost, costRate }) => {
  const { t } = useTranslation('destinationPage');
  return (
    <Card
      title={
        <Space>
          {t('cost.Budget')}
          <Rate
            character="$"
            allowHalf
            style={{ fontSize: 16 }}
            disabled
            defaultValue={costRate}
          />
        </Space>
      }
      className="h-full">
      <div className="w-full text-center font-bold text-3xl mb-6">
        {cost}
        {t('cost.€')} / {t('cost.day')}
      </div>
      <p>{t('cost.component_desc')}</p>
    </Card>
  );
};

export default Cost;
