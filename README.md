-----
Avvio del progetto
Per avviare il progetto assicurarsi di avere node.js installato sul proprio dispositivo.
Successivamente aprire la cartella del progetto nel CMD e digitare "npm run dev"
Se non dovesse funzionare utilizzare "npm install --force" e successivamente "npm run dev"

Se si utilizza Docker, lanciare i seguenti comandi:
1) docker build -t "polaris" .
2) docker run -dp 8000:5173 polaris


-----
Avvio del forum su Windows:
1)Scaricare Xampp
2)Inserire securedevai dentro la directory htdocs di Xampp
3)Dall'interfaccia dell'App di Xampp andare su phpmyadmin e importare il database in formato .sql chiamandolo wpframework
4)Cliccare su Start sui servizi Apache e MySQL e digitare l'url localhost/securedevai per avviare il forum

-----
1) Scaricare il file zip "securedevai", rimuovere la cartella iniziale e metterlo in /var/www
2) Scaricare il file wpframework.zip (contenente il DB in formato .sql)
3) Nel file .sql, cambiare tutti i riferimenti a localhost/securedevai con il dominio locale scelto (es: dev.securedevai_forum)
4) Creare il DB su mysql: lanciare `mysql -u USER -p` -> `CREATE DATABASE wpframework;` -> `mysql -u USER -p wpframework < wpframework1.sql`
5) Creare il file di configurazione Apache `securedevai_forum.conf` in /etc/apache2/sites-available
6) Abilitare il sito con `sudo a2ensite securedevai_forum.conf`
7) Fare reload di Apache: `sudo systemctl reload apache2`
8) Aggiungere il nuovo dominio `dev.securedevai_forum` in `/etc/hosts`
9) Inserire le credenziali per accedere al DB nel file wp-config.php

-----
Path assoluti da modidicare all'interno del file Catalogue.json quando verrà eseguita la migrazione sul web:
- http://localhost:5173/Learning#matrix-container (relativo all'immagine della Confusion Matrix; numero di occorrenze: 1);
- http://localhost:5173/Learning#tree (relativo all'immagine del Decision Tree; numero di occorrenze: 4).
