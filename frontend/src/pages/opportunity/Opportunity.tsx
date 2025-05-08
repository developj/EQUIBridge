// import { Search } from "lucide-react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";

const Opportunity = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 pt-20">
            <h1 className="text-3xl font-bold mb-2">Browse Opportunities</h1>
            <p className="text-gray-600">
              Discover personalized opportunities matched to your skills,
              background, and goals.
            </p>
          </div>

          {/* Search and filter bar */}
          {/* <div className="bg-white rounded-lg shadow-md p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search opportunities..."
                  className="pl-10"
                />
              </div>

              <Button className="bg-equibridge-purple hover:bg-purple-600">
                Find My Match
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {opportunities.map((opportunity) => (
              <Card
                key={opportunity.id}
                className="card-hover overflow-hidden border border-gray-200"
              >
                <CardHeader className="pb-2">
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
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    className="border-equibridge-purple text-equibridge-purple hover:bg-equibridge-soft-purple"
                  >
                    View Details
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-equibridge-purple"
                  ></Button>
                </CardFooter>
              </Card>
            ))}
          </div> */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Opportunity;
