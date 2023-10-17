# MODULE - DevOps : WIK-DPS-TP03

- [I - Prérequis](#i---prérequis)
- [II - Installation & Dépendances](#ii---installation--dépendances)
    - En single-stage
    - En multi-stage
- [III - Lancement du projet](#iii---lancement-du-projet)
    - Avec le port par défaut
    - En précisant un port
- [IV - Loadbalancing](#iv---loadbalancing)

## I - Prérequis

Pour lancer ce projet, vous devez avoir `docker` et `docker-compose` d'installé sur votre machine.

## II - Installation & Dépendances

Pour commencer, récupérons l'app en utilisant la commande suivante !

```bash
git clone https://github.com/LukaGrc/WIK-DPS-TP03.git
```

## III - Lancement du projet

Dans le dossier qui vient d'être crée, nous allons maintenant build & lancer nos images Docker :

```bash
docker compose up --build
```

Il est maintenant possible de se rendre sur `http://localhost:8080/ping`!

## IV - Loadbalancing

Ce docker compose lance 4 réplacas de notre api, et un reverse prxoy nginx.

Nous avons, grâce aux lignes de logs suivantes, la preuve que nous avons du loadbalancing :

```bash
# PREMIER PING : On passe par le nginx, et le container "api-2" a été appelé (avec le hostname 8e6218f2e0d8)
wik-dps-tp03-api-2    | Ping received on 8e6218f2e0d8
wik-dps-tp03-nginx-1  | 172.20.0.1 - - [17/Oct/2023:09:03:28 +0000] "GET /ping HTTP/1.1" 200 880 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.46" "-"

# DEUXIEME PING : On passe par le nginx, et le container "api-1" a été appelé (avec le hostname 16d112da8a7f)
wik-dps-tp03-api-1    | Ping received on 16d112da8a7f
wik-dps-tp03-nginx-1  | 172.20.0.1 - - [17/Oct/2023:09:03:30 +0000] "GET /ping HTTP/1.1" 200 880 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.46" "-"

# TROISIEME PING : On passe par le nginx, et le container "api-3" a été appelé (avec le hostname 316743f961ef)
wik-dps-tp03-api-3    | Ping received on 316743f961ef
wik-dps-tp03-nginx-1  | 172.20.0.1 - - [17/Oct/2023:09:03:32 +0000] "GET /ping HTTP/1.1" 200 880 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.46" "-"

# QUATRIEME PING : On passe par le nginx, et le container "api-4" a été appelé (avec le hostname 28b7db193237)
wik-dps-tp03-api-4    | Ping received on 28b7db193237
wik-dps-tp03-nginx-1  | 172.20.0.1 - - [17/Oct/2023:09:03:36 +0000] "GET /ping HTTP/1.1" 200 880 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.46" "-"
```