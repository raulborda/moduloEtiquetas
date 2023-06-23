import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Button, Col, Form, Input, Row } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const EditarEtiqueta = () => {
  const URLDOS = process.env.REACT_APP_URL;

  const { infoEditarEtiqueta, setIsDrawerEE, setInfoEditarEtiqueta, setActualizarData, actualizarData} =
    useContext(GlobalContext);

  const [form] = Form.useForm();

  const onFinish = (value) => {
    //console.log("VALORES A ENVIAR PARA UPDATE: ", infoEditarEtiqueta.key, " | ", value.etq_nombre);

    //* FUNCION PARA EDITAR LOS DATOS DE UNA ETIQUETA
    const data = new FormData();
    data.append("nombreE", value.etq_nombre);
    data.append("idE", infoEditarEtiqueta.key);
    fetch(`${URLDOS}editarEtiqueta.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        console.log(data);
      });
    });

    setIsDrawerEE(false);
    form.resetFields();
    setInfoEditarEtiqueta(null);
    setActualizarData(!actualizarData);
  };

  return (
    <>
      {infoEditarEtiqueta && (
        <>
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            requiredMark={false}
          >
            <Row gutter={[8, 8]} align="bottom">
              <Col xs={24}>
                <Form.Item
                  name="etq_nombre"
                  label="Nombre"
                  rules={[
                    {
                      required: true,
                      message: "Debe ingresar/modificar nombre de etiqueta.",
                    },
                  ]}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
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
                      />
                    </div>

                    <Button
                      type="link"
                      htmlType="submit"
                      icon={<CheckOutlined style={{ color: "#56b43c" }} />}
                      style={{ marginBottom: 8, marginLeft: 10, marginTop: -4 }}
                    ></Button>
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          {/* <Row gutter={[8, 8]} align="bottom">
            <Divider />
            <Button
              type="link"
              onClick={() => cancelEdit()}
              //icon={<LeftOutlined />}
              style={{
                marginLeft: "30%",
                border: "1px solid red",
                color: "red",
              }}
            >
              CANCELAR
            </Button>
          </Row> */}
        </>
      )}
    </>
  );
};

export default EditarEtiqueta;
