import Error from 'next/error';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

const NotFoundPage = () => {
  const { t } = useTranslation('common');
  return <Error statusCode={404} title={t('not_found')} />;
};

export default NotFoundPage;
