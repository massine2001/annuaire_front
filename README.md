# 📁 Annuaire - Gestionnaire de Documents Partagés


## 🕘 Version antérieure de docsManager

Ce projet correspond à la **version initiale du front-end de docsManager**, conçue pour interagir avec le back-end `annuaire_back_jwt_auth`.  
L’authentification reposait sur des **JWT classiques** : le front recevait le token directement après login et l’envoyait dans chaque requête HTTP.  
Cette approche a ensuite été remplacée par une architecture intégrant un **BFF** et un **serveur d’autorisation (OIDC)** afin d’assurer une meilleure sécurité et une isolation complète des responsabilités.  

La version moderne de la plateforme est disponible ici : [massine2001/docsManager](https://github.com/massine2001/docsManager).





###  Authentification 
- Inscription/Connexion avec validation des mots de passe (12+ caractères, complexité)
- Authentification par HttpOnly cookies (protection XSS)
- Sessions persistantes
- Indicateur de force du mot de passe en temps réel

###  Gestion des Pools
- Création de pools (espaces de partage)
- Gestion des membres avec rôles (owner/admin/member)
- Invitation de nouveaux membres
- Statistiques détaillées par pool
- Suppression sécurisée avec contrôle d'accès

###  Gestion des Documents
- Upload de fichiers multiples formats
- Modification des métadonnées (nom, description, date d'expiration)
- Téléchargement et prévisualisation
- Suppression sécurisée
- Filtrage et recherche avancée
- Vue groupée par uploadeur

###  Profil Utilisateur
- Modification des informations personnelles
- Changement de mot de passe sécurisé
- Statistiques personnelles (documents uploadés, pools actifs)
- Vue d'ensemble de l'activité

###  Statistiques & Analytics
- Statistiques globales (QuickData)
- Statistiques par pool (membres, fichiers, activité)
- Graphiques de distribution
- Top contributeurs

##  Technologies

- **Frontend**: React 19 + TypeScript + Vite
- **Routing**: React Router v7
- **HTTP Client**: Axios avec withCredentials
- **Styling**: CSS modules personnalisés
- **Build**: Vite (optimisation de production)
- **Déploiement**: Vercel

