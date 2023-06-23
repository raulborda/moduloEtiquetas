/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "./Style.css";
import {
  Divider,
  Table,
  Space,
  Tag,
  Button,
  Drawer,
  Spin,
  Popconfirm,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
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
    setColorPicker,
    setColorError,
    setSelectedModulo,
    setColoresNoUsados,
    limpieza,
    setLimpieza,
    actualizarData,
    setActualizarData,
    setInfoEditarEtiqueta,
  } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(true);

  const showDrawerNE = () => {
    setIsDrawerNE(true);
  };

  const closeDrawerNE = () => {
    setIsDrawerNE(false);
    setColorPicker("");
    setColorError(null);
    setSelectedModulo(null);
    setColoresNoUsados([]);
    setLimpieza(!limpieza);
  };

  const showDrawerEE = (record) => {
    setIsDrawerEE(true);
    setInfoEditarEtiqueta(record);
  };

  const closeDrawerEE = () => {
    setIsDrawerEE(false);
    setInfoEditarEtiqueta(null);
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
  }, [idUsu, isLoading, actualizarData]);

  //console.log(infoEtiquetas);

  const modulosUnicos = [...new Set(infoEtiquetas.map((c) => c.modori_desc))];
  const moduloFilters = modulosUnicos.map((modulo) => ({
    text: modulo,
    value: modulo,
  }));

  const eliminarEtiqueta = (etiqueta) => {
    //console.log("Se elimino etiqueta: ", etiqueta);
    const data = new FormData();
    data.append("idE", etiqueta.key);
    data.append("idM", etiqueta.modori_id);
    fetch(`${URLDOS}eliminarEtiqueta.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        console.log(data);
      });
    });

    setActualizarData(!actualizarData);

  };

  const columns = [
    {
      title: "Etiqueta",
      dataIndex: "etiqueta",
      key: "etiqueta",
      render: (text, record) => (
        <>
          <Tag
            color={record.etq_color}
            key={text}
            style={{ fontWeight: "bold", paddingTop: "2px" }}
          >
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
          <Tag
            color={record.modori_color}
            key={text}
            style={{ fontWeight: "bold", paddingTop: "2px" }}
          >
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

          <Popconfirm
            style={{ width: 200 }}
            title={
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label>¿Deseas eliminar esta nota?</label>
                <div style={{ marginLeft: "-22px" }}>
                  <InfoCircleOutlined
                    style={{ color: "red", marginRight: "9px" }}
                  />
                  <span style={{ color: "red", fontWeight: "500" }}>
                    Si la etiqueta se encuentra asociada a algún objeto se
                    eliminará la asociación
                  </span>
                </div>
              </div>
            }
            okText="Borrar"
            cancelText="Cerrar"
            onConfirm={() => eliminarEtiqueta(record)}
            placement="left"
          >
            <Button type="link">
              <DeleteOutlined style={{ color: "red" }} />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const data = infoEtiquetas.map((c) => ({
    key: c.etq_id,
    etiqueta: c.etq_nombre.toUpperCase(),
    modulo: c.modori_desc.toUpperCase(),
    etq_color: c.etq_color,
    modori_color: c.modori_color,
    modori_id:c.modori_id,
  }));

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
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
          <Table columns={columns} dataSource={data} size="small" />

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
            width={300}
            closeIcon={<CustomCloseIcon />}
          >
            <EditarEtiqueta />
          </Drawer>
        </div>
      )}
    </>
  );
};

export default TablaEtiquetas;
