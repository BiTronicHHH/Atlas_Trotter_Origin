module.exports = {
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  pages: {
    '*': ['common', 'destinations'],
    '/': ['home'],
    '/wheretotravel': ['wheretotravel'],
    '/wheretotravel/[ticker]': ['destinationPage'],
    '/[customLink]': ['profile'],
    '/login': ['login'],
    '/404': ['common'],
  },
  loadLocaleFrom: (locale, namespace) =>
    import(`./src/locales/${locale}/${namespace}.json`).then((m) => m.default),
};
