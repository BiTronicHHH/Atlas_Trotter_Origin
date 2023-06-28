import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';

const Card = dynamic(() => import('antd').then((module) => module.Card));

interface Props {
  id: string;
  timezone: string;
  summertime: boolean;
  summerstart: string;
  summerend: string;
  currency: string;
  language: string;
}

const UsefulInfo: React.FC<Props> = ({
  id,
  timezone,
  summertime,
  summerstart,
  summerend,
  currency,
  language,
}) => {
  const { t } = useTranslation('destinationPage');

  const getOffsetToTimeZone = (timeZone: string): number => {
    const userOffset = new Date().getTimezoneOffset();

    const targetOffsetParts = timeZone.split('UTC')[1].split(':');
    const targetOffsetHours = parseInt(targetOffsetParts[0]);
    const targetOffsetMinutes =
      targetOffsetParts.length > 1 ? parseInt(targetOffsetParts[1]) : 0;

    const offsetInMinutes =
      targetOffsetHours * 60 + targetOffsetMinutes + userOffset;
    const offsetInHours = offsetInMinutes / 60;

    return offsetInHours;
  };

  const formatDecimalTime = (decimalTime: number): string => {
    const hours = Math.floor(decimalTime);
    const minutes = Math.round((decimalTime - hours) * 60);
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return minutes == 0 ? `${hours}` : `${hours}:${formattedMinutes}`;
  };

  const renderOffset = (offset: number) => {
    if (offset == 0) {
      return <p>{t('useful_info.same_time')}</p>;
    } else if (offset < 0) {
      return (
        <p>
          {t("useful_info.It's")} {formatDecimalTime(-offset)}{' '}
          {t('useful_info.hours behind your location', {
            s: offset == -1 ? '' : 's',
          })}
          .
        </p>
      );
    } else if (offset > 0) {
      return (
        <p>
          {t("useful_info.It's")} {formatDecimalTime(offset)}{' '}
          {t('useful_info.hours ahead of your location', {
            s: offset == 1 ? '' : 's',
          })}
          .
        </p>
      );
    }
  };

  const renderTimeZone = () => {
    const array = timezone.split(',');
    if (array.length == 1) {
      const offset = getOffsetToTimeZone(array[0]);
      return (
        <>
          <p className="font-bold text-xl">{array[0]}</p>
          {renderOffset(offset)}
        </>
      );
    } else {
      return (
        <>
          {t('useful_info.Between')}{' '}
          <span className="font-bold">{array[0]}</span> {t('useful_info.and')}{' '}
          <span className="font-bold">{array[1]}</span>{' '}
          {t('useful_info.depending on the zone')}.
        </>
      );
    }
  };

  const formatSummerDate = (date: string) => {
    const array = date.split(' ');
    if (array.length != 3) return '';

    return `${t('useful_info.' + array[0])} ${t('useful_info.' + array[1])} ${t(
      'useful_info.' + array[2],
    )}`;
  };

  const renderSmmerTime = () => {
    if (summerstart != '' && summerend != '') {
      return (
        <p className="mb-2">
          {t('useful_info.summertime')} {formatSummerDate(summerstart)}{' '}
          {t('useful_info.and the')} {formatSummerDate(summerend)}.
        </p>
      );
    } else
      return <p className="mb-2">{t('useful_info.multiple_summertime')}</p>;
  };

  return (
    <Card title={t('useful_info.Useful information')} className="h-full">
      <p className="font-bold mb-2">{t('useful_info.Time zone')}</p>
      <div className="w-full text-center mb-2">{renderTimeZone()}</div>
      {summertime && renderSmmerTime()}
      <p className="font-bold mt-4">{t('useful_info.Official currency')}</p>
      <p className="mb-2">
        {id == 'ATA' ? t('useful_info.antarctica_currency') : currency}
      </p>
      <p className="font-bold mt-4">{t('useful_info.Official language')}</p>
      <p className="mb-2">
        {id == 'ZAF'
          ? t('useful_info.south_africa_lang')
          : id == 'ATA'
          ? t('useful_info.antarctica_lang')
          : language}
      </p>
    </Card>
  );
};

export default UsefulInfo;
