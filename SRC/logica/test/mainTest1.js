// ........................................................
// mainTest1.js
// ........................................................
const Logica = require("../Logica.js")
var assert = require("assert")
// ........................................................
// main ()
// ........................................................
describe("Test 1: insertar una medicion", function () {
    // ....................................................
    // ....................................................
    var laLogica = null
    // ....................................................
    // ....................................................
    it("conectar a la base de datos", function (hecho) {
        laLogica = new Logica(
            "../bd/datos.bd",
            function (err) {
                if (err) {
                    throw new Error("No he podido conectar con datos.db")
                }
                hecho()
            })
    }) // it
    // ....................................................
    // ....................................................
    it("puedo insertar una medicion",
        async function () {
            var error = null
            try {
                await laLogica.insertarMedicion(
                    {
                        usuario: "00000005", fecha: "15/09/2021 17:56:47",
                        medicion: 5573.25
                    })
                } catch (err){
                    error = err
                }
            var res = await laLogica.buscarUsuario("00000005")
            assert.equal(res.length, 1, "¿no hay un resulado?")
            assert.equal(res[0].fecha, "15/09/2021 17:56:47", "¿no es 15/09/2021 17:56:47?")
            assert(error, "¿Ha insertado la medida? (¿No ha pasado por el catch()?")
        }) // it
    // ....................................................
    // ....................................................
    it("no puedo insertar una medida con usuario que ya está",
        async function () {
            var error = null
            try {
                await laLogica.insertarMedicion(
                    {
                        usuario: "00000004", fecha: "16/09/2021 17:56:47",
                        medicion: 5596.69
                    })
            } catch (err) {
                error = err
            }
            assert(error, "¿Ha insertado la medida que ya estaba 05? (¿No ha pasado por el catch()?")
        }) // it
    // ....................................................
    // ....................................................
    it("cerrar conexión a la base de datos",
        async function () {
            try {
                await laLogica.cerrar()
            } catch (err) {
                // assert.equal( 0, 1, "cerrar conexión a BD fallada: " + err)
                throw new Error("cerrar conexión a BD fallada: " + err)
            }
        }) // it
}) // describe