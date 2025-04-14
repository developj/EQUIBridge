import { Briefcase, GraduationCap, Handshake, BarChart4 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

// Sample opportunity data
const opportunities = [
  {
    id: 1,
    title: "Remote Software Engineer",
    organization: "TechEquity Inc.",
    type: "job",
    location: "Remote",
    description:
      "Full-time remote position for a mid-level software engineer with flexibility for caregivers.",
    icon: Briefcase,
    category: "Tech",
    badgeColor: "bg-blue-100 text-blue-800",
  },
  {
    id: 2,
    title: "Women in STEM Scholarship",
    organization: "Future Leaders Foundation",
    type: "scholarship",
    location: "National",
    description:
      "Full-tuition scholarship for women pursuing degrees in STEM fields at accredited universities.",
    icon: GraduationCap,
    category: "Education",
    badgeColor: "bg-purple-100 text-purple-800",
  },
  {
    id: 3,
    title: "Business Grant for Minorities",
    organization: "Equity Ventures",
    type: "grant",
    location: "United States",
    description:
      "$25,000 grant for minority entrepreneurs launching sustainable businesses in underserved communities.",
    icon: BarChart4,
    category: "Business",
    badgeColor: "bg-green-100 text-green-800",
  },
  {
    id: 4,
    title: "Tech Career Mentorship Program",
    organization: "Women Who Code",
    type: "mentorship",
    location: "Virtual",
    description:
      "Six-month mentorship program pairing experienced tech professionals with early-career women in tech.",
    icon: Handshake,
    category: "Professional Development",
    badgeColor: "bg-pink-100 text-pink-800",
  },
];

const getOpportunityIcon = (type: string) => {
  switch (type) {
    case "job":
      return <Briefcase className="h-5 w-5" />;
    case "scholarship":
      return <GraduationCap className="h-5 w-5" />;
    case "grant":
      return <BarChart4 className="h-5 w-5" />;
    case "mentorship":
      return <Handshake className="h-5 w-5" />;
    default:
      return <Briefcase className="h-5 w-5" />;
  }
};

const FeaturedOpportunities = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Opportunities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover handpicked opportunities tailored for women and
            underrepresented groups across various fields
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {opportunities.map((opportunity) => (
            <Card
              key={opportunity.id}
              className="card-hover overflow-hidden border border-gray-200"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className={opportunity.badgeColor}>
                    {opportunity.category}
                  </Badge>
                  <div className="p-2 rounded-full bg-[var(--soft-purple)] text-var[(--color-purple)]">
                    {getOpportunityIcon(opportunity.type)}
                  </div>
                </div>
                <CardTitle className="mt-2 text-xl">
                  {opportunity.title}
                </CardTitle>
                <CardDescription className="flex items-center">
                  {opportunity.organization} • {opportunity.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {opportunity.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full border-[var(--color-purple)] text-[var(--color-purple)] hover:bg-[var(--soft-purple)] cursor-pointer"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button
            variant="outline"
            className=" border-[var(--color-purple)] text-[var(--color-purple)] hover:bg-[var(--soft-purple)] cursor-pointer"
          >
            View All Opportunities
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedOpportunities;
