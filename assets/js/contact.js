/* EasyG – Trang liên hệ (mô phỏng gửi: kiểm tra dữ liệu rồi thông báo) */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  var UI = window.EasyG.UI;
  var form = document.getElementById('contactForm');
  var msg = document.getElementById('cMsg');
  var count = document.getElementById('cCount');

  var u = window.EasyG.Auth.current();
  if (u) {
    document.getElementById('cName').value = u.HoTen;
    document.getElementById('cMail').value = u.Email;
  }
  msg.addEventListener('input', function () { count.textContent = msg.value.length + ' / 1000'; });

  function setErr(input, text) {
    var f = input.closest('.field'); f.classList.toggle('has-error', !!text);
    f.querySelector('.field-error').textContent = text || '';
  }
  form.addEventListener('input', function (e) { if (e.target.closest('.field')) setErr(e.target, ''); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('cName'), mail = document.getElementById('cMail'), sub = document.getElementById('cSub');
    var ok = true;
    [name, mail, sub, msg].forEach(function (i) { setErr(i, ''); });
    if (name.value.trim().length < 2) { setErr(name, 'Vui lòng nhập họ và tên.'); ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail.value.trim())) { setErr(mail, 'Email chưa hợp lệ.'); ok = false; }
    if (sub.value.trim().length < 3) { setErr(sub, 'Vui lòng nhập tiêu đề.'); ok = false; }
    if (msg.value.trim().length < 10) { setErr(msg, 'Nội dung cần ít nhất 10 ký tự.'); ok = false; }
    if (!ok) { UI.toast('Vui lòng kiểm tra lại thông tin.', 'error'); return; }
    UI.toast('Đã gửi! EasyG sẽ phản hồi bạn sớm nhất.', 'success', 4200);
    form.reset(); count.textContent = '0 / 1000';
    if (u) { name.value = u.HoTen; mail.value = u.Email; }
  });
});
