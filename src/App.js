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

  return (
    <GlobalContext.Provider
      value={{
        idUsu,
        setUsu,
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
