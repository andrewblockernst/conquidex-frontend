export const GoogleIcon = ({ className = "w-5 h-5 me-2 -ms-1" }) => {
  return (
    <svg className={className} width="30" height="30" viewBox="0 0 50 50">
      <path
        fill="#fbc02d"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
      <path
        fill="#e53935"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      ></path>
      <path
        fill="#4caf50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      ></path>
      <path
        fill="#1565c0"
        d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
    </svg>
  );
};

export const CautionIcon = ({ className = "w-5 h-5 me-2 -ms-1" }) => {
  return (
    <svg
      fill="#fff4b8"
      width="80px"
      height="80px"
      viewBox="-2 -2 12 24 "
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin"
      className={className}
    >
      <path d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-13a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1zm0 10a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
    </svg>
  );
};

export const HamburgerIcon = ({ className = "w-5 h-5 me-2 -ms-1" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 50 50"
      className={className}
    >
      <path
        fill="#ffffff"
        d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"
      ></path>
    </svg>
  );
};

export const CloseIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export const SettingsIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    className="lucide lucide-settings"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const SupportIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="25"
    height="25"
    viewBox="0 0 32 32"
    fill="#ffffff"
  >
    <path d="M 21 3 C 16.570313 3 13 6.570313 13 11 C 13 11.234375 13.035156 11.554688 13.0625 11.84375 L 4.5 20.40625 C 2.53125 22.375 2.53125 25.53125 4.5 27.5 C 6.46875 29.46875 9.625 29.46875 11.59375 27.5 L 20.15625 18.9375 C 20.445313 18.964844 20.765625 19 21 19 C 25.429688 19 29 15.429688 29 11 C 29 9.632813 28.648438 8.367188 28.0625 7.3125 L 27.4375 6.15625 L 26.5 7.09375 L 22.1875 11.375 L 20.625 9.8125 L 24.90625 5.5 L 25.84375 4.5625 L 24.6875 3.9375 C 23.632813 3.351563 22.367188 3 21 3 Z M 21 5 C 21.484375 5 21.847656 5.207031 22.28125 5.3125 L 17.78125 9.8125 L 18.5 10.5 L 21.5 13.5 L 22.1875 14.21875 L 26.6875 9.71875 C 26.792969 10.152344 27 10.515625 27 11 C 27 14.371094 24.371094 17 21 17 C 20.601563 17 20.277344 17 20.03125 16.9375 L 19.5 16.78125 L 10.1875 26.09375 C 8.957031 27.324219 7.136719 27.324219 5.90625 26.09375 L 5.875 26.0625 C 4.675781 24.832031 4.683594 23.035156 5.90625 21.8125 L 15.21875 12.5 L 15.0625 11.96875 C 15 11.722656 15 11.398438 15 11 C 15 7.628906 17.628906 5 21 5 Z"></path>
  </svg>
);

export const TentIcon = ({ className }: { className: string }) => (
  <svg
    className="w-8 h-8 text-black"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="none"
    viewBox="0 0 48 48"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21.2591 8.34938C21.7192 8.04377 22.3398 8.16895 22.6454 8.62898L24 10.668L25.3545 8.62898C25.6601 8.16895 26.2808 8.04377 26.7408 8.34938C27.2009 8.65499 27.326 9.27565 27.0204 9.73568L25.2005 12.4751L27.0204 15.2146C27.021 15.2155 27.0216 15.2163 27.0221 15.2172L42.3329 38.2643C42.6385 38.7243 42.5134 39.345 42.0533 39.6506C41.5933 39.9562 40.9726 39.831 40.667 39.371L38.125 35.5445V38.2177C38.125 39.1013 37.4086 39.8177 36.525 39.8177H11.475C10.5913 39.8177 9.87499 39.1013 9.87499 38.2177V35.5445L7.33293 39.371C7.02733 39.831 6.40666 39.9562 5.94664 39.6506C5.48661 39.345 5.36143 38.7243 5.66704 38.2643L20.9776 15.2175C20.9783 15.2165 20.9789 15.2156 20.9795 15.2146L22.7994 12.4751L20.9795 9.73568C20.6739 9.27565 20.7991 8.65499 21.2591 8.34938ZM24 14.2823L11.875 32.5339V37.8177H36.125V32.5339L24 14.2823Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M24 26.1394C24.4514 26.1394 24.8468 26.4418 24.9651 26.8774L28.4783 39.8176H19.5218L23.035 26.8774C23.1532 26.4418 23.5487 26.1394 24 26.1394Z"
    />
  </svg>
);

