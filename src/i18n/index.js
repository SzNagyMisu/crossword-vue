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
const supportedLanguages = Object.keys(translations);

const getLang = () => {
    const langInPathRegExp = new RegExp("/(" + supportedLanguages.join("|") + ")/$");
    const langInPathMatch = window.location.pathname.match(langInPathRegExp);
    return langInPathMatch[1] || DEFAULT_LANG;
}

export const i18n = i18nFactory(translations, getLang());
