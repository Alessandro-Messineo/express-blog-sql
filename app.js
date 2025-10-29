// importo express
const express = require("express");
// creiamo un istanza di express
const app = express();
// numero della porta da utilizzare
const port = 3001;

// importiamo modulo router posts
const postRouter = require("./routers/posts")
// importo il middleware per le pagine non trovate
const notFound = require("./middlewares/notFound")
// importo il middleware per gli errori nelle pagine
const errors = require("./middlewares/error")

app.use(express.static('public'));

// body-parser
app.use(express.json());

// rotta di default
app.get("/",(req, res) =>{
    res.send(`<h1> Server del mio blog </h1>`)
})


// rotta dei post
app.use("/posts", postRouter);

// richiamo il middleware per le pagine non trovate
app.use(notFound);

// richiamo il middleware per gli errori nelle pagine
app.use(errors);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
