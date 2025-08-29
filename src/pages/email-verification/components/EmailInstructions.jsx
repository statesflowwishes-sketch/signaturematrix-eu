import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const EmailInstructions = () => {
  const [expandedProvider, setExpandedProvider] = useState(null);

  const emailProviders = [
    {
      id: 'gmail',
      name: 'Gmail',
      icon: 'Mail',
      instructions: [
        'Öffnen Sie Gmail in Ihrem Browser oder der App',
        'Suchen Sie nach E-Mails von "SignatureMatrix"',
        'Prüfen Sie auch den Spam-Ordner',
        'Klicken Sie auf den blauen Bestätigungsbutton'
      ]
    },
    {
      id: 'outlook',
      name: 'Outlook',
      icon: 'Mail',
      instructions: [
        'Öffnen Sie Outlook oder Hotmail',
        'Überprüfen Sie den Posteingang und Junk-E-Mail-Ordner',
        'Suchen Sie nach "SignatureMatrix Bestätigung"',
        'Klicken Sie auf "E-Mail bestätigen"'
      ]
    },
    {
      id: 'yahoo',
      name: 'Yahoo Mail',
      icon: 'Mail',
      instructions: [
        'Melden Sie sich bei Yahoo Mail an',
        'Prüfen Sie Posteingang und Spam-Ordner',
        'Suchen Sie nach der Bestätigungs-E-Mail',
        'Folgen Sie dem Bestätigungslink'
      ]
    }
  ];

  const generalTips = [
    {
      icon: 'Clock',
      title: 'Zeitlimit beachten',
      description: 'Der Bestätigungslink ist 24 Stunden gültig'
    },
    {
      icon: 'Shield',
      title: 'Sicherheit',
      description: 'Klicken Sie nur auf Links von vertrauenswürdigen Absendern'
    },
    {
      icon: 'Smartphone',
      title: 'Mobile Geräte',
      description: 'Die Bestätigung funktioniert auch auf Mobilgeräten'
    },
    {
      icon: 'RefreshCw',
      title: 'Probleme?',
      description: 'Fordern Sie eine neue E-Mail an, falls nötig'
    }
  ];

  const toggleProvider = (providerId) => {
    setExpandedProvider(expandedProvider === providerId ? null : providerId);
  };

  return (
    <div className="space-y-6">
      {/* General Instructions */}
      <div className="bg-surface/30 rounded-lg p-4 border border-border/50">
        <div className="flex items-start space-x-3 mb-4">
          <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              So bestätigen Sie Ihre E-Mail
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>1. Öffnen Sie Ihr E-Mail-Programm oder Webmail</p>
              <p>2. Suchen Sie nach einer E-Mail von SignatureMatrix</p>
              <p>3. Klicken Sie auf den Bestätigungslink oder -button</p>
              <p>4. Kehren Sie zu dieser Seite zurück</p>
            </div>
          </div>
        </div>
      </div>
      {/* Email Provider Specific Instructions */}
      <div className="space-y-3">
        <h4 className="text-md font-medium text-foreground mb-3">
          Anbieter-spezifische Anleitungen
        </h4>
        
        {emailProviders?.map((provider) => (
          <div key={provider?.id} className="border border-border/50 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleProvider(provider?.id)}
              className="w-full flex items-center justify-between p-4 bg-surface/20 hover:bg-surface/40 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Icon name={provider?.icon} size={18} className="text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {provider?.name}
                </span>
              </div>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`text-muted-foreground transition-transform duration-200 ${
                  expandedProvider === provider?.id ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {expandedProvider === provider?.id && (
              <div className="p-4 bg-surface/10 border-t border-border/30">
                <ol className="space-y-2">
                  {provider?.instructions?.map((instruction, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-medium mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* General Tips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {generalTips?.map((tip, index) => (
          <div key={index} className="bg-surface/20 rounded-lg p-3 border border-border/30">
            <div className="flex items-start space-x-3">
              <Icon name={tip?.icon} size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="text-sm font-medium text-foreground mb-1">
                  {tip?.title}
                </h5>
                <p className="text-xs text-muted-foreground">
                  {tip?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Troubleshooting */}
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={18} className="text-warning mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">
              E-Mail nicht erhalten?
            </h4>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>• Prüfen Sie Ihren Spam/Junk-Ordner</p>
              <p>• Warten Sie bis zu 5 Minuten auf die Zustellung</p>
              <p>• Stellen Sie sicher, dass Ihre E-Mail-Adresse korrekt ist</p>
              <p>• Fordern Sie eine neue Bestätigungs-E-Mail an</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailInstructions;