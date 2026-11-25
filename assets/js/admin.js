/* ==========================================================
   EasyG – Trang quản trị (Admin)
   Quản lý: Games · Nhà phát triển · Đánh giá & Reviews · Người dùng
   ========================================================== */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  var E = window.EasyG, UI = E.UI, DB = E.DB, Auth = E.Auth;
  if (!Auth.requireAdmin()) return;

  var $ = function (id) { return document.getElementById(id); };
  var content = $('admContent'), adm = $('adm');
  var PER_PAGE = 8;
  var state = { tab: 'dashboard', q: '', page: 1 };

  var TABS = [
    { id: 'dashboard', label: 'Tổng quan', icon: 'dashboard' },
    { id: 'games', label: 'Games', icon: 'gamepad', count: function () { return DB.games.all().length; } },
    { id: 'devs', label: 'Nhà phát triển', icon: 'building', count: function () { return DB.nhaPhatTrien.all().length; } },
    { id: 'reviews', label: 'Đánh giá & Reviews', icon: 'chat', count: function () { return DB.danhGia.all().length; } },
    { id: 'users', label: 'Người dùng', icon: 'users', count: function () { return DB.nguoiDung.all().length; } }
  ];

  /* ---------- Khung trang ---------- */
  function renderChrome() {
    var me = Auth.current();
    $('admBurger').innerHTML = UI.icon('menu');
    $('admWho').innerHTML = UI.avatar(me) + '<div>' + UI.esc(me.HoTen) + '<small>' + UI.esc(me.VaiTro) + '</small></div>';
    $('admNav').innerHTML = '<small>Quản lý</small>' + TABS.map(function (t) {
      return '<button type="button" data-tab="' + t.id + '" class="' + (state.tab === t.id ? 'is-on' : '') + '">' + UI.icon(t.icon) + t.label +
        (t.count ? '<span class="count-badge">' + t.count() + '</span>' : '') + '</button>';
    }).join('');
    $('admFoot').innerHTML =
      '<a href="index.html">' + UI.icon('home') + 'Về website</a>' +
      '<button type="button" data-logout>' + UI.icon('logout') + 'Đăng xuất</button>';
    var cur = TABS.filter(function (t) { return t.id === state.tab; })[0];
    $('admTitle').textContent = cur.label;
    document.title = cur.label + ' – Quản trị EasyG';
  }
  function closeSide() { adm.classList.remove('side-open'); }
  $('admBurger').addEventListener('click', function () { adm.classList.toggle('side-open'); });
  $('admBackdrop').addEventListener('click', closeSide);
  $('admNav').addEventListener('click', function (e) {
    var b = e.target.closest('[data-tab]'); if (!b) return;
    go(b.dataset.tab); closeSide();
  });

  function go(tab) {
    state.tab = tab; state.q = ''; state.page = 1;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function render() {
    renderChrome();
    var fn = { dashboard: viewDashboard, games: viewGames, devs: viewDevs, reviews: viewReviews, users: viewUsers }[state.tab];
    fn();
    UI.refresh(content);
  }

  /* ---------- Bảng + tìm kiếm + phân trang (dùng chung) ---------- */
  function renderList(cfg) {
    var all = cfg.rows();
    var q = DB.normalize(state.q);
    var rows = q ? all.filter(function (r) { return DB.normalize(cfg.searchText(r)).indexOf(q) !== -1; }) : all;
    var pages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
    if (state.page > pages) state.page = pages;
    var from = (state.page - 1) * PER_PAGE;
    var slice = rows.slice(from, from + PER_PAGE);

    var head = '<tr>' + cfg.cols.map(function (c) { return '<th>' + c.label + '</th>'; }).join('') + '<th></th></tr>';
    var body = slice.map(function (r) {
      var id = r[cfg.idField];
      return '<tr>' + cfg.cols.map(function (c, i) {
        return '<td data-label="' + UI.esc(c.label) + '" class="' + (i === 0 ? 'cell-first ' : '') + (c.cls || '') + '">' + c.cell(r) + '</td>';
      }).join('') + '<td class="cell-actions"><div class="row-actions">' + cfg.actions(r, id) + '</div></td></tr>';
    }).join('');

    var pager = '';
    if (pages > 1) {
      pager = '<div class="pagination">';
      pager += '<button type="button" data-p="' + (state.page - 1) + '"' + (state.page === 1 ? ' disabled' : '') + ' aria-label="Trang trước">' + UI.icon('chevronLeft') + '</button>';
      for (var i = 1; i <= pages; i++) pager += '<button type="button" data-p="' + i + '" class="' + (i === state.page ? 'is-current' : '') + '">' + i + '</button>';
      pager += '<button type="button" data-p="' + (state.page + 1) + '"' + (state.page === pages ? ' disabled' : '') + ' aria-label="Trang sau">' + UI.icon('chevronRight') + '</button></div>';
    }

    content.innerHTML =
      '<section class="adm-panel">' +
        '<div class="adm-bar">' +
          '<div class="input-icon">' + UI.icon('search') + '<input class="input" id="admSearch" type="search" placeholder="' + UI.esc(cfg.placeholder) + '" value="' + UI.esc(state.q) + '" autocomplete="off"></div>' +
          '<span class="meta">' + rows.length + ' kết quả</span>' +
          (cfg.addLabel ? '<button type="button" class="btn btn-primary btn-sm" data-add>' + UI.icon('plus') + cfg.addLabel + '</button>' : '') +
        '</div>' +
        (slice.length
          ? '<div class="table-wrap"><table class="tbl"><thead>' + head + '</thead><tbody>' + body + '</tbody></table></div>'
          : UI.emptyState('Không có dữ liệu', q ? 'Không có kết quả khớp từ khóa của bạn.' : 'Chưa có dữ liệu trong mục này.')) +
        '<div class="adm-pager"><span>Trang ' + state.page + ' / ' + pages + '</span>' + pager + '</div>' +
      '</section>';

    var s = $('admSearch');
    s.addEventListener('input', UI.debounce(function () {
      state.q = s.value.trim(); state.page = 1;
      var pos = s.selectionStart; renderList(cfg);
      var n = $('admSearch'); n.focus(); try { n.setSelectionRange(pos, pos); } catch (e) {}
    }, 200));
    content.querySelectorAll('[data-p]').forEach(function (b) {
      b.addEventListener('click', function () { if (b.disabled) return; state.page = parseInt(b.dataset.p, 10); renderList(cfg); });
    });
    var add = content.querySelector('[data-add]');
    if (add) add.addEventListener('click', cfg.onAdd);
    content.querySelectorAll('[data-act]').forEach(function (b) {
      b.addEventListener('click', function () { cfg.onAction(b.dataset.act, b.dataset.id); });
    });
  }
  function act(kind, id, label, ic) {
    return '<button type="button" class="act act--' + kind + '" data-act="' + kind + '" data-id="' + UI.esc(id) + '" aria-label="' + label + '" title="' + label + '">' + UI.icon(ic) + '</button>';
  }

  /* ---------- Biểu mẫu thêm / sửa dùng chung ---------- */
  function fieldHtml(f, v) {
    var id = 'f_' + f.name, val = v == null ? '' : v, input;
    var attrs = ' id="' + id + '" name="' + f.name + '"' + (f.placeholder ? ' placeholder="' + UI.esc(f.placeholder) + '"' : '') + (f.maxlength ? ' maxlength="' + f.maxlength + '"' : '');
    if (f.type === 'textarea') input = '<textarea class="textarea"' + attrs + ' rows="' + (f.rows || 4) + '">' + UI.esc(val) + '</textarea>';
    else if (f.type === 'select') {
      input = '<select class="select"' + attrs + '>' + f.options.map(function (o) {
        return '<option value="' + UI.esc(o.v) + '"' + (String(o.v) === String(val) ? ' selected' : '') + '>' + UI.esc(o.l) + '</option>';
      }).join('') + '</select>';
    } else {
      input = '<input class="input" type="' + (f.type || 'text') + '"' + attrs + ' value="' + UI.esc(val) + '"' + (f.step ? ' step="' + f.step + '"' : '') + (f.min != null ? ' min="' + f.min + '"' : '') + (f.max != null ? ' max="' + f.max + '"' : '') + '>';
    }
    return '<div class="field' + (f.full ? ' full' : '') + '"><label for="' + id + '">' + UI.esc(f.label) + (f.required ? ' <span class="req">*</span>' : '') + '</label>' +
      input + (f.hint ? '<span class="field-hint">' + f.hint + '</span>' : '') + '<span class="field-error"></span></div>';
  }
  function openForm(cfg) {
    var m = UI.openModal({
      title: cfg.title, size: cfg.size || 'lg',
      content: '<form class="form-modal" id="admForm" novalidate><div class="form-grid">' + cfg.fields.map(function (f) { return fieldHtml(f, cfg.values[f.name]); }).join('') + '</div></form>',
      footer: '<button type="button" class="btn btn-ghost" data-close>Hủy</button><button type="submit" form="admForm" class="btn btn-primary">' + UI.icon('check') + (cfg.submitLabel || 'Lưu') + '</button>'
    });
    var form = m.el.querySelector('#admForm');
    form.addEventListener('input', function (e) {
      var f = e.target.closest('.field'); if (f) { f.classList.remove('has-error'); f.querySelector('.field-error').textContent = ''; }
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var vals = {};
      cfg.fields.forEach(function (f) { var el = form.elements[f.name]; vals[f.name] = el ? el.value.trim() : ''; });
      var errs = {};
      cfg.fields.forEach(function (f) { if (f.required && !vals[f.name]) errs[f.name] = 'Vui lòng nhập ' + f.label.toLowerCase() + '.'; });
      var more = cfg.validate ? cfg.validate(vals, errs) : null;
      if (more) Object.keys(more).forEach(function (k) { errs[k] = more[k]; });
      var keys = Object.keys(errs);
      cfg.fields.forEach(function (f) {
        var field = form.elements[f.name].closest('.field');
        field.classList.toggle('has-error', !!errs[f.name]);
        field.querySelector('.field-error').textContent = errs[f.name] || '';
      });
      if (keys.length) { form.elements[keys[0]].focus(); UI.toast('Vui lòng kiểm tra lại các trường báo lỗi.', 'error'); return; }
      cfg.save(vals);
      m.close();
    });
  }

  /* ---------- TỔNG QUAN ---------- */
  function viewDashboard() {
    var st = DB.stats();
    var top = DB.games.all().slice().sort(function (a, b) { return (b.DiemDanhGia || 0) - (a.DiemDanhGia || 0); }).slice(0, 5);
    var latest = DB.danhGia.all().slice().sort(function (a, b) { return (b.NgayDang + b.MaDG).localeCompare(a.NgayDang + a.MaDG); }).slice(0, 4);
    var cards = [['gamepad', st.games, 'Games'], ['building', st.devs, 'Nhà phát triển'], ['chat', st.reviews, 'Đánh giá'], ['users', st.users, 'Người dùng']];
    content.innerHTML =
      '<div class="adm-cards">' + cards.map(function (c) { return '<div class="adm-stat reveal">' + UI.icon(c[0]) + '<b>' + c[1] + '</b><span>' + c[2] + '</span></div>'; }).join('') + '</div>' +
      '<div class="adm-two">' +
        '<section class="adm-panel reveal"><h2>Games điểm cao nhất</h2><div class="top-list">' + top.map(function (g, i) {
          var d = DB.nhaPhatTrien.get(g.MaNPT);
          return '<div class="top-item"><b>' + (i + 1) + '</b>' + UI.phBox(g.AnhBia, g.TenGame, 'thumb') +
            '<div><strong>' + UI.esc(g.TenGame) + '</strong><small>' + UI.esc(d ? d.TenNPT : '') + '</small></div>' + UI.scoreBadge(g.DiemDanhGia, 'score--sm') + '</div>';
        }).join('') + '</div></section>' +
        '<section class="adm-panel reveal"><h2>Review mới nhất</h2><div class="mini-list">' + (latest.length ? latest.map(function (r) {
          var u = DB.nguoiDung.get(r.MaND), g = DB.games.get(r.MaGame);
          return '<div class="mini-item">' + UI.avatar(u) + '<div><strong>' + UI.esc(r.TieuDe) + '</strong><small>' + UI.esc(u ? u.HoTen : 'Đã xóa') + ' · ' + UI.esc(g ? g.TenGame : '') + ' · ' + UI.fmtScore(r.DiemSo) + '/10</small></div></div>';
        }).join('') : '<p class="field-hint">Chưa có review nào.</p>') + '</div></section>' +
      '</div>' +
      '<div class="adm-note reveal">Dữ liệu được lưu bằng <b>LocalStorage</b> của trình duyệt này. Nếu cần làm lại từ đầu, bạn có thể khôi phục dữ liệu mẫu bên dưới.' +
        '<div style="margin-top:.8rem"><button type="button" class="btn btn-dark btn-sm" id="btnReset">' + UI.icon('refresh') + 'Khôi phục dữ liệu mẫu</button></div></div>';
    $('btnReset').addEventListener('click', function () {
      UI.confirm('Toàn bộ games, hãng, review và người dùng hiện tại sẽ bị thay bằng dữ liệu mẫu ban đầu. Tiếp tục?', { title: 'Khôi phục dữ liệu mẫu', okText: 'Khôi phục' }).then(function (ok) {
        if (!ok) return; DB.reset(); UI.toast('Đã khôi phục dữ liệu mẫu.', 'success'); render();
      });
    });
  }

  /* ---------- GAMES ---------- */
  function devOptions() { return DB.nhaPhatTrien.all().map(function (d) { return { v: d.MaNPT, l: d.TenNPT }; }); }
  function imagesToText(g) { return (g && g.HinhAnh ? g.HinhAnh : []).map(function (h) { return h.DuongDan + (h.ChuThich ? ' | ' + h.ChuThich : ''); }).join('\n'); }
  function nextHAId() {
    var max = 0;
    DB.games.all().forEach(function (g) { (g.HinhAnh || []).forEach(function (h) { var n = parseInt(String(h.MaHA).replace('HA', ''), 10); if (n > max) max = n; }); });
    return function () { max++; return 'HA' + String(max).padStart(3, '0'); };
  }
  function textToImages(text, old) {
    var gen = nextHAId(), byPath = {};
    (old || []).forEach(function (h) { byPath[h.DuongDan] = h.MaHA; });
    return String(text || '').split(/\r?\n/).map(function (l) { return l.trim(); }).filter(Boolean).map(function (l) {
      var i = l.indexOf('|'), path = (i >= 0 ? l.slice(0, i) : l).trim(), cap = i >= 0 ? l.slice(i + 1).trim() : '';
      return { MaHA: byPath[path] || gen(), DuongDan: path, ChuThich: cap };
    });
  }
  function gameForm(game) {
    var devs = devOptions();
    if (!devs.length) { UI.toast('Hãy thêm ít nhất một nhà phát triển trước.', 'error'); return; }
    var isEdit = !!game;
    openForm({
      title: isEdit ? 'Sửa game' : 'Thêm game mới', submitLabel: isEdit ? 'Lưu thay đổi' : 'Thêm game',
      values: game ? Object.assign({}, game, { HinhAnh: imagesToText(game) }) : { DiemDanhGia: '', NgayPhatHanh: '' },
      fields: [
        { name: 'TenGame', label: 'Tên game', required: true, full: true, maxlength: 120, placeholder: 'Ví dụ: The Legend of Zelda' },
        { name: 'MaNPT', label: 'Hãng phát triển / phát hành', type: 'select', required: true, options: devs },
        { name: 'TheLoai', label: 'Thể loại', required: true, maxlength: 60, placeholder: 'Ví dụ: Hành động – Phiêu lưu' },
        { name: 'NgayPhatHanh', label: 'Ngày phát hành', type: 'date', required: true },
        { name: 'DiemDanhGia', label: 'Điểm đánh giá (0 – 10)', type: 'number', step: '0.1', min: 0, max: 10, placeholder: 'Để trống nếu chưa có', hint: 'Tự cập nhật khi người dùng gửi review.' },
        { name: 'AnhBia', label: 'Đường dẫn ảnh bìa', full: true, placeholder: 'assets/images/games/ten-game.jpg', hint: 'Đặt ảnh trong thư mục <code>assets/images/games/</code> rồi nhập đường dẫn.' },
        { name: 'MoTa', label: 'Mô tả', type: 'textarea', rows: 4, required: true, full: true, maxlength: 1200 },
        { name: 'CauHinh', label: 'Cấu hình / thông tin', type: 'textarea', rows: 5, full: true, placeholder: 'Nền tảng: PC\nRAM: 8 GB', hint: 'Mỗi dòng một mục theo dạng <code>Tên mục: giá trị</code>.' },
        { name: 'HinhAnh', label: 'Hình ảnh trong game', type: 'textarea', rows: 4, full: true, placeholder: 'assets/images/games/ten-game-1.jpg | Chú thích ảnh', hint: 'Mỗi dòng một ảnh: <code>đường dẫn | chú thích</code>.' }
      ],
      validate: function (v) {
        var e = {};
        if (v.TenGame && v.TenGame.length < 2) e.TenGame = 'Tên game quá ngắn.';
        var dup = DB.games.all().some(function (g) { return g.TenGame.toLowerCase() === v.TenGame.toLowerCase() && (!isEdit || g.MaGame !== game.MaGame); });
        if (dup) e.TenGame = 'Tên game này đã tồn tại.';
        if (v.MoTa && v.MoTa.length < 10) e.MoTa = 'Mô tả cần ít nhất 10 ký tự.';
        if (v.DiemDanhGia !== '' && (isNaN(v.DiemDanhGia) || v.DiemDanhGia < 0 || v.DiemDanhGia > 10)) e.DiemDanhGia = 'Điểm phải nằm trong khoảng 0 – 10.';
        return e;
      },
      save: function (v) {
        var data = {
          TenGame: v.TenGame, MaNPT: v.MaNPT, TheLoai: v.TheLoai, NgayPhatHanh: v.NgayPhatHanh,
          DiemDanhGia: v.DiemDanhGia === '' ? 0 : Math.round(parseFloat(v.DiemDanhGia) * 10) / 10,
          AnhBia: v.AnhBia, MoTa: v.MoTa, CauHinh: v.CauHinh, HinhAnh: textToImages(v.HinhAnh, game && game.HinhAnh)
        };
        if (isEdit) { DB.games.update(game.MaGame, data); DB.recalc(game.MaGame); UI.toast('Đã cập nhật game.', 'success'); }
        else { DB.games.add(data); UI.toast('Đã thêm game mới.', 'success'); }
        render();
      }
    });
  }
  function viewGames() {
    renderList({
      idField: 'MaGame', placeholder: 'Tìm theo tên game, hãng, thể loại…', addLabel: 'Thêm game',
      rows: function () { return DB.games.all(); },
      searchText: function (g) { var d = DB.nhaPhatTrien.get(g.MaNPT); return [g.MaGame, g.TenGame, g.TheLoai, d ? d.TenNPT : ''].join(' '); },
      cols: [
        { label: 'Game', cell: function (g) { return '<div class="cell-title">' + UI.phBox(g.AnhBia, g.TenGame, 'thumb') + '<div><strong>' + UI.esc(g.TenGame) + '</strong><small>' + UI.esc(g.MaGame) + '</small></div></div>'; } },
        { label: 'Hãng', cell: function (g) { var d = DB.nhaPhatTrien.get(g.MaNPT); return UI.esc(d ? d.TenNPT : '—'); } },
        { label: 'Thể loại', cell: function (g) { return '<span class="pill pill--blue">' + UI.esc(g.TheLoai) + '</span>'; } },
        { label: 'Phát hành', cls: 'nowrap', cell: function (g) { return UI.fmtDate(g.NgayPhatHanh); } },
        { label: 'Điểm', cell: function (g) { return UI.scoreBadge(g.DiemDanhGia, 'score--sm'); } }
      ],
      actions: function (g, id) {
        return '<a class="act act--view" href="game-detail.html?id=' + UI.esc(id) + '" target="_blank" rel="noopener" aria-label="Xem trên website" title="Xem trên website">' + UI.icon('eye') + '</a>' +
          act('edit', id, 'Sửa', 'edit') + act('del', id, 'Xóa', 'trash');
      },
      onAdd: function () { gameForm(null); },
      onAction: function (a, id) {
        var g = DB.games.get(id);
        if (a === 'edit') gameForm(g);
        if (a === 'del') {
          var n = DB.reviewsOf(id).length;
          UI.confirm('Xóa game “' + g.TenGame + '”' + (n ? ' cùng ' + n + ' review của game này' : '') + '? Thao tác không thể hoàn tác.', { title: 'Xóa game', okText: 'Xóa game' }).then(function (ok) {
            if (!ok) return; DB.removeGame(id); UI.toast('Đã xóa game.', 'success'); render();
          });
        }
      }
    });
  }

  /* ---------- NHÀ PHÁT TRIỂN ---------- */
  function devForm(dev) {
    var isEdit = !!dev;
    openForm({
      title: isEdit ? 'Sửa nhà phát triển' : 'Thêm nhà phát triển', size: 'md', submitLabel: isEdit ? 'Lưu thay đổi' : 'Thêm hãng',
      values: dev || {},
      fields: [
        { name: 'TenNPT', label: 'Tên nhà phát triển', required: true, full: true, maxlength: 80, placeholder: 'Ví dụ: Nintendo' },
        { name: 'Logo', label: 'Đường dẫn logo', full: true, placeholder: 'assets/images/developers/ten-hang.png', hint: 'Đặt logo trong thư mục <code>assets/images/developers/</code>.' },
        { name: 'MoTa', label: 'Mô tả', type: 'textarea', rows: 5, required: true, full: true, maxlength: 800 }
      ],
      validate: function (v) {
        var e = {};
        var dup = DB.nhaPhatTrien.all().some(function (d) { return d.TenNPT.toLowerCase() === v.TenNPT.toLowerCase() && (!isEdit || d.MaNPT !== dev.MaNPT); });
        if (dup) e.TenNPT = 'Nhà phát triển này đã tồn tại.';
        if (v.MoTa && v.MoTa.length < 10) e.MoTa = 'Mô tả cần ít nhất 10 ký tự.';
        return e;
      },
      save: function (v) {
        if (isEdit) { DB.nhaPhatTrien.update(dev.MaNPT, v); UI.toast('Đã cập nhật nhà phát triển.', 'success'); }
        else { DB.nhaPhatTrien.add(v); UI.toast('Đã thêm nhà phát triển.', 'success'); }
        render();
      }
    });
  }
  function viewDevs() {
    renderList({
      idField: 'MaNPT', placeholder: 'Tìm theo tên hãng, mô tả…', addLabel: 'Thêm nhà phát triển',
      rows: function () { return DB.nhaPhatTrien.all(); },
      searchText: function (d) { return [d.MaNPT, d.TenNPT, d.MoTa].join(' '); },
      cols: [
        { label: 'Nhà phát triển', cell: function (d) { return '<div class="cell-title">' + UI.phBox(d.Logo, d.TenNPT, 'thumb thumb--logo') + '<div><strong>' + UI.esc(d.TenNPT) + '</strong><small>' + UI.esc(d.MaNPT) + '</small></div></div>'; } },
        { label: 'Số game', cell: function (d) { return '<span class="pill">' + DB.gamesOf(d.MaNPT).length + ' game</span>'; } },
        { label: 'Điểm TB', cell: function (d) { return UI.fmtScore(DB.devScore(d.MaNPT)); } },
        { label: 'Mô tả', cls: 'clip', cell: function (d) { return UI.esc(d.MoTa); } }
      ],
      actions: function (d, id) { return act('edit', id, 'Sửa', 'edit') + act('del', id, 'Xóa', 'trash'); },
      onAdd: function () { devForm(null); },
      onAction: function (a, id) {
        var d = DB.nhaPhatTrien.get(id);
        if (a === 'edit') devForm(d);
        if (a === 'del') {
          var n = DB.gamesOf(id).length;
          if (n) { UI.toast('Hãng “' + d.TenNPT + '” còn ' + n + ' game. Hãy xóa hoặc chuyển game sang hãng khác trước.', 'error', 4800); return; }
          UI.confirm('Xóa nhà phát triển “' + d.TenNPT + '”?', { title: 'Xóa nhà phát triển', okText: 'Xóa hãng' }).then(function (ok) {
            if (!ok) return;
            var r = DB.removeDeveloper(id);
            UI.toast(r.ok ? 'Đã xóa nhà phát triển.' : r.msg, r.ok ? 'success' : 'error'); render();
          });
        }
      }
    });
  }

  /* ---------- ĐÁNH GIÁ & REVIEWS ---------- */
  function viewReviews() {
    renderList({
      idField: 'MaDG', placeholder: 'Tìm theo tiêu đề, nội dung, game, người viết…',
      rows: function () { return DB.danhGia.all().slice().sort(function (a, b) { return (b.NgayDang + b.MaDG).localeCompare(a.NgayDang + a.MaDG); }); },
      searchText: function (r) { var g = DB.games.get(r.MaGame), u = DB.nguoiDung.get(r.MaND); return [r.MaDG, r.TieuDe, r.NoiDung, g ? g.TenGame : '', u ? u.HoTen : ''].join(' '); },
      cols: [
        { label: 'Review', cell: function (r) { var g = DB.games.get(r.MaGame); return '<div class="cell-title"><div><strong>' + UI.esc(UI.truncate(r.TieuDe, 48)) + '</strong><small>' + UI.esc(g ? g.TenGame : 'Game đã xóa') + '</small></div></div>'; } },
        { label: 'Người viết', cell: function (r) { var u = DB.nguoiDung.get(r.MaND); return UI.esc(u ? u.HoTen : '—'); } },
        { label: 'Điểm', cell: function (r) { return UI.scoreBadge(r.DiemSo, 'score--sm'); } },
        { label: 'Ngày đăng', cls: 'nowrap', cell: function (r) { return UI.fmtDate(r.NgayDang); } }
      ],
      actions: function (r, id) { return act('view', id, 'Xem chi tiết', 'eye') + act('del', id, 'Xóa', 'trash'); },
      onAction: function (a, id) {
        var r = DB.danhGia.get(id); if (!r) return;
        if (a === 'view') {
          var g = DB.games.get(r.MaGame), u = DB.nguoiDung.get(r.MaND);
          UI.openModal({ title: 'Chi tiết đánh giá', size: 'md',
            content: '<dl class="detail-grid"><div><dt>Mã đánh giá</dt><dd>' + UI.esc(r.MaDG) + '</dd></div><div><dt>Game</dt><dd>' + UI.esc(g ? g.TenGame : 'Đã xóa') + '</dd></div>' +
              '<div><dt>Người viết</dt><dd>' + UI.esc(u ? u.HoTen + ' (@' + u.TenDangNhap + ')' : '—') + '</dd></div>' +
              '<div><dt>Điểm số</dt><dd>' + UI.scoreBadge(r.DiemSo, 'score--sm') + '</dd></div><div><dt>Ngày đăng</dt><dd>' + UI.fmtDate(r.NgayDang) + '</dd></div>' +
              '<div><dt>Tiêu đề</dt><dd><strong>' + UI.esc(r.TieuDe) + '</strong></dd></div><div><dt>Nội dung</dt><dd>' + UI.esc(r.NoiDung) + '</dd></div></dl>',
            footer: '<button type="button" class="btn btn-ghost" data-close>Đóng</button>' });
        }
        if (a === 'del') {
          UI.confirm('Xóa đánh giá “' + r.TieuDe + '”? Điểm của game sẽ được tính lại.', { title: 'Xóa đánh giá', okText: 'Xóa đánh giá' }).then(function (ok) {
            if (!ok) return; DB.removeReview(id); UI.toast('Đã xóa đánh giá.', 'success'); render();
          });
        }
      }
    });
  }

  /* ---------- NGƯỜI DÙNG ---------- */
  function userForm(user) {
    var isEdit = !!user;
    openForm({
      title: isEdit ? 'Sửa người dùng' : 'Thêm người dùng', size: 'md', submitLabel: isEdit ? 'Lưu thay đổi' : 'Thêm người dùng',
      values: user || { VaiTro: Auth.USER },
      fields: [
        { name: 'HoTen', label: 'Họ và tên', required: true, full: true, maxlength: 60 },
        { name: 'TenDangNhap', label: 'Tên đăng nhập', required: true, maxlength: 30, placeholder: 'chữ, số, . hoặc _' },
        { name: 'MatKhau', label: 'Mật khẩu', required: true, maxlength: 40, hint: 'Đồ án dùng tài khoản giả lập – hãy dùng mật khẩu đơn giản, không dùng mật khẩu thật.' },
        { name: 'Email', label: 'Email', type: 'email', required: true, full: true, maxlength: 80 },
        { name: 'VaiTro', label: 'Vai trò', type: 'select', required: true, full: true, options: [{ v: Auth.USER, l: 'Người dùng' }, { v: Auth.ADMIN, l: 'Admin' }] }
      ],
      validate: function (v) {
        var e = {}, all = DB.nguoiDung.all();
        if (v.TenDangNhap && !/^[A-Za-z0-9_.]{3,30}$/.test(v.TenDangNhap)) e.TenDangNhap = 'Gồm 3–30 ký tự: chữ, số, dấu chấm hoặc gạch dưới.';
        if (v.MatKhau && v.MatKhau.length < 4) e.MatKhau = 'Mật khẩu cần ít nhất 4 ký tự.';
        if (v.Email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.Email)) e.Email = 'Email chưa hợp lệ.';
        var other = function (x) { return !isEdit || x.MaND !== user.MaND; };
        if (!e.TenDangNhap && all.some(function (x) { return other(x) && x.TenDangNhap.toLowerCase() === v.TenDangNhap.toLowerCase(); })) e.TenDangNhap = 'Tên đăng nhập đã được sử dụng.';
        if (!e.Email && all.some(function (x) { return other(x) && x.Email.toLowerCase() === v.Email.toLowerCase(); })) e.Email = 'Email đã được sử dụng.';
        if (isEdit && user.VaiTro === Auth.ADMIN && v.VaiTro !== Auth.ADMIN) {
          var admins = all.filter(function (x) { return x.VaiTro === Auth.ADMIN; }).length;
          if (admins <= 1) e.VaiTro = 'Cần giữ lại ít nhất một Admin.';
        }
        return e;
      },
      save: function (v) {
        if (isEdit) { DB.nguoiDung.update(user.MaND, v); UI.toast('Đã cập nhật người dùng.', 'success'); }
        else { DB.nguoiDung.add(v); UI.toast('Đã thêm người dùng.', 'success'); }
        render();
      }
    });
  }
  function viewUsers() {
    var me = Auth.current();
    renderList({
      idField: 'MaND', placeholder: 'Tìm theo họ tên, tên đăng nhập, email…', addLabel: 'Thêm người dùng',
      rows: function () { return DB.nguoiDung.all(); },
      searchText: function (u) { return [u.MaND, u.HoTen, u.TenDangNhap, u.Email, u.VaiTro].join(' '); },
      cols: [
        { label: 'Người dùng', cell: function (u) { return '<div class="cell-title">' + UI.avatar(u) + '<div><strong>' + UI.esc(u.HoTen) + (me && me.MaND === u.MaND ? ' <span class="pill pill--green">Bạn</span>' : '') + '</strong><small>' + UI.esc(u.MaND) + '</small></div></div>'; } },
        { label: 'Tên đăng nhập', cell: function (u) { return '@' + UI.esc(u.TenDangNhap); } },
        { label: 'Email', cls: 'clip', cell: function (u) { return UI.esc(u.Email); } },
        { label: 'Vai trò', cell: function (u) { return '<span class="pill ' + (u.VaiTro === Auth.ADMIN ? '' : 'pill--blue') + '">' + UI.esc(u.VaiTro) + '</span>'; } }
      ],
      actions: function (u, id) { return act('edit', id, 'Sửa', 'edit') + act('del', id, 'Xóa', 'trash'); },
      onAdd: function () { userForm(null); },
      onAction: function (a, id) {
        var u = DB.nguoiDung.get(id);
        if (a === 'edit') userForm(u);
        if (a === 'del') {
          if (me && me.MaND === id) { UI.toast('Bạn không thể xóa chính tài khoản đang đăng nhập.', 'error'); return; }
          if (u.VaiTro === Auth.ADMIN && DB.nguoiDung.all().filter(function (x) { return x.VaiTro === Auth.ADMIN; }).length <= 1) { UI.toast('Cần giữ lại ít nhất một Admin.', 'error'); return; }
          var n = DB.danhGia.all().filter(function (r) { return r.MaND === id; }).length;
          UI.confirm('Xóa người dùng “' + u.HoTen + '”' + (n ? ' và ' + n + ' review của họ' : '') + '?', { title: 'Xóa người dùng', okText: 'Xóa người dùng' }).then(function (ok) {
            if (!ok) return; DB.removeUser(id); UI.toast('Đã xóa người dùng.', 'success'); render();
          });
        }
      }
    });
  }

  render();
});
