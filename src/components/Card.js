import React from "react";

export default function Card({ pokemon }) {
  return (
    <div className="cardContainer">
      <h2>{String(pokemon.name).toUpperCase()}</h2>
      <img
        className="cardImage"
        src={pokemon.sprites.front_default}
        alt="imgteste"
      />
      <div className="types">
        {pokemon.types.map((type) => {
          return (
            <div className={`${type.type.name} type`}>{type.type.name}</div>
          );
        })}
      </div>
      <div className="cardInfo">
        <div className="cardPrice">
          <p class="oldPriceLabel">De: </p>
          <p class="oldPrice">R$ 200,00</p>
        </div>
        <div className="cardPrice">
          <p class="newPriceLabel">Por: </p>
          <p class="newPrice">R$ 180,00</p>
        </div>
      </div>
      <button className="addToCart">Capturar</button>
    </div>
  );
}
