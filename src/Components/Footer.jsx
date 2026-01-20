import React from "react";
import { Link } from "react-router";
import { FaFacebook, FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[url('/particles-stellar.png')] py-8 light:bg-gray-50 dark:bg-[#111111]">
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-yellow-200">
              Global Nexus
            </span>
          </div>
          <ul className="space-y-2 mt-4">
            <li>
              <Link
                to="/all-products"
                className={`text-[#E0E0E0] hover:text-[#FF6F00] transition-colors`}
              >
                All Products
              </Link>
            </li>
            <li>
              <Link
                to="/add-product"
                className={`text-[#E0E0E0] hover:text-[#FF6F00] transition-colors`}
              >
                Add Product
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={`text-[#E0E0E0] hover:text-[#FF6F00] transition-colors`}
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className={`text-[#E0E0E0] hover:text-[#FF6F00] transition-colors`}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 text-yellow-200">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className={`text-[#E0E0E0] hover:text-[#FF6F00] transition-colors`}
              >
                Learning Blog
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={`text-[#E0E0E0] hover:text-[#FF6F00] transition-colors`}
              >
                Guides
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={`text-[#E0E0E0] hover:text-[#FF6F00] transition-colors`}
              >
                Poly Tips
              </Link>
            </li>
            <li>
              <Link
                to="/resources"
                className={`text-[#E0E0E0] hover:text-[#FF6F00] transition-colors`}
              >
                Resources
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 text-yellow-200">Community</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className={`text-[#E0E0E0] hover:text-[#FF6F00] transition-colors`}
              >
                Discussion Forums
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={`text-[#E0E0E0] hover:text-[#FF6F00] transition-colors`}
              >
                Study Groups
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={`text-[#E0E0E0] hover:text-[#FF6F00] transition-colors`}
              >
                Events & Workshops
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={`text-[#E0E0E0] hover:text-[#FF6F00] transition-colors`}
              >
                Leaderboard
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 text-yellow-200">
            Connect With Us
          </h3>
          <div className="flex space-x-4 mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[#E0E0E0] hover:text-blue-500 transition-colors`}
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[#E0E0E0] hover:text-blue-700 transition-colors`}
            >
              <FaXTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[#E0E0E0] hover:text-pink-700 transition-colors`}
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[#E0E0E0] hover:text-sky-700 transition-colors`}
            >
              <FaGithub size={24} />
            </a>
          </div>

          <a
            href="mailto:support@nexus.com"
            className={`flex items-center text-[#E0E0E0] hover:text-[#FF6F00] mt-4 transition-colors`}
          >
            <IoIosMail size={18} className="mr-2" />
            <span>support@nexus.com</span>
          </a>
        </div>
      </div>

      <div className="border-t border-[#173A75] mt-5 pt-2.5 text-center w-11/12 mx-auto">
        <p className="text-sm text-[#E0E0E0]">
          © {currentYear} Global Nexus, All Rights Reserved.
          <span className="ml-2.5">
            <Link
              to="/"
              className={`hover:text-[#FF6F00] mr-2.5 transition-colors`}
            >
              Privacy Policy
            </Link>
            <Link to="/" className={`hover:text-[#FF6F00] transition-colors`}>
              Terms of Service
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
