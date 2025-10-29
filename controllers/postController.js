// importo l'array con i posts
const posts = require('../data/postsArray');

// Importo il file di connessione al database
const connection = require('../data/db');

// setto le funzioni che andranno nelle rotte

function index(req, res) {
    // prepariamo la query
    const sql = 'SELECT * FROM posts';

    // eseguiamo la query!
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
}

function show(req, res) {
    // recuperiamo l'id dall' URL
    const id = req.params.id;

    // query di ricerca del post
    const postSql = 'SELECT * FROM posts WHERE id = ?';

    // query per itags 
    const tagSql = `
    SELECT *
    FROM tags 
    JOIN post_tag ON post_tag.tag_id = tags.id
    WHERE post_tag.post_id = ? `;

    // Eseguiamo la prima query 
    connection.query(postSql, [id], (err, postRes) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (postRes.length === 0) return res.status(404).json({ error: 'Post not found' });

        // Recuperiamo il post
        const post = postRes[0];

        // Se è andata bene, eseguiamo la seconda query 
        connection.query(tagSql, [id], (err, tagRes) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            post.tags = tagRes;
            res.json(post);
        });
    });
}

function store(req, res) {
    // res.send('Creazione di un post');

    // Creo un nuovo id 
    const newId = posts[posts.length - 1].id + 1;

    // Creo un nuovo post
    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }

    // Aggiungo il post all'array
    posts.push(newPost);

    // stampo l'array per testare
    console.log(posts);

    // Restituisco lo status e il post 
    res.status(201).json(newPost);
}

function update(req, res) {
    // res.send('Modifica integrale del post ' + req.params.id);

    // rendo l'id un numero intero e lo salvo
    const id = parseInt(req.params.id)

    // cerco il post tramite l'id 
    const post = posts.find((e) => e.id === id)

    // Piccolo controllo
    if (post) {

        // Aggiorno il post
        post.title = req.body.title;
        post.content = req.body.content;
        post.image = req.body.image;
        post.tags = req.body.tags;

        // stampo l'array per testare
        console.log(posts)

        // Restituiamo il post
        res.status(200).json(post);

    } else {
        res.status(404).json({ message: "error, post non trovato" })
    }

}

function destroy(req, res) {
    // recuperiamo l'id dall' URL 
    const { id } = req.params;
    const sql = 'DELETE FROM posts WHERE id = ?'

    //Eliminiamo il post                       
    connection.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete post' });
        res.sendStatus(204)
    });
}

// esporto tutto
module.exports = { index, show, store, update, destroy }