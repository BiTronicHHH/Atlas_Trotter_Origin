import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';

const Card = dynamic(() => import('antd').then((module) => module.Card));

interface Props {
  securityLevel: number;
}

const Security: React.FC<Props> = ({ securityLevel }) => {
  const { t } = useTranslation('destinationPage');

  const renderDesc = () => {
    switch (securityLevel) {
      case 1:
        return (
          <>
            <span className="font-bold">{t('security.bold_level_1')}</span>
            {t('security.desc_level_1')}
          </>
        );
      case 2:
        return (
          <>
            <span className="font-bold">{t('security.bold_level_2')}</span>
            {t('security.desc_level_2')}
          </>
        );
      case 3:
        return (
          <>
            <span className="font-bold">{t('security.bold_level_3')}</span>
            {t('security.desc_level_3')}
          </>
        );
      default:
        return '';
    }
  };

  const renderColor = () => {
    switch (securityLevel) {
      case 1:
        return (
          <div className="w-5 h-5 rounded-full bg-[#A6E538] inline-block ml-2" />
        );
      case 2:
        return (
          <div className="w-5 h-5 rounded-full bg-[#f5b246] inline-block ml-2" />
        );
      case 3:
        return (
          <div className="w-5 h-5 rounded-full bg-[#e53e3e] inline-block ml-2" />
        );
      default:
        return '';
    }
  };

  return (
    <Card
      title={
        <div className="h-full items-center inline-flex">
          {t('security.Security')}
          {renderColor()}
        </div>
      }
      className="h-full">
      <p className="mb-4">{renderDesc()}</p>
      <p>{t('security.general_desc')}</p>
    </Card>
  );
};

export default Security;
