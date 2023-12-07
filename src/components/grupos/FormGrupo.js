import React, { useContext, useRef, useEffect, useState } from "react";
import {
    Button,
    Form,
    Input,
    Select,
    Row,
    Col,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import { GlobalContext } from "../context/GlobalContext";
import { Tag } from "../utils/CardBrightness";
import './FormGrupo.css';

function FormGrupo({ editarGrupoValues }) {

    const URL = process.env.REACT_APP_URL;
    const formRef = useRef(null);
    const idUserLogged = localStorage.getItem("usuario");
    const { Option } = Select;

    const { setDrawerGrupo, actualizarData, setActualizarData } = useContext(GlobalContext);

    const [dataEtiquetas, setDataEtiquetas] = useState();
    const [editarTags, setEditarTags] = useState(false);
    const [grupo, setGrupo] = useState({
        nombreGrupo: "",
    });

    const fetchDataEtiquetas = async () => {
        const data = await fetch(`${URL}buscarEtiquetasGral.php`);
        const jsonData = await data.json();
        setDataEtiquetas(jsonData);
        //console.log('jsonData', jsonData)
    }


    useEffect(() => {

        fetchDataEtiquetas()
            .catch(console.error);;

        const dataForm = new FormData();
        dataForm.append("idU", idUserLogged);

        const requestOptions = {
            method: 'POST',
            body: dataForm
        };

        if (editarGrupoValues) {

            formRef.current.setFieldsValue({
                nombreGrupo: editarGrupoValues.nombreGrupo,
                etiquetasid: editarGrupoValues.etiquetasid
            });
        }

    }, []);



    //Funcion que crea un NUEVO grupo
    const crearGrupo = async (values) => {

        //console.log('Intentando crear', values)
        //console.log(grupo)
        const data = new FormData();
        data.append("nombreGrupo", values.nombreGrupo);
        let etq = [];
        if (values.etiquetasid) {

            values.etiquetasid.forEach((etiqueta) => {
                etq.push(Number(etiqueta));
            });
            //console.log('etq[]',etq)

        }
        data.append("etqG", JSON.stringify(etq));

        const requestOptions = {
            method: 'POST',
            body: data
        };
        const response = await fetch(`${URL}etiquetas_crearGrupo.php`, requestOptions);
        console.log(response)
        setDrawerGrupo(false);
        setActualizarData(!actualizarData);
    };

    //Funcion que MODIFICA grupo
    const editarGrupo = async (values) => {

        //console.log('Tratando de editar');
        //console.log('values', values);
        //let etq = [];
        const data = new FormData();
        //data.append("idGrupo", editarGrupoValues.key);
        data.append("nombreGrupo", values.nombreGrupo);
        data.append("idGrupoE", editarGrupoValues.key);

        if (values.etiquetasid) {
            let etq = [];
            values.etiquetasid.forEach((etiqueta) => {
                etq.push(Number(etiqueta));
            });
            data.append("etqG", JSON.stringify(etq));
        }


        fetch(`${URL}guardarEtiquetaxGrupo.php`, {
            method: "POST",
            body: data,
        }).then(function (response) {
            response.text().then((resp) => {
                setActualizarData(!actualizarData);
            });
        });

        // const requestOptions = {
        //     method: 'POST',
        //     body: data
        // };
        // const response = await fetch(`${URL}clientView_guardar CAMBIAR EditContactoNoRol.php`, requestOptions);
        // console.log(response);
        setDrawerGrupo(false);
        //setActualizarData(!actualizarData);
    };

    const handleChange = (e) => {
        //console.log('e',e);
        setGrupo(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };


    const onchangeEditarTags = (etiquetas) => {
        //console.log(etiquetas)
        let etq = [];
        const data = new FormData();
        data.append("idGrupoE", editarGrupoValues.key);
        etiquetas.forEach((etiqueta) => {
            etq.push(Number(etiqueta));
        });
        //console.log(etq)
        data.append("etqG", JSON.stringify(etq));
        fetch(`${URL}guardarEtiquetaxGrupo.php`, {
            method: "POST",
            body: data,
        }).then(function (response) {
            response.text().then((resp) => {
                setActualizarData(!actualizarData);
            });
        });
    };


    const renderEtiquetaTag = (props) => {
        const { label, value, closable, onClose } = props;
        //console.log('props', props)
        //console.log('LABEL', label.props.children[0].props.children)

        //Original:
        // const etiqueta = dataEtiquetas?.find((etiqueta) => etiqueta.value === value);
        // const backgroundColor = etiqueta ? etiqueta.color : "";
        // return (
        //     value ?
        //         <div style={{ padding: "4px 4px 0px 2px" }} >
        //             <Tag hex={backgroundColor} nombre={label?.toUpperCase()} closable={closable} onClose={onClose} />
        //         </div> : ''
        // );

        //Nuevo: etiqueta - modulo
        const etiqueta = dataEtiquetas?.find((etiqueta) => etiqueta.value === value);
        const backgroundColor = etiqueta ? etiqueta.color : "";
        return (
            value ?
                <div style={{ padding: "4px 4px 0px 2px" }} >
                    <Tag hex={backgroundColor} nombre={label.props?.children[0]?.props.children.toUpperCase()} closable={closable} onClose={onClose} />
                </div> : ''
        );
    };


    return (
        <>
            <Form
                layout="vertical"
                ref={formRef}
                onFinish={editarGrupoValues ? editarGrupo : crearGrupo}
                autoComplete="off"
            >

                <FormItem name="nombreGrupo" label="Nombre"
                    hasFeedback
                    rules={[{
                        required: true,
                        //message: "Ingrese nombre/s y/o apellido/s válidos",
                        //pattern: new RegExp("^([ \u00c0-\u01ffa-zA-Z'])+$")
                    }]}>
                    <Input name="nombreGrupo" showCount maxLength={24} onChange={handleChange} />
                </FormItem>


                <Row style={{ marginTop: "25px", marginBottom: "40px" }}>

                    <Col xs={24} sm={24} md={24}>
                        <FormItem name="etiquetasid" label='Etiquetas' >
                            <Select
                                showSearch
                                className='ant-select-selector-drawer'
                                mode="multiple"
                                placeholder="Seleccione etiquetas"
                                //options={dataEtiquetas}
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input.toUpperCase().trim())}
                                tagRender={renderEtiquetaTag} // Apariencia de etiquetas seleccionadas
                            >
                                {dataEtiquetas?.map((etiqueta) => (

                                    <Option key={etiqueta.value} label={etiqueta.label.toUpperCase()} >
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <div>{etiqueta.label.toUpperCase()}</div><div style={{ paddingRight: "8px" }}>{etiqueta.nombreModulo}</div>
                                        </div>
                                    </Option>
                                ))}
                            </Select>

                        </FormItem>
                    </Col>
                </Row>

                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                >GUARDAR</Button>
            </Form>

        </>
    )
}

export default FormGrupo