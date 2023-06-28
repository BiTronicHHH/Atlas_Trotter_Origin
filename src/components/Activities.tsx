import categoryLabel from '@/utils/categoryLabel';
import React from 'react';
import CategoryIcon from './CategoryIcon';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';

const Card = dynamic(() => import('antd').then((module) => module.Card));
const Col = dynamic(() => import('antd').then((module) => module.Col));
const Row = dynamic(() => import('antd').then((module) => module.Row));

interface Props {
  categories: string[];
}

const Activities: React.FC<Props> = ({ categories }) => {
  const { t } = useTranslation('destinationPage');

  const renderDesc = () => {
    const labelList = categories.map((c) =>
      t('activities.labels.' + categoryLabel(c)),
    );

    const start = t('activities.start_desc');

    if (labelList.length == 1) {
      return `${start}${labelList[0]}.`;
    } else {
      const twoLast: string[] = labelList.slice(-2);
      const rest: string[] = labelList.slice(0, -2);
      return `${start}${rest.join(', ')}${rest.length > 0 ? ', ' : ''}${
        twoLast[0]
      } ${t('activities.and')} ${twoLast[1]}.`;
    }
  };

  return (
    <Card title={t('activities.Main activities')} className="h-full">
      <p className="mb-2">{renderDesc()}</p>
      <Row justify="center" className="max-w-[80%] mx-auto my-4 h-[80px]">
        {categories.map((cat, index) => {
          return (
            <Col span={6} key={'cat-' + index} className="mb-2">
              <div className="flex justify-center">
                <CategoryIcon category={cat} />
              </div>
            </Col>
          );
        })}
      </Row>
    </Card>
  );
};

export default Activities;
