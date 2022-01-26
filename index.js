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
                res.json(this.productos)
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
                    res.json({
                        nombreProducto: producto.title
                    })

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
            res.json({
                idProducto: idSumador
            })

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
                    res.json({
                        nombreProducto: this.productos[i].title,
                        precioProdcuto: this.productos[i].price
                    })
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
            this.productos.map (producto => 
                {
                    res.json(this.productos)

                })
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
