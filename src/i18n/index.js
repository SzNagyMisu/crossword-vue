import translations from './translations.json';


const i18nFactory = (translations, lang) => {
    const translationsForLang = translations[lang] || {};

    // example usage:
    //      t`string to translate`
    //      t`string ${2} trans${new Date().getHours() > 20 ? 'late' : 'early'}`
    const t = (stringParts, ...args) => {
        const key = stringParts.join("{}");
        return getInterpolated(translationsForLang[key] || key, ...args)
    };

    const getInterpolated = (string, ...values) => {
        values.forEach(value => string = string.replace(/\{}/, value));
        return string;
    };

    return { t };
};

const DEFAULT_LANG = "en";
export const supportedLanguages = Object.keys(translations);
supportedLanguages.push("en");

const getLang = () => {
    const searchParamsLang = new URLSearchParams(window.location.search).get('lang');
    return supportedLanguages.includes(searchParamsLang) ? searchParamsLang : DEFAULT_LANG;
};

export const currentLang = getLang();

export const i18n = i18nFactory(translations, currentLang);
