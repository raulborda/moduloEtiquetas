import React from "react";
import "./Style.css";
import { Divider, Table, Space, Tag } from "antd";

const TablaEtiquetas = () => {
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
          <a>Editar</a>
          <a>Eliminar</a>
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
      </div>
      <Divider style={{ marginTop: "-5px" }} />
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default TablaEtiquetas;
