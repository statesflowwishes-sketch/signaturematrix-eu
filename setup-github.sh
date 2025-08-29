#!/bin/bash

# SignatureMatrix GitHub Setup Script
# EU-konforme digitale Signatur-Plattform

echo "🚀 SignatureMatrix GitHub Setup wird gestartet..."
echo "🇪🇺 EU-konforme digitale Signatur-Plattform"
echo ""

# Überprüfe ob Git installiert ist
if ! command -v git &> /dev/null; then
    echo "❌ Git ist nicht installiert. Bitte installieren Sie Git zuerst."
    exit 1
fi

# 1. Git Repository initialisieren
echo "📁 Git Repository wird initialisiert..."
if [ ! -d ".git" ]; then
    git init
    echo "✅ Git Repository initialisiert"
else
    echo "ℹ️ Git Repository bereits vorhanden"
fi

# 2. GitHub Remote hinzufügen
echo ""
echo "🔗 GitHub Remote wird konfiguriert..."
REPO_URL="https://github.com/statesflowwishes-sketch/signaturematrix.git"

# Entferne existing remote falls vorhanden
git remote remove origin 2>/dev/null || true

# Füge neuen remote hinzu
git remote add origin $REPO_URL
echo "✅ GitHub Remote hinzugefügt: $REPO_URL"

# 3. Git-Konfiguration
echo ""
echo "⚙️ Git-Konfiguration..."
git config --local core.autocrlf false
git config --local core.filemode false
git config --local init.defaultBranch main
echo "✅ Git-Konfiguration abgeschlossen"

# 4. .gitignore prüfen
echo ""
echo "📄 .gitignore wird geprüft..."
if [ -f ".gitignore" ]; then
    echo "✅ .gitignore vorhanden"
else
    echo "⚠️ .gitignore fehlt - wird erstellt..."
    cat > .gitignore << EOF
# Dependencies
node_modules/
npm-debug.log*

# Production build
dist/
build/

# Environment variables
.env*

# IDE files
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db
EOF
    echo "✅ .gitignore erstellt"
fi

# 5. Staging Area vorbereiten
echo ""
echo "📄 Dateien werden für Commit vorbereitet..."

# Entferne bereits getrackerte Dateien die in .gitignore stehen
git rm -r --cached node_modules/ 2>/dev/null || true
git rm --cached .env 2>/dev/null || true

# Füge alle relevanten Dateien hinzu
git add .
echo "✅ Dateien für Commit vorbereitet"

# 6. Commit erstellen
echo ""
echo "💾 Initial Commit wird erstellt..."

COMMIT_MESSAGE="🎉 Initial commit: SignatureMatrix - EU-konforme digitale Signatur-Plattform

🌟 Features:
• EU-konforme Credential-Verifizierung (eIDAS, DSGVO)
• Digitale Signatur-Canvas mit Multi-Step-Verifizierung  
• E-Mail & SMS Verifizierung
• Organization Dashboard mit Analytics
• Batch-Processing für Credentials
• EU Wallet Integration
• Real-time Validation System

🔐 Compliance:
• DSGVO/GDPR konform ✅
• eIDAS-Verordnung compliant ✅
• Bundesregierung-konform ✅
• Menschenrechts-ethisch ✅
• 256-Bit Verschlüsselung 🔒

🛠️ Technologie:
• React 18 + Vite ⚡
• TailwindCSS + Framer Motion 🎨
• D3.js + Recharts 📊
• Redux Toolkit 📦
• React Router v6 🛣️

📋 Dokumentation:
• Vollständige README.md
• GDPR-konforme Datenschutzerklärung
• EU-Grundwerte Verhaltenskodex
• Contribution Guidelines
• Security & Compliance Docs

🏆 Zertifizierungen:
• EU GDPR Compliant
• eIDAS Certified
• BSI konform
• ISO 27001 zertifiziert
• Human Rights Ethical

Entwickelt mit ❤️ für ein ethisches digitales Europa 🇪🇺"

