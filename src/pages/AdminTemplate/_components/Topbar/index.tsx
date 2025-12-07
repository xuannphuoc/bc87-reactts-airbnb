export default function Topbar() {
  return (
    <div
      style={{
        height: 60,
        borderBottom: "1px solid #eee",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        fontWeight: 600,
      }}
    >
      Admin Dashboard
      <div className="flex items-center">
        <div className="flex items-center ms-3">
          <div>
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              aria-expanded="false"
              data-dropdown-toggle="dropdown-user"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="user photo"
              />
            </button>
          </div>
          <div
            className="z-50 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44"
            id="dropdown-user"
          >
            <div
              className="px-4 py-3 border-b border-default-medium"
              role="none"
            >
              <p className="text-sm font-medium text-heading" role="none">
                Neil Sims
              </p>
              <p className="text-sm text-body truncate" role="none">
                neil.sims@flowbite.com
              </p>
            </div>
            <ul className="p-2 text-sm text-body font-medium" role="none">
              
              <li>
                <a
                  href="#"
                  className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                  role="menuitem"
                >
                  Settings
                </a>
              </li>
              
              <li>
                <a
                  href="#"
                  className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                  role="menuitem"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
