import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    year: '2008',
    title: 'Khủng hoảng Tài chính Toàn cầu',
    module: 'MODULE 1: KHỦNG HOẢNG TÀI CHÍNH & TÀI SẢN',
    context: 'Chứng khoán sụp đổ, ngân hàng cạn thanh khoản, hàng vạn công nhân mất việc làm. Với tư cách là người điều hành kinh tế, bạn xử lý thế nào?',
    choices: [
      { label: 'A', text: 'Mặc kệ thị trường tự đào thải các doanh nghiệp yếu kém — đây là quy luật cạnh tranh tự nhiên.', ideology: 'free' },
      { label: 'B', text: 'Nhà nước quốc hữu hóa toàn bộ các ngân hàng và nhà máy đang gặp khó để kiểm soát hoàn toàn.', ideology: 'socialist' },
      { label: 'C', text: 'Tung "Gói kích cầu" bù lãi suất, cứu doanh nghiệp nhưng ép buộc tái cơ cấu để giữ việc làm cho công nhân.', ideology: 'vn' },
    ],
  },
  {
    id: 2,
    year: '2010s',
    title: 'Cổ phần hóa Doanh nghiệp Nhà nước',
    module: 'MODULE 1: KHỦNG HOẢNG TÀI CHÍNH & TÀI SẢN',
    context: 'Ngân sách thiếu hụt, cần huy động vốn. Nhà nước đang nắm giữ các tập đoàn yết hầu như Viễn thông, Điện lực, Dầu khí. Hướng đi nào?',
    choices: [
      { label: 'A', text: 'Bán 100% cổ phần cho tư nhân và nước ngoài để thu tiền mặt tối đa và tối ưu hiệu quả thị trường.', ideology: 'free' },
      { label: 'B', text: 'Kiên quyết không bán — Nhà nước phải nắm giữ 100% mọi ngành nghề, không nhân nhượng.', ideology: 'socialist' },
      { label: 'C', text: 'Cổ phần hóa để hút vốn tư nhân, nhưng Nhà nước vẫn giữ cổ phần chi phối (>51%) ở các ngành an ninh cốt lõi.', ideology: 'vn' },
    ],
  },
  {
    id: 3,
    year: '2022',
    title: 'Sốt đất & Khủng hoảng Trái phiếu Vạn Thịnh Phát',
    module: 'MODULE 1: KHỦNG HOẢNG TÀI CHÍNH & TÀI SẢN',
    context: 'Một tập đoàn BĐS lớn phát hành trái phiếu gian lận, chiếm đoạt hơn 30.000 tỷ đồng của ~36.000 người dân, đe dọa đánh sập một ngân hàng thương mại lớn. Ứng phó?',
    choices: [
      { label: 'A', text: 'Không can thiệp — ai đầu tư thì tự chịu rủi ro, thị trường sẽ tự điều chỉnh.', ideology: 'free' },
      { label: 'B', text: 'Bắt giam lập tức toàn bộ lãnh đạo, đóng băng toàn bộ thị trường BĐS.', ideology: 'socialist' },
      { label: 'C', text: 'Xử lý hình sự vi phạm cá nhân, đồng thời Ngân hàng Nhà nước "kiểm soát đặc biệt" để cứu thanh khoản, bảo vệ tiền gửi dân.', ideology: 'vn' },
    ],
  },
  {
    id: 4,
    year: '2016',
    title: 'Thảm họa Môi trường Formosa',
    module: 'MODULE 2: KHỦNG HOẢNG SẢN XUẤT & XÃ HỘI',
    context: 'Một siêu nhà máy FDI xả thải tàn phá hàng trăm km bờ biển miền Trung, nhưng đây là dự án đóng góp GDP cực lớn cho khu vực. Quyết định?',
    choices: [
      { label: 'A', text: 'Phạt tiền tượng trưng rồi cho hoạt động tiếp — ưu tiên GDP và việc làm.', ideology: 'free' },
      { label: 'B', text: 'Đuổi nhà đầu tư ngay lập tức, tịch thu toàn bộ tài sản vì xâm phạm tài nguyên quốc gia.', ideology: 'socialist' },
      { label: 'C', text: 'Xử phạt và buộc bồi thường 500 triệu USD cho dân, yêu cầu thay đổi công nghệ với giám sát online 24/7 mới cho phép mở lại.', ideology: 'vn' },
    ],
  },
  {
    id: 5,
    year: '2019',
    title: 'Khủng hoảng Nông nghiệp — Dịch tả lợn châu Phi',
    module: 'MODULE 2: KHỦNG HOẢNG SẢN XUẤT & XÃ HỘI',
    context: 'Dịch tả lợn châu Phi quét qua khiến giá lợn rớt thảm hại, hàng triệu nông dân kiệt quệ. Giải pháp tình thế?',
    choices: [
      { label: 'A', text: 'Chấp nhận quy luật cung - cầu — nông dân phải tự chịu lỗ và tự tìm hướng thoát.', ideology: 'free' },
      { label: 'B', text: 'Ra lệnh hành chính dùng ngân sách thu mua toàn bộ lợn với giá cao, bất kể chi phí.', ideology: 'socialist' },
      { label: 'C', text: 'Ngân hàng giãn nợ cho nông dân, siêu thị phối hợp tung chiến dịch "giải cứu" nông sản với giá bình ổn.', ideology: 'vn' },
    ],
  },
  {
    id: 6,
    year: '2020–2021',
    title: 'Đại dịch Covid-19 Toàn cầu',
    module: 'MODULE 2: KHỦNG HOẢNG SẢN XUẤT & XÃ HỘI',
    context: 'Nền kinh tế đứt gãy, thiếu hụt vaccine và vật tư y tế trầm trọng. Cả thế giới đang chạy đua. Chiến lược của bạn?',
    choices: [
      { label: 'A', text: 'Để tư nhân nhập khẩu và bán vaccine theo giá thị trường — ai trả được thì được tiêm trước.', ideology: 'free' },
      { label: 'B', text: 'Phong tỏa cứng toàn quốc vô thời hạn (Zero-Covid), cấm hoàn toàn tư nhân tham gia cung ứng y tế.', ideology: 'socialist' },
      { label: 'C', text: 'Ngoại giao vaccine tiêm miễn phí toàn dân, huy động y tế tư nhân cùng nhà nước "chia lửa" chống dịch.', ideology: 'vn' },
    ],
  },
  {
    id: 7,
    year: '2023',
    title: 'Khủng hoảng Năng lượng Địa chính trị',
    module: 'MODULE 3: HỘI NHẬP & PHÁT TRIỂN TƯƠNG LAI',
    context: 'Xung đột địa chính trị làm đứt gãy chuỗi cung ứng xăng dầu, giá thế giới tăng phi mã, người dân và doanh nghiệp điêu đứng. Ứng xử?',
    choices: [
      { label: 'A', text: 'Để giá xăng bán lẻ tăng theo thị trường thế giới (x2, x3 lần) — đây là tín hiệu giá lành mạnh.', ideology: 'free' },
      { label: 'B', text: 'Đóng cửa biên giới, cấm xuất nhập khẩu xăng dầu, kiểm soát phân phối hoàn toàn.', ideology: 'socialist' },
      { label: 'C', text: 'Xả Quỹ bình ổn giá và giảm thuế bảo vệ môi trường để kìm hãm đà tăng giá nội địa, bảo vệ người dân.', ideology: 'vn' },
    ],
  },
  {
    id: 8,
    year: '2004–Nay',
    title: 'Giải phóng mặt bằng — Sân bay Long Thành & Cao tốc Bắc Nam',
    module: 'MODULE 3: HỘI NHẬP & PHÁT TRIỂN TƯƠNG LAI',
    context: 'Cần xây siêu sân bay Long Thành và cao tốc Bắc Nam, nhưng vướng đất của hàng ngàn hộ dân. Cơ chế thu hồi đất nào?',
    choices: [
      { label: 'A', text: 'Để chủ đầu tư tư nhân tự thỏa thuận giá với từng hộ dân — thị trường sẽ tìm điểm cân bằng (dù dự án có thể treo 20 năm).', ideology: 'free' },
      { label: 'B', text: 'Trưng thu đất cưỡng chế không đền bù vì đất đai là của toàn dân, không phải sở hữu cá nhân.', ideology: 'socialist' },
      { label: 'C', text: 'Nhà nước thu hồi đất, đền bù theo khung giá quy định minh bạch và xây khu tái định cư chuẩn trước khi dời dân.', ideology: 'vn' },
    ],
  },
  {
    id: 9,
    year: '2024',
    title: 'Đón "Đại bàng" Công nghệ Bán dẫn',
    module: 'MODULE 3: HỘI NHẬP & PHÁT TRIỂN TƯƠNG LAI',
    context: 'Một tập đoàn bán dẫn hàng đầu muốn mở trung tâm R&D khổng lồ tại Việt Nam, nhưng đòi miễn thuế thu nhập 20 năm. Quyết sách?',
    choices: [
      { label: 'A', text: 'Gật đầu ngay lập tức để lấy thành tích thu hút FDI, không cần điều kiện kèm theo.', ideology: 'free' },
      { label: 'B', text: 'Ép họ nhượng lại toàn bộ mã nguồn công nghệ cho Nhà nước mới được cấp phép hoạt động.', ideology: 'socialist' },
      { label: 'C', text: 'Đồng ý ưu đãi thuế nhưng ký cam kết bắt buộc hợp tác đào tạo và chuyển giao công nghệ cho nhân sự nội địa.', ideology: 'vn' },
    ],
  },
  {
    id: 10,
    year: '2026',
    title: 'Chiến dịch GDP 10% — Điểm nghẽn cần tháo gỡ',
    module: 'MODULE 3: HỘI NHẬP & PHÁT TRIỂN TƯƠNG LAI',
    context: 'Để đạt mục tiêu tăng trưởng GDP 10%, cần phải tháo gỡ ngay "điểm nghẽn" lớn nhất. Theo bạn, đó là gì?',
    choices: [
      { label: 'A', text: 'Loại bỏ hoàn toàn công đoàn để doanh nghiệp linh hoạt tối đa hóa năng suất lao động.', ideology: 'free' },
      { label: 'B', text: 'Bơm lượng tiền khổng lồ vào các tập đoàn Nhà nước để họ tự gánh vác mục tiêu tăng trưởng.', ideology: 'socialist' },
      { label: 'C', text: '"Hoàn thiện thể chế": Giảm thủ tục hành chính, đẩy mạnh số hóa, tạo môi trường minh bạch cho khối tư nhân và FDI cất cánh.', ideology: 'vn' },
    ],
  },
];

export const ideologyLabels: Record<string, { name: string; country: string; flag: string; color: string }> = {
  free: { name: 'KTTT Tự do', country: 'Mỹ', flag: '🇺🇸', color: '#3b82f6' },
  socialist: { name: 'KTTT XHCN', country: 'Trung Quốc', flag: '🇨🇳', color: '#ef4444' },
  vn: { name: 'KTTT ĐHXHCN', country: 'Việt Nam', flag: '🇻🇳', color: '#f59e0b' },
};