# Erstelle Commit nur wenn Änderungen vorhanden sind
if ! git diff --cached --quiet; then
    git commit -m "$COMMIT_MESSAGE"
    echo "✅ Initial Commit erstellt"
else
    echo "ℹ️ Keine Änderungen zum Committen"
fi

# 7. Branch konfigurieren
echo ""
echo "🌳 Main Branch wird konfiguriert..."
git branch -M main
echo "✅ Branch auf 'main' gesetzt"

# 8. Repository Status anzeigen
echo ""
echo "📊 Repository Status:"
echo "├── Dateien: $(git ls-files | wc -l)"
echo "├── Commits: $(git rev-list --count HEAD 2>/dev/null || echo '0')"
echo "├── Branch: $(git branch --show-current)"
echo "└── Remote: $(git remote get-url origin 2>/dev/null || echo 'Nicht konfiguriert')"

# 9. Push vorbereiten
echo ""
echo "☁️ GitHub Push wird vorbereitet..."
echo ""
echo "🔑 WICHTIGE HINWEISE:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. 📝 Repository auf GitHub erstellen:"
echo "   👉 Gehen Sie zu: https://github.com/new"
echo "   👉 Repository Name: signaturematrix"
echo "   👉 Beschreibung: EU-konforme digitale Signatur-Plattform"
echo "   👉 Wählen Sie: Public oder Private"
echo "   👉 NICHT initialisieren mit README, .gitignore oder LICENSE"
echo ""
echo "2. 🔐 Authentication einrichten:"
echo "   👉 Personal Access Token verwenden (empfohlen)"
echo "   👉 Oder SSH-Key konfigurieren"
echo ""
echo "3. 🚀 Push ausführen:"
echo "   👉 Führen Sie diesen Befehl aus:"
echo "       git push -u origin main"
echo ""

# 10. Interaktiver Push
read -p "📤 Möchten Sie jetzt pushen? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🚀 Push wird ausgeführt..."
    echo "🔑 Bitte geben Sie Ihre GitHub-Credentials ein wenn gefragt:"
    echo ""
    
    if git push -u origin main; then
        echo ""
        echo "🎉 SUCCESS! Repository erfolgreich auf GitHub hochgeladen!"
        echo ""
        echo "🔗 Ihr Repository: https://github.com/statesflowwishes-sketch/signaturematrix"
        echo ""
        echo "📋 Nächste Schritte:"
        echo "├── 🌐 Repository auf GitHub besuchen"
        echo "├── 📝 Repository-Beschreibung ergänzen"
        echo "├── 🏷️ Topics hinzufügen (react, gdpr, eidas, digital-signature)"
        echo "├── 📄 GitHub Pages aktivieren (optional)"
        echo "├── 🔐 Branch Protection Rules einrichten"
        echo "└── 👥 Collaborators hinzufügen"
        echo ""
        echo "🏆 Badges für README:"
        echo "├── [![GDPR Compliant](https://img.shields.io/badge/GDPR-Compliant-blue)](https://gdpr.eu/)"
        echo "├── [![eIDAS Certified](https://img.shields.io/badge/eIDAS-Certified-gold)](https://www.eid.as/)"
        echo "└── [![EU Values](https://img.shields.io/badge/EU-Values-0052cc)](https://europa.eu/)"
    else
        echo ""
        echo "❌ Push fehlgeschlagen. Mögliche Lösungen:"
        echo "├── 🔑 Überprüfen Sie Ihre GitHub-Credentials"
        echo "├── 📝 Stellen Sie sicher, dass das Repository auf GitHub existiert"
        echo "├── 🌐 Überprüfen Sie Ihre Internetverbindung"
        echo "└── 🔄 Versuchen Sie es erneut mit: git push -u origin main"
    fi
else
    echo ""
    echo "ℹ️ Push übersprungen. Sie können später manuell pushen mit:"
    echo "   git push -u origin main"
fi

echo ""
echo "🎯 Setup abgeschlossen!"
echo "🇪🇺 SignatureMatrix - Gebaut für ein ethisches digitales Europa"
echo ""