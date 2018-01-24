require('dotenv').load();
const fetch = require('node-fetch');

module.exports = ({
  str = 'the curious incident of the dog in the night time',
  lang = 'eo'
}) => {
  const translationKey = process.env.GOOGLEKEY;
  const url = `https://translation.googleapis.com/language/translate/v2?key=${translationKey}&source=en&target=${lang}&q=${encodeURIComponent(str)}`;
  return fetch(url)
    .then(res => res.json())
    .then(res => res.data.translations[0].translatedText)
}

