import { UserCircle, Search, Sparkles, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserCircle className="h-12 w-12 text-[var(--color-purple)]" />,
      title: "Create Your Profile",
      description:
        "Share your skills, experience, and goals. The more complete your profile, the better our AI can match you with opportunities.",
    },
    {
      icon: <Sparkles className="h-12 w-12  text-[var(--color-purple)]" />,
      title: "AI-Powered Matching",
      description:
        "Our advanced algorithm analyzes your profile and finds opportunities specifically designed for individuals like you.",
    },
    {
      icon: <Search className="h-12 w-12  text-[var(--color-purple)]" />,
      title: "Discover Opportunities",
      description:
        "Explore jobs, scholarships, grants, and mentorships that align with your background, skills, and aspirations.",
    },
    {
      icon: <ArrowRight className="h-12 w-12  text-[var(--color-purple)]" />,
      title: "Apply & Succeed",
      description:
        "Apply directly through our platform and access resources to help you succeed in your applications.",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How EQUIBridge Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform uses AI to connect you with opportunities designed for
            your unique background and challenges
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto bg-[var(--soft-purple)] rounded-full w-24 h-24 flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <ArrowRight className="h-6 w-6 text-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
