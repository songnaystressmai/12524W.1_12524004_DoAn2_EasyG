/* EasyG – Trang chi tiết game: thông tin, cấu hình, hình ảnh, đánh giá & review */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  var E = window.EasyG, UI = E.UI, DB = E.DB, Auth = E.Auth;
  var root = document.getElementById('detailRoot');
  var id = UI.param('id');
  var game = DB.games.get(id);

  if (!game) {
    root.innerHTML = '<section class="section"><div class="container">' +
      UI.emptyState('Không tìm thấy game này', 'Game có thể đã bị xóa hoặc đường dẫn không đúng.',
        '<a class="btn btn-primary" href="games.html">Về thư viện games</a>') + '</div></section>';
    document.title = 'Không tìm thấy game – EasyG';
    return;
  }

  var lightbox = null;

  function parseSpecs(text) {
    return String(text || '').split(/\r?\n/).map(function (l) { return l.trim(); }).filter(Boolean).map(function (l) {
      var i = l.indexOf(':');
      return i > 0 ? { k: l.slice(0, i).trim(), v: l.slice(i + 1).trim() } : { k: 'Thông tin', v: l };
    });
  }
  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function build() {
    game = DB.games.get(id);
    var dev = DB.nhaPhatTrien.get(game.MaNPT);
    var reviews = DB.reviewsOf(game.MaGame);
    var specs = parseSpecs(game.CauHinh);
    var imgs = game.HinhAnh || [];
    var hue = UI.hueOf(game.TenGame);
    var devName = dev ? dev.TenNPT : 'Chưa rõ hãng';
    document.title = game.TenGame + ' – Review & thông tin | EasyG';

    /* ---------- Hero ---------- */
    var hero =
      '<section class="gd-hero">' +
        '<div class="gd-hero__bg" style="--h:' + hue + '" aria-hidden="true">' + (game.AnhBia ? '<img src="' + UI.esc(game.AnhBia) + '" alt="" onerror="this.remove()">' : '') + '</div>' +
        '<div class="container gd-hero__inner">' +
          '<div class="gd-cover ph" data-tilt style="--h:' + hue + '" data-initial="' + UI.esc(UI.initial(game.TenGame)) + '">' +
            (game.AnhBia ? '<img src="' + UI.esc(game.AnhBia) + '" alt="Ảnh bìa ' + UI.esc(game.TenGame) + '" onerror="this.remove()">' : '') + '</div>' +
          '<div class="gd-info">' +
            '<nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Trang chủ</a>' + UI.icon('chevronRight') + '<a href="games.html">Games</a>' + UI.icon('chevronRight') + '<span>' + UI.esc(UI.truncate(game.TenGame, 30)) + '</span></nav>' +
            '<div class="gd-tags"><span class="pill">' + UI.esc(game.TheLoai) + '</span>' +
              '<a class="pill" href="developers.html#' + UI.esc(game.MaNPT) + '">' + UI.esc(devName) + '</a></div>' +
            '<h1>' + UI.esc(game.TenGame) + '</h1>' +
            '<div class="gd-meta"><span>' + UI.icon('calendar') + 'Phát hành ' + UI.fmtDate(game.NgayPhatHanh) + '</span>' +
              '<a href="developers.html#' + UI.esc(game.MaNPT) + '">' + UI.icon('building') + UI.esc(devName) + '</a>' +
              '<span>' + UI.icon('chat') + reviews.length + ' review</span></div>' +
            '<div class="gd-score">' + UI.scoreBadge(game.DiemDanhGia, 'score--lg') +
              '<div><strong>' + UI.esc(UI.scoreLabel(game.DiemDanhGia)) + '</strong><small>Điểm EasyG · ' + reviews.length + ' lượt đánh giá</small></div></div>' +
            '<div class="gd-actions"><a class="btn btn-yellow" href="#danh-gia">' + UI.icon('star') + 'Viết đánh giá</a>' +
              '<a class="btn btn-outline-light" href="games.html?hang=' + encodeURIComponent(game.MaNPT) + '">Games cùng hãng</a></div>' +
          '</div>' +
        '</div>' +
      '</section>' +
      '<div class="gd-nav-wrap"><nav class="gd-nav" id="gdNav" aria-label="Các mục">' +
        '<a href="#mo-ta">Mô tả</a><a href="#cau-hinh">Cấu hình</a><a href="#hinh-anh">Hình ảnh</a><a href="#danh-gia">Đánh giá</a></nav></div>';

    /* ---------- Mô tả + cấu hình + hình ảnh ---------- */
    var body =
      '<div class="container">' +
        '<section class="gd-block reveal" id="mo-ta"><h2>Giới thiệu game</h2><p class="gd-desc">' + UI.esc(game.MoTa) + '</p></section>' +
        '<section class="gd-block reveal" id="cau-hinh"><h2>Cấu hình &amp; thông tin</h2>' +
          (specs.length ? '<div class="spec">' + specs.map(function (s) {
            return '<div class="spec__item"><small>' + UI.esc(s.k) + '</small><strong>' + UI.esc(s.v) + '</strong></div>';
          }).join('') + '</div>' : '<p class="field-hint">Chưa có thông tin cấu hình cho game này.</p>') +
        '</section>' +
        '<section class="gd-block reveal" id="hinh-anh"><h2>Hình ảnh trong game</h2>' +
          (imgs.length ? '<div class="gallery">' + imgs.map(function (im, i) {
            return '<button type="button" class="gallery__item" data-i="' + i + '" aria-label="Xem ảnh: ' + UI.esc(im.ChuThich) + '">' +
              UI.phBox(im.DuongDan, game.TenGame + ' ' + (i + 1)) + (im.ChuThich ? '<span class="gallery__cap">' + UI.esc(im.ChuThich) + '</span>' : '') + '</button>';
          }).join('') + '</div>' : '<p class="field-hint">Chưa có hình ảnh cho game này.</p>') +
        '</section>' +
        '<section class="gd-block" id="danh-gia"><h2>Đánh giá &amp; review</h2>' + reviewsHtml(reviews) + '</section>' +
      '</div>';

    /* ---------- Games cùng hãng ---------- */
    var related = DB.gamesOf(game.MaNPT).filter(function (g) { return g.MaGame !== game.MaGame; }).slice(0, 4);
    var rel = related.length
      ? '<section class="section section--soft" style="margin-top:clamp(40px,6vw,80px)"><div class="container">' +
        '<div class="sec-head reveal"><div><span class="eyebrow eyebrow--yellow">Cùng hãng</span><h2>Games khác của <mark>' + UI.esc(devName) + '</mark></h2></div></div>' +
        '<div class="grid-games">' + related.map(UI.gameCard).join('') + '</div></div></section>'
      : '<div style="height:clamp(56px,8vw,104px)"></div>';

    root.innerHTML = hero + body + rel;
    afterRender(reviews);
  }

  /* ---------- Khối review (tóm tắt + form + danh sách) ---------- */
  function reviewsHtml(reviews) {
    var total = reviews.length;
    var buckets = [
      { l: '9 – 10', f: function (s) { return s >= 9; } },
      { l: '7 – 8', f: function (s) { return s >= 7 && s < 9; } },
      { l: '5 – 6', f: function (s) { return s >= 5 && s < 7; } },
      { l: '3 – 4', f: function (s) { return s >= 3 && s < 5; } },
      { l: '1 – 2', f: function (s) { return s < 3; } }
    ];
    var bars = buckets.map(function (b) {
      var n = reviews.filter(function (r) { return b.f(Number(r.DiemSo)); }).length;
      var w = total ? Math.round(n / total * 100) : 0;
      return '<div class="bar"><span>' + b.l + '</span><div class="bar__track"><div class="bar__fill" data-w="' + w + '%"></div></div><span>' + n + '</span></div>';
    }).join('');

    var summary =
      '<div class="panel rv-summary"><div class="rv-summary__top">' + UI.scoreBadge(game.DiemDanhGia, 'score--lg') +
        '<div><strong>' + UI.esc(UI.scoreLabel(game.DiemDanhGia)) + '</strong><small>' + total + ' đánh giá</small></div></div>' +
        '<div class="bars">' + bars + '</div></div>';

    var list = total
      ? reviews.map(function (r) { return UI.reviewCard(r); }).join('')
      : UI.emptyState('Chưa có review nào', 'Hãy là người đầu tiên chia sẻ cảm nhận về game này!');

    return '<div class="rv-layout">' +
      '<aside class="rv-side">' + summary + formHtml() + '</aside>' +
      '<div class="rv-list"><div class="rv-list__head"><h3>Cảm nhận từ người chơi</h3><span class="pill pill--dark">' + total + ' review</span></div>' + list + '</div>' +
      '</div>';
  }

  function formHtml() {
    var u = Auth.current();
    var next = encodeURIComponent('game-detail.html?id=' + id);
    if (!u) {
      return '<div class="panel rv-form"><h3>Viết đánh giá</h3><div class="alert alert--info">' + UI.icon('lock') +
        '<span>Bạn cần đăng nhập để chấm điểm và viết review.</span></div>' +
        '<a class="btn btn-primary btn-block" style="margin-top:1rem" href="login.html?next=' + next + '">Đăng nhập để đánh giá</a></div>';
    }
    if (u.VaiTro === Auth.ADMIN) {
      return '<div class="panel rv-form"><h3>Viết đánh giá</h3><div class="alert alert--info">' + UI.icon('info') +
        '<span>Tài khoản Admin dùng để quản lý nội dung. Hãy đăng nhập bằng tài khoản người dùng để viết review, hoặc xóa review không phù hợp trong trang quản trị.</span></div>' +
        '<a class="btn btn-dark btn-block" style="margin-top:1rem" href="admin.html">Đến trang quản trị</a></div>';
    }
    var mine = DB.danhGia.all().filter(function (r) { return r.MaGame === id && r.MaND === u.MaND; })[0];
    if (mine) {
      return '<div class="panel rv-form"><h3>Đánh giá của bạn</h3><div class="alert alert--info">' + UI.icon('check') +
        '<span>Bạn đã đánh giá game này với điểm <b>' + UI.fmtScore(mine.DiemSo) + '</b>. Cảm ơn bạn đã chia sẻ!</span></div></div>';
    }
    return '<div class="panel rv-form"><h3>Viết đánh giá</h3>' +
      '<form id="reviewForm" novalidate>' +
        '<div class="rate"><div class="rate__out"><b id="rateNum">8.0</b><span id="rateLabel">Rất tốt</span></div>' +
        '<input class="range" id="rateRange" type="range" min="1" max="10" step="0.5" value="8" aria-label="Điểm đánh giá từ 1 đến 10"></div>' +
        '<div class="field"><label for="rvTitle">Tiêu đề <span class="req">*</span></label><input class="input" id="rvTitle" maxlength="80" placeholder="Tóm tắt cảm nhận của bạn"><span class="field-error"></span></div>' +
        '<div class="field"><label for="rvBody">Nội dung <span class="req">*</span></label><textarea class="textarea" id="rvBody" maxlength="800" placeholder="Game hay ở điểm nào? Điều gì chưa ưng ý?"></textarea><span class="field-error"></span><span class="count" id="rvCount">0 / 800</span></div>' +
        '<button class="btn btn-primary btn-block" type="submit">' + UI.icon('star') + 'Gửi đánh giá</button>' +
      '</form></div>';
  }

  /* ---------- Sau khi render: gắn sự kiện ---------- */
  function afterRender(reviews) {
    UI.refresh(root);

    /* thanh phân bố điểm: animate */
    requestAnimationFrame(function () {
      root.querySelectorAll('.bar__fill').forEach(function (b) { b.style.setProperty('--w', b.dataset.w); });
    });

    /* gallery + lightbox */
    root.querySelectorAll('.gallery__item').forEach(function (b) {
      b.addEventListener('click', function () { openLightbox(parseInt(b.dataset.i, 10)); });
    });

    /* thanh mục dính: tô sáng mục đang xem */
    var links = Array.prototype.slice.call(document.querySelectorAll('#gdNav a'));
    var secs = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
    function spy() {
      var y = window.scrollY + 180, cur = 0;
      secs.forEach(function (s, i) { if (s && s.offsetTop <= y) cur = i; });
      links.forEach(function (a, i) { a.classList.toggle('is-on', i === cur); });
    }
    window.removeEventListener('scroll', window.__gdSpy);
    window.__gdSpy = spy; window.addEventListener('scroll', spy, { passive: true }); spy();

    /* form review */
    var form = document.getElementById('reviewForm');
    if (!form) return;
    var range = document.getElementById('rateRange'), num = document.getElementById('rateNum'), lab = document.getElementById('rateLabel');
    var body = document.getElementById('rvBody'), title = document.getElementById('rvTitle');
    function updRange() {
      var v = parseFloat(range.value);
      num.textContent = v.toFixed(1); lab.textContent = UI.scoreLabel(v);
      range.style.setProperty('--fill', ((v - 1) / 9 * 100) + '%');
    }
    range.addEventListener('input', updRange); updRange();
    body.addEventListener('input', function () { document.getElementById('rvCount').textContent = body.value.length + ' / 800'; });

    function setErr(input, msg) {
      var f = input.closest('.field'); f.classList.toggle('has-error', !!msg);
      f.querySelector('.field-error').textContent = msg || '';
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var u = Auth.current();
      if (!u || u.VaiTro !== Auth.USER) { UI.toast('Bạn cần đăng nhập bằng tài khoản người dùng.', 'error'); return; }
      var t = title.value.trim(), b = body.value.trim(), ok = true;
      setErr(title, ''); setErr(body, '');
      if (t.length < 3) { setErr(title, 'Tiêu đề cần ít nhất 3 ký tự.'); ok = false; }
      if (b.length < 10) { setErr(body, 'Nội dung cần ít nhất 10 ký tự.'); ok = false; }
      if (!ok) { UI.toast('Vui lòng kiểm tra lại thông tin.', 'error'); return; }
      DB.addReview({ MaGame: id, MaND: u.MaND, DiemSo: parseFloat(range.value), TieuDe: t, NoiDung: b, NgayDang: today() });
      UI.toast('Cảm ơn bạn! Đánh giá đã được gửi.', 'success');
      build();
      var el = document.getElementById('danh-gia'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* ---------- Lightbox ---------- */
  function openLightbox(i) {
    var imgs = game.HinhAnh || [];
    if (!imgs.length) return;
    var cur = i;
    var el = document.createElement('div');
    el.className = 'lightbox'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true');
    document.body.appendChild(el); document.body.classList.add('no-scroll');
    function paint() {
      var im = imgs[cur];
      el.innerHTML =
        '<button type="button" class="lightbox__close" data-act="close" aria-label="Đóng">' + UI.icon('x') + '</button>' +
        '<div class="lightbox__stage">' +
          UI.phBox(im.DuongDan, game.TenGame + ' ' + (cur + 1), 'lightbox__img') +
          '<div class="lightbox__cap">' + UI.esc(im.ChuThich || '') + ' · ' + (cur + 1) + '/' + imgs.length + '</div>' +
          (imgs.length > 1 ? '<button type="button" class="lightbox__btn lightbox__prev" data-act="prev" aria-label="Ảnh trước">' + UI.icon('chevronLeft') + '</button>' +
            '<button type="button" class="lightbox__btn lightbox__next" data-act="next" aria-label="Ảnh sau">' + UI.icon('chevronRight') + '</button>' : '') +
        '</div>';
    }
    function go(d) { cur = (cur + d + imgs.length) % imgs.length; paint(); }
    function close() {
      el.classList.remove('in'); document.removeEventListener('keydown', key);
      setTimeout(function () { el.remove(); document.body.classList.remove('no-scroll'); }, 220);
    }
    function key(e) { if (e.key === 'Escape') close(); else if (e.key === 'ArrowLeft') go(-1); else if (e.key === 'ArrowRight') go(1); }
    el.addEventListener('click', function (e) {
      var a = e.target.closest('[data-act]');
      if (a) { if (a.dataset.act === 'close') close(); else go(a.dataset.act === 'next' ? 1 : -1); }
      else if (!e.target.closest('.lightbox__stage')) close();
    });
    /* vuốt trái/phải trên điện thoại */
    var sx = null;
    el.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', function (e) {
      if (sx === null) return; var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50 && imgs.length > 1) go(dx < 0 ? 1 : -1); sx = null;
    });
    document.addEventListener('keydown', key);
    paint(); requestAnimationFrame(function () { el.classList.add('in'); });
  }

  build();
});
