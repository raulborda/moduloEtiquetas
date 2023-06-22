import { useState } from 'react';
import { GlobalContext } from "./components/context/GlobalContext";
import esES from "antd/lib/locale/es_ES";
import './App.css';
import { ConfigProvider } from 'antd';
import TablaEtiquetas from './components/etiquetas/TablaEtiquetas';

function App() {

  //const idU = localStorage.getItem("usuario");
  const idU = 1;
  const [idUsu, setUsu] = useState(idU);

  //States para Drawers
  const [isDrawerNE, setIsDrawerNE] = useState(false); // NE = NUEVA ETIQUETA
  const [isDrawerEE, setIsDrawerEE] = useState(false); // EE = EDITAR ETIQUETA

  //State Info tabla etiquetas
  const [infoEtiquetas, setInfoEtiquetas] = useState([]);

  //States de Nueva Etiqueta
  const [colorPicker, setColorPicker] = useState("");
  const [colorError, setColorError] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        idUsu,setUsu,
        isDrawerNE, setIsDrawerNE,
        isDrawerEE, setIsDrawerEE,
        infoEtiquetas, setInfoEtiquetas,
        colorPicker, setColorPicker,
        colorError, setColorError,
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
