import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAllPokemon, getPokemon } from "../../services/api";
import "./styles.css";
import logoImg from "../../assets/pokemon.png";
import { FiSearch } from "react-icons/fi";
import { RiShoppingCart2Line } from "react-icons/ri";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
export default function MarketPlace() {
  const [name, setName] = useState("");
  const initialUrl = "https://pokeapi.co/api/v2/pokemon";
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [qtdCartShopping, setQtdCartShopping] = useState(0);
  const history = useHistory();

  const addToCart = (id, image, name, price) => {
    const data = [id, image, name, price];
    let itensCartShoppingTemp = [];
    let itensCartShopping = localStorage.getItem("itensCartShopping");
    if (itensCartShopping === "") {
      itensCartShopping = [data];
    } else {
      itensCartShoppingTemp.push(...JSON.parse(itensCartShopping), ...[data]);
      itensCartShopping = itensCartShoppingTemp;
    }

    localStorage.setItem(
      "totalPrice",
      Number(localStorage.getItem("totalPrice")) + price
    );

    localStorage.setItem(
      "itensCartShopping",
      JSON.stringify(itensCartShopping)
    );

    setQtdCartShopping(qtdCartShopping + 1);
  };

  useEffect(() => {
    let itensCartShopping = localStorage.getItem("itensCartShopping");
    if (itensCartShopping === null)
      localStorage.setItem("itensCartShopping", []);
    else setQtdCartShopping(JSON.parse(itensCartShopping).length);

    async function fetchData() {
      let response = await getAllPokemon(initialUrl);

      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const searchName = async () => {
    setLoading(true);
    const url = initialUrl + "/" + String(name).toLowerCase();
    let data = await getPokemon(url);
    let dataArray = [];
    dataArray.push(data);
    setPokemonData(dataArray);
    setNextUrl("");
    setPrevUrl("");
    setLoading(false);
  };

  const searchNameEnter = async (e) => {
    if (e.key === "Enter") searchName();
  };

  const handleSearchType = async (type) => {
    let url = "https://pokeapi.co/api/v2/type/" + type;
    setLoading(true);

    let data = await getAllPokemon(url);

    await loadingPokemonComplex(data.pokemon);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;

    let data = await getAllPokemon(nextUrl);
    setLoading(true);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const loadingPokemonComplex = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (item) => {
        return item.pokemon;
      })
    );

    await loadingPokemon(_pokemonData);
  };

  const goToCartShopping = () => {
    if (qtdCartShopping > 0) history.push("/cartShopping");
  };

  return (
    <div className="container">
      <header>
        <img className="logoImg" src={logoImg} alt="Logo Pokemon" />
        <div className="searchBar">
          <input
            placeholder="O que você está procurando?"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              searchNameEnter(e);
            }}
          />
          <button className="button" onClick={searchName}>
            <FiSearch size={32} color="#3B4CCA" />
          </button>
        </div>

        <button className="cartShopping" onClick={goToCartShopping}>
          <RiShoppingCart2Line size={48} color="#B3A125" />
          <p>{qtdCartShopping}</p>
        </button>
      </header>

      <div className="pokemonTypes">
        <button className="button normal" onClick={() => handleSearchType(1)}>
          Normal
        </button>
        <button className="button fighting" onClick={() => handleSearchType(2)}>
          Fighting
        </button>
        <button className="button flying" onClick={() => handleSearchType(3)}>
          Flying
        </button>
        <button className="button poison" onClick={() => handleSearchType(4)}>
          Poison
        </button>
        <button className="button ground" onClick={() => handleSearchType(5)}>
          Ground
        </button>
        <button className="button rock" onClick={() => handleSearchType(6)}>
          Rock
        </button>
        <button className="button bug" onClick={() => handleSearchType(7)}>
          Bug
        </button>
        <button className="button ghost" onClick={() => handleSearchType(8)}>
          Ghost
        </button>
        <button className="button steel" onClick={() => handleSearchType(9)}>
          Steel
        </button>
        <button className="button fire" onClick={() => handleSearchType(10)}>
          Fire
        </button>
        <button className="button water" onClick={() => handleSearchType(11)}>
          Water
        </button>
        <button className="button grass" onClick={() => handleSearchType(12)}>
          Grass
        </button>
        <button
          className="button electric"
          onClick={() => handleSearchType(13)}
        >
          Electric
        </button>
        <button className="button psychic" onClick={() => handleSearchType(14)}>
          Psychic
        </button>
        <button className="button ice" onClick={() => handleSearchType(15)}>
          Ice
        </button>
        <button className="button dragon" onClick={() => handleSearchType(16)}>
          Dragon
        </button>
        <button className="button dark" onClick={() => handleSearchType(17)}>
          Dark
        </button>
        <button className="button fairy" onClick={() => handleSearchType(18)}>
          Fairy
        </button>
      </div>

      <section className="placeCards">
        {pokemonData.map((pokemon, i) => {
          return (
            <div id={i} className="cardContainer">
              <h2>{String(pokemon.name).toUpperCase()}</h2>
              <img
                className="cardImage"
                src={
                  pokemon.sprites.front_default
                    ? pokemon.sprites.front_default
                    : logoImg
                }
                alt={pokemon.name}
              />
              <div className="types">
                {pokemon.types.map((type) => {
                  return (
                    <div className={`${type.type.name} type`}>
                      {type.type.name}
                    </div>
                  );
                })}
              </div>
              <div className="cardInfo">
                <div className="cardPrice">
                  <p class="oldPriceLabel">De: </p>
                  <p class="oldPrice">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(pokemon.base_experience * 1.25)}
                  </p>
                </div>
                <div className="cardPrice">
                  <p class="newPriceLabel">Por: </p>
                  <p class="newPrice">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(pokemon.base_experience)}
                  </p>
                </div>
              </div>
              <button
                className="addToCart"
                onClick={() =>
                  addToCart(
                    pokemon.id,
                    pokemon.sprites.front_default,
                    pokemon.name,
                    pokemon.base_experience
                  )
                }
              >
                Capturar
              </button>
            </div>
          );
        })}
      </section>

      <div className="navigation">
        <button onClick={prev}>
          <GrCaretPrevious size={48} />
        </button>
        <button onClick={next}>
          <GrCaretNext size={48} />
        </button>
      </div>

      <footer>
        <p>Desenvolvido por Vinicius Tito</p>
      </footer>
    </div>
  );
}
