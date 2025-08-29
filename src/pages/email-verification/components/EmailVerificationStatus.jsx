import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmailVerificationStatus = ({ 
  email = "benutzer@beispiel.de",
  onResendEmail,
  onEditEmail,
  verificationStatus = 'sent'
}) => {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const getStatusConfig = () => {
    switch (verificationStatus) {
      case 'sent':
        return {
          icon: 'Mail',
          iconColor: 'text-primary',
          title: 'E-Mail-Bestätigung gesendet',
          description: 'Wir haben eine Bestätigungs-E-Mail an Ihre Adresse gesendet',
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary/20'
        };
      case 'opened':
        return {
          icon: 'MailOpen',
          iconColor: 'text-warning',
          title: 'E-Mail geöffnet',
          description: 'Ihre E-Mail wurde geöffnet. Klicken Sie auf den Bestätigungslink.',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20'
        };
      case 'verified':
        return {
          icon: 'CheckCircle',
          iconColor: 'text-success',
          title: 'E-Mail erfolgreich bestätigt',
          description: 'Ihre E-Mail-Adresse wurde erfolgreich verifiziert',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20'
        };
      case 'expired':
        return {
          icon: 'AlertTriangle',
          iconColor: 'text-error',
          title: 'Bestätigungslink abgelaufen',
          description: 'Der Bestätigungslink ist abgelaufen. Bitte fordern Sie einen neuen an.',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20'
        };
      default:
        return {
          icon: 'Mail',
          iconColor: 'text-primary',
          title: 'E-Mail-Bestätigung erforderlich',
          description: 'Bitte bestätigen Sie Ihre E-Mail-Adresse',
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary/20'
        };
    }
  };

  const statusConfig = getStatusConfig();

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
    onResendEmail?.();
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Status Display */}
      <div className={`${statusConfig?.bgColor} ${statusConfig?.borderColor} border rounded-lg p-6 mb-6`}>
        <div className="text-center">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-surface border border-border">
            <Icon 
              name={statusConfig?.icon} 
              size={40} 
              className={`${statusConfig?.iconColor} animate-pulse-glow`}
            />
          </div>
          
          <h2 className="text-xl font-semibold text-foreground mb-2">
            {statusConfig?.title}
          </h2>
          
          <p className="text-muted-foreground text-sm mb-4">
            {statusConfig?.description}
          </p>

          {/* Email Display */}
          <div className="bg-surface/50 rounded-lg p-4 mb-4 border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={16} className="text-primary" />
                <span className="text-sm font-mono text-foreground">
                  {email}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="Edit2"
                iconSize={14}
                onClick={onEditEmail}
                className="text-muted-foreground hover:text-foreground"
              >
                Bearbeiten
              </Button>
            </div>
          </div>

          {/* Real-time Status Updates */}
          {verificationStatus === 'sent' && (
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">
                Warten auf E-Mail-Öffnung...
              </span>
            </div>
          )}

          {verificationStatus === 'opened' && (
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">
                Warten auf Link-Klick...
              </span>
            </div>
          )}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        {verificationStatus !== 'verified' && (
          <>
            <Button
              variant="default"
              size="lg"
              fullWidth
              iconName="ExternalLink"
              iconPosition="right"
              iconSize={18}
              onClick={() => window.open('mailto:', '_blank')}
            >
              E-Mail öffnen & bestätigen
            </Button>

            <Button
              variant="outline"
              size="default"
              fullWidth
              iconName="RefreshCw"
              iconPosition="left"
              iconSize={16}
              onClick={handleResend}
              disabled={!canResend}
            >
              {canResend ? 'Bestätigungs-E-Mail erneut senden' : `Erneut senden in ${countdown}s`}
            </Button>
          </>
        )}

        {verificationStatus === 'verified' && (
          <Button
            variant="default"
            size="lg"
            fullWidth
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={18}
            onClick={() => console.log('Continue to SMS verification')}
          >
            Weiter zur SMS-Bestätigung
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationStatus;