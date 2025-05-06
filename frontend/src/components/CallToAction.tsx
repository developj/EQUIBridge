import { Button } from "./ui/button";

const CallToAction = () => {
  return (
    <section className="py-16 px-4 bg-[var(--equipurple)] text-white">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Next Opportunity?
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Join thousands of women and individuals from marginalized
            communities who have found meaningful opportunities through
            EQUIBridge.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-[var(--color-purple)] hover:bg-gray-100 cursor-pointer"
            >
              Create Your Profile
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