export const AttendanceIcon = ({ className }: { className: string }) => (
  <svg
    className="w-8 h-8 text-black"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"
    />
  </svg>
);

export const AddIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/20000/svg"
    width="32"
    height="32"
    viewBox="0 0 67.733 67.733"
    id="add"
  >
    <path
      d="M18.094 231.519c-8.73 0-15.841 7.112-15.841 15.842v31.545c0 8.73 7.11 15.842 15.841 15.842h31.545c8.73 0 15.842-7.112 15.842-15.842V247.36c0-8.73-7.112-15.842-15.842-15.842zm0 5.293h31.545c5.89 0 10.55 4.659 10.55 10.549v31.545c0 5.89-4.66 10.548-10.55 10.548H18.094c-5.89 0-10.549-4.658-10.549-10.548V247.36c0-5.89 4.659-10.549 10.549-10.549zm16.395 8.068a2.646 2.646 0 0 0-2.608 2.682v12.752h-12.75a2.646 2.646 0 1 0 0 5.29h12.75v12.75a2.647 2.647 0 1 0 5.293 0v-12.75h12.75a2.646 2.646 0 1 0 0-5.29h-12.75v-12.752a2.646 2.646 0 0 0-2.685-2.682z"
      fill="#000"
      color="#000"
      overflow="visible"
      transform="translate(0 -229.267)"
    ></path>
  </svg>
);

export const CalendarIcon = ({ className }: { className: string }) => (
  <svg
    className="w-8 h-8 text-black"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
    />
  </svg>
);

export const InfoClubIcon = ({ className }: { className: string }) => (
  <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 24 24"
          >
            <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 9 L 13 9 L 13 7 L 11 7 z M 11 11 L 11 17 L 13 17 L 13 11 L 11 11 z"></path>
          </svg>
);

export const ProfileIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 20 20"
    id="profile"
  >
    <g id="Page-1" fill="none">
      <g
        id="Dribbble-Light-Preview"
        fill="#000"
        transform="translate(-380 -2159)"
      >
        <g id="icons" transform="translate(56 160)">
          <path
            id="profile-[#1336]"
            d="M334 2011c3.785 0 6.958 2.214 7.784 6h-15.568c.826-3.786 3.999-6 7.784-6m-4-6c0-2.206 1.794-4 4-4s4 1.794 4 4-1.794 4-4 4-4-1.794-4-4m7.758 4.673A5.983 5.983 0 0 0 340 2005a6 6 0 1 0-9.758 4.673c-3.659 1.375-6.242 4.772-6.242 9.327h20c0-4.555-2.583-7.952-6.242-9.327"
          ></path>
        </g>
      </g>
    </g>
  </svg>
);

//ICONOS EN BLANCO
export const SettingsIconWhite = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ffffff"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-settings"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const SupportIconWhite = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="25"
    height="25"
    viewBox="0 0 32 32"
    fill="#ffffff"
  >
    <path d="M 21 3 C 16.570313 3 13 6.570313 13 11 C 13 11.234375 13.035156 11.554688 13.0625 11.84375 L 4.5 20.40625 C 2.53125 22.375 2.53125 25.53125 4.5 27.5 C 6.46875 29.46875 9.625 29.46875 11.59375 27.5 L 20.15625 18.9375 C 20.445313 18.964844 20.765625 19 21 19 C 25.429688 19 29 15.429688 29 11 C 29 9.632813 28.648438 8.367188 28.0625 7.3125 L 27.4375 6.15625 L 26.5 7.09375 L 22.1875 11.375 L 20.625 9.8125 L 24.90625 5.5 L 25.84375 4.5625 L 24.6875 3.9375 C 23.632813 3.351563 22.367188 3 21 3 Z"></path>
  </svg>
);

