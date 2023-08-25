import axios from "axios";

const apiKey = "live_Fq7RcE48jaS9VaYPOZkrrf96GvUZGWbDqBp7ekVl17nx46zrDrDmGRn4w4YBGPPc";
axios.defaults.headers.common["x-api-key"] = apiKey;

export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => {
      return response.data.map(breed => ({
        id: breed.id,
        name: breed.name
      }));
    })
    .catch(error => {
      console.error("Error fetching breeds:", error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data[0];
    })
    .catch(error => {
      console.error("Error fetching cat by breed:", error);
      throw error;;
    });
}
