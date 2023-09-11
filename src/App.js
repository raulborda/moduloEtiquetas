import { useState } from 'react';
import { GlobalContext } from "./components/context/GlobalContext";
import esES from "antd/lib/locale/es_ES";
import './App.css';
import { ConfigProvider } from 'antd';
import TablaEtiquetas from './components/etiquetas/TablaEtiquetas';

function App() {

  const idU = localStorage.getItem("usuario");
  //const idU = 1;
  const [idUsu, setUsu] = useState(idU);

  //States para Drawers
  const [isDrawerNE, setIsDrawerNE] = useState(false); // NE = NUEVA ETIQUETA
  const [isDrawerEE, setIsDrawerEE] = useState(false); // EE = EDITAR ETIQUETA

  //State Info tabla etiquetas
  const [infoEtiquetas, setInfoEtiquetas] = useState([]);

  //Para refrescar cuando se crea o edita una etiqueta
  const [actualizarData, setActualizarData] = useState(false);

  //States de Editar Etiqueta
  const [infoEditarEtiqueta, setInfoEditarEtiqueta] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        idUsu,setUsu,
        isDrawerNE, setIsDrawerNE,
        isDrawerEE, setIsDrawerEE,
        infoEtiquetas, setInfoEtiquetas,
        actualizarData, setActualizarData,
        infoEditarEtiqueta, setInfoEditarEtiqueta,
      }}
    >
      <ConfigProvider
        locale={esES}
        theme={{
          token: {
            colorPrimary: "#56b43c",
          },
        }}
      >
        <TablaEtiquetas/>
      </ConfigProvider>
    </GlobalContext.Provider>
  );
}

export default App;
