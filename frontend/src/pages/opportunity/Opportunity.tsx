import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const Opportunity = () => {
  return (
    <section>
      <Header />

      <div>
        <h1>Browse Opportunities</h1>
        <p>
          Discover personalized opportunities matched to your skills,
          background, and goals.
        </p>
      </div>

      <div>
        <Input type="text" />
        <Button> Find My Match</Button>
      </div>
      <Footer />
    </section>
  );
};

export default Opportunity;
