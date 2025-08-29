# 📊 CONTRIBUTING.md - Beitragsleitfaden

## 🌟 Willkommen bei SignatureMatrix!

Vielen Dank für Ihr Interesse, zu SignatureMatrix beizutragen! Diese Anleitung hilft Ihnen dabei, **EU-konforme** und **ethisch einwandfreie** Beiträge zu leisten.

## 🎯 Arten von Beiträgen

### 🔐 Sicherheit & Compliance
- **GDPR/DSGVO-Verbesserungen**
- **eIDAS-Konformität** Optimierungen
- **Sicherheitslücken** schließen
- **Audit-Trail** Erweiterungen

### 🎨 Benutzerfreundlichkeit
- **Accessibility** (WCAG 2.1 AA+)
- **Internationalisierung** (i18n)
- **Mobile Optimierung**
- **Design System** Verbesserungen

### 🧩 Funktionalität
- **Neue Verifizierungsmethoden**
- **EU-Credential Integration**
- **Performance Optimierungen**
- **API Erweiterungen**

## 📋 Beitragsprozess

### 1. 🍴 Fork & Clone
```bash
# Repository forken auf GitHub
git clone https://github.com/IHR-USERNAME/signaturematrix.git
cd signaturematrix
npm install
```

### 2. 🌿 Branch erstellen
```bash
# Feature Branch erstellen
git checkout -b feature/eu-compliance-improvement

# Oder Bug Fix Branch
git checkout -b fix/gdpr-data-deletion
```

### 3. 🔧 Entwicklung
```bash
# Entwicklungsserver starten
npm run dev

# Tests ausführen
npm test

# Code-Style prüfen
npm run lint
```

### 4. ✅ Qualitätssicherung

#### Compliance Checklist:
- [ ] **GDPR-konform**: Keine unnötige Datenspeicherung
- [ ] **eIDAS-konform**: Kryptografische Standards eingehalten
- [ ] **Accessible**: WCAG 2.1 AA Standards erfüllt
- [ ] **Ethical**: Menschenrechts-konform implementiert
- [ ] **Secure**: Sicherheitsrichtlinien befolgt

#### Code Quality:
- [ ] **Tests**: Mindestens 80% Coverage
- [ ] **Documentation**: Vollständig dokumentiert
- [ ] **Performance**: Keine Verschlechterung
- [ ] **Compatibility**: Cross-Browser getestet

### 5. 📝 Commit
```bash
# Conventional Commits verwenden
git commit -m "feat(gdpr): add automatic data deletion

- Implement automatic deletion after retention period
- Add user consent tracking
- Ensure compliance with Art. 17 GDPR
- Add audit logging for deletion events

Closes #123"
```

#### Commit Typen:
- `feat`: Neue Funktion
- `fix`: Bugfix
- `docs`: Dokumentation
- `style`: Code-Formatierung
- `refactor`: Code-Refactoring
- `test`: Tests hinzufügen
- `chore`: Maintenance Tasks
- `security`: Sicherheitsverbesserungen
- `compliance`: Compliance-Updates

### 6. 🚀 Pull Request

```markdown
## 📝 Beschreibung
Kurze Beschreibung der Änderungen

## 🎯 Motivation
Warum ist diese Änderung notwendig?

## 🔄 Änderungen
- [ ] Feature A hinzugefügt
- [ ] Bug B behoben
- [ ] Dokumentation C aktualisiert

## 🔐 Compliance Check
- [ ] GDPR-konform
- [ ] eIDAS-konform
- [ ] Accessibility getestet
- [ ] Sicherheit geprüft

## 🧪 Testing
- [ ] Unit Tests geschrieben
- [ ] Integration Tests bestanden
- [ ] E2E Tests erfolgreich
- [ ] Manual Testing durchgeführt

## 📚 Dokumentation
- [ ] README aktualisiert
- [ ] API Docs ergänzt
- [ ] Code kommentiert
- [ ] CHANGELOG.md aktualisiert

## 🔗 Related Issues
Closes #123
Relates to #456
```

## 🛠️ Entwicklungsumgebung

### Systemvoraussetzungen:
- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **Git**: >= 2.30.0

### Empfohlene Tools:
- **VSCode** mit Extensions:
  - ESLint
  - Prettier
  - GitLens
  - GDPR Compliance Checker

## 📐 Code Standards

### JavaScript/JSX:
```javascript
// ✅ Gut - GDPR-konform
const handleUserData = (userData) => {
  // Minimal data collection
  const { email, consentTimestamp } = userData;
  
  // Explicit consent check
  if (!hasValidConsent(consentTimestamp)) {
    throw new Error('Missing user consent');
  }
  
  return processMinimalData({ email });
};

// ❌ Schlecht - Übersammlung von Daten
const handleUserData = (userData) => {
  // Sammelt mehr Daten als notwendig
  return saveCompleteUserProfile(userData);
};
```

### CSS/TailwindCSS:
```css
/* ✅ Gut - Accessible */
.button-primary {
  @apply bg-primary text-primary-foreground;
  @apply focus:ring-2 focus:ring-primary focus:ring-offset-2;
  @apply min-h-[44px] min-w-[44px]; /* Touch targets */
}

/* ❌ Schlecht - Nicht accessible */
.button-primary {
  @apply bg-blue-500 text-white text-xs p-1;
}
```

