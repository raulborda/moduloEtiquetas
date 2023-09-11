import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Button, Form, Input, Select } from "antd";
import "./Style.css";
import { colors } from "../utils/colores";

const NuevaEtiqueta = () => {
  const URLDOS = process.env.REACT_APP_URL;

  const { idUsu, setIsDrawerNE, actualizarData, setActualizarData } =
    useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(true);

  const [colorPicker, setColorPicker] = useState(colors[0]);

  const [etiquetas, setEtiquetas] = useState([]);

  const [selectedModulo, setSelectedModulo] = useState(null);

  const [colorError, setColorError] = useState(null);

  const [coloresNoUsados, setColoresNoUsados] = useState([]);

  const [form] = Form.useForm();

  const handleColorChange = (color) => {
    setColorPicker(color);
    setColorError(null);
  };

  const nuevaEtiqueta = (value) => {
    if (!colorPicker) {
      setColorError("Debe seleccionar un color.");
      return;
    }

    let selectEt = value.select_modulo;

    let nameEt = value.new_etq_nombre;
    if (nameEt === "" || nameEt === undefined || nameEt === null) {
      nameEt = "";
    }
    let colorEt = colorPicker;

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
      });
    });

    setActualizarData(!actualizarData);
    setIsDrawerNE(false);
  };

  const modulos = etiquetas.reduce((acc, modulo) => {
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
    if (selectedModulo && etiquetas.length > 0) {
      const coloresUsadosParaModulo = etiquetas
        .filter((tag) => tag.modori_id === selectedModulo)
        .map((tag) => tag.etq_color);
      const coloresNoUsadosParaModulo = colors.filter(
        (color) => !coloresUsadosParaModulo.includes(color)
      );
      setColoresNoUsados(coloresNoUsadosParaModulo);
    }
  }, [selectedModulo, etiquetas]);

  const cargarEtiquetas = () => {
    const data = new FormData();
    data.append("idU", idUsu);
    fetch(`${URLDOS}selectEtiquetas.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);

        setEtiquetas(objetoData);
        setIsLoading(false); // Establecer isLoading en false después de recibir la respuesta
      });
    });
  };

  useEffect(() => {
    if (idUsu) {
      cargarEtiquetas();
    }
  }, [idUsu]);

  useEffect(() => {
    setColorPicker(colors[0]);
  }, []);

  return (
    <div className="divForm">
      <Form
        layout="vertical"
        form={form}
        onFinish={nuevaEtiqueta}
        requiredMark={false}
      >
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
          <Select
            onChange={handleModuloChange}
            placeholder="SELECCIONE UN MODULO"
          >
            {modulos.map((modulo) => (
              <Select.Option key={modulo.value} value={modulo.value}>
                {modulo.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
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
              border: "1px solid #e8e8e8",
            }}
          >
            <Input
              size="small"
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
        <Form.Item
          name="select_color"
          validateStatus={colorError ? "error" : ""}
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
              <div className="error-message">{colorError}</div>
              <div
                className="selected-color"
                style={{ backgroundColor: colorPicker }}
              />
            </div>
          </div>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            GUARDAR
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NuevaEtiqueta;