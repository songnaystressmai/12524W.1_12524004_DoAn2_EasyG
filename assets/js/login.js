/* EasyG – Trang đăng nhập */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  var E = window.EasyG, UI = E.UI, Auth = E.Auth;
  var form = document.getElementById('loginForm');
  var userIn = document.getElementById('lUser'), passIn = document.getElementById('lPass');
  var err = document.getElementById('loginErr'), note = document.getElementById('loginNote');
  var eye = document.getElementById('togglePass');

  /* Chỉ cho phép chuyển hướng tới trang nội bộ */
  function safeNext() {
    var n = UI.param('next') || '';
    return /^[a-z0-9\-]+\.html(\?[a-zA-Z0-9=&%_\-]*)?$/i.test(n) ? n : '';
  }
  function goAfter(u) {
    var n = safeNext();
    if (n && /^admin\.html/.test(n) && u.VaiTro !== Auth.ADMIN) n = '';
    location.href = n || (u.VaiTro === Auth.ADMIN ? 'admin.html' : 'index.html');
  }

  var cur = Auth.current();
  if (UI.param('need') === 'admin') {
    note.hidden = false;
    note.innerHTML = UI.icon('lock') + '<span>Trang quản trị chỉ dành cho tài khoản <b>Admin</b>. Vui lòng đăng nhập để tiếp tục.</span>';
  }
  if (cur && UI.param('need') !== 'admin') { goAfter(cur); return; }
  if (cur && UI.param('need') === 'admin') {
    note.innerHTML = UI.icon('alert') + '<span>Bạn đang đăng nhập là <b>' + UI.esc(cur.HoTen) + '</b> (' + UI.esc(cur.VaiTro) + ') – không có quyền quản trị. Hãy đăng nhập bằng tài khoản Admin.</span>';
  }

  /* Hiện / ẩn mật khẩu */
  eye.innerHTML = UI.icon('eye');
  eye.addEventListener('click', function () {
    var show = passIn.type === 'password';
    passIn.type = show ? 'text' : 'password';
    eye.innerHTML = UI.icon(show ? 'eyeOff' : 'eye');
  });

  /* Điền nhanh tài khoản demo */
  document.querySelectorAll('[data-fill]').forEach(function (b) {
    b.addEventListener('click', function () {
      var p = b.dataset.fill.split('|');
      userIn.value = p[0]; passIn.value = p[1]; err.hidden = true;
      userIn.closest('.field').classList.remove('has-error'); passIn.closest('.field').classList.remove('has-error');
      passIn.focus();
    });
  });

  function setErr(input, text) {
    var f = input.closest('.field'); f.classList.toggle('has-error', !!text);
    f.querySelector('.field-error').textContent = text || '';
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    err.hidden = true; setErr(userIn, ''); setErr(passIn, '');
    var ok = true;
    if (!userIn.value.trim()) { setErr(userIn, 'Vui lòng nhập tên đăng nhập.'); ok = false; }
    if (!passIn.value) { setErr(passIn, 'Vui lòng nhập mật khẩu.'); ok = false; }
    if (!ok) return;
    var u = Auth.login(userIn.value, passIn.value);
    if (!u) {
      err.hidden = false;
      err.innerHTML = UI.icon('alert') + '<span>Sai tên đăng nhập hoặc mật khẩu. Vui lòng thử lại.</span>';
      return;
    }
    UI.toast('Xin chào, ' + u.HoTen + '!', 'success');
    setTimeout(function () { goAfter(u); }, 500);
  });
});