## 🔍 Code Review Prozess

### Review Kriterien:
1. **Funktionalität**: Löst die Änderung das Problem?
2. **Compliance**: Sind alle EU-Standards eingehalten?
3. **Security**: Wurden Sicherheitsaspekte berücksichtigt?
4. **Performance**: Verschlechtert sich die Performance?
5. **Maintainability**: Ist der Code wartbar?

### Review Schritte:
1. **Automated Checks**: CI/CD Pipeline
2. **Code Review**: Mindestens 2 Reviewer
3. **Security Review**: Bei sicherheitskritischen Änderungen
4. **Compliance Review**: Bei GDPR/eIDAS relevanten Änderungen

## 🎨 Design Guidelines

### EU Design Principles:
- **Accessibility First**: WCAG 2.1 AAA anstreben
- **Privacy by Design**: Datenschutz von Anfang an
- **Inclusive Design**: Für alle Menschen zugänglich
- **Sustainable Design**: Umweltfreundlich und effizient

### Farben & Branding:
```css
:root {
  /* EU-konforme Farben */
  --eu-blue: #003399;
  --eu-yellow: #FFCC00;
  
  /* SignatureMatrix Primärfarben */
  --matrix-green: #00FF88;
  --matrix-dark: #0F0F1A;
  
  /* Accessibility Farben */
  --success: #22C55E;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;
}
```

## 🧪 Testing Guidelines

### Test Pyramid:
```
    🔺 E2E Tests (10%)
   🔺🔺 Integration Tests (20%)
  🔺🔺🔺 Unit Tests (70%)
```

### Test Kategorien:
- **Unit Tests**: Einzelne Funktionen
- **Integration Tests**: Komponenten-Zusammenspiel
- **E2E Tests**: Vollständige User Journeys
- **Accessibility Tests**: WCAG Compliance
- **Security Tests**: Penetration Testing
- **Performance Tests**: Load Testing

### Test Beispiel:
```javascript
describe('EmailVerification', () => {
  it('should comply with GDPR data minimization', () => {
    const userData = {
      email: 'test@example.com',
      unnecessary: 'should not be stored'
    };
    
    const result = processEmailVerification(userData);
    
    // Nur notwendige Daten gespeichert
    expect(result.storedData).toEqual({
      email: 'test@example.com',
      timestamp: expect.any(Date)
    });
    
    // Keine überflüssigen Daten
    expect(result.storedData.unnecessary).toBeUndefined();
  });
});
```

## 📚 Dokumentation

### Dokumentationspflicht:
- **Alle Public APIs** müssen dokumentiert sein
- **GDPR-relevante Funktionen** benötigen Compliance-Docs
- **Sicherheitskritische Features** brauchen Security-Docs
- **Neue Dependencies** müssen lizenzrechtlich geprüft werden

### JSDoc Beispiel:
```javascript
/**
 * Verarbeitet Benutzerdaten GDPR-konform
 * @param {Object} userData - Benutzerdaten
 * @param {string} userData.email - E-Mail Adresse
 * @param {Date} userData.consentTimestamp - Zeitpunkt der Einwilligung
 * @returns {Promise<VerificationResult>} Verifizierungsergebnis
 * @throws {GDPRComplianceError} Bei fehlender Einwilligung
 * @compliance GDPR Art. 6(1)(a) - Einwilligung erforderlich
 * @security Input wird validiert und sanitisiert
 */
async function processUserDataGDPRCompliant(userData) {
  // Implementation...
}
```

## 🚀 Release Prozess

### Versioning (Semantic Versioning):
- **Major**: Breaking Changes oder neue Compliance-Requirements
- **Minor**: Neue Features, rückwärtskompatibel
- **Patch**: Bugfixes und Security Updates

### Release Checklist:
- [ ] Alle Tests bestanden
- [ ] Security Audit durchgeführt
- [ ] GDPR Compliance Review
- [ ] Performance Benchmarks
- [ ] Documentation aktualisiert
- [ ] CHANGELOG.md gepflegt
- [ ] Release Notes erstellt

## 🏆 Anerkennung

### Contributor Levels:
- 🥉 **Bronze**: Erste PR merged
- 🥈 **Silver**: 5+ PRs, davon mind. 1 Security/Compliance
- 🥇 **Gold**: 10+ PRs, aktive Community-Teilnahme
- 💎 **Diamond**: Core Maintainer, signifikante Beiträge

### Belohnungen:
- **Anerkennung** im README und Release Notes
- **Digitale Badges** für Profile
- **Early Access** zu neuen Features
- **Einladung** zu Community Events

## 📞 Hilfe & Support

### Entwickler Support:
- 💬 **Discord**: [#dev-support](https://discord.gg/signaturematrix)
- 📧 **E-Mail**: dev-support@signaturematrix.eu
- 📚 **Docs**: [docs.signaturematrix.eu](https://docs.signaturematrix.eu)

### Mentoring:
- 👥 **Pairing Sessions**: Für neue Contributors
- 🎓 **Learning Paths**: GDPR/eIDAS Grundlagen
- 🔄 **Code Reviews**: Konstruktives Feedback

---

**Vielen Dank für Ihren Beitrag zu einer ethischen und compliance-konformen digitalen Zukunft! 🌟**