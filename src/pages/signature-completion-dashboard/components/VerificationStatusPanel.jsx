import React from 'react';
import Icon from '../../../components/AppIcon';

const VerificationStatusPanel = ({ 
  verificationData = {},
  selectedCategory = 'green'
}) => {
  const getCategoryConfig = () => {
    const configs = {
      gold: { color: 'text-category-gold', bg: 'bg-category-gold/10', border: 'border-category-gold/20' },
      red: { color: 'text-category-red', bg: 'bg-category-red/10', border: 'border-category-red/20' },
      blue: { color: 'text-category-blue', bg: 'bg-category-blue/10', border: 'border-category-blue/20' },
      pink: { color: 'text-category-pink', bg: 'bg-category-pink/10', border: 'border-category-pink/20' },
      green: { color: 'text-category-green', bg: 'bg-category-green/10', border: 'border-category-green/20' },
      silver: { color: 'text-category-silver', bg: 'bg-category-silver/10', border: 'border-category-silver/20' }
    };
    return configs?.[selectedCategory] || configs?.green;
  };

  const categoryConfig = getCategoryConfig();

  // Mock verification data
  const mockVerificationData = {
    email: {
      status: 'verified',
      timestamp: new Date(Date.now() - 300000),
      address: 'max.mustermann@email.de',
      attempts: 1,
      method: 'Link-Verifizierung'
    },
    sms: {
      status: 'verified',
      timestamp: new Date(Date.now() - 180000),
      phone: '+49 123 456 7890',
      attempts: 1,
      method: '6-stelliger Code'
    },
    signature: {
      status: 'completed',
      timestamp: new Date(),
      quality: 'Ausgezeichnet',
      strokes: 12,
      duration: '45 Sekunden'
    }
  };

  const verificationSteps = [
    {
      id: 'signature',
      label: 'Signatur erfasst',
      icon: 'PenTool',
      data: mockVerificationData?.signature,
      description: 'Digitale Signatur wurde erfolgreich gezeichnet'
    },
    {
      id: 'email',
      label: 'E-Mail verifiziert',
      icon: 'Mail',
      data: mockVerificationData?.email,
      description: 'E-Mail-Adresse wurde bestätigt'
    },
    {
      id: 'sms',
      label: 'SMS verifiziert',
      icon: 'Smartphone',
      data: mockVerificationData?.sms,
      description: 'Telefonnummer wurde bestätigt'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
      case 'completed':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'pending':
        return { icon: 'Clock', color: 'text-warning' };
      case 'failed':
        return { icon: 'XCircle', color: 'text-error' };
      default:
        return { icon: 'Circle', color: 'text-muted-foreground' };
    }
  };

  return (
    <div className="bg-surface/80 backdrop-matrix rounded-lg border border-border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Shield" size={24} className="text-success" />
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Verifizierungsstatus
            </h2>
            <p className="text-sm text-muted-foreground">
              Alle Schritte erfolgreich abgeschlossen
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 bg-success/10 px-3 py-2 rounded-full border border-success/20">
          <Icon name="CheckCircle" size={16} className="text-success" />
          <span className="text-sm font-medium text-success">Vollständig</span>
        </div>
      </div>
      {/* Verification Steps */}
      <div className="space-y-4">
        {verificationSteps?.map((step, index) => {
          const statusConfig = getStatusIcon(step?.data?.status);
          
          return (
            <div key={step?.id} className="relative">
              {/* Connection Line */}
              {index < verificationSteps?.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-8 bg-success/30" />
              )}
              <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/20 border border-border/50">
                {/* Status Icon */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-success/10 border border-success/20 flex-shrink-0">
                  <Icon name={statusConfig?.icon} size={20} className={statusConfig?.color} />
                </div>
                
                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-foreground flex items-center space-x-2">
                      <Icon name={step?.icon} size={16} className="text-primary" />
                      <span>{step?.label}</span>
                    </h3>
                    <span className="text-xs text-success font-medium">
                      ✓ Abgeschlossen
                    </span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-3">
                    {step?.description}
                  </p>
                  
                  {/* Step Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-muted-foreground">Zeitstempel:</span>
                      <p className="text-foreground font-mono">
                        {step?.data?.timestamp?.toLocaleString('de-DE')}
                      </p>
                    </div>
                    
                    {step?.id === 'email' && (
                      <div>
                        <span className="text-muted-foreground">E-Mail:</span>
                        <p className="text-foreground font-mono">
                          {step?.data?.address}
                        </p>
                      </div>
                    )}
                    
                    {step?.id === 'sms' && (
                      <div>
                        <span className="text-muted-foreground">Telefon:</span>
                        <p className="text-foreground font-mono">
                          {step?.data?.phone}
                        </p>
                      </div>
                    )}
                    
                    {step?.id === 'signature' && (
                      <>
                        <div>
                          <span className="text-muted-foreground">Qualität:</span>
                          <p className="text-foreground font-medium">
                            {step?.data?.quality}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Dauer:</span>
                          <p className="text-foreground font-mono">
                            {step?.data?.duration}
                          </p>
                        </div>
                      </>
                    )}
                    
                    <div>
                      <span className="text-muted-foreground">Versuche:</span>
                      <p className="text-foreground">
                        {step?.data?.attempts} von 3
                      </p>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Methode:</span>
                      <p className="text-foreground">
                        {step?.data?.method || step?.data?.quality || 'Standard'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Security Summary */}
      <div className={`mt-6 ${categoryConfig?.bg} ${categoryConfig?.border} border rounded-lg p-4`}>
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className={categoryConfig?.color} />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-foreground mb-2">
              Sicherheitszusammenfassung
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={14} className="text-success" />
                <span className="text-muted-foreground">256-bit Verschlüsselung</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={14} className="text-success" />
                <span className="text-muted-foreground">DSGVO-konform</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={14} className="text-success" />
                <span className="text-muted-foreground">Zeitstempel-Nachweis</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="FileCheck" size={14} className="text-success" />
                <span className="text-muted-foreground">Rechtsgültig</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Audit Trail Link */}
      <div className="mt-4 text-center">
        <button className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center space-x-1 mx-auto">
          <Icon name="FileText" size={14} />
          <span>Vollständigen Audit-Trail anzeigen</span>
          <Icon name="ExternalLink" size={12} />
        </button>
      </div>
    </div>
  );
};

export default VerificationStatusPanel;