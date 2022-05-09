import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PDFViewer, Document, Page, Text, View } from "@react-pdf/renderer";

import { obtenerSolicitudImprimirAction } from "../actions/solicitudesAction";
import { useDispatch, useSelector } from "react-redux";

const PDF = () => {
  const dispatch = useDispatch();

  //Obtener parámetros del URL
  const params = useParams();
  const id = params.id;

  //Hook useEffect, se ejecuta al renderizar el PDF
  useEffect(() => {
    dispatch(obtenerSolicitudImprimirAction(id));
  }, [dispatch, id]);

  //Obtener datos del state
  const solicitud = useSelector((state) => state.solicitudes.solicitud);
  const { loadingSolicitud } = useSelector((state) => state.solicitudes);
  const productos = solicitud.tc_solicitud_productos;

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
                marginTop: "20",
                marginLeft: "55",
              }}
            >
              <Text>PROCEDIMIENTO DE COMPRA VENTA INTERNACIONAL</Text>
            </View>

            <View
              style={{
                height: "1",
                backgroundColor: "black",
                marginTop: "10",
                marginLeft: "50",
                marginRight: "50",
              }}
            ></View>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20",
                marginBottom: "20",
              }}
            >
              <Text>Anexo 1 - Modelo de Solicitud de Pedidos</Text>
            </View>

            <View
              style={{
                marginLeft: "40",
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
                <Text>Sucursal: {solicitud.tc_sucursal.descrip_sucursal}</Text>
              )}
            </View>

            <Text
              style={{
                marginLeft: "40",
                marginRight: "40",
              }}
            >
              Se requiere la aprobación de los recursos en las cantidades y
              códigos que se anexan a este modelo y en las condiciones que a
              continuación se especifican.
            </Text>

            <Text style={{ marginLeft: "40", marginTop: "10" }}>
              Pedido No: {solicitud.id_solicitud}
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
              <Text style={{ marginLeft: "40" }}>
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
              <Text style={{ marginLeft: "40" }}>
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
              <Text style={{ marginLeft: "40" }}>
                Cliente: {solicitud.tc_cliente.descrip_cliente}
              </Text>
            )}

            {loadingSolicitud ? (
              <Text>Destino</Text>
            ) : (
              <Text style={{ left: "40%", bottom: "15" }}>
                Destino: {solicitud.tc_destino.descrip_destino}
              </Text>
            )}

            {loadingSolicitud ? (
              <Text>Referencia</Text>
            ) : (
              <Text style={{ marginLeft: "40" }}>
                Referencia: {solicitud.referencia}
              </Text>
            )}

            {loadingSolicitud ? (
              <Text>Fecha de entrega acordada con el cliente:</Text>
            ) : (
              <Text style={{ marginLeft: "40", marginTop: "15" }}>
                Fecha de entrega acordada con el cliente:{" "}
                {solicitud.fecha_entrega}
              </Text>
            )}

            {loadingSolicitud ? (
              <Text>Tipo de Producto</Text>
            ) : (
              <Text style={{ marginLeft: "40", marginTop: "15" }}>
                Tipo de Producto:{" "}
                {solicitud.tc_tipo_producto.descrip_tipo_producto}
              </Text>
            )}

            <Text style={{ marginLeft: "40", marginTop: "15" }}>Nota:</Text>
            <View
              style={{
                height: "1",
                backgroundColor: "black",
                marginLeft: "70",
                marginRight: "270",
              }}
            ></View>

            {loadingSolicitud ? (
              <Text>Elaborado y recibido por</Text>
            ) : (
              <Text style={{ marginLeft: "40", marginTop: "15" }}>
                Elaborado y recibido por:
              </Text>
            )}
            <View
              style={{
                height: "1",
                backgroundColor: "black",
                marginLeft: "40",
                marginRight: "420",
              }}
            ></View>

            {loadingSolicitud ? (
              <Text>Elaborado por</Text>
            ) : (
              <Text style={{ marginLeft: "40", marginTop: "8" }}>
                Elaborado por: {solicitud.tc_usuario.nombre_usuario}
              </Text>
            )}

            <Text style={{ left: "33%", bottom: "15" }}>Visto Bueno:</Text>

            <Text style={{ left: "65%", marginTop: "-28" }}>
              Revisado inventarios:
            </Text>

            <Text style={{ marginLeft: "40", marginTop: "5" }}>
              Especialista Comercial
            </Text>

            <Text style={{ marginLeft: "33%", marginTop: "-15" }}>
              Director de la División, Sucursal
            </Text>

            <Text style={{ marginLeft: "65%", marginTop: "-13" }}>
              Director de Recambios
            </Text>

            <Text style={{ marginLeft: "40", marginTop: "5" }}>
              Fecha: {new Date().toLocaleDateString()}
            </Text>

            <View
              style={{
                height: "1",
                backgroundColor: "black",
                marginLeft: "77",
                marginRight: "435",
              }}
            ></View>

            <Text style={{ marginLeft: "33%", marginTop: "-15" }}>Fecha:</Text>

            <View
              style={{
                height: "1",
                backgroundColor: "black",
                marginLeft: "234",
                marginRight: "280",
              }}
            ></View>

            <Text style={{ marginLeft: "65%", marginTop: "-15" }}>Fecha:</Text>

            <View
              style={{
                height: "1",
                backgroundColor: "black",
                marginLeft: "424",
                marginRight: "90",
              }}
            ></View>

            <Text style={{ marginLeft: "40", marginTop: "5" }}>Firma:</Text>

            <View
              style={{
                height: "1",
                backgroundColor: "black",
                marginLeft: "75",
                marginRight: "435",
              }}
            ></View>

            <Text style={{ marginLeft: "33%", marginTop: "-15" }}>Firma:</Text>

            <View
              style={{
                height: "1",
                backgroundColor: "black",
                marginLeft: "232",
                marginRight: "280",
              }}
            ></View>

            <Text style={{ marginLeft: "65%", marginTop: "-15" }}>Firma:</Text>

            <View
              style={{
                height: "1",
                backgroundColor: "black",
                marginLeft: "422",
                marginRight: "90",
              }}
            ></View>

            <Text style={{ marginLeft: "40", marginTop: "15" }}>Nota:</Text>
            <View
              style={{
                height: "1",
                backgroundColor: "black",
                marginLeft: "70",
                marginRight: "270",
              }}
            ></View>

            <Text style={{ marginLeft: "40", marginTop: "12" }}>
              Recibido por:
            </Text>

            <Text style={{ marginLeft: "40", marginTop: "5" }}>
              Especialista en Logística
            </Text>

            <Text style={{ marginLeft: "40", marginTop: "5" }}>Fecha:</Text>

            <View
              style={{
                height: "1",
                backgroundColor: "black",
                marginLeft: "77",
                marginRight: "435",
              }}
            ></View>

            <Text style={{ marginLeft: "40", marginTop: "5" }}>Firma:</Text>

            <View
              style={{
                height: "1",
                backgroundColor: "black",
                marginLeft: "75",
                marginRight: "435",
              }}
            ></View>

            <Text style={{ marginLeft: "40", marginTop: "12" }}>
              Aprobado por:
            </Text>

            <Text style={{ marginLeft: "40", marginTop: "5" }}>
              Director General
            </Text>

            <Text style={{ marginLeft: "40", marginTop: "5" }}>Fecha:</Text>

            <View
              style={{
                height: "1",
                backgroundColor: "black",
                marginLeft: "77",
                marginRight: "435",
              }}
            ></View>

            <Text style={{ marginLeft: "40", marginTop: "5" }}>Firma:</Text>

            <View
              style={{
                height: "1",
                backgroundColor: "black",
                marginLeft: "75",
                marginRight: "435",
              }}
            ></View>
          </View>
        </Page>

        <Page size="A4">
          <View
            style={{
              fontSize: "12",
            }}
          >
            <View
              style={{
                marginTop: "20",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text> PRODUCTOS </Text>
            </View>

            <View
              style={{
                height: "1",
                backgroundColor: "black",
                marginTop: "10",
                marginLeft: "50",
                marginRight: "50",
              }}
            ></View>

            <Text style={{ marginLeft: "138", marginTop: "20" }}>Pfx</Text>

            <View
              style={{
                height: "1",
                backgroundColor: "black",
                marginLeft: "130",
                marginRight: "140",
              }}
            ></View>

            <Text style={{ marginLeft: "270", marginTop: "-14" }}>Código</Text>

            <Text style={{ marginLeft: "400", marginTop: "-14" }}>
              Cantidad
            </Text>

            {loadingSolicitud
              ? null
              : productos.map((producto) => {
                  return (
                    <React.Fragment>
                      <Text style={{ marginLeft: "140", marginTop: "10" }}>
                        {producto.Pfx}
                      </Text>

                      <Text style={{ marginLeft: "285", marginTop: "-14" }}>
                        {solicitud.tc_solicitud_productos[0].Código}
                      </Text>

                      <Text style={{ marginLeft: "415", marginTop: "-14" }}>
                        {solicitud.tc_solicitud_productos[0].Cantidad}
                      </Text>
                    </React.Fragment>
                  );
                })}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDF;
