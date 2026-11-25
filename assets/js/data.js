/* ==========================================================
   EasyG – Dữ liệu mẫu (seed)
   Tên trường bám theo Biểu đồ lớp thực thể trong báo cáo:
   NguoiDung, NhaPhatTrien, Game, HinhAnhGame, DanhGia
   Dữ liệu chỉ dùng để thiết kế và kiểm thử – hãy sửa lại cho đúng thực tế.
   ========================================================== */
window.EasyG = window.EasyG || {};

EasyG.SEED = {
  version: '1.0.0',

  /* ---------- Người dùng ---------- */
  nguoiDung: [
    { MaND: 'ND01', TenDangNhap: 'admin',     MatKhau: '123', HoTen: 'Quản trị viên',     Email: 'admin@easyg.vn',   VaiTro: 'Admin' },
    { MaND: 'ND02', TenDangNhap: 'user',      MatKhau: '123',  HoTen: 'Người dùng',    Email: 'user@easyg.vn',    VaiTro: 'Người dùng' },
    { MaND: 'ND03', TenDangNhap: 'quanganh',  MatKhau: '123456',   HoTen: 'Nguyễn Quang Anh',    Email: 'qa123@gmail.com', VaiTro: 'Người dùng' },
    { MaND: 'ND04', TenDangNhap: 'annguyen', MatKhau: '123456',   HoTen: 'Nguyễn Đại An',     Email: 'anke456@gmail.com',  VaiTro: 'Người dùng' },
    { MaND: 'ND05', TenDangNhap: 'kien',  MatKhau: '123456',   HoTen: 'Nguyễn Trung Kiên',     Email: 'kienkien1@gmail.com', VaiTro: 'Người dùng' },
    { MaND: 'ND06', TenDangNhap: 'andoan',  MatKhau: '123456',   HoTen: 'Đoàn Hải An',     Email: 'andoan1@gmail.com', VaiTro: 'Người dùng' }
  ],

  /* ---------- Nhà phát triển / phát hành ---------- */
  nhaPhatTrien: [
    { MaNPT: 'NPT01', TenNPT: 'Nintendo', Logo: 'assets/images/developers/Nintendo.webp',
      MoTa: 'Hãng game huyền thoại đến từ Kyoto, Nhật Bản. Nintendo nổi tiếng với những thương hiệu như Mario, Zelda, Animal Crossing và dòng máy chơi game cầm tay – để bàn Nintendo Switch, luôn đề cao sự sáng tạo và niềm vui cho mọi lứa tuổi.' },
    { MaNPT: 'NPT02', TenNPT: 'Xbox Game Studios', Logo: 'assets/images/developers/xbox.svg',
      MoTa: 'Bộ phận phát hành games của Microsoft, quản lý nhiều studio nổi tiếng với các tựa game bắn súng góc nhìn thứ nhất, đua xe và nhập vai quy mô lớn trên Xbox và PC.' },
    { MaNPT: 'NPT03', TenNPT: 'Garena', Logo: 'assets/images/developers/garena.jpg',
      MoTa: 'Nhà phát hành game có trụ sở tại Singapore, rất mạnh tại khu vực Đông Nam Á và Việt Nam, với các tựa game di động có cộng đồng người chơi đông đảo.' },
    { MaNPT: 'NPT04', TenNPT: 'Tencent Games', Logo: 'assets/images/developers/tencent.png',
      MoTa: 'Một trong những tập đoàn game lớn nhất thế giới, đứng sau nhiều tựa game di động và game nhiều người chơi trực tuyến, vừa tự phát triển vừa hợp tác phát hành với các studio khác.' },
    { MaNPT: 'NPT05', TenNPT: 'Electronic Arts', Logo: 'assets/images/developers/ea.svg',
      MoTa: 'Hãng phát hành games của Mỹ (EA) với các dòng thể thao, bắn súng sinh tồn và hợp tác nhiều người chơi, nổi bật ở chất lượng đồ họa và tính cạnh tranh.' },
    { MaNPT: 'NPT06', TenNPT: 'ChuckleFish', Logo: 'assets/images/developers/Chuckle.png',
      MoTa: 'Studio indie (dữ liệu mẫu) theo đuổi những trò chơi nhỏ nhưng giàu cảm xúc, lấy cảm hứng từ văn hóa và đời sống Á Đông viễn tưởng, kết hợp nghệ thuật vẽ tay và âm nhạc độc đáo.' },
    { MaNPT: 'NPT07', TenNPT: 'Konami', Logo: 'assets/images/developers/konami.jpg',
      MoTa: 'Hãng phát hành games của Nhật Bản với các dòng thể thao, giải đấu và hợp tác nhiều người chơi, nổi bật ở độ hút máu và tính cạnh tranh.' }
  ],

  /* ---------- Games ---------- */
  games: [
    { MaGame: 'G001', MaNPT: 'NPT01', TenGame: 'The Legend of Zelda: Tears of the Kingdom', TheLoai: 'Hành động – Phiêu lưu', NgayPhatHanh: '2023-05-12', DiemDanhGia: 9.6,
      MoTa: 'Một cuộc phiêu lưu sử thi xuyên qua vùng đất và bầu trời Hyrule đang chờ đợi trong The Legend of Zelda™: Tears of the Kingdom cho Nintendo Switch™. Cuộc phiêu lưu là của bạn để tạo ra trong một thế giới được thúc đẩy bởi trí tưởng tượng của bạn. \n Trong phần tiếp theo của The Legend of Zelda: Breath of the Wild, bạn sẽ quyết định con đường của riêng mình qua những cảnh quan rộng lớn của Hyrule và những hòn đảo bí ẩn trôi nổi trên bầu trời rộng lớn phía trên. Bạn có thể khai thác sức mạnh từ các khả năng mới của Link để chống lại các thế lực ác độc đang đe dọa vương quốc không? \n Tears of the Kingdom giữ lại nhiều khía cạnh của người tiền nhiệm, bao gồm cả môi trường thế giới mở của Hyrule, đã được mở rộng để cho phép khám phá theo chiều dọc nhiều hơn. Link, nhân vật chính của Tears of the Kingdom, tham gia cùng với Zelda và bị chống lại bởi một thế lực ác độc đang tìm cách tiêu diệt Hyrule. \n Sau khi quá trình phát triển Breath of the Wild hoàn thành vào năm 2017, phần tiếp theo đã được hình thành sau khi nội dung có thể tải xuống (DLC) của trò chơi không thể chứa tất cả các ý tưởng do nhóm phát triển đưa ra. Đạo diễn của Breath of the Wild Hidemaro Fujibayashi và nhà sản xuất Eiji Aonuma sẽ tiếp tục vai diễn của họ trong Tears of the Kingdom. Một đoạn giới thiệu giới thiệu về Tears of the Kingdom đã được phát sóng trong E3 2019[1], một tiết lộ đầy đủ đã được phát sóng tại E3 2021[2] và tiêu đề của trò chơi đã được tiết lộ trong Nintendo Direct vào tháng 9 năm 2022[3]. Mặc dù Tears of the Kingdom ban đầu được lên kế hoạch phát hành vào năm 2022, nhưng hiện tại nó đã được lên lịch phát hành vào ngày 12 tháng 5 năm 2023.',
      CauHinh: 'Nền tảng: Nintendo Switch\nThể loại: Phiêu lưu thế giới mở\nSố người chơi: 1\nNgôn ngữ: Phụ đề đa ngôn ngữ\nLưu ý: Nên chơi ở chế độ máy cắm dock để có hình ảnh mượt nhất',
      AnhBia: 'assets/images/games/zelda.jpg',
      HinhAnh: [
        { MaHA: 'HA001', DuongDan: 'assets/images/games/zelda1.jpg', ChuThich: 'Khám phá bầu trời Hyrule' },
        { MaHA: 'HA002', DuongDan: 'assets/images/games/zelda2.png', ChuThich: 'Chế tạo phương tiện từ các mảnh ghép' },
        { MaHA: 'HA003', DuongDan: 'assets/images/games/zelda3.jpg', ChuThich: 'Hang động bí ẩn dưới lòng đất' },
        { MaHA: 'HA004', DuongDan: 'assets/images/games/zelda4.webp', ChuThich: 'Gặp gỡ những người bạn mới' },
        { MaHA: 'HA005', DuongDan: 'assets/images/games/zelda5.webp', ChuThich: 'Những con quái vật với đầy thách thức' }
      ] },
    { MaGame: 'G002', MaNPT: 'NPT01', TenGame: 'Super Mario Bros. Wonder', TheLoai: 'Platformer', NgayPhatHanh: '2023-10-20', DiemDanhGia: 9.2,
      MoTa: 'Super Mario Bros. Wonder, ra mắt vào ngày 20 tháng 10 năm 2023, đánh dấu sự trở lại của Nintendo EPD với dòng game Mario đi cảnh 2D (side-scrolling) kể từ sau New Super Mario Bros. U Deluxe vào năm 2019. Lấy bối cảnh tại Flower Kingdom, trò chơi theo chân Mario và những người bạn trong nỗ lực ngăn chặn Bowser sau khi hắn hợp nhất với lâu đài Wonder Flower của vương quốc, biến thế giới trở nên vô cùng khó đoán. Mỗi màn chơi đều duy trì sự bất ổn đó thông qua một cơ chế thu thập vật phẩm duy nhất có khả năng thay đổi mọi thứ. \n Wonder Flower chính là tính năng định hình nên trò chơi này. Chỉ cần chạm vào nó trong bất kỳ màn chơi nào, các quy tắc của màn đó sẽ bị bẻ cong hoặc phá vỡ hoàn toàn. Những chiếc ống cống bỗng mọc chân và diễu hành khắp màn hình. Kẻ địch tràn ra hàng trăm con. Nhân vật của người chơi thì bị thu nhỏ, kéo dài hoặc biến hình thành thứ khác. Không có hai chuỗi Wonder nào giống hệt nhau, và Nintendo giữ kín chúng cho đến tận khoảnh khắc bạn kích hoạt, đồng nghĩa với việc những lần chơi đầu tiên sẽ mang lại cảm giác bất ngờ đầy thú vị.',
      CauHinh: 'Nền tảng: Nintendo Switch\nThể loại: Platformer 2D\nSố người chơi: 1 – 4 (chơi chung)\nNgôn ngữ: Phụ đề đa ngôn ngữ',
      AnhBia: 'assets/images/games/mario.webp',
      HinhAnh: [
        { MaHA: 'HA006', DuongDan: 'assets/images/games/mario1.webp', ChuThich: 'Màn chơi rực rỡ sắc màu' },
        { MaHA: 'HA007', DuongDan: 'assets/images/games/mario2.avif', ChuThich: 'Wonder Flower làm mọi thứ đổi khác' },
        { MaHA: 'HA008', DuongDan: 'assets/images/games/mario3.jpg', ChuThich: 'Địa hình thú vị siêu và đa dạng' }
      ] },
    { MaGame: 'G003', MaNPT: 'NPT01', TenGame: 'Animal Crossing: New Horizons', TheLoai: 'Mô phỏng đời sống', NgayPhatHanh: '2020-03-20', DiemDanhGia: 8.9,
      MoTa: 'Bạn đến một hòn đảo hoang và biến nó thành mái nhà mơ ước: xây dựng, trang trí, câu cá, bắt côn trùng và kết bạn với những cư dân đáng yêu. Nhịp chơi thư thả, theo thời gian thực, rất hợp để thư giãn sau những ngày học tập và làm việc căng thẳng.',
      CauHinh: 'Nền tảng: Nintendo Switch\nThể loại: Mô phỏng – Xã hội\nSố người chơi: 1 – 8 (trực tuyến / cục bộ)\nNgôn ngữ: Phụ đề đa ngôn ngữ',
      AnhBia: 'assets/images/games/animal.jpg',
      HinhAnh: [
        { MaHA: 'HA009', DuongDan: 'assets/images/games/animal1.webp', ChuThich: 'Hòn đảo của riêng bạn' },
        { MaHA: 'HA0010', DuongDan: 'assets/images/games/animal2.jpg', ChuThich: 'Trang trí nhà cửa theo phong cách riêng' }
      ] },

    { MaGame: 'G004', MaNPT: 'NPT02', TenGame: 'Halo Infinite', TheLoai: 'Bắn súng góc nhìn thứ nhất', NgayPhatHanh: '2021-12-08', DiemDanhGia: 8.4,
      MoTa: 'Halo Infinite là tựa game bắn súng góc nhìn thứ nhất được phát triển bởi 343 Industries và phát hành bởi Xbox Game Studios. Đây là phần tiếp theo trong thương hiệu Halo, đưa người chơi trở lại với hành trình của Master Chief trong một cuộc chiến mới trên vòng Halo bí ẩn mang tên Zeta Halo. \n Câu chuyện của game bắt đầu sau thất bại nặng nề của phe UNSC trước lực lượng The Banished. Khi tỉnh lại giữa không gian, Master Chief cùng một phi công UNSC còn sống sót phải tìm cách sống sót, khám phá sự thật đằng sau Zeta Halo và đối mặt với những mối đe dọa mới đang trỗi dậy. Với lối chơi kết hợp giữa chiến đấu tốc độ cao, khám phá bán thế giới mở và bầu không khí khoa học viễn tưởng đặc trưng, Halo Infinite mang đến một hành trình vừa quen thuộc vừa mới mẻ cho người hâm mộ dòng game Halo.',
      CauHinh: 'Nền tảng: Xbox / PC (Windows)\nHệ điều hành: Windows 10 64-bit trở lên\nCPU: Intel Core i5-4440 hoặc tương đương\nRAM: 8 GB\nCard đồ họa: GTX 1050 Ti / RX 570 hoặc tương đương\nDung lượng trống: 50 GB',
      AnhBia: 'assets/images/games/halo.jpg',
      HinhAnh: [
        { MaHA: 'HA0011', DuongDan: 'assets/images/games/halo1.png', ChuThich: 'Chiến dịch trên Zeta Halo' },
        { MaHA: 'HA0012', DuongDan: 'assets/images/games/halo2.jpg', ChuThich: 'Trận đấu nhiều người chơi' },
        { MaHA: 'HA0013', DuongDan: 'assets/images/games/halo3.jpg', ChuThich: 'Master Chief đối mặt với The Banished' }
      ] },
    { MaGame: 'G005', MaNPT: 'NPT02', TenGame: 'Forza Horizon 5', TheLoai: 'Đua xe thế giới mở', NgayPhatHanh: '2021-11-09', DiemDanhGia: 9.0,
      MoTa: 'Forza Horizon 5 - viết tắt là FH5 - là một trò chơi đua xe thế giới mở được phát triển bởi Playground Games và Turn 10 Studios, sau Lễ hội Horizon ở Mexico. Phiên bản PlayStation 5 được phát triển bởi Panic Button. \n Được công bố trong sự kiện Xbox & Bethesda Showcase tại E3 2021, Forza Horizon 5 lấy bối cảnh ở Mexico với chế độ chiến dịch phiêu lưu đưa người chơi đi khắp đất nước này, cùng với việc tích hợp công nghệ dò tia (ray-tracing) trong Forzavista. \n Trò chơi được phát hành cho Xbox One, Xbox Series X/S, Windows 10 PC, Steam và Xbox Cloud Gaming vào ngày 9 tháng 11 năm 2021. Người đăng ký Xbox Game Pass được truy cập vào phiên bản tiêu chuẩn vào ngày 9 tháng 11 năm 2021. Đối với những người sở hữu Phiên bản Cao cấp hoặc Gói bổ sung Cao cấp , trò chơi được phát hành vào ngày 5 tháng 11 năm 2021. \n Phiên bản PlayStation 5 được phát hành cho người sở hữu phiên bản tiêu chuẩn vào ngày 29 tháng 4 năm 2025. Đối với người sở hữu phiên bản Premium hoặc gói Premium Add-On Bundle , phiên bản này được phát hành vào ngày 25 tháng 4 năm 2025.',
      CauHinh: 'Nền tảng: Xbox / PC (Windows)\nHệ điều hành: Windows 10 64-bit trở lên\nCPU: Intel Core i5-4460 hoặc tương đương\nRAM: 8 GB\nCard đồ họa: GTX 970 / RX 470 hoặc tương đương\nDung lượng trống: 110 GB',
      AnhBia: 'assets/images/games/forza.jpg',
      HinhAnh: [
        { MaHA: 'HA014', DuongDan: 'assets/images/games/forza2.jpg', ChuThich: 'Cung đường sa mạc Mexico' },
        { MaHA: 'HA015', DuongDan: 'assets/images/games/forza1.jpg', ChuThich: 'Tùy biến xe theo ý thích' },
        { MaHA: 'HA016', DuongDan: 'assets/images/games/forza3.jpg', ChuThich: 'Đua xe kịch tính, cạnh tranh khốc liệt' },
        { MaHA: 'HA017', DuongDan: 'assets/images/games/forza4.jpg', ChuThich: 'Trải nghiệm chơi đỉnh cao' }
      ] },

    { MaGame: 'G006', MaNPT: 'NPT03', TenGame: 'Free Fire', TheLoai: 'Battle Royale', NgayPhatHanh: '2017-12-04', DiemDanhGia: 7.8,
      MoTa: 'Garena Free Fire (hay còn gọi là Free Fire, phổ biến tại Việt Nam với tên gọi là "Lửa Chùa") là một trò chơi điện tử nhiều người chơi thuộc thể loại bắn súng góc nhìn người thứ ba do 111dots Studio bắt đầu phát triển và được Garena mua lại và phát hành chính thức. Phiên bản thử nghiệm của trò chơi được phát hành vào ngày 3 tháng 11 năm 2017 cho Android và được chính thức ra mắt vào ngày 4 tháng 12 năm 2017 cho hai hệ máy Android và iOS. Trò chơi đã đạt hơn 1 tỷ lượt tải xuống trên Google Play (tính đến năm 2021) cùng với trên 100 triệu lượt tải trên App Store, khiến Free Fire trở thành trò chơi bắn súng sinh tồn phổ biến nhất trên nền tảng di động. \n Tính đến tháng 11 năm 2019, Free Fire đã có hơn 450 triệu người dùng đã đăng ký và đã thu về hơn 1 tỷ USD trên toàn thế giới. \n Trò chơi cho phép tối đa 50 người chơi nhảy dù lên một hòn đảo để tìm kiếm vũ khí, vật phẩm để sinh tồn, loại bỏ những người chơi khác khỏi hòn đảo. Người chơi có thể tự do lựa chọn vị trí bắt đầu, thu thập vũ khí và đồ tiếp tế để kéo dài quá trình chiến đấu. Do sự phổ biến của nó, trò chơi đã nhận được giải thưởng "Trò chơi được bình chọn phổ biến nhất" của Google Play vào năm 2019 và "Game di động được tải nhiều nhất toàn cầu" theo App Annie vào năm 2020.',
      CauHinh: 'Nền tảng: Android / iOS\nThể loại: Battle Royale di động\nSố người chơi: Tối đa 50 / trận\nRAM đề nghị: 2 GB trở lên\nKết nối: Internet ổn định',
      AnhBia: 'assets/images/games/fire.jpg',
      HinhAnh: [
        { MaHA: 'HA018', DuongDan: 'assets/images/games/fire1.webp', ChuThich: 'Booyah trong đấu trường bão tố' },
        { MaHA: 'HA019', DuongDan: 'assets/images/games/fire2.webp', ChuThich: 'Thể hiện cá tính với bộ sưu tập của riêng bạn' },
        { MaHA: 'HA020', DuongDan: 'assets/images/games/fire3.webp', ChuThich: 'Muốn đi xa thì đi cùng đồng bọn' },
        { MaHA: 'HA021', DuongDan: 'assets/images/games/fire4.jpg', ChuThich: 'Sự kiện đa dạng, phần thưởng hấp dẫn' }
      ] },
    { MaGame: 'G007', MaNPT: 'NPT03', TenGame: 'Liên Quân Mobile', TheLoai: 'MOBA', NgayPhatHanh: '2016-10-10', DiemDanhGia: 8.1,
      MoTa: 'Trận đấu 5 đấu 5 nhịp độ nhanh trên điện thoại, với kho tướng đa dạng, hệ thống đồ và bản đồ gọn gàng. Rất thích hợp để chơi cùng bạn bè, từ mức giải trí đến thi đấu nghiêm túc.',
      CauHinh: 'Nền tảng: Android / iOS\nThể loại: MOBA di động\nSố người chơi: 5 đấu 5\nRAM đề nghị: 3 GB trở lên\nKết nối: Internet ổn định',
      AnhBia: 'assets/images/games/lq.jpg',
      HinhAnh: [
        { MaHA: 'HA022', DuongDan: 'assets/images/games/lq1.webp', ChuThich: 'Lễ hội nào!' },
        { MaHA: 'HA023', DuongDan: 'assets/images/games/lq2.jpg', ChuThich: 'Bản đồ rộng lớn' },
        { MaHA: 'HA024', DuongDan: 'assets/images/games/lq3.webp', ChuThich: 'Cơ chế tướng đa dạng' },
        { MaHA: 'HA025', DuongDan: 'assets/images/games/lq4.jpg', ChuThich: 'Thi đấu đỉnh cao' }
      ] },

    { MaGame: 'G008', MaNPT: 'NPT04', TenGame: 'Honor of Kings', TheLoai: 'MOBA', NgayPhatHanh: '2015-11-26', DiemDanhGia: 8.3,
      MoTa: 'Honor of Kings là tựa game MOBA di động được chơi nhiều nhất thế giới với 100 triệu người chơi mỗi ngày. \n Mỗi người chơi đều có thể thể hiện phong cách riêng, phát huy kỹ năng và dẫn dắt đội nhà đến chiến thắng! Hòa mình vào chiến trường khi lập đội cùng bạn bè, lựa chọn từ những anh hùng độc đáo với kỹ năng tuyệt vời và tận hưởng niềm vui tột đỉnh của những trận giao tranh đồng đội khốc liệt.',
      CauHinh: 'Nền tảng: Android / iOS\nThể loại: MOBA di động\nSố người chơi: 5 đấu 5\nRAM đề nghị: 3 GB trở lên\nKết nối: Internet ổn định',
      AnhBia: 'assets/images/games/honor.png',
      HinhAnh: [
        { MaHA: 'HA026', DuongDan: 'assets/images/games/honor1.jpg', ChuThich: 'Đường giữa bản đồ' },
        { MaHA: 'HA027', DuongDan: 'assets/images/games/honor2.jpg', ChuThich: 'Giao tranh giữa sáng và tối' },
        { MaHA: 'HA028', DuongDan: 'assets/images/games/honor3.jpg', ChuThich: 'Chiến thuật và phối hợp đồng đội' },
        { MaHA: 'HA029', DuongDan: 'assets/images/games/honor4.webp', ChuThich: 'Những anh hùng với trang phục độc đáo' }
      ] },
    { MaGame: 'G009', MaNPT: 'NPT04', TenGame: 'PUBG Mobile', TheLoai: 'Battle Royale', NgayPhatHanh: '2018-03-19', DiemDanhGia: 8.0,
      MoTa: 'PUBG Mobile là tựa game dành cho điện thoại được chuyển thể từ PUBG: Battlegrounds (dành riêng cho máy tính). Phiên bản chính thức của trò chơi dành cho hệ điều hành IOS và Android ra mắt vào ngày 19/3/2018. Tại Việt Nam, nhà phát hành độc quyền và chính thức của PUBG Mobile là VNG Games. ',
      CauHinh: 'Nền tảng: Android / iOS\nThể loại: Battle Royale di động\nSố người chơi: Lên đến 100 / trận\nRAM đề nghị: 3 GB trở lên\nKết nối: Internet ổn định',
      AnhBia: 'assets/images/games/pubg.jpg',
      HinhAnh: [
        { MaHA: 'HA030', DuongDan: 'assets/images/games/pubg1.avif', ChuThich: 'Giao tranh ở khu vực trung tâm' },
        { MaHA: 'HA031', DuongDan: 'assets/images/games/pubg2.jpg', ChuThich: 'Phương tiện di chuyển đa dạng' },
        { MaHA: 'HA032', DuongDan: 'assets/images/games/pubg3.jpg', ChuThich: 'Chiến thuật sinh tồn và phối hợp đồng đội' },
        { MaHA: 'HA033', DuongDan: 'assets/images/games/pubg4.png', ChuThich: 'Bản đồ rộng lớn với nhiều địa hình' },
        { MaHA: 'HA034', DuongDan: 'assets/images/games/pubg5.jpg', ChuThich: 'Sự kiện và chế độ chơi thay đổi theo mùa' },
        { MaHA: 'HA035', DuongDan: 'assets/images/games/pubg6.webp', ChuThich: 'Trang bị và vũ khí đa dạng' }
      ] },

    { MaGame: 'G010', MaNPT: 'NPT05', TenGame: 'EA SPORTS FC 24', TheLoai: 'Thể thao – Bóng đá', NgayPhatHanh: '2023-09-29', DiemDanhGia: 7.6,
      MoTa: 'Đời đầu tiên mang tên EA SPORTS FC với hàng chục nghìn cầu thủ, đội bóng và giải đấu có bản quyền. Chuyển động cầu thủ được làm mới, chế độ Ultimate Team và Career Mode có nhiều thay đổi so với bản trước.',
      CauHinh: 'Nền tảng: PC / PlayStation / Xbox / Nintendo Switch\nHệ điều hành (PC): Windows 10 64-bit\nCPU: Intel Core i5-6600K hoặc tương đương\nRAM: 8 GB\nCard đồ họa: GTX 1050 Ti / RX 570\nDung lượng trống: 100 GB',
      AnhBia: 'assets/images/games/fc.jpg',
      HinhAnh: [
        { MaHA: 'HA036', DuongDan: 'assets/images/games/fc1.jpg', ChuThich: 'Trận đấu trên sân vận động' },
        { MaHA: 'HA037', DuongDan: 'assets/images/games/fc2.jpg', ChuThich: 'Chế độ Ultimate Team' },
        { MaHA: 'HA038', DuongDan: 'assets/images/games/fc3.jpg', ChuThich: 'Chế độ Career Mode' },
        { MaHA: 'HA039', DuongDan: 'assets/images/games/fc4.jpg', ChuThich: 'Cầu thủ và đội bóng có bản quyền' },
        { MaHA: 'HA040', DuongDan: 'assets/images/games/fc5.jpg', ChuThich: 'Chuyển động cầu thủ được làm mới' }
      ] },
    { MaGame: 'G011', MaNPT: 'NPT05', TenGame: 'Apex Legends', TheLoai: 'Battle Royale', NgayPhatHanh: '2019-02-04', DiemDanhGia: 8.7,
      MoTa: 'Apex Legends là trò chơi bắn súng góc nhìn thứ nhất (FPS) kết hợp thể loại battle royale và "hero shooter" miễn phí, do Respawn Entertainment phát triển và Electronic Arts phát hành. Game ra mắt lần đầu vào ngày 4 tháng 2 năm 2019 và lấy bối cảnh cùng vũ trụ khoa học viễn tưởng với dòng game Titanfall.',
      CauHinh: 'Nền tảng: PC / PlayStation / Xbox / Nintendo Switch\nHệ điều hành (PC): Windows 10 64-bit\nCPU: Intel Core i3-6300 hoặc tương đương\nRAM: 6 GB\nCard đồ họa: GTX 640 / Radeon HD 7730\nDung lượng trống: 56 GB',
      AnhBia: 'assets/images/games/apex.jpg',
      HinhAnh: [
        { MaHA: 'HA041', DuongDan: 'assets/images/games/apex1.jpg', ChuThich: 'Đội ba người đổ bộ' },
        { MaHA: 'HA042', DuongDan: 'assets/images/games/apex2.avif', ChuThich: 'Giao tranh với kỹ năng Legend' },
        { MaHA: 'HA043', DuongDan: 'assets/images/games/apex3.jpg', ChuThich: 'Nhịp bắn súng nhanh và mượt' },
        { MaHA: 'HA044', DuongDan: 'assets/images/games/apex4.avif', ChuThich: 'Bản đồ rộng lớn với nhiều địa hình' }
      ] },
    { MaGame: 'G012', MaNPT: 'NPT05', TenGame: 'It Takes Two', TheLoai: 'Phiêu lưu – Hợp tác', NgayPhatHanh: '2021-03-26', DiemDanhGia: 9.3,
      MoTa: 'Đây là một tựa game phiêu lưu giải đố co-op được phát triển bởi Hazelight Studios (studio đứng sau hai tựa game đình đám là Brothers: A Tale of Two Sons và A Way Out.) \n Trò chơi sở hữu đồ họa ấn tượng và dễ thương. Kết hợp với tông màu tươi sáng giúp cho thế giới nhiều màu sắc và sống động hơn. Lối chơi của game đòi hỏi hai người phải phối hợp ăn ý để có thể qua được các màn chơi hóc búa. \n Trò chơi kể về câu chuyện của đôi vợ chồng Cody và May. Do những mâu thuẫn khó có thể giải quyết mà hai vợ chồng quyết định ly hôn. Lúc sau, hai người bất ngờ bị biến thành búp bê. Để biến trở lại thành người thì họ sẽ phải trải qua nhiều cuộc hành trình gian nan thử thách để có thể hàn gắn mối quan hệ đã rạn nứt.',
      CauHinh: 'Nền tảng: PC / PlayStation / Xbox / Nintendo Switch\nSố người chơi: 2 (chơi chung bắt buộc)\nHệ điều hành (PC): Windows 10 64-bit\nCPU: Intel Core i3-2100T hoặc tương đương\nRAM: 8 GB\nDung lượng trống: 50 GB',
      AnhBia: 'assets/images/games/it.jpg',
      HinhAnh: [
        { MaHA: 'HA045', DuongDan: 'assets/images/games/it1.jpg', ChuThich: 'Hai người chơi, hai vai trò' },
        { MaHA: 'HA046', DuongDan: 'assets/images/games/it2.png', ChuThich: 'Mỗi chương một cơ chế mới' },
        { MaHA: 'HA047', DuongDan: 'assets/images/games/it3.jpg', ChuThich: 'Đồ họa tươi sáng, dễ thương' },
        { MaHA: 'HA048', DuongDan: 'assets/images/games/it4.jpg', ChuThich: 'Câu chuyện về tình yêu và sự tha thứ' }
      ] },

    { MaGame: 'G013', MaNPT: 'NPT06', TenGame: 'Eastward', TheLoai: 'Phiêu lưu 2D', NgayPhatHanh: '2024-06-01', DiemDanhGia: 8.8,
      MoTa: 'Eastward - Nhiều năm gần đây, “hậu tận thế” có vẻ như là một đề tài rất thịnh hành trong giới giải trí, dù đó là phim ảnh, sách vở hay thậm chí là cả  game. \n Dường như việc nhân loại đang từng bước bào mòn sinh mệnh của Mẹ Thiên Nhiên và đi đến bước đường cùng là một kết quả tất yếu quá hiển nhiên mà ai cũng nhìn thấy được – thế nên cái đề tài dạng “điềm báo” này sẽ cho người ta thỏa sức tưởng tượng rằng “sau đó thì sẽ thế nào”. \n Thông qua phim ảnh và video, thông thường “hậu tận thế” thường gắn liền với những hình tượng kinh điển như phần lớn dân số thế giới chết đi, các thành phố trở nên hoang tàn đổ nát, thiên nhiên bị sa mạc hóa khô cằn, các loài quái vật hay xác sống đi lềnh khênh đầy đường… Ở đó, những người “may mắn” còn sống sót lại phải vật vã để duy trì sinh mạng lay lắt hằng ngày với sự thiếu thốn về lương thực, thuốc men… \n Vì vậy, khi một tựa game có một cái nhìn tươi sáng hơn về đề tài “hậu tận thế”, kiểu lạc quan một cách thực tế rằng “sau cơn mưa trời lại sáng” như Eastward (do studio Pixpil phát triển)ra mắt, nó đã nhanh chóng thu hút được sự quan tâm của giới yêu game từ khi lần đầu được công bố.',
      CauHinh: 'Nền tảng: PC (Windows)\nHệ điều hành: Windows 10 64-bit\nCPU: Intel Core i5 hoặc tương đương\nRAM: 4 GB\nCard đồ họa: GTX 1050 Ti\nDung lượng trống: 12 GB',
      AnhBia: 'assets/images/games/east.jpg',
      HinhAnh: [
        { MaHA: 'HA049', DuongDan: 'assets/images/games/east1.jpg', ChuThich: 'Chiến đấu căng thẳng' },
        { MaHA: 'HA050', DuongDan: 'assets/images/games/east2.avif', ChuThich: 'Đồ họa Pixel đỉnh cao' },
        { MaHA: 'HA051', DuongDan: 'assets/images/games/east3.jpg', ChuThich: 'Khám phá thế giới hậu tận thế' },
        { MaHA: 'HA052', DuongDan: 'assets/images/games/east4.jpg', ChuThich: 'Câu chuyện cảm động về tình bạn và gia đình' }
      ] },
    { MaGame: 'G014', MaNPT: 'NPT06', TenGame: 'Starbound', TheLoai: 'Hành Động, Phiêu Lưu, RPG', NgayPhatHanh: '2025-02-14', DiemDanhGia: 8.2,
      MoTa: 'Nếu như bạn đã phải “mệt mỏi” khi chu du trong thế giới của Minecraft hay Terraria thì với Starbound, “thế giới” của game còn mở rộng ra hơn thế. \n Không chỉ dừng ở một bản đồ cố định, thế giới của Starbound trải dài trên các hệ ngân hà, mỗi hệ lại có rất nhiều hành tinh để khám phá. Sự đa dạng trong địa hình, các loại khoáng sản, làng mạc và các cư dân bản địa cũng như…những kẻ thù bạn sẽ phải đối mặt là rất lớn. Với việc mở rộng ra nhiều hành tinh khác nhau, Starbound đã “đẩy” mức độ tự do lên một mức cao hơn. \n Mỗi hành tinh lại có một hệ sinh thái riêng, và ngay cả những điều kiện tự nhiên đôi khi lại biến thành một “sát thủ” cực kỳ nguy hiểm. Những cơn mưa acid, những trận thiên thạch rơi có thể dễ dàng lấy mạng bạn bất kỳ lúc nào. Tuy nhiên, những “kho báu” nằm sâu dưới lòng đất hay những cuộc chạm trán bất ngờ tại các hành tinh đôi khi lại là cơ hội cho bạn. Thậm chí, nếu may mắn, bạn hoàn toàn có thể “đổi đời” khi thu nhặt được những món đồ quí giá.',
      CauHinh: 'Nền tảng: PC / Android\nHệ điều hành (PC): Windows 10 64-bit\nCPU: Intel Core i3 hoặc tương đương\nRAM: 4 GB\nDung lượng trống: 1 GB\nThiết bị đề nghị: Bàn phím hoặc màn hình cảm ứng',
      AnhBia: 'assets/images/games/star.jpg',
      HinhAnh: [
        { MaHA: 'HA053', DuongDan: 'assets/images/games/star1.jpg', ChuThich: 'Không gian rộng lớn' },
        { MaHA: 'HA054', DuongDan: 'assets/images/games/star2.webp', ChuThich: 'Khám phá các hành tinh khác nhau' },
        { MaHA: 'HA055', DuongDan: 'assets/images/games/star3.png', ChuThich: 'Đối mặt với những kẻ thù nguy hiểm' },
      ] },
      { MaGame: 'G015', MaNPT: 'NPT07', TenGame: 'eFootball', TheLoai: 'Thể thao - Bóng đá', NgayPhatHanh: '2021-02-14', DiemDanhGia: 4.4,
      MoTa: 'eFootball là một trò chơi bóng đá trực tuyến miễn phí được phát triển và phát hành bởi Konami. Trò chơi này là phiên bản kế tiếp của loạt game Pro Evolution Soccer (PES) nổi tiếng, nhưng với sự thay đổi lớn về mô hình kinh doanh, chuyển sang mô hình miễn phí và tập trung vào trải nghiệm trực tuyến. \n eFootball mang đến cho người chơi cơ hội tham gia vào các trận đấu bóng đá ảo với các đội bóng và cầu thủ thực tế từ khắp nơi trên thế giới. Trò chơi cung cấp nhiều chế độ chơi khác nhau, bao gồm cả chế độ thi đấu trực tuyến và chế độ quản lý đội bóng, cho phép người chơi xây dựng và phát triển đội bóng của riêng mình. \n Mặc dù eFootball đã gặp phải nhiều chỉ trích về chất lượng đồ họa và gameplay khi ra mắt, Konami đã liên tục cập nhật và cải thiện trò chơi để đáp ứng nhu cầu của cộng đồng người chơi.',
      CauHinh: 'Nền tảng: PC / Android\nHệ điều hành (PC): Windows 10 64-bit\nCPU: Intel Core i3 hoặc tương đương\nRAM: 4 GB\nDung lượng trống: 1 GB\nThiết bị đề nghị: Bàn phím hoặc màn hình cảm ứng',
      AnhBia: 'assets/images/games/ef.webp',
      HinhAnh: [
        { MaHA: 'HA056', DuongDan: 'assets/images/games/ef1.avif', ChuThich: 'Chi tiết sắc nét' },
        { MaHA: 'HA057', DuongDan: 'assets/images/games/ef2.avif', ChuThich: 'Không khí sân đấu bùng nổ' },
        { MaHA: 'HA058', DuongDan: 'assets/images/games/ef3.png', ChuThich: 'Chế độ chơi hấp dẫn' },
        { MaHA: 'HA059', DuongDan: 'assets/images/games/ef4.jpg', ChuThich: 'Đội hình và chiến thuật đa dạng' },
        { MaHA: 'HA060', DuongDan: 'assets/images/games/ef5.avif', ChuThich: 'Chế độ chơi mới' }
      ] }
  ],

  /* ---------- Đánh giá & reviews ---------- */
  danhGia: [
    { MaDG: 'DG001', MaGame: 'G001', MaND: 'ND03', DiemSo: 10, TieuDe: 'Một kiệt tác của sự sáng tạo',
      NoiDung: 'Mình đã bỏ hàng chục giờ chỉ để thử ghép đồ vật. Mỗi lần nghĩ ra một cách giải đố mới đều rất thỏa mãn. Thế giới rộng nhưng không bao giờ gây nhàm.', NgayDang: '2026-09-02' },
    { MaDG: 'DG002', MaGame: 'G001', MaND: 'ND04', DiemSo: 9.5, TieuDe: 'Tự do đến mức khó rời máy',
      NoiDung: 'Hệ thống chế tạo thật sự là điểm sáng. Hơi tiếc là đôi lúc khung hình tụt nhẹ ở khu vực nhiều vật thể.', NgayDang: '2026-09-15' },
    { MaDG: 'DG003', MaGame: 'G002', MaND: 'ND05', DiemSo: 9, TieuDe: 'Vui, đẹp, đáng chơi cả nhà',
      NoiDung: 'Wonder Flower lần nào cũng làm mình bất ngờ. Chơi cùng em trai rất hợp, màn nào cũng có ý tưởng mới.', NgayDang: '2026-10-01' },
    { MaDG: 'DG004', MaGame: 'G003', MaND: 'ND03', DiemSo: 9, TieuDe: 'Liều thuốc thư giãn cuối ngày',
      NoiDung: 'Không có áp lực, chỉ cần mở máy, tưới cây, câu cá và trò chuyện với cư dân. Cực kỳ dễ chịu.', NgayDang: '2026-08-20' },
    { MaDG: 'DG005', MaGame: 'G004', MaND: 'ND04', DiemSo: 8.5, TieuDe: 'Móc kéo làm game hay hẳn lên',
      NoiDung: 'Chiến dịch hay nhưng hơi lặp lại nhiệm vụ. Chế độ nhiều người miễn phí chơi rất cuốn.', NgayDang: '2026-07-11' },
    { MaDG: 'DG006', MaGame: 'G005', MaND: 'ND02', DiemSo: 9, TieuDe: 'Đua thôi, không cần lý do',
      NoiDung: 'Phong cảnh đẹp, cảm giác lái tốt. Chỉ cần mở game là muốn chạy xe vài vòng.', NgayDang: '2026-06-05' },
    { MaDG: 'DG007', MaGame: 'G006', MaND: 'ND05', DiemSo: 8, TieuDe: 'Nhẹ, nhanh, hợp điện thoại tầm trung',
      NoiDung: 'Máy cũ vẫn chơi ổn, mỗi trận ngắn rất hợp để chơi giải lao.', NgayDang: '2026-05-18' },
    { MaDG: 'DG008', MaGame: 'G007', MaND: 'ND03', DiemSo: 8, TieuDe: 'Chơi với bạn bè là nhất',
      NoiDung: 'Rank thì dễ stress nhưng chơi thường với đám bạn rất vui, tướng nhiều và cân bằng ổn.', NgayDang: '2026-04-22' },
    { MaDG: 'DG009', MaGame: 'G011', MaND: 'ND04', DiemSo: 9, TieuDe: 'Di chuyển mượt, bắn đã tay',
      NoiDung: 'Phối hợp đội ba người rất thú vị. Mỗi Legend có phong cách riêng nên chơi mãi không chán.', NgayDang: '2026-03-30' },
    { MaDG: 'DG010', MaGame: 'G012', MaND: 'ND02', DiemSo: 9.5, TieuDe: 'Phải chơi cùng người thân/bạn thân',
      NoiDung: 'Mỗi chương một ý tưởng mới, chơi cùng bạn gái mình cười suốt. Không có đoạn nào thừa.', NgayDang: '2026-02-14' },
    { MaDG: 'DG011', MaGame: 'G013', MaND: 'ND05', DiemSo: 9, TieuDe: 'Bình yên thật sự',
      NoiDung: 'Hình ảnh màu nước đẹp, nhạc nhẽo biết chơi. Hơi dài dòng nhưng đáng từng phút.', NgayDang: '2026-10-12' },
    { MaDG: 'DG012', MaGame: 'G013', MaND: 'ND03', DiemSo: 8.5, TieuDe: 'Nhẹ nhàng, ấm áp',
      NoiDung: 'Câu chuyện đơn giản nhưng đọng lại. Hy vọng studio sớm làm phần tiếp theo.', NgayDang: '2026-10-20' },
    { MaDG: 'DG013', MaGame: 'G015', MaND: 'ND06', DiemSo: 1, TieuDe: 'Chịu nhà phát hành',
      NoiDung: 'Game tệ, chế độ nghèo nàn, quay mãi không được 3K coins vé vàng. Chịu cái game !!!', NgayDang: '2026-11-05' },
    { MaDG: 'DG014', MaGame: 'G015', MaND: 'ND03', DiemSo: 7, TieuDe: 'Game tệ',
      NoiDung: 'Nghe quảng cáo tưởng hay. Đã thử và thành vong:))', NgayDang: '2026-12-01' }
  ]
};
