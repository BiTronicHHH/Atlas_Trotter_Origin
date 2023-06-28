import continents from '@/utils/continents';
import destinations from '@/utils/destinations';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { MenuProps, List } from 'antd';
import diacriticless from 'diacriticless';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

const Button = dynamic(() => import('antd').then((module) => module.Button));
const Checkbox = dynamic(() =>
  import('antd').then((module) => module.Checkbox),
);
const Modal = dynamic(() => import('antd').then((module) => module.Modal));
const Row = dynamic(() => import('antd').then((module) => module.Row));
const Space = dynamic(() => import('antd').then((module) => module.Space));
const Dropdown = dynamic(() =>
  import('antd').then((module) => module.Dropdown),
);
const Input = dynamic(() => import('antd').then((module) => module.Input));
const Tooltip = dynamic(() => import('antd').then((module) => module.Tooltip));

interface Props {
  open: boolean;
  onClose: (saved: boolean, selectedDestinations: string[]) => void;
  visitedDestinations: string[];
}

const DestinationsModal: React.FC<Props> = ({
  open,
  onClose,
  visitedDestinations,
}) => {
  const { t } = useTranslation('common');
  const [selectedDestinations, setSelectedDestinations] =
    useState<string[]>(visitedDestinations);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedContinents, setSelectedContinents] = useState<string[]>([]);

  const handleDestinationClick = (destinationId: string) => {
    if (selectedDestinations.includes(destinationId)) {
      setSelectedDestinations(
        selectedDestinations.filter((id) => id !== destinationId),
      );
    } else {
      setSelectedDestinations([...selectedDestinations, destinationId]);
    }
  };

  const handleContinentSelection = (continent: string) => {
    setSelectedContinents((prevSelectedContinents: string[]) => {
      if (prevSelectedContinents.includes(continent)) {
        return prevSelectedContinents.filter((c) => c !== continent);
      } else {
        return [...prevSelectedContinents, continent];
      }
    });
  };

  const handleSaveDestinations = () => {
    onClose(true, selectedDestinations);
  };

  const handleCloseModal = () => {
    onClose(false, selectedDestinations);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value.toLowerCase());
  };

  const filteredDestinations = destinations.filter(
    (destination) =>
      (selectedContinents.length == 0 ||
        selectedContinents.includes(destination.continent)) &&
      (diacriticless(
        t('destinations:' + destination.name).toLowerCase(),
      ).includes(searchTerm) ||
        t('destinations:' + destination.name)
          .toLowerCase()
          .includes(searchTerm)),
  );

  const handleReset = () => {
    setSelectedDestinations([]);
  };

  const items: MenuProps['items'] = continents.map((continent, index) => ({
    label: (
      <div onClick={(e) => e?.stopPropagation()}>
        <Checkbox
          className="w-full"
          style={{ padding: '5px 12px' }}
          key={index}
          checked={selectedContinents.includes(continent)}
          onChange={() => handleContinentSelection(continent)}>
          {t('continents.' + continent)}
        </Checkbox>
      </div>
    ),
    key: index,
  }));

  return (
    <Modal
      open={open}
      onCancel={handleCloseModal}
      onOk={handleSaveDestinations}
      cancelText={t('Cancel')}
      okText={t('Save')}
      title={
        <Space align="baseline" className="max-w-[90%]" size="middle">
          <div>{t('destinations_modal.title')}</div>
          <div
            className="cursor-pointer text-[#007aff] text-sm font-normal"
            onClick={handleReset}>
            {t('Reset')}
          </div>
        </Space>
      }
      bodyStyle={{
        height: 'calc(100vh - 300px)',
        overflowY: 'auto',
        padding: '0px',
      }}>
      <Row className="gap-2 my-2">
        <Input
          style={{ width: '250px' }}
          addonBefore={<SearchOutlined />}
          placeholder={t('destinations_modal.search')}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Tooltip title={t('Filter')}>
          <Dropdown menu={{ items }} trigger={['click']}>
            <Button icon={<FilterOutlined />} />
          </Dropdown>
        </Tooltip>
      </Row>
      <List
        size="small"
        dataSource={filteredDestinations.sort((a, b) => {
          const nameA = t('destinations:' + a.name).toLowerCase();
          const nameB = t('destinations:' + b.name).toLowerCase();
          return nameA.localeCompare(nameB, 'en', {
            sensitivity: 'base',
          });
        })}
        split={false}
        renderItem={(destination) => (
          <List.Item
            className={`cursor-pointer ${
              selectedDestinations.includes(destination.id)
                ? 'bg-blue-100'
                : 'hover:bg-gray-100'
            }`}
            onClick={() => handleDestinationClick(destination.id)}>
            {t('destinations:' + destination.name)}
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default DestinationsModal;
