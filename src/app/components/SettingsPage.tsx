export function SettingsPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Cài đặt</h2>
      <div className="grid gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Thông tin tài khoản</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Nhập họ và tên"
                defaultValue="Quản Trị Viên"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Nhập email"
                defaultValue="admin@company.com"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Thông báo</h3>
          <div className="space-y-3">
            {[
              { label: 'Nhận thông báo email về cuộc họp mới', checked: true },
              { label: 'Nhắc nhở trước cuộc họp 30 phút', checked: true },
              { label: 'Thông báo khi có thay đổi lịch họp', checked: false },
            ].map((item, index) => (
              <label key={index} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={item.checked}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Giao diện</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ngôn ngữ</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                <option>Tiếng Việt</option>
                <option>English</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Định dạng ngày</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Hủy
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}
