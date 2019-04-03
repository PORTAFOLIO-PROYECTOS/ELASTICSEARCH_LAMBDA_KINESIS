"use strict";

const Elastic = require("../utils/elasticSearch");


module.exports = class EstrategiaService {
    async ejecutar(record) {
        let ElasticSearch = new Elastic();
        let retorno = [];

        for (const key in record) {
            const element = record[key];
            let dataBuffer = new Buffer(element.Data, "base64").toString("utf8");
            console.log("dataBuffer", dataBuffer);
            let data = JSON.parse(dataBuffer);

            //console.log("dataBufferJSON", data);
            let campania = data.codigoCampania;
            let inline = this.getScript(data);
            let body = {
                query: {
                    term: { "productoResumenId": data._id }
                },
                script: {
                    inline: inline.join(";")
                }
            };

            let response = await ElasticSearch.update(campania, body);
            retorno.push(response);
        }
        
        return retorno;
    }

    getScript(data) {
        return [
            `ctx._source.descripcion = '${data.descripcion}'`,//string
            `ctx._source.codigoProducto = '${data.codigoProducto}'`,//string
            `ctx._source.imagen = '${data.imagen}'`,//string
            `ctx._source.imagenOrigen = ${data.imagenOrigen}`,//int
            `ctx._source.textoBusqueda = '${data.textoBusqueda}'`,//string
            `ctx._source.valorizado = ${data.valorizado}`,//double
            `ctx._source.precio = ${data.precio}`,//double
            `ctx._source.ganancia = ${data.ganancia}`,//double
            `ctx._source.zonasAgotadas = ${JSON.stringify(data.zonasAgotadas)}`,//array
            `ctx._source.codigoEstrategia = ${data.codigoEstrategia}`,//int
            `ctx._source.codigoTipoEstrategia = '${data.codigoTipoEstrategia}'`,//string
            `ctx._source.marcaId = ${data.marcaId}`,//int
            `ctx._source.limiteVenta = ${data.limiteVenta}`,//int
            `ctx._source.activo = '${data.activo}'`,//string
            `ctx._source.tipoEstrategiaId = '${data.tipoEstrategiaId}'`,//string
            `ctx._source.estrategiaId = '${data.estrategiaId}'`,//string
            //`ctx._source.fechaModificacion = '${data.fechaModificacion}'`,
            //`ctx._source.codigoCatalogo = '${data.codigoCatalogo}'`,
            `ctx._source.marcas = ${JSON.stringify(data.marcas)}`,//array
            `ctx._source.categorias = ${JSON.stringify(data.categorias)}`,//array
            `ctx._source.grupoArticulos = ${JSON.stringify(data.grupoArticulos)}`,//array
            `ctx._source.lineas = ${JSON.stringify(data.lineas)}`,//array
            `ctx._source.codigoProductos = ${JSON.stringify(data.codigoProductos)}`,
            `ctx._source.esSubCampania = ${data.esSubCampania}`,
            `ctx._source.seccion1 = '${data.seccion}'`,
            `ctx._source.orden = ${data.orden}`
            //falta orden, seccion
        ]
    }
}