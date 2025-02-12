const MobileNavbar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg h-[60px] flex items-center justify-around sm:hidden rounded-t-2xl shadow-top border-t border-slate-100">
      <button className="outline-none border-0 w-16 h-16 rounded-t-full bg-transparent flex items-center justify-center text-black transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-[3px]">
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
      </button>

      <button className="outline-none border-0 w-16 h-16 rounded-t-full bg-transparent flex items-center justify-center text-black transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-[3px]">
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
      </button>

      <button className="outline-none border-0 w-16 h-16 rounded-t-full bg-transparent flex items-center justify-center text-black transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-[3px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
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
      </button>

      <button className="outline-none border-0 w-16 h-16 rounded-t-full bg-transparent flex items-center justify-center text-black transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-[3px]">
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
      </button>

      <button className="outline-none border-0 w-16 h-16 rounded-t-full bg-transparent flex items-center justify-center text-black transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-[3px]">
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
      </button>
    </div>
  );
};

export default MobileNavbar;
