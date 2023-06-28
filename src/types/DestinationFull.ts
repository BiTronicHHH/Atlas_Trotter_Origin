export default interface DestinationFull {
  idDestination: string;
  name: string;
  ticker: string;
  continent: string;
  period: number[];
  categories: string[];
  cost: number;
  costRate: number;
  security: number;
  timezone: string;
  summertime: boolean;
  summerstart: string;
  summerend: string;
  plugtype: string;
  voltage: number[];
  freq: number;
  currency: string;
  language: string;
  description: number;
  getYourGuideId: string;
}
