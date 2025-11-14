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
  const data = useSelector((state: RootState) => state.authReducer.data);
  const dispatch = useDispatch<AppDispatch>();

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  if (data) {
    return <Navigate to={"/admin/dashboard"} />;
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
    <>
      {error && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {error?.response?.data.content}
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Email
          </label>
          <input
            onChange={handleOnChange}
            name="email"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Password
          </label>
          <input
            onChange={handleOnChange}
            name="password"
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
}
