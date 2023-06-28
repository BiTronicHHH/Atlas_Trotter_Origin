import { ImgLogo } from '@/res/images';
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import useTranslation from 'next-translate/useTranslation';
import React, { useRef, useState } from 'react';
import Map from './Map';
import Link from 'next/link';
import { INSTAGRAM_LINK } from '@/res/values';
import dynamic from 'next/dynamic';

const Button = dynamic(() => import('antd').then((module) => module.Button));
const Modal = dynamic(() => import('antd').then((module) => module.Modal));
const Space = dynamic(() => import('antd').then((module) => module.Space));
const Spin = dynamic(() => import('antd').then((module) => module.Spin));

interface Props {
  open: boolean;
  onClose: () => void;
  result: number;
  visitedDestinations: string[];
}

const ShareModal: React.FC<Props> = ({
  open,
  onClose,
  result,
  visitedDestinations,
}) => {
  const { t } = useTranslation('common');
  const url = encodeURIComponent('https://atlastrotter.com');
  const text = encodeURIComponent(t('share.text', { result: result }));
  const title = encodeURIComponent('Atlas Trotter');
  const storyInstaRef = useRef<HTMLDivElement>(null);
  const imageContainer = useRef<HTMLDivElement>(null);
  const [isImgLoading, setIsImgLoading] = useState(false);
  const [isImgDisplayed, setIsImgDisplayed] = useState(false);

  const handleRenderInstaStory = () => {
    if (storyInstaRef?.current && !isImgDisplayed && !isImgLoading) {
      setIsImgLoading(true);

      import('html2canvas').then((module) => {
        const html2canvas = module.default;
        if (!storyInstaRef.current) return;
        html2canvas(storyInstaRef.current, {
          windowWidth: 1200,
          scale: 5,
        }).then((canvas) => {
          const srcUrl = canvas.toDataURL('image/png');
          if (srcUrl && srcUrl != '') {
            const imageElement = document.createElement('img');
            imageElement.src = srcUrl;

            if (imageContainer?.current) {
              imageContainer.current.appendChild(imageElement);
              setIsImgDisplayed(true);
            }
          }
          setIsImgLoading(false);
        });
      });
    }
  };

  return (
    <Modal
      open={open}
      onOk={onClose}
      onCancel={onClose}
      footer={null}
      title={t('share.title')}>
      <div className="flex flex-col justify-center items-center my-4">
        <Space className="xs:flex-row flex-col">
          <Button
            type="primary"
            className="xs:w-[120px] w-[200px]"
            icon={<FacebookOutlined />}
            style={{
              backgroundColor: '#1877F2',
              border: 'none',
            }}
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank">
            Facebook
          </Button>
          <Button
            type="primary"
            className="xs:w-[120px] w-[200px]"
            icon={<TwitterOutlined />}
            style={{
              backgroundColor: '#00aaec',
              border: 'none',
            }}
            href={`https://twitter.com/share?url=${url}&text=${text}`}
            target="_blank">
            Twitter
          </Button>
          <Button
            type="primary"
            className="xs:w-[120px] w-[200px]"
            icon={<LinkedinOutlined />}
            style={{
              backgroundColor: '#0A66C2',
              border: 'none',
            }}
            href={`https://www.linkedin.com/shareArticle?url=${url}&title=${title}`}
            target="_blank">
            LinkedIn
          </Button>
        </Space>
      </div>
      <div className="text-center mb-4">
        <span
          onClick={handleRenderInstaStory}
          className="cursor-pointer text-[#007aff] hover:text-[#69b1ff]">
          <InstagramOutlined />
          {t('share.share_insta_1')}
        </span>
        {t('share.share_insta_2')}
        <Link href={INSTAGRAM_LINK} target="_blank" className="text-[#007aff]">
          @atlastrottercom
        </Link>
      </div>
      {isImgLoading && (
        <div className="text-center mb-4">
          <Spin size="large" />
        </div>
      )}
      {isImgDisplayed && (
        <p className="text-center mb-1">{t('share.save_img')}</p>
      )}
      <div
        ref={imageContainer}
        className="rounded-lg overflow-hidden w-[80%] m-auto shadow-lg"
      />
      {!isImgDisplayed && (
        <>
          <p className="text-center mb-1">{t('share.Preview')}</p>
          <div
            ref={storyInstaRef}
            className="w-[200px] h-[180px] m-auto rounded-lg overflow-hidden shadow-lg">
            <div className="w-[100px] m-auto">
              <ImgLogo fill={'#92638C'} style={{ width: '100px' }} />
            </div>

            <div className="w-[190px]">
              <Map
                visitedDestinations={visitedDestinations}
                isClickable={false}
              />
            </div>
            <div className="w-[150px] m-auto h-[15px] bg-[#d1d5db] rounded-md overflow-hidden mt-2 relative font-semibold">
              <div
                className="h-full bg-[#FFD470]"
                style={{ width: `${result}%` }}
              />
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-[9px]">
                {result}% {t('share.discovered')}
              </div>
            </div>
            <div className="text-[8px] leading-[10px] mt-3 text-center">
              atlastrotter.com
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

export default ShareModal;
