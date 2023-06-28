import {
  IconBeach,
  IconCultural,
  IconDiving,
  IconGastronomic,
  IconNature,
  IconRomantic,
  IconSports,
  IconUrban,
} from '@/res/icons';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import React from 'react';

const Tooltip = dynamic(() => import('antd').then((module) => module.Tooltip));

interface Props {
  category: string;
  style?: React.CSSProperties;
}

const CategoryIcon: React.FC<Props> = ({ category, style = {} }) => {
  const { t } = useTranslation('common');
  return (
    <>
      <Tooltip title={t('categories.' + category)}>
        {category == 'Cultural' && (
          <IconCultural style={style} className="fill-[#EA8C55]" />
        )}
        {category == 'Nature' && (
          <IconNature style={style} className="fill-[#1EAE5A]" />
        )}
        {category == 'Sports' && (
          <IconSports style={style} className="fill-[#7A8AB8]" />
        )}
        {category == 'Beach' && (
          <IconBeach style={style} className="fill-[#F3D77C]" />
        )}
        {category == 'Gastronomic' && (
          <IconGastronomic style={style} className="fill-[#D897B2]" />
        )}
        {category == 'Romantic' && (
          <IconRomantic style={style} className="fill-[#F64C3C]" />
        )}
        {category == 'Urban' && (
          <IconUrban style={style} className="fill-[#A0AAB2]" />
        )}
        {category == 'Diving' && (
          <IconDiving style={style} className="fill-[#009BF5]" />
        )}
      </Tooltip>
    </>
  );
};

export default CategoryIcon;
