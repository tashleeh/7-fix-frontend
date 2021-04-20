module.exports = {
  siteName: 'Maintenance',
  logoPath: '/logo.svg',
  apiUrl: 'http://ec2-3-95-19-83.compute-1.amazonaws.com:5000',
  apiPrefix: '/api',
  fixedHeader: true, // sticky primary layout header

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exclude: [/(\/(en|zh))*\/login/],
    },
  ],

  /* I18n configuration, `languages` and `defaultLanguage` are required currently. */
  i18n: {
    /* Countrys flags: https://www.flaticon.com/packs/countrys-flags */
    languages: [
      {
        key: 'en',
        title: 'English',
        flag: '/america.svg',
      },
    ],
    defaultLanguage: 'en',
  },
}
