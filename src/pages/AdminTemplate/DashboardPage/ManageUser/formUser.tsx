import React, { useState, useEffect } from 'react';

interface FormData {
  email: string;
  password: string;
  name: string;
  phone: string;
  birthday: string;
  gender: string;
  role: string;
}

interface FormErrors {
  [key: string]: string;
}

interface FormUserProps {
  initialData?: Partial<FormData>;
  isEdit?: boolean;
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const FormUser: React.FC<FormUserProps> = ({
  initialData,
  isEdit = false,
  onSubmit,
  onCancel,
  loading = false
}) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
    phone: '',
    birthday: '',
    gender: '',
    role: 'USER'
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData
      }));
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!isEdit && !formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (!formData.name) {
      newErrors.name = 'Họ tên là bắt buộc';
    }

    if (!formData.phone) {
      newErrors.phone = 'Số điện thoại là bắt buộc';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    if (!formData.gender) {
      newErrors.gender = 'Vui lòng chọn giới tính';
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    await onSubmit(formData);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`bg-gray-50 border ${
              formErrors.email ? 'border-red-500' : 'border-gray-300'
            } text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5`}
            placeholder="example@email.com"
          />
          {formErrors.email && (
            <p className="mt-2 text-sm text-red-600">{formErrors.email}</p>
          )}
        </div>

        {/* Password - Only show if not edit mode */}
        {!isEdit && (
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              Mật khẩu <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`bg-gray-50 border ${
                formErrors.password ? 'border-red-500' : 'border-gray-300'
              } text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5`}
              placeholder="••••••••"
            />
            {formErrors.password && (
              <p className="mt-2 text-sm text-red-600">{formErrors.password}</p>
            )}
          </div>
        )}

        {/* Name */}
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
            Họ và tên <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`bg-gray-50 border ${
              formErrors.name ? 'border-red-500' : 'border-gray-300'
            } text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5`}
            placeholder="Nguyễn Văn A"
          />
          {formErrors.name && (
            <p className="mt-2 text-sm text-red-600">{formErrors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
            Số điện thoại <span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`bg-gray-50 border ${
              formErrors.phone ? 'border-red-500' : 'border-gray-300'
            } text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5`}
            placeholder="0912345678"
          />
          {formErrors.phone && (
            <p className="mt-2 text-sm text-red-600">{formErrors.phone}</p>
          )}
        </div>

        {/* Birthday */}
        <div>
          <label htmlFor="birthday" className="block mb-2 text-sm font-medium text-gray-900">
            Ngày sinh
          </label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5"
          />
        </div>

        {/* Gender */}
        <div>
          <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">
            Giới tính <span className="text-red-600">*</span>
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`bg-gray-50 border ${
              formErrors.gender ? 'border-red-500' : 'border-gray-300'
            } text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5`}
          >
            <option value="">Chọn giới tính</option>
            <option value="true">Nam</option>
            <option value="false">Nữ</option>
          </select>
          {formErrors.gender && (
            <p className="mt-2 text-sm text-red-600">{formErrors.gender}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900">
            Vai trò
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5"
          >
            <option value="USER">Người dùng</option>
            <option value="ADMIN">Quản trị viên</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t">
        <button
          onClick={onCancel}
          disabled={loading}
          className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-50"
        >
          Hủy
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="text-white bg-rose-600 hover:bg-rose-700 font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-50 inline-flex items-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Đang xử lý...
            </>
          ) : (
            isEdit ? 'Cập nhật' : 'Thêm người dùng'
          )}
        </button>
      </div>
    </div>
  );
};

export default FormUser;