import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [producto, setProducto] = useState<{ nombre: string; INV_CANTIDAD: number } | null>(
    null
  );

  const handleConsulta = async (codigoProducto: number) => {
    try {
      const response = await fetch(`http://localhost:5000/productos/${codigoProducto}`);
      const data = await response.json();

      console.log('data', data);

      if (data.producto ) {
        setProducto(data.producto);
      } else {
        console.error('Producto no encontrado');
      }
    } catch (error) {
      console.error('Error al consultar el producto:', error);
      // Implementar manejo de errores para mostrar al usuario
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className='title'>Produmaq</h1>
        {/* Do not import the image here. It is already imported in App.css */}
       {/*/ <img alt="Company Logo" className="logo" />*/}
      </header>

      <section className="search-section">
        <h1 className="search-title">Buscar Producto</h1>
        <form onSubmit={(event) => {
          event.preventDefault();
          const target = event.target as typeof event.target & {
            codigoProducto: { value: string };
          };
          const codigoProducto = parseInt(target.codigoProducto.value);
          handleConsulta(codigoProducto);
        }}>
          <div className="search-field">
            <label htmlFor="codigoProducto">Código de producto:</label>
            <input type="number" id="codigoProducto" name="codigoProducto" required />
          </div>
          <button type="submit" className="search-button">
            Buscar
          </button>
        </form>
      </section>

      {producto && (
        <section className="product-info">
          <h2>Información del producto</h2>
          <p>Nombre: {producto.nombre}</p>
          <p>Stock actual: {producto.INV_CANTIDAD}</p>
        </section>
      )}

      <footer className="footer">
        <p className="footer-text">© 2024 Produmaq</p>
        <p className="footer-text">Todos los derechos reservados</p>

      </footer>
    </div>
  );
};

export default App;
