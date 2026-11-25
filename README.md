# EasyG – Website review và giới thiệu games

Đồ án 2 · HTML + CSS + JavaScript thuần (không framework) · Dữ liệu lưu bằng **LocalStorage**.

## Cách chạy
Chỉ cần **mở `index.html`** bằng trình duyệt (Chrome / Edge / Firefox / Safari). Không cần cài đặt hay chạy server.
Nếu dùng VS Code, có thể mở bằng tiện ích *Live Server* cho tiện.
> Lần đầu mở, website tự nạp dữ liệu mẫu từ `assets/js/data.js` vào LocalStorage.
> Font chữ (Baloo 2, Nunito) tải từ Google Fonts nên cần Internet; offline thì dùng font hệ thống thay thế, vẫn hiển thị bình thường.

## Tài khoản dùng thử
| Vai trò | Tên đăng nhập | Mật khẩu |
|---|---|---|
| Admin | `admin` | `admin123` |
| Người dùng | `user` | `user123` |
| Người dùng | `linhpham`, `huynguyen`, `tuanminh` | `123456` |

## Cấu trúc thư mục
```
easyg/
├── index.html            Trang chủ
├── games.html            Thư viện games: tìm kiếm, lọc hãng/thể loại, sắp xếp, phân trang
├── game-detail.html      Chi tiết game: mô tả, cấu hình, hình ảnh, điểm, review (?id=G001)
├── developers.html       Nhà phát triển: danh sách hãng, thông tin hãng, games của hãng (#NPT01)
├── about.html            Giới thiệu
├── contact.html          Liên hệ (kiểm tra dữ liệu, thông báo gửi)
├── login.html            Đăng nhập
├── admin.html            Trang quản trị (chỉ Admin)
└── assets/
    ├── css/
    │   ├── base.css          Biến màu/kích thước, reset, kiểu chữ, hoạt ảnh
    │   ├── layout.css        Header, menu di động, footer, banner trang con
    │   ├── components.css    Nút, form, thẻ game/hãng/review, modal, toast…
    │   ├── pages.css         Giao diện riêng từng trang người dùng
    │   ├── admin.css         Giao diện trang quản trị
    │   └── responsive.css    Responsive (1100 / 900 / 640 / 360 px) – tải cuối cùng
    ├── js/
    │   ├── data.js           Dữ liệu mẫu (seed)
    │   ├── storage.js        Lớp lưu trữ LocalStorage + truy vấn nghiệp vụ (EasyG.DB)
    │   ├── auth.js           Đăng nhập, phân quyền (EasyG.Auth)
    │   ├── ui.js             Icon, toast, modal, thẻ game/hãng/review, hiệu ứng (EasyG.UI)
    │   ├── components.js     Header, footer, menu di động, menu người dùng
    │   └── home.js · games.js · game-detail.js · developers.js
    │       contact.js · login.js · admin.js        Mỗi trang một file
    ├── images/               Ảnh của bạn (xem images/README.md để biết tên file cần thêm)
    │   ├── logo/  banners/  developers/  games/  users/
    └── fonts/                (để trống – dành cho font tự host nếu cần)
```

## Đối chiếu với báo cáo
| Báo cáo | Trong code |
|---|---|
| Use case Xem website / Xem games / Xem nhà phát triển / Tra cứu games | `index`, `games`, `game-detail`, `developers`, `about`, `contact` |
| Use case Đánh giá và reviews (cần đăng nhập) | Form review ở `game-detail.html`, chỉ tài khoản **Người dùng** gửi được, mỗi người 1 review/game |
| Use case Đăng nhập | `login.html` + `auth.js` |
| Quản lý games / nhà phát triển / đánh giá & reviews / người dùng | `admin.html` + `admin.js` (thêm, sửa, xóa, tìm kiếm; có kiểm tra dữ liệu và xác nhận xóa) |
| Lớp thực thể NguoiDung, NhaPhatTrien, Game, HinhAnhGame, DanhGia | Tên trường trong `data.js` / `storage.js` giữ nguyên theo báo cáo (`MaGame`, `TenGame`, `DiemDanhGia`…) |
| Lớp Frm… / Ctrl… (VOPC) | Frm = các trang HTML; Ctrl = các hàm xử lý trong file JS của từng trang |
| Lưu LocalStorage | Khóa: `easyg_games`, `easyg_nhaPhatTrien`, `easyg_nguoiDung`, `easyg_danhGia`, `easyg_session` |

Quy tắc nghiệp vụ đã cài:
- Điểm game (`DiemDanhGia`) = trung bình điểm các review, tự cập nhật khi thêm/xóa review.
- Không xóa nhà phát triển còn game; xóa game thì xóa luôn review của game đó; xóa người dùng thì xóa review của người đó.
- Không thể xóa chính mình hoặc Admin cuối cùng.
- Tìm kiếm không phân biệt dấu tiếng Việt.

## Tùy chỉnh nhanh
- **Đổi màu thương hiệu:** sửa biến `--red`, `--yellow`, `--blue`… ở đầu `assets/css/base.css`.
- **Thêm / sửa dữ liệu:** dùng trang quản trị, hoặc sửa `data.js` rồi đổi `version` để nạp lại dữ liệu mẫu (hoặc bấm *Khôi phục dữ liệu mẫu* trong trang Tổng quan của Admin).
- **Xóa toàn bộ dữ liệu đã lưu:** mở DevTools → Application → Local Storage → xóa các khóa bắt đầu bằng `easyg_`.

## Lưu ý
- Dữ liệu games, hãng, review trong `data.js` là **dữ liệu mẫu** để thiết kế và kiểm thử; hãy kiểm tra và thay bằng nội dung thật của bạn.
- Mật khẩu lưu dạng văn bản thường trong LocalStorage và mọi xử lý chạy ở trình duyệt – chỉ phù hợp phạm vi đồ án, **không** dùng mật khẩu thật.
