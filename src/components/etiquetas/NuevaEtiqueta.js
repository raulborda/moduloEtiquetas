import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import "./Style.css";

const NuevaEtiqueta = () => {
  const { idUsu, isDrawerNE, setIsDrawerNE, infoEtiquetas, setInfoEtiquetas, colorPicker, setColorPicker, colorError, setColorError} =
    useContext(GlobalContext);

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

  var coloresUsados = [];

  infoEtiquetas.map((tag) => {
    const { etq_color } = tag;
    coloresUsados.push(etq_color);
  });

  const coloresNoUsados = colors.filter(
    (value) => !coloresUsados.includes(value)
  );

  const handleColorChange = (color) => {
    setColorPicker(color);
    setColorError(null);
  };

  const nuevaEtiqueta = (value) => {
    if (!colorPicker) {
      setColorError("Debe seleccionar un color.");
      return;
    }

    //setShowNewTag(false);

    var nameEt = value.new_etq_nombre;
    if (nameEt === "" || nameEt === undefined || nameEt === null) {
      nameEt = "";
    }
    var colorEt = colorPicker;

    console.log("Nombre Etiqueta: ", nameEt, " | Color: ", colorEt);

    // newEtiquetaResolver({
    //   variables: {
    //     etiquetaInput: { etq_nombre: nameEt, etq_color: colorEt, modori_id: 3 },
    //   },
    // });

    setColorPicker("");
    form.resetFields();
    nameEt = "";
  };

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
                    <Select>

                    </Select>
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
              >
                <div
                  className="tag_wrapper"
                  style={{
                    background: colorPicker,
                    width: 280,
                    border: "1px solid #e8e8e8",
                    borderRadius:"4px"
                  }}
                >                
                  <Input
                    placeholder=""
                    defaultValue={""}
                    style={{
                      background: "transparent",
                      color: "white",
                      border: "none",
                      outline: "none",
                    }}
                  />
                </div>
              </Form.Item>
            </Col>
            <Col xs={5}>
              <Button
                type="link"
                htmlType="submit"
                icon={<CheckOutlined />}
                style={{ marginBottom: 24, marginLeft: 41 }}
              ></Button>
            </Col>
          </Row>
          <Row gutter={[8, 8]} align="bottom">
            <Col xs={19}>
              <Form.Item
                name="select_color"
                validateStatus={colorError ? "error" : ""}
                help={colorError || ""}
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
          {/* <Row gutter={[8, 8]} align="bottom">
                  <div className="error-message">{colorError}</div>
                </Row> */}
        </Form>
      </div>
    </>
  );
};

export default NuevaEtiqueta;
