import {
  Calendar,
  Users,
  Building2,
  Award,
  CheckCircle,
  Clock,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function LandingPage() {
  const features = [
    {
      icon: Calendar,
      title: "Quản lý lịch thông minh",
      description: "Theo dõi và lập kế hoạch họp dễ dàng",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Cộng tác nhóm",
      description: "Kết nối và làm việc hiệu quả",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: CheckCircle,
      title: "Theo dõi tiến độ",
      description: "Giám sát và đánh giá công việc",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: TrendingUp,
      title: "Báo cáo thống kê",
      description: "Phân tích dữ liệu chi tiết",
      color: "from-orange-500 to-red-500",
    },
  ];

  const stats = [
    { number: "500+", label: "Công ty tin dùng" },
    { number: "10,000+", label: "Người dùng" },
    { number: "50,000+", label: "Cuộc họp/tháng" },
    { number: "99.9%", label: "Uptime" },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Tiết kiệm thời gian",
      description: "Giảm 40% thời gian lập lịch và quản lý họp",
      gradient: "from-blue-50 to-cyan-50",
    },
    {
      icon: Award,
      title: "Nâng cao năng suất",
      description: "Tăng 60% hiệu quả làm việc nhóm",
      gradient: "from-purple-50 to-pink-50",
    },
    {
      icon: CheckCircle,
      title: "Quản lý chuyên nghiệp",
      description: "Hệ thống hoàn chỉnh, dễ sử dụng",
      gradient: "from-green-50 to-emerald-50",
    },
  ];

  return (
    <div className="min-h-screen scroll-smooth bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5">
              <Building2 className="size-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">TechCorp Vietnam</h1>
              <p className="text-xs text-gray-600">Công ty Công nghệ Hàng đầu</p>
            </div>
          </div>

          <nav className="hidden items-center gap-12 md:flex">
            <a
              href="#trang-chu"
              className="text-[15px] text-gray-700 transition-colors hover:text-gray-900"
            >
              Trang chủ
            </a>
            <a
              href="#tinh-nang"
              className="text-[15px] text-gray-700 transition-colors hover:text-gray-900"
            >
              Tính năng
            </a>
            <a
              href="#giai-phap"
              className="text-[15px] text-gray-700 transition-colors hover:text-gray-900"
            >
              Giải pháp
            </a>
            <a
              href="#bang-gia"
              className="text-[15px] font-medium text-blue-600 transition-colors hover:text-blue-700"
            >
              Bảng giá
            </a>
            <a
              href="#lien-he"
              className="text-[15px] text-gray-700 transition-colors hover:text-gray-900"
            >
              Liên hệ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Đăng nhập
            </a>
          </div>
        </div>
      </header>

      <section id="trang-chu" className="mx-auto max-w-7xl px-6 py-20 scroll-mt-16">
        <div className="mb-16 grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              🚀 Giải pháp quản lý chuyên nghiệp
            </div>

            <h2 className="mb-6 text-5xl font-bold leading-tight text-gray-900">
              Hệ Thống Quản Lý
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Lịch Công Tác & Họp Chuyên Môn
              </span>
            </h2>

            <p className="mb-8 text-xl leading-relaxed text-gray-600">
              Tối ưu hóa thời gian làm việc, nâng cao hiệu suất cộng tác với công nghệ quản lý
              thông minh. Giải pháp toàn diện cho doanh nghiệp hiện đại.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/login"
                className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 font-medium text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-500/40"
              >
                Bắt đầu ngay
              </a>

              <a
                href="#tinh-nang"
                className="rounded-lg border-2 border-blue-600 px-8 py-3 font-medium text-blue-600 transition-all duration-200 hover:bg-blue-50"
              >
                Tìm hiểu thêm
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rotate-3 rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100"></div>
            <div className="relative rounded-3xl border-2 border-gray-100 bg-white p-8 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
                alt="Hệ thống quản lý lịch công tác và họp chuyên môn"
                className="w-full rounded-xl"
              />
            </div>
          </div>
        </div>

        <div id="tinh-nang" className="mb-20 scroll-mt-16">
          <h3 className="mb-4 text-center text-3xl font-bold text-gray-900">Tính năng nổi bật</h3>
          <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
            Giải pháp toàn diện với đầy đủ tính năng cho mọi đối tượng sử dụng
          </p>

          <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-xl"
              >
                <div
                  className={`inline-block rounded-xl bg-gradient-to-br ${feature.color} mb-4 p-3 transition-transform duration-300 group-hover:scale-110`}
                >
                  <feature.icon className="size-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-12 shadow-2xl">
          <div className="grid gap-8 text-center text-white md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="mb-2 text-4xl font-bold transition-transform duration-300 group-hover:scale-110">
                  {stat.number}
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div id="giai-phap" className="mb-20 scroll-mt-16">
          <h3 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Lợi ích vượt trội cho doanh nghiệp
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`rounded-2xl border border-gray-200 bg-gradient-to-br ${benefit.gradient} p-8 transition-all duration-300 hover:shadow-xl`}
              >
                <benefit.icon className="mb-4 size-12 text-blue-600" />
                <h4 className="mb-3 text-xl font-semibold text-gray-900">{benefit.title}</h4>
                <p className="leading-relaxed text-gray-700">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h3 className="mb-4 text-center text-3xl font-bold text-gray-900">
            Đối tác tin dùng TechCorp Vietnam
          </h3>
          <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
            Được tin tưởng và sử dụng bởi hàng trăm doanh nghiệp hàng đầu tại Việt Nam
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80"
                alt="Họp chuyên môn doanh nghiệp"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6">
                <div className="text-white">
                  <h4 className="mb-1 text-lg font-semibold">Họp chuyên môn hiệu quả</h4>
                  <p className="text-sm text-white/90">Tổ chức cuộc họp chuyên nghiệp</p>
                </div>
              </div>
            </div>

            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                alt="Làm việc nhóm"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6">
                <div className="text-white">
                  <h4 className="mb-1 text-lg font-semibold">Cộng tác nhóm</h4>
                  <p className="text-sm text-white/90">Làm việc nhóm năng suất cao</p>
                </div>
              </div>
            </div>

            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80"
                alt="Không gian làm việc chuyên nghiệp"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6">
                <div className="text-white">
                  <h4 className="mb-1 text-lg font-semibold">Không gian làm việc</h4>
                  <p className="text-sm text-white/90">Môi trường chuyên nghiệp</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-12 shadow-2xl">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <div className="mb-4 text-6xl text-white">"</div>
              <p className="mb-6 text-xl leading-relaxed text-white">
                Hệ thống quản lý lịch công tác của TechCorp Vietnam đã giúp công ty chúng tôi tiết
                kiệm hơn 30% thời gian trong việc tổ chức và quản lý các cuộc họp. Giao diện thân
                thiện và tính năng thông minh làm việc trở nên dễ dàng hơn bao giờ hết.
              </p>

              <div className="flex items-center justify-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                  alt="CEO VietTech Solutions"
                  className="size-16 rounded-full border-4 border-white/30 object-cover"
                />
                <div className="text-left text-white">
                  <div className="font-semibold">Nguyễn Minh Tuấn</div>
                  <div className="text-sm text-blue-100">CEO - VietTech Solutions</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="bang-gia" className="mb-20 scroll-mt-16">
          <h3 className="mb-4 text-center text-3xl font-bold text-gray-900">Bảng giá linh hoạt</h3>
          <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
            Lựa chọn gói dịch vụ phù hợp với quy mô và nhu cầu của doanh nghiệp bạn
          </p>

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 transition-all duration-300 hover:border-blue-500">
              <div className="mb-6 text-center">
                <h4 className="mb-2 text-xl font-bold text-gray-900">Gói Cơ Bản</h4>
                <p className="mb-4 text-sm text-gray-600">Cho doanh nghiệp nhỏ</p>
                <div className="flex items-end justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900">500.000đ</span>
                  <span className="mb-1 text-gray-600">/tháng</span>
                </div>
              </div>

              <ul className="mb-8 space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">Tối đa 50 người dùng</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">100 cuộc họp/tháng</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">Lưu trữ 10GB</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">Hỗ trợ email</span>
                </li>
              </ul>

              <a
                href="/login"
                className="block w-full rounded-lg border-2 border-blue-600 py-3 text-center font-medium text-blue-600 transition-colors hover:bg-blue-50"
              >
                Bắt đầu dùng thử
              </a>
            </div>

            <div className="relative scale-105 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-white shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-yellow-400 px-4 py-1 text-sm font-medium text-gray-900">
                Phổ biến nhất
              </div>

              <div className="mb-6 text-center">
                <h4 className="mb-2 text-xl font-bold">Gói Chuyên Nghiệp</h4>
                <p className="mb-4 text-sm text-blue-100">Cho doanh nghiệp vừa</p>
                <div className="flex items-end justify-center gap-1">
                  <span className="text-4xl font-bold">1.500.000đ</span>
                  <span className="mb-1 text-blue-100">/tháng</span>
                </div>
              </div>

              <ul className="mb-8 space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-yellow-300" />
                  <span className="text-sm">Tối đa 200 người dùng</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-yellow-300" />
                  <span className="text-sm">Không giới hạn cuộc họp</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-yellow-300" />
                  <span className="text-sm">Lưu trữ 100GB</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-yellow-300" />
                  <span className="text-sm">Hỗ trợ ưu tiên 24/7</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-yellow-300" />
                  <span className="text-sm">Báo cáo nâng cao</span>
                </li>
              </ul>

              <a
                href="/login"
                className="block w-full rounded-lg bg-white py-3 text-center font-medium text-blue-600 transition-colors hover:bg-gray-100"
              >
                Bắt đầu ngay
              </a>
            </div>

            <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 transition-all duration-300 hover:border-blue-500">
              <div className="mb-6 text-center">
                <h4 className="mb-2 text-xl font-bold text-gray-900">Gói Doanh Nghiệp</h4>
                <p className="mb-4 text-sm text-gray-600">Cho tập đoàn lớn</p>
                <div className="flex items-end justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900">Liên hệ</span>
                </div>
              </div>

              <ul className="mb-8 space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">Không giới hạn người dùng</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">Không giới hạn cuộc họp</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">Lưu trữ không giới hạn</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">Hỗ trợ chuyên trách 24/7</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">Tùy chỉnh theo yêu cầu</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">Đào tạo & triển khai</span>
                </li>
              </ul>

              <a
                href="#lien-he"
                className="block w-full rounded-lg border-2 border-blue-600 py-3 text-center font-medium text-blue-600 transition-colors hover:bg-blue-50"
              >
                Liên hệ tư vấn
              </a>
            </div>
          </div>
        </div>

        <div id="lien-he" className="mb-20 scroll-mt-16">
          <h3 className="mb-4 text-center text-3xl font-bold text-gray-900">
            Liên hệ với chúng tôi
          </h3>
          <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
            Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn
          </p>

          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-blue-100 p-3">
                  <Phone className="size-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-gray-900">Điện thoại</h4>
                  <p className="text-gray-600">1900 1234</p>
                  <p className="text-gray-600">(+84) 24 3456 7890</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-blue-100 p-3">
                  <Mail className="size-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">contact@techcorp.vn</p>
                  <p className="text-gray-600">support@techcorp.vn</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-blue-100 p-3">
                  <MapPin className="size-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-gray-900">Địa chỉ</h4>
                  <p className="text-gray-600">Tầng 10, Tòa nhà ABC</p>
                  <p className="text-gray-600">123 Đường XYZ, Quận 1</p>
                  <p className="text-gray-600">Tp. Hồ Chí Minh, Việt Nam</p>
                </div>
              </div>

              <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                <h4 className="mb-2 font-semibold text-gray-900">Giờ làm việc</h4>
                <p className="text-sm text-gray-700">Thứ 2 - Thứ 6: 8:00 - 18:00</p>
                <p className="text-sm text-gray-700">Thứ 7: 8:00 - 12:00</p>
                <p className="text-sm text-gray-700">Chủ nhật: Nghỉ</p>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-gray-200 bg-white p-8">
              <form className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Họ và tên</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="email@company.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="0901234567"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Tin nhắn</label>
                  <textarea
                    rows={4}
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="Nội dung cần tư vấn..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-medium text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:from-blue-700 hover:to-indigo-700"
                >
                  Gửi tin nhắn
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 py-12 text-gray-300">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 p-2">
                  <Building2 className="size-5 text-white" />
                </div>
                <span className="font-bold text-white">TechCorp Vietnam</span>
              </div>
              <p className="text-sm text-gray-400">
                Giải pháp quản lý thông minh cho doanh nghiệp hiện đại
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-white">Sản phẩm</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#tinh-nang" className="transition-colors hover:text-blue-400">
                    Tính năng
                  </a>
                </li>
                <li>
                  <a href="#bang-gia" className="transition-colors hover:text-blue-400">
                    Bảng giá
                  </a>
                </li>
                <li>
                  <a href="#giai-phap" className="transition-colors hover:text-blue-400">
                    Giải pháp
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-white">Công ty</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#trang-chu" className="transition-colors hover:text-blue-400">
                    Về chúng tôi
                  </a>
                </li>
                <li>
                  <a href="#trang-chu" className="transition-colors hover:text-blue-400">
                    Tin tức
                  </a>
                </li>
                <li>
                  <a href="#lien-he" className="transition-colors hover:text-blue-400">
                    Tuyển dụng
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-white">Liên hệ</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Mail className="size-4" />
                  <span>contact@techcorp.vn</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="size-4" />
                  <span>1900 1234</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="size-4" />
                  <span>HN, Việt Nam</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 TechCorp Vietnam. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}