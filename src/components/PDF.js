import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PDFViewer, Document, Page, Text, View } from "@react-pdf/renderer";

import { obtenerSolicitudImprimirAction } from "../actions/solicitudesAction";
import { useDispatch, useSelector } from "react-redux";

const PDF = () => {
  const dispatch = useDispatch();

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    dispatch(obtenerSolicitudImprimirAction(id));
  }, [dispatch, id]);

  const solicitud = useSelector((state) => state.solicitudes.solicitud);
  const { loadingSolicitud } = useSelector((state) => state.solicitudes);
  console.log(solicitud);

  return (
    <PDFViewer style={{ width: "100%", height: "90vh" }}>
      <Document>
        <Page size="A4">
          <View
            style={{
              fontSize: "12",
            }}
          >
            <View
              style={{
                marginTop: "20px",
                marginLeft: "55px",
              }}
            >
              <Text>PROCEDIMIENTO DE COMPRA VENTA INTERNACIONAL</Text>
            </View>

            <View
              style={{
                height: "1px",
                backgroundColor: "black",
                marginTop: "10px",
                marginLeft: "50px",
                marginRight: "50px",
              }}
            ></View>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <Text>Anexo 1 - Modelo de Solicitud de Pedidos</Text>
            </View>

            <View
              style={{
                marginLeft: "40px",
              }}
            >
              {loadingSolicitud ? (
                <Text>División</Text>
              ) : (
                <Text>División: {solicitud.tc_division.descrip_division}</Text>
              )}
            </View>
            <View
              style={{
                left: "40%",
                bottom: "15",
              }}
            >
              {loadingSolicitud ? (
                <Text>Sucursal</Text>
              ) : (
                <Text>Sucursal: {solicitud.id_sucursal}</Text>
              )}
            </View>

            <Text
              style={{
                marginLeft: "40px",
                marginRight: "40px",
              }}
            >
              Se requiere la aprobación de los recursos en las cantidades y
              códigos que se anexan a este modelo y en las condiciones que a
              continuación se especifican.
            </Text>

            <Text style={{ marginLeft: "40px", marginTop: "10" }}>
              Pedido No:
            </Text>
            {loadingSolicitud ? (
              <Text>Valor y moneda</Text>
            ) : (
              <Text style={{ left: "40%", bottom: "15" }}>
                Valor y moneda: {solicitud.valor_solicitud},
                {solicitud.tc_moneda.descrip_moneda}
              </Text>
            )}

            {loadingSolicitud ? (
              <Text>Proveedor</Text>
            ) : (
              <Text style={{ marginLeft: "40px" }}>
                Proveedor: {solicitud.tc_proveedor.descrip_proveedor}
              </Text>
            )}

            {loadingSolicitud ? (
              <Text>Contrato</Text>
            ) : (
              <Text style={{ left: "40%", bottom: "15" }}>
                Contrato (Nr.): {solicitud.contrato_solicitud}
              </Text>
            )}

            {loadingSolicitud ? (
              <Text>Pedido</Text>
            ) : (
              <Text style={{ marginLeft: "40px" }}>
                Pedido: {solicitud.tc_clase_pedido.descrip_clase_pedido}
              </Text>
            )}

            {loadingSolicitud ? (
              <Text>Embarque</Text>
            ) : (
              <Text style={{ left: "40%", bottom: "15" }}>
                Embarque: {solicitud.tc_embarque.descrip_embarque}
              </Text>
            )}

            {loadingSolicitud ? (
              <Text>Cliente</Text>
            ) : (
              <Text style={{ marginLeft: "40px" }}>
                Cliente: {solicitud.tc_cliente.descrip_cliente}
              </Text>
            )}

            {loadingSolicitud ? (
              <Text>Referencia</Text>
            ) : (
              <Text style={{ marginLeft: "40px", marginTop: "10" }}>
                Referencia: {solicitud.descrip_solicitud}
              </Text>
            )}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDF;
