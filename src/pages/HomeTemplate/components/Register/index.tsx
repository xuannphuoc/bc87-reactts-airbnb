import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { resetAuthState, SignUp } from "./register";
import { type AppDispatch, type RootState } from "@/store";
import { type Account, type StateInitial } from "./register";
import { useForm } from "react-hook-form";

const registerSchema = z.object({
  name: z.string().min(1, "Họ tên không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  password: z
    .string()
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .regex(/[A-Z]/, "Phải có chữ hoa")
    .regex(/[a-z]/, "Phải có chữ thường")
    .regex(/\d/, "Phải có số")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Phải có ký tự đặc biệt"),
  phone: z.string().regex(/^(03|05|07|08|09)[0-9]{8}$/, "SĐT không hợp lệ"),
  birthday: z
    .string()
    .regex(
      /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[0-2])[\/]\d{4}$/,
      "Ngày sinh dd/mm/yyyy"
    ),
  gender: z.enum(["Nam", "Nu"], {
    message: "Vui lòng chọn giới tính",
  }),
});

/* ================= COMPONENT ================= */

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector<RootState>(
    (state) => state.SignUpReducer
  ) as StateInitial;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  /* ================= SUBMIT ================= */

  const onSubmit = (formData: any) => {
    const payload: Account = {
      ...formData,
      gender: formData.gender === "Nam" ? true : false,
      role: "USER",
    };

    dispatch(SignUp(payload));
  };

  /* ================= EFFECT ================= */

  useEffect(() => {
    if (data) {
      toast.success("Đăng ký thành công, mời bạn đăng nhập! 🎉");

      document.getElementById("close-register-modal")?.click();
      document.getElementById("open-login-modal")?.click();
      dispatch(resetAuthState());
    }

    if (error) {
      toast.error(error);
      dispatch(resetAuthState());
    }
  }, [data, error]);

  /* ================= UI ================= */

  return (
    <div
      id="crypto-modal"
      className="hidden fixed inset-0 z-50 flex justify-center pt-24"
    >
      <button type="button" id="close-register-modal" data-modal-hide="crypto-modal" hidden />
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6">
        <h3 className="text-xl font-semibold text-center mb-6">
          {loading ? "Đang đăng ký..." : "Đăng ký tài khoản"}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Họ tên"
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Email"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="Mật khẩu"
            type="password"
            error={errors.password?.message}
            {...register("password")}
          />
          <Input
            label="Số điện thoại"
            error={errors.phone?.message}
            {...register("phone")}
          />
          <Input
            label="Ngày sinh (dd/mm/yyyy)"
            error={errors.birthday?.message}
            {...register("birthday")}
          />

          <div>
            <select
              {...register("gender")}
              className="w-full border-b border-gray-300 py-2 outline-none"
            >
              <option value="">Giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nu">Nữ</option>
            </select>
            {errors.gender && (
              <p className="text-xs text-red-500 mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          <button
            disabled={loading}
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 disabled:opacity-50"
          >
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ================= INPUT COMPONENT ================= */

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

function Input({ label, error, ...props }: InputProps) {
  return (
    <div>
      <input
        {...props}
        placeholder={label}
        className="w-full border-b border-gray-300 py-2 outline-none focus:border-pink-500"
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
