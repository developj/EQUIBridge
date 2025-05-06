import CallToAction from "../../components/CallToAction";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import HowItWorks from "../../components/HowItWorks";
// import ResourceHub from "../../components/ResourceHub";
import Testimonial from "../../components/Testimonial";
import WhyItMatters from "../../components/WhyItMatters";

export default function Landing() {
  return (
    <div>
      <Header />
      <Hero />
      <WhyItMatters />
      {/* <FeaturedOpportunities /> */}
      <HowItWorks />
      {/* <ResourceHub /> */}
      <CallToAction />
      <Testimonial />
      <Footer />
    </div>
  );
}
