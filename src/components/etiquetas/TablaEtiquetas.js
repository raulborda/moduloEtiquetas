import React, { useContext, useEffect, useState } from "react";
import "./Style.css";
import { Divider, Table, Space, Tag, Button, Drawer } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import NuevaEtiqueta from "./NuevaEtiqueta";
import EditarEtiqueta from "./EditarEtiqueta";
import { GlobalContext } from "../context/GlobalContext";

const TablaEtiquetas = () => {
  const URLDOS = process.env.REACT_APP_URL;

  const {
    idUsu,
    isDrawerNE,
    setIsDrawerNE,
    isDrawerEE,
    setIsDrawerEE,
    infoEtiquetas,
    setInfoEtiquetas,
  } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(true);

  const showDrawerNE = () => {
    setIsDrawerNE(true);
  };

  const closeDrawerNE = () => {
    setIsDrawerNE(false);
  };

  const showDrawerEE = (record) => {
    setIsDrawerEE(true);
    console.log("Editar " + record.key + " " + record.etiqueta);
  };

  const closeDrawerEE = () => {
    setIsDrawerEE(false);
  };

  const closeIconStyle = {
    position: "absolute",
    top: "18px",
    right: "20px",
  };

  const CustomCloseIcon = ({ onClick }) => (
    <div style={closeIconStyle} onClick={onClick}>
      X
    </div>
  );

  const cargarTablaEtiqueta = () => {
    setIsLoading(true); // Establecer isLoadingTI en true antes de hacer la solicitud
    const data = new FormData();
    data.append("idU", idUsu);
    fetch(`${URLDOS}tablaEtiquetas.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setInfoEtiquetas(objetoData);
        setIsLoading(false); // Establecer isLoading en false después de recibir la respuesta
      });
    });
  };

  useEffect(() => {
    if (idUsu) {
      cargarTablaEtiqueta();
    }
  }, [idUsu]);

  console.log(infoEtiquetas);

  const modulosUnicos = [...new Set(infoEtiquetas.map((c) => c.modori_desc))];
  const moduloFilters = modulosUnicos.map((modulo) => ({
    text: modulo,
    value: modulo,
  }));

  const columns = [
    {
      title: "Etiqueta",
      dataIndex: "etiqueta",
      key: "etiqueta",
      render: (text, record) => (
        <>
          <Tag color={record.etq_color} key={text} style={{ fontWeight: "bold" }}>
            {text.toUpperCase()}
          </Tag>
          
        </>
      ),
    },
    {
      title: "Módulo",
      dataIndex: "modulo",
      key: "modulo",
      align: "center",
      filters: moduloFilters,
      onFilter: (value, record) => record.modulo === value,
      render: (text, record) => (
        <>
          <Tag color={record.modori_color} key={text} style={{ fontWeight: "bold" }}>
            {text.toUpperCase()}
          </Tag>
          
        </>
      ),
    },
    {
      title: "...",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "#56b43c" }}
            onClick={() => showDrawerEE(record)}
          />
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={() =>
              console.log("Eliminar " + record.key + " " + record.etiqueta)
            }
          />
        </Space>
      ),
    },
  ];
  const data = infoEtiquetas.map((c) => ({
    key: c.etq_id,
    etiqueta: c.etq_nombre.toUpperCase(),
    modulo: c.modori_desc.toUpperCase(),
    etq_color: c.etq_color,
    modori_color:c.modori_color,
  }));

  return (
    <div className="div_wrapper">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h1 className="titulos">ETIQUETAS</h1>
        <Button
          type="primary"
          style={{ width: "110px", padding: "0px", marginLeft: "10px" }}
          onClick={showDrawerNE}
        >
          Nueva Etiqueta
        </Button>
      </div>

      <Divider style={{ marginTop: "-5px" }} />

      {/* TABLA */}
      <Table columns={columns} dataSource={data} />

      {/* DRAWERS */}
      <Drawer
        title="Nueva Etiqueta"
        open={isDrawerNE}
        onClose={closeDrawerNE}
        width={400}
        closeIcon={<CustomCloseIcon />}
      >
        <NuevaEtiqueta />
      </Drawer>
      <Drawer
        title="Editar Etiqueta"
        open={isDrawerEE}
        onClose={closeDrawerEE}
        width={400}
        closeIcon={<CustomCloseIcon />}
      >
        <EditarEtiqueta />
      </Drawer>
    </div>
  );
};

export default TablaEtiquetas;
