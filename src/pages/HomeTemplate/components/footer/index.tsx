export default function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8">
          {/* Giới thiệu */}
          <div>
            <h2 className="mb-6 text-sm font-bold uppercase">Giới thiệu</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Phương thức hoat động của Airbnb
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Trang tin tức
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Nhà đầu tư
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Airbnb Plus
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Airbnb Luxe
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  HotelTonight
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Airbnb for work
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Nhờ có Host, mọi điều có thể
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Cơ hội nghề nghiệp
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Thư của nhà sáng lập
                </a>
              </li>
            </ul>
          </div>

          {/* Cộng đồng */}
          <div>
            <h2 className="mb-6 text-sm font-bold uppercase">Cộng đồng</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Sự đa dạng và Cảm giác thân thuộc
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Tiện nghi phù hợp cho người khuyết tật
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Đối tác liên kêt Airbnb
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Chổ ở cho tuyến đầu
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Lượt giới thiệu cho khách
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Airbnb.org
                </a>
              </li>
            </ul>
          </div>

          {/* Đón Tiếp Khách */}
          <div>
            <h2 className="mb-6 text-sm font-bold uppercase">Đón Tiếp Khách</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Cho Thuê nhà
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Tổ chứ Trải nghiệm trực tuyến
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Tổ chức trải nghiệm
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Đón tiếp khách có trách nhiệm
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Trung tâm tài nguyên
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Trung tâm cộng đồng
                </a>
              </li>
            </ul>
          </div>

          {/* Hỗ Trợ */}
          <div>
            <h2 className="mb-6 text-sm font-bold uppercase">Hỗ Trợ</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Trung tâm trợ giúp
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Các tùy chọn hủy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Hỗ trợ khu dân cư
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Tin cậy và an toàn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-gray-400 dark:border-gray-700"></div>

        <div className="py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <span className="text-sm">
            © 2025{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Airbnb, Inc
            </a>
            . All Rights Reserved. Quyền riêng tư . Điều khoản . Sơ đồ trang Web
          </span>
          <div className="flex space-x-4">
            {/* Facebook */}
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <span className="sr-only">Facebook page</span>
              {/* SVG icon */}
            </a>
            {/* Discord */}
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <span className="sr-only">Discord community</span>
              {/* SVG icon */}
            </a>
            {/* Twitter */}
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <span className="sr-only">Twitter page</span>
              {/* SVG icon */}
            </a>
            {/* GitHub */}
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <span className="sr-only">GitHub account</span>
              {/* SVG icon */}
            </a>
            {/* Dribbble */}
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <span className="sr-only">Dribbble account</span>
              {/* SVG icon */}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
