const child_process = require("child_process");
const fs = require("fs");

const TRANSLATIONS_FILE_PATH = "src/i18n/translations.json";
const translations = require("../" + TRANSLATIONS_FILE_PATH);
const supportedLanguages = Object.keys(translations).sort();

const TRANSLATION_REGEX = "i18n.t`(.*)`";

child_process.exec("grep -Er " + TRANSLATION_REGEX + " ./src/", (_err, stdout, _stderr) => {
    const translationKeys = stdout.trim().split("\n").map(line => {
        const raw = line.match(new RegExp(TRANSLATION_REGEX))[1];
        return raw.replace(/\$\{[^}]*\}/g, "{}");
    }).sort();

    const newTranslations = {};
    supportedLanguages.forEach(lang => {
        newTranslations[lang] = {};
        translationKeys.forEach(key => {
            newTranslations[lang][key] = translations[lang][key] || "";
        });
    });

    fs.writeFileSync(TRANSLATIONS_FILE_PATH, JSON.stringify(newTranslations, null, 4));
});
