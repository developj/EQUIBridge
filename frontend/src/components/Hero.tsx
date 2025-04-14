import { Search } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="hero-gradient pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in text-black ">
            <span className="gradient-text">Bridging</span> the Opportunity Gap
          </h1>
          <p
            className="text-lg md:text-xl mb-8 text-gray-700 max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            AI-powered platform connecting women and marginalized communities to
            jobs, scholarships, grants, and mentorships tailored to your unique
            skills and needs.
          </p>

          <div
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Button className="bg-[var(--color-purple)] hover:bg-purple-600 text-white text-lg px-8  cursor-pointer">
              Create Your Profile
            </Button>
            <Button
              variant="outline"
              className="border-[var(--color-purple)] text-[var(--color-purple)] hover:bg-[ var(--soft-purple)] text-lg px-8 cursor-pointer "
            >
              Browse Opportunities
            </Button>
          </div>

          <div
            className="relative max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="flex items-center bg-white rounded-full shadow-lg p-2 pl-6 pr-2">
              <Search className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search for opportunities, skills, or resources..."
                className="flex-1 bg-transparent outline-none text-gray-800"
              />
              <Button className="bg-[var(--color-purple)] hover:bg-purple-600 text-white rounded-full cursor-pointer">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
