/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Button, Col, Form, Input, Row, Select } from "antd";
import "./Style.css";

const NuevaEtiqueta = () => {
  const URLDOS = process.env.REACT_APP_URL;

  const {
    infoEtiquetas,
    colorPicker,
    setColorPicker,
    colorError,
    setColorError,
    setIsDrawerNE,
    selectedModulo,
    setSelectedModulo,
    coloresNoUsados,
    setColoresNoUsados,
    limpieza,
    actualizarData,
    setActualizarData,
  } = useContext(GlobalContext);

  const [form] = Form.useForm();

  const colors = [
    "#117A65",
    "#9B59B6",
    "#E74C3C",
    "#E67E22",
    "#F1C40F",
    "#A04000",
    "#D74561",
    "#5DC1B9",
    "#6AB232",
    "#0351AE",
    "#8C8C8C",
    "#CC0099",
    "#1E91ED",
    "#808000",
    "#F78DA7",
    "#00D084",
    "#800080",
    "#FFA500",
    "#D9FE49",
    "#C0C0C0",
    "#000000",
    "#1ABC9C",
    "#0aa1fb",
    "#27AE60",
    "#6C3483",
    "#FF7F50",
    "#C0392B",
    "#FD7272",
    "#5D6D7A",
    "#FDBC57",
  ];

  const handleColorChange = (color) => {
    setColorPicker(color);
    setColorError(null);
  };

  const nuevaEtiqueta = (value) => {
    if (!colorPicker) {
      setColorError("Debe seleccionar un color.");
      return;
    }

    var selectEt = value.select_modulo;

    var nameEt = value.new_etq_nombre;
    if (nameEt === "" || nameEt === undefined || nameEt === null) {
      nameEt = "";
    }
    var colorEt = colorPicker;

    console.log(
      "Nombre Etiqueta: ",
      nameEt,
      " | Color: ",
      colorEt,
      " | Módulo: ",
      selectEt
    );

    //* FUNCION QUE CARGA LOS DATOS DE UNA NUEVA ETIQUETA
    const data = new FormData();
    data.append("nombreE", nameEt);
    data.append("colorE", colorEt);
    data.append("moduloE", selectEt);
    fetch(`${URLDOS}nuevaEtiqueta.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        console.log(data);
      });
    });

    setColorPicker("");
    form.resetFields();
    nameEt = "";
    setIsDrawerNE(false);
    setActualizarData(!actualizarData);
    setSelectedModulo(null);
    setColoresNoUsados([]);
  };

  const modulos = infoEtiquetas.reduce((acc, modulo) => {
    const { modori_id, modori_desc } = modulo;
    if (!acc.find((item) => item.value === modori_id)) {
      acc.push({ value: modori_id, label: modori_desc });
    }
    return acc;
  }, []);

  const handleModuloChange = (value) => {
    setSelectedModulo(value);
  };

  useEffect(() => {
    if (selectedModulo && infoEtiquetas.length > 0) {
      const coloresUsadosParaModulo = infoEtiquetas
        .filter((tag) => tag.modori_id === selectedModulo)
        .map((tag) => tag.etq_color);
      const coloresNoUsadosParaModulo = colors.filter(
        (color) => !coloresUsadosParaModulo.includes(color)
      );
      setColoresNoUsados(coloresNoUsadosParaModulo);

      //   console.log("coloresUsados: ", coloresUsadosParaModulo);
      //   console.log("coloresNoUsados: ", coloresNoUsadosParaModulo);
    }
  }, [selectedModulo, infoEtiquetas]);

  useEffect(() => {
    form.resetFields();
  }, [limpieza]);

  const style =
    selectedModulo !== null
      ? { marginTop: "190px", marginBottom: "-75px" }
      : { marginTop: "25px", marginBottom: "-5px" };


      const buttonStyle = colorError ? { marginTop: "-350px !important", width: "351px" } : {marginTop: "100px", width: "351px" };

  return (
    <>
      <div className="divForm">
        <Form
          layout="vertical"
          form={form}
          onFinish={nuevaEtiqueta}
          requiredMark={false}
        >
          <Row>
            <Col xs={19}>
              <Form.Item
                name="select_modulo"
                label="Módulo"
                rules={[
                  {
                    required: true,
                    message: "Debe seleccionar un módulo.",
                  },
                ]}
              >
                <Select onChange={handleModuloChange} defaultValue="default">
                  <Select.Option value="default" disabled>
                    SELECCIONE MODULO
                  </Select.Option>
                  {modulos.map((modulo) => (
                    <Select.Option key={modulo.value} value={modulo.value}>
                      {modulo.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]} align="bottom">
            <Col xs={19}>
              <Form.Item
                name="select_color"
                validateStatus={colorError ? "error" : ""}
                help={colorError || ""}
                style={{ marginTop: "-20px" }}
              >
                <>
                  <p className="titleP">Seleccione un color:</p>
                  <div className="custom-color-picker">
                    <div className="color-picker-panel">
                      <div className="color-grid">
                        {coloresNoUsados.map((color) => (
                          <div
                            key={color}
                            className="color-grid-item"
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorChange(color)}
                          />
                        ))}
                      </div>
                      <div className="error-message">{colorError}</div>
                      <div
                        className="selected-color"
                        style={{ backgroundColor: colorPicker }}
                      />
                    </div>
                  </div>
                </>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]} align="bottom">
            <Col xs={19}>
              <Form.Item
                name="new_etq_nombre"
                label="Nombre"
                rules={[
                  {
                    required: true,
                    message: "Debe ingresar nombre de etiqueta.",
                  },
                ]}
                style={style}
              >
                <>
                  <div
                    className="tag_wrapper"
                    style={{
                      background: colorPicker,
                      width: 280,
                      border: "1px solid #e8e8e8",
                      borderRadius: "4px",
                    }}
                  >
                    <Input
                      placeholder="INGRESE UN NOMBRE"
                      defaultValue={""}
                      style={{
                        background: "transparent",
                        color: "white",
                        border: "none",
                        outline: "none",
                      }}
                    />
                  </div>
                </>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
              <Button
                type="primary"
                htmlType="submit"
                //style={{ marginTop: "120px", width: "351px" }}
                style={{ ...buttonStyle }}
              >
                GUARDAR
              </Button>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default NuevaEtiqueta;
