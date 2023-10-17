# MODULE - DevOps : WIK-DPS-TP03

- [I - Prérequis](#i---prérequis)
- [II - Installation & Dépendances](#ii---installation--dépendances)
    - En single-stage
    - En multi-stage
- [III - Lancement du projet](#iii---lancement-du-projet)
    - Avec le port par défaut
    - En précisant un port
- [IV - Docker scan](#iv---docker-scan)

## I - Prérequis

Pour lancer ce projet, vous devez avoir docker d'installé sur votre machine.

## II - Installation & Dépendances

Pour commencer, récupérons l'app en utilisant la commande suivante !

```bash
git clone https://github.com/LukaGrc/WIK-DPS-TP02.git
```

Dans le dossier qui vient d'être crée, nous allons maintenant build l'image Docker :

Deux solutions sont possibles : build un docker single-stage ou un docker multi-stage

- Image single-stage :
    ```bash
    docker build --file single_stage.Dockerfile -t wik-dps-tp02 .
    ```
- Image multi-stage :
    ```bash
    docker build --file multi_stage.Dockerfile -t wik-dps-tp02 .
    ```

## III - Lancement du projet

Pour lancer le container, vous devez exécuter la commande suivante :

```bash
docker run -p 80:3000 wik-dps-tp02 # Par défaut, si aucun port n'est précisé en variable d'environnement, nous utilisons le port 3000.

# OU

docker run -p 80:8080 -e PING_LISTEN_PORT=8080 wik-dps-tp02 # Ici, on précise explicitement la variable d'environnement
```

- Le flag `-p [port host]:[port container]` nous permet de relier le port de mon container à mon port hôte. Mon API sera donc accessible depuis le port 80 de mon PC.
- Le flag `-e [nom variable]=[valeur]` permet de préciser une variable d'environnement à notre container qui écrasera cellles par défaut (s'il y en a).

Il est maintenant possible de se rendre sur `http://localhost/ping`!

## IV - Docker scan

> La commande `docker scan` semble avoir été supprimée. Il est désormais proposé d'utiliser la commande `docker scout`

Vous trouverez en suivant le récapitulatif de ma commande `docker scout`. Aucune vulnérabilité ne semble avoir été détectée.

```bash
PS C:\Users\Utilisateur\Desktop\YNOV\WIK-DPS-TP02> docker scout recommendations wik-dps-tp02
    v SBOM of image already cached, 278 packages indexed

Recommended fixes for image  wik-dps-tp02 

  Base image is  node:18-alpine 

  Name            │  hydrogen-alpine3.18 
  Digest          │  sha256:c41b5bfd0ef6f2db8f50323ce5ffb39f4ad444b5e5796c819ba4b1b799fbfdc2 
  Vulnerabilities │    0C     0H     0M     0L 
  Pushed          │ 3 days ago
  Size            │ 54 MB
  Packages        │ 258
  Flavor          │ alpine
  OS              │ 3.18
  Runtime         │ 18


  │ The base image is also available under the supported tag(s)  18- 
  │ alpine3.18 ,  18.18-alpine ,  18.18-alpine3.18 ,  18.18.1-alpine ,
  │ 18.18.1-alpine3.18 ,  hydrogen-alpine ,  hydrogen-alpine3.18 ,  lts-
  │ alpine ,  lts-alpine3.18 . If you want to display recommendations
  │ specifically for a different tag, please re-run the command using
  │ the  --tag  flag.




Refresh base image
  Rebuild the image using a newer base image version. Updating this may result in breaking changes.

  v This image version is up to date.


Change base image
  Select the tag you would like to see recommendations for. The list displays new recommended tags in descending order, where the top results are rated as most suitable.


              Tag              │                   Details                   │   Pushed    │       Vulnerabilities
───────────────────────────────┼─────────────────────────────────────────────┼─────────────┼──────────────────────────────
   20-alpine                   │ Benefits:                                   │ 2 weeks ago │    0C     0H     0M     0L
  Major runtime version update │ • Same OS detected                          │             │
  Also known as:               │ • Major runtime version update              │             │
  • alpine                     │ • Image has similar size                    │             │
  • alpine3.18                 │ • Image has same number of vulnerabilities  │             │
  • 20.8.0-alpine              │ • Image contains similar number of packages │             │
  • 20.8.0-alpine3.18          │                                             │             │
  • 20.8-alpine                │ Image details:                              │             │
  • 20.8-alpine3.18            │ • Size: 56 MB                               │             │
  • current-alpine             │ • Flavor: alpine                            │             │
  • current-alpine3.18         │ • OS: 3.18                                  │             │
  • 20-alpine3.18              │ • Runtime: 19                               │             │
                               │                                             │             │
                               │                                             │             │
                               │                                             │             │
   slim                        │ Benefits:                                   │ 3 days ago  │    0C     0H     0M    17L 
  Tag is preferred tag         │ • Tag is preferred tag                      │             │                        +17
  Also known as:               │ • Major runtime version update              │             │
  • 20.8.0-slim                │ • Tag is using slim variant                 │             │
  • 20.8-slim                  │ • slim was pulled 17K times last month      │             │
  • current-slim               │                                             │             │
  • 20-slim                    │ Image details:                              │             │
  • bookworm-slim              │ • Size: 80 MB                               │             │
  • 20-bookworm-slim           │ • Runtime: 19                               │             │
  • 20.8-bookworm-slim         │                                             │             │
  • 20.8.0-bookworm-slim       │                                             │             │
  • current-bookworm-slim      │                                             │             │
                               │                                             │             │
                               │                                             │             │
```