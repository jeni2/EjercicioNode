//jenifer Rodriguez Reto 1 

//importamos el modulo http para crear el servidor
const http = require('http');

//importamos el modulo axios
const axios= require('axios');

//importamos el modulo para manipulcion de archivos
const fs= require('fs');

//variable con los proveedores
var proveedores;

//varieble con los clientes
var clientes;


//definicion de la tabla
var tab= " <!DOCTYPE html> <html lang=\"en\"><head> <meta charset=\"UTF-8\">    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"> "+
    "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">  <link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl\" crossorigin=\"anonymous\">"+
    "<title>Tarea Node</title> </head> <body>"
var titulo=""
var tab1=   "<table class=\"table table-striped\"> <thead><tr><th scope=\"col\" class=\"col-2\">ID</th><th scope=\"col\" class=\"col-5\">Nombre compañía</th>"+
    "<th scope=\"col\" class=\"col-5\">Nombre contacto</th></tr></thead><tbody>"

var tab3=""
var tab2="</tbody></table></body></html>"

//funcion que carga los proveedores desde la url externa, los datos se cargan en resp
async function getProveedores(){

    const resp = await axios.get('https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json');
    //console.log(resp.data);
   titulo= "<h1 style=\"text-align:center\"> Proveedores </h1> "
    return resp.data;   

}

//funcion que carga los clientes 
async function getClientes(){

    const resp = await axios.get('https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json');
    titulo= "<h1 style=\"text-align:center\"> Clientes </h1> "
    //console.log(resp.data);
    return resp.data;   

}





//creamos la instancia del servidor
http
    .createServer(async function (req,res){
        //encabezado por defecto de la respuesta del servidor 
       
        console.log('req',req.url);

        if (req.url==="/proveedores.html"){
            const proveedores= await getProveedores();
            tab3=cargarTablaProveedores(proveedores);
            
          // console.log(proveedores)
        }
        else if (req.url==="/api/clientes"){
            const clientes= await getClientes();
            tab3=cargarTablaClientes(clientes);
        //    console.log(clientes)
        }
    
        res.writeHead(200,{'Content-Type': 'text/html'});
        var tabla=tab+titulo+tab1+tab3+tab2
        res.end(tabla)
    })
    .listen(8081); //puerto


function cargarTablaProveedores(a){
    var relleno=" ";
    for(i in a){
        
        relleno=relleno+ '<tr><td>'
        relleno=relleno + ' ' + a[i].idproveedor ;
        relleno=relleno + '</td>'
        relleno=relleno+ '<td>'
        relleno=relleno + ' ' + a[i].nombrecompania ;
        relleno=relleno + '</td>'
        relleno=relleno+ '<td>'
        relleno=relleno + ' ' + a[i].nombrecontacto ;
        relleno=relleno + '</td>'
        relleno=relleno +"</tr>"
    }
    //console.log(relleno);
    return relleno;
}

function cargarTablaClientes(a){
    var relleno=" ";
    for(i in a){
        
        relleno=relleno+ '<tr><td>'
        relleno=relleno + ' ' + a[i].idCliente ;
        relleno=relleno + '</td>'
        relleno=relleno+ '<td>'
        relleno=relleno + ' ' + a[i].NombreCompania ;
        relleno=relleno + '</td>'
        relleno=relleno+ '<td>'
        relleno=relleno + ' ' + a[i].NombreContacto ;
        relleno=relleno + '</td>'
        relleno=relleno +"</tr>"
    }
   // console.log(relleno);
    return relleno;
}


