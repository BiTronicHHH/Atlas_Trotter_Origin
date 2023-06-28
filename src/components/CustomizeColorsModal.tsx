import { updateUserColors } from '@/api/user';
import defaultMapColors from '@/utils/defaultMapColors';
import type { Color } from 'antd/es/color-picker';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const Col = dynamic(() => import('antd').then((module) => module.Col));
const ColorPicker = dynamic(() =>
  import('antd').then((module) => module.ColorPicker),
);
const Modal = dynamic(() => import('antd').then((module) => module.Modal));
const Row = dynamic(() => import('antd').then((module) => module.Row));
const Space = dynamic(() => import('antd').then((module) => module.Space));
const Switch = dynamic(() => import('antd').then((module) => module.Switch));

interface Props {
  open: boolean;
  onClose: (colorsUpdated: boolean, userColors: any) => void;
  userColors: any;
  alreadyUpdatedColors: boolean;
}

const CustomizeColorsModal: React.FC<Props> = ({
  open,
  onClose,
  userColors,
  alreadyUpdatedColors,
}) => {
  const { t } = useTranslation('profile');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [visitedColor1, setVisitedColor1] = useState('');
  const [visitedColor2, setVisitedColor2] = useState('');
  const [visitedColor3, setVisitedColor3] = useState('');
  const [notVisitedColor1, setNotVisitedColor1] = useState('');
  const [notVisitedColor2, setNotVisitedColor2] = useState('');
  const [notVisitedColor3, setNotVisitedColor3] = useState('');
  const [colorBorders, setColorBorders] = useState('');
  const [isVisitedGradient, setIsVisitedGradient] = useState(true);
  const [isNotVisitedGradient, setIsNotVisitedGradient] = useState(true);

  useEffect(() => {
    setVisitedColor1(
      userColors.visitedColor1 != ''
        ? userColors.visitedColor1
        : defaultMapColors.visitedColor1,
    );
    setVisitedColor2(
      userColors.visitedColor2 != ''
        ? userColors.visitedColor2
        : defaultMapColors.visitedColor2,
    );
    setVisitedColor3(
      userColors.visitedColor3 != ''
        ? userColors.visitedColor3
        : defaultMapColors.visitedColor3,
    );
    if (
      userColors.visitedColor1 == userColors.visitedColor2 &&
      userColors.visitedColor3 == userColors.visitedColor2 &&
      userColors.visitedColor1 != ''
    ) {
      setIsVisitedGradient(false);
    }
    setNotVisitedColor1(
      userColors.notVisitedColor1 != ''
        ? userColors.notVisitedColor1
        : defaultMapColors.notVisitedColor1,
    );
    setNotVisitedColor2(
      userColors.notVisitedColor2 != ''
        ? userColors.notVisitedColor2
        : defaultMapColors.notVisitedColor2,
    );
    setNotVisitedColor3(
      userColors.notVisitedColor3 != ''
        ? userColors.notVisitedColor3
        : defaultMapColors.notVisitedColor3,
    );
    if (
      userColors.notVisitedColor1 == userColors.notVisitedColor2 &&
      userColors.notVisitedColor3 == userColors.notVisitedColor2 &&
      userColors.notVisitedColor1 != ''
    ) {
      setIsNotVisitedGradient(false);
    }
    setColorBorders(
      userColors.colorBorders != ''
        ? userColors.colorBorders
        : defaultMapColors.colorBorders,
    );
  }, [userColors]);

  const handleOk = () => {
    setUpdateLoading(true);
    updateUserColors(
      visitedColor1,
      isVisitedGradient ? visitedColor2 : visitedColor1,
      isVisitedGradient ? visitedColor3 : visitedColor1,
      notVisitedColor1,
      isNotVisitedGradient ? notVisitedColor2 : notVisitedColor1,
      isNotVisitedGradient ? notVisitedColor3 : notVisitedColor1,
      colorBorders,
    ).then((res) => {
      setUpdateLoading(false);
      if (res && res.status && res.status == 'success')
        onClose(true, {
          visitedColor1: visitedColor1,
          visitedColor2: visitedColor2,
          visitedColor3: visitedColor3,
          notVisitedColor1: notVisitedColor1,
          notVisitedColor2: notVisitedColor2,
          notVisitedColor3: notVisitedColor3,
          colorBorders: colorBorders,
        });
    });
  };

  const handleReset = () => {
    setVisitedColor1(defaultMapColors.visitedColor1);
    setVisitedColor2(defaultMapColors.visitedColor2);
    setVisitedColor3(defaultMapColors.visitedColor3);
    setIsVisitedGradient(true);
    setNotVisitedColor1(defaultMapColors.notVisitedColor1);
    setNotVisitedColor2(defaultMapColors.notVisitedColor2);
    setNotVisitedColor3(defaultMapColors.notVisitedColor3);
    setIsNotVisitedGradient(true);
    setColorBorders(defaultMapColors.colorBorders);
  };

  return (
    <Modal
      open={open}
      onCancel={() => onClose(alreadyUpdatedColors, userColors)}
      onOk={handleOk}
      cancelText={t('common:Cancel')}
      okText={t('common:Save')}
      title={
        <Space align="baseline" className="max-w-[90%]" size="middle">
          <div>{t('Customize map colors')}</div>
          <div
            className="cursor-pointer text-[#007aff] text-sm font-normal"
            onClick={handleReset}>
            {t('common:Reset')}
          </div>
        </Space>
      }
      confirmLoading={updateLoading}>
      <Row className="gap-4 mb-2 mt-4">
        <div className="font-medium">{t('Visited destinations color')}</div>
        <Space size="small">
          <div>{t('Gradient')}</div>
          <Switch
            className="top-[-1px]"
            size="small"
            checked={isVisitedGradient}
            onChange={(value: boolean) => setIsVisitedGradient(value)}
          />
        </Space>
      </Row>
      <Row className="gap-2 mb-4">
        <Space>
          <Col>
            <ColorPicker
              value={visitedColor1}
              onChange={(color: Color) => setVisitedColor1(color.toHexString())}
            />
          </Col>
          <Col>
            <div className="w-[65px]">{visitedColor1}</div>
          </Col>
        </Space>
        {isVisitedGradient && (
          <>
            <Space>
              <Col>
                <ColorPicker
                  placement="bottom"
                  value={visitedColor2}
                  onChange={(color: Color) =>
                    setVisitedColor2(color.toHexString())
                  }
                />
              </Col>
              <Col>
                <div className="w-[65px]">{visitedColor2}</div>
              </Col>
            </Space>
            <Space>
              <Col>
                <ColorPicker
                  value={visitedColor3}
                  onChange={(color: Color) =>
                    setVisitedColor3(color.toHexString())
                  }
                />
              </Col>
              <Col>
                <div className="w-[65px]">{visitedColor3}</div>
              </Col>
            </Space>
          </>
        )}
      </Row>
      <Row className="gap-4 mb-2">
        <div className="font-medium">{t('Unvisited destinations color')}</div>
        <Space>
          <div>{t('Gradient')}</div>
          <Switch
            className="top-[-1px]"
            size="small"
            checked={isNotVisitedGradient}
            onChange={(value: boolean) => setIsNotVisitedGradient(value)}
          />
        </Space>
      </Row>
      <Row className="gap-2 mb-4">
        <Space>
          <Col>
            <ColorPicker
              value={notVisitedColor1}
              onChange={(color: Color) =>
                setNotVisitedColor1(color.toHexString())
              }
            />
          </Col>
          <Col>
            <div className="w-[65px]">{notVisitedColor1}</div>
          </Col>
        </Space>
        {isNotVisitedGradient && (
          <>
            <Space>
              <Col>
                <ColorPicker
                  placement="bottom"
                  value={notVisitedColor2}
                  onChange={(color: Color) =>
                    setNotVisitedColor2(color.toHexString())
                  }
                />
              </Col>
              <Col>
                <div className="w-[65px]">{notVisitedColor2}</div>
              </Col>
            </Space>
            <Space>
              <Col>
                <ColorPicker
                  value={notVisitedColor3}
                  onChange={(color: Color) =>
                    setNotVisitedColor3(color.toHexString())
                  }
                />
              </Col>
              <Col>
                <div className="w-[65px]">{notVisitedColor3}</div>
              </Col>
            </Space>
          </>
        )}
      </Row>

      <div className="font-medium mb-2">{t('Borders color')}</div>

      <Space>
        <Col>
          <ColorPicker
            value={colorBorders}
            onChange={(color: Color) => setColorBorders(color.toHexString())}
          />
        </Col>
        <Col>
          <div className="w-[65px]">{colorBorders}</div>
        </Col>
      </Space>
    </Modal>
  );
};

export default CustomizeColorsModal;
