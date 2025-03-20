/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { CgMenuGridO } from 'react-icons/cg';
import {
  FaBook,
  FaCogs,
  FaDownload,
  FaHome,
  FaPen,
  FaPhone,
  FaQuran,
  FaUser,
} from 'react-icons/fa';
import { MdForum, MdOutlineLanguage } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';
import { Link, NavLink } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import SearchPopup from './Pages/Quran/SearchPopup';

function Header() {
  // audio
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);

      audioRef.current.onended = () => setIsPlaying(false);
    }
  };

  const [showHeader, setShowHeader] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => setOpenMenu(!openMenu);

  const [ShowSearchPopup, setShowSearchPopup] = useState(false);

  //  header functionality
  // const [lastScrollY, setLastScrollY] = useState(0);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;
  //     if (currentScrollY < 30) {
  //       setShowHeader(true);
  //     } else if (currentScrollY > lastScrollY) {
  //       setShowHeader(false);
  //     } else {
  //       setShowHeader(true);
  //     }

  //     setLastScrollY(currentScrollY);
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [lastScrollY]);

  const handleCloseOnClick = () => {
    setOpenMenu(false);
  };

  useEffect(() => {
    // Disable scrolling on the body when the menu is open
    if (openMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openMenu]);

  const Navlinks = [
    {
      path: '/',
      label: 'Home',
      icon: <FaHome />,
    },
    {
      path: '/Quran',
      label: 'All About the Quran',
      icon: <FaQuran />,
    },
    {
      path: '/QuestionList',
      label: 'Question&Answer',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 3h18v14H5l-4 4V3z" />
          <path d="M7 9h6" />
          <path d="M7 13h4" />
          <circle cx="18" cy="18" r="3" />
          <path d="M17 21v-2a1 1 0 0 1 2 0v2" />
        </svg>
      ),
    },

    {
      path: '/ForumComponent',
      label: 'ForumComponent',
      icon: <MdForum />,
    },
    {
      path: '/Services',
      label: 'Services',
      icon: <FaCogs />,
    },
    {
      path: '/Courses',
      label: 'Courses',
      icon: <FaBook />,
    },
    {
      path: '/Download',
      label: 'Download',
      icon: <FaDownload />,
    },
    {
      path: '/Blog',
      label: 'Blog',
      icon: <FaPen />,
    },
    {
      path: '/Contact',
      label: 'Contact',
      icon: <FaPhone />,
    },
    {
      path: '/Contact',
      label: 'Connect Us',
      icon: <FaPhone />,
    },
    {
      path: '/Contact',
      label: 'Navigation',
      icon: <FaPhone />,
    },
    {
      path: '/Blog',
      label: 'Help',
      icon: <FaPen />,
    },
    {
      path: '/Layout',
      label: 'Laout',
      icon: <FaPen />,
    },
  ];
  return (
    <header
      className={`w-full z-[99999999] transition-transform duration-500  ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      }
      fixed top-0`}
    >
      {/* Top Bar */}
      {/* <div className="flex flex-col md:flex-row justify-between items-center px-3 py-2 border-b border-gray-300">
        <h1 className="text-md text-center maven md:text-left font-semibold">
          Feb 6, 2025 / Shaban 7, 1446 (Thu)
        </h1>
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-5 mt-2 md:mt-0">
          <FaFacebookF className="cursor-pointer text-xl hover:text-blue-600" />
          <FaYoutube className="cursor-pointer text-xl hover:text-red-600" />
          <FaTwitter className="cursor-pointer text-xl hover:text-blue-400" />
          <RiInstagramFill className="cursor-pointer text-xl hover:text-pink-500" />
          <AiFillTikTok className="cursor-pointer text-xl hover:text-black " />

          <button
            onClick={toggleTheme}
            className="p-[5px] rounded-full ml-10 bg-gray-200 hover:bg-gray-300 transition"
          >
            {darkMode ? (
              <FaSun className="text-yellow-500" />
            ) : (
              <FaMoon className="text-gray-800" />
            )}
          </button>
        </div>
      </div> */}

      {/* Navbar */}
      <nav
        className={`px-4 shadow-[#1F2A30] shadow-xl md:px-7 py-3 flex justify-between bg-[#1F2A30] border-b-1 border-[#25414f]`}
      >
        <div className="flex md:gap-5 gap-3 items-center">
          <CgMenuGridO
            className="text-3xl cursor-pointer outline-none active:scale-90 active:text-[#2BA4AB] transition-all duration-100 transform"
            data-tooltip-id="menuBar-tooltip"
            onClick={toggleMenu}
          />
          <h1 className="text-2xl md:text-3xl font-bold maven">
            <span
              data-tooltip-id="Logo-toolpit"
              onClick={playAudio}
              className="cursor-pointer"
            >
              🌙 DeepIslam
            </span>
          </h1>
        </div>
        {/* WelComming Audio on Click of logo*/}
        <div className="relative left-[5.2rem] -top-[2.9rem]">
          <audio ref={audioRef}>
            <source src="/DeepIslam.mp3" type="audio/mpeg" />
          </audio>
        </div>
        <div className="flex md:gap-5 gap-3 items-center">
          <div className="flex items-center gap-2 cursor-pointer ml-10">
            <Link to={'/Login'}>
              <FaUser
                className="active:scale-90 active:text-[#2BA4AB] transition-all duration-100 transform text-[23px] md:text-xl cursor-pointer outline-none"
                data-tooltip-id="login"
              />
            </Link>
          </div>

          <MdOutlineLanguage
            className="active:scale-90 active:text-[#2BA4AB] transition-all duration-100 transform text-[23px] md:text-2xl cursor-pointer outline-none"
            data-tooltip-id="language-tooltip"
          />

          <Link to={'/ForumComponent'}>
            <MdForum
              className="active:scale-90 active:text-[#2BA4AB] transition-all duration-100 transform text-[23px] md:text-2xl cursor-pointer outline-none"
              data-tooltip-id="search-tooltip"
            />
          </Link>
          <Link to={'/QuestionList'}>
            <svg
              className="active:scale-90 active:text-[#2BA4AB] transition-all duration-100 transform"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3h18v14H5l-4 4V3z" />
              <path d="M7 9h6" />
              <path d="M7 13h4" />
              <circle cx="18" cy="18" r="3" />
              <path d="M17 21v-2a1 1 0 0 1 2 0v2" />
            </svg>
          </Link>
        </div>
        {/* Toolpit */}
        <Tooltip
          id="Logo-toolpit"
          place="right"
          content="Click Me"
          style={{
            backgroundColor: 'burlywood',
            color: 'white',
            fontSize: '10px',
            padding: '5px 12px',
            borderRadius: '6px',
          }}
        />
      </nav>

      {/* navbar */}
      <ul
        className={` sidebar ${
          openMenu ? 'active' : ''
        } z-50 fixed overflow-y-scroll shrink-0 flex flex-col shadow-2xl shadow-grey-500 pb-48 h-[100vh] top-0 left-0 bg-[#1F2A30] transition-all duration-30`}
      >
        <div
          className="fixed top-0 left-[19.2rem] h-screen w-3  border-[#24414F] border-x-[.1px] col-start-4 row-span-5 row-start-1
  bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)]
  bg-[size:10px_10px] bg-fixed
  [--pattern-fg:var(--color-gray-950)]/5
  max-lg:hidden
  dark:[--pattern-fg:var(--color-white)]/10"
        ></div>

        <div className="sticky z-10 top-0 border-b-[1px] border-[#1c3644] bg-[#1F2A30] px-4 py-[14px] flex justify-between items-center">
          <h1 className="text-2xl md:text-2xl font-bold maven">🌙 DeepIslam</h1>
          <RxCross1
            className="active:scale-90 active:text-[#2BA4AB] transition-all duration-100 transform text-2xl cursor-pointer outline-none"
            onClick={handleCloseOnClick}
            data-tooltip-id="CrossClose-tooltip"
          />

          <Tooltip
            id="CrossClose-tooltip"
            place="top-end"
            content="Close"
            style={{
              backgroundColor: 'white',
              color: 'black',
              fontSize: '14px',
              padding: '8px 12px',
              borderRadius: '6px',
            }}
          />
        </div>

        {/* <div className="relative bg-[#282F33] mx-3 mt-4  rounded-lg ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 92 80"
            className="w-[17rem] text-[#343A40] ml-20"
          >
            <path
              stroke="currentColor"
              d="m12.34 45.828.005.007.006.007c2.639 2.996 5.947 5.452 9.705 7.21a32.6 32.6 0 0 0 12.105 2.993 33 33 0 0 0 12.401-1.734c3.953-1.36 7.547-3.46 10.544-6.165 2.996-2.705 5.33-5.954 6.841-9.536a24.8 24.8 0 0 0 1.925-11.245c-.243-3.83-1.382-7.569-3.337-10.97-1.956-3.4-4.684-6.385-8.002-8.76l-.291.406.272-.42a.58.58 0 0 1-.248-.322.48.48 0 0 1 .04-.358.64.64 0 0 1 .33-.284.8.8 0 0 1 .498-.034c5.97 1.539 11.385 4.456 15.713 8.457s7.416 8.949 8.967 14.348a29 29 0 0 1-.112 16.452c-1.625 5.382-4.782 10.294-9.164 14.248S60.7 66.938 54.71 68.41a39.4 39.4 0 0 1-18.315.102c-6.01-1.405-11.505-4.201-15.941-8.106-4.434-3.903-7.656-8.776-9.355-14.137a.48.48 0 0 1 .04-.346c.061-.116.17-.22.32-.284a.8.8 0 0 1 .492-.043.7.7 0 0 1 .39.232Z"
            ></path>
            <path
              stroke="currentColor"
              d="M79.173 34.298c.302-1.936.417-3.889.345-5.837a29.1 29.1 0 0 1 1.431 9.421c-.061 4.362-1.11 8.668-3.084 12.654s-4.831 7.572-8.4 10.533-7.776 5.235-12.36 6.68a39.3 39.3 0 0 1-14.294 1.72c-4.846-.311-9.568-1.512-13.878-3.528-4.309-2.016-8.113-4.803-11.18-8.188-3.066-3.385-5.33-7.296-6.658-11.493l-.004-.013a.4.4 0 0 1 .004-.284c3.692 5.875 9.286 10.586 16.028 13.501 6.934 2.999 14.735 3.948 22.298 2.718 7.562-1.231 14.51-4.582 19.853-9.584s8.81-11.404 9.899-18.3Z"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0.5"
              d="M54.242 8.04c3.262 2.337 5.94 5.27 7.86 8.605 1.917 3.336 3.033 7 3.272 10.752a24.3 24.3 0 0 1-1.887 11.018c-1.483 3.512-3.772 6.702-6.717 9.36s-6.479 4.724-10.37 6.063a32.5 32.5 0 0 1-12.213 1.708 32.1 32.1 0 0 1-11.92-2.948c-3.698-1.729-6.95-4.144-9.54-7.086a1.2 1.2 0 0 0-.666-.403 1.3 1.3 0 0 0-.799.07c-.248.106-.449.287-.566.512a.98.98 0 0 0-.078.72c1.727 5.455 5.004 10.408 9.504 14.37 4.502 3.962 10.071 6.795 16.159 8.218a39.9 39.9 0 0 0 18.548-.103c6.067-1.491 11.598-4.386 16.044-8.397 4.447-4.012 7.655-9.001 9.307-14.475a29.5 29.5 0 0 0 .115-16.734c-1.578-5.491-4.718-10.516-9.11-14.577-4.39-4.06-9.881-7.016-15.928-8.574a1.3 1.3 0 0 0-.81.055c-.254.103-.46.284-.582.511a.98.98 0 0 0-.08.73c.068.244.23.458.457.606"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="1.5"
              strokeWidth="1.5"
              d="M28.306 38.49c1.355-4.41 2.243-7.634 3.174-13.1-.05.085 7.202-2.569 10.347-3.753-4.508-.57-10.678-1.417-10.617-1.324-.848-3.48-1.636-8.948-3.62-15.313-.852 4.775-2.35 10.221-2.973 15.03-3.843 1-6.947 2.025-10.617 3.573 4.511.96 7.36 1.888 11.077 2.73 1.125 5.027 1.95 7.847 3.229 12.158"
              clipRule="evenodd"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="1.5"
              strokeWidth="1.5"
              d="M5.744 25c.02 1.313-.077 2.688.05 3.994M2 32.059c.708.011 1.434-.104 2.14-.05M6.206 33.953c-.185 1.095-.145 2.213-.15 3.322M8.378 31.378c.983.085 2.025-.244 2.98-.015"
            ></path>
          </svg>
          <div className="absolute top-0  px-7 py-5">
            <h1 className="text-xl mb-3 font-semibold maven">
              Connect With Us
            </h1>
            <p className="maven tracking-wide text-start font-extralight ">
              Connect with DeepIslam.com and learn the all parts of the Islam
              easy. we are responsible for your Ideas and your Knowage and have
              a nice day.
            </p>
            <div className="flex items-center gap-2 mt-6">
              <button className="border px-5 py-1 rounded-md maven hover:bg-[#495057] cursor-pointer">
                Connect
              </button>
              <a href="#" className="underline hover:text-gray-400">
                Learn more
              </a>
            </div>
          </div>
        </div> */}
        <h1 className="text-center text-xl font-bold mt-4 text-white shadow-black">
          Welcome to DeepIslam.com
        </h1>
        <div className="flex px-4 flex-col justify-center w-[20rem]">
          <h1 className="px-5 border-b pb-3 mt-10 border-[#464B4F] uppercase maven text-[12px] font-semibold">
            Menu
          </h1>
          {Navlinks.map(({ path, label, icon }, index) => (
            <li
              key={index}
              className="py-3 text-start border-b border-[#464B4F]"
            >
              <NavLink
                to={path}
                onClick={handleCloseOnClick}
                className="flex items-center gap-3 hover:text-amber-500 text-[#E7E9EA] text-[16px]"
              >
                <span>{icon}</span>
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </div>
      </ul>

      {/* Tooltips */}
      <Tooltip
        id="settings-tooltip"
        place="bottom-end"
        content="Settings"
        style={{
          backgroundColor: 'white',
          color: 'black',
          fontSize: '14px',
          padding: '8px 12px',
          borderRadius: '6px',
        }}
      />
      <Tooltip
        id="language-tooltip"
        place="bottom-start"
        content="Language"
        style={{
          backgroundColor: 'white',
          color: 'black',
          fontSize: '14px',
          padding: '8px 12px',
          borderRadius: '6px',
        }}
      />
      <Tooltip
        id="search-tooltip"
        place="bottom"
        content="Search"
        style={{
          backgroundColor: 'white',
          color: 'black',
          fontSize: '14px',
          padding: '8px 12px',
          borderRadius: '6px',
        }}
      />
      <Tooltip
        id="menuBar-tooltip"
        place="top-end"
        content="Menu"
        style={{
          backgroundColor: 'white',
          color: 'black',
          fontSize: '14px',
          padding: '8px 12px',
          borderRadius: '6px',
        }}
      />
      <Tooltip
        id="login"
        place="bottom-end"
        content="Login"
        style={{
          backgroundColor: 'white',
          color: 'black',
          fontSize: '14px',
          padding: '8px 12px',
          borderRadius: '6px',
        }}
      />
      {ShowSearchPopup && (
        <SearchPopup onClose={() => setShowSearchPopup(false)} />
      )}
    </header>
  );
}

export default Header;
