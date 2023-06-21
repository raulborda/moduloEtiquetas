import React, { useState } from "react";
import "./Style.css";
import { Divider, Table, Space, Tag, Button, Drawer } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import NuevaEtiqueta from "./NuevaEtiqueta";
import EditarEtiqueta from "./EditarEtiqueta";

const TablaEtiquetas = () => {
  const [isDrawerNE, setIsDrawerNE] = useState(false); // NE = NUEVA ETIQUETA
  const [isDrawerEE, setIsDrawerEE] = useState(false); // EE = EDITAR ETIQUETA

  const showDrawerNE = () => {
    setIsDrawerNE(true);
  };

  const closeDrawerNE = () => {
    setIsDrawerNE(false);
  };

  const showDrawerEE = (record) => {
    setIsDrawerEE(true);
    console.log("Editar " + record.key + " " + record.etiqueta)
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

  const columns = [
    {
      title: "Etiqueta",
      dataIndex: "etiqueta",
      key: "etiqueta",
      render: (text) => text,
    },
    {
      title: "Módulo",
      dataIndex: "modulo",
      key: "modulo",
    },
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
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
  const data = [
    {
      key: "1",
      etiqueta: "IMPORTANTE",
      modulo: "NOTAS",
      //tags: ["nice", "developer"],
    },
    {
      key: "2",
      etiqueta: "MAIZ",
      modulo: "NEGOCIOS",
    },
    {
      key: "3",
      etiqueta: "CONSECUENTE",
      modulo: "CLIENTES",
    },
  ];

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
      <Table columns={columns} dataSource={data} />
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
