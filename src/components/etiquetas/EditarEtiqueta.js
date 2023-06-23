import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const EditarEtiqueta = () => {
  const { infoEditarEtiqueta, setIsDrawerEE, setInfoEditarEtiqueta } =
    useContext(GlobalContext);

  const [form] = Form.useForm();

  //console.log("infoEditarEtiqueta: ", infoEditarEtiqueta);

  const onFinish = (value) => {
    console.log("VALORES A ENVIAR PARA UPDATE: ", infoEditarEtiqueta.key, " | ", value.etq_nombre);
    setIsDrawerEE(false);
    form.resetFields();
    setInfoEditarEtiqueta(null);
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
                          paddingTop:"2px"
                        }}
                      />
                    </div>

                    <Button
                      type="link"
                      htmlType="submit"
                      icon={<CheckOutlined style={{color:"#56b43c"}}/>}
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
