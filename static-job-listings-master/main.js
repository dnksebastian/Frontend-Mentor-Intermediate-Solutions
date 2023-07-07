const getJobOffers = async () => {
  const response = await fetch("./data.json");
  const jobData = await response.json();
  return jobData;
};

document.addEventListener("alpine:init", () => {
  Alpine.store("jobsList", {
    jobs: async () => await getJobOffers(),
    activeFilters: [],
    jobsToDisplay: [],
    makeFilterActive(val) {
      if (!this.activeFilters.includes(val)) {
        this.activeFilters = [...this.activeFilters, val]
        // this.activeFilters.push(val);
        this.getMatchingOffers()
      }
      // console.log(
      //   JSON.parse(JSON.stringify(this.$store.jobsList.activeFilters))
      // );
    },
    removeFilter(val) {
      this.activeFilters = this.activeFilters.filter(el => el !== val)
      this.getMatchingOffers()
    },
    removeAllFilters() {
      this.activeFilters = [];
      this.getMatchingOffers()
    },
    async getMatchingOffers() {
      const allJobs = await this.jobs();
      let matchingJobs;

      if (this.activeFilters.length > 0) {
        let filteredJobs = allJobs.filter((job) => {
          const jobTags = [job.role, job.level, ...job.languages, ...job.tools];
          return this.activeFilters.every((filter) => jobTags.includes(filter));
        });

        matchingJobs = filteredJobs;
      } else {
        matchingJobs = allJobs;
      }

      this.jobsToDisplay = [...matchingJobs]

      return matchingJobs;
    },
  });
});