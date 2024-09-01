import React, { useState } from "react";
import { PageProvider } from "./PageContext"; // Importar o contexto
import MainContent from "./MainContent"; // Componente separado para o conteúdo principal
import "./App.css"; // Importando o CSS

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      name: "Brigadeiro Tradicional",
      description: "Aquele brigadeiro com gostinho de casa de vó",
    },
    {
      name: "Brigadeiro Gourmet",
      description: "Brigadeiro com chocolate belga",
    },
    {
      name: "Beijinho",
      description: "O verdadeiro beijinho doce",
    },
    {
      name: "Cajuzinho",
      description: "O mais gostoso da festa",
    },
    {
      name: "Bicho-de-Pe",
      description: "O famoso brigadeiro rosa",
    },
    {
      name: "Matcha",
      description: "Receita gourmet feito com chá 'Matcha' ",
    },
    // Adicione mais produtos conforme necessário
  ];

  return (
    <PageProvider>
      <div className="App">
        <header className="App-header">
          <img src="/logo.png" alt="Logo da Empresa" className="App-logo" />
        </header>
        <div className="social-links">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/instagram.svg" alt="Instagram" />
          </a>
          <a
            href="https://wa.me/XXXXXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/whatsapp.svg" alt="WhatsApp" />
          </a>
        </div>
        <MainContent />{" "}
        <section className="products-section">
          <h2 className="section-title">Nossos Docinhos</h2>
          <div className="products-grid">
            {products.map((product, index) => (
              <div
                key={index}
                className={`product-card ${
                  selectedProduct === index ? "active" : ""
                }`}
                onClick={() =>
                  setSelectedProduct(selectedProduct === index ? null : index)
                }
              >
                <div className="product-image">
                  {/* Adicione uma imagem ou ícone para cada produto */}
                  <img
                    src={`/doces/${product.name
                      .toLowerCase()
                      .replace(/ /g, "-")}.jpg`}
                    onError={(e) => {
                      // Se o .jpg não for encontrado, tenta carregar um .png
                      e.target.onerror = null; // Previne loop infinito
                      e.target.src = `/doces/${product.name
                        .toLowerCase()
                        .replace(/ /g, "-")}.jpeg`;
                    }}
                    alt={product.name}
                  />
                </div>
                <div className="product-name">{product.name}</div>
                {selectedProduct === index && (
                  <div className="product-description">
                    {product.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        <footer className="App-footer">
          <p>CNPJ: 00.000.000/0001-00</p>
          <p>
            Todos os direitos reservados. "Quero Docinhos" é uma marca
            registrada de [Nome da Empresa]
          </p>
        </footer>
      </div>
    </PageProvider>
  );
}

export default App;
