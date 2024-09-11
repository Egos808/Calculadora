import React, { useState } from "react";
import './App.css';

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [resultado, setResultado] = useState(null);
  const [operacion, setOperacion] = useState("");
  const [historial, setHistorial] = useState([]);

  const handleNum1Change = (e) => setNum1(e.target.value);
  const handleNum2Change = (e) => setNum2(e.target.value);
  const handleOperacionChange = (e) => setOperacion(e.target.value);

  const calcularResultado = async () => {
    if (!num1 || !num2 || !operacion) {
      alert("Por favor, ingresa ambos números y selecciona una operación.");
      return;
    }

    const url = `http://localhost:8080/${operacion}?num1=${num1}&num2=${num2}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setResultado(data);

        // Agregar la operación al historial
        setHistorial(prevHistorial => {
          const nuevaOperacion = `${num1} ${operacion} ${num2} = ${data}`;
          const nuevoHistorial = [nuevaOperacion, ...prevHistorial];
          if (nuevoHistorial.length > 10) {
            nuevoHistorial.pop(); // Mantener solo las últimas 10 operaciones
          }
          return nuevoHistorial;
        });
      } else {
        const errorData = await response.text();
        alert(errorData);
      }
    } catch (error) {
      console.error("Error al calcular", error);
    }
  };

  return (
    <div className="App">
      <h1>Calculadora</h1>
      <div>
        <input
          type="number"
          value={num1}
          onChange={handleNum1Change}
          placeholder="Número 1"
        />
        <input
          type="number"
          value={num2}
          onChange={handleNum2Change}
          placeholder="Número 2"
        />
        <select value={operacion} onChange={handleOperacionChange}>
          <option value="">Selecciona una operación</option>
          <option value="sumar">Sumar</option>
          <option value="restar">Restar</option>
          <option value="multiplicar">Multiplicar</option>
          <option value="dividir">Dividir</option>
        </select>
        <button onClick={calcularResultado}>Calcular</button>
      </div>
      {resultado !== null && (
        <div>
          <h2>Resultado: {resultado}</h2>
        </div>
      )}
      <div className="historial">
        <h2>Historial de Operaciones</h2>
        <ul>
          {historial.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
