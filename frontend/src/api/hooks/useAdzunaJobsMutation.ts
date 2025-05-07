import { getAdzunaJobs } from "../api";
import { JobAdzunaJobsQueryParams, AdzunaJobResponse } from "../interface";
import { useMutation } from "@tanstack/react-query";

export const useAdzunaJobsMutation = () => {
  return useMutation<AdzunaJobResponse, Error, JobAdzunaJobsQueryParams>({
    mutationFn: (params) => getAdzunaJobs(params),
  });
};
