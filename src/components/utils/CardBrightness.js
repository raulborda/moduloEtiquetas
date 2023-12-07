import { Input, Form } from "antd";
import {
  CloseOutlined,
} from "@ant-design/icons";

export const Tag = ({ hex, nombre, tipo, defaultValue, closable, onClose }) => {
  const checkBrightness = (hex) => {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 0 + 2), 16);
    const g = parseInt(hex.substring(2, 2 + 2), 16);
    const b = parseInt(hex.substring(4, 4 + 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    const lowBrightnessStyle = {
      backgroundColor: `#${hex}`,
      color: `rgba(0,0,0,0.5)`,
      borderColor: `rgba(0,0,0,0.3)`,
      width: tipo ? '100%' : ''
    };

    const highBrightnessStyle = {
      backgroundColor: `rgba(${r},${g},${b}, 0.2)`,
      color: `#${hex}`,
      borderColor: `#${hex}`,
      width: tipo ? '100%' : ''
    };

    const noNamePadding = {
      padding: "2px 6px",
      borderRadius: 4,
    };

    if (brightness > 155) {
      return (
        tipo ?
          <Form.Item
            name="etq_nombre"
            label="Nombre"
            rules={[
              {
                required: true,
                message: tipo==='agregar' ? "Debe ingresar nombre de etiqueta." : "Debe ingresar/modificar nombre de etiqueta.",
              },
            ]}
          >
            <div
              style={
                nombre
                  ? lowBrightnessStyle
                  : { ...lowBrightnessStyle, ...noNamePadding }
              }
              className="tag-custom"
            >
              <Input
                size="small"
                placeholder=""
                defaultValue={defaultValue ? defaultValue : ''}
                style={{
                  background: "transparent",
                  color: lowBrightnessStyle.color,
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                }}
              />
            </div>
          </Form.Item>

          :
          <div
            style={
              nombre
                ? lowBrightnessStyle
                : { ...lowBrightnessStyle, ...noNamePadding }
            }
            className="tag-custom"
          >
          {nombre}
          {closable && (
            <span
              style={{ marginLeft: "4px", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center" }}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              <CloseOutlined/>
            </span>
          )}
          </div>
      );
    } else {
      return (
        tipo ?
          <Form.Item
            name="etq_nombre"
            label="Nombre"
            rules={[
              {
                required: true,
                message: tipo==='agregar' ? "Debe ingresar nombre de etiqueta." : "Debe ingresar/modificar nombre de etiqueta.",
              },
            ]}
          >
            <div
              style={
                nombre
                  ? highBrightnessStyle
                  : { ...highBrightnessStyle, ...noNamePadding }
              }
              className="tag-custom"
            >
              <Input
                size="small"
                placeholder=""
                defaultValue={defaultValue ? defaultValue : ''}
                style={{
                  background: "transparent",
                  color: highBrightnessStyle.color,
                  border: "none",
                  outline: "none",
                  boxShadow: "none"
                }}
              />
            </div>
          </Form.Item>

          :
          <div
            style={
              nombre
                ? highBrightnessStyle
                : { ...highBrightnessStyle, ...noNamePadding }
            }
            className="tag-custom"
          >
          {nombre}
          {closable && (
            <span
              style={{ marginLeft: "4px", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center" }}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              <CloseOutlined/>
            </span>
          )}
          </div>
      );
    }
  };

  return checkBrightness(hex);
};