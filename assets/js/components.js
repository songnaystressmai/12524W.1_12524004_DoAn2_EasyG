/* ==========================================================
   EasyG – Thành phần dùng chung: Header, Footer, Drawer…
   Gắn vào <div id="app-header"> và <div id="app-footer">.
   Trang xác định mục menu đang chọn qua <body data-page="…">
   ========================================================== */
(function () {
  'use strict';
  var E = window.EasyG = window.EasyG || {};
  var UI = E.UI;

  var NAV = [
    { id: 'home',       href: 'index.html',      label: 'Trang chủ',     icon: 'home' },
    { id: 'games',      href: 'games.html',      label: 'Games',         icon: 'gamepad' },
    { id: 'developers', href: 'developers.html', label: 'Nhà phát triển', icon: 'building' },
    { id: 'about',      href: 'about.html',      label: 'Giới thiệu',    icon: 'info' },
    { id: 'contact',    href: 'contact.html',    label: 'Liên hệ',       icon: 'mail' }
  ];

  function navLinks(active, cls) {
    return NAV.map(function (n) {
      return '<a class="' + cls + (n.id === active ? ' is-active' : '') + '" href="' + n.href + '"' +
        (n.id === active ? ' aria-current="page"' : '') + '>' + (cls === 'drawer__link' ? UI.icon(n.icon) : '') + n.label + '</a>';
    }).join('');
  }

  function authHtml(user) {
    if (!user) {
      return '<a class="btn btn-primary btn-sm header-login" href="login.html?next=' + encodeURIComponent(location.pathname.split('/').pop() + location.search) + '">' +
        UI.icon('user') + '<span>Đăng nhập</span></a>';
    }
    return '<div class="user-menu">' +
      '<button type="button" class="user-chip" id="userChip" aria-haspopup="true" aria-expanded="false">' +
        UI.avatar(user) + '<span class="user-chip__name">' + UI.esc(user.HoTen) + '</span>' + UI.icon('chevronDown') +
      '</button>' +
      '<div class="user-pop" id="userPop" role="menu">' +
        '<div class="user-pop__who"><strong>' + UI.esc(user.HoTen) + '</strong><small>' + UI.esc(user.VaiTro) + ' · @' + UI.esc(user.TenDangNhap) + '</small></div>' +
        (user.VaiTro === E.Auth.ADMIN ? '<a role="menuitem" href="admin.html">' + UI.icon('dashboard') + 'Trang quản trị</a>' : '') +
        '<button type="button" role="menuitem" data-logout>' + UI.icon('logout') + 'Đăng xuất</button>' +
      '</div></div>';
  }

  function headerHtml(active, user) {
    return '<header class="site-header" id="siteHeader">' +
      '<div class="container header-inner">' +
        '<a class="logo" href="index.html" aria-label="EasyG – Trang chủ">' +
          '<span class="logo-mark"><img src="assets/images/logo/logo.png" alt="" onload="this.parentNode.classList.add(\'has-img\')" onerror="this.remove()"><b>E</b></span>' +
          '<span class="logo-word">asy<em>G</em></span>' +
        '</a>' +
        '<nav class="main-nav" aria-label="Menu chính">' + navLinks(active, 'nav-link') + '</nav>' +
        '<div class="header-actions">' +
          '<button type="button" class="icon-btn" id="btnSearch" aria-label="Tìm game" aria-expanded="false">' + UI.icon('search') + '</button>' +
          '<div id="authSlot">' + authHtml(user) + '</div>' +
          '<button type="button" class="icon-btn burger" id="btnBurger" aria-label="Mở menu" aria-expanded="false">' + UI.icon('menu') + '</button>' +
        '</div>' +
      '</div>' +
      '<form class="search-drop" id="searchDrop" action="games.html" method="get" role="search">' +
        '<div class="container"><label class="search-drop__field">' + UI.icon('search') +
        '<input type="search" name="q" placeholder="Nhập tên game cần tìm…" autocomplete="off" aria-label="Tìm game">' +
        '<button class="btn btn-primary btn-sm" type="submit">Tìm</button></label></div>' +
      '</form>' +
    '</header>' +
    '<div class="drawer" id="drawer" aria-hidden="true">' +
      '<div class="drawer__backdrop" data-drawer-close></div>' +
      '<aside class="drawer__panel" aria-label="Menu di động">' +
        '<div class="drawer__top"><span class="logo-word">Easy<em>G</em></span>' +
        '<button type="button" class="icon-btn" data-drawer-close aria-label="Đóng menu">' + UI.icon('x') + '</button></div>' +
        '<nav class="drawer__nav">' + navLinks(active, 'drawer__link') + '</nav>' +
        '<div class="drawer__auth" id="drawerAuth"></div>' +
      '</aside>' +
    '</div>';
  }

  function footerHtml() {
    var devs = E.DB.nhaPhatTrien.all().slice(0, 5);
    return '<footer class="site-footer">' +
      '<svg class="site-footer__wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 80V40C120 0 240 0 360 24s240 48 360 32 240-56 360-48 240 40 360 56V80z"/></svg>' +
      '<div class="container footer-grid">' +
        '<div class="footer-brand">' +
          '<a class="logo logo--light" href="index.html"><span class="logo-mark"><b>E</b></span><span class="logo-word">asy<em>G</em></span></a>' +
          '<p>Nơi tập hợp review và thông tin games – tìm nhanh, đọc dễ, chọn trúng game hợp gu của bạn.</p>' +
        '</div>' +
        '<div><h4>Khám phá</h4><ul>' +
          '<li><a href="games.html">Thư viện games</a></li><li><a href="developers.html">Nhà phát triển</a></li>' +
          '<li><a href="about.html">Giới thiệu EasyG</a></li><li><a href="contact.html">Liên hệ</a></li></ul></div>' +
        '<div><h4>Hãng nổi bật</h4><ul>' +
          devs.map(function (d) { return '<li><a href="developers.html#' + UI.esc(d.MaNPT) + '">' + UI.esc(d.TenNPT) + '</a></li>'; }).join('') +
        '</ul></div>' +
        '<div><h4>Tài khoản</h4><ul>' +
          '<li><a href="login.html">Đăng nhập</a></li><li><a href="admin.html">Trang quản trị</a></li></ul></div>' +
      '</div>' +
      '<div class="container footer-bottom"><span>© 2026 EasyG · – Website review và giới thiệu games</span>' +
      '<span>Your Games - Your Choice</span></div>' +
      '<div class="footer-giant" aria-hidden="true">EasyG</div>' +
    '</footer>' +
    '<button type="button" class="to-top" id="toTop" aria-label="Lên đầu trang">' + UI.icon('up') + '</button>';
  }

  /* ---------- Gắn sự kiện ---------- */
  function bindHeader() {
    var header = document.getElementById('siteHeader');
    var drawer = document.getElementById('drawer');
    var burger = document.getElementById('btnBurger');
    var searchBtn = document.getElementById('btnSearch');
    var searchDrop = document.getElementById('searchDrop');
    var toTop = document.getElementById('toTop');

    function onScroll() {
      var y = window.scrollY || 0;
      header.classList.toggle('is-scrolled', y > 8);
      if (toTop) toTop.classList.toggle('show', y > 600);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    if (toTop) toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

    function setDrawer(open) {
      drawer.classList.toggle('open', open);
      drawer.setAttribute('aria-hidden', String(!open));
      burger.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('no-scroll', open);
    }
    burger.addEventListener('click', function () { setDrawer(!drawer.classList.contains('open')); });
    drawer.addEventListener('click', function (e) { if (e.target.closest('[data-drawer-close]') || e.target.closest('a')) setDrawer(false); });

    searchBtn.addEventListener('click', function () {
      var open = !searchDrop.classList.contains('open');
      searchDrop.classList.toggle('open', open);
      searchBtn.setAttribute('aria-expanded', String(open));
      if (open) setTimeout(function () { searchDrop.querySelector('input').focus(); }, 120);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        setDrawer(false);
        searchDrop.classList.remove('open');
        searchBtn.setAttribute('aria-expanded', 'false');
      }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 900) setDrawer(false); });

    renderAuth();
  }

  function renderAuth() {
    var user = E.Auth.current();
    var slot = document.getElementById('authSlot');
    if (slot) slot.innerHTML = authHtml(user);
    var d = document.getElementById('drawerAuth');
    if (d) {
      d.innerHTML = user
        ? '<div class="drawer__who">' + UI.avatar(user) + '<div><strong>' + UI.esc(user.HoTen) + '</strong><small>' + UI.esc(user.VaiTro) + '</small></div></div>' +
          (user.VaiTro === E.Auth.ADMIN ? '<a class="btn btn-white btn-block" href="admin.html">' + UI.icon('dashboard') + 'Trang quản trị</a>' : '') +
          '<button type="button" class="btn btn-dark btn-block" data-logout>' + UI.icon('logout') + 'Đăng xuất</button>'
        : '<a class="btn btn-primary btn-block" href="login.html">' + UI.icon('user') + 'Đăng nhập</a>';
    }
    var chip = document.getElementById('userChip'), pop = document.getElementById('userPop');
    if (chip && pop) {
      chip.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = !pop.classList.contains('open');
        pop.classList.toggle('open', open);
        chip.setAttribute('aria-expanded', String(open));
      });
    }
  }

  function logout() {
    E.Auth.logout();
    UI.toast('Bạn đã đăng xuất. Hẹn gặp lại!', 'success');
    var page = document.body.dataset.page;
    setTimeout(function () {
      if (page === 'admin') location.href = 'login.html';
      else location.reload();
    }, 600);
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-logout]')) { logout(); return; }
    var pop = document.getElementById('userPop');
    if (pop && !e.target.closest('.user-menu')) {
      pop.classList.remove('open');
      var chip = document.getElementById('userChip'); if (chip) chip.setAttribute('aria-expanded', 'false');
    }
  });

  E.Components = { renderAuth: renderAuth };

  document.addEventListener('DOMContentLoaded', function () {
    var page = document.body.dataset.page || '';
    var user = E.Auth.current();
    var h = document.getElementById('app-header');
    var f = document.getElementById('app-footer');
    if (h) { h.innerHTML = headerHtml(page, user); bindHeader(); }
    if (f) f.innerHTML = footerHtml();
    UI.refresh(document);
  });
})();
