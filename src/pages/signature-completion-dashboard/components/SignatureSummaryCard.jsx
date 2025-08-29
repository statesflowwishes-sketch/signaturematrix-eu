import React from 'react';
import Icon from '../../../components/AppIcon';

const SignatureSummaryCard = ({ 
  selectedCategory = 'green',
  signatureData = null,
  userDetails = {},
  verificationTimestamps = {}
}) => {
  const getCategoryConfig = () => {
    const configs = {
      gold: { 
        color: 'text-category-gold', 
        bg: 'bg-category-gold/10', 
        border: 'border-category-gold/20',
        label: 'Premium',
        icon: 'Crown'
      },
      red: { 
        color: 'text-category-red', 
        bg: 'bg-category-red/10', 
        border: 'border-category-red/20',
        label: 'Dringend',
        icon: 'AlertTriangle'
      },
      blue: { 
        color: 'text-category-blue', 
        bg: 'bg-category-blue/10', 
        border: 'border-category-blue/20',
        label: 'Standard',
        icon: 'FileText'
      },
      pink: { 
        color: 'text-category-pink', 
        bg: 'bg-category-pink/10', 
        border: 'border-category-pink/20',
        label: 'Persönlich',
        icon: 'Heart'
      },
      green: { 
        color: 'text-category-green', 
        bg: 'bg-category-green/10', 
        border: 'border-category-green/20',
        label: 'Verifiziert',
        icon: 'Shield'
      },
      silver: { 
        color: 'text-category-silver', 
        bg: 'bg-category-silver/10', 
        border: 'border-category-silver/20',
        label: 'Basis',
        icon: 'File'
      }
    };
    return configs?.[selectedCategory] || configs?.green;
  };

  const categoryConfig = getCategoryConfig();
  const currentDate = new Date();
  const formattedDate = currentDate?.toLocaleDateString('de-DE');
  const formattedTime = currentDate?.toLocaleTimeString('de-DE', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  // Mock user details
  const mockUserDetails = {
    name: userDetails?.name || "Max Mustermann",
    email: userDetails?.email || "max.mustermann@email.de",
    phone: userDetails?.phone || "+49 123 456 7890",
    location: userDetails?.location || "Berlin, Deutschland",
    age: userDetails?.age || "28"
  };

  // Mock verification timestamps
  const mockTimestamps = {
    email: verificationTimestamps?.email || new Date(Date.now() - 300000),
    sms: verificationTimestamps?.sms || new Date(Date.now() - 180000),
    signature: verificationTimestamps?.signature || currentDate
  };

  const signatureId = `SIG-${Date.now()?.toString()?.slice(-8)}`;

  return (
    <div className="bg-surface/80 backdrop-matrix rounded-lg border border-border p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon name="FileSignature" size={24} className="text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Signatur-Zusammenfassung
            </h2>
            <p className="text-sm text-muted-foreground">
              Erfasst am {formattedDate} um {formattedTime}
            </p>
          </div>
        </div>
        
        <div className={`category-badge ${selectedCategory} flex items-center space-x-2`}>
          <Icon name={categoryConfig?.icon} size={16} />
          <span>{categoryConfig?.label}</span>
        </div>
      </div>
      {/* Signature Display */}
      <div className={`${categoryConfig?.bg} ${categoryConfig?.border} border-2 rounded-lg p-4`}>
        <div className="text-center mb-3">
          <p className="text-sm font-medium text-foreground mb-2">
            Digitale Signatur
          </p>
        </div>
        
        <div className="bg-white rounded-lg border-2 border-dashed border-border/50 h-32 flex items-center justify-center mb-4">
          <div className="text-center">
            <Icon name="PenTool" size={32} className={categoryConfig?.color} />
            <p className="text-sm text-muted-foreground mt-2">
              {mockUserDetails?.name}
            </p>
            <p className="text-xs text-muted-foreground font-mono">
              Signatur-ID: {signatureId}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Qualität: Ausgezeichnet</span>
          <span>256-bit verschlüsselt</span>
        </div>
      </div>
      {/* User Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center space-x-2">
            <Icon name="User" size={16} className="text-primary" />
            <span>Benutzerdetails</span>
          </h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span className="text-foreground font-medium">{mockUserDetails?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Alter:</span>
              <span className="text-foreground font-medium">{mockUserDetails?.age} Jahre</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Standort:</span>
              <span className="text-foreground font-medium">{mockUserDetails?.location}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span>Verifizierungsstatus</span>
          </h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Mail" size={14} className="text-success" />
                <span className="text-muted-foreground">E-Mail:</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={14} className="text-success" />
                <span className="text-success font-medium">Verifiziert</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Smartphone" size={14} className="text-success" />
                <span className="text-muted-foreground">SMS:</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={14} className="text-success" />
                <span className="text-success font-medium">Verifiziert</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="PenTool" size={14} className="text-success" />
                <span className="text-muted-foreground">Signatur:</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={14} className="text-success" />
                <span className="text-success font-medium">Erfasst</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Verification Timestamps */}
      <div className="bg-muted/20 rounded-lg p-4 border border-border/50">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-primary" />
          <span>Verifizierungs-Zeitstempel</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="text-center">
            <p className="text-muted-foreground mb-1">E-Mail verifiziert</p>
            <p className="text-foreground font-mono">
              {mockTimestamps?.email?.toLocaleString('de-DE')}
            </p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground mb-1">SMS verifiziert</p>
            <p className="text-foreground font-mono">
              {mockTimestamps?.sms?.toLocaleString('de-DE')}
            </p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground mb-1">Signatur erfasst</p>
            <p className="text-foreground font-mono">
              {mockTimestamps?.signature?.toLocaleString('de-DE')}
            </p>
          </div>
        </div>
      </div>
      {/* Security Notice */}
      <div className="flex items-start space-x-3 bg-primary/5 rounded-lg p-3 border border-primary/20">
        <Icon name="Shield" size={16} className="text-primary mt-0.5 flex-shrink-0" />
        <div className="text-xs">
          <p className="text-foreground font-medium mb-1">
            Sicherheitshinweis
          </p>
          <p className="text-muted-foreground">
            Ihre Signatur wurde mit 256-bit Verschlüsselung gesichert und entspricht den deutschen Datenschutzbestimmungen (DSGVO).
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignatureSummaryCard;