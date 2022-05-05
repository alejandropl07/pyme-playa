import React,   {useEffect} from "react";
import { useParams } from "react-router-dom";
import { PDFViewer, Document, Page, Text, View }   from    "@react-pdf/renderer";

import { obtenerSolicitudImprimirAction } from "../actions/solicitudesAction";
import { useDispatch, useSelector } from "react-redux";

const PDF = () => {
   const   dispatch    =   useDispatch();

   const params =   useParams();
   const id  = params.id;

     useEffect(()  =>  {
         dispatch(obtenerSolicitudImprimirAction(id));
     },[dispatch, id]);

     const solicitud = useSelector((state) =>  state.solicitudes.solicitud);
     console.log(solicitud);


  return (
    <PDFViewer  style={{width:"100%", height:"90vh"}}>
    <Document>
        <Page   size="A4">

      <View style={{
        fontSize: "12"
      }}>
        <View style={{
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
                marginLeft: "40px",  
                
              }}>
              <Text>División: {solicitud.id_division}</Text>
             
              </View>
              <View style={{
               
                left:"40%",
                bottom: "15",

              }}>
              <Text>Sucursal: {solicitud.id_sucursal}</Text>
             
              </View>

                <Text style={{
                marginLeft: "40px",
                marginRight: "40px",
              }}>Se requiere la aprobación de los recursos en las cantidades y códigos que se anexan 
                  a este modelo y en las condiciones que a continuación se especifican.
                </Text>
                
                <Text style={{marginLeft: "40px", marginTop: "10"}}>Pedido No:</Text>
                <Text style={{left:"40%",bottom: "15"}}>Valor y moneda: {solicitud.valor_solicitud}, {solicitud.id_moneda} </Text>
                <Text style={{marginLeft:"40px"}}>Proveedor: {solicitud.id_proveedor}</Text>
                <Text style={{left:"40%",bottom: "15"}}>Contrato (Nr.): {solicitud.contrato_solicitud}</Text>
                <Text style={{marginLeft: "40px"}}>Pedido: {solicitud.id_clase_pedido}</Text>
                <Text style={{left:"40%",bottom: "15"}}>Embarque: {solicitud.id_embarque}</Text>
                <Text style={{marginLeft: "40px"}}>Cliente: {solicitud.id_cliente}</Text>
                <Text style={{marginLeft: "40px", marginTop: "10"}}>Referencia</Text>

                </View>
            
        </Page>
    </Document>
    </PDFViewer>
  );
};

export default PDF;