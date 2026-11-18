import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../../store";
import { authenLogin } from "./slice";

export interface User {
  email: string;
  password: string;
}

export default function AuthPage() {
  const error = useSelector((state: RootState) => state.authReducer.error);
  const { data, loading } = useSelector(
    (state: RootState) => state.authReducer,
  );
  const dispatch = useDispatch<AppDispatch>();

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  if (data) {
    return <Navigate to={"/admin"} />;
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(authenLogin(user));
  };

  return (
    <main className="admin-auth grid min-h-dvh place-items-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="admin-panel w-full max-w-sm p-6 sm:p-8"
      >
        <h1 className="text-2xl font-bold tracking-tight">
          Đăng nhập quản trị
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Dùng tài khoản quản trị để truy cập.
        </p>
        {error && (
          <p
            role="alert"
            className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800"
          >
            {error.response?.data.content ?? "Đăng nhập thất bại."}
          </p>
        )}
        <div className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="admin-email"
              className="mb-1.5 block text-sm font-medium"
            >
              Email
            </label>
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="username"
              required
              value={user.email}
              onChange={handleOnChange}
              className="w-full px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="admin-password"
              className="mb-1.5 block text-sm font-medium"
            >
              Mật khẩu
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={user.password}
              onChange={handleOnChange}
              className="w-full px-3 py-2.5 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="admin-primary w-full"
          >
            {loading ? "Đang đăng nhập…" : "Đăng nhập"}
          </button>
        </div>
      </form>
    </main>
  );
}
