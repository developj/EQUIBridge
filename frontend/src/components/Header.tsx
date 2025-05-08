import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import { SheetTrigger, Sheet, SheetContent } from "./ui/sheet";
import { Menu } from "lucide-react";
import { useAuth } from "../api/hooks/useAuth";
import { logout } from "../api/api";
import ProfileDropdown from "./ProfileDropdown";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

const Header = () => {
  const { user } = useAuth();
  console.log("user", user);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const scrollToSection = () => {
    const section = document.getElementById("how-it-works");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className=" bg-white/80 backdrop-blur-md z-50 shadow-sm ">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-[var(--equipurple)] flex items-center justify-center text-white font-bold text-xl">
            E
          </div>
          <span className="text-xl font-bold text-black">EQUIBridge</span>
        </Link>
        {/* Desktop Navigation */}

        {user ? (
          <nav
            aria-label="Main desktop navigation"
            className="hidden md:flex items-center gap-4"
          >
            <div className="hidden md:flex items-center gap-3 ">
              <Link
                to="/"
                className="text-gray-700 hover:text-[var(--color-purple)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-purple)]"
              >
                Home
              </Link>
              <button
                onClick={scrollToSection}
                className="text-gray-700 hover:text-[var(--color-purple)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-purple)]"
              >
                How It Works
              </button>
            </div>
            <ProfileDropdown />{" "}
          </nav>
        ) : (
          <nav
            aria-label="Main desktop navigation"
            className="hidden md:flex items-center  gap-3.5 space-x-4"
          >
            <Link
              to="/"
              className="text-gray-700 hover:text-[var(--color-purple)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-purple)]"
            >
              Home
            </Link>
            <button
              onClick={scrollToSection}
              className="text-gray-700 hover:text-[var(--color-purple)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-purple)]"
            >
              How It Works
            </button>

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
          </nav>
        )}

        {/* Mobile Navigation */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <Menu className="h-8 w-8 " />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px] px-4">
            <DialogTitle className="sr-only">Navigation Menu</DialogTitle>
            <DialogDescription className="sr-only">
              Use this menu to navigate the site or access your profile.
            </DialogDescription>

            <nav
              aria-label="Main mobile navigation"
              className="flex flex-col gap-4 mt-16 "
            >
              <Link
                to="/"
                className="text-lg font-medium px-2 py-2 rounded-md hover:bg-[var(--soft-purple)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-purple)]"
              >
                Home
              </Link>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToSection();
                }}
                className="text-left text-lg font-medium px-2 py-2 rounded-md hover:bg-[var(--soft-purple)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-purple)]"
              >
                How It Works
              </button>

              {user ? (
                <div className="flex  flex-col gap-4 px-2">
                  {/* <h1> Hi! {user.first_name}</h1> */}

                  <Link
                    to="/createprofile"
                    className="cursor-pointer text-lg font-medium  rounded-md hover:bg-[var(--soft-purple)] transition-colors"
                  >
                    Edit Profile
                  </Link>

                  <Button
                    variant="outline"
                    className="border-[var(--color-purple)] text-[var(--color-purple)] hover:bg-[var(--soft-purple)] cursor-pointer"
                    onClick={logout}
                  >
                    Log out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-4">
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="border-[var(--color-purple)] text-[var(--color-purple)]  hover:bg-[var(--soft-purple)]  w-full cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--color-purple)]"
                    >
                      Log In
                    </Button>
                  </Link>

                  <Link to="/register">
                    <Button className="bg-[var(--color-purple)] hover:bg-purple-600 text-white w-full cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--color-purple)]">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
