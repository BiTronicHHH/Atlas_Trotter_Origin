import { QuestionCircleOutlined } from '@ant-design/icons';
import { ArcElement, Chart, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const Card = dynamic(() => import('antd').then((module) => module.Card));
const TooltipAntd = dynamic(() =>
  import('antd').then((module) => module.Tooltip),
);

interface Props {
  period: number[];
}

Chart.register(ArcElement, Tooltip, ChartDataLabels);

const Period: React.FC<Props> = ({ period }) => {
  const { t } = useTranslation('destinationPage');
  const monthList = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ].map((m) => t('common:months.' + m));

  const areMonthsFollowing = () => {
    for (let i = 0; i < period.length - 1; i++) {
      if (period[i + 1] - period[i] !== 1) {
        return false;
      }
    }
    return true;
  };

  const renderDesc = () => {
    const monthsToDisplay = period.map((m) => monthList[m - 1]);

    if (monthsToDisplay.length < 10) {
      const start = t('period.The climate is most favorable');
      if (monthsToDisplay.length == 1) {
        `${start} ${t('period.in')} ${monthsToDisplay[0]}.`;
      } else {
        if (monthsToDisplay.length > 2 && areMonthsFollowing()) {
          return `${start} ${t('period.from')} ${monthsToDisplay[0]} ${t(
            'period.to',
          )} ${monthsToDisplay[monthsToDisplay.length - 1]}.`;
        } else {
          const twoLast: string[] = monthsToDisplay.slice(-2);
          const rest: string[] = monthsToDisplay.slice(0, -2);
          return `${start} ${t('period.in')} ${rest.join(', ')}${
            rest.length > 0 ? ', ' : ''
          }${twoLast[0]} ${t('period.and')} ${twoLast[1]}.`;
        }
      }
    } else {
      const start = t('period.The climate is favorable all year round');
      const missingMonths = monthList.filter(
        (m) => !monthsToDisplay.includes(m),
      );
      if (missingMonths.length == 0) {
        return start + '.';
      } else if (missingMonths.length == 1) {
        return `${start} ${t('period.except in')} ${missingMonths[0]}.`;
      } else if (missingMonths.length == 2) {
        return `${start} ${t('period.except in')} ${missingMonths[0]} ${t(
          'period.and',
        )} ${missingMonths[1]}.`;
      }
    }
  };

  const data = {
    labels: monthList,
    datasets: [
      {
        data: monthList.map(() => 25 / 3),
        backgroundColor: monthList.map((_, index) =>
          period.includes(index + 1) ? '#A6E538' : '#f5b246',
        ),
        borderColor: 'gray',
        borderWidth: 1,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'start',
        offset: 10,
        color: '#000000',
        font: {
          weight: 'bold',
        },
        formatter: (value: any, context: any) => {
          return monthList[context.dataIndex].slice(0, 1);
        },
      },
      tooltip: {
        callbacks: {
          label: () => {
            return '';
          },
          footer: (tooltipItems: any) => {
            return period.includes(tooltipItems[0].dataIndex + 1)
              ? t('period.Favorable climate')
              : t('period.Less favorable climate');
          },
        },
      },
    },
    cutout: '20%',
  };

  return (
    <Card
      className="h-full"
      title={t('period.Best time to go')}
      extra={
        <TooltipAntd title={t('period.info_tooltip')}>
          <QuestionCircleOutlined />
        </TooltipAntd>
      }>
      <p className="mb-2">{renderDesc()}</p>
      <div className="w-[200px] h-[200px] mx-auto">
        <Doughnut data={data} options={options} width={200} height={200} />
      </div>
    </Card>
  );
};

export default Period;
