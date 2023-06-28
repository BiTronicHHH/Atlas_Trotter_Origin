export const ROUTE_LOGIN = '/login';
export const ROUTE_PROFILE = '/profile';
export const ROUTE_PRIVACY = '/privacypolicy';
export const ROUTE_TERMS = '/termsconditions';
export const ROUTE_WHERETOTRAVEL = '/wheretotravel';
export const ROUTE_HOME = '/';

export const headerRoutes = [
  {
    label: 'Where to travel',
    route: ROUTE_WHERETOTRAVEL,
  },
  {
    label: 'My map',
    route: ROUTE_HOME,
  },
];

export const footerRoutes = [
  {
    label: 'Home',
    route: ROUTE_HOME,
  },
  {
    label: 'Terms & Conditions',
    route: ROUTE_TERMS,
  },
  {
    label: 'Privacy policy',
    route: ROUTE_PRIVACY,
  },
];
