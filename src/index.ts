import http from "http";
import os from "os";

/* On vérifie les variables d'environnement */
if (!process.env.PING_LISTEN_PORT) {
    console.error("PING_LISTEN_PORT is not defined");
    
    process.exit(1);
}

/* On crée le seveur et on lui dit quoi faire selon le lien (ping -> affichage des headers / autre -> 404) */
const myServer = http.createServer((req, res) => {
    if (req.url === "/ping" && req.method === "GET") {
        console.log("Ping received on " + os.hostname());
        res.write(JSON.stringify(req.headers));
        res.end();
    } else {
        res.statusCode = 404;
        res.end();
    }
 });

 /* On lance le serveur et on lui demande d'écouter sur un port */
 myServer.listen(process.env.PING_LISTEN_PORT, () => {
    console.log('Server is running on port ' + process.env.PING_LISTEN_PORT + '. Go to http://localhost:' + process.env.PING_LISTEN_PORT + '/ping')
 });