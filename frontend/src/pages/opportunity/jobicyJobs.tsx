import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { JobicyJobResponse } from "../../api/interface";

interface JobicyJobListProps {
  jobs: JobicyJobResponse;
}

export const JobicyJobList: React.FC<JobicyJobListProps> = ({ jobs }) => {
  
  if (!jobs || jobs.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.map((job) => {
        const tags = [...(job.jobIndustry || []), ...(job.jobType || [])];

        return (
          <Card
            key={job.id}
            className="card-hover overflow-hidden border border-gray-200"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                {job.companyLogo && (
                  <img
                    src={job.companyLogo}
                    alt={`${job.companyName} logo`}
                    className="w-10 h-10 object-cover rounded"
                  />
                )}
                <CardTitle className="mt-0 text-xl">{job.jobTitle}</CardTitle>
              </div>

              {(job.companyName || job.jobGeo) && (
                <CardDescription className="flex items-center mt-1">
                  {job.companyName}
                  {job.companyName && job.jobGeo && " • "}
                  {job.jobGeo}
                </CardDescription>
              )}

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </CardHeader>

            <CardContent>
              {job.jobExcerpt && (
                <p className="text-gray-600 text-sm line-clamp-3">
                  {job.jobExcerpt}
                </p>
              )}
              <div className="flex pt-3">   
              {job.annualSalaryMin != null && job.annualSalaryMax != null && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  ${job.annualSalaryMin.toLocaleString()}–$
                  {job.annualSalaryMax.toLocaleString()} {job.salaryCurrency}
                </span>
              )}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between items-center">
              {job.pubDate && (
                <span className="text-xs text-gray-500">
                  {new Date(job.pubDate).toLocaleDateString()}
                </span>
              )}

              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <Button
                  variant="outline"
                  className="border-[var(--equipurple)] text-[var(--equipurple)] hover:bg-[var(--soft-purple)]"
                >
                  View Details
                </Button>
              </a>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export const jobicyPrompt = (text?: string) => {
  return `
  respond with one word, that best describes this job search: '${text}'. Respond with just one word, let it be a word that describes a career, eg python, nurse, nursing, developer, fullstack, painter, java etc`;
};