import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import heroImg from "../assets/heroImg.png";

const Hero = () => {
  return (
    <section className="relative py-16 px-4 md:py-24 md:px-4 overflow-hidden ">
      <div className="md:px-4 container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 hero-text-container animate-fade-in">
            <div className="inline-block bg-[var(--equipurple-10)] text-[var(--equipurple)] px-4 py-2 rounded-full mb-6">
              Empowering Opportunity
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Bridging the{" "}
              <span className="text-[var(--equipurple)]">Opportuinity</span> Gap{" "}
            </h1>
            <p className="text-lg text-foreground/80 mb-8 max-w-xl">
              EquiBridge is an AI-powered platform connecting women and
              marginalized communities to jobs, scholarships, grants, and
              mentorships tailored to your unique skills and needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={"/createprofile"}
                aria-label="Create your profile to get started"
              >
                <Button className="bg-[var(--equipurple)] hover:bg-[var(--equipurple-90)] text-white px-6 py-6 text-lg cursor-pointer w-full">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-[var(--equipurple)] text-[var(--equipurple)] hover:bg-[var(--equipurple-20)] py-6 text-lg cursor-pointer"
                onClick={() => {
                  const el = document.getElementById("how-it-works");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                aria-label="Learn how EquiBridge works"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="flex-1 relative animate-fade-in">
            <div className="aspect-square max-w-md mx-auto bg-[var(--equipurple-20)] p-6 rounded-3xl">
              <div className="bg-white rounded-2xl w-full h-full flex items-center justify-center shadow-lg">
                <div className="text-center p-8">
                  <div className="bg-white rounded-2xl w-full h-full flex items-center justify-center shadow-lg overflow-hidden">
                    <img
                      src={heroImg}
                      alt="Inclusive cartoon illustration of diverse people with disabilities"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-2">
                    Smart Matching
                  </h3>
                  <p className="text-foreground/70">
                    Our AI understands your unique background and connects you
                    to perfect opportunities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
