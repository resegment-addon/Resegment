// RU / EN switch: every element with data-ru / data-en gets its text from the chosen language.
(function () {
  const STORAGE_KEY = 'resegment-lang';

  function detectDefaultLanguage() {
    const langs = (typeof navigator !== 'undefined' && (navigator.languages || [navigator.language])) || [];
    return langs.some((l) => l && l.toLowerCase().startsWith('ru')) ? 'ru' : 'en';
  }

  function currentLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEY) || detectDefaultLanguage();
    } catch (e) {
      return detectDefaultLanguage();
    }
  }

  // feedback.js (a separate <script>) reads it as a bare global
  window.currentLanguage = currentLanguage;

  function applyLanguage(lang) {
    document.querySelectorAll('[data-ru]').forEach((el) => {
      const text = lang === 'ru' ? el.dataset.ru : el.dataset.en;
      if (text !== undefined) el.textContent = text;
    });
    document.documentElement.lang = lang;
    const toggle = document.getElementById('lang-toggle');
    if (toggle) toggle.textContent = lang === 'ru' ? 'EN' : 'RU';
  }

  function setLanguage(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // private browsing / blocked storage: the language still applies for this view
    }
    applyLanguage(lang);
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(currentLanguage());
    const toggle = document.getElementById('lang-toggle');
    if (toggle) toggle.addEventListener('click', () => setLanguage(currentLanguage() === 'ru' ? 'en' : 'ru'));
  });
})();
