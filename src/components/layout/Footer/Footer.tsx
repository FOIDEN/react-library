import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import footerLogo from "../../../assets/website/logo.png";

const Footer = () => {
  const navigate = useNavigate();

  const handleLinkedInClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/404');
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-950 min-h-[100px] flex flex-col justify-between">
      <section className="container flex-grow">
        <div className="py-3">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 py-2 px-4">
            {/* Logo and Name */}
            <div className="flex items-center gap-3">
              <img src={footerLogo} alt="Logo" className="max-w-[40px] sm:max-w-[50px]" />
              <h1 className="text-lg sm:text-2xl font-extrabold">
                Bookwave
              </h1>
            </div>

            {/* Address */}
            <div className="flex items-center gap-3 text-sm sm:text-base">
              <FaLocationArrow />
              <p>Минск, Свердлова 39</p>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 text-sm sm:text-base">
              <FaMobileAlt />
              <p>+375 25 9651366</p>
            </div>

            {/* Social Handles */}
            <div className="flex items-center gap-3">
              <a href="https://www.google.com/webhp" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary duration-200">
                <FaInstagram className="text-xl sm:text-2xl" />
              </a>
              <a href="https://www.google.com/webhp" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-primary duration-200">
                <FaFacebook className="text-xl sm:text-2xl" />
              </a>
              <a href="#" onClick={handleLinkedInClick} aria-label="LinkedIn" className="hover:text-primary duration-200">
                <FaLinkedin className="text-xl sm:text-2xl" />
              </a>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="text-center py-2 border-t-2 border-gray-300/50 text-sm sm:text-base">
          © 2025 Все права защищены
        </div>
      </section>
    </div>
  );
};

export default Footer;