let records = {
    _id: '201905.33757.ODD',
    codigoCampania: '201907',
    cuv: '30820',
    descripcion: 'Strom Collagenesse Intensivo + Collagenesse Rostro + Hydra Absolute + LociC3n Micelar 45ml editado',
    codigoProducto: '200079970',
    imagen: 'PE_200079970201934934_cbapxpqgdf.png',
    imagenOrigen: '1',
    textoBusqueda: 'Strom Collagenesse Intensivo + Collagenesse Rostro + Hydra Absolute + LociC3n Micelar 45ml editado Descripcion 1 Descripcion 2 Descripcion 3 ombre Comercial 1 Nombre Comercial 2 Nombre Comercial 3 Nombre Bulk 1 Nombre Bulk 2 Nombre Bulk 3',
    tipoPersonalizacion: 'ODD',
    valorizado: 666,
    precio: 123.4,
    ganancia: 123.4,
    zonasAgotadas: [],
    codigoEstrategia: 2003,
    codigoTipoEstrategia: '030',
    marcaId: 1,
    limiteVenta: 99,
    activo: true,
    tipoEstrategiaId: 3027,
    estrategiaId: 56667,
    fechaModificacion: '2019-03-26T05:00:00.000Z',
    codigoCatalogo: '44',
    marcas: ["L\'Bel"],
    categorias: ['Maquillaje', 'Tratamiento Facial'],
    grupoArticulos: ['Maquillaje', 'Tratamiento Facial'],
    lineas: ['COLLAGENESSE', 'EFFET PARFAIT', 'SKY'],
    codigoProductos:
        ['200079965',
            '200079966',
            '200079967',
            '200079968',
            '200079969',
            '200079970',
            '200079971',
            '200079972',
            '200079973',
            '200084555',
            '200084638',
            '200086105'],
    esSubCampania: false,
    seccion: "Gan",
    orden: 10
};

let data = [
    {
        Data: Buffer.from(JSON.stringify(records))     
    }
]

const _estrategia = require("./app/estrategia/EstrategiaService");

(async () => {
    try {
        let estrategia = new _estrategia();
        let response = await estrategia.ejecutar(data);
        console.log("response", response);

    } catch (error) {
        console.error(error);
    }
})();