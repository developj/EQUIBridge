import { useMutation } from "@tanstack/react-query";
import { getJobicyJobs } from "../api";
import { JobicyJobResponse, JobicyJobsQueryParams } from "../interface";

export const useJobicyJobsMutation = () =>
  useMutation<JobicyJobResponse, Error, JobicyJobsQueryParams>({
    mutationFn: (params) => getJobicyJobs(params),
  })