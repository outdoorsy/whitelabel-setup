exports.getODCPartnerId = function (locale = 'en-US') {
  switch(locale.toLowerCase()) {
      case 'en-us':
        return 'dev-en-us';
      case 'de-de':
        return 'dev-de-de';
      default:
        return 'dev-en-us';
  }
};
