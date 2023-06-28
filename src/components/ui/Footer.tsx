import { footerRoutes } from '@/res/routes';
import { INSTAGRAM_LINK, TIKTOK_LINK, TWITTER_LINK } from '@/res/values';
import {
  ArrowDownOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import React, { Fragment } from 'react';
import Container from './Container';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import { IconTiktok } from '@/res/icons';

const Footer = () => {
  const { t } = useTranslation('common');
  const { locales, asPath } = useRouter();

  const renderLanguageSwitcher = (
    <Menu as="div" className="relative inline-block text-gray-700">
      <div>
        <Menu.Button className="h-[44px] flex rounded-xl bg-[#f5f5f7] py-3 px-4">
          <div className="h-full items-center inline-flex">
            <p className="text-sm mr-2">{t('footer.language')}</p>
            <ArrowDownOutlined />
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-[#f5f5f7] ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {locales?.map((locale) => (
              <Menu.Item key={locale}>
                {() => (
                  <Link
                    href={asPath}
                    passHref={true}
                    locale={locale}
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200">
                    {t('languages.' + locale)}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );

  return (
    <div className="pt-6 pb-6 bg-[#1F1F1F] text-white">
      <Container>
        <div className="flex tablet:items-center items-start justify-between tablet:mb-10 mb-14 flex-wrap gap-5">
          <ul className="flex space-y-4 tablet:space-x-8 flex-wrap tablet:flex-row flex-col tablet:space-y-0 mb-0">
            {footerRoutes.map(({ label, route }) => (
              <li key={label}>
                <Link href={route}>
                  <label className="cursor-pointer text-white text-sm laptop:text-md">
                    {t('footer.' + label)}
                  </label>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex space-x-3 flex-wrap">
            <div className="bg-[#00aaec] flex rounded-xl">
              <Link
                href={TWITTER_LINK}
                target="_blank"
                className="flex p-[10px]">
                <TwitterOutlined style={{ fontSize: '24px', color: '#fff' }} />
              </Link>
            </div>
            <div
              className="flex rounded-xl"
              style={{
                background:
                  'radial-gradient(160% 100% at 20% 90%, rgb(251, 173, 80) 0%, rgb(205, 72, 107) 50%, rgb(138, 58, 185) 80%, rgb(76, 104, 215) 100%)',
              }}>
              <Link
                href={INSTAGRAM_LINK}
                target="_blank"
                className="flex p-[10px]">
                <InstagramOutlined
                  style={{ fontSize: '24px', color: '#fff' }}
                />
              </Link>
            </div>
            <div className="bg-[#000000] flex rounded-xl">
              <Link
                href={TIKTOK_LINK}
                target="_blank"
                className="flex p-[10px]">
                <IconTiktok />
              </Link>
            </div>
            {renderLanguageSwitcher}
          </div>
        </div>
        <label className="text-gray2 text-xs">
          Atlas Trotter © 2023 - contact@atlastrotter.com
        </label>
      </Container>
    </div>
  );
};

export default Footer;
