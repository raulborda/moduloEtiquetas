import React from "react";
import "./Style.css";
import { Divider, Table, Space, Tag, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

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
          <EditOutlined style={{color:"#56b43c"}} onClick={() => console.log("Editar " + (record.key) +" "+ (record.etiqueta))}/>
          <DeleteOutlined style={{color:"red"}} onClick={() => console.log("Eliminar " + (record.key) +" "+ (record.etiqueta))}/>
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
              onClick={() => console.log("Open drawer new")}
            >
              Nueva Etiqueta
            </Button>
      </div>
      <Divider style={{ marginTop: "-5px" }} />
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default TablaEtiquetas;
