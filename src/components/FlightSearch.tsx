import { Card } from 'antd'; // Not dynamic import to allow script loading in it
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useRef } from 'react';

interface Props {
  destination: string;
  lang: string;
}

const FlightSearch: React.FC<Props> = ({ destination, lang }) => {
  const { t } = useTranslation('destinationPage');
  const scriptContainerRef = useRef<HTMLDivElement>(null);

  const destErrorFix = (destination: string) => {
    switch (destination) {
      case 'Balearic Islands':
        return 'Palma de Mallorca';
        break;
      case 'Canary Islands':
        return 'Palmas de Gran Canaria';
        break;
      default:
        return destination;
        break;
    }
  };

  useEffect(() => {
    const ref = scriptContainerRef.current;
    const script = document.createElement('script');
    script.src = `https://tp.media/content?trs=218252&shmarker=420215&locale=${lang}&default_destination=${destErrorFix(
      destination,
    )}&powered_by=true&border_radius=0&plain=true&color_button=%232681ff&color_button_text=%23ffffff&color_border=%232681ff&promo_id=4132&campaign_id=121`;
    script.async = true;

    if (ref) {
      ref.appendChild(script);
    }

    return () => {
      if (ref) {
        ref.removeChild(script);
      }
    };
  }, [destination, lang]);

  return (
    <Card title={t('Search a flight')} className="h-full">
      <div ref={scriptContainerRef}></div>
    </Card>
  );
};

export default FlightSearch;
