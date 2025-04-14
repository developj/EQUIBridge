import { FileText, Book, Video, Users } from "lucide-react";
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

const resources = [
  {
    title: "Resume Building for Women in Tech",
    type: "Guide",
    icon: <FileText className="h-5 w-5" />,
    description:
      "Learn how to highlight your skills and experience to stand out in the tech industry.",
    category: "Career Development",
    color: "bg-blue-100 text-blue-800",
  },
  {
    title: "Financial Aid for First-Generation Students",
    type: "Article",
    icon: <Book className="h-5 w-5" />,
    description:
      "Comprehensive guide to finding and applying for financial aid as a first-generation college student.",
    category: "Education",
    color: "bg-purple-100 text-purple-800",
  },
  {
    title: "Interview Skills Workshop",
    type: "Video",
    icon: <Video className="h-5 w-5" />,
    description:
      "Master the art of interviewing with tips specifically for women and minorities in professional settings.",
    category: "Career Development",
    color: "bg-blue-100 text-blue-800",
  },
  {
    title: "Networking for Introverts",
    type: "Community Discussion",
    icon: <Users className="h-5 w-5" />,
    description:
      "Join our community discussion on effective networking strategies for introverts in professional environments.",
    category: "Professional Development",
    color: "bg-green-100 text-green-800",
  },
];

const ResourceHub = () => {
  return (
    <section className="py-16 px-4 bg-[var(--soft-purple)]">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Resource Hub</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access guides, articles, videos, and community discussions to help
            you succeed in your educational and career journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <Card key={index} className="card-hover bg-white">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className={resource.color}>
                    {resource.category}
                  </Badge>
                  <div className="p-2 rounded-full bg-equibridge-soft-purple text-equibridge-purple">
                    {resource.icon}
                  </div>
                </div>
                <CardTitle className="mt-2 text-xl">{resource.title}</CardTitle>
                <CardDescription>{resource.type}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{resource.description}</p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className=" border-[var(--color-purple)] text-[var(--color-purple)] hover:bg-[var(--soft-purple)] cursor-pointer"
                >
                  Access Resource
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
            Explore All Resources
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResourceHub;
