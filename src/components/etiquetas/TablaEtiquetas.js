/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import "./Style.css";
import { Table, Space, /*Tag,*/ Button, Drawer, Spin, Popconfirm } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  CloseOutlined
} from "@ant-design/icons";
import NuevaEtiqueta from "./NuevaEtiqueta";
import EditarEtiqueta from "./EditarEtiqueta";
import { GlobalContext } from "../context/GlobalContext";
import { Tag } from "../utils/CardBrightness";
import FormGrupo from "../grupos/FormGrupo";

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
    actualizarData,
    setActualizarData,
    setInfoEditarEtiqueta,
    drawerGrupo, setDrawerGrupo
  } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(true);

  //Grupos de etiquetas
  const [dataGrupos, setDataGrupos] = useState();
  const [nuevoGrupoLabel, setNuevoGrupoLabel] = useState(true);
  const [grupo, setGrupo] = useState(0);



  const showDrawerNE = () => {
    setIsDrawerNE(true);
  };

  const closeDrawerNE = () => {
    setIsDrawerNE(false);
    // setLimpieza(!limpieza);
  };

  const showDrawerEE = (record) => {
    setIsDrawerEE(true);
    setInfoEditarEtiqueta(record);
  };

  const closeDrawerEE = () => {
    setIsDrawerEE(false);
    setInfoEditarEtiqueta(null);
  };


  const CustomCloseIcon = () => (
    <div className="drawer-close-icon">
      <CloseOutlined />
    </div>
  );

  const fetchDataGrupos = async () => {

    const dataForm = new FormData();

    const requestOptions = {
      method: 'POST',
      body: dataForm
    };
    const data = await fetch(`${URLDOS}gruposEtiquetas.php`, requestOptions);
    const jsonData = await data.json();
    setDataGrupos(jsonData);
    //console.log('dataGrupos', jsonData)
  };

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

        objetoData.sort((a, b) => b.etq_id - a.etq_id);

        setInfoEtiquetas(objetoData);
        //console.log(objetoData)
        setIsLoading(false); // Establecer isLoading en false después de recibir la respuesta
      });
    });
  };

  useEffect(() => {
    if (idUsu) {
      fetchDataGrupos();
      cargarTablaEtiqueta();
    }
  }, [idUsu, actualizarData]);

  const modulosUnicos = [...new Set(infoEtiquetas.map((c) => c.modori_desc))];
  const moduloFilters = modulosUnicos.map((modulo) => ({
    text: modulo,
    value: modulo,
  }));

  const eliminarEtiqueta = (etiqueta) => {
    const data = new FormData();
    data.append("idE", etiqueta.key);
    data.append("idM", etiqueta.modori_id);
    fetch(`${URLDOS}eliminarEtiqueta.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
      });
    });

    setActualizarData(!actualizarData);
  };


  const eliminarGrupo = async (grupo) => {

    const data = new FormData();
    data.append("idGrupoE", grupo.key);

    const requestOptions = {
        method: 'POST',
        body: data
    };

    const response = await fetch(`${URLDOS}etiquetas_eliminarGrupo.php`, requestOptions);
    console.log(response)
    setActualizarData(!actualizarData);
};




  const columns = [
    {
      title: 'Grupo',
      dataIndex: 'nombreGrupo',
      key: 'nombreGrupo',
    },
    {
      title: 'Cantidad',
      //dataIndex: 'cantidad',
      align: "center",
      key: 'cantidad',
      render: (text, record) => (
        <div style={{ cursor: "default" }}>{infoEtiquetas?.filter((etiqueta) => etiqueta.idGrupoE === record.key).length > 0 ? infoEtiquetas?.filter((etiqueta) => etiqueta.idGrupoE === record.key).length : 0}
        </div>
      ),
    },
    {
      title: "...",
      key: "acciones",
      align: "center",
      render: (fila) => {
        return (
          <>
            {fila.key ? <Space size="middle">
              <EditOutlined onClick={() => seleccionarGrupo(fila, 'editar')} />

              <Popconfirm
                title={
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: 250,
                      gap: 4,
                    }}
                  >
                    <label>¿Deseas eliminar este grupo?</label>
                    <div style={{ marginLeft: "-22px" }}>
                      <InfoCircleOutlined
                        style={{ color: "red", marginRight: "9px" }}
                      />
                      <span style={{ color: "red", fontWeight: "500" }}>
                        Solo se eliminará el grupo, todas las etiquetas que este contiene pasarán a 'Sin asignar'.
                      </span>
                    </div>
                  </div>
                }
                okText="Borrar"
                cancelText="Cerrar"
                onConfirm={() => eliminarGrupo(fila)}
                placement="left"
              >
                <Button type="link" style={{ padding: "0px", margin: "0px" }}>
                  <DeleteOutlined style={{ color: "black" }} />
                </Button>
              </Popconfirm>
            </Space> : ''}

          </>
        );
      },
    }
  ]


  const childColumns = [
    {
      title: "Etiqueta",
      dataIndex: "etiqueta",
      key: "etiqueta",
      render: (text, record) => (
        <div style={{ cursor: "default" }}>
          <Tag hex={record?.etq_color} nombre={text?.toUpperCase()} />
        </div>
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
        <div style={{ display: "flex", justifyContent: "center", cursor: "default" }} >
          <Tag hex={record?.modori_color} nombre={text?.toUpperCase()} />
        </div>
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
            title={
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: 250,
                  gap: 4,
                }}
              >
                <label>¿Deseas eliminar esta etiqueta?</label>
                <div style={{ marginLeft: "-22px" }}>
                  <InfoCircleOutlined
                    style={{ color: "red", marginRight: "9px" }}
                  />
                  <span style={{ color: "red", fontWeight: "500" }}>
                    Si la etiqueta se encuentra asociada a algún objeto se
                    eliminará la asociación.
                  </span>
                </div>
              </div>
            }
            okText="Borrar"
            cancelText="Cerrar"
            onConfirm={() => eliminarEtiqueta(record)}
            placement="left"
          >
            <Button type="link" style={{ padding: "0px", margin: "0px" }}>
              <DeleteOutlined style={{ color: "red" }} />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];


  //Asigna el valor de la fila al presionar editar
  const seleccionarGrupo = (fila, accion) => {

    if (accion === 'crear') {
      setGrupo(null);
      setNuevoGrupoLabel(true);
      setDrawerGrupo(true);
      return;
    };
    //console.log('fila',fila)
    setGrupo(fila);
    if (accion === 'editar') {
      setNuevoGrupoLabel(false);
      setDrawerGrupo(true);
    };
    // if (accion === 'verDetalle') {
    //     setOpen(true);
    //     fetchEtiquetasxContactos(fila.key);
    // };
    // if (accion == 'clientesAsoc') {
    //     setOpenClientes(true);
    //     fetchDataClientesAsoc(fila.key);
    // };
    // if (accion === 'etiqueta') {
    //     setDrawerEtiquetas(true);
    //     fetchEtiquetasxContactos(fila.key);
    // };
  };

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
            <div style={{ display: "flex", gap: "8px" }}>
              <Button
                type="primary"
                //style={{ padding: "0px", marginLeft: "10px" }}
                onClick={() => seleccionarGrupo('crear', 'crear')}
              >
                NUEVO GRUPO
              </Button>
              <Button
                type="primary"
                //style={{ padding: "0px", marginLeft: "10px" }}
                onClick={showDrawerNE}
              >
                NUEVA ETIQUETA
              </Button>
            </div>

          </div>


          {/* TABLA NUEVA */}
          <Table
            columns={columns}
            expandable={{
              expandedRowRender: (record) => {
                //if (record.key == 1){
                return (
                  <Table
                    columns={childColumns}

                    dataSource={
                      (infoEtiquetas.filter((c) => c.idGrupoE == record.key)).map((c) => ({
                        key: c.etq_id,
                        etiqueta: c.etq_nombre?.toUpperCase(),
                        modulo: c.modori_desc?.toUpperCase(),
                        etq_color: c.etq_color,
                        modori_color: c.modori_color,
                        modori_id: c.modori_id,
                      }))
                    }
                    pagination={{
                      defaultPageSize: 5
                    }}

                  />
                );
                //}
              },
              defaultExpandedRowKeys: ['0'],
            }}
            dataSource={dataGrupos}

          />



          {/* DRAWERS */}
          <Drawer
            title="Nueva Etiqueta"
            open={isDrawerNE}
            onClose={closeDrawerNE}
            width={400}
            destroyOnClose
            closeIcon={<CustomCloseIcon />}
          >
            <NuevaEtiqueta />
          </Drawer>
          <Drawer
            title="Editar Etiqueta"
            open={isDrawerEE}
            onClose={closeDrawerEE}
            destroyOnClose
            width={400}
            closeIcon={<CustomCloseIcon />}
          >
            <EditarEtiqueta />
          </Drawer>



          <Drawer
            title={nuevoGrupoLabel ? "Nuevo Grupo" : "Editar Grupo"}
            open={drawerGrupo}
            onClose={() => setDrawerGrupo(false)}
            width={400}
            closeIcon={<CustomCloseIcon />}
            destroyOnClose={true}
          >
            <FormGrupo editarGrupoValues={grupo} etiquetasGrupo={infoEtiquetas} />
          </Drawer>
        </div>
      )}
    </>
  );
};

export default TablaEtiquetas;
