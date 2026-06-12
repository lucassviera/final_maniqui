import { useState, useEffect } from 'react';

function App() {
  // 1. Estado para las opciones del JSON
  const [opciones, setOpciones] = useState(null);
  
  // 2. Estado para la configuración del maniquí actual (separado por cada parte)
  const [configuracion, setConfiguracion] = useState({
    cabeza: '',
    torso: '',
    extremidades: '',
    material: '',
    color: '',
    numeroSerie: ''
  });

  // 3. Arreglo para acumular los maniquíes guardados
  const [listaManiquies, setListaManiquies] = useState([]);

  // Cargar los datos del JSON al montar el componente
  useEffect(() => {
    fetch('/opciones.json')
      .then(res => res.json())
      .then(data => {
        setOpciones(data);
        // Inicializamos cada select con la primera opción de sus respectivos arreglos
        setConfiguracion({
          cabeza: data.cabezas[0].nombre,
          torso: data.torsos[0].nombre,
          extremidades: data.extremidades[0].nombre,
          material: data.materiales[0].nombre,
          color: data.colores[0].nombre,
          numeroSerie: 'MNQ-' + Math.floor(1000 + Math.random() * 9000)
        });
      })
      .catch(err => console.error("Error cargando el JSON:", err));
  }, []);

  // Manejar los cambios en cualquiera de los menús desplegables
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfiguracion(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Guardar el maniquí actual en la lista
  const handleGuardar = () => {
    setListaManiquies(prevLista => [...prevLista, configuracion]);

    // Generamos un nuevo número de serie para el próximo diseño
    setConfiguracion(prev => ({
      ...prev,
      numeroSerie: 'MNQ-' + Math.floor(1000 + Math.random() * 9000)
    }));
  };

  if (!opciones) return <p style={{ padding: '20px' }}>Cargando configurador anatómico...</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ borderBottom: '2px solid #eaeaea', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1>Diseñador de Maniquíes Avanzado</h1>
        <p style={{ color: '#666' }}>Configuración anatómica, materiales y colores</p>
      </header>
      
      <div style={{ display: 'flex', gap: '30px', marginBottom: '40px' }}>
        
        {/* COLUMNA IZQUIERDA: FORMULARIO */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h3>Anatomía y Estilo:</h3>
          
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Cabeza:</label>
            <select name="cabeza" value={configuracion.cabeza} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
              {opciones.cabezas.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Torso:</label>
            <select name="torso" value={configuracion.torso} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
              {opciones.torsos.map(t => <option key={t.id} value={t.nombre}>{t.nombre}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Extremidades:</label>
            <select name="extremidades" value={configuracion.extremidades} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
              {opciones.extremidades.map(e => <option key={e.id} value={e.nombre}>{e.nombre}</option>)}
            </select>
          </div>

          <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '10px 0' }} />
          <h3>Acabado:</h3>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Material:</label>
            <select name="material" value={configuracion.material} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
              {opciones.materiales.map(m => <option key={m.id} value={m.nombre}>{m.nombre}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Color / Acabado:</label>
            <select name="color" value={configuracion.color} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
              {opciones.colores.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
            </select>
          </div>

          <button 
            onClick={handleGuardar} 
            style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '15px' }}
          >
            Guardar Configuración
          </button>
        </div>

        {/* COLUMNA DERECHA: VISTA PREVIA */}
        <div style={{ flex: 1, background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3>Especificaciones Técnicas</h3>
            <p><strong>Nro. de Serie:</strong> <code style={{ background: '#e0e0e0', padding: '3px 6px', borderRadius: '4px' }}>{configuracion.numeroSerie}</code></p>
            
            <div style={{ marginTop: '20px', backgroundColor: '#fff', padding: '15px', borderRadius: '6px', border: '1px solid #eee' }}>
              <p style={{ margin: '8px 0' }}><strong>Tipo de Cabeza:</strong> {configuracion.cabeza}</p>
              <p style={{ margin: '8px 0' }}><strong>Tipo de Torso:</strong> {configuracion.torso}</p>
              <p style={{ margin: '8px 0' }}><strong>Extremidades:</strong> {configuracion.extremidades}</p>
              <p style={{ margin: '8px 0' }}><strong>Material base:</strong> {configuracion.material}</p>
              <p style={{ margin: '8px 0' }}><strong>Color final:</strong> {configuracion.color}</p>
            </div>
          </div>

          <div style={{ marginTop: '20px', textAlign: 'center', padding: '15px', background: '#e9ecef', borderRadius: '4px', fontStyle: 'italic', color: '#495057' }}>
            🤖 Maniquí: {configuracion.torso} ({configuracion.cabeza}) con extremidades de {configuracion.extremidades}.
          </div>
        </div>

      </div>

      {/* TABLA DE ELEMENTOS GUARDADOS */}
      <hr style={{ border: '0', borderTop: '2px solid #eaeaea', margin: '40px 0 20px 0' }} />
      
      <div>
        <h3>Historial de Maniquíes Creados</h3>
        {listaManiquies.length === 0 ? (
          <p style={{ color: '#888', fontStyle: 'italic' }}>No hay maniquíes guardados en el arreglo del estado.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Nro. Serie</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Cabeza</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Torso</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Extremidades</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Material</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Color</th>
              </tr>
            </thead>
            <tbody>
              {listaManiquies.map((m, index) => (
                <tr key={index}>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}><code>{m.numeroSerie}</code></td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{m.cabeza}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{m.torso}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{m.extremidades}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{m.material}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{m.color}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}

export default App;