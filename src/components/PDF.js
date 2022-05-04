import React,   {useEffect} from "react";
import { useParams } from "react-router-dom";
import { Document, Page, Text, View }   from    "@react-pdf/renderer";

import { obtenerSolicitudImprimirAction } from "../actions/solicitudesAction";
import { useDispatch, useSelector } from "react-redux";

const PDF = () => {
   //const   dispatch    =   useDispatch();

   const params =   useParams();
  // const id  = params.id;

  //   useEffect(()  =>  {
  //       dispatch(obtenerSolicitudImprimirAction(id));
  //   },[dispatch, id]);

  //   const solicitud = useSelector((state) =>  state.solicitudes.solicitud);


  return (
    <Document>
        <Page   size="A4">

        <View style={{
               fontSize: "15px",
               marginTop: "20px",
               marginLeft: "55px",
            }}>
                <Text >PROCEDIMIENTO DE COMPRA VENTA INTERNACIONAL</Text>

              </View>

          <View style={{
            height: "1px",
            backgroundColor: "black",
            marginTop: "10px",
            marginLeft: "50px",
            marginRight: "50px",
          }}>

          </View>

            <View style={{
               display:  "flex",
               flexDirection:  "column",
               justifyContent: "center",
               alignItems: "center",
               marginTop: "20px",
               marginBottom: "20px",
            }}>
                <Text >Anexo 1 - Modelo de Solicitud de Pedidos</Text>

              </View>
              <View style={{
                marginLeft: "50px",
              }}>
              <Text>División:</Text>
             
              </View>
              <View style={{
                marginLeft: "50px",

              }}>
              <Text>Sucursal</Text>
             
              </View>
              
                
                <Text>Se requiere la aprovación de los recursos en las cantidades y códigos que se anexan 
                  a este modelo y en las condiciones que a continuación se especifican.
                </Text>
                <Text>Pedido No.</Text>
                <Text>Valor y moneda</Text>
                <Text>Proveedor</Text>
                <Text>Contrato(Nr)</Text>

                <Text>Cliente</Text>
                <Text>Referencia</Text>
            
        </Page>
    </Document>
  );
};

export default PDF;