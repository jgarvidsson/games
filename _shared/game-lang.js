/* Helper i18n ES/EN/JA para juegos (jgarvidsson.dev / github.com/jgarvidsson/games).
 * Uso en cada juego (una sola vez, sin framework):
 *
 *   <script src="../_shared/game-lang.js"></script>
 *   <script>
 *     GameLang.init({
 *       es: { play: 'Jugar', score: 'Puntos' },
 *       en: { play: 'Play', score: 'Score' },
 *       ja: { play: '遊ぶ', score: '得点' }
 *     });
 *   </script>
 *
 *   <button data-i18n="play">Jugar</button>
 *
 * - Lee ?lang=es|en|ja, si no localStorage 'jgarvidsson.gameLang', si no 'es'.
 * - Aplica data-i18n="clave" a textContent y data-i18n-html para HTML.
 * - Expone GameLang.t('clave'), GameLang.lang, GameLang.setLang('ja').
 * - Dibuja un toggle ES|EN|JA arriba a la derecha (?notoggle=1 lo oculta).
 */
(function () {
  var STORE_KEY = 'jgarvidsson.gameLang';
  var LANGS = ['es', 'en', 'ja'];

  function getInitial() {
    try {
      var q = new URLSearchParams(window.location.search).get('lang');
      if (LANGS.indexOf(q) !== -1) return q;
    } catch (e) {}
    try {
      var s = localStorage.getItem(STORE_KEY);
      if (LANGS.indexOf(s) !== -1) return s;
    } catch (e) {}
    var nav = (navigator.language || 'es').toLowerCase();
    if (nav.indexOf('ja') === 0) return 'ja';
    if (nav.indexOf('en') === 0) return 'en';
    return 'es';
  }

  var dict = { es: {}, en: {}, ja: {} };
  var lang = getInitial();

  function apply() {
    document.documentElement.lang = lang === 'ja' ? 'ja' : lang;
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var k = els[i].getAttribute('data-i18n');
      var v = dict[lang] && dict[lang][k];
      if (typeof v === 'string') els[i].textContent = v;
    }
    var htmlEls = document.querySelectorAll('[data-i18n-html]');
    for (var j = 0; j < htmlEls.length; j++) {
      var k2 = htmlEls[j].getAttribute('data-i18n-html');
      var v2 = dict[lang] && dict[lang][k2];
      if (typeof v2 === 'string') htmlEls[j].innerHTML = v2;
    }
    var ariaEls = document.querySelectorAll('[data-i18n-aria]');
    for (var a = 0; a < ariaEls.length; a++) {
      var k3 = ariaEls[a].getAttribute('data-i18n-aria');
      var v3 = dict[lang] && dict[lang][k3];
      if (typeof v3 === 'string') ariaEls[a].setAttribute('aria-label', v3);
    }
    var btns = document.querySelectorAll('[data-glang-btn]');
    for (var m = 0; m < btns.length; m++) {
      btns[m].classList.toggle('active', btns[m].getAttribute('data-glang-btn') === lang);
    }
    try {
      localStorage.setItem(STORE_KEY, lang);
    } catch (e) {}
  }

  function mountToggle() {
    try {
      if (new URLSearchParams(window.location.search).get('notoggle') === '1') return;
    } catch (e) {}
    if (document.getElementById('glang-toggle')) return;
    var box = document.createElement('div');
    box.id = 'glang-toggle';
    box.innerHTML =
      '<button data-glang-btn="es">ES</button>' +
      '<button data-glang-btn="en">EN</button>' +
      '<button data-glang-btn="ja">JA</button>';
    box.style.cssText =
      'position:fixed;top:10px;right:10px;z-index:9999;display:flex;border:1px solid rgba(255,255,255,.2);border-radius:999px;overflow:hidden;background:rgba(10,10,26,.85);backdrop-filter:blur(6px)';
    var btns = box.querySelectorAll('button');
    for (var i = 0; i < btns.length; i++) {
      btns[i].style.cssText =
        'border:none;background:transparent;color:#a8b2c1;font:600 12px system-ui;padding:6px 10px;cursor:pointer';
      (function (b) {
        b.addEventListener('click', function () {
          setLang(b.getAttribute('data-glang-btn'));
        });
      })(btns[i]);
    }
    var style = document.createElement('style');
    style.textContent =
      '#glang-toggle button.active{background:#1e2a4a;color:#4fc3f7}';
    document.head.appendChild(style);
    document.body.appendChild(box);
    var btns2 = document.querySelectorAll('[data-glang-btn]');
    for (var m = 0; m < btns2.length; m++) {
      btns2[m].classList.toggle('active', btns2[m].getAttribute('data-glang-btn') === lang);
    }
  }

  function setLang(l) {
    if (LANGS.indexOf(l) === -1) return;
    lang = l;
    apply();
    if (typeof window.GameLang.onChange === 'function') {
      try {
        window.GameLang.onChange(l);
      } catch (e) {}
    }
  }

  function init(d) {
    if (d && d.es) dict.es = d.es;
    if (d && d.en) dict.en = d.en;
    if (d && d.ja) dict.ja = d.ja;
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        apply();
        mountToggle();
      });
    } else {
      apply();
      mountToggle();
    }
  }

  window.GameLang = {
    init: init,
    setLang: setLang,
    t: function (k) {
      return (dict[lang] && dict[lang][k]) || (dict.es && dict.es[k]) || k;
    },
    get lang() {
      return lang;
    },
    onChange: null,
  };
})();
