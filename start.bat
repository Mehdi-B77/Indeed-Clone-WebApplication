@echo off

rem N'oubliez pas de npm install sur le backend globalement avant de lancer le script

rem Ouvrir une nouvelle console et lancer le premier service
start  "Service Registry" cmd /k "cd /d C:\Users\mehdi\Desktop\VersionStable\interim-Develop-Projet_V3\Projet_V3\interim_stages_collab_back\service_registry  && npm install &&  nodemon --title "Service Registry" service.js"

timeout /t 5

rem Ouvrir une nouvelle console et lancer le deuxième service
start "Service Abonnements" cmd /k "cd /d C:\Users\mehdi\Desktop\VersionStable\interim-Develop-Projet_V3\Projet_V3\interim_stages_collab_back\service_abonnements  && npm install && nodemon --title "Service Abonnements" service.js"


rem Ouvrir une nouvelle console et lancer le troisième service
start "Service Authentication" cmd /k "cd /d C:\Users\mehdi\Desktop\VersionStable\interim-Develop-Projet_V3\Projet_V3\interim_stages_collab_back\service_authentication  && npm install && nodemon --title "Service Authentication" service.js"


rem Ouvrir une nouvelle console et lancer le quatrième service
start "Service Candidatures"  cmd /k "cd /d C:\Users\mehdi\Desktop\VersionStable\interim-Develop-Projet_V3\Projet_V3\interim_stages_collab_back\service_candidatures  && npm install && nodemon --title "Service Candidatures"  service.js"


rem Ouvrir une nouvelle console et lancer le cinquième service
start "Service Emplois"  cmd /k "cd /d C:\Users\mehdi\Desktop\VersionStable\interim-Develop-Projet_V3\Projet_V3\interim_stages_collab_back\service_emplois  && npm install && nodemon --title "Service Emplois" service.js"


rem Ouvrir une nouvelle console et lancer le sixième service
start "Service Notifications"  cmd /k "cd /d C:\Users\mehdi\Desktop\VersionStable\interim-Develop-Projet_V3\Projet_V3\interim_stages_collab_back\service_notifications  && npm install && nodemon --title "Service Notifications"  service.js"


rem Ouvrir une nouvelle console et lancer le septième service
start "Service Offres"  cmd /k "cd /d C:\Users\mehdi\Desktop\VersionStable\interim-Develop-Projet_V3\Projet_V3\interim_stages_collab_back\service_offres  && npm install && nodemon --title "Service Offres"  service.js"


rem Ouvrir une nouvelle console et lancer le huitième service
start "Service Paiements" cmd /k "cd /d C:\Users\mehdi\Desktop\VersionStable\interim-Develop-Projet_V3\Projet_V3\interim_stages_collab_back\service_paiements  && npm install && nodemon --title "Service Paiements"  service.js"


rem Ouvrir une nouvelle console et lancer le neuvième service
start "Service Users" cmd /k "cd /d C:\Users\mehdi\Desktop\VersionStable\interim-Develop-Projet_V3\Projet_V3\interim_stages_collab_back\service_users  && npm install && nodemon --title "Service Users" service.js"

rem Ouvrir une nouvelle console et lancer le dixiéme service
start "Service Conventions" cmd /k "cd /d C:\Users\mehdi\Desktop\VersionStable\interim-Develop-Projet_V3\Projet_V3\interim_stages_collab_back\service_conventions  && npm install && nodemon --title "Service Conventions" service.js"

timeout /t 15

rem Ouvrir une nouvelle console et lancer le onzieme service
start "API Gateway"  cmd /k "cd /d C:\Users\mehdi\Desktop\VersionStable\interim-Develop-Projet_V3\Projet_V3\interim_stages_collab_back\api_gateway  && npm install && nodemon --title "API Gateway" app.js"

timeout /t 15

rem Ouvrir une nouvelle console et lancer le Frontend
start "Frontend"  cmd /k "cd /d C:\Users\mehdi\Desktop\VersionStable\interim-Develop-Projet_V3\Projet_V3\interim_stages_collab_front  && npm install && npm start --title "Frontend" 

rem Garder la fenêtre ouverte pour afficher les résultats
pause

