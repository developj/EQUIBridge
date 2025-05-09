/* eslint-disable react-hooks/exhaustive-deps */
import { Search } from "lucide-react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useAdzunaJobsMutation } from "../../api/hooks/useAdzunaJobsMutation";
import { useEffect, useState } from "react";
import { AdzunaJob } from "../../api/interface";

const Opportunity = () => {
  const [opportunities, setOpportunities] = useState<AdzunaJob[]>([]);
  const [page, setPage] = useState<number>(1);

  const [searchQuery, setSearchQuery] = useState<string>("health worker");
  const mutateAzuna = useAdzunaJobsMutation();

  const sampleJobAdzunaParams = {
    query: searchQuery,
    location: "usa",
    results_per_page: 20,
    page: 1,
  };

  const handleFetchJobs = () => {
    mutateAzuna.mutate(sampleJobAdzunaParams, {
      onSuccess: (data) => {
        setOpportunities(data || []);
        console.log("Fetched jobs:", data);
      },
      onError: (err) => {
        console.error("Error fetching jobs:", err);
      },
    });
  };

  useEffect(() => {
    handleFetchJobs();
    // fetch jobs on mount
  }, [page]);

  const handleSearch = () => {
    setPage(1); // reset to first page when searching
    handleFetchJobs();
  };

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
          <div className="bg-white rounded-lg shadow-md p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search opportunities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Button
                className="bg-[var(--equipurple)] hover:bg-purple-600 cursor-pointer"
                onClick={handleSearch}
              >
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
                    {opportunity.company?.display_name || "Unknown"} •{" "}
                    {opportunity.location?.display_name || "N/A"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {opportunity.description}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <a
                    href={opportunity.redirect_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer"
                  >
                    <Button
                      variant="outline"
                      className="border-[var(--equipurple)]  text-[var(--equipurple)] hover:bg-[var(--soft-purple)] cursor-pointer"
                    >
                      View Details
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center gap-4 mt-10">
            <Button
              variant="outline"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="border-[var(--equipurple)] text-[var(--equipurple)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous
            </Button>
            <span className="self-center  text-[var(--equipurple)] font-semibold">
              Page {page}
            </span>
            <Button
              variant="outline"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={opportunities.length < 12}
              className="border-[var(--equipurple)] text-[var(--equipurple)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Opportunity;
