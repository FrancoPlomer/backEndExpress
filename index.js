const express = require("express");
const { Router } = express

const app = express();

const productos = Router();

const PORT = 8080 || process.env.PORT;

let idSumador = 0;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('public'));

app.use('/productos', productos);


class contenedorProductos {
    constructor(
        productos,
        id,
    ){
        this.productos = productos;
        this.id = id;
    }
    getAll()
    {
        
        productos.get('/api/productos',  ( req,res )=>{
            if (this.productos)
            {
                res.send(`
                <h1>Listado de productos</h1>
                <ul>${this.productos.map (producto => 
                    {
                        return (`<li> ${producto.title}</li>`)         
                    })}</ul>`)
            }
            else{
                res.send({error: "producto no encontrado"});
            }
        } )
    }
    getById()
    {
        productos.get('/api/productos/:id',  ( req,res )=>{
            this.productos.map((producto) => {

                if (producto.ID === parseInt(req.params.id))
                {
                    res.send(`
                        <h1>Producto encontrado</h1>
                        <ul>
                            <li>
                                ${producto.title}
                            </li>
                        </ul>
                    `)
                }
                else{
                    res.send({error: "producto no encontrado"});
                }
            })
        } )
    }
    addProduct()
    {
        productos.post('/api/productos', ( req,res )=>{
            const producto = req.body.producto;
            const precio = req.body.precio;
            idSumador += 1;
            this.productos.push({
                title: producto,
                price: precio,
                ID: idSumador,
            })
            res.send(`<h1>Se agrego el producto con exito, su id: ${idSumador}</h1>`)
        })
    }
    updateForId()
    {
        productos.put('/api/productos/:id', ( req, res ) =>
        {
            const producto = req.body.producto;
            const precio = req.body.precio;
            for(let i = 0; i < this.productos.length ; i++)
            {
                if(this.productos[i].ID === parseInt(req.params.id))
                {
                    this.productos[i] = {
                        ... this.productos[i],
                        title: producto,
                        price: precio,
                    }
                    res.send(`<h1>Se actualizo el producto con exito</h1><ul><li>${this.productos[i].title}</li><li>${this.productos[i].price}</li></ul>`)
                }
            }
        })
    }
    deleteForId()
    {
        productos.delete('/api/productos/:id', ( req, res ) => 
        {
            for (let index = 0; index < this.productos.length; index++) {
                if(this.productos[index].ID === parseInt(req.params.id))
                {
                    this.productos.splice(index, 1)
                }                  
            }
            res.send(`
            <h1>Eliminado con exito, listado de productos actualizado</h1>
            <ul>${this.productos.map (producto => 
                {
                    return (`<li> ${producto.title}</li>`)         
                })}</ul>`)
        })
    }
}

const contenedor = new contenedorProductos(
    [{
        title: "coca",
        price: "$220",
        ID: 0,
    }],
    1
)

contenedor.getAll();
contenedor.getById();
contenedor.addProduct();
contenedor.updateForId();
contenedor.deleteForId();

app.listen(PORT)
