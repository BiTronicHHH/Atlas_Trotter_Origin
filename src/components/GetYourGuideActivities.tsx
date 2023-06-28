import { Card } from 'antd'; // Not dynamic import to allow script loading in it
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

interface Props {
  getYourGuideId: string;
  lang: string;
}

const GetYourGuideActivities: React.FC<Props> = ({ getYourGuideId, lang }) => {
  const { t } = useTranslation('destinationPage');

  const formatLang = (lang: string) => {
    switch (lang) {
      case 'fr':
        return 'fr-FR';
        break;
      case 'en':
        return 'en-US';
        break;
      default:
        return 'en-US';
        break;
    }
  };

  return (
    <Card title={t('Tourist activities')} className="h-full">
      <div
        data-gyg-href="https://widget.getyourguide.com/default/activities.frame"
        data-gyg-location-id={getYourGuideId}
        data-gyg-locale-code={formatLang(lang)}
        data-gyg-widget="activities"
        data-gyg-number-of-items="5"
        data-gyg-partner-id="88G9VCW"></div>
    </Card>
  );
};

export default GetYourGuideActivities;
