/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowLeft, Search } from "lucide-react";
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
import { useJobicyJobsMutation } from "../../api/hooks/useJobicy";
import { useEffect, useState } from "react";
import { AdzunaJob } from "../../api/interface";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../api/hooks/useChat";
import { JobicyJobResponse } from "../../api/interface";
import { JobicyJobList, jobicyPrompt } from "./jobicyJobs";
import { useProfile } from "../../api/hooks/useProfile";

const Opportunity = () => {
  const { data:user } = useProfile();
  const userInterestPhrase = user?.interest_search_phrase;
  const [opportunities, setOpportunities] = useState<AdzunaJob[]>([]);
  const [page, setPage] = useState<number>(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(user?.interest_search_phrase || "");
  const [jobicyResult, setJobicyResult] = useState<JobicyJobResponse>([]);
  const mutateAdzuna = useAdzunaJobsMutation();
  const mutateJobicy = useJobicyJobsMutation();
  const navigate = useNavigate();
  const  mutateChat= useChat()

  const handleFetchJobs =async (text?:string) => {
    let query = text;
    if(!text){
      const chatResponse =await mutateChat?.mutateAsync({message: adzunaPrompt(searchQuery)});
      query = chatResponse?.reply
    }

    const sampleJobAdzunaParams = {
      query:  searchQuery && searchQuery?.length > 0 && searchQuery?.split(" ")?.length <= 4? searchQuery: query || user?.interest_search_phrase || "",
      location: "usa",
      results_per_page: 20,
      page: 1,
    };
    mutateAdzuna.mutate(sampleJobAdzunaParams, {
      onSuccess: (data) => {
        setOpportunities(data || []);
        console.log("Fetched jobs:", data);
      },
      onError: (err) => {
        console.error("Error fetching jobs:", err);
      },
    });
    handleFetchJobicyJobs(query);
  };


  const handleFetchJobicyJobs =async (text?: string) => {
    const chatResponse =await mutateChat?.mutateAsync({message: jobicyPrompt(searchQuery || text)});

    const paramsJobicy = {
      tag: chatResponse?.reply,
      count: 50,
    };
    mutateJobicy.mutate(paramsJobicy, {
      onSuccess: (data) => {
        setJobicyResult(data || []);
        console.log("Fetched jobs:", data);
      },
      onError: (err) => {
        console.error("Error fetching jobs:", err);
      },
    });
  };

  useEffect(() => {
    if(userInterestPhrase){
      handleFetchJobs(userInterestPhrase);
    }
    // fetch jobs on page load
  }, [userInterestPhrase]);

  const handleSearch = () => {
    setPage(1); // reset to first page when searching
    handleFetchJobs();
  };

  const navigateToBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Button
            onClick={navigateToBack}
            variant="outline"
            className="cursor-pointer"
          >
            {" "}
            <ArrowLeft />
            back
          </Button>
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
            <div className="flex-wrap gap-4 pt-4 hidden">
              {["Remote", "Disability-Friendly", "Flexible"].map((tag) => (
                <label key={tag} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => {
                      setSelectedTags((prev) =>
                        prev.includes(tag)
                          ? prev.filter((t) => t !== tag)
                          : [...prev, tag]
                      );
                    }}
                    className="cursor-pointer"
                  />
                  <span>{tag}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className=" px-4 md:px-12 py-6">
          {" "}
          <p className="pb-6 ">
            {`Hi ${user?.first_name} 👋 Based on your interests in  ${user?.interests} here
              are some roles we found just for you.`}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {opportunities.map((opportunity) => {
              // Match Score Logic
              let score = 50;
              user?.skills?.forEach((skill) => {
                if (
                  opportunity.title?.toLowerCase().includes(skill.toLowerCase())
                )
                  score += 30;
              });
              if (
                opportunity.title
                  ?.toLowerCase()
                  .includes((user?.preferred_industries || "").toLowerCase())
              )
                score += 20;
              if (
                opportunity.description
                  ?.toLowerCase()
                  .includes((user?.interests || "").toLowerCase())
              )
                score += 20;
              score = Math.min(score, 100);

              // Inclusive Tags
              const tags: string[] = [];
              if (opportunity.title?.toLowerCase().includes("remote"))
                tags.push("Remote");
              if (opportunity.description?.toLowerCase().includes("flexible"))
                tags.push("Flexible");
              if (opportunity.description?.toLowerCase().includes("inclusive"))
                tags.push("Disability-Friendly");

              // Filter based on selected tags
              if (
                selectedTags.length > 0 &&
                !selectedTags.every((t) => tags.includes(t))
              )
                return null;

              return (
                <Card
                  key={opportunity.id}
                  className="card-hover overflow-hidden border border-gray-200 "
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="mt-2 text-xl">
                      {opportunity.title}
                    </CardTitle>
                    <CardDescription className="flex items-center">
                      {opportunity.company?.display_name || "Unknown"} •{" "}
                      {opportunity.location?.display_name || "N/A"}
                    </CardDescription>

                    <div className="flex gap-2 flex-wrap mt-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          score >= 80
                            ? "bg-green-100 text-green-700"
                            : score >= 60
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        Match: {score}%
                      </span>
                    </div>
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
                        className="border-[var(--equipurple)] text-[var(--equipurple)] hover:bg-[var(--soft-purple)] cursor-pointer"
                      >
                        View Details
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              );
            })}
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
        <div className="pt-8">
         <JobicyJobList jobs={jobicyResult} />
         </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Opportunity;



export const adzunaPrompt = (text?: string) => {
  return `
  respond with three words, that best describes this job search: '${text}'. Respond with just three words, example: frontend developer, nurse, medical doctor, dance artist, python javascript developer, nursing student etc. like they are search for job so the three words should makes not comma separated words`;
};
