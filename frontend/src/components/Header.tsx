import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Browse Opportunities", path: "/opportunities" },
    { name: "Resources", path: "/resources" },
    { name: "About Us", path: "/about" },
  ];

  return (
    <header className=" bg-white/80 backdrop-blur-md z-50 shadow-sm ">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-purple)] to-purple-500 flex items-center justify-center text-white font-bold text-xl">
            E
          </div>
          <span className="text-xl font-bold text-[var(--color-purple)]">
            EQUIBridge
          </span>
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-gray-700 hover:text-[var(--color-purple)] transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button
              variant="outline"
              className="border-[var(--color-purple)] text-[var(--color-purple)] hover:bg-[var(--soft-purple)] cursor-pointer"
            >
              Log In
            </Button>
          </Link>

          <Link to="/register">
            <Button className="bg-[var(--color-purple)] hover:bg-purple-600 text-white cursor-pointer">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
