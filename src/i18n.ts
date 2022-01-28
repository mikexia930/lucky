import { createI18n, LocaleMessages } from 'vue-i18n';

function loadLocaleMessages(): any {
  const locales: any = import.meta.glob('./locales/*.json');
  const messages: LocaleMessages<any> = {};
  Object.keys(locales).forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      locales[key]().then((result: any) => {
        messages[locale] = result;
      });
    }
  });
  return messages;
}

const i18n = createI18n({
  locale: import.meta.env.VITE_APP_I18N_LOCALE || 'zh_CN',
  fallbackLocale: import.meta.env.VITE_APP_I18N_FALLBACK_LOCALE || 'zh_CN',
  messages: loadLocaleMessages()
} as any);

export default i18n;
