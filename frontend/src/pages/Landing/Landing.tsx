import CallToAction from "../../components/CallToAction";
import FeaturedOpportunities from "../../components/FeaturedOpportunities";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import HowItWorks from "../../components/HowItWorks";
import ResourceHub from "../../components/ResourceHub";
import Testimonial from "../../components/Testimonial";

export default function Landing() {
  return (
    <div>
      <Header />
      <Hero />
      <FeaturedOpportunities />
      <HowItWorks />
      <ResourceHub />
      <CallToAction />
      <Testimonial />
      <Footer />
    </div>
  );
}
