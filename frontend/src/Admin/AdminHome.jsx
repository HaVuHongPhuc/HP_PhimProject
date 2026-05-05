import React, { useState, useEffect } from 'react';

const AdminHome = () => {
  // --- KIỂM TRA QUYỀN TRUY CẬP ---
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    if (!isAdmin) {
      alert("Vui lòng đăng nhập quyền Admin!");
      window.location.href = './adminlogin';
    }
  }, [isAdmin]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdmin');
    window.location.href = '/adminlogin';
  };
  const [tab, setTab] = useState('movies');
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);

  // --- QUẢN LÝ TRẠNG THÁI GIAO DIỆN ---
  const [currentView, setCurrentView] = useState('list'); // 'list' hoặc 'form'
  const [formType, setFormType] = useState(''); // 'movie' hoặc 'admin'
  const [formData, setFormData] = useState({});

  // --- CÁC HÀM LẤY DỮ LIỆU ---
  const fetchData = async () => {
    try {
      if (tab === 'movies') {
        const res = await fetch('https://20252026apidoanphimhk2huflit.havuhongphuc1426.id.vn/movies');
        setMovies(await res.json());
      } else if (tab === 'customers') {
        const res = await fetch('https://apitaikhoan.havuhongphuc1426.id.vn/admin/customers');
        setUsers(await res.json());
      } else if (tab === 'admins') {
        const res = await fetch('https://apitaikhoan.havuhongphuc1426.id.vn/admin/list');
        setAdmins(await res.json());
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => { 
    fetchData(); 
    setCurrentView('list'); // Reset view về list khi đổi tab
  }, [tab]);

  // --- MỞ FORM THÊM/SỬA ---
  const openForm = (type, item = null) => {
    setFormType(type);
    if (item) {
      setFormData(item);
    } else {
      setFormData(type === 'movie' ? { title: '', category: 'Movies anime', videoFile: '', description: '' } : { email: '', password: '' });
    }
    setCurrentView('form');
  };

  // --- XỬ LÝ THAY ĐỔI TRONG FORM ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // --- SUBMIT FORM (Lưu dữ liệu) ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (formType === 'movie') {
      const isEdit = !!formData.id;
      const url = isEdit 
        ? `https://20252026apidoanphimhk2huflit.havuhongphuc1426.id.vn/movies/${formData.id}`
        : 'https://20252026apidoanphimhk2huflit.havuhongphuc1426.id.vn/movies';

      await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: formData.title, 
          videoFile: formData.videoFile, 
          category: formData.category 
        })
      });
    } else if (formType === 'admin') {
      const isEdit = !!formData._id;
      const url = isEdit 
        ? `https://apitaikhoan.havuhongphuc1426.id.vn/admin/update/${formData._id}`
        : 'https://apitaikhoan.havuhongphuc1426.id.vn/admin/add';

      // Chỉ gửi password nếu có nhập (khi thêm mới hoặc muốn đổi mk)
      const bodyData = { email: formData.email };
      if (formData.password) bodyData.password = formData.password;

      await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });
    }

    setCurrentView('list');
    fetchData();
  };

  // --- XÓA DỮ LIỆU ---
  const handleDeleteMovie = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phim này?")) {
      await fetch(`https://20252026apidoanphimhk2huflit.havuhongphuc1426.id.vn/movies/${id}`, { method: 'DELETE' });
      fetchData();
    }
  };

  const handleDeleteAdmin = async (id) => {
    if (window.confirm("Xóa quyền Admin của tài khoản này?")) {
      await fetch(`https://apitaikhoan.havuhongphuc1426.id.vn/admin/delete/${id}`, { method: 'DELETE' });
      fetchData();
    }
  };

  const renderForm = () => {
    const isEdit = formType === 'movie' ? !!formData.id : !!formData._id;
    const formTitle = formType === 'movie' ? (isEdit ? 'CẬP NHẬT PHIM' : 'THÊM PHIM MỚI') : (isEdit ? 'CẬP NHẬT ADMIN' : 'THÊM ADMIN MỚI');
  if (!isAdmin) return null;
    return (
      <div className="animate-fadeIn max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border-t-4 border-yellow-500 overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 uppercase tracking-wide">{formTitle}</h2>
            
            <form onSubmit={handleFormSubmit}>
              {/* Lưới 2 cột cho Phim */}
              {formType === 'movie' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {/* Cột 1 */}
                  <div className="space-y-6">
                    <div className="flex flex-col">
                      <label className="text-sm font-semibold text-gray-600 mb-2">Tiêu đề phim <span className="text-red-500">*</span></label>
                      <input maxLength={255} type="text" name="title" value={formData.title || ''} onChange={handleInputChange} required className="border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-semibold text-gray-600 mb-2">Danh mục <span className="text-red-500">*</span></label>
                      <select name="category" value={formData.category || 'Movies anime'} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
                        <option value="Movies anime">Movies anime</option>
                        <option value="Hành động">Hành động</option>
                        <option value="Tình cảm">Tình cảm</option>
                        <option value="Viễn tưởng">Viễn tưởng</option>
                      </select>
                    </div>
                  </div>

                  {/* Cột 2 */}
                  <div className="space-y-6">
                    <div className="flex flex-col">
                      <label className="text-sm font-semibold text-gray-600 mb-2">Link Video (hoặc Tên file) <span className="text-red-500">*</span></label>
                      <input maxLength={255} type="text" name="videoFile" value={formData.videoFile || ''} onChange={handleInputChange} required className="border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-semibold text-gray-600 mb-2">Mô tả / Thông tin thêm</label>
                      <textarea maxLength={255} name="description" value={formData.description || ''} onChange={handleInputChange} rows="3" className="border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"></textarea>
                    </div>
                  </div>
                </div>
              )}

              {/* Lưới cho Admin */}
              {formType === 'admin' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600 mb-2">Email <span className="text-red-500">*</span></label>
                    <input maxLength={255} type="email" name="email" value={formData.email || ''} onChange={handleInputChange} required className="border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600 mb-2">Mật khẩu {isEdit && <span className="text-gray-400 font-normal">(để trống nếu không đổi)</span>} {!isEdit && <span className="text-red-500">*</span>}</label>
                    <input maxLength={255} type="password" name="password" value={formData.password || ''} onChange={handleInputChange} required={!isEdit} className="border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                </div>
              )}

              {/* Khu vực Nút bấm */}
              <div className="flex justify-end items-center mt-10 pt-6 border-t border-gray-100 space-x-4">
                <button type="button" onClick={() => setCurrentView('list')} className="text-gray-500 hover:text-gray-800 font-medium transition">
                  Quay lại danh sách
                </button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md font-semibold shadow-md transition">
                  {isEdit ? 'Lưu Cập Nhật' : 'Lưu Dữ Liệu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-6 shadow-xl flex-shrink-0">
        <h2 className="text-2xl font-black mb-10 text-blue-400 tracking-wider">ADMIN HUB</h2>
        <nav className="space-y-2">
          <button onClick={() => setTab('movies')} className={`w-full text-left p-3 rounded-lg transition ${tab === 'movies' ? 'bg-blue-600 shadow-lg' : 'hover:bg-gray-700'}`}>Quản lý phim</button>
          <button onClick={() => setTab('customers')} className={`w-full text-left p-3 rounded-lg transition ${tab === 'customers' ? 'bg-blue-600 shadow-lg' : 'hover:bg-gray-700'}`}>Khách hàng</button>
          <button onClick={() => setTab('admins')} className={`w-full text-left p-3 rounded-lg transition ${tab === 'admins' ? 'bg-blue-600 shadow-lg' : 'hover:bg-gray-700'}`}>Quản lý Admin</button>
        </nav>
                <button 
          onClick={handleLogout}
          className="w-full bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white p-3 rounded-lg transition font-bold text-sm border border-red-600/30"
        >
          ĐĂNG XUẤT
        </button>
      </div>
      

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        
        {/* NẾU ĐANG Ở CHẾ ĐỘ HIỂN THỊ FORM */}
        {currentView === 'form' && renderForm()}

        {/* NẾU ĐANG Ở CHẾ ĐỘ HIỂN THỊ DANH SÁCH */}
        {currentView === 'list' && (
          <div className="animate-fadeIn">
            {/* Tab Phim */}
            {tab === 'movies' && (
              <>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Danh mục Phim</h1>
                    <button onClick={() => openForm('movie')} className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-full font-semibold shadow-md transition">+ Thêm phim</button>
                </div>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Tiêu đề</th>
                            <th className="p-4 font-semibold text-gray-600">Thể loại</th>
                            <th className="p-4 font-semibold text-gray-600">Video File</th>
                            <th className="p-4 font-semibold text-gray-600">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map(m => (
                        <tr key={m.id} className="border-b hover:bg-gray-50 transition">
                            <td className="p-4 font-medium">{m.title}</td>
                            <td className="p-4 text-gray-600">{m.category}</td>
                            <td className="p-4 text-gray-500 text-sm max-w-xs truncate">{m.videoFile}</td>
                            <td className="p-4 space-x-4">
                              <button onClick={() => openForm('movie', m)} className="text-blue-600 hover:text-blue-800 font-medium">Sửa</button>
                              <button onClick={() => handleDeleteMovie(m.id)} className="text-red-500 hover:text-red-700 font-medium">Xóa</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
              </>
            )}

            {/* Tab Khách hàng (Chỉ xem) */}
            {tab === 'customers' && (
              <>
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Khách hàng</h1>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Email</th>
                            <th className="p-4 font-semibold text-gray-600">Ngày sinh</th>
                            <th className="p-4 font-semibold text-gray-600">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                        <tr key={u._id} className="border-b hover:bg-gray-50 transition">
                            <td className="p-4 font-medium">{u.email}</td>
                            <td className="p-4 text-gray-500">{u.birthDate || 'Chưa cập nhật'}</td>
                            <td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Active</span></td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
              </>
            )}

            {/* Tab Admin */}
            {tab === 'admins' && (
              <>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Admin</h1>
                    <button onClick={() => openForm('admin')} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold shadow-md transition">+ Cấp quyền Admin</button>
                </div>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Email Admin</th>
                            <th className="p-4 font-semibold text-gray-600">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map(a => (
                        <tr key={a._id} className="border-b hover:bg-gray-50 transition">
                            <td className="p-4 font-medium">{a.email}</td>
                            <td className="p-4 space-x-4">
                              <button onClick={() => openForm('admin', a)} className="text-blue-600 hover:text-blue-800 font-medium">Sửa</button>
                              <button onClick={() => handleDeleteAdmin(a._id)} className="text-red-500 hover:text-red-700 font-medium">Xóa quyền</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;