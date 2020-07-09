import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./styles.css";
import logoImg from "../../assets/pokemon.png";
import { RiDeleteBin2Line } from "react-icons/ri";

export default function CartShopping() {
  const [itensCartShopping, setItensCartShopping] = useState([]);
  const [modalVisible, setModalVisible] = useState("hidePopup backgroundModal");
  const [totalPrice, setTotalPrice] = useState(0);

  const history = useHistory();
  useEffect(() => {
    let itensCartShopping = localStorage.getItem("itensCartShopping");
    setItensCartShopping(JSON.parse(itensCartShopping));
    setTotalPrice(Number(localStorage.getItem("totalPrice")));
  }, []);

  const finishBuy = () => {
    setModalVisible("showPopup backgroundModal");
  };

  const clearCartShopping = () => {
    localStorage.clear();
  };

  const removeItem = (index, price) => {
    let itensCartShopping = JSON.parse(
      localStorage.getItem("itensCartShopping")
    );

    localStorage.setItem("totalPrice", totalPrice - price);
    setTotalPrice(totalPrice - price);

    itensCartShopping.splice(index, 1);
    setItensCartShopping(itensCartShopping);
    localStorage.setItem(
      "itensCartShopping",
      JSON.stringify(itensCartShopping)
    );

    //verifica se o carrinho está vazio ou seja a variável só tem os []
    //caso positivo retorna para loja
    if (JSON.stringify(itensCartShopping).length === 2) {
      localStorage.setItem("totalPrice", 0);
      clearCartShopping();
      setTotalPrice(0);
      history.push("/");
    }
  };

  return (
    <div className="container">
      <header>
        <img className="logoImg" src={logoImg} alt="Logo Pokemon" />
        <div>
          <p>Meu Carrinho</p>
          <h3>Confira os itens adicionados</h3>
        </div>
      </header>

      <div className="actionBar">
        <Link to="/">
          <button>Capturar mais Pokémons</button>
        </Link>
        <button onClick={finishBuy}>Concluir Captura</button>
      </div>
      <p className="messageWarning">
        Não perca tempo! Finalize sua compra agora e garanta as melhores
        ofertas.
      </p>
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço Original</th>
            <th>Desconto</th>
            <th>Preço Final</th>
          </tr>
        </thead>
        <tbody>
          {itensCartShopping.map(([id, image, name, price], index) => {
            return (
              <tr key={index}>
                <td className="product">
                  <img
                    className="cardImage"
                    src={image ? image : logoImg}
                    alt="name}"
                  />
                  <p>{String(name).toLocaleUpperCase()}</p>
                  <button onClick={() => removeItem(index, price)}>
                    <RiDeleteBin2Line size={24} color="#ab1f24" />
                  </button>
                </td>

                <td>
                  <p className="price originalPrice">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(price * 1.25)}
                  </p>
                </td>
                <td>
                  <p className="price discountPrice">
                    -
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(price * 0.25)}
                  </p>
                </td>
                <td>
                  <p className="price finalPrice">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(price)}
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th>TOTAL</th>
            <th>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalPrice * 1.25)}
            </th>
            <th>
              -
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalPrice * 0.25)}
            </th>
            <th>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalPrice)}
            </th>
          </tr>
        </tfoot>
      </table>

      <div className="actionBar">
        <Link to="/">
          <button>Capturar mais Pokémons</button>
        </Link>
        <button onClick={finishBuy}>Concluir Captura</button>
      </div>
      <div className={modalVisible}>
        <div className="modal">
          <p>Treinador, obrigado pela preferência!</p>
          <Link to="/">
            <button onClick={clearCartShopping}>Voltar para Loja</button>
          </Link>
        </div>
      </div>
      <footer>
        <p>Desenvolvido por Vinicius Tito</p>
      </footer>
    </div>
  );
}
