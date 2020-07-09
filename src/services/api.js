async function getAllPokemon(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
}

async function getPokemon(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
}

module.exports = {
  getAllPokemon,
  getPokemon,
};

/*const axios = require("axios");

const URL = `https://pokeapi.co/api/v2/`;
async function searchName(name) {
  const response = await axios.get(`${URL}pokemon/${name}`);
  const title = response.data.name;
  const image = response.data.sprites.front_default;
  const type = response.data.types[0].type.name;

  localStorage.setItem("Pokemons", JSON.stringify({ title, image, type }));

  return true;
}

async function searchType(type) {
  const response = await axios.get(`${URL}type/${type}/`);
  return response.data.pokemon;
}

module.exports = {
  searchName,
  searchType,
};
*/
