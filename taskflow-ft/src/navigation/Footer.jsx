import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="
        bg-white
        border-t
        border-gray-200
        mt-16
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto

          px-4
          sm:px-6
          lg:px-8

          py-10
        "
      >
        <div
          className="
            grid

            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4

            gap-8
          "
        >
          {/* Logo Section */}
          <div>
            <img
              src="/taskflow_logo1.png"
              alt="TaskFlow"
              className="
                h-12
                md:h-14
                object-contain
              "
            />

            <p className="mt-4 text-sm text-gray-500">
              Modern task management platform
              for teams, projects, and
              productivity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="
                font-semibold
                text-gray-800
                mb-4
              "
            >
              Product
            </h3>

            <div className="space-y-2">
              <Link
                to="/features"
                className="block text-gray-500 hover:text-blue-600"
              >
                Features
              </Link>

              <Link
                to="/pricing"
                className="block text-gray-500 hover:text-blue-600"
              >
                Pricing
              </Link>

              <Link
                to="/about"
                className="block text-gray-500 hover:text-blue-600"
              >
                About
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3
              className="
                font-semibold
                text-gray-800
                mb-4
              "
            >
              Resources
            </h3>

            <div className="space-y-2">
              <Link
                to="/help"
                className="block text-gray-500 hover:text-blue-600"
              >
                Help Center
              </Link>

              <Link
                to="/privacy"
                className="block text-gray-500 hover:text-blue-600"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="block text-gray-500 hover:text-blue-600"
              >
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="
                font-semibold
                text-gray-800
                mb-4
              "
            >
              Connect
            </h3>

            <div className="flex gap-4">
              <a
                href="#"
                className="
                  text-gray-500
                  hover:text-blue-600
                  text-xl
                "
              >
                <FaGithub />
              </a>

              <a
                href="#"
                className="
                  text-gray-500
                  hover:text-blue-600
                  text-xl
                "
              >
                <FaLinkedin />
              </a>

              <a
                href="#"
                className="
                  text-gray-500
                  hover:text-blue-600
                  text-xl
                "
              >
                <FaEnvelope />
              </a>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              Built by Raghvendra Singh
              Bhadouriya
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="
            border-t
            border-gray-200

            mt-8
            pt-6

            flex
            flex-col
            md:flex-row

            justify-between
            items-center

            gap-4
          "
        >
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} TaskFlow.
            All rights reserved.
          </p>

          <p className="text-sm text-gray-500">
            Made with ❤️ using React,
            Node.js & MongoDB
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;