const getJobOffers = async () => {
    const response = await fetch('./data.json');
    const jobData = await response.json()
    return jobData
  }

  document.addEventListener('alpine:init', () => {
    Alpine.store('jobsList', {
      jobs: async () => await getJobOffers(),
      filters: [],
    })
})
