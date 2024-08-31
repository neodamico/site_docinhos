import React, { useContext } from "react";
import { PageContext } from "./PageContext";

function MainContent() {
  const { currentPage, setCurrentPage } = useContext(PageContext);

  return (
    <main>
      <nav class="botoes">
        <button class="styled-button" onClick={() => setCurrentPage("presentation")}>
          Conheça nossos produtos
        </button>
        <button class="styled-button" onClick={() => setCurrentPage("order")}>
          Faça sua encomenda
        </button>
      </nav>

      {/* Renderização condicional do conteúdo das páginas */}
      {currentPage === "presentation" && (
        <div>
          <h2>Página de Apresentação</h2>
          {/* Conteúdo da página de apresentação */}
        </div>
      )}

      {currentPage === "order" && (
        <div>
          <h2>Faça sua encomenda</h2>
          {/* Conteúdo da página de encomenda */}
        </div>
      )}
    </main>
  );
}

export default MainContent;
