import plugImage from '@/utils/plugImage';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';

const Card = dynamic(() => import('antd').then((module) => module.Card));

interface Props {
  plugtype: string;
  voltage: number[];
  freq: number;
  lang: string;
}

const Plug: React.FC<Props> = ({ plugtype, voltage, freq, lang }) => {
  const { t } = useTranslation('destinationPage');

  const renderTypes = () => {
    const array = plugtype.split(',');
    if (array.length == 0) return;

    if (array.length == 1) {
      return (
        <>
          <div className="flex flex-col items-center justify-center mb-2">
            <img
              className="max-h-[100px]"
              src={plugImage(array[0])}
              alt={`Plug type ${array[0]}`}
            />
            <div className="text-center font-bold">
              {t('plug.Type')} {array[0]}
            </div>
          </div>
          <p>{t('plug.one_type_text', { type: array[0] })}</p>
        </>
      );
    } else if (array.length == 2) {
      return (
        <>
          <div className="flex items-center justify-center mb-2">
            <div className="flex flex-col items-center justify-center">
              <img
                className="max-h-[100px]"
                src={plugImage(array[0])}
                alt={`Plug type ${array[0]}`}
              />
              <div className="text-center font-bold">
                {t('plug.Type')} {array[0]}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                className="max-h-[100px]"
                src={plugImage(array[1])}
                alt={`Plug type ${array[1]}`}
              />
              <div className="text-center font-bold">
                {t('plug.Type')} {array[1]}
              </div>
            </div>
          </div>
          <p>{t('plug.multi_type_text')}</p>
        </>
      );
    } else if (array.length == 3) {
      return (
        <>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <img
                className="max-h-[70px]"
                src={plugImage(array[0])}
                alt={`Plug type ${array[0]}`}
              />
              <div className="text-center font-bold">
                {t('plug.Type')} {array[0]}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                className="max-h-[70px]"
                src={plugImage(array[1])}
                alt={`Plug type ${array[1]}`}
              />
              <div className="text-center font-bold">
                {t('plug.Type')} {array[1]}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mb-2">
            <div className="flex flex-col items-center justify-center">
              <img
                className="max-h-[70px]"
                src={plugImage(array[2])}
                alt={`Plug type ${array[2]}`}
              />
              <div className="text-center font-bold">
                {t('plug.Type')} {array[2]}
              </div>
            </div>
          </div>
          <p>{t('plug.multi_type_text')}</p>
        </>
      );
    } else if (array.length == 4) {
      return (
        <>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <img
                className="max-h-[70px]"
                src={plugImage(array[0])}
                alt={`Plug type ${array[0]}`}
              />
              <div className="text-center font-bold">
                {t('plug.Type')} {array[0]}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                className="max-h-[70px]"
                src={plugImage(array[1])}
                alt={`Plug type ${array[1]}`}
              />
              <div className="text-center font-bold">
                {t('plug.Type')} {array[1]}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mb-2">
            <div className="flex flex-col items-center justify-center">
              <img
                className="max-h-[70px]"
                src={plugImage(array[2])}
                alt={`Plug type ${array[2]}`}
              />
              <div className="text-center font-bold">
                {t('plug.Type')} {array[2]}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                className="max-h-[70px]"
                src={plugImage(array[3])}
                alt={`Plug type ${array[3]}`}
              />
              <div className="text-center font-bold">
                {t('plug.Type')} {array[3]}
              </div>
            </div>
          </div>
          <p>{t('plug.multi_type_text')}</p>
        </>
      );
    }
  };

  const renderVoltage = () => {
    if (voltage.length == 0) return;
    if (voltage.length == 1) return `${voltage[0]} V`;
    if (voltage.length == 2)
      return `${voltage[0]} V ${t('plug.or')} ${voltage[1]} V`;
  };

  return (
    <Card title={t('plug.title')} className="h-full">
      <div className="mb-2">{renderTypes()}</div>
      <p className="font-bold">
        {t('plug.Voltage')} {renderVoltage()}
      </p>
      <p className="font-bold mb-2">
        {t('plug.Frequency')} {freq} Hz
      </p>
      <p>{t('plug.voltage_freq_text')}</p>
      {lang == 'fr' && (
        <div className="mt-2">
          <Link
            target="_blank"
            className="text-[#007aff]"
            href="https://www.amazon.fr/gp/search?ie=UTF8&tag=alexisjamal-21&linkCode=ur2&linkId=bdec86fe7358fc17bde9f4f75709d423&camp=1642&creative=6746&index=electronics&keywords=adaptateur voyage">
            Voir les adaptateurs de voyage sur Amazon
          </Link>
        </div>
      )}
    </Card>
  );
};

export default Plug;