export const TentIconWhite = ({ className }: { className: string }) => (
  <svg
    className={`w-8 h-8 text-white ${className}`}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="none"
    viewBox="0 0 48 48"
  >
    <path
      stroke="#ffffff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21.2591 8.34938C21.7192 8.04377 22.3398 8.16895 22.6454 8.62898L24 10.668L25.3545 8.62898C25.6601 8.16895 26.2808 8.04377 26.7408 8.34938C27.2009 8.65499 27.326 9.27565 27.0204 9.73568L25.2005 12.4751L27.0204 15.2146C27.021 15.2155 27.0216 15.2163 27.0221 15.2172L42.3329 38.2643C42.6385 38.7243 42.5134 39.345 42.0533 39.6506C41.5933 39.9562 40.9726 39.831 40.667 39.371L38.125 35.5445V38.2177C38.125 39.1013 37.4086 39.8177 36.525 39.8177H11.475C10.5913 39.8177 9.87499 39.1013 9.87499 38.2177V35.5445L7.33293 39.371C7.02733 39.831 6.40666 39.9562 5.94664 39.6506C5.48661 39.345 5.36143 38.7243 5.66704 38.2643L20.9776 15.2175C20.9783 15.2165 20.9789 15.2156 20.9795 15.2146L22.7994 12.4751L20.9795 9.73568C20.6739 9.27565 20.7991 8.65499 21.2591 8.34938ZM24 14.2823L11.875 32.5339V37.8177H36.125V32.5339L24 14.2823Z"
    />
    <path
      stroke="#ffffff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M24 26.1394C24.4514 26.1394 24.8468 26.4418 24.9651 26.8774L28.4783 39.8176H19.5218L23.035 26.8774C23.1532 26.4418 23.5487 26.1394 24 26.1394Z"
    />
  </svg>
);

export const AttendanceIconWhite = ({ className }: { className: string }) => (
  <svg
    className={`w-8 h-8 text-white ${className}`}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="#ffffff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"
    />
  </svg>
);

export const AddIconWhite = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/20000/svg"
    width="32"
    height="32"
    viewBox="0 0 67.733 67.733"
    id="add"
  >
    <path
      d="M18.094 231.519c-8.73 0-15.841 7.112-15.841 15.842v31.545c0 8.73 7.11 15.842 15.841 15.842h31.545c8.73 0 15.842-7.112 15.842-15.842V247.36c0-8.73-7.112-15.842-15.842-15.842zm0 5.293h31.545c5.89 0 10.55 4.659 10.55 10.549v31.545c0 5.89-4.66 10.548-10.55 10.548H18.094c-5.89 0-10.549-4.658-10.549-10.548V247.36c0-5.89 4.659-10.549 10.549-10.549zm16.395 8.068a2.646 2.646 0 0 0-2.608 2.682v12.752h-12.75a2.646 2.646 0 1 0 0 5.29h12.75v12.75a2.647 2.647 0 1 0 5.293 0v-12.75h12.75a2.646 2.646 0 1 0 0-5.29h-12.75v-12.752a2.646 2.646 0 0 0-2.685-2.682z"
      fill="#ffffff"
      color="#ffffff"
      overflow="visible"
      transform="translate(0 -229.267)"
    ></path>
  </svg>
);

export const CalendarIconWhite = ({ className }: { className: string }) => (
  <svg
    className={`w-8 h-8 text-white ${className}`}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="#ffffff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
    />
  </svg>
);

export const InfoClubIconWhite = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="100"
    height="100"
    viewBox="0 0 24 24"
    fill="#ffffff"
  >
    <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 9 L 13 9 L 13 7 L 11 7 z M 11 11 L 11 17 L 13 17 L 13 11 L 11 11 z"></path>
  </svg>
);

export const ProfileIconWhite = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 20 20"
    id="profile"
  >
    <g id="Page-1" fill="none">
      <g
        id="Dribbble-Light-Preview"
        fill="#ffffff"
        transform="translate(-380 -2159)"
      >
        <g id="icons" transform="translate(56 160)">
          <path
            id="profile-[#1336]"
            d="M334 2011c3.785 0 6.958 2.214 7.784 6h-15.568c.826-3.786 3.999-6 7.784-6m-4-6c0-2.206 1.794-4 4-4s4 1.794 4 4-1.794 4-4 4-4-1.794-4-4m7.758 4.673A5.983 5.983 0 0 0 340 2005a6 6 0 1 0-9.758 4.673c-3.659 1.375-6.242 4.772-6.242 9.327h20c0-4.555-2.583-7.952-6.242-9.327"
          ></path>
        </g>
      </g>
    </g>
  </svg>
);