import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Button, Col, Form, Input, Row } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { Tag } from "../utils/CardBrightness";
import { colors } from "../utils/colores";


const EditarEtiqueta = () => {
  const URLDOS = process.env.REACT_APP_URL;

  const [etiquetas, setEtiquetas] = useState([]);
  const [colorPicker, setColorPicker] = useState();
  const [coloresNoUsados, setColoresNoUsados] = useState([]);
  //const [colorError, setColorError] = useState(null);

  const [selectedModulo, setSelectedModulo] = useState(null);


  const handleColorChange = (color) => {
    setColorPicker(color);
    //setColorError(null);
  };


  const {
    infoEditarEtiqueta,
    setIsDrawerEE,
    setInfoEditarEtiqueta,
    setActualizarData,
    actualizarData,
    idUsu
  } = useContext(GlobalContext);

  const [form] = Form.useForm();

  const onFinish = (value) => {
    // console.log('onFinishValues', value)
    // console.log('colorPicker', colorPicker)
    // console.log('infoEditarEtiqueta', infoEditarEtiqueta)
    // FUNCION PARA EDITAR LOS DATOS DE UNA ETIQUETA
    const data = new FormData();
    data.append("nombreE", value.etq_nombre);
    data.append("idE", infoEditarEtiqueta.key);

    data.append("colorEtiqueta", colorPicker ? colorPicker : infoEditarEtiqueta.etq_color);

    fetch(`${URLDOS}editarEtiqueta.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
      });
    });

    setActualizarData(!actualizarData);
    form.resetFields();
    setInfoEditarEtiqueta(null);
    setIsDrawerEE(false);
  };


  useEffect(() => {
    //if (selectedModulo && etiquetas.length > 0) {
    const coloresUsadosParaModulo = etiquetas
      .filter((tag) => tag.modori_id === selectedModulo)
      .map((tag) => tag.etq_color);
    const coloresNoUsadosParaModulo = colors.filter(
      (color) => !coloresUsadosParaModulo.includes(color)
    );
    setColoresNoUsados(coloresNoUsadosParaModulo);
    //}
  }, [selectedModulo, etiquetas]);

  // const cargarEtiquetas = () => {
  //   const data = new FormData();
  //   data.append("idU", idUsu);
  //   fetch(`${URLDOS}selectEtiquetas.php`, {
  //     method: "POST",
  //     body: data,
  //   }).then(function (response) {
  //     response.text().then((resp) => {
  //       const data = resp;
  //       const objetoData = JSON.parse(data);

  //       setEtiquetas(objetoData);
  //       //setIsLoading(false); // Establecer isLoading en false después de recibir la respuesta
  //     });
  //   });
  // };

  return (
    <>
      {infoEditarEtiqueta && (
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          requiredMark={false}
          initialValues={{
            ["etq_nombre"]: infoEditarEtiqueta.etiqueta
          }}
        >
          <Row >
            <Col xs={20} sm={20} md={20}>

              {/* <Form.Item
                name="etq_nombre"
                label="Nombre"
                rules={[
                  {
                    required: true,
                    message: "Debe ingresar/modificar nombre de etiqueta.",
                  },
                ]}
              > */}
              <div>
                {/* <div
                    className="tag_wrapper"
                    style={{
                      background: infoEditarEtiqueta.etq_color,
                      height: 26,
                      width: 220,
                      border: "1px solid #e8e8e8",
                      borderRadius: "4px",
                    }}
                  >
                    <Input
                      size="small"
                      placeholder=""
                      defaultValue={infoEditarEtiqueta.etiqueta}
                      style={{
                        background: "transparent",
                        color: "white",
                        border: "none",
                        outline: "none",
                        paddingTop: "2px",
                      }}
                    /> */}
                <Tag hex={ colorPicker ? colorPicker : infoEditarEtiqueta.etq_color} tipo={'modificar'} defaultValue={infoEditarEtiqueta.etiqueta} />

                {/* </div> */}
              </div>
              {/* </Form.Item> */}
            </Col>
            <Col xs={4} sm={4} md={4} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Button
                type="link"
                htmlType="submit"
                icon={<CheckOutlined style={{ color: "#56b43c" }} />}
                //style={{ margin: "5px 0px 0px 10px" }}
              />
            </Col>
          </Row>
          <Col>
            <Form.Item
              name="select_color"
              //validateStatus={colorError ? "error" : ""}
              label="Seleccione un color"
            >
              <div className="custom-color-picker">
                <div className="color-picker-panel">
                  <div className="color-grid">
                    {coloresNoUsados?.map((color) => (
                      <div
                        key={color}
                        className="color-grid-item"
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorChange(color)}
                      />
                    ))}
                  </div>
                  {/* <div className="error-message">{colorError}</div> */}
                  <div
                    className="selected-color"
                    style={{ backgroundColor: colorPicker }}
                  />
                </div>
              </div>
            </Form.Item>
          </Col>
        </Form>
      )}
    </>
  );
};

export default EditarEtiqueta;