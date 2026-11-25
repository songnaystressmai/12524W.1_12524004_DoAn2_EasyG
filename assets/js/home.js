/* EasyG – Trang chủ */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  var E = window.EasyG, UI = E.UI, DB = E.DB;
  var $ = function (id) { return document.getElementById(id); };

  var games = DB.games.all().slice().sort(function (a, b) { return (b.DiemDanhGia || 0) - (a.DiemDanhGia || 0); });

  /* ----- Hero: 3 game điểm cao nhất ----- */
  var top3 = games.slice(0, 3);
  var slots = [{ cls: 'hc1', rank: 2, g: top3[1] }, { cls: 'hc2', rank: 1, g: top3[0] }, { cls: 'hc3', rank: 3, g: top3[2] }];
  $('heroStack').innerHTML = slots.filter(function (s) { return s.g; }).map(function (s) {
    return '<a class="hero-card ' + s.cls + '" href="game-detail.html?id=' + UI.esc(s.g.MaGame) + '" aria-label="' + UI.esc(s.g.TenGame) + '">' +
      UI.phBox(s.g.AnhBia, s.g.TenGame) +
      '<span class="hero-card__rank">#' + s.rank + '</span>' +
      '<div class="hero-card__info"><strong>' + UI.esc(s.g.TenGame) + '</strong>' + UI.scoreBadge(s.g.DiemDanhGia) + '</div></a>';
  }).join('');

  /* ----- Chip thể loại ----- */
  var count = {};
  DB.games.all().forEach(function (g) { count[g.TheLoai] = (count[g.TheLoai] || 0) + 1; });
  var genres = Object.keys(count).sort(function (a, b) { return count[b] - count[a]; }).slice(0, 5);
  $('heroChips').innerHTML = '<span>Gợi ý:</span>' + genres.map(function (t) {
    return '<a href="games.html?theLoai=' + encodeURIComponent(t) + '">' + UI.esc(t) + '</a>';
  }).join('');

  /* ----- Dải chữ chạy ----- */
  var words = DB.nhaPhatTrien.all().map(function (d) { return d.TenNPT; }).concat(['Review', 'Chơi là mê', 'EasyG']);
  var strip = words.map(function (w) { return '<span class="marquee__item">' + UI.esc(w) + UI.icon('star') + '</span>'; }).join('');
  $('marquee').innerHTML = strip + strip;

  /* ----- Hãng nổi bật: nhiều game nhất ----- */
  var devs = DB.nhaPhatTrien.all().slice().sort(function (a, b) { return DB.gamesOf(b.MaNPT).length - DB.gamesOf(a.MaNPT).length; }).slice(0, 8);
  $('homeDevs').innerHTML = devs.map(UI.devCard).join('');

  /* ----- Games nổi bật ----- */
  $('homeGames').innerHTML = games.slice(0, 8).map(UI.gameCard).join('');

  /* ----- Review mới nhất ----- */
  var rs = DB.danhGia.all().slice().sort(function (a, b) { return (b.NgayDang + b.MaDG).localeCompare(a.NgayDang + a.MaDG); }).slice(0, 3);
  $('homeReviews').innerHTML = rs.length
    ? rs.map(function (r) { return UI.reviewCard(r, { showGame: true, short: true }); }).join('')
    : UI.emptyState('Chưa có review nào', 'Hãy là người đầu tiên chia sẻ cảm nhận về một tựa game!');

  /* ----- Thống kê đếm lên ----- */
  var st = DB.stats();
  var statsEl = document.querySelector('.stats');
  var done = false;
  function runCounts() {
    if (done) return; done = true;
    document.querySelectorAll('[data-count]').forEach(function (el) { UI.countUp(el, st[el.dataset.count] || 0, 1300); });
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en, ob) { if (en[0].isIntersecting) { runCounts(); ob.disconnect(); } }, { threshold: .3 }).observe(statsEl);
  } else runCounts();

  /* ----- CTA theo trạng thái đăng nhập ----- */
  var u = E.Auth.current(), cta = $('ctaBand');
  if (!u) {
    cta.innerHTML = '<h2>Đã chơi game hay? Kể cho mọi người nghe!</h2><p>Đăng nhập để chấm điểm và viết review – mỗi đánh giá của bạn giúp người chơi khác chọn game dễ hơn.</p>' +
      '<div class="btn-row"><a class="btn btn-yellow" href="login.html">Đăng nhập để review</a><a class="btn btn-outline-light" href="games.html">Xem games</a></div>';
  } else if (u.VaiTro === E.Auth.ADMIN) {
    cta.innerHTML = '<h2>Chào ' + UI.esc(u.HoTen) + '!</h2><p>Cập nhật games, nhà phát triển và kiểm duyệt review ngay trong trang quản trị.</p>' +
      '<div class="btn-row"><a class="btn btn-yellow" href="admin.html">Vào trang quản trị</a><a class="btn btn-outline-light" href="games.html">Xem games</a></div>';
  } else {
    cta.innerHTML = '<h2>Chào ' + UI.esc(u.HoTen) + ', hôm nay chơi gì?</h2><p>Chọn một tựa game bạn đã trải nghiệm và để lại điểm số cùng review của riêng bạn.</p>' +
      '<div class="btn-row"><a class="btn btn-yellow" href="games.html">Chọn game để review</a></div>';
  }

  UI.refresh(document);
});
