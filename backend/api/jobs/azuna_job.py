import os
import requests

adzuna_id =  os.environ.get("ADZUNA_ID",os.getenv("ADZUNA_ID"))
adzuna_key =  os.environ.get("ADZUNA_KEY",os.getenv("ADZUNA_KEY"))

def fetch_adzuna_jobs(query="health worker", location="usa", results_per_page=10, page=1):
    base_url = f"https://api.adzuna.com/v1/api/jobs/us/search/{page}"
    params = {
        "app_id": adzuna_id,
        "app_key": adzuna_key,
        "what": query,
        "where": location,
        "results_per_page": results_per_page,
        "content-type": "application/json"
    }

    response = requests.get(base_url, params=params)
    response.raise_for_status()
    data = response.json()
    return data.get("results",[])
