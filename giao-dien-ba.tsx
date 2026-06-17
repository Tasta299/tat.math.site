import React, { useState, useEffect, useRef } from 'react';

// Định nghĩa danh sách các Icon SVG để tối ưu hoá việc tải ứng dụng và tránh lỗi thư viện bên ngoài
const Icons = {
  Logo: ({ className }) => (
    <svg viewBox="0 0 400 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="100" rx="12" fill="transparent"/>
      <path d="M25 25 H55 V40 H25 V25ZM40 40 V75" stroke="#00458C" strokeWidth="8" strokeLinecap="round"/>
      <circle cx="50" cy="50" r="18" stroke="#F37021" strokeWidth="6" fill="none" />
      <path d="M68 65 Q85 30 102 65" stroke="#00458C" strokeWidth="8" fill="none" strokeLinecap="round" />
      <text x="115" y="52" fill="#00458C" fontFamily="sans-serif" fontWeight="900" fontSize="30" letterSpacing="1">TQC</text>
      <text x="115" y="76" fill="#F37021" fontFamily="sans-serif" fontWeight="700" fontSize="20" letterSpacing="0.5">CGLOBAL</text>
    </svg>
  ),
  Bell: ({ className, count }) => (
    <div className="relative">
      <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
          {count}
        </span>
      )}
    </div>
  ),
  User: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Search: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Filter: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  ),
  Plus: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  ),
  Edit: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Trash: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Info: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Check: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  AlertTriangle: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  ChevronRight: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  ),
  Eye: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  EyeOff: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
    </svg>
  ),
  Upload: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  ),
  Send: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  )
};

const MOCK_CUSTOMERS = [
  { id: 'KH001', name: 'Công ty Cổ phần Thực phẩm An Bình', contact: 'Trần Văn Bình', email: 'binh.tv@anbinhfood.vn', phone: '0901234567', complaintsCount: 2, taxId: '0102030405', office: 'Hà Nội' },
  { id: 'KH002', name: 'Tập đoàn Thủy sản Viễn Đông', contact: 'Nguyễn Thị Hải', email: 'hai.nt@viendongseafood.com', phone: '0987654321', complaintsCount: 1, taxId: '0304050607', office: 'TP. HCM' },
  { id: 'KH003', name: 'Nhà máy Sữa MilkFarm Đà Nẵng', contact: 'Lê Hoàng Nam', email: 'nam.lh@milkfarm.vn', phone: '0912345678', complaintsCount: 0, taxId: '0405060708', office: 'Đà Nẵng' }
];

const MOCK_STAFF = [
  { id: 'NV001', name: 'Nguyễn Văn Quyết', email: 'quyet.nv@tqc.vn', phone: '0961234567', department: 'Phòng Chứng nhận', role: 'Staff', activeTickets: 2, kpi: 75 },
  { id: 'NV002', name: 'Phạm Thị Thùy', email: 'thuy.pt@tqc.vn', phone: '0971234567', department: 'Phòng Kiểm nghiệm', role: 'Staff', activeTickets: 0, kpi: 40 },
  { id: 'NV003', name: 'Trần Minh Hoàng', email: 'hoang.tm@tqc.vn', phone: '0981234567', department: 'Ban Giám đốc', role: 'BGD', activeTickets: 0, kpi: 90 },
  { id: 'NV004', name: 'Lê Thị Phương', email: 'phuong.lt@tqc.vn', phone: '0911234567', department: 'Hành chính - Tổng hợp', role: 'HC-TH', activeTickets: 0, kpi: 55 },
  { id: 'NV005', name: 'Hoàng Anh Tuấn', email: 'tuan.ha@tqc.vn', phone: '0931234567', department: 'Phòng Chứng nhận', role: 'TP', activeTickets: 1, kpi: 85 }
];

const MOCK_CATEGORIES = [
  { id: 'DM01', name: 'Khiếu nại kết quả Thử nghiệm' },
  { id: 'DM02', name: 'Khiếu nại thái độ Chuyên gia đánh giá' },
  { id: 'DM03', name: 'Khiếu nại tiến độ cấp Chứng chỉ' },
  { id: 'DM04', name: 'Khiếu nại về Chi phí dịch vụ' }
];

const MOCK_TICKETS = [
  {
    id: 'KN2026-001',
    customerId: 'KH001',
    customerName: 'Công ty Cổ phần Thực phẩm An Bình',
    type: 'Khiếu nại kết quả Thử nghiệm',
    date: '2026-06-10',
    status: 'Chờ phân công',
    description: 'Kết quả thử nghiệm hàm lượng kim loại nặng trong lô hàng hải sản xuất khẩu ngày 08/06/2026 có sự chênh lệch lớn so với kết quả kiểm tra nội bộ của doanh nghiệp. Đề nghị TQC xem xét lại phương pháp đo và thiết bị kiểm nghiệm.',
    attachments: [{ name: 'Ket_qua_doi_chieu.pdf', size: '1.2MB' }]
  },
  {
    id: 'KN2026-002',
    customerId: 'KH002',
    customerName: 'Tập đoàn Thủy sản Viễn Đông',
    type: 'Khiếu nại thái độ Chuyên gia đánh giá',
    date: '2026-06-12',
    status: 'Đang xử lý',
    description: 'Chuyên gia phụ trách đánh giá thực địa tại cơ sở Bình Thuận của chúng tôi có thái độ thiếu chuyên nghiệp và yêu cầu các hồ sơ ngoài danh mục chuẩn bị trước mà không báo trước.',
    attachments: [{ name: 'Nhat_ky_danh_gia.docx', size: '450KB' }]
  }
];

const MOCK_ASSIGNMENTS = [
  { ticketId: 'KN2026-002', staffId: 'NV001', staffName: 'Nguyễn Văn Quyết', department: 'Phòng Chứng nhận', slaDate: '2026-06-25', note: 'Xử lý khẩn trương, liên hệ với đại diện doanh nghiệp để làm rõ phản ánh thái độ chuyên gia.', assignDate: '2026-06-13' }
];

const MOCK_PROPOSALS = [
  {
    ticketId: 'KN2026-002',
    reason: 'Do chuyên gia mới chưa nắm vững quy trình hướng dẫn khách hàng, dẫn đến hiểu lầm trong quá trình yêu cầu bổ sung hồ sơ kỹ thuật.',
    capa: 'Tổ chức tập huấn lại quy chuẩn ứng xử văn hóa doanh nghiệp cho chuyên gia đánh giá. Gửi văn bản xin lỗi chính thức và cử trưởng phòng cùng chuyên gia dày dạn kinh nghiệm thực hiện đánh giá bù miễn phí.',
    budget: 15000000,
    targetDate: '2026-06-30',
    history: [
      { ver: 'V1', reason: 'Do khách hàng khó tính.', capa: 'Chỉ xin lỗi thông qua điện thoại.', budget: 0, status: 'Bị từ chối' }
    ]
  }
];

const MOCK_CHATS = [
  { id: 1, ticketId: 'KN2026-002', sender: 'Staff', senderName: 'Nguyễn Văn Quyết', content: 'Chào anh/chị, tôi là Quyết đại diện TQC CGLOBAL phụ trách xử lý khiếu nại của mình. Tôi đã nắm bắt vấn đề và đang phối hợp phòng nhân sự để rà soát.', time: '2026-06-14 09:30', isInternal: false },
  { id: 2, ticketId: 'KN2026-002', sender: 'Customer', senderName: 'Nguyễn Thị Hải', content: 'Cảm ơn anh Quyết. Chúng tôi mong muốn nhận được phản hồi chính thức bằng văn bản và có phương án bồi thường thời gian thỏa đáng.', time: '2026-06-14 10:15', isInternal: false },
  { id: 3, ticketId: 'KN2026-002', sender: 'TP', senderName: 'Hoàng Anh Tuấn', content: 'Chú ý bảo mật thông tin nội bộ của chuyên gia liên quan, chỉ tập trung giải quyết bức xúc về quy trình của khách hàng.', time: '2026-06-14 11:00', isInternal: true }
];

const MOCK_ARCHIVES = [
  { id: 'HS-2026-001', ticketId: 'KN2025-099', customerName: 'Tổng Công ty May 10', archiveDate: '2026-01-15', approver: 'Trần Minh Hoàng', retentionYears: 5, elapsedDays: 1795 } // 1795 days elapsed, near to 5 years (1825 days) -> less than 30 days left!
];

