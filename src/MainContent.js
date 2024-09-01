import React, { useContext, useState, useEffect } from "react";
import { PageContext } from "./PageContext";

function MainContent() {
  const { currentPage, setCurrentPage } = useContext(PageContext);
  const [order, setOrder] = useState([]);
  const products = [
    { name: "Brigadeiro Tradicional", price: 2.0 },
    { name: "Brigadeiro Gourmet", price: 3.5 },
    { name: "Beijinho", price: 2.0 },
    { name: "Cajuzinho", price: 2.0 },
    { name: "Bicho-de-pé", price: 3.5 },
    { name: "Matcha", price: 4.0 },
    // Adicione mais produtos conforme necessário
  ];

  useEffect(() => {
    // Inicializa o estado do pedido com os produtos e quantidade zero
    setOrder(products.map((product) => ({ ...product, quantity: 0 })));
  }, []);

  const handleQuantityChange = (index, quantity) => {
    const newOrder = [...order];
    newOrder[index] = { ...products[index], quantity: parseInt(quantity) || 0 };
    setOrder(newOrder);
  };

  const calculateTotal = () => {
    return order
      .reduce((total, item) => total + item.price * (item.quantity || 0), 0)
      .toFixed(2);
  };

  const sendOrder = () => {
    const orderSummary = order
      .filter(item => item.quantity > 0) // Filtra itens com quantidade maior que 0
      .map(
        (item) =>
          `- ${item.name} - Quantidade ${item.quantity} - TOTAL R$${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join("\n");
    const total = calculateTotal();
    const message = `Pedido:\n${orderSummary}\n\nTOTAL DO PEDIDO: R$${total}\nEndereço de entrega ou retirada a combinar`;
    const whatsappUrl = `https://wa.me/XXXXXXXXXXXXX?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
    clearOrder();
  };

  const clearOrder = () => {
    setOrder(products.map((product) => ({ ...product, quantity: 0 })));
  };

  const handleOrderPageClick = () => {
    setCurrentPage("order");
    clearOrder();
  };

  return (
    <main>
      <nav className="botoes">
        <button
          className="styled-button"
          onClick={() => setCurrentPage("presentation")}
        >
          Conheça nossos produtos
        </button>
        <button className="styled-button" onClick={handleOrderPageClick}>
          Faça sua encomenda
        </button>
      </nav>

      {currentPage === "presentation" && (
        <div>{/* Conteúdo da página de apresentação */}</div>
      )}

      {currentPage === "order" && (
        <div>
          <h2>Faça sua encomenda</h2>
          <div className="order-form">
            {products.map((product, index) => (
              <div key={index} className="order-item">
                <span>
                  {product.name} - R${product.price.toFixed(2)}
                </span>
                <input
                  type="number"
                  min="0"
                  placeholder="QTD"
                  value={order[index]?.quantity || ""}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                />
              </div>
            ))}
            <div className="order-total">
              <strong>TOTAL DO PEDIDO: R${calculateTotal()}</strong>
            </div>
            <button className="styled-button" onClick={sendOrder}>
              Enviar Pedido via WhatsApp
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default MainContent;
