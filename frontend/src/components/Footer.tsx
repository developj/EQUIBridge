import { Facebook, TwitterIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--equipurple)] flex items-center justify-center text-white font-bold text-xl">
                E
              </div>
              <span className="text-xl font-bold">EQUIBridge</span>
            </div>
            <p className="text-gray-300 mb-4">
              Connecting women and marginalized communities to opportunities
              that empower.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              <a
                href="#"
                className="text-gray-300 hover:text-equibridge-purple"
              >
                <Facebook />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-equibridge-purple"
              >
                <TwitterIcon />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-equibridge-purple"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/opportunities"
                  className="text-gray-300 hover:text-equibridge-purple"
                >
                  Browse Opportunities
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="text-gray-300 hover:text-equibridge-purple"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-equibridge-purple"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Opportunities</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/opportunities?type=jobs"
                  className="text-gray-300 hover:text-equibridge-purple"
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/opportunities?type=scholarships"
                  className="text-gray-300 hover:text-equibridge-purple"
                >
                  Scholarships
                </Link>
              </li>
              <li>
                <Link
                  to="/opportunities?type=grants"
                  className="text-gray-300 hover:text-equibridge-purple"
                >
                  Grants
                </Link>
              </li>
              <li>
                <Link
                  to="/opportunities?type=mentorship"
                  className="text-gray-300 hover:text-equibridge-purple"
                >
                  Mentorship
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-equibridge-purple"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="text-gray-300 hover:text-equibridge-purple"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-300 hover:text-equibridge-purple"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-300 hover:text-equibridge-purple"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-300">
          <p>
            &copy; {new Date().getFullYear()} EQUIBridge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
