import React from "react";
import { Document, Page, Text, View }   from    "@react-pdf/renderer";

const PDF = ({solicitud}) => {
  return (
    <Document>
        <Page   size="A4">
            <View>
                <Text style={{
                  display:  "flex",
                  flexDirection:  "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}>Anexo 1 - Modelo de Solicitud de Pedidos</Text>
                <Text>División</Text>
                <Text>Sucursal</Text>
                <Text>Se requiere la aprovación de los recursos en las cantidades y códigos que se anexan 
                  a este modelo y en las condiciones que a continuación se especifican.
                </Text>
                <Text>Pedido No.</Text>
                <Text>Valor y moneda</Text>
                <Text>Proveedor</Text>
                <Text>Contrato(Nr)</Text>

                <Text>Cliente</Text>
                <Text>Referencia</Text>
            </View>
        </Page>
    </Document>
  );
};

export default PDF;