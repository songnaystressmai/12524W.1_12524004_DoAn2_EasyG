/* ==========================================================
   EasyG – Lớp lưu trữ dữ liệu bằng LocalStorage
   Mỗi "bảng" tương ứng một lớp thực thể trong báo cáo.
   ========================================================== */
(function () {
  'use strict';
  var E = window.EasyG = window.EasyG || {};

  var KEYS = {
    npt: 'easyg_nhaPhatTrien',
    game: 'easyg_games',
    user: 'easyg_nguoiDung',
    review: 'easyg_danhGia',
    ver: 'easyg_version'
  };

  function read(key) {
    try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (e) { console.error('[EasyG] Không ghi được LocalStorage:', e); return false; }
  }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function round1(n) { return Math.round(n * 10) / 10; }

  /* Bỏ dấu tiếng Việt để tìm kiếm không phân biệt dấu */
  function normalize(s) {
    return String(s == null ? '' : s)
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').trim();
  }

  /* ---------- Bảng generic ---------- */
  function Table(key, idField, prefix, pad) {
    this.key = key; this.idField = idField; this.prefix = prefix; this.pad = pad;
  }
  Table.prototype.all = function () { return read(this.key) || []; };
  Table.prototype.save = function (list) { return write(this.key, list); };
  Table.prototype.get = function (id) {
    var f = this.idField;
    return this.all().filter(function (x) { return x[f] === id; })[0] || null;
  };
  Table.prototype.nextId = function () {
    var f = this.idField, p = this.prefix, max = 0;
    this.all().forEach(function (x) {
      var n = parseInt(String(x[f]).replace(p, ''), 10);
      if (!isNaN(n) && n > max) max = n;
    });
    return p + String(max + 1).padStart(this.pad, '0');
  };
  Table.prototype.add = function (obj) {
    var list = this.all();
    if (!obj[this.idField]) obj[this.idField] = this.nextId();
    list.push(obj);
    this.save(list);
    return obj;
  };
  Table.prototype.update = function (id, patch) {
    var f = this.idField, found = null;
    var list = this.all().map(function (x) {
      if (x[f] === id) { found = Object.assign({}, x, patch); return found; }
      return x;
    });
    this.save(list);
    return found;
  };
  Table.prototype.remove = function (id) {
    var f = this.idField;
    this.save(this.all().filter(function (x) { return x[f] !== id; }));
  };

  var DB = E.DB = {
    keys: KEYS,
    normalize: normalize,
    nhaPhatTrien: new Table(KEYS.npt, 'MaNPT', 'NPT', 2),
    games: new Table(KEYS.game, 'MaGame', 'G', 3),
    nguoiDung: new Table(KEYS.user, 'MaND', 'ND', 2),
    danhGia: new Table(KEYS.review, 'MaDG', 'DG', 3)
  };

  /* ---------- Khởi tạo / khôi phục dữ liệu mẫu ---------- */
  DB.reset = function () {
    var s = E.SEED;
    write(KEYS.npt, clone(s.nhaPhatTrien));
    write(KEYS.game, clone(s.games));
    write(KEYS.user, clone(s.nguoiDung));
    write(KEYS.review, clone(s.danhGia));
    write(KEYS.ver, s.version);
    DB.games.all().forEach(function (g) { DB.recalc(g.MaGame); });
  };
  DB.init = function () {
    if (!E.SEED) return;
    var needSeed = localStorage.getItem(KEYS.ver) !== E.SEED.version ||
      !read(KEYS.game) || !read(KEYS.npt) || !read(KEYS.user) || !read(KEYS.review);
    if (needSeed) DB.reset();
  };

  /* ---------- Truy vấn nghiệp vụ ---------- */
  DB.gamesOf = function (maNPT) {
    return DB.games.all().filter(function (g) { return g.MaNPT === maNPT; });
  };
  DB.reviewsOf = function (maGame) {
    return DB.danhGia.all()
      .filter(function (r) { return r.MaGame === maGame; })
      .sort(function (a, b) { return (b.NgayDang + b.MaDG).localeCompare(a.NgayDang + a.MaDG); });
  };
  DB.genres = function () {
    var set = {};
    DB.games.all().forEach(function (g) { if (g.TheLoai) set[g.TheLoai] = true; });
    return Object.keys(set).sort(function (a, b) { return a.localeCompare(b, 'vi'); });
  };
  DB.devScore = function (maNPT) {
    var gs = DB.gamesOf(maNPT);
    if (!gs.length) return 0;
    return round1(gs.reduce(function (s, g) { return s + (Number(g.DiemDanhGia) || 0); }, 0) / gs.length);
  };

  /* Tìm kiếm theo tên + lọc theo hãng/thể loại + sắp xếp */
  DB.searchGames = function (opt) {
    opt = opt || {};
    var q = normalize(opt.q);
    var list = DB.games.all().filter(function (g) {
      if (opt.hang && g.MaNPT !== opt.hang) return false;
      if (opt.theLoai && g.TheLoai !== opt.theLoai) return false;
      if (q && normalize(g.TenGame).indexOf(q) === -1) return false;
      return true;
    });
    var sort = opt.sort || 'diem';
    list.sort(function (a, b) {
      if (sort === 'moi') return String(b.NgayPhatHanh).localeCompare(String(a.NgayPhatHanh));
      if (sort === 'ten') return a.TenGame.localeCompare(b.TenGame, 'vi');
      return (Number(b.DiemDanhGia) || 0) - (Number(a.DiemDanhGia) || 0);
    });
    return list;
  };

  /* Tính lại điểm đánh giá của game từ các review */
  DB.recalc = function (maGame) {
    var rs = DB.danhGia.all().filter(function (r) { return r.MaGame === maGame; });
    if (!rs.length) return;
    var avg = rs.reduce(function (s, r) { return s + Number(r.DiemSo); }, 0) / rs.length;
    DB.games.update(maGame, { DiemDanhGia: round1(avg) });
  };

  /* ---------- Thao tác có ràng buộc ---------- */
  DB.addReview = function (r) {
    var saved = DB.danhGia.add(r);
    DB.recalc(r.MaGame);
    return saved;
  };
  DB.removeReview = function (maDG) {
    var r = DB.danhGia.get(maDG);
    DB.danhGia.remove(maDG);
    if (r) DB.recalc(r.MaGame);
  };
  DB.removeGame = function (maGame) {
    DB.danhGia.save(DB.danhGia.all().filter(function (r) { return r.MaGame !== maGame; }));
    DB.games.remove(maGame);
  };
  DB.removeUser = function (maND) {
    var affected = {};
    DB.danhGia.all().forEach(function (r) { if (r.MaND === maND) affected[r.MaGame] = true; });
    DB.danhGia.save(DB.danhGia.all().filter(function (r) { return r.MaND !== maND; }));
    DB.nguoiDung.remove(maND);
    Object.keys(affected).forEach(DB.recalc);
  };
  DB.removeDeveloper = function (maNPT) {
    var n = DB.gamesOf(maNPT).length;
    if (n > 0) return { ok: false, msg: 'Hãng này còn ' + n + ' game. Hãy xóa hoặc chuyển các game sang hãng khác trước.' };
    DB.nhaPhatTrien.remove(maNPT);
    return { ok: true };
  };

  DB.stats = function () {
    return {
      games: DB.games.all().length,
      devs: DB.nhaPhatTrien.all().length,
      reviews: DB.danhGia.all().length,
      users: DB.nguoiDung.all().length
    };
  };

  DB.init();
})();
