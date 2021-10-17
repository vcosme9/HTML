console.log(">>>> INICIAMOS");
//Inicializamos firestore
var db = firebase.firestore();
var cont = 1;

// --> Funcion que sube una medicion a Firebase
function guardarDatos(){
    
    var inputText = document.getElementById("text_field").value;
    
    var docRef = db.collection("MEDICIONES").doc(cont.toString());
    
    docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log(">>>> El documento ya existe ");
        cont++;
        console.log("Contador actual: ", cont);
        guardarDatos();
    } else {
        console.log(">>>> El documento nuevo");
       	
        var today = new Date();
        var Fecha = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()+" "+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()
        
        // --> Subo el dato a Firebase
        db.collection("MEDICIONES").doc(cont.toString()).set({ 
            fecha: Fecha,
            medicion: inputText
            }).then(function() {
                console.log("Subido correctamente");

            }).catch(function(error) {
                console.error("Error al subir", error);
            });

        cont++;
        console.log("Contador actual: ", cont);
    }
        }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    
    
    
} // guardarDatos()

// --> Funcion que comprueba que el documento existe en la base de datos
function comprobarBD () {
    var docRef = db.collection("MEDICIONES").doc("25");
    
    docRef.get().then(function(doc) {
    if (doc.exists) {
        window.alert("Sí que existe");
        console.log("Document data:", doc.data());
    } else {
        window.alert("No existe");
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
        
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    
} // comprobarBD()

//------------------------------------------------------------------------------
// --> RELLENAR LISTAS
//------------------------------------------------------------------------------

//Añadimos a la pagina web una lista con los valores de la base de datos
const lista_medicion = document.querySelector("#lista_medicion");

//Cada vez que se sube un dato, se actualiza a tiempo real en la pagina web
db.collection("MEDICIONES").onSnapshot(function(querySnapshot) {
    querySnapshot.docChanges().forEach(function(change) {
        if(change.type === "added") {
            lista_medicion.innerHTML += "<div class='list-item'><p> Fecha: " + change.doc.data().fecha + "</p><p> Medicion: " + change.doc.data().medicion + "</p></div>";
        }
    })        
});

//Añadimos a la pagina web la ultima medicion
const ultima_medicion = document.querySelector("#ultima_medicion");

db.collection('MEDICIONES').orderBy('postId').orderBy('fecha','asc').limit(1).get().then( function(snapshot) {
       ultima_medicion.innerHTML += "<div'><p> Fecha: " + snapshot.fecha + "</p><p> Medicion: " + snapshot.medicion + "</p></div>";
     })
