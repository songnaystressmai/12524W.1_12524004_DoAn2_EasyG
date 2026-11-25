/* EasyG – Trang danh sách games: tìm kiếm, lọc, sắp xếp, phân trang */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  var E = window.EasyG, UI = E.UI, DB = E.DB;
  var $ = function (id) { return document.getElementById(id); };
  var PER_PAGE = 12;

  var state = {
    q: UI.param('q') || '',
    hang: UI.param('hang') || '',
    theLoai: UI.param('theLoai') || '',
    sort: UI.param('sort') || 'diem',
    page: parseInt(UI.param('page'), 10) || 1
  };

  var devs = DB.nhaPhatTrien.all();
  if (state.hang && !DB.nhaPhatTrien.get(state.hang)) state.hang = '';

  /* Đổ dữ liệu cho bộ lọc */
  var genreSel = $('fGenre');
  DB.genres().forEach(function (t) {
    var o = document.createElement('option'); o.value = t; o.textContent = t; genreSel.appendChild(o);
  });
  $('fQ').value = state.q; genreSel.value = state.theLoai; $('fSort').value = state.sort;
  if (genreSel.value !== state.theLoai) { state.theLoai = ''; genreSel.value = ''; }

  function renderChips() {
    var all = '<button type="button" class="chip' + (!state.hang ? ' is-on' : '') + '" data-hang="">Tất cả</button>';
    $('fDevs').innerHTML = all + devs.map(function (d) {
      return '<button type="button" class="chip' + (state.hang === d.MaNPT ? ' is-on' : '') + '" data-hang="' + UI.esc(d.MaNPT) + '">' +
        UI.esc(d.TenNPT) + ' · ' + DB.gamesOf(d.MaNPT).length + '</button>';
    }).join('');
  }

  function syncUrl() {
    var p = new URLSearchParams();
    if (state.q) p.set('q', state.q);
    if (state.hang) p.set('hang', state.hang);
    if (state.theLoai) p.set('theLoai', state.theLoai);
    if (state.sort !== 'diem') p.set('sort', state.sort);
    if (state.page > 1) p.set('page', state.page);
    var qs = p.toString();
    try { history.replaceState(null, '', location.pathname + (qs ? '?' + qs : '')); } catch (e) {}
  }

  function render(scroll) {
    var list = DB.searchGames({ q: state.q, hang: state.hang, theLoai: state.theLoai, sort: state.sort });
    var pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    if (state.page > pages) state.page = pages;
    if (state.page < 1) state.page = 1;
    var from = (state.page - 1) * PER_PAGE;
    var slice = list.slice(from, from + PER_PAGE);

    /* Tiêu đề kết quả */
    var title = 'Tất cả games';
    if (state.q) title = 'Kết quả cho “' + state.q + '”';
    else if (state.hang) { var d = DB.nhaPhatTrien.get(state.hang); title = 'Games của ' + (d ? d.TenNPT : ''); }
    else if (state.theLoai) title = 'Thể loại: ' + state.theLoai;
    $('resultTitle').textContent = title;
    $('resultCount').innerHTML = list.length
      ? 'Hiển thị <strong>' + (from + 1) + '–' + (from + slice.length) + '</strong> trên <strong>' + list.length + '</strong> game'
      : '<strong>0</strong> game';

    $('gameGrid').innerHTML = slice.length
      ? slice.map(UI.gameCard).join('')
      : UI.emptyState('Không tìm thấy game nào', 'Hãy thử từ khóa khác hoặc bỏ bớt bộ lọc để xem thêm kết quả.',
          '<button type="button" class="btn btn-primary" id="emptyClear">Xóa bộ lọc</button>');

    /* Phân trang */
    var pager = $('pager');
    if (pages <= 1) { pager.innerHTML = ''; }
    else {
      var h = '<button type="button" data-p="' + (state.page - 1) + '"' + (state.page === 1 ? ' disabled' : '') + ' aria-label="Trang trước">' + UI.icon('chevronLeft') + '</button>';
      for (var i = 1; i <= pages; i++) h += '<button type="button" data-p="' + i + '" class="' + (i === state.page ? 'is-current' : '') + '"' + (i === state.page ? ' aria-current="page"' : '') + '>' + i + '</button>';
      h += '<button type="button" data-p="' + (state.page + 1) + '"' + (state.page === pages ? ' disabled' : '') + ' aria-label="Trang sau">' + UI.icon('chevronRight') + '</button>';
      pager.innerHTML = h;
    }

    renderChips();
    syncUrl();
    UI.refresh($('gameGrid'));
    if (scroll) {
      var top = document.querySelector('.result-bar').getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  }

  function clearAll() {
    state.q = ''; state.hang = ''; state.theLoai = ''; state.sort = 'diem'; state.page = 1;
    $('fQ').value = ''; genreSel.value = ''; $('fSort').value = 'diem';
    render();
  }

  $('fQ').addEventListener('input', UI.debounce(function (e) { state.q = e.target.value.trim(); state.page = 1; render(); }, 180));
  genreSel.addEventListener('change', function () { state.theLoai = genreSel.value; state.page = 1; render(); });
  $('fSort').addEventListener('change', function (e) { state.sort = e.target.value; state.page = 1; render(); });
  $('fClear').addEventListener('click', clearAll);
  $('fDevs').addEventListener('click', function (e) {
    var b = e.target.closest('[data-hang]'); if (!b) return;
    state.hang = b.dataset.hang; state.page = 1; render();
  });
  $('pager').addEventListener('click', function (e) {
    var b = e.target.closest('[data-p]'); if (!b || b.disabled) return;
    state.page = parseInt(b.dataset.p, 10); render(true);
  });
  $('gameGrid').addEventListener('click', function (e) { if (e.target.closest('#emptyClear')) clearAll(); });

  render();
});
