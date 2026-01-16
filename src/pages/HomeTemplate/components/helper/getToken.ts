export const getToken = (): string => {
  try {
    const user = localStorage.getItem("userLogin") ?? sessionStorage.getItem("userLogin");
    return user ? JSON.parse(user)?.token ?? "" : "";
  } catch {
    return "";
  }
};