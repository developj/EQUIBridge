import requests

def fetch_jobicy_jobs(count=5, geo="", industry="", tag=""):
    """
    Hits https://jobicy.com/api/v2/remote-jobs
    with only the non-empty params.
    Returns the list under the 'jobs' key.
    """
    url = "https://jobicy.com/api/v2/remote-jobs"
    params = {}

    # only include if truthy (non-empty / non-zero)
    if count:
        params["count"] = count
    if geo:
        params["geo"] = geo
    if industry:
        params["industry"] = industry
    if tag:
        params["tag"] = tag

    resp = requests.get(url, params=params)
    resp.raise_for_status()
    data = resp.json()

    jobs = data.get("jobs", [])

    # Jobicy returns a dict on "no results", so normalize that to []
    if isinstance(jobs, dict):
        return []

    return jobs