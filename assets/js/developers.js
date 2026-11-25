/* EasyG – Trang nhà phát triển: danh sách hãng, thông tin hãng, games của hãng */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  var E = window.EasyG, UI = E.UI, DB = E.DB;
  var grid = document.getElementById('devGrid');
  var detail = document.getElementById('devDetail');

  var devs = DB.nhaPhatTrien.all();
  grid.innerHTML = devs.length
    ? devs.map(UI.devCard).join('')
    : UI.emptyState('Chưa có nhà phát triển nào', 'Dữ liệu sẽ xuất hiện khi quản trị viên thêm hãng mới.');
  UI.refresh(grid);

  function show(scroll) {
    var id = decodeURIComponent(location.hash.replace('#', ''));
    var d = id ? DB.nhaPhatTrien.get(id) : null;
    grid.querySelectorAll('.dev-card').forEach(function (c, i) { c.classList.toggle('is-selected', !!d && devs[i].MaNPT === id); });
    if (!d) { detail.innerHTML = ''; return; }

    var games = DB.gamesOf(d.MaNPT).sort(function (a, b) { return (b.DiemDanhGia || 0) - (a.DiemDanhGia || 0); });
    document.title = d.TenNPT + ' – Nhà phát triển | EasyG';
    detail.innerHTML =
      '<div class="dev-detail__box">' +
        '<div class="dev-detail__head">' + UI.phBox(d.Logo, d.TenNPT, 'dev-detail__logo') +
          '<div><span class="eyebrow">Thông tin hãng</span><h2 style="margin-top:.5rem">' + UI.esc(d.TenNPT) + '</h2>' +
          '<p>' + UI.esc(d.MoTa) + '</p>' +
          '<div class="dev-detail__stats"><span class="pill">' + games.length + ' game</span>' +
          '<span class="pill pill--yellow">Điểm TB ' + UI.fmtScore(DB.devScore(d.MaNPT)) + '</span></div></div></div>' +
        '<div class="dev-detail__games"><h3>Games của ' + UI.esc(d.TenNPT) + '</h3>' +
          (games.length ? '<div class="grid-games">' + games.map(UI.gameCard).join('') + '</div>'
            : UI.emptyState('Hãng chưa có game nào', 'Games sẽ hiển thị tại đây khi được thêm vào hệ thống.')) +
          '<div style="margin-top:1.6rem;text-align:center"><a class="btn btn-primary" href="games.html?hang=' + encodeURIComponent(d.MaNPT) + '">Xem trong thư viện games</a></div>' +
        '</div></div>';
    UI.refresh(detail);
    if (scroll) setTimeout(function () { detail.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
  }

  window.addEventListener('hashchange', function () { show(true); });
  show(!!location.hash);
});
