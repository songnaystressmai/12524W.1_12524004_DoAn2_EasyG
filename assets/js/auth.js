/* ==========================================================
   EasyG – Đăng nhập / phân quyền (giả lập, lưu LocalStorage)
   ========================================================== */
(function () {
  'use strict';
  var E = window.EasyG = window.EasyG || {};
  var SESSION = 'easyg_session';

  var Auth = E.Auth = {
    ADMIN: 'Admin',
    USER: 'Người dùng',

    /* Trả về người dùng nếu hợp lệ, ngược lại null */
    login: function (tenDangNhap, matKhau) {
      var u = E.DB.nguoiDung.all().filter(function (x) {
        return x.TenDangNhap.toLowerCase() === String(tenDangNhap).trim().toLowerCase() && x.MatKhau === matKhau;
      })[0];
      if (!u) return null;
      try { localStorage.setItem(SESSION, u.MaND); } catch (e) {}
      return u;
    },
    logout: function () { try { localStorage.removeItem(SESSION); } catch (e) {} },
    current: function () {
      var id = null;
      try { id = localStorage.getItem(SESSION); } catch (e) {}
      return id ? E.DB.nguoiDung.get(id) : null;
    },
    isAdmin: function () { var u = Auth.current(); return !!u && u.VaiTro === Auth.ADMIN; },
    /* Chặn truy cập trang quản trị nếu không phải Admin */
    requireAdmin: function () {
      if (!Auth.isAdmin()) {
        location.replace('login.html?next=' + encodeURIComponent('admin.html') + '&need=admin');
        return false;
      }
      return true;
    }
  };
})();
