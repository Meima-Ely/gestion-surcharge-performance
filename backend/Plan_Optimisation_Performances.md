# Plan 1 : Gestion de la Surcharge et Optimisation des Performances

Ce document présente comment les étapes théoriques de gestion de la surcharge ont été **pratiquement mises en place** dans le projet `landing_page_azouggi`.

## 1.1 Problématique
Une seule instance d'API (serveur backend) peut rapidement devenir saturée lors d'une charge utilisateur élevée ou lors de pannes inattendues. Cela entraîne des temps de réponse ralentis, voire une indisponibilité (downtime) du service, dégradant fortement l'expérience utilisateur et l'efficacité globale de l'application.

## 1.2 Objectifs de la recherche / du projet
* **Répartition de la charge (Load Balancing) :** Distribuer intelligemment le trafic entrant pour éviter qu'un seul serveur ne soit submergé.
* **Haute Disponibilité (High Availability - HA) :** Garantir que si un composant backend tombe en panne, les autres prennent le relais de façon transparente.
* **Observabilité et Monitoring :** Surveiller en temps réel l'utilisation des ressources et les performances applicatives pour réagir proactivement aux éventuelles surcharges.

## 1.3 Questions de recherche
* Comment répartir dynamiquement et de façon transparente la charge entre plusieurs instances du serveur backend Flask ?
* Comment exposer, collecter et centraliser les métriques de performance des différentes instances (temps de réponse, taux d'erreurs, requêtes par seconde) ?
* Comment visualiser visuellement l'état du système pour identifier rapidement les goulots d'étranglement (bottlenecks) ?

## 1.4 Méthodologie (Mise en pratique)
L'approche adoptée repose sur une architecture de microservices conteneurisée via **Docker Compose**, permettant une reproductibilité complète. Les étapes de réalisation sont les suivantes :

1. **Réplication Horizontale de l'API :**
   Le fichier `docker-compose.yml` déploie simultanément **trois instances** distinctes du backend Flask (`api1`, `api2`, `api3`), partageant les mêmes sources de données (volume `shared_db`).
2. **Reverse Proxy et Répartiteur de charge (Load Balancer) :**
   Un service **Nginx** est positionné en amont sur le port 80. La configuration `nginx.conf` inclut un bloc `upstream flask_backend` qui redirige les requêtes entrantes (ex: `/devis`) de façon équitable vers les trois API. 
3. **Instrumentation des données :**
   Les API Backend exposent deux routes cruciales :
   * `/health` : Pour vérifier si l'API est en vie.
   * `/metrics` : Pour exposer les données analytiques requises.
4. **Collecte (Scraping) des métriques :**
   Un conteneur **Prometheus** (sur le port 9090) est configuré via `prometheus.yml` pour interroger ("scraper") toutes les 5 secondes l'endpoint `/metrics` de `api1`, `api2` et `api3`.
5. **Tableaux de bord (Dashboards) :**
   Un conteneur **Grafana** (sur le port 3000) est déployé, se connectant à la source de données Prometheus afin de tracer des graphiques en temps réel sur les performances du système.

## 1.5 Livrables attendus et produits
Au sein du répertoire `backend`, les livrables suivants sont déjà opérationnels et en production (voir votre interface Docker Desktop) :
* [X] Le fichier d'orchestration **`docker-compose.yml`**.
* [X] La configuration du Proxy HTTP **`nginx.conf`**.
* [X] Le fichier de règles de scraping **`prometheus.yml`**.
* [X] Trois microservices de l'application (api1, api2, api3) en cours d'exécution.
* [X] L'interface Grafana de restitution visuelle.

## 1.6 Outils recommandés et utilisés
* **Docker & Docker Compose :** Standard de l'industrie pour le déploiement multi-conteneurs local et en production.
* **Nginx :** Un des serveurs proxy / répartiteurs de charge les plus performants, agissant comme point d'entrée unique.
* **Python / Flask :** Environnement d'exécution de l'API métier.
* **Prometheus :** Solution open-source native au Cloud pour le monitoring des séries temporelles.
* **Grafana :** Plateforme leader pour la composition de tableaux de bord opérationnels interactifs.

## 1.7 Grille d’évaluation (Critères Pratiques de Succès)
Pour évaluer concrètement ce système, vous pouvez effectuer les tests suivants :

| Critère d'évaluation | Test pratique suggéré | Résultat attendu (Validation) |
| :--- | :--- | :--- |
| **Paiement de la dette technique / Scalabilité** | Simuler 1000 requêtes concurrentes. | Le `nginx` distribue ces requêtes aux trois conteneurs APIs sans erreur de surcharge (Timeout). |
| **Tolérance aux pannes (Failover)** | Stopper *volontairement* le conteneur `api1` depuis Docker Desktop, puis actualiser le site web. | Le site continue de fonctionner normalement, le trafic étant géré par `api2` et `api3`. |
| **Clarté du Monitoring** | Ouvrir http://localhost:3001 (Grafana) et observer. | Des graphiques montrent le nombre de requêtes entrantes, la charge CPU et la disponibilité. |

---
**Note d'accompagnement :** 
Ce plan de mise en page prouve concrètement comment les outils que vous avez d'ores et déjà branchés (*Prometheus*, *Grafana*, *Nginx*, *3 APIs*) répondent très exactement au **Plan 1** de votre projet de recherche/études.
