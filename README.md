# 🏢 PROJECT_System_FF - Système de Pointage

Système de gestion des présences pour le PROJECT_System_FF, utilisant Biométrie, QR Code et Code-barres.

## 📋 Prérequis

Avant d'installer, assurez-vous d'avoir :

| Outil | Version | Téléchargement |
|-------|---------|----------------|
| Java JDK | 17+ | [Adoptium](https://adoptium.net/) |
| Node.js | 18+ LTS | [nodejs.org](https://nodejs.org/) |
| Maven | 3.9+ | [maven.apache.org](https://maven.apache.org/) |

---

## 🚀 Installation Étape par Étape

### Étape 1 : Cloner le projet

```bash
git clone https://github.com/AmdyD-ux/PROJECT_System_FF.git
cd PROJECT_System_FF
```

### Étape 2 : Lancer le Backend (API)

```bash
cd backend
mvn spring-boot:run
```

> Le serveur démarre sur **http://localhost:8080**

### Étape 3 : Lancer le Frontend (Interface)

Ouvrez un **nouveau terminal** :

```bash
cd frontend
npm install
npm run dev
```

> L'interface démarre sur **http://localhost:5173**

### Étape 4 : Accéder à l'application

Ouvrez votre navigateur sur : **http://localhost:5173**

---

## 📱 Fonctionnalités

- ✅ Authentification JWT (Login/Signup)
- ✅ Tableau de bord Admin/Manager/Agent
- ✅ Pointage par Biométrie, QR Code, Code-barres
- ✅ Historique des présences
- ✅ Interface responsive

---

## 🏗️ Architecture

```
PROJECT_System_FF/
├── backend/          # Spring Boot 3 (API REST)
│   └── src/main/java/com/fonamif/backend/
└── frontend/         # React + Vite + TailwindCSS
    └── src/components/
```

---

## 👥 Rôles Utilisateurs

| Rôle | Accès |
|------|-------|
| **Admin** | Gestion complète + Rapports globaux |
| **Manager** | Vue direction + Rapports équipe |
| **Agent** | Pointage + Historique personnel |

---

## 🔧 Configuration Production

Pour la production, modifiez `backend/src/main/resources/application.properties` :

```properties
# PostgreSQL (décommenter)
spring.datasource.url=jdbc:postgresql://localhost:5432/fonamif_db
spring.datasource.username=votre_user
spring.datasource.password=votre_password
```

---

## 📚 Documentation

- [Guide Utilisateur (FR)](docs/GUIDE_UTILISATEUR.md)
- [Intégration Hardware](docs/HARDWARE.md)

---

## 📄 Licence

Projet développé pour le PROJECT_System_FF.

---

**Développé avec ❤️ par AmdyD-ux**