export default function App() {
  // Trạng thái màn hình & Người dùng
  const [activeScreen, setActiveScreen] = useState(2); // Mặc định hiển thị Đăng nhập ban đầu
  const [currentUser, setCurrentUser] = useState({ name: 'Lê Thị Phương', email: 'phuong.lt@tqc.vn', role: 'HC-TH', dept: 'Hành chính - Tổng hợp' });
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Cơ sở dữ liệu Mock dạng State có khả năng cập nhật thời gian thực
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [staff, setStaff] = useState(MOCK_STAFF);
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const [assignments, setAssignments] = useState(MOCK_ASSIGNMENTS);
  const [proposals, setProposals] = useState(MOCK_PROPOSALS);
  const [chats, setChats] = useState(MOCK_CHATS);
  const [archives, setArchives] = useState(MOCK_ARCHIVES);

  // Trạng thái trung chuyển tham số giữa các màn hình
  const [selectedTicketId, setSelectedTicketId] = useState('KN2026-002');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [ticketFilter, setTicketFilter] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Đơn khiếu nại mới KN2026-001 đang chờ phân công xử lý.', time: '5 phút trước', unread: true },
    { id: 2, text: 'Phương án xử lý KN2026-002 đang chờ bạn phê duyệt.', time: '1 giờ trước', unread: true }
  ]);
  const [toasts, setToasts] = useState([]);

  // Hàm tạo thông báo nhanh (Toast Notification)
  const triggerToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Quản lý trạng thái nạp dữ liệu chung để tránh click trùng lặp (Loading state)
  const [globalLoading, setGlobalLoading] = useState(null);

  // Đổi vai trò tài khoản để test RBAC dễ dàng
  const handleRoleChange = (role) => {
    let mockUser = { name: 'Người dùng Khách hàng', email: 'khachhang@partner.com', role: 'KH', dept: 'Khách hàng ngoài' };
    if (role === 'HC-TH') mockUser = { name: 'Lê Thị Phương', email: 'phuong.lt@tqc.vn', role: 'HC-TH', dept: 'Hành chính - Tổng hợp' };
    if (role === 'Staff') mockUser = { name: 'Nguyễn Văn Quyết', email: 'quyet.nv@tqc.vn', role: 'Staff', dept: 'Phòng Chứng nhận' };
    if (role === 'TP') mockUser = { name: 'Hoàng Anh Tuấn', email: 'tuan.ha@tqc.vn', role: 'TP', dept: 'Phòng Chứng nhận' };
    if (role === 'BGD') mockUser = { name: 'Trần Minh Hoàng', email: 'hoang.tm@tqc.vn', role: 'BGD', dept: 'Ban Giám đốc' };
    setCurrentUser(mockUser);
    setIsLoggedIn(true);
    triggerToast(`Đã chuyển đổi sang tài khoản: ${mockUser.name} (${role})`, 'info');
  };

  const GlobalHeader = () => {
    return (
      <header className="h-[72px] bg-white border-b border-slate-200 fixed top-0 left-0 right-0 z-40 px-4 md:px-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { if(isLoggedIn) { if (currentUser.role==='KH') setActiveScreen(4); else if (currentUser.role==='HC-TH') setActiveScreen(3); else setActiveScreen(9); } }}>
          <Icons.Logo className="h-12 w-auto" />
          <div className="hidden lg:block border-l border-slate-200 pl-3">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Hệ thống xử lý khiếu nại</p>
            <p className="text-xs font-semibold text-[#00458C]">BỀN VỮNG CÙNG PHÁT TRIỂN</p>
          </div>
        </div>

        {/* Dynamic Navigation Menu dựa trên vai trò (Role-Based Access Control) */}
        {isLoggedIn && (
          <nav className="hidden md:flex items-center gap-1 lg:gap-3 text-sm font-medium h-full">
            {currentUser.role === 'KH' && (
              <>
                <button onClick={() => setActiveScreen(4)} className={`px-3 py-1.5 rounded-md transition-colors ${activeScreen === 4 ? 'text-[#F37021] border-b-2 border-[#F37021] rounded-b-none h-[72px]' : 'text-slate-600 hover:text-[#00458C]'}`}>Đơn yêu cầu của tôi</button>
                <button onClick={() => setActiveScreen(8)} className={`px-3 py-1.5 rounded-md transition-colors ${activeScreen === 8 ? 'text-[#F37021] border-b-2 border-[#F37021] rounded-b-none h-[72px]' : 'text-slate-600 hover:text-[#00458C]'}`}>Trao đổi phản hồi</button>
              </>
            )}
            {currentUser.role === 'HC-TH' && (
              <>
                <button onClick={() => setActiveScreen(3)} className={`px-3 py-1.5 rounded-md transition-colors ${activeScreen === 3 ? 'text-[#F37021] border-b-2 border-[#F37021] rounded-b-none h-[72px]' : 'text-slate-600 hover:text-[#00458C]'}`}>Khách hàng (FR01-FR06)</button>
                <button onClick={() => setActiveScreen(4)} className={`px-3 py-1.5 rounded-md transition-colors ${activeScreen === 4 ? 'text-[#F37021] border-b-2 border-[#F37021] rounded-b-none h-[72px]' : 'text-slate-600 hover:text-[#00458C]'}`}>Quản lý Đơn (FR10-FR27)</button>
                <button onClick={() => setActiveScreen(5)} className={`px-3 py-1.5 rounded-md transition-colors ${activeScreen === 5 ? 'text-[#F37021] border-b-2 border-[#F37021] rounded-b-none h-[72px]' : 'text-slate-600 hover:text-[#00458C]'}`}>Nhân sự & Sơ đồ (FR33-FR44)</button>
                <button onClick={() => setActiveScreen(10)} className={`px-3 py-1.5 rounded-md transition-colors ${activeScreen === 10 ? 'text-[#F37021] border-b-2 border-[#F37021] rounded-b-none h-[72px]' : 'text-slate-600 hover:text-[#00458C]'}`}>Hồ sơ lưu trữ (FR65-FR69)</button>
              </>
            )}
            {currentUser.role === 'Staff' && (
              <>
                <button onClick={() => setActiveScreen(4)} className={`px-3 py-1.5 rounded-md transition-colors ${activeScreen === 4 ? 'text-[#F37021] border-b-2 border-[#F37021] rounded-b-none h-[72px]' : 'text-slate-600 hover:text-[#00458C]'}`}>Đơn được giao</button>
                <button onClick={() => setActiveScreen(7)} className={`px-3 py-1.5 rounded-md transition-colors ${activeScreen === 7 ? 'text-[#F37021] border-b-2 border-[#F37021] rounded-b-none h-[72px]' : 'text-slate-600 hover:text-[#00458C]'}`}>Lập phương án (FR48)</button>
                <button onClick={() => setActiveScreen(8)} className={`px-3 py-1.5 rounded-md transition-colors ${activeScreen === 8 ? 'text-[#F37021] border-b-2 border-[#F37021] rounded-b-none h-[72px]' : 'text-slate-600 hover:text-[#00458C]'}`}>Phản hồi (FR53)</button>
              </>
            )}
            {currentUser.role === 'TP' && (
              <>
                <button onClick={() => setActiveScreen(4)} className={`px-3 py-1.5 rounded-md transition-colors ${activeScreen === 4 ? 'text-[#F37021] border-b-2 border-[#F37021] rounded-b-none h-[72px]' : 'text-slate-600 hover:text-[#00458C]'}`}>Quản lý đơn</button>
                <button onClick={() => setActiveScreen(6)} className={`px-3 py-1.5 rounded-md transition-colors ${activeScreen === 6 ? 'text-[#F37021] border-b-2 border-[#F37021] rounded-b-none h-[72px]' : 'text-slate-600 hover:text-[#00458C]'}`}>Phân công việc (FR71)</button>
                <button onClick={() => setActiveScreen(9)} className={`px-3 py-1.5 rounded-md transition-colors ${activeScreen === 9 ? 'text-[#F37021] border-b-2 border-[#F37021] rounded-b-none h-[72px]' : 'text-slate-600 hover:text-[#00458C]'}`}>Phê duyệt (FR59-FR65)</button>
              </>
            )}
            {currentUser.role === 'BGD' && (
              <>
                <button onClick={() => setActiveScreen(5)} className={`px-3 py-1.5 rounded-md transition-colors ${activeScreen === 5 ? 'text-[#F37021] border-b-2 border-[#F37021] rounded-b-none h-[72px]' : 'text-slate-600 hover:text-[#00458C]'}`}>Sơ đồ & KPI</button>
                <button onClick={() => setActiveScreen(9)} className={`px-3 py-1.5 rounded-md transition-colors ${activeScreen === 9 ? 'text-[#F37021] border-b-2 border-[#F37021] rounded-b-none h-[72px]' : 'text-slate-600 hover:text-[#00458C]'}`}>Bảng phê duyệt</button>
                <button onClick={() => setActiveScreen(10)} className={`px-3 py-1.5 rounded-md transition-colors ${activeScreen === 10 ? 'text-[#F37021] border-b-2 border-[#F37021] rounded-b-none h-[72px]' : 'text-slate-600 hover:text-[#00458C]'}`}>Kho lưu trữ</button>
              </>
            )}
          </nav>
        )}

        {/* Bell & Profile Dropdown */}
        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <div className="relative">
              <button onClick={() => setShowNotification(!showNotification)} className="p-2 text-slate-500 hover:text-[#00458C] hover:bg-slate-100 rounded-full transition-colors">
                <Icons.Bell className="h-6 w-6" count={notifications.filter(n => n.unread).length} />
              </button>

              {showNotification && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50 animate-fade-in-down">
                  <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <span className="font-bold text-slate-800 text-sm">Thông báo hệ thống</span>
                    <button onClick={() => {
                      setNotifications(notifications.map(n => ({...n, unread: false})));
                      triggerToast('Đã đánh dấu đọc toàn bộ', 'info');
                    }} className="text-xs text-[#00458C] hover:underline font-semibold">Đọc hết</button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-6">Không có thông báo mới</p>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className={`px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors ${n.unread ? 'bg-blue-50/40' : ''}`}>
                          <p className="text-xs text-slate-700 font-medium">{n.text}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {isLoggedIn ? (
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-800">{currentUser.name}</p>
                <span className="text-[10px] font-bold text-[#F37021] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200 uppercase">{currentUser.role}</span>
              </div>
              <div className="relative group">
                <button className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#00458C] to-[#F37021] flex items-center justify-center text-white font-bold border-2 border-white shadow-md">
                  {currentUser.name.charAt(0)}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-slate-100 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs text-slate-400 font-medium">Bộ phận</p>
                    <p className="text-xs font-bold text-slate-700">{currentUser.dept}</p>
                  </div>
                  <button onClick={() => triggerToast('Chức năng cấu hình tài khoản đang hoàn thiện', 'info')} className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-100 transition-colors">Cài đặt tài khoản</button>
                  <button onClick={() => {
                    setIsLoggedIn(false);
                    setCurrentUser({ name: '', email: '', role: '', dept: '' });
                    setActiveScreen(2);
                    triggerToast('Đã đăng xuất khỏi hệ thống', 'info');
                  }} className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors border-t border-slate-100">Đăng xuất</button>
                </div>
              </div>
            </div>
          ) : (
            <button onClick={() => setActiveScreen(2)} className="bg-[#00458C] text-white px-4 py-2 rounded-md text-xs font-semibold hover:bg-opacity-95 shadow transition-all">Đăng nhập</button>
          )}
        </div>
      </header>
    );
  };

  const GlobalFooter = () => {
    return (
      <footer className="bg-[#00458C] text-white py-10 mt-auto border-t border-blue-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white p-1 rounded-md h-10 w-auto flex items-center justify-center">
                <Icons.Logo className="h-8" />
              </div>
            </div>
            <p className="text-xs text-blue-200 leading-relaxed mb-4">
              Trung tâm Kiểm nghiệm và Chứng nhận TQC CGLOBAL là tổ chức khoa học công nghệ được công nhận năng lực quốc tế, cam kết tính khách quan, tin cậy và chất lượng.
            </p>
            <div className="bg-blue-950 p-3 rounded border border-blue-800 text-[11px] font-bold text-orange-400 flex items-center gap-2 uppercase tracking-wide">
              <span>Giá trị cốt lõi 5T:</span>
              <span className="text-white">Tri thức - Tin tưởng - Tận tâm - Tuân thủ - Tích cực</span>
            </div>
          </div>

          <div className="space-y-4 text-xs text-blue-200">
            <h4 className="text-sm font-bold text-white border-l-2 border-[#F37021] pl-2 uppercase tracking-wider">Hệ thống mạng lưới quốc gia</h4>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-white">Trụ sở chính tại Hà Nội</p>
                <p>Biệt thự C11, Khu Pandora, số 53 phố Triều Khúc, P. Thanh Xuân Nam, Q. Thanh Xuân, Hà Nội.</p>
                <p>Hotline: 096 941 6668 | Email: vphn@tqc.vn</p>
              </div>
              <div className="border-t border-blue-800/60 pt-2">
                <p className="font-semibold text-white">Chi nhánh Miền Trung (Đà Nẵng)</p>
                <p>Tầng 2, VINADCO BUILDING, Số 01-03 Hồ Quý Ly, P. Thanh Khê Tây, Q. Thanh Khê, Đà Nẵng.</p>
                <p>Hotline: 0968 799 816 | Email: vpdn@tqc.vn</p>
              </div>
              <div className="border-t border-blue-800/60 pt-2">
                <p className="font-semibold text-white">Chi nhánh Miền Nam (TP. Hồ Chí Minh)</p>
                <p>Số 232/1/33 đường Bình Lợi, Phường 13, Quận Bình Thạnh, TP. Hồ Chí Minh.</p>
                <p>Hotline: 0988 397 156 | Email: vpsg@tqc.vn</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between md:items-end">
            <div className="text-left md:text-right">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Đăng ký nhận tư vấn dịch vụ</h4>
              <p className="text-xs text-blue-200 mb-3">Gửi lại email, chuyên viên TQC sẽ phản hồi lập tức.</p>
              <div className="flex w-full max-w-sm">
                <input type="email" placeholder="Nhập email của bạn..." className="bg-blue-950/70 border border-blue-800 text-xs px-3 py-2 rounded-l w-full focus:outline-none focus:border-[#F37021]" />
                <button onClick={() => triggerToast('Đăng ký nhận tin thành công!', 'success')} className="bg-[#F37021] text-white px-4 py-2 rounded-r text-xs font-bold hover:bg-orange-600 transition-all uppercase whitespace-nowrap">Đăng ký</button>
              </div>
            </div>

            <div className="mt-8 md:mt-0 text-left md:text-right">
              <span className="text-xs text-orange-400 font-bold block uppercase tracking-wider">SUSTAINABLE GROWTH TOGETHER</span>
              <p className="text-[10px] text-blue-300 mt-1">© 2026 TQC CGLOBAL. Bảo lưu mọi quyền pháp lý.</p>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  const ScreenRegister = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', taxId: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const [agree, setAgree] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otpCode, setOtpCode] = useState('');
    const [otpError, setOtpError] = useState('');

    const handleRegister = (e) => {
      e.preventDefault();
      const newErrors = {};

      if (!formData.name.trim()) newErrors.name = '* Họ tên không được để trống';
      if (!formData.phone.trim()) newErrors.phone = '* Số điện thoại không được để trống';
      if (!formData.company.trim()) newErrors.company = '* Tên doanh nghiệp không được để trống';

      // Check Email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim()) {
        newErrors.email = '* Email không được để trống';
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = '* Định dạng Email không hợp lệ';
      }

      // Check Mã số thuế (10 hoặc 13 chữ số)
      const taxRegex = /^(\d{10}|\d{13})$/;
      if (!formData.taxId.trim()) {
        newErrors.taxId = '* Mã số thuế không được để trống';
      } else if (!taxRegex.test(formData.taxId)) {
        newErrors.taxId = '* Mã số thuế phải gồm chính xác 10 hoặc 13 chữ số';
      }

      // Check Mật khẩu (tối thiểu 8 ký tự, có chữ hoa, thường, đặc biệt)
      const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
      if (!formData.password) {
        newErrors.password = '* Mật khẩu không được để trống';
      } else if (!passRegex.test(formData.password)) {
        newErrors.password = '* Mật khẩu tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường và ít nhất một ký tự đặc biệt';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = '* Mật khẩu nhập lại không khớp';
      }

      if (!agree) {
        newErrors.agree = '* Bạn phải đồng ý với quy trình xử lý của TQC CGLOBAL';
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        setGlobalLoading('register');
        setTimeout(() => {
          setGlobalLoading(null);
          setShowOtpModal(true);
          triggerToast('Mã OTP xác thực đã được gửi về email của bạn!', 'info');
        }, 1500);
      } else {
        triggerToast('Vui lòng kiểm tra lại các trường thông tin bắt buộc', 'error');
      }
    };

    const handleVerifyOtp = (e) => {
      e.preventDefault();
      if (otpCode === '1234' || otpCode.trim().length === 4) {
        setGlobalLoading('otp');
        setTimeout(() => {
          setGlobalLoading(null);
          setShowOtpModal(false);
          // Tự động lưu khách hàng mới vào state
          const newCust = {
            id: 'KH00' + (customers.length + 1),
            name: formData.company,
            contact: formData.name,
            email: formData.email,
            phone: formData.phone,
            taxId: formData.taxId,
            office: 'Hà Nội',
            complaintsCount: 0
          };
          setCustomers([...customers, newCust]);
          triggerToast('Xác thực tài khoản thành công! Tự động chuyển về Đăng nhập sau 3 giây.', 'success');
          setTimeout(() => {
            setActiveScreen(2);
          }, 3000);
        }, 1500);
      } else {
        setOtpError('Mã OTP không chính xác. Thử lại với mã mặc định "1234"');
      }
    };

    return (
      <div className="max-w-4xl mx-auto my-6 bg-white p-6 md:p-8 rounded-lg shadow-md border border-slate-200">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#0F172A] uppercase">Đăng ký Cổng dịch vụ khiếu nại trực tuyến</h2>
          <p className="text-sm text-slate-500 mt-2">Dành cho Khách hàng/Đối tác kiểm nghiệm và chứng nhận của TQC CGLOBAL</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cột trái: Thông tin cá nhân */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-[#00458C] border-b pb-2 uppercase">1. Thông tin cá nhân người liên hệ</h3>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Họ và tên *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={`w-full px-3 py-2 border rounded text-xs transition-all ${errors.name ? 'border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]' : 'border-slate-300 focus:ring-1 focus:ring-[#00458C]'}`} placeholder="Nguyễn Văn A" />
                {errors.name && <p className="text-[10px] text-[#DC2626] mt-1 font-semibold">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email liên hệ *</label>
                <input type="text" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={`w-full px-3 py-2 border rounded text-xs transition-all ${errors.email ? 'border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]' : 'border-slate-300 focus:ring-1 focus:ring-[#00458C]'}`} placeholder="contact@congty.com" />
                {errors.email && <p className="text-[10px] text-[#DC2626] mt-1 font-semibold">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Số điện thoại *</label>
                <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className={`w-full px-3 py-2 border rounded text-xs transition-all ${errors.phone ? 'border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]' : 'border-slate-300 focus:ring-1 focus:ring-[#00458C]'}`} placeholder="0901234567" />
                {errors.phone && <p className="text-[10px] text-[#DC2626] mt-1 font-semibold">{errors.phone}</p>}
              </div>
            </div>

            {/* Cột phải: Thông tin doanh nghiệp & bảo mật */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-[#00458C] border-b pb-2 uppercase">2. Thông tin pháp nhân & Mật khẩu</h3>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tên tổ chức / Doanh nghiệp *</label>
                <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className={`w-full px-3 py-2 border rounded text-xs transition-all ${errors.company ? 'border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]' : 'border-slate-300 focus:ring-1 focus:ring-[#00458C]'}`} placeholder="Công ty TNHH Giải pháp Nông nghiệp" />
                {errors.company && <p className="text-[10px] text-[#DC2626] mt-1 font-semibold">{errors.company}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mã số thuế *</label>
                <input type="text" value={formData.taxId} onChange={(e) => setFormData({...formData, taxId: e.target.value})} className={`w-full px-3 py-2 border rounded text-xs transition-all ${errors.taxId ? 'border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]' : 'border-slate-300 focus:ring-1 focus:ring-[#00458C]'}`} placeholder="Gồm 10 hoặc 13 số" />
                {errors.taxId && <p className="text-[10px] text-[#DC2626] mt-1 font-semibold">{errors.taxId}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mật khẩu bảo mật *</label>
                <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className={`w-full px-3 py-2 border rounded text-xs transition-all ${errors.password ? 'border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]' : 'border-slate-300 focus:ring-1 focus:ring-[#00458C]'}`} placeholder="Tối thiểu 8 ký tự, có chữ hoa, thường & ký tự đặc biệt" />
                {errors.password && <p className="text-[10px] text-[#DC2626] mt-1 font-semibold">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nhập lại mật khẩu *</label>
                <input type="password" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} className={`w-full px-3 py-2 border rounded text-xs transition-all ${errors.confirmPassword ? 'border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]' : 'border-slate-300 focus:ring-1 focus:ring-[#00458C]'}`} placeholder="Nhập lại mật khẩu để kiểm chứng" />
                {errors.confirmPassword && <p className="text-[10px] text-[#DC2626] mt-1 font-semibold">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1 h-4 w-4 rounded border-slate-300 text-[#F37021] focus:ring-[#F37021]" />
              <span className="text-xs text-slate-600 leading-relaxed">Tôi đồng ý với Quy chế xử lý khiếu nại, tranh chấp của Tổ chức chứng nhận TQC CGLOBAL và cam kết cung cấp các dữ liệu/minh chứng trung thực, đúng pháp luật.</span>
            </label>
            {errors.agree && <p className="text-[10px] text-[#DC2626] mt-1 font-semibold">{errors.agree}</p>}
          </div>

          <div className="flex items-center justify-between gap-4 pt-2">
            <button type="button" onClick={() => setActiveScreen(2)} className="text-xs font-bold text-[#00458C] hover:underline">Bạn đã có tài khoản? Đăng nhập ngay</button>
            <button type="submit" disabled={globalLoading === 'register'} className={`bg-[#F37021] hover:bg-orange-600 text-white px-6 py-2.5 rounded text-xs font-bold transition-all shadow flex items-center gap-2 ${globalLoading === 'register' ? 'opacity-70 cursor-not-allowed' : ''}`}>
              {globalLoading === 'register' ? (
                <>
                  <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent"></div>
                  Đang gửi OTP...
                </>
              ) : (
                'Đăng ký tài khoản'
              )}
            </button>
          </div>
        </form>

        {/* Modal OTP nhập liệu */}
        {showOtpModal && (
          <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full shadow-2xl border border-slate-100 animate-scale-up">
              <div className="text-center mb-4">
                <div className="h-12 w-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto text-[#F37021] mb-2">
                  <Icons.Bell className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-800">Xác thực mã OTP</h3>
                <p className="text-xs text-slate-500 mt-1">Vui lòng kiểm tra email của bạn và nhập mã OTP 4 số.</p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <input type="text" maxLength={4} value={otpCode} onChange={(e) => { setOtpCode(e.target.value); setOtpError(''); }} className="w-full text-center text-xl font-bold tracking-[1rem] pl-[1rem] py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#00458C] focus:outline-none" placeholder="0000" />
                  {otpError && <p className="text-[10px] text-[#DC2626] mt-2 font-semibold text-center">{otpError}</p>}
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowOtpModal(false)} className="w-1/2 py-2 border border-slate-300 rounded text-xs font-bold text-slate-600 hover:bg-slate-50">Hủy</button>
                  <button type="submit" disabled={globalLoading === 'otp'} className="w-1/2 bg-[#00458C] text-white py-2 rounded text-xs font-bold hover:bg-opacity-95 flex items-center justify-center gap-2">
                    {globalLoading === 'otp' ? (
                      <>
                        <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent"></div>
                        Xác thực...
                      </>
                    ) : (
                      'Xác nhận OTP'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ScreenLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [errors, setErrors] = useState({});

    const handleLogin = (e) => {
      e.preventDefault();
      const newErrors = {};

      if (!email.trim()) {
        newErrors.email = '* Vui lòng điền thông tin tài khoản email';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) newErrors.email = '* Định dạng email không hợp lệ';
      }

      if (!password) {
        newErrors.password = '* Vui lòng điền thông tin mật khẩu';
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        setGlobalLoading('login');
        setTimeout(() => {
          setGlobalLoading(null);
          setIsLoggedIn(true);

          // Phân phối quyền hạn dựa trên email nhập vào
          let detectedUser = { name: 'Khách hàng thử nghiệm', email: email, role: 'KH', dept: 'Khách hàng ngoài' };
          let targetScreen = 4; // Khách hàng vào quản lý đơn yêu cầu

          if (email.includes('admin') || email.includes('phuong.lt') || email.includes('hcth')) {
            detectedUser = { name: 'Lê Thị Phương', email: 'phuong.lt@tqc.vn', role: 'HC-TH', dept: 'Hành chính - Tổng hợp' };
            targetScreen = 3; // Hành chính tổng hợp vào Quản lý khách hàng
          } else if (email.includes('quyet') || email.includes('staff')) {
            detectedUser = { name: 'Nguyễn Văn Quyết', email: 'quyet.nv@tqc.vn', role: 'Staff', dept: 'Phòng Chứng nhận' };
            targetScreen = 4; // Nhân sự vào quản lý đơn yêu cầu của họ
          } else if (email.includes('tuan') || email.includes('lead')) {
            detectedUser = { name: 'Hoàng Anh Tuấn', email: 'tuan.ha@tqc.vn', role: 'TP', dept: 'Phòng Chứng nhận' };
            targetScreen = 9; // Trưởng phòng vào Quản lý phê duyệt
          } else if (email.includes('hoang') || email.includes('bgd')) {
            detectedUser = { name: 'Trần Minh Hoàng', email: 'hoang.tm@tqc.vn', role: 'BGD', dept: 'Ban Giám đốc' };
            targetScreen = 9; // Ban giám đốc vào Quản lý phê duyệt
          }

          setCurrentUser(detectedUser);
          setActiveScreen(targetScreen);
          triggerToast(`Chào mừng quay trở lại, ${detectedUser.name}!`, 'success');
        }, 1500);
      }
    };

    return (
      <div className="max-w-md mx-auto my-12 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-[#00458C] p-6 text-center text-white">
          <div className="bg-white px-3 py-1 rounded inline-block mb-3">
            <Icons.Logo className="h-8 w-auto" />
          </div>
          <h2 className="text-lg font-bold uppercase tracking-wider">Hệ thống xử lý khiếu nại</h2>
          <p className="text-xs text-blue-200 mt-1">Đăng nhập tài khoản cán bộ nhân sự & đối tác</p>
        </div>

        <div className="p-6 md:p-8">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email đăng nhập *</label>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full px-3 py-2 border rounded text-xs transition-all ${errors.email ? 'border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]' : 'border-slate-300 focus:ring-1 focus:ring-[#00458C]'}`} placeholder="ten@tqc.vn hoặc email khách hàng" />
              {errors.email && <p className="text-[10px] text-[#DC2626] mt-1 font-semibold">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mật khẩu bảo mật *</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full px-3 py-2 pr-10 border rounded text-xs transition-all ${errors.password ? 'border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]' : 'border-slate-300 focus:ring-1 focus:ring-[#00458C]'}`} placeholder="••••••••" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-2 text-slate-400 hover:text-slate-600">
                  {showPass ? <Icons.EyeOff className="h-4 w-4" /> : <Icons.Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-[10px] text-[#DC2626] mt-1 font-semibold">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" className="h-3.5 w-3.5 text-[#00458C] border-slate-300 rounded focus:ring-[#00458C]" />
                <span className="text-[11px] text-slate-500 font-medium">Ghi nhớ đăng nhập</span>
              </label>
              <button type="button" onClick={() => triggerToast('Hãy liên hệ bộ phận HC-TH để được cấp lại mật khẩu!', 'info')} className="text-[11px] text-[#00458C] font-semibold hover:underline">Quên mật khẩu?</button>
            </div>

            <button type="submit" disabled={globalLoading === 'login'} className="w-full bg-[#00458C] hover:bg-opacity-95 text-white py-2.5 rounded font-bold text-xs transition-all shadow flex items-center justify-center gap-2">
              {globalLoading === 'login' ? (
                <>
                  <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent"></div>
                  Đang xác thực...
                </>
              ) : (
                'Đăng nhập hệ thống'
              )}
            </button>
          </form>

          <div className="border-t border-slate-100 mt-6 pt-4 text-center">
            <p className="text-xs text-slate-500">Đối tác chưa được cấp cổng phản ánh?</p>
            <button onClick={() => setActiveScreen(1)} className="text-xs text-[#F37021] font-bold hover:underline mt-1.5 block mx-auto">Đăng ký tài khoản doanh nghiệp mới</button>
          </div>

          <div className="bg-slate-50 rounded p-3 mt-6 border border-slate-100">
            <span className="text-[10px] font-bold text-[#00458C] block mb-1">TÀI KHOẢN ĐĂNG NHẬP NHANH (MÔ PHỎNG):</span>
            <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-600">
              <p><span className="font-semibold text-[#F37021]">HC-TH:</span> hcth@tqc.vn</p>
              <p><span className="font-semibold text-[#F37021]">Staff:</span> quyet.nv@tqc.vn</p>
              <p><span className="font-semibold text-[#F37021]">T.Phòng:</span> tuan.ha@tqc.vn</p>
              <p><span className="font-semibold text-[#F37021]">B.Giám đốc:</span> hoang.tm@tqc.vn</p>
            </div>
            <p className="text-[9px] text-slate-400 mt-1.5 text-center italic">* Mật khẩu bất kỳ tối thiểu 1 ký tự</p>
          </div>
        </div>
      </div>
    );
  };

  const ScreenCustomerManagement = () => {
    const [searchName, setSearchName] = useState('');
    const [searchOffice, setSearchOffice] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [detailDrawerCust, setDetailDrawerCust] = useState(null);

    // Form thêm khách hàng mới
    const [newCust, setNewCust] = useState({ name: '', contact: '', email: '', phone: '', taxId: '', office: 'Hà Nội' });
    const [formErrors, setFormErrors] = useState({});

    const handleSaveCustomer = (e) => {
      e.preventDefault();
      const errs = {};
      if (!newCust.name.trim()) errs.name = '* Tên tổ chức không được bỏ trống';
      if (!newCust.contact.trim()) errs.contact = '* Người liên hệ không được bỏ trống';
      if (!newCust.phone.trim()) errs.phone = '* Số điện thoại không được bỏ trống';

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!newCust.email.trim()) {
        errs.email = '* Email không được bỏ trống';
      } else if (!emailRegex.test(newCust.email)) {
        errs.email = '* Email không hợp lệ';
      }

      if (!newCust.taxId.trim()) {
        errs.taxId = '* Mã số thuế không được bỏ trống';
      } else if (!/^(\d{10}|\d{13})$/.test(newCust.taxId)) {
        errs.taxId = '* MST phải gồm 10 hoặc 13 chữ số';
      }

      setFormErrors(errs);

      if (Object.keys(errs).length === 0) {
        setGlobalLoading('saveCust');
        setTimeout(() => {
          setGlobalLoading(null);
          const added = {
            id: 'KH00' + (customers.length + 1),
            ...newCust,
            complaintsCount: 0
          };
          setCustomers([...customers, added]);
          setShowModal(false);
          setNewCust({ name: '', contact: '', email: '', phone: '', taxId: '', office: 'Hà Nội' });
          triggerToast('Thêm hồ sơ đối tác khách hàng thành công!', 'success');
        }, 1200);
      }
    };

    const filtered = customers.filter(c => {
      const matchName = c.name.toLowerCase().includes(searchName.toLowerCase()) || c.taxId.includes(searchName);
      const matchOffice = searchOffice === '' || c.office === searchOffice;
      return matchName && matchOffice;
    });

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-[#0F172A] uppercase">Quản lý cơ sở dữ liệu khách hàng</h2>
            <p className="text-xs text-slate-500">Màn hình quản trị, hỗ trợ truy vấn thông tin, liên kết tạo đơn phản ánh và xem lịch sử</p>
          </div>
          <button onClick={() => setShowModal(true)} className="bg-[#F37021] hover:bg-orange-600 text-white px-4 py-2 rounded text-xs font-bold transition-all shadow flex items-center gap-1.5 uppercase">
            <Icons.Plus className="h-4 w-4" /> Thêm khách hàng
          </button>
        </div>

        {/* Khối bộ lọc thông tin */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <div className="relative">
            <Icons.Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
            <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#00458C]" placeholder="Tìm theo Tên tổ chức, Mã số thuế..." />
          </div>
          <div>
            <select value={searchOffice} onChange={(e) => setSearchOffice(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#00458C] focus:outline-none">
              <option value="">-- Tất cả Văn phòng Đại diện --</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="TP. HCM">TP. Hồ Chí Minh</option>
            </select>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-bold justify-end">
            <span>Hiển thị: <strong className="text-[#00458C]">{filtered.length}</strong> / {customers.length} khách hàng</span>
          </div>
        </div>

        {/* Data Grid bảng hiển thị */}
        <div className="bg-white rounded-lg shadow border border-slate-200 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#00458C] text-white text-xs uppercase font-bold">
                <th className="p-3">Mã KH</th>
                <th className="p-3">Tên tổ chức doanh nghiệp</th>
                <th className="p-3">Người liên hệ</th>
                <th className="p-3">Email / SĐT</th>
                <th className="p-3">Địa bàn VP</th>
                <th className="p-3 text-center">Đơn đã gửi</th>
                <th className="p-3 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-slate-100">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3 font-bold text-slate-700">{c.id}</td>
                  <td className="p-3">
                    <div className="font-semibold text-slate-800">{c.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">MST: {c.taxId}</div>
                  </td>
                  <td className="p-3 font-medium text-slate-600">{c.contact}</td>
                  <td className="p-3">
                    <div>{c.email}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">SĐT: {c.phone}</div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-[#00458C] border border-blue-100">{c.office}</span>
                  </td>
                  <td className="p-3 text-center font-bold text-slate-700">{c.complaintsCount}</td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => setDetailDrawerCust(c)} className="p-1.5 text-[#00458C] hover:bg-blue-50 rounded transition-all" title="Xem chi tiết & Lịch sử">
                        <Icons.Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Drawer trượt chi tiết khách hàng phía lề phải */}
        {detailDrawerCust && (
          <div className="fixed inset-0 bg-slate-900/40 z-50 flex justify-end">
            <div className="bg-white w-full max-w-lg h-full p-6 shadow-2xl overflow-y-auto animate-slide-in-right flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center border-b pb-4 mb-6">
                  <h3 className="font-bold text-base text-slate-800 uppercase tracking-wide">Chi tiết hồ sơ đối tác</h3>
                  <button onClick={() => setDetailDrawerCust(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded">
                    <Icons.Plus className="h-5 w-5 rotate-45" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 space-y-2.5">
                    <div className="flex justify-between text-xs"><span className="text-slate-400">Mã định danh:</span> <strong className="text-[#00458C]">{detailDrawerCust.id}</strong></div>
                    <div className="flex justify-between text-xs"><span className="text-slate-400">MST pháp lý:</span> <strong>{detailDrawerCust.taxId}</strong></div>
                    <div className="flex justify-between text-xs"><span className="text-slate-400">Doanh nghiệp:</span> <strong className="text-right">{detailDrawerCust.name}</strong></div>
                    <div className="flex justify-between text-xs"><span className="text-slate-400">Địa bàn phụ trách:</span> <strong>{detailDrawerCust.office}</strong></div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase">Thông tin đầu mối liên hệ</h4>
                    <div className="bg-white border rounded p-3 text-xs space-y-2">
                      <p><span className="text-slate-400">Người đại diện:</span> <strong className="text-slate-700">{detailDrawerCust.contact}</strong></p>
                      <p><span className="text-slate-400">Email:</span> <strong className="text-slate-700">{detailDrawerCust.email}</strong></p>
                      <p><span className="text-slate-400">Số điện thoại:</span> <strong className="text-slate-700">{detailDrawerCust.phone}</strong></p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase">Lịch sử gửi đơn khiếu nại (FR12)</h4>
                    {tickets.filter(t => t.customerId === detailDrawerCust.id).length === 0 ? (
                      <p className="text-[11px] text-slate-400 bg-slate-50 p-3 text-center rounded border border-dashed">Chưa ghi nhận đơn khiếu nại nào từ đối tác này.</p>
                    ) : (
                      <div className="space-y-2">
                        {tickets.filter(t => t.customerId === detailDrawerCust.id).map(t => (
                          <div key={t.id} className="p-3 border rounded-md hover:bg-slate-50/50 flex justify-between items-center text-xs">
                            <div>
                              <strong className="text-slate-700 block">{t.id}</strong>
                              <span className="text-slate-400 text-[10px]">{t.type} | {t.date}</span>
                            </div>
                            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-orange-50 text-[#F37021] border border-orange-100">{t.status}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 grid grid-cols-2 gap-3 mt-8">
                <button onClick={() => {
                  setSelectedCustomerId(detailDrawerCust.id);
                  setActiveScreen(4);
                  setDetailDrawerCust(null);
                  triggerToast('Đã lấy sẵn thông tin doanh nghiệp, hãy tạo đơn mới!', 'info');
                }} className="bg-[#F37021] hover:bg-orange-600 text-white text-xs py-2 rounded font-bold transition-all shadow flex items-center justify-center gap-1.5 uppercase">
                  <Icons.Plus className="h-4 w-4" /> Tạo đơn ngay
                </button>
                <button onClick={() => {
                  setTicketFilter(detailDrawerCust.id);
                  setActiveScreen(4);
                  setDetailDrawerCust(null);
                }} className="bg-[#00458C] hover:bg-opacity-95 text-white text-xs py-2 rounded font-bold transition-all shadow flex items-center justify-center gap-1.5 uppercase">
                  <Icons.Eye className="h-4 w-4" /> Lịch sử đơn
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Thêm mới đối tác khách hàng */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-2xl border border-slate-100 animate-scale-up">
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="font-bold text-sm text-[#00458C] uppercase tracking-wider">Thêm mới thông tin khách hàng</h3>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                  <Icons.Plus className="h-5 w-5 rotate-45" />
                </button>
              </div>

              <form onSubmit={handleSaveCustomer} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tên tổ chức doanh nghiệp *</label>
                  <input type="text" value={newCust.name} onChange={(e) => setNewCust({...newCust, name: e.target.value})} className={`w-full px-3 py-2 border rounded text-xs focus:ring-1 focus:ring-[#00458C] ${formErrors.name ? 'border-[#DC2626]' : 'border-slate-300'}`} placeholder="VD: Công ty TNHH Thủy Sản" />
                  {formErrors.name && <p className="text-[10px] text-[#DC2626] mt-1 font-semibold">{formErrors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mã số thuế pháp lý *</label>
                    <input type="text" value={newCust.taxId} onChange={(e) => setNewCust({...newCust, taxId: e.target.value})} className={`w-full px-3 py-2 border rounded text-xs focus:ring-1 focus:ring-[#00458C] ${formErrors.taxId ? 'border-[#DC2626]' : 'border-slate-300'}`} placeholder="Mã số thuế 10/13 số" />
                    {formErrors.taxId && <p className="text-[10px] text-[#DC2626] mt-1 font-semibold">{formErrors.taxId}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Khu vực văn phòng *</label>
                    <select value={newCust.office} onChange={(e) => setNewCust({...newCust, office: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#00458C]">
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                      <option value="TP. HCM">TP. Hồ Chí Minh</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Họ tên người đại diện *</label>
                  <input type="text" value={newCust.contact} onChange={(e) => setNewCust({...newCust, contact: e.target.value})} className={`w-full px-3 py-2 border rounded text-xs focus:ring-1 focus:ring-[#00458C] ${formErrors.contact ? 'border-[#DC2626]' : 'border-slate-300'}`} placeholder="Tên người đại diện pháp lý" />
                  {formErrors.contact && <p className="text-[10px] text-[#DC2626] mt-1 font-semibold">{formErrors.contact}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email liên hệ *</label>
                    <input type="text" value={newCust.email} onChange={(e) => setNewCust({...newCust, email: e.target.value})} className={`w-full px-3 py-2 border rounded text-xs focus:ring-1 focus:ring-[#00458C] ${formErrors.email ? 'border-[#DC2626]' : 'border-slate-300'}`} placeholder="email@tockchuc.com" />
                    {formErrors.email && <p className="text-[10px] text-[#DC2626] mt-1 font-semibold">{formErrors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Số điện thoại *</label>
                    <input type="text" value={newCust.phone} onChange={(e) => setNewCust({...newCust, phone: e.target.value})} className={`w-full px-3 py-2 border rounded text-xs focus:ring-1 focus:ring-[#00458C] ${formErrors.phone ? 'border-[#DC2626]' : 'border-slate-300'}`} placeholder="09xxxxxxxx" />
                    {formErrors.phone && <p className="text-[10px] text-[#DC2626] mt-1 font-semibold">{formErrors.phone}</p>}
                  </div>
                </div>

                <div className="flex gap-3 pt-3 border-t">
                  <button type="button" onClick={() => setShowModal(false)} className="w-1/2 py-2 border border-slate-300 rounded text-xs font-bold text-slate-600 hover:bg-slate-50">Đóng lại</button>
                  <button type="submit" disabled={globalLoading === 'saveCust'} className="w-1/2 bg-[#00458C] text-white py-2 rounded text-xs font-bold hover:bg-opacity-95 flex items-center justify-center gap-1.5">
                    {globalLoading === 'saveCust' ? (
                      <>
                        <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent"></div>
                        Đang lưu...
                      </>
                    ) : (
                      'Lưu thông tin'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ScreenTicketManagement = () => {
    const [filterText, setFilterText] = useState(ticketFilter || '');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(selectedCustomerId !== '');
    const [showCatConfig, setShowCatConfig] = useState(false);

    // Form Tạo/Cập nhật đơn
    const [ticketCustId, setTicketCustId] = useState(selectedCustomerId || '');
    const [ticketType, setTicketType] = useState('');
    const [ticketDesc, setTicketDesc] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadError, setUploadError] = useState('');
    const [formErrors, setFormErrors] = useState({});

    // Lightbox xem tài liệu
    const [activeLightboxFile, setActiveLightboxFile] = useState(null);

    // Danh mục loại đơn mới
    const [newCatName, setNewCatName] = useState('');

    const fileInputRef = useRef(null);

    const handleFileUpload = (e) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;
      const file = files[0];

      // Kiểm tra định dạng cho phép (.pdf, .docx, .xlsx, .jpg, .png)
      const allowedExts = ['pdf', 'docx', 'xlsx', 'jpg', 'png'];
      const ext = file.name.split('.').pop().toLowerCase();

      if (!allowedExts.includes(ext)) {
        setUploadError('* Định dạng tệp không cho phép (Chỉ nhận PDF, DOCX, XLSX, JPG, PNG)');
        triggerToast('Tải file thất bại!', 'error');
        return;
      }

      // Kiểm tra dung lượng (15MB tối đa với PDF, 15MB cho các tệp khác nói chung)
      const maxSize = 15 * 1024 * 1024;
      if (file.size > maxSize) {
        setUploadError('* Dung lượng tệp vượt quá giới hạn cho phép (Tối đa 15MB)');
        triggerToast('Tải file quá nặng!', 'error');
        return;
      }

      setUploadError('');
      setGlobalLoading('fileUpload');
      setUploadProgress(10);

      // Mô phỏng tiến trình tải lên Server
      const timer = setInterval(() => {
        setUploadProgress((p) => {
          if (p >= 100) {
            clearInterval(timer);
            setUploadedFiles([{ name: file.name, size: (file.size / (1024 * 1024)).toFixed(1) + 'MB' }]);
            setGlobalLoading(null);
            triggerToast('Đã tải tài liệu minh chứng thành công!', 'success');
            return 100;
          }
          return p + 30;
        });
      }, 300);
    };

    const handleCreateTicket = (e) => {
      e.preventDefault();
      const errs = {};

      if (!ticketCustId) errs.customer = '* Vui lòng chọn khách hàng gửi khiếu nại';
      if (!ticketType) errs.type = '* Vui lòng chọn loại hồ sơ khiếu nại';
      if (!ticketDesc.trim()) errs.desc = '* Vui lòng nhập nội dung mô tả chi tiết vấn đề';

      setFormErrors(errs);

      if (Object.keys(errs).length === 0) {
        setGlobalLoading('createTicket');
        setTimeout(() => {
          setGlobalLoading(null);
          const targetCust = customers.find(c => c.id === ticketCustId);
          const added = {
            id: 'KN2026-00' + (tickets.length + 1),
            customerId: ticketCustId,
            customerName: targetCust ? targetCust.name : 'Khách hàng không xác định',
            type: ticketType,
            date: new Date().toISOString().split('T')[0],
            status: 'Chờ phân công',
            description: ticketDesc,
            attachments: uploadedFiles
          };

          setTickets([added, ...tickets]);
          // Cập nhật số lượng đơn của khách hàng
          setCustomers(customers.map(c => c.id === ticketCustId ? {...c, complaintsCount: c.complaintsCount + 1} : c));

          triggerToast(`Tạo đơn khiếu nại thành công! Mã đơn: ${added.id}`, 'success');
          // Reset form
          setTicketCustId('');
          setTicketType('');
          setTicketDesc('');
          setUploadedFiles([]);
          setShowCreateForm(false);
          setSelectedCustomerId('');
        }, 1500);
      }
    };

    const handleAddCategory = (e) => {
      e.preventDefault();
      if (!newCatName.trim()) return;
      const newCat = {
        id: 'DM0' + (categories.length + 1),
        name: newCatName.trim()
      };
      setCategories([...categories, newCat]);
      setNewCatName('');
      triggerToast('Đã bổ sung danh mục khiếu nại nghiệp vụ', 'success');
    };

    const filteredTickets = tickets.filter(t => {
      const matchText = t.customerName.toLowerCase().includes(filterText.toLowerCase()) || t.id.includes(filterText) || t.customerId.includes(filterText);
      const matchCat = selectedCategory === '' || t.type === selectedCategory;
      return matchText && matchCat;
    });

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-[#0F172A] uppercase">Hệ thống xử lý & tiếp nhận đơn</h2>
            <p className="text-xs text-slate-500">Quản lý danh mục khiếu nại nghiệp vụ, đính kèm minh chứng kỹ thuật</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowCatConfig(!showCatConfig)} className="bg-white border border-slate-300 text-slate-700 px-3 py-2 rounded text-xs font-bold hover:bg-slate-50 transition-all flex items-center gap-1">
              <Icons.Filter className="h-4 w-4" /> Danh mục loại đơn
            </button>
            <button onClick={() => {
              setShowCreateForm(!showCreateForm);
              setTicketCustId(selectedCustomerId);
            }} className="bg-[#F37021] hover:bg-orange-600 text-white px-4 py-2 rounded text-xs font-bold transition-all shadow flex items-center gap-1.5 uppercase">
              <Icons.Plus className="h-4 w-4" /> Tiếp nhận đơn mới
            </button>
          </div>
        </div>

        {/* Khối quản lý danh mục (FR20, FR21) */}
        {showCatConfig && (
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            <div>
              <h3 className="font-bold text-xs text-[#00458C] uppercase mb-3">Thêm loại đơn khiếu nại nghiệp vụ (FR20)</h3>
              <form onSubmit={handleAddCategory} className="flex gap-2">
                <input type="text" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} className="bg-white border text-xs px-3 py-2 rounded w-full focus:ring-1 focus:ring-[#00458C]" placeholder="Nhập tên nghiệp vụ khiếu nại..." />
                <button type="submit" className="bg-[#00458C] text-white px-4 py-2 rounded text-xs font-bold hover:bg-opacity-95">Thêm</button>
              </form>
            </div>
            <div>
              <h3 className="font-bold text-xs text-[#00458C] uppercase mb-3">Danh sách loại đơn hiện có (FR21)</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(c => (
                  <span key={c.id} className="bg-white border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-600 font-medium flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F37021]"></span>
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Khối Tiếp nhận Đơn mới (FR10) */}
        {showCreateForm && (
          <form onSubmit={handleCreateTicket} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-4 animate-fade-in">
            <h3 className="font-bold text-sm text-[#00458C] uppercase border-b pb-2">Phiếu thu thập thông tin khiếu nại</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Khách hàng yêu cầu *</label>
                <select value={ticketCustId} onChange={(e) => setTicketCustId(e.target.value)} className={`w-full px-3 py-2 border rounded text-xs focus:ring-1 focus:ring-[#00458C] ${formErrors.customer ? 'border-[#DC2626]' : 'border-slate-300'}`}>
                  <option value="">-- Chọn khách hàng từ cơ sở dữ liệu --</option>
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.id})</option>
                  ))}
                </select>
                {formErrors.customer && <p className="text-[10px] text-[#DC2626] mt-1 font-semibold">{formErrors.customer}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phân loại hồ sơ *</label>
                <select value={ticketType} onChange={(e) => setTicketType(e.target.value)} className={`w-full px-3 py-2 border rounded text-xs focus:ring-1 focus:ring-[#00458C] ${formErrors.type ? 'border-[#DC2626]' : 'border-slate-300'}`}>
                  <option value="">-- Chọn loại khiếu nại nghiệp vụ --</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
                {formErrors.type && <p className="text-[10px] text-[#DC2626] mt-1 font-semibold">{formErrors.type}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nội dung mô tả chi tiết vấn đề khiếu nại *</label>
              <textarea rows={4} value={ticketDesc} onChange={(e) => setTicketDesc(e.target.value)} className={`w-full px-3 py-2 border rounded text-xs focus:ring-1 focus:ring-[#00458C] ${formErrors.desc ? 'border-[#DC2626]' : 'border-slate-300'}`} placeholder="Mô tả cụ thể hành vi, thời gian, sự kiện và tác động phát sinh..."></textarea>
              {formErrors.desc && <p className="text-[10px] text-[#DC2626] mt-1 font-semibold">{formErrors.desc}</p>}
            </div>

            {/* Upload minh chứng (FR25) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tài liệu minh chứng đính kèm (FR25)</label>
              <div
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-slate-300 hover:border-[#00458C] bg-slate-50/50 hover:bg-slate-50 p-6 rounded-lg text-center cursor-pointer transition-colors relative"
              >
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                <Icons.Upload className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                <p className="text-xs text-slate-600 font-semibold">Kéo thả tệp hoặc click vào đây để tải tài liệu</p>
                <p className="text-[10px] text-slate-400 mt-1">Định dạng chấp nhận: .pdf, .docx, .xlsx, .jpg, .png (Dung lượng PDF tối đa 15MB)</p>

                {globalLoading === 'fileUpload' && (
                  <div className="absolute inset-0 bg-white/90 rounded-lg flex flex-col items-center justify-center p-4">
                    <p className="text-xs font-bold text-[#00458C] mb-2">Đang tải lên tài liệu... {uploadProgress}%</p>
                    <div className="w-full max-w-xs bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#F37021] h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                  </div>
                )}
              </div>
              {uploadError && <p className="text-[10px] text-[#DC2626] mt-1.5 font-semibold">{uploadError}</p>}

              {/* Danh sách file đã upload (FR26) */}
              {uploadedFiles.length > 0 && (
                <div className="mt-3 bg-blue-50/50 border border-blue-100 rounded p-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 p-1.5 rounded text-[#00458C] text-xs font-bold">PDF</span>
                    <div>
                      <p className="text-xs font-bold text-slate-700">{uploadedFiles[0].name}</p>
                      <p className="text-[10px] text-slate-400">{uploadedFiles[0].size}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setUploadedFiles([])} className="text-red-500 hover:text-red-700 text-xs font-bold uppercase">Xóa</button>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => { setShowCreateForm(false); setSelectedCustomerId(''); }} className="px-4 py-2 border rounded text-xs font-bold text-slate-600 hover:bg-slate-50">Hủy bỏ</button>
              <button type="submit" disabled={globalLoading === 'createTicket'} className="bg-[#F37021] text-white px-5 py-2 rounded text-xs font-bold hover:bg-opacity-95 shadow flex items-center gap-1.5">
                {globalLoading === 'createTicket' ? (
                  <>
                    <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent"></div>
                    Đang tạo hồ sơ...
                  </>
                ) : (
                  'Xác nhận nộp đơn'
                )}
              </button>
            </div>
          </form>
        )}

        {/* Thanh tìm kiếm & bộ lọc của danh sách đơn */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <div className="relative">
            <Icons.Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
            <input type="text" value={filterText} onChange={(e) => setFilterText(e.target.value)} className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#00458C]" placeholder="Tìm theo Mã đơn, tên Khách hàng..." />
          </div>
          <div>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#00458C] focus:outline-none">
              <option value="">-- Tất cả loại khiếu nại --</option>
              {categories.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-end text-xs text-slate-400 font-semibold">
            Danh sách gồm <strong className="text-slate-700 ml-1 mr-1">{filteredTickets.length}</strong> đơn khiếu nại
          </div>
        </div>

        {/* Bảng danh sách đơn (FR12) */}
        <div className="bg-white rounded-lg shadow border border-slate-200 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#00458C] text-white text-xs uppercase font-bold">
                <th className="p-3">Mã đơn</th>
                <th className="p-3">Khách hàng gửi</th>
                <th className="p-3">Loại đơn phản ánh</th>
                <th className="p-3">Ngày gửi đơn</th>
                <th className="p-3">Trạng thái xử lý</th>
                <th className="p-3 text-center">Tệp kỹ thuật (FR26)</th>
                <th className="p-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-slate-100">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400 italic font-medium">Không tìm thấy đơn khiếu nại nào thỏa mãn điều kiện lọc.</td>
                </tr>
              ) : (
                filteredTickets.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3 font-bold text-slate-700">{t.id}</td>
                    <td className="p-3 font-semibold text-slate-800">{t.customerName}</td>
                    <td className="p-3 text-slate-600">{t.type}</td>
                    <td className="p-3 font-medium text-slate-500">{t.date}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                        t.status === 'Chờ phân công' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                        t.status === 'Đang xử lý' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                        t.status === 'Chờ phê duyệt' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                        t.status === 'Đã phê duyệt' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                        'bg-red-50 text-red-600 border-red-200'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      {t.attachments && t.attachments.length > 0 ? (
                        <button onClick={() => setActiveLightboxFile(t.attachments[0])} className="text-[#00458C] hover:underline font-bold flex items-center justify-center gap-1 mx-auto text-[10px]">
                          <Icons.Eye className="h-3 w-3" /> {t.attachments[0].name}
                        </button>
                      ) : (
                        <span className="text-slate-400">Không đính kèm</span>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => {
                          setSelectedTicketId(t.id);
                          setActiveScreen(6);
                          triggerToast(`Phân công đơn ${t.id}`, 'info');
                        }} className="bg-[#F37021] text-white px-2 py-1 rounded-[3px] text-[10px] font-bold hover:bg-orange-600 transition-all shadow">
                          Phân công
                        </button>
                        <button onClick={() => {
                          setSelectedTicketId(t.id);
                          setActiveScreen(8);
                        }} className="bg-[#00458C] text-white px-2 py-1 rounded-[3px] text-[10px] font-bold hover:bg-opacity-95 transition-all shadow">
                          Chat
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Lightbox xem trước tài liệu tại chỗ không load lại trang (FR27) */}
        {activeLightboxFile && (
          <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-lg w-full shadow-2xl overflow-hidden animate-scale-up">
              <div className="bg-[#00458C] text-white p-3 flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider">Xem trước hồ sơ kỹ thuật (FR27)</span>
                <button onClick={() => setActiveLightboxFile(null)} className="text-white hover:text-orange-400">
                  <Icons.Plus className="h-5 w-5 rotate-45" />
                </button>
              </div>
              <div className="p-6 text-center space-y-4">
                <div className="bg-slate-50 border border-slate-200 rounded p-8 flex flex-col items-center justify-center space-y-3">
                  <Icons.Upload className="h-12 w-12 text-slate-400" />
                  <p className="text-xs font-bold text-slate-800">{activeLightboxFile.name}</p>
                  <p className="text-[10px] text-slate-400">Kích thước: {activeLightboxFile.size} | Trạng thái: An toàn</p>
                </div>
                <div className="text-xs text-slate-500 leading-relaxed text-left border-t pt-3">
                  <strong className="text-slate-800">Trình xem kỹ thuật TQC CGLOBAL:</strong> Bản xem trước tài liệu trực tuyến của tệp định dạng này đã được phê duyệt an toàn. Hệ thống đã mã hóa bảo vệ chống sao chép trái phép.
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button onClick={() => triggerToast('Đã tải xuống tệp tin đính kèm', 'success')} className="bg-[#00458C] text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-opacity-95">Tải xuống tài liệu</button>
                  <button onClick={() => setActiveLightboxFile(null)} className="px-4 py-1.5 border rounded text-xs font-bold text-slate-600 hover:bg-slate-50">Đóng</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ScreenStaffManagement = () => {
    const [showModal, setShowModal] = useState(false);
    const [activeDept, setActiveDept] = useState('Phòng Chứng nhận');

    // Form thêm nhân sự
    const [newStaff, setNewStaff] = useState({ name: '', email: '', phone: '', department: 'Phòng Chứng nhận', role: 'Staff' });
    const [formErrors, setFormErrors] = useState({});

    const handleSaveStaff = (e) => {
      e.preventDefault();
      const errs = {};

      if (!newStaff.name.trim()) errs.name = '* Họ và tên nhân sự là bắt buộc';
      if (!newStaff.phone.trim()) errs.phone = '* Số điện thoại không được để trống';

      // Ràng buộc email nội bộ chuẩn đuôi miền của TQC
      const email = newStaff.email.trim();
      if (!email) {
        errs.email = '* Email là bắt buộc';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          errs.email = '* Định dạng Email không hợp lệ';
        } else {
          const allowedDomains = ['@tqc.vn', '@certify.vn', '@cglobal.vn'];
          const hasValidDomain = allowedDomains.some(domain => email.endsWith(domain));
          if (!hasValidDomain) {
            errs.email = '* Email nhân sự phải sử dụng đuôi miền nội bộ chính thức (@tqc.vn, @certify.vn, @cglobal.vn)';
          }
        }
      }

      setFormErrors(errs);

      if (Object.keys(errs).length === 0) {
        setGlobalLoading('saveStaff');
        setTimeout(() => {
          setGlobalLoading(null);
          const added = {
            id: 'NV00' + (staff.length + 1),
            ...newStaff,
            activeTickets: 0,
            kpi: 50 // KPI nạp ban đầu trung bình
          };
          setStaff([...staff, added]);
          setShowModal(false);
          setNewStaff({ name: '', email: '', phone: '', department: 'Phòng Chứng nhận', role: 'Staff' });
          triggerToast('Bổ sung hồ sơ nhân sự và đồng bộ sơ đồ phòng ban thành công!', 'success');
        }, 1200);
      }
    };

    const handleDeleteStaff = (staffId) => {
      const target = staff.find(s => s.id === staffId);
      if (!target) return;

      // Không cho phép xóa tài khoản nhân sự nếu nhân sự đó đang chịu trách nhiệm đơn chưa hoàn thành (FR40)
      if (target.activeTickets > 0) {
        triggerToast(`Không được phép xóa tài khoản nhân sự ${target.name} do đang xử lý ${target.activeTickets} khiếu nại chưa hoàn thành!`, 'error');
        return;
      }

      if (window.confirm(`Xác nhận xóa tài khoản nhân viên ${target.name}?`)) {
        setStaff(staff.filter(s => s.id !== staffId));
        triggerToast('Đã xóa tài khoản nhân viên khỏi sơ đồ công tác', 'success');
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-[#0F172A] uppercase">Quản trị sơ đồ nhân sự & Sơ đồ tổ chức</h2>
            <p className="text-xs text-slate-500">Giám sát tải KPI thực tế công việc của cán bộ phụ trách xử lý khiếu nại</p>
          </div>
          <button onClick={() => setShowModal(true)} className="bg-[#F37021] hover:bg-orange-600 text-white px-4 py-2 rounded text-xs font-bold transition-all shadow flex items-center gap-1.5 uppercase">
            <Icons.Plus className="h-4 w-4" /> Bổ sung nhân sự
          </button>
        </div>

        {/* Khối Sơ đồ phòng ban trực quan (FR41-FR43) */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-xs text-[#00458C] uppercase tracking-wider border-b pb-2">Cơ cấu sơ đồ cây phòng ban TQC CGLOBAL (FR41-FR43)</h3>

          <div className="flex flex-col items-center py-4 bg-slate-50/50 rounded-lg border border-slate-100">
            {/* Node Ban Giám đốc */}
            <div className="bg-[#00458C] text-white p-4 rounded-lg shadow text-center w-64 border-2 border-white mb-6">
              <strong className="block text-sm">Ban Giám đốc TQC CGLOBAL</strong>
              <span className="text-[10px] text-orange-200">Phụ trách điều hành tối cao & Phê duyệt CAPA vượt hạn mức</span>
            </div>

            <div className="h-6 w-0.5 bg-slate-300 relative">
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-2 w-2 rounded-full bg-[#F37021]"></div>
            </div>

            {/* Các Node con phòng ban */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl pt-6">
              <div
                onClick={() => setActiveDept('Hành chính - Tổng hợp')}
                className={`p-4 rounded-lg text-center cursor-pointer border transition-all ${activeDept === 'Hành chính - Tổng hợp' ? 'bg-orange-50 border-[#F37021] shadow-md scale-102' : 'bg-white border-slate-200 hover:border-[#00458C]'}`}
              >
                <strong className="block text-xs text-[#00458C]">Bộ phận Hành chính - Tổng hợp</strong>
                <span className="text-[10px] text-slate-400 mt-1 block">Tiếp nhận đơn & Lưu trữ hồ sơ</span>
              </div>

              <div
                onClick={() => setActiveDept('Phòng Chứng nhận')}
                className={`p-4 rounded-lg text-center cursor-pointer border transition-all ${activeDept === 'Phòng Chứng nhận' ? 'bg-orange-50 border-[#F37021] shadow-md scale-102' : 'bg-white border-slate-200 hover:border-[#00458C]'}`}
              >
                <strong className="block text-xs text-[#00458C]">Phòng Chứng nhận TQC</strong>
                <span className="text-[10px] text-slate-400 mt-1 block">Xử lý giải quyết CAPA nghiệp vụ</span>
              </div>

              <div
                onClick={() => setActiveDept('Phòng Kiểm nghiệm')}
                className={`p-4 rounded-lg text-center cursor-pointer border transition-all ${activeDept === 'Phòng Kiểm nghiệm' ? 'bg-orange-50 border-[#F37021] shadow-md scale-102' : 'bg-white border-slate-200 hover:border-[#00458C]'}`}
              >
                <strong className="block text-xs text-[#00458C]">Phòng Kiểm nghiệm & Thử nghiệm</strong>
                <span className="text-[10px] text-slate-400 mt-1 block">Xử lý hồ sơ phân tích kỹ thuật</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bảng danh sách nhân sự (FR34) kèm KPI hiệu suất (FR15) */}
        <div className="bg-white rounded-lg shadow border border-slate-200 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#00458C] text-white text-xs uppercase font-bold">
                <th className="p-3">Mã NV</th>
                <th className="p-3">Họ và tên</th>
                <th className="p-3">Email nội bộ</th>
                <th className="p-3">Bộ phận công tác</th>
                <th className="p-3 text-center">Đơn đang xử lý</th>
                <th className="p-3">KPI Tải công việc hiện tại (FR15)</th>
                <th className="p-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-slate-100">
              {staff.map(s => (
                <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3 font-bold text-slate-700">{s.id}</td>
                  <td className="p-3 font-semibold text-slate-800">{s.name}</td>
                  <td className="p-3 font-medium text-[#00458C]">{s.email}</td>
                  <td className="p-3">{s.department}</td>
                  <td className="p-3 text-center font-bold text-[#F37021]">{s.activeTickets}</td>
                  <td className="p-3 min-w-48">
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            s.kpi > 80 ? 'bg-red-500' :
                            s.kpi > 60 ? 'bg-amber-500' :
                            'bg-emerald-500'
                          }`}
                          style={{ width: `${s.kpi}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-slate-600 shrink-0">{s.kpi}%</span>
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <button onClick={() => handleDeleteStaff(s.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-all" title="Xóa nhân sự">
                      <Icons.Trash className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Thêm hồ sơ nhân sự (FR33, FR38) */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-2xl border border-slate-100 animate-scale-up">
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="font-bold text-sm text-[#00458C] uppercase tracking-wider">Thêm nhân sự mới (FR33)</h3>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                  <Icons.Plus className="h-5 w-5 rotate-45" />
                </button>
              </div>

              <form onSubmit={handleSaveStaff} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Họ và tên *</label>
                  <input type="text" value={newStaff.name} onChange={(e) => setNewStaff({...newStaff, name: e.target.value})} className={`w-full px-3 py-2 border rounded text-xs focus:ring-1 focus:ring-[#00458C] ${formErrors.name ? 'border-[#DC2626]' : 'border-slate-300'}`} placeholder="VD: Hoàng Văn Minh" />
                  {formErrors.name && <p className="text-[10px] text-[#DC2626] mt-1 font-semibold">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email nội bộ TQC *</label>
                  <input type="text" value={newStaff.email} onChange={(e) => setNewStaff({...newStaff, email: e.target.value})} className={`w-full px-3 py-2 border rounded text-xs focus:ring-1 focus:ring-[#00458C] ${formErrors.email ? 'border-[#DC2626]' : 'border-slate-300'}`} placeholder="minh.hv@tqc.vn" />
                  {formErrors.email && <p className="text-[10px] text-[#DC2626] mt-1 font-semibold">{formErrors.email}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Số điện thoại *</label>
                    <input type="text" value={newStaff.phone} onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})} className={`w-full px-3 py-2 border rounded text-xs focus:ring-1 focus:ring-[#00458C] ${formErrors.phone ? 'border-[#DC2626]' : 'border-slate-300'}`} placeholder="09xxxxxxxx" />
                    {formErrors.phone && <p className="text-[10px] text-[#DC2626] mt-1 font-semibold">{formErrors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Vai trò hệ thống *</label>
                    <select value={newStaff.role} onChange={(e) => setNewStaff({...newStaff, role: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#00458C]">
                      <option value="Staff">Chuyên viên xử lý</option>
                      <option value="TP">Trưởng phòng ban</option>
                      <option value="BGD">Ban Giám đốc</option>
                      <option value="HC-TH">Hành chính - Tổng hợp</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Bộ phận công tác *</label>
                  <select value={newStaff.department} onChange={(e) => setNewStaff({...newStaff, department: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#00458C]">
                    <option value="Hành chính - Tổng hợp">Hành chính - Tổng hợp</option>
                    <option value="Phòng Chứng nhận">Phòng Chứng nhận TQC</option>
                    <option value="Phòng Kiểm nghiệm">Phòng Kiểm nghiệm & Thử nghiệm</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-3 border-t">
                  <button type="button" onClick={() => setShowModal(false)} className="w-1/2 py-2 border border-slate-300 rounded text-xs font-bold text-slate-600 hover:bg-slate-50">Đóng</button>
                  <button type="submit" disabled={globalLoading === 'saveStaff'} className="w-1/2 bg-[#00458C] text-white py-2 rounded text-xs font-bold hover:bg-opacity-95 flex items-center justify-center gap-1.5">
                    {globalLoading === 'saveStaff' ? (
                      <>
                        <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent"></div>
                        Đang lưu...
                      </>
                    ) : (
                      'Lưu nhân sự'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ScreenAssignmentManagement = () => {
    const targetTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];
    const [assignedDept, setAssignedDept] = useState('Phòng Chứng nhận');
    const [assignedStaffId, setAssignedStaffId] = useState('');
    const [slaDate, setSlaDate] = useState('');
    const [directives, setDirectives] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const handleAssign = (e) => {
      e.preventDefault();
      const errs = {};

      if (!assignedStaffId) {
        errs.staff = '* Vui lòng chọn nhân sự chịu trách nhiệm chính xử lý đơn khiếu nại này';
      }

      // Ràng buộc SLA kỹ thuật toán học: Hạn hoàn thành phải cách ngày hiện tại tối thiểu 24 giờ
      if (!slaDate) {
        errs.sla = '* Hạn hoàn thành (SLA) không được để trống';
      } else {
        const tDeadline = new Date(slaDate).getTime();
        const tAssign = new Date().getTime();
        const hoursDiff = (tDeadline - tAssign) / (1000 * 60 * 60);

        if (hoursDiff < 24) {
          errs.sla = '* Hạn hoàn thành tối thiểu phải cách thời gian thực hiện phân công 24 giờ (SLA kỹ thuật)';
        }
      }

      setFormErrors(errs);

      if (Object.keys(errs).length === 0) {
        setGlobalLoading('assignTask');
        setTimeout(() => {
          setGlobalLoading(null);
          const chosenStaff = staff.find(s => s.id === assignedStaffId);

          // Lưu phân công vào cơ sở dữ liệu
          const newAssign = {
            ticketId: targetTicket.id,
            staffId: assignedStaffId,
            staffName: chosenStaff ? chosenStaff.name : 'Chưa rõ',
            department: assignedDept,
            slaDate: slaDate,
            note: directives,
            assignDate: new Date().toISOString().split('T')[0]
          };

          setAssignments([newAssign, ...assignments]);
          // Cập nhật trạng thái đơn sang 'Đang xử lý'
          setTickets(tickets.map(t => t.id === targetTicket.id ? {...t, status: 'Đang xử lý'} : t));
          // Cập nhật số đơn đang xử lý & tăng tải KPI cho nhân viên
          setStaff(staff.map(s => s.id === assignedStaffId ? {...s, activeTickets: s.activeTickets + 1, kpi: Math.min(100, s.kpi + 15)} : s));

          triggerToast(`Phân công thành công đơn ${targetTicket.id} cho ${chosenStaff.name}!`, 'success');

          // Gửi thông báo
          setNotifications([
            { id: Date.now(), text: `Nhiệm vụ mới: Xử lý khiếu nại ${targetTicket.id} hạn hoàn thành ${slaDate}`, time: 'Vừa xong', unread: true },
            ...notifications
          ]);

          // Tự động đóng và quay lại Quản lý đơn
          setTimeout(() => {
            setActiveScreen(4);
          }, 500);
        }, 1500);
      }
    };

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-[#0F172A] uppercase">Quản lý phân công xử lý khiếu nại (FR71)</h2>
          <p className="text-xs text-slate-500 mt-1">Gán trách nhiệm nghiệp vụ trực tiếp cho chuyên viên phòng ban kèm ràng buộc SLA pháp lý</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cột trái: Tóm tắt thông tin đơn phản ánh */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-xs text-[#00458C] border-b pb-2 uppercase">Hồ sơ tóm tắt đơn</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between"><span className="text-slate-400">Mã đơn khiếu nại:</span> <strong className="text-[#F37021]">{targetTicket.id}</strong></div>
              <div className="flex justify-between"><span className="text-slate-400">Khách hàng phản ánh:</span> <strong className="text-slate-700">{targetTicket.customerName}</strong></div>
              <div className="flex justify-between"><span className="text-slate-400">Ngày tiếp nhận:</span> <strong>{targetTicket.date}</strong></div>
              <div className="flex justify-between"><span className="text-slate-400">Trạng thái:</span> <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-100">{targetTicket.status}</span></div>

              <div className="border-t pt-3">
                <span className="text-slate-400 block mb-1">Mô tả vụ việc:</span>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded text-[11px] border border-slate-100 italic">{targetTicket.description}</p>
              </div>

              {targetTicket.attachments && targetTicket.attachments.length > 0 && (
                <div className="flex items-center gap-1 bg-blue-50 border border-blue-100 p-2 rounded text-[#00458C]">
                  <Icons.Info className="h-4 w-4 shrink-0" />
                  <span className="font-semibold text-[10px]">Đính kèm kỹ thuật: {targetTicket.attachments[0].name} ({targetTicket.attachments[0].size})</span>
                </div>
              )}
            </div>
          </div>

          {/* Cột phải: Form Tạo phân công */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="font-bold text-xs text-[#00458C] border-b pb-2 uppercase mb-4">Giao việc cho phòng ban phụ trách</h3>

            <form onSubmit={handleAssign} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phòng ban phụ trách xử lý</label>
                <select value={assignedDept} onChange={(e) => setAssignedDept(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#00458C]">
                  <option value="Phòng Chứng nhận">Phòng Chứng nhận TQC</option>
                  <option value="Phòng Kiểm nghiệm">Phòng Kiểm nghiệm & Thử nghiệm</option>
                  <option value="Hành chính - Tổng hợp">Hành chính - Tổng hợp</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Chọn nhân sự phụ trách chính *</label>
                <select value={assignedStaffId} onChange={(e) => setAssignedStaffId(e.target.value)} className={`w-full px-3 py-2 border rounded text-xs focus:ring-1 focus:ring-[#00458C] ${formErrors.staff ? 'border-[#DC2626]' : 'border-slate-300'}`}>
                  <option value="">-- Chọn chuyên viên có tên trên sơ đồ --</option>
                  {staff.filter(s => s.department === assignedDept && s.role === 'Staff').map(s => (
                    <option key={s.id} value={s.id}>{s.name} (Tải hiện tại: {s.kpi}%)</option>
                  ))}
                </select>
                {formErrors.staff && <p className="text-[10px] text-[#DC2626] mt-1 font-semibold">{formErrors.staff}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Hạn hoàn thành SLA (Tối thiểu cách 24H) *</label>
                <input type="datetime-local" value={slaDate} onChange={(e) => setSlaDate(e.target.value)} className={`w-full px-3 py-2 border rounded text-xs focus:ring-1 focus:ring-[#00458C] ${formErrors.sla ? 'border-[#DC2626]' : 'border-slate-300'}`} />
                {formErrors.sla && <p className="text-[10px] text-[#DC2626] mt-1 font-semibold">{formErrors.sla}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nội dung chỉ đạo của lãnh đạo</label>
                <textarea rows={3} value={directives} onChange={(e) => setDirectives(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#00458C]" placeholder="Chỉ đạo ưu tiên liên hệ khách hàng làm rõ..."></textarea>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setActiveScreen(4)} className="w-1/2 py-2 border border-slate-300 rounded text-xs font-bold text-slate-600 hover:bg-slate-50">Hủy bỏ</button>
                <button type="submit" disabled={globalLoading === 'assignTask'} className="w-1/2 bg-[#F37021] text-white py-2 rounded text-xs font-bold hover:bg-orange-600 transition-all shadow flex items-center justify-center gap-1.5">
                  {globalLoading === 'assignTask' ? (
                    <>
                      <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent"></div>
                      Đang gửi mail thông báo...
                    </>
                  ) : (
                    'Xác nhận giao việc'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const ScreenProposalManagement = () => {
    const targetTicket = tickets.find(t => t.id === selectedTicketId) || tickets[1];
    const existingProposal = proposals.find(p => p.ticketId === targetTicket.id) || { reason: '', capa: '', budget: 0, targetDate: '', history: [] };

    const [reason, setReason] = useState(existingProposal.reason);
    const [capa, setCapa] = useState(existingProposal.capa);
    const [budget, setBudget] = useState(existingProposal.budget);
    const [targetDate, setTargetDate] = useState(existingProposal.targetDate);
    const [isReadOnly, setIsReadOnly] = useState(targetTicket.status === 'Chờ phê duyệt' || targetTicket.status === 'Đã phê duyệt');

    const [errors, setErrors] = useState({});

    const handleSendProposal = (e) => {
      e.preventDefault();
      const errs = {};

      if (!reason.trim()) {
        errs.reason = '* Vui lòng phân tích và nhập nguyên nhân gốc rễ dẫn đến khiếu nại';
      }

      // Ràng buộc chiều dài tối thiểu 150 ký tự cho CAPA hành động khắc phục
      if (!capa.trim()) {
        errs.capa = '* Vui lòng nhập nội dung hành động khắc phục CAPA';
      } else if (capa.trim().length < 150) {
        errs.capa = `* Hành động khắc phục CAPA bắt buộc phải có độ dài tối thiểu là 150 ký tự (Hiện tại: ${capa.trim().length} ký tự)`;
      }

      const budgetVal = parseInt(budget);
      if (isNaN(budgetVal) || budgetVal < 0) {
        errs.budget = '* Dự toán bồi thường chỉ chấp nhận giá trị số nguyên dương lớn hơn hoặc bằng 0';
      }

      if (!targetDate) {
        errs.targetDate = '* Vui lòng thiết lập ngày dự kiến hoàn thành';
      }

      setErrors(errs);

      if (Object.keys(errs).length === 0) {
        setGlobalLoading('sendProposal');
        setTimeout(() => {
          setGlobalLoading(null);

          // Lưu hoặc cập nhật phương án trong state
          const newProp = {
            ticketId: targetTicket.id,
            reason,
            capa,
            budget: budgetVal,
            targetDate,
            history: existingProposal.history || []
          };

          // Nếu đã tồn tại thì cập nhật, ngược lại tạo mới
          const idx = proposals.findIndex(p => p.ticketId === targetTicket.id);
          if (idx >= 0) {
            const updated = [...proposals];
            updated[idx] = newProp;
            setProposals(updated);
          } else {
            setProposals([...proposals, newProp]);
          }

          // Cập nhật trạng thái đơn thành 'Chờ phê duyệt'
          setTickets(tickets.map(t => t.id === targetTicket.id ? {...t, status: 'Chờ phê duyệt'} : t));
          setIsReadOnly(true);

          triggerToast('Đã gửi phương án CAPA lên Trưởng phòng phê duyệt thành công!', 'success');

          // Thêm thông báo phê duyệt
          setNotifications([
            { id: Date.now(), text: `Đơn ${targetTicket.id} đã hoàn thiện phương án và chuyển trạng thái chờ duyệt.`, time: 'Vừa xong', unread: true },
            ...notifications
          ]);

          setTimeout(() => {
            setActiveScreen(9);
          }, 1000);
        }, 1500);
      }
    };

    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-[#0F172A] uppercase">Quản lý phương án bồi thường & CAPA</h2>
          <p className="text-xs text-slate-500 mt-1">Lập kế hoạch hành động khắc phục phòng ngừa rủi ro kỹ thuật (FR48)</p>
        </div>

        {/* Khối thông tin vụ việc gốc để đối chiếu */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-400">Mã khiếu nại gốc:</span>
            <strong className="block text-[#00458C] text-sm font-bold">{targetTicket.id}</strong>
          </div>
          <div>
            <span className="text-slate-400">Sự việc phản ánh:</span>
            <strong className="block text-slate-700 font-semibold">{targetTicket.type}</strong>
          </div>
          <div>
            <span className="text-slate-400">Khách hàng đối tác:</span>
            <strong className="block text-slate-700 font-semibold">{targetTicket.customerName}</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cột lập phương án (Form) */}
          <form onSubmit={handleSendProposal} className="lg:col-span-2 bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h3 className="font-bold text-xs text-[#00458C] uppercase">Hành động khắc phục kỹ thuật</h3>
              {isReadOnly && (
                <span className="bg-green-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">Chỉ đọc (Đã khóa)</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phân tích nguyên nhân gốc rễ (Rich-text Simulation) *</label>
              <textarea rows={3} value={reason} onChange={(e) => setReason(e.target.value)} disabled={isReadOnly} className={`w-full px-3 py-2 border rounded text-xs focus:ring-1 focus:ring-[#00458C] ${errors.reason ? 'border-[#DC2626]' : 'border-slate-300'} ${isReadOnly ? 'bg-slate-50 text-slate-500' : ''}`} placeholder="Nhập kết quả rà soát phân tích nguyên nhân kỹ thuật..."></textarea>
              {errors.reason && <p className="text-[10px] text-[#DC2626] mt-1 font-semibold">{errors.reason}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Hành động khắc phục CAPA (Tối thiểu 150 ký tự) *</label>
              <textarea rows={5} value={capa} onChange={(e) => setCapa(e.target.value)} disabled={isReadOnly} className={`w-full px-3 py-2 border rounded text-xs focus:ring-1 focus:ring-[#00458C] ${errors.capa ? 'border-[#DC2626]' : 'border-slate-300'} ${isReadOnly ? 'bg-slate-50 text-slate-500' : ''}`} placeholder="Liệt kê cụ thể lộ trình giải quyết khắc phục, kiểm tra bù và cải tiến chất lượng..."></textarea>
              <div className="flex justify-between items-center mt-1">
                {errors.capa ? <p className="text-[10px] text-[#DC2626] font-semibold">{errors.capa}</p> : <span className="text-[10px] text-slate-400">Quy định tối thiểu 150 ký tự</span>}
                <span className="text-[10px] font-bold text-[#00458C]">Độ dài hiện tại: {capa.trim().length} ký tự</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dự toán bồi thường kinh tế (VNĐ) *</label>
                <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} disabled={isReadOnly} className={`w-full px-3 py-2 border rounded text-xs focus:ring-1 focus:ring-[#00458C] ${errors.budget ? 'border-[#DC2626]' : 'border-slate-300'} ${isReadOnly ? 'bg-slate-50 text-slate-500' : ''}`} placeholder="0" />
                {errors.budget && <p className="text-[10px] text-[#DC2626] mt-1 font-semibold">{errors.budget}</p>}

                {/* Thẻ cảnh báo tự động khi ngân sách vượt hạn mức trưởng phòng (> 10.000.000 VNĐ) */}
                {parseInt(budget) > 10000000 && (
                  <div className="mt-2 bg-orange-50 border border-orange-200 text-orange-600 rounded p-2 text-[10px] font-bold flex items-center gap-1">
                    <Icons.AlertTriangle className="h-4 w-4 shrink-0" />
                    <span>Phương án này yêu cầu phê duyệt cấp Ban Giám đốc (BGD) do vượt hạn mức ngân sách của Trưởng phòng (Hạn mức Trưởng phòng ≤ 10tr VNĐ).</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Thời gian hoàn thành hành động khắc phục *</label>
                <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} disabled={isReadOnly} className={`w-full px-3 py-2 border rounded text-xs focus:ring-1 focus:ring-[#00458C] ${errors.targetDate ? 'border-[#DC2626]' : 'border-slate-300'} ${isReadOnly ? 'bg-slate-50 text-slate-500' : ''}`} />
                {errors.targetDate && <p className="text-[10px] text-[#DC2626] mt-1 font-semibold">{errors.targetDate}</p>}
              </div>
            </div>

            {!isReadOnly && (
              <div className="flex justify-end pt-2 border-t">
                <button type="submit" disabled={globalLoading === 'sendProposal'} className="bg-[#F37021] text-white px-5 py-2.5 rounded text-xs font-bold hover:bg-orange-600 transition-all shadow flex items-center gap-1.5 uppercase">
                  {globalLoading === 'sendProposal' ? (
                    <>
                      <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent"></div>
                      Đang lưu & Gửi phê duyệt...
                    </>
                  ) : (
                    'Gửi phê duyệt phương án'
                  )}
                </button>
              </div>
            )}
          </form>

          {/* Cột lịch sử chỉnh sửa / so sánh (FR49) */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-xs text-[#00458C] border-b pb-2 uppercase">Lịch sử điều chỉnh phương án (FR49)</h3>
            {existingProposal.history && existingProposal.history.length === 0 ? (
              <p className="text-[11px] text-slate-400 bg-slate-50 p-4 text-center rounded border border-dashed">Chưa có lịch sử điều chỉnh (Đây là phiên bản khởi tạo ban đầu).</p>
            ) : (
              <div className="space-y-3">
                {existingProposal.history?.map((h, i) => (
                  <div key={i} className="p-3 bg-red-50/50 border border-red-100 rounded text-[11px] space-y-1.5">
                    <div className="flex justify-between font-bold text-[#DC2626] border-b pb-1">
                      <span>Phiên bản {h.ver}</span>
                      <span>{h.status}</span>
                    </div>
                    <p><strong className="text-slate-600">Lý do từ chối:</strong> {h.reason}</p>
                    <p><strong className="text-slate-600">CAPA đề xuất:</strong> {h.capa}</p>
                    <p><strong className="text-slate-600">Dự toán:</strong> <strong className="text-slate-700">{h.budget.toLocaleString()} VNĐ</strong></p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ScreenFeedbackManagement = () => {
    const targetTicket = tickets.find(t => t.id === selectedTicketId) || tickets[1];
    const [msgContent, setMsgContent] = useState('');
    const [msgType, setMsgType] = useState('Nội bộ'); // Nội bộ hoặc Công khai

    const handleSendMsg = (e) => {
      e.preventDefault();
      if (!msgContent.trim()) {
        triggerToast('Nội dung tin nhắn không được bỏ trống!', 'error');
        return;
      }

      setGlobalLoading('sendMsg');
      setTimeout(() => {
        setGlobalLoading(null);

        // Khởi tạo dòng tin nhắn mới (Phòng chống XSS bằng cách chuyển chuỗi thô thành chuỗi an toàn khi hiển thị)
        const escapedContent = msgContent.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const newMsg = {
          id: chats.length + 1,
          ticketId: targetTicket.id,
          sender: currentUser.role,
          senderName: currentUser.name,
          content: escapedContent,
          time: new Date().toISOString().replace('T', ' ').substring(0, 16),
          isInternal: msgType === 'Nội bộ'
        };

        setChats([...chats, newMsg]);
        setMsgContent('');
        triggerToast('Tin nhắn của bạn đã được gửi thành công!', 'success');
      }, 500);
    };

    const handleCreateApprovalRequest = () => {
      setGlobalLoading('packageChat');
      setTimeout(() => {
        setGlobalLoading(null);
        triggerToast('Đã đóng gói luồng chat và tạo yêu cầu phê duyệt thành công!', 'success');
        setActiveScreen(9);
      }, 1000);
    };

    const activeChats = chats.filter(c => c.ticketId === targetTicket.id);

    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-[#0F172A] uppercase">Cổng tương tác trực tuyến</h2>
            <p className="text-xs text-slate-500">Tổ chức luồng trao đổi thông tin chính thức giữa TQC và khách hàng (FR53-FR55)</p>
          </div>
          <button onClick={handleCreateApprovalRequest} className="bg-[#F37021] hover:bg-orange-600 text-white px-4 py-2 rounded text-xs font-bold shadow flex items-center gap-1.5 uppercase transition-all">
            <Icons.Check className="h-4 w-4" /> Đóng gói luồng & Gửi duyệt
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Thông tin hồ sơ đơn kèm */}
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm text-xs space-y-3 h-fit">
            <h3 className="font-bold text-xs text-[#00458C] border-b pb-2 uppercase">Mã sự vụ: {targetTicket.id}</h3>
            <p><span className="text-slate-400">Khách hàng:</span> <strong className="text-slate-700">{targetTicket.customerName}</strong></p>
            <p><span className="text-slate-400">Nội dung chính:</span> <span className="text-slate-600 leading-relaxed block bg-slate-50 p-2 rounded mt-1">{targetTicket.description}</span></p>
          </div>

          {/* Khung chat hội thoại */}
          <div className="md:col-span-2 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between h-[500px]">
            {/* Tiêu đề chat */}
            <div className="bg-[#00458C] p-3 text-white flex justify-between items-center text-xs font-bold">
              <span>HỘI THOẠI TRỰC TUYẾN</span>
              <span className="bg-orange-500 text-[9px] px-2 py-0.5 rounded uppercase">WebSocket Active</span>
            </div>

            {/* Vùng tin nhắn */}
            <div className="p-4 overflow-y-auto flex-1 bg-slate-50 space-y-3">
              {activeChats.length === 0 ? (
                <p className="text-center text-slate-400 text-xs italic py-10">Chưa ghi nhận phản hồi nào. Hãy gửi tin nhắn đầu tiên của bạn.</p>
              ) : (
                activeChats.map(c => (
                  <div key={c.id} className={`flex flex-col ${c.sender === 'Customer' ? 'items-start' : 'items-end'}`}>
                    <div className="flex items-center gap-1.5 mb-1 text-[10px]">
                      <span className="font-bold text-slate-600">{c.senderName}</span>
                      <span className="text-slate-400">{c.time}</span>
                      {c.isInternal && (
                        <span className="bg-red-50 text-red-600 border border-red-200 px-1 py-0.2 rounded text-[8px] font-bold">Nội bộ TQC</span>
                      )}
                    </div>
                    <div className={`p-3 rounded-lg text-xs max-w-sm leading-relaxed ${
                      c.sender === 'Customer' ? 'bg-slate-300 text-slate-800 rounded-bl-none' : 'bg-[#00458C] text-white rounded-br-none'
                    }`}>
                      {c.content}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Vùng soạn phản hồi (FR53) */}
            <form onSubmit={handleSendMsg} className="p-3 border-t bg-white space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">Chế độ nhắn:</span>
                  <select value={msgType} onChange={(e) => setMsgType(e.target.value)} className="px-2 py-1 border border-slate-300 rounded text-xs text-slate-700 focus:ring-1 focus:ring-[#00458C]">
                    <option value="Nội bộ">Chỉ nội bộ TQC CGLOBAL xem</option>
                    <option value="Công khai">Công khai cho khách hàng đối tác</option>
                  </select>
                </div>
                <span className="text-[10px] text-slate-400 font-medium italic">* Bộ lọc phòng chống XSS đã được kích hoạt</span>
              </div>

              <div className="flex gap-2">
                <input type="text" value={msgContent} onChange={(e) => setMsgContent(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#00458C] focus:outline-none" placeholder="Nhập câu trả lời hoặc phản hồi nghiệp vụ..." />
                <button type="submit" disabled={globalLoading === 'sendMsg'} className="bg-[#F37021] text-white px-4 py-2 rounded text-xs font-bold hover:bg-orange-600 transition-all shrink-0 flex items-center justify-center gap-1">
                  {globalLoading === 'sendMsg' ? 'Đang gửi...' : <><Icons.Send className="h-4 w-4" /> Gửi</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const ScreenApprovalManagement = () => {
    const [selectedPropId, setSelectedPropId] = useState('KN2026-002');
    const [opinion, setOpinion] = useState('');
    const [opinionError, setOpinionError] = useState('');

    const activeTicket = tickets.find(t => t.id === selectedPropId) || tickets[1];
    const activeProp = proposals.find(p => p.ticketId === activeTicket.id) || { reason: 'Chưa lập', capa: 'Chưa lập', budget: 0, targetDate: '' };

    const handleApprove = () => {
      // Ma trận phân quyền phê duyệt (Approval Matrix)
      // Nếu dự toán bồi thường vượt quá 10.000.000 VNĐ, quyền phê duyệt của Trưởng phòng ban sẽ tự động khóa lại (Disabled);
      // chỉ tài khoản Ban Giám đốc (BGD) mới có quyền thao tác phê duyệt.
      if (activeProp.budget > 10000000 && currentUser.role === 'TP') {
        triggerToast('Hồ sơ vượt quá ngân sách phê duyệt của Trưởng phòng. Chỉ Ban Giám đốc mới có thể duyệt!', 'error');
        return;
      }

      setGlobalLoading('approve');
      setTimeout(() => {
        setGlobalLoading(null);
        // Cập nhật trạng thái sang Đã phê duyệt
        setTickets(tickets.map(t => t.id === activeTicket.id ? {...t, status: 'Đã phê duyệt'} : t));

        // Khởi tạo lưu kho hồ sơ điện tử (FR65)
        const newArchive = {
          id: 'HS-2026-00' + (archives.length + 1),
          ticketId: activeTicket.id,
          customerName: activeTicket.customerName,
          archiveDate: new Date().toISOString().split('T')[0],
          approver: currentUser.name,
          retentionYears: 5,
          elapsedDays: 0
        };
        setArchives([newArchive, ...archives]);

        triggerToast(`Đã chính thức phê duyệt phương án ${activeTicket.id}! Hồ sơ đã chuyển sang lưu kho điện tử (FR65)`, 'success');
        setActiveScreen(10);
      }, 1500);
    };

    const handleReject = () => {
      // Nếu người duyệt chọn nút "Từ chối", trường "Ý kiến chỉ đạo phê duyệt" bắt buộc phải điền tối thiểu 30 ký tự để làm cơ sở cho nhân viên sửa phương án.
      if (!opinion.trim() || opinion.trim().length < 30) {
        setOpinionError(`* Bạn phải nhập ý kiến chỉ đạo tối thiểu 30 ký tự khi từ chối (Hiện tại: ${opinion.trim().length} ký tự)`);
        triggerToast('Từ chối thất bại!', 'error');
        return;
      }

      setOpinionError('');
      setGlobalLoading('reject');
      setTimeout(() => {
        setGlobalLoading(null);

        // Lưu lịch sử từ chối và cập nhật phương án
        const updatedProps = proposals.map(p => {
          if (p.ticketId === activeTicket.id) {
            return {
              ...p,
              history: [
                { ver: 'V' + (p.history?.length + 1 || 1), reason: opinion, capa: p.capa, budget: p.budget, status: 'Bị từ chối' },
                ...(p.history || [])
              ]
            };
          }
          return p;
        });
        setProposals(updatedProps);

        // Đổi trạng thái đơn về 'Yêu cầu chỉnh sửa'
        setTickets(tickets.map(t => t.id === activeTicket.id ? {...t, status: 'Yêu cầu chỉnh sửa'} : t));

        triggerToast(`Đã bác bỏ phương án và gửi yêu cầu chỉnh sửa cho cán bộ phụ trách!`, 'info');
        setOpinion('');
      }, 1500);
    };

    const isBgdOnly = activeProp.budget > 10000000;
    const canAction = !(isBgdOnly && currentUser.role === 'TP');

    return (
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-[#0F172A] uppercase">Hệ thống thẩm định & Phê duyệt phương án (FR59-FR61)</h2>
          <p className="text-xs text-slate-500 mt-1">Cơ chế phê chuẩn hành động khắc phục và dự toán bồi thường theo cấp bậc</p>
        </div>

        {/* Bảng danh sách yêu cầu chờ duyệt */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
          <h3 className="font-bold text-xs text-[#00458C] uppercase">Danh sách yêu cầu đang chờ phê duyệt (FR60)</h3>
          <div className="flex gap-2">
            {tickets.filter(t => t.status === 'Chờ phê duyệt').length === 0 ? (
              <p className="text-xs text-slate-400 italic py-2">Hiện tại không có hồ sơ nào đang chờ phê duyệt.</p>
            ) : (
              tickets.filter(t => t.status === 'Chờ phê duyệt').map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedPropId(t.id)}
                  className={`px-3 py-2 rounded text-xs font-bold border transition-all flex items-center gap-1 ${selectedPropId === t.id ? 'bg-orange-50 border-[#F37021] text-[#F37021]' : 'bg-white border-slate-200 text-slate-600 hover:border-[#00458C]'}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                  Yêu cầu từ: {t.id}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Cột chia hai màn hình (Split Screen - FR61) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cột trái: Đơn khiếu nại gốc và Minh chứng */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-xs text-[#00458C] border-b pb-2 uppercase">1. Đối chiếu Đơn khiếu nại gốc & Tài liệu đính kèm</h3>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded border border-slate-100">
                <p><span className="text-slate-400">Mã đơn:</span> <strong className="text-slate-700">{activeTicket.id}</strong></p>
                <p><span className="text-slate-400">Ngày gửi đơn:</span> <strong>{activeTicket.date}</strong></p>
                <p className="col-span-2"><span className="text-slate-400">Khách hàng gửi:</span> <strong className="text-slate-700">{activeTicket.customerName}</strong></p>
              </div>

              <div>
                <span className="text-slate-400 font-bold block mb-1">Nội dung phản ánh sự vụ:</span>
                <p className="text-slate-600 leading-relaxed bg-white border p-3 rounded text-[11px] italic">{activeTicket.description}</p>
              </div>

              {activeTicket.attachments && activeTicket.attachments.length > 0 && (
                <div className="bg-blue-50 border border-blue-100 p-3 rounded flex justify-between items-center text-[#00458C]">
                  <span className="font-bold text-[10px]">Tệp minh chứng đính kèm: {activeTicket.attachments[0].name} ({activeTicket.attachments[0].size})</span>
                  <button onClick={() => triggerToast('Tải thành công tệp để thẩm định', 'success')} className="text-xs font-bold uppercase hover:underline">Thẩm định tệp</button>
                </div>
              )}
            </div>
          </div>

          {/* Cột phải: Phương án CAPA & dự toán bồi thường */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-xs text-[#00458C] border-b pb-2 uppercase">2. Đề xuất phương án khắc phục & Ngân sách</h3>
            <div className="space-y-3 text-xs">
              <div className="bg-orange-50/50 border border-orange-100 p-3 rounded text-slate-700 space-y-1">
                <p><span className="text-slate-400">Dự toán đền bù:</span> <strong className="text-[#F37021] text-sm font-bold">{activeProp.budget?.toLocaleString()} VNĐ</strong></p>
                <p><span className="text-slate-400">Hạn hoàn thành:</span> <strong>{activeProp.targetDate}</strong></p>
              </div>

              <div>
                <span className="text-slate-400 font-bold block mb-1">Nguyên nhân phân tích:</span>
                <p className="bg-slate-50 p-2.5 rounded text-[11px] text-slate-600 border border-slate-100">{activeProp.reason}</p>
              </div>

              <div>
                <span className="text-slate-400 font-bold block mb-1">Hành động khắc phục CAPA đề xuất:</span>
                <p className="bg-slate-50 p-2.5 rounded text-[11px] text-slate-600 border border-slate-100 leading-relaxed">{activeProp.capa}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Khối ra quyết định phê duyệt */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-xs text-[#00458C] border-b pb-2 uppercase">Hội đồng thẩm định ra quyết định</h3>

          {isBgdOnly && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded p-3 text-xs font-bold flex items-center gap-1.5 mb-3">
              <Icons.AlertTriangle className="h-5 w-5 shrink-0" />
              <span>CẢNH BÁO PHÂN QUYỀN (RBAC): Dự toán vượt mức 10 triệu đồng. Quyền xử lý phê duyệt của Trưởng phòng hiện đã bị khóa. Chỉ có tài khoản thuộc Ban Giám đốc (BGD) mới có quyền duyệt!</span>
            </div>
          )}

          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700">Ý kiến chỉ đạo / Ghi chú phê duyệt *</label>
            <textarea rows={2} value={opinion} onChange={(e) => { setOpinion(e.target.value); setOpinionError(''); }} className={`w-full px-3 py-2 border rounded text-xs focus:ring-1 focus:ring-[#00458C] ${opinionError ? 'border-[#DC2626]' : 'border-slate-300'}`} placeholder="Nhập ý kiến phê duyệt hoặc lý do chi tiết nếu từ chối..."></textarea>
            {opinionError && <p className="text-[10px] text-[#DC2626] font-semibold">{opinionError}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={handleReject}
              disabled={globalLoading !== null || !canAction}
              className={`bg-[#DC2626] hover:bg-red-700 text-white px-5 py-2 rounded text-xs font-bold shadow flex items-center gap-1.5 uppercase transition-all ${!canAction ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              {globalLoading === 'reject' ? 'Đang thực hiện bác bỏ...' : 'Bác bỏ & Yêu cầu sửa đổi'}
            </button>
            <button
              onClick={handleApprove}
              disabled={globalLoading !== null || !canAction}
              className={`bg-[#00458C] hover:bg-opacity-95 text-white px-5 py-2 rounded text-xs font-bold shadow flex items-center gap-1.5 uppercase transition-all ${!canAction ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              {globalLoading === 'approve' ? (
                <>
                  <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent"></div>
                  Đang ghi nhận quyết định phê duyệt...
                </>
              ) : (
                'Chính thức phê duyệt phương án'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ScreenArchiveManagement = () => {
    const [selectedArchiveId, setSelectedArchiveId] = useState(null);

    // Tính toán thời gian lưu trữ còn lại cho ràng buộc cảnh báo (FR69)
    // D retention là thời hạn lưu trữ quy định, D elapsed là số ngày đã trôi qua:
    // Ràng buộc tính toán cảnh báo: D retention - D elapsed <= 30 days -> Chuyển màu cam và cảnh báo
    const calculateRetentionWarning = (retentionYears, elapsedDays) => {
      const totalDays = retentionYears * 365;
      const leftDays = totalDays - elapsedDays;
      return leftDays <= 30;
    };

    const handleExtend = (id) => {
      setGlobalLoading('extend');
      setTimeout(() => {
        setGlobalLoading(null);
        // Tăng số năm bảo quản thêm 2 năm
        setArchives(archives.map(a => a.id === id ? {...a, retentionYears: a.retentionYears + 2} : a));
        triggerToast('Đã phê chuẩn gia hạn thời hạn bảo quản lưu trữ điện tử thành công!', 'success');
      }, 1000);
    };

    const handleDestroy = (id) => {
      if (window.confirm('CẢNH BÁO PHÁP LÝ: Bạn có chắc chắn muốn hủy vĩnh viễn hồ sơ điện tử này? Thao tác không thể hoàn tác.')) {
        setGlobalLoading('destroy');
        setTimeout(() => {
          setGlobalLoading(null);
          setArchives(archives.filter(a => a.id !== id));
          triggerToast('Đã tiến hành hủy vĩnh viễn hồ sơ lưu trữ theo luật định.', 'success');
        }, 1000);
      }
    };

    return (
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-[#0F172A] uppercase">Kho lưu trữ hồ sơ pháp lý điện tử (FR65-FR69)</h2>
          <p className="text-xs text-slate-500 mt-1">Lưu kho điện tử, đóng băng dữ liệu an toàn phục vụ đánh giá độc lập quốc tế</p>
        </div>

        {/* Khối cảnh báo thời hạn lưu trữ (FR69) */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
          <h3 className="font-bold text-xs text-[#00458C] border-b pb-2 uppercase">Danh mục hồ sơ đến hạn lưu trữ / Cảnh báo hủy (FR69)</h3>
          <div className="grid grid-cols-1 gap-2">
            {archives.map(a => {
              const isWarning = calculateRetentionWarning(a.retentionYears, a.elapsedDays);
              if (!isWarning) return null;
              return (
                <div key={a.id} className="bg-orange-50 border-l-4 border-[#F37021] text-[#F37021] p-4 rounded text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 font-semibold animate-pulse">
                  <div className="flex items-center gap-2">
                    <Icons.AlertTriangle className="h-5 w-5 shrink-0" />
                    <span>Hồ sơ {a.id} của khách hàng {a.customerName} sắp đến hạn hết thời gian bảo quản pháp lý (Còn lại dưới 30 ngày)!</span>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => handleExtend(a.id)} className="bg-[#00458C] text-white px-3 py-1 rounded text-[10px] font-bold hover:bg-opacity-95">Gia hạn lưu giữ</button>
                    <button onClick={() => handleDestroy(a.id)} className="bg-[#DC2626] text-white px-3 py-1 rounded text-[10px] font-bold hover:bg-red-700">Hủy hồ sơ</button>
                  </div>
                </div>
              );
            })}
            {archives.filter(a => calculateRetentionWarning(a.retentionYears, a.elapsedDays)).length === 0 && (
              <p className="text-[11px] text-slate-400 italic">Không có hồ sơ nào sắp hết hạn bảo quản.</p>
            )}
          </div>
        </div>

        {/* Kho lưu trữ hồ sơ điện tử (FR66) */}
        <div className="bg-white rounded-lg shadow border border-slate-200 overflow-x-auto">
          <div className="p-4 border-b bg-slate-50 text-xs font-bold text-[#00458C] flex justify-between items-center">
            <span>TOÀN BỘ HỒ SƠ ĐÃ ĐÓNG KHÓA VÀ ĐÓNG BĂNG DỮ LIỆU (READ-ONLY)</span>
            <span className="text-slate-400 font-medium italic">Tự động khóa tuyệt đối tránh sửa đổi</span>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#00458C] text-white text-xs uppercase font-bold">
                <th className="p-3">Mã hồ sơ</th>
                <th className="p-3">Mã đơn gốc</th>
                <th className="p-3">Khách hàng đối tác</th>
                <th className="p-3">Ngày đóng lưu trữ</th>
                <th className="p-3">Lãnh đạo ký duyệt</th>
                <th className="p-3">Thời hạn bảo quản</th>
                <th className="p-3 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-slate-100">
              {archives.map(a => {
                const totalDays = a.retentionYears * 365;
                const progressPercent = Math.min(100, (a.elapsedDays / totalDays) * 100);

                return (
                  <tr key={a.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3 font-bold text-slate-700">{a.id}</td>
                    <td className="p-3 font-semibold text-slate-600">{a.ticketId}</td>
                    <td className="p-3 font-semibold text-slate-800">{a.customerName}</td>
                    <td className="p-3 font-medium text-slate-500">{a.archiveDate}</td>
                    <td className="p-3 font-bold text-slate-700">{a.approver}</td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <span className="font-bold text-slate-600 block text-[10px]">{a.retentionYears} năm ({a.elapsedDays} / {totalDays} ngày đã lưu)</span>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#00458C] h-full" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <button onClick={() => setSelectedArchiveId(a)} className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded text-[10px] font-bold hover:bg-slate-200 transition-all shadow-sm">
                        Chi tiết lịch sử
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Modal Chi tiết lịch sử vụ việc (FR67) */}
        {selectedArchiveId && (
          <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-2xl border border-slate-100 animate-scale-up">
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="font-bold text-sm text-[#00458C] uppercase tracking-wider">Lịch sử vụ việc lưu trữ (FR67)</h3>
                <button onClick={() => setSelectedArchiveId(null)} className="text-slate-400 hover:text-slate-600">
                  <Icons.Plus className="h-5 w-5 rotate-45" />
                </button>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                <div className="bg-red-50 border border-red-200 rounded p-3 text-[11px] text-red-600 font-semibold text-center uppercase tracking-wide">
                  Đã đóng băng dữ liệu - Chế độ bảo mật tuyệt đối chỉ đọc
                </div>

                <div className="bg-slate-50 p-4 rounded space-y-2 text-xs">
                  <p><span className="text-slate-400">Mã lưu trữ:</span> <strong className="text-slate-700">{selectedArchiveId.id}</strong></p>
                  <p><span className="text-slate-400">Khách hàng liên đới:</span> <strong className="text-slate-700">{selectedArchiveId.customerName}</strong></p>
                  <p><span className="text-slate-400">Cán bộ đóng phê duyệt:</span> <strong>{selectedArchiveId.approver}</strong></p>
                  <p><span className="text-slate-400">Ngày khởi tạo lưu kho:</span> <strong>{selectedArchiveId.archiveDate}</strong></p>
                </div>

                <div className="border-t pt-3">
                  <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase">Lịch trình giải quyết CAPA chi tiết</h4>
                  <div className="relative border-l-2 border-slate-200 pl-4 space-y-4 text-xs">
                    <div className="relative">
                      <div className="absolute -left-[21px] top-1 bg-[#F37021] h-2.5 w-2.5 rounded-full border border-white"></div>
                      <p className="font-bold text-slate-700">Khởi tạo tiếp nhận đơn khiếu nại</p>
                      <p className="text-slate-400 text-[10px]">Đã nộp đầy đủ tệp đính kèm kỹ thuật gốc.</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[21px] top-1 bg-[#00458C] h-2.5 w-2.5 rounded-full border border-white"></div>
                      <p className="font-bold text-slate-700">Xác thực giao việc và thẩm định SLA</p>
                      <p className="text-slate-400 text-[10px]">Trưởng phòng gán việc thành công cho cán bộ phụ trách.</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[21px] top-1 bg-emerald-500 h-2.5 w-2.5 rounded-full border border-white"></div>
                      <p className="font-bold text-slate-700">Ký duyệt lưu kho bảo quản vĩnh viễn</p>
                      <p className="text-slate-400 text-[10px]">Hồ sơ chính thức đóng băng thời hạn 5 năm để phục vụ kiểm toán.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t mt-4">
                <button onClick={() => setSelectedArchiveId(null)} className="bg-[#00458C] text-white px-5 py-2 rounded text-xs font-bold hover:bg-opacity-95">Đóng cửa sổ</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 1:
        return <ScreenRegister />;
      case 2:
        return <ScreenLogin />;
      case 3:
        return <ScreenCustomerManagement />;
      case 4:
        return <ScreenTicketManagement />;
      case 5:
        return <ScreenStaffManagement />;
      case 6:
        return <ScreenAssignmentManagement />;
      case 7:
        return <ScreenProposalManagement />;
      case 8:
        return <ScreenFeedbackManagement />;
      case 9:
        return <ScreenApprovalManagement />;
      case 10:
        return <ScreenArchiveManagement />;
      default:
        return <ScreenLogin />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans antialiased text-[#475569]">
      <GlobalHeader />

      {/* Demo Panel Trực quan giúp thanh tra và người kiểm thử chuyển đổi nhanh giữa 10 màn hình và phân quyền */}
      <div className="bg-slate-900 text-white p-3 pt-24 pb-4 px-4 md:px-8 border-b border-slate-800 z-10 flex flex-col gap-3">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-[#F37021] text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">HỘP THỬ NGHIỆM</span>
            <p className="text-xs font-bold text-slate-300">BẢNG ĐIỀU KHIỂN CHUYỂN NHANH 10 MÀN HÌNH CHỨC NĂNG (MÔ PHỎNG SWA):</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 font-semibold">Chuyển vai trò test RBAC:</span>
            <div className="flex flex-wrap gap-1">
              <button onClick={() => handleRoleChange('HC-TH')} className={`px-2 py-0.5 rounded text-[10px] font-bold ${currentUser.role === 'HC-TH' ? 'bg-[#F37021]' : 'bg-slate-700 hover:bg-slate-600'}`}>HC-TH</button>
              <button onClick={() => handleRoleChange('Staff')} className={`px-2 py-0.5 rounded text-[10px] font-bold ${currentUser.role === 'Staff' ? 'bg-[#F37021]' : 'bg-slate-700 hover:bg-slate-600'}`}>Nhân viên</button>
              <button onClick={() => handleRoleChange('TP')} className={`px-2 py-0.5 rounded text-[10px] font-bold ${currentUser.role === 'TP' ? 'bg-[#F37021]' : 'bg-slate-700 hover:bg-slate-600'}`}>Trưởng phòng</button>
              <button onClick={() => handleRoleChange('BGD')} className={`px-2 py-0.5 rounded text-[10px] font-bold ${currentUser.role === 'BGD' ? 'bg-[#F37021]' : 'bg-slate-700 hover:bg-slate-600'}`}>BGD</button>
              <button onClick={() => handleRoleChange('KH')} className={`px-2 py-0.5 rounded text-[10px] font-bold ${currentUser.role === 'KH' ? 'bg-[#F37021]' : 'bg-slate-700 hover:bg-slate-600'}`}>Khách hàng</button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-800">
          {[
            { num: 1, name: '1. Đăng ký' },
            { num: 2, name: '2. Đăng nhập' },
            { num: 3, name: '3. Khách hàng' },
            { num: 4, name: '4. Quản lý Đơn' },
            { num: 5, name: '5. Nhân sự' },
            { num: 6, name: '6. Phân công' },
            { num: 7, name: '7. Lập phương án' },
            { num: 8, name: '8. Phản hồi/Chat' },
            { num: 9, name: '9. Phê duyệt' },
            { num: 10, name: '10. Lưu trữ điện tử' }
          ].map(s => (
            <button
              key={s.num}
              onClick={() => {
                setActiveScreen(s.num);
                triggerToast(`Đã chuyển sang màn hình số ${s.num}: ${s.name}`, 'info');
              }}
              className={`px-2.5 py-1 text-[10px] font-bold rounded-sm border transition-all ${activeScreen === s.num ? 'bg-white text-slate-900 border-white shadow' : 'bg-transparent text-slate-400 border-slate-700 hover:border-slate-500 hover:text-white'}`}
            >
              Màn hình {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Khối chứa Nội dung trang con chuyển đổi mượt mà */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-8 py-8 animate-fade-in">
        {renderActiveScreen()}
      </main>

      <GlobalFooter />

      {/* Custom Toast hệ thống */}
      <div className="fixed bottom-5 right-5 z-50 space-y-2 max-w-sm w-full">
        {toasts.map((t) => (
          <div key={t.id} className={`p-4 rounded-lg shadow-xl text-xs font-semibold flex items-center justify-between border animate-fade-in-up ${
            t.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
            t.type === 'error' ? 'bg-red-50 text-red-800 border-red-200' :
            'bg-blue-50 text-blue-800 border-blue-200'
          }`}>
            <span>{t.message}</span>
            <button onClick={() => setToasts((prev) => prev.filter((item) => item.id !== t.id))} className="text-slate-400 hover:text-slate-600 pl-3">
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}