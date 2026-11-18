# BC87 React TypeScript · Đặt phòng demo

Chạy ứng dụng bằng Node.js 20.19+ hoặc 22.12+.

```bash
npm ci
npm run dev
```

| Luồng | Tài khoản | Mật khẩu demo |
| --- | --- | --- |
| Khách tại trang chủ | `guest@example.com` | `Demo1234!` |
| Quản trị tại `/auth` | `admin@example.com` | `Demo1234!` |

Dữ liệu mẫu nằm trong `src/services/demo-data.json`. Thao tác trên ứng dụng được
lưu bằng `localStorage` theo trình duyệt và địa chỉ chạy ứng dụng. Để khôi phục
dữ liệu mẫu, xóa khóa `airbnb-demo-db-v1` và các khóa phiên `userLogin`,
`ADMIN_INFO` trong DevTools rồi tải lại trang. Demo dùng tài khoản giả lập và
chỉ phù hợp với dữ liệu thử nghiệm.

Trang tổng quan quản trị đọc phòng, vị trí, tài khoản và lượt đặt từ cùng
nguồn dữ liệu với các trang quản lý. Bảng lượt đặt mới nhất hiển thị theo mã
đặt phòng giảm dần. Dữ liệu mẫu ban đầu chưa có lượt đặt, bạn có thể thêm một
lượt tại `/admin/booking` để xem tổng quan cập nhật.

`npm run build` kiểm tra TypeScript và tạo bản phát hành trong `dist/`.
Khi triển khai, cấu hình máy chủ trả về `index.html` cho các đường dẫn của SPA
như `/room/1` và `/admin/booking`.

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
