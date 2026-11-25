/* ==========================================================
   EasyG – Tiện ích giao diện dùng chung
   (icon, toast, modal, hiệu ứng cuộn, định dạng…)
   ========================================================== */
(function () {
  'use strict';
  var E = window.EasyG = window.EasyG || {};

  /* ---------- Icon SVG ---------- */
  var ICONS = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/>',
    arrowRight: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    arrowLeft: '<path d="M19 12H5m6-6-6 6 6 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
    home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
    gamepad: '<rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 10v5M4.5 12.5h5"/><circle cx="16" cy="11.5" r="1"/><circle cx="18.5" cy="14" r="1"/>',
    building: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M10 21v-4h4v4"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-5.5A8 8 0 1 1 21 12z"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14c3 0 5 2 5 5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 7 9 6 9-6"/>',
    pin: '<path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    check: '<path d="m5 12 5 5 9-10"/>',
    alert: '<path d="M12 3 2 20h20z"/><path d="M12 10v5M12 18h.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    chevronLeft: '<path d="m15 6-6 6 6 6"/>',
    chevronRight: '<path d="m9 6 6 6-6 6"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.8"/><path d="m21 16-5-5-8 9"/>',
    dashboard: '<rect x="3" y="3" width="8" height="10" rx="2"/><rect x="13" y="3" width="8" height="6" rx="2"/><rect x="13" y="11" width="8" height="10" rx="2"/><rect x="3" y="15" width="8" height="6" rx="2"/>',
    refresh: '<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    filter: '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
    up: '<path d="m6 15 6-6 6 6"/>',
    eyeOff: '<path d="M3 3l18 18"/><path d="M10.6 6.2A10 10 0 0 1 12 6c7 0 11 6 11 6a17 17 0 0 1-3.2 3.7M6.6 6.6A17 17 0 0 0 1 12s4 7 11 7a10 10 0 0 0 4.4-1"/>'
  };
  var FILLED = { star: true };

  function icon(name, cls) {
    var d = ICONS[name] || '';
    var fill = FILLED[name] ? 'currentColor' : 'none';
    return '<svg class="icon ' + (cls || '') + '" viewBox="0 0 24 24" fill="' + fill +
      '" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
  }

  /* ---------- Chuỗi / định dạng ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fmtDate(iso) {
    if (!iso) return '';
    var p = String(iso).slice(0, 10).split('-');
    return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : iso;
  }
  function fmtScore(n) { return (Number(n) || 0).toFixed(1); }
  function scoreLabel(s) {
    s = Number(s) || 0;
    if (s >= 9.5) return 'Kiệt tác';
    if (s >= 9) return 'Xuất sắc';
    if (s >= 8) return 'Rất tốt';
    if (s >= 7) return 'Khá';
    if (s >= 5) return 'Tạm ổn';
    return 'Chưa hay';
  }
  function truncate(s, n) {
    s = String(s || '');
    return s.length > n ? s.slice(0, n - 1).trim() + '…' : s;
  }
  var HUES = [352, 24, 46, 150, 196, 262, 322];
  function hueOf(str) {
    var h = 0; str = String(str || '');
    for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
    return HUES[h % HUES.length];
  }
  function initial(str) {
    var m = String(str || '?').trim().match(/[A-Za-zÀ-ỹ0-9]/);
    return m ? m[0].toUpperCase() : '?';
  }
  function param(name) { return new URLSearchParams(location.search).get(name); }
  function debounce(fn, ms) {
    var t; return function () { var a = arguments, c = this; clearTimeout(t); t = setTimeout(function () { fn.apply(c, a); }, ms || 200); };
  }

  /* Khung hình có ảnh + màu thay thế khi chưa có ảnh */
  function phBox(src, label, cls, extra) {
    var img = src ? '<img src="' + esc(src) + '" alt="' + esc(label) + '" loading="lazy" decoding="async" onerror="this.remove()">' : '';
    return '<div class="ph ' + (cls || '') + '" style="--h:' + hueOf(label) + '" data-initial="' + esc(initial(label)) + '">' + img + (extra || '') + '</div>';
  }

  /* ---------- Thẻ game / hãng / review dùng nhiều trang ---------- */
  function scoreBadge(score, size) {
    var p = Math.max(0, Math.min(100, (Number(score) || 0) * 10));
    return '<span class="score ' + (size || '') + '" style="--p:' + p + '" title="' + esc(scoreLabel(score)) + '"><b>' + fmtScore(score) + '</b></span>';
  }
  function gameCard(g, idx) {
    var dev = E.DB.nhaPhatTrien.get(g.MaNPT);
    var n = E.DB.reviewsOf(g.MaGame).length;
    var url = 'game-detail.html?id=' + encodeURIComponent(g.MaGame);
    return '<article class="game-card reveal" style="--d:' + Math.min((idx || 0) * 60, 360) + 'ms" data-tilt>' +
      '<a class="game-card__cover" href="' + url + '" aria-label="Xem ' + esc(g.TenGame) + '">' +
        phBox(g.AnhBia, g.TenGame, 'game-card__ph') +
        '<span class="game-card__genre">' + esc(g.TheLoai) + '</span>' +
        scoreBadge(g.DiemDanhGia) +
      '</a>' +
      '<div class="game-card__body">' +
        '<h3 class="game-card__title"><a href="' + url + '">' + esc(g.TenGame) + '</a></h3>' +
        '<a class="game-card__dev" href="developers.html#' + esc(g.MaNPT) + '">' + icon('building') + esc(dev ? dev.TenNPT : 'Chưa rõ hãng') + '</a>' +
        '<div class="game-card__foot"><span>' + icon('calendar') + fmtDate(g.NgayPhatHanh) + '</span>' +
        '<span>' + icon('chat') + n + ' review</span></div>' +
      '</div></article>';
  }
  function devCard(d, idx) {
    var n = E.DB.gamesOf(d.MaNPT).length;
    return '<article class="dev-card reveal" style="--d:' + Math.min((idx || 0) * 60, 360) + 'ms" data-tilt>' +
      phBox(d.Logo, d.TenNPT, 'dev-card__logo') +
      '<h3 class="dev-card__name">' + esc(d.TenNPT) + '</h3>' +
      '<p class="dev-card__desc">' + esc(truncate(d.MoTa, 110)) + '</p>' +
      '<div class="dev-card__meta"><span class="pill">' + n + ' game</span>' +
      '<a class="dev-card__link" href="developers.html#' + esc(d.MaNPT) + '">Xem hãng ' + icon('arrowRight') + '</a></div>' +
      '</article>';
  }
  function avatar(user, cls) {
    var name = user ? user.HoTen : 'Ẩn danh';
    return '<span class="avatar ' + (cls || '') + '" style="--h:' + hueOf(name) + '">' + esc(initial(name)) + '</span>';
  }
  function reviewCard(r, opts) {
    opts = opts || {};
    var u = E.DB.nguoiDung.get(r.MaND);
    var g = opts.showGame ? E.DB.games.get(r.MaGame) : null;
    return '<article class="review-card reveal">' +
      '<header class="review-card__head">' + avatar(u) +
        '<div><strong>' + esc(u ? u.HoTen : 'Người dùng đã xóa') + '</strong><small>' + fmtDate(r.NgayDang) + '</small></div>' +
        scoreBadge(r.DiemSo, 'score--sm') +
      '</header>' +
      (g ? '<a class="review-card__game" href="game-detail.html?id=' + esc(g.MaGame) + '">' + icon('gamepad') + esc(g.TenGame) + '</a>' : '') +
      '<h4>' + esc(r.TieuDe) + '</h4>' +
      '<p>' + esc(opts.short ? truncate(r.NoiDung, 150) : r.NoiDung) + '</p>' +
      '</article>';
  }
  function emptyState(title, text, actionHtml) {
    return '<div class="empty">' +
      '<div class="empty__art" aria-hidden="true"><span></span><span></span><span></span></div>' +
      '<h3>' + esc(title) + '</h3><p>' + esc(text || '') + '</p>' + (actionHtml || '') + '</div>';
  }

  /* ---------- Toast ---------- */
  function toast(msg, type, ms) {
    var box = document.getElementById('toasts');
    if (!box) {
      box = document.createElement('div');
      box.id = 'toasts'; box.className = 'toasts';
      box.setAttribute('role', 'status'); box.setAttribute('aria-live', 'polite');
      document.body.appendChild(box);
    }
    var t = document.createElement('div');
    t.className = 'toast toast--' + (type || 'info');
    var ic = type === 'success' ? 'check' : type === 'error' ? 'alert' : 'info';
    t.innerHTML = icon(ic) + '<span>' + esc(msg) + '</span>';
    box.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('in'); });
    setTimeout(function () {
      t.classList.remove('in');
      setTimeout(function () { t.remove(); }, 400);
    }, ms || 3200);
  }

  /* ---------- Modal ---------- */
  var openCount = 0;
  function openModal(opt) {
    var wrap = document.createElement('div');
    wrap.className = 'modal';
    wrap.innerHTML =
      '<div class="modal__backdrop" data-close></div>' +
      '<div class="modal__box ' + (opt.size ? 'modal__box--' + opt.size : '') + '" role="dialog" aria-modal="true" aria-label="' + esc(opt.title || '') + '">' +
        '<header class="modal__head"><h3>' + esc(opt.title || '') + '</h3>' +
        '<button type="button" class="icon-btn" data-close aria-label="Đóng">' + icon('x') + '</button></header>' +
        '<div class="modal__body">' + (opt.content || '') + '</div>' +
        (opt.footer ? '<footer class="modal__foot">' + opt.footer + '</footer>' : '') +
      '</div>';
    document.body.appendChild(wrap);
    openCount++; document.body.classList.add('no-scroll');
    var prev = document.activeElement;
    function close() {
      if (wrap.dataset.closing) return;
      wrap.dataset.closing = '1';
      wrap.classList.remove('in');
      document.removeEventListener('keydown', onKey);
      setTimeout(function () {
        wrap.remove(); openCount = Math.max(0, openCount - 1);
        if (!openCount) document.body.classList.remove('no-scroll');
        if (prev && prev.focus) prev.focus();
        if (opt.onClose) opt.onClose();
      }, 250);
    }
    function onKey(e) { if (e.key === 'Escape') close(); }
    document.addEventListener('keydown', onKey);
    wrap.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) close(); });
    requestAnimationFrame(function () {
      wrap.classList.add('in');
      var f = wrap.querySelector('[autofocus], input, select, textarea, button.btn');
      if (f) f.focus({ preventScroll: true });
    });
    return { el: wrap, close: close };
  }
  function confirmBox(message, opt) {
    opt = opt || {};
    return new Promise(function (resolve) {
      var done = false;
      var m = openModal({
        title: opt.title || 'Xác nhận', size: 'sm',
        content: '<div class="confirm"><div class="confirm__ic">' + icon(opt.danger === false ? 'info' : 'alert') + '</div><p>' + esc(message) + '</p></div>',
        footer: '<button type="button" class="btn btn-ghost" data-close>Hủy</button>' +
          '<button type="button" class="btn ' + (opt.danger === false ? 'btn-primary' : 'btn-danger') + '" data-ok>' + esc(opt.okText || 'Đồng ý') + '</button>',
        onClose: function () { if (!done) { done = true; resolve(false); } }
      });
      m.el.querySelector('[data-ok]').addEventListener('click', function () { done = true; resolve(true); m.close(); });
    });
  }

  /* ---------- Hiệu ứng ---------- */
  var io = null;
  function initReveal(root) {
    root = root || document;
    var els = root.querySelectorAll('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    }
    els.forEach(function (e) { io.observe(e); });
  }
  function countUp(el, to, ms) {
    ms = ms || 1200;
    var start = null, from = 0;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min(1, (ts - start) / ms);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(from + (to - from) * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function tilt(root) {
    if (!window.matchMedia || !matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    (root || document).querySelectorAll('[data-tilt]:not([data-tilt-on])').forEach(function (el) {
      el.setAttribute('data-tilt-on', '1');
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--rx', (-y * 6).toFixed(2) + 'deg');
        el.style.setProperty('--ry', (x * 8).toFixed(2) + 'deg');
      });
      el.addEventListener('pointerleave', function () {
        el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg');
      });
    });
  }
  /* Gọi sau khi render động */
  function refresh(root) { initReveal(root); tilt(root); }

  E.UI = {
    icon: icon, esc: esc, fmtDate: fmtDate, fmtScore: fmtScore, scoreLabel: scoreLabel, truncate: truncate,
    hueOf: hueOf, initial: initial, param: param, debounce: debounce, phBox: phBox,
    scoreBadge: scoreBadge, gameCard: gameCard, devCard: devCard, reviewCard: reviewCard, avatar: avatar, emptyState: emptyState,
    toast: toast, openModal: openModal, confirm: confirmBox,
    initReveal: initReveal, countUp: countUp, tilt: tilt, refresh: refresh
  };
})();
