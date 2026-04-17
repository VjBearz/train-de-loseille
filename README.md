# 🚂💰 Le Train de l'Oseille

**Votre brief quotidien des marchés financiers**

Site d'actualités financières auto-généré quotidiennement par Claude AI.

---

## 📋 Structure du projet

```
le-train-de-loseille/
├── index.html          # Page d'accueil avec le brief du jour
├── archives.html       # Page des archives (30 derniers jours)
├── styles.css          # Styles CSS (design SNCF x Finance)
├── script.js           # JavaScript pour les animations et chargement JSON
├── data/
│   ├── latest.json     # Contenu du jour (généré automatiquement)
│   └── archives.json   # Liste des archives
└── README.md           # Ce fichier
```

---

## 🚀 Déploiement sur GitHub Pages

### Étape 1 : Créer le repository GitHub

1. Connecte-toi sur [github.com](https://github.com)
2. Clique sur **New repository**
3. Nom : `le-train-de-loseille`
4. Public
5. **NE PAS** initialiser avec README (on a déjà les fichiers)
6. Clique sur **Create repository**

### Étape 2 : Uploader les fichiers

**Option A : Via l'interface GitHub (plus simple)**
1. Dans ton nouveau repo, clique sur **uploading an existing file**
2. Glisse-dépose TOUS les fichiers (index.html, styles.css, script.js, archives.html, et le dossier data/)
3. Commit message : "🚂 Initial commit - Le Train de l'Oseille"
4. Clique sur **Commit changes**

**Option B : Via ligne de commande (si tu connais Git)**
```bash
cd /chemin/vers/les/fichiers
git init
git add .
git commit -m "🚂 Initial commit - Le Train de l'Oseille"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/le-train-de-loseille.git
git push -u origin main
```

### Étape 3 : Activer GitHub Pages

1. Dans ton repo, va dans **Settings** → **Pages**
2. Source : **Deploy from a branch**
3. Branch : **main** → dossier **/ (root)**
4. Clique sur **Save**
5. Attends 1-2 minutes

✅ Ton site sera disponible à : `https://TON_USERNAME.github.io/le-train-de-loseille/`

---

## 🤖 Automatisation avec Claude (Routine quotidienne)

### Configuration de la routine Claude

1. **Dans Claude.ai**, va dans **Routines** → **New Routine**
2. **Type** : À distance
3. **Nom** : "Génération Brief Train de l'Oseille"
4. **Déclencheur** : Programmé
   - Heure : **7h00** (ou l'heure que tu veux)
   - Jours : **Tous les jours** (ou Lun-Ven si tu veux seulement les jours ouvrés)

### Prompt de la routine

```
Tu es le générateur automatique du site "Le Train de l'Oseille" 🚂💰.

Ta mission : Créer le brief quotidien des marchés financiers en français.

## Structure à respecter :

1. **Contexte Macro** (2-3 paragraphes)
   - Décisions Fed/BCE
   - Tensions géopolitiques
   - Événements économiques majeurs

2. **Marchés Actions** (avec données chiffrées)
   - CAC 40, S&P 500, NASDAQ
   - 3-5 valeurs à surveiller (dont NVIDIA, Schneider, TotalEnergies, LVMH)
   - Inclure le HTML des market-cards

3. **Crypto** (avec données chiffrées)
   - BTC, ETH, SOL
   - Analyse on-chain
   - Inclure le HTML des crypto-cards

4. **Matières Premières**
   - Or, Pétrole, Argent
   - Contexte de marché

5. **Opportunités & Risques**
   - 1 opportunité avec score /10 et conviction
   - 1 risque à surveiller
   - Inclure le HTML des insight-cards

6. **Plan d'Action**
   - 3-5 actions concrètes
   - Allocation suggérée (Capital ref: 10 000€, max 30% par actif)

## Sources à utiliser :
- Yahoo Finance
- Investing.com
- TradingView
- CoinGecko
- Bloomberg
- Les Échos
- Trading Economics

## Format de sortie :
Génère un JSON structuré comme dans `data/latest.json` avec :
- date (YYYY-MM-DD)
- generated_at (ISO timestamp)
- macro (HTML)
- actions (HTML)
- crypto (HTML)
- commodities (HTML)
- opportunities (HTML)
- action (HTML)

⚠️ IMPORTANT :
- Utilise les vrais cours du jour (recherche web activée)
- Écris en français
- HTML seulement dans les sections (pas de balises <html>, <body>)
- Conserve les classes CSS existantes

Une fois généré, sauvegarde ce JSON dans un fichier et fournis-le-moi.
```

### Actions de la routine

1. **Action 1** : Recherche web (activer automatiquement)
   - La routine doit pouvoir chercher les cours actuels

2. **Action 2** : Génération du contenu
   - Claude génère le JSON

3. **Action 3** : Sauvegarde
   - Pour l'instant, Claude te donnera le JSON
   - Tu devras le copier-coller manuellement dans `data/latest.json`
   - Puis commit + push sur GitHub

---

## 🔄 Workflow manuel (temporaire)

En attendant l'automatisation complète :

### Chaque matin (7h00)

1. **Lance la routine Claude** manuellement ou attends l'exécution automatique
2. **Copie le JSON** généré par Claude
3. **Mets à jour `data/latest.json`** :
   - Ouvre le fichier sur GitHub
   - Clique sur l'icône ✏️ (Edit)
   - Colle le nouveau JSON
   - Commit : "📊 Brief du [date]"
4. **Le site se met à jour automatiquement** dans les 2-3 minutes

---

## 🎯 Automatisation complète (avancé)

Pour une vraie automatisation sans intervention manuelle :

### Option 1 : GitHub Actions + Make.com (Recommandé)

**Prérequis** : Compte Make.com (gratuit jusqu'à 1000 opérations/mois)

1. **Créer un scénario Make.com** :
   - Trigger : **Schedule** (7h00 tous les jours)
   - Module 1 : **HTTP Request** vers Claude API
     ```
     POST https://api.anthropic.com/v1/messages
     Headers:
       x-api-key: TON_API_KEY_ANTHROPIC
       anthropic-version: 2023-06-01
       content-type: application/json
     Body: {
       "model": "claude-sonnet-4-20250514",
       "max_tokens": 4000,
       "messages": [{"role": "user", "content": "[PROMPT CI-DESSUS]"}]
     }
     ```
   - Module 2 : **Parser JSON** de la réponse Claude
   - Module 3 : **GitHub - Update File**
     - Repository : `le-train-de-loseille`
     - Path : `data/latest.json`
     - Content : `{{parsed_json}}`
     - Commit message : "📊 Brief du {{formatDate(now, 'DD/MM/YYYY')}}"

2. **Activer le scénario** et tester

### Option 2 : Script Python + Cron (Si tu as un serveur)

```python
# update_brief.py
import anthropic
import json
from datetime import datetime
import os

client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

prompt = """[PROMPT CI-DESSUS]"""

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=4000,
    messages=[{"role": "user", "content": prompt}]
)

# Parser la réponse et extraire le JSON
# Sauvegarder dans data/latest.json
# Git commit + push automatique
```

Puis cron :
```bash
0 7 * * * /usr/bin/python3 /path/to/update_brief.py
```

---

## 🌐 Domaine personnalisé (optionnel)

Pour avoir `letraindeloseille.fr` au lieu de `username.github.io/...` :

1. **Achète le domaine** sur OVH, Gandi, Namecheap (~10€/an)
2. **Configure les DNS** :
   ```
   Type: A
   Nom: @
   Valeur: 185.199.108.153
   
   Type: A
   Nom: @
   Valeur: 185.199.109.153
   
   Type: A
   Nom: @
   Valeur: 185.199.110.153
   
   Type: A
   Nom: @
   Valeur: 185.199.111.153
   
   Type: CNAME
   Nom: www
   Valeur: TON_USERNAME.github.io
   ```
3. **Dans GitHub** → Settings → Pages → Custom domain
   - Écris : `letraindeloseille.fr`
   - Attends la vérification DNS (peut prendre 24h)
   - Active **Enforce HTTPS**

---

## 📊 Améliorations futures

- [ ] Mode sombre
- [ ] Graphiques interactifs (Chart.js)
- [ ] Système de notifications (email/Telegram)
- [ ] Archives complètes (au-delà de 30 jours)
- [ ] Comparaison veille vs jour
- [ ] Section "Performances du portfolio"
- [ ] Intégration APIs en temps réel

---

## 🛠️ Technologies utilisées

- **Frontend** : HTML5, CSS3 (Grid, Flexbox), JavaScript vanilla
- **Fonts** : Google Fonts (Crimson Pro + DM Sans)
- **Hébergement** : GitHub Pages (gratuit)
- **IA** : Claude Sonnet 4 (Anthropic)
- **Automation** : Make.com ou GitHub Actions

---

## 📞 Support

Créé avec ❤️ par Vrej pour la communauté finance.

**Contact** : [À compléter si tu veux]

---

## 📝 Licence

Usage personnel. Redistribution avec crédit.

---

**Bon voyage sur le Train de l'Oseille ! 🚂💰**
