"use strict";

const Elastic = require("../utils/elasticSearch");


module.exports = class EstrategiaService {
    async ejecutar(record) {
        let ElasticSearch = new Elastic();

        for (const key in record) {
            const element = record[key];
            let jsonData = new Buffer(element.Data, "base64").toString("ascii");
            console.log("jsonDataParse", JSON.parse(jsonData));
            let campania = jsonData.codigoCampania;
            let inline = this.getScript(jsonData);
            let body = {
                query: {
                    term: { "productoResumenId": jsonData._id }
                },
                script: {
                    inline: inline.join(";")
                }
            };

            let response = await ElasticSearch.update(campania, body);
            console.log("Respuesta", response);
        }
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
            `ctx._source.zonasAgotadas = ${data.zonasAgotadas}`,//array
            `ctx._source.codigoEstrategia = ${data.codigoEstrategia}`,//int
            `ctx._source.codigoTipoEstrategia = '${data.codigoTipoEstrategia}'`,//string
            `ctx._source.marcaId = ${data.marcaId}`,//int
            `ctx._source.limiteVenta = ${data.limiteVenta}`,//int
            `ctx._source.activo = '${data.activo.toString().toLowerCase()}'`,//string
            `ctx._source.tipoEstrategiaId = '${data.tipoEstrategiaId}'`,//string
            `ctx._source.estrategiaId = '${data.estrategiaId}'`,//string
            //`ctx._source.fechaModificacion = '${data.fechaModificacion}'`,
            //`ctx._source.codigoCatalogo = '${data.codigoCatalogo}'`,
            `ctx._source.marcas = ${data.marcas}`,//array
            `ctx._source.categorias = ${data.categorias}`,//array
            `ctx._source.grupoArticulos = ${data.grupoArticulos}`,//array
            `ctx._source.lineas = ${data.lineas}`,//array
            `ctx._source.codigoProductos = '${data.codigoProductos}'`,
            `ctx._source.esSubCampania = ${data.esSubCampania}`
            //falta orden, seccion
        ]
    }
}