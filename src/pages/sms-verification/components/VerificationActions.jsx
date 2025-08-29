import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const VerificationActions = ({ 
  onVerify, 
  onResend, 
  onSkip,
  canVerify = false,
  canResend = true,
  isVerifying = false,
  isResending = false,
  resendCooldown = 0,
  attempts = 0,
  maxAttempts = 3
}) => {
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);

  const formatCooldownTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}:${secs?.toString()?.padStart(2, '0')}` : `${secs}s`;
  };

  const handleSkipClick = () => {
    if (showSkipConfirm) {
      onSkip?.();
      setShowSkipConfirm(false);
    } else {
      setShowSkipConfirm(true);
    }
  };

  const handleCancelSkip = () => {
    setShowSkipConfirm(false);
  };

  return (
    <div className="space-y-4">
      {/* Primary Verify Button */}
      <Button
        variant="default"
        size="lg"
        fullWidth
        iconName="Shield"
        iconPosition="left"
        iconSize={18}
        onClick={onVerify}
        disabled={!canVerify || isVerifying}
        loading={isVerifying}
      >
        {isVerifying ? 'Code wird überprüft...' : 'Code bestätigen'}
      </Button>

      {/* Resend Button */}
      <Button
        variant="outline"
        size="default"
        fullWidth
        iconName="RefreshCw"
        iconPosition="left"
        iconSize={16}
        onClick={onResend}
        disabled={!canResend || resendCooldown > 0 || isResending}
        loading={isResending}
      >
        {isResending 
          ? 'SMS wird gesendet...'
          : resendCooldown > 0
          ? `Erneut senden in ${formatCooldownTime(resendCooldown)}`
          : 'SMS erneut senden'
        }
      </Button>

      {/* Skip Verification */}
      {!showSkipConfirm ? (
        <Button
          variant="ghost"
          size="default"
          fullWidth
          iconName="SkipForward"
          iconPosition="left"
          iconSize={16}
          onClick={handleSkipClick}
          className="text-muted-foreground"
        >
          Verifizierung überspringen
        </Button>
      ) : (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 space-y-3">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm font-medium text-warning">
              Verifizierung überspringen?
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Ohne SMS-Verifizierung ist Ihre Signatur weniger sicher. 
            Sind Sie sicher, dass Sie fortfahren möchten?
          </p>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="X"
              iconPosition="left"
              iconSize={14}
              onClick={handleCancelSkip}
              className="flex-1"
            >
              Abbrechen
            </Button>
            <Button
              variant="warning"
              size="sm"
              iconName="SkipForward"
              iconPosition="left"
              iconSize={14}
              onClick={handleSkipClick}
              className="flex-1"
            >
              Überspringen
            </Button>
          </div>
        </div>
      )}

      {/* Attempts Counter */}
      {attempts > 0 && (
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Versuche: {attempts} von {maxAttempts}
          </p>
          {attempts >= maxAttempts - 1 && (
            <p className="text-xs text-warning mt-1">
              ⚠️ Letzter Versuch verbleibend
            </p>
          )}
        </div>
      )}

      {/* Security Notice */}
      <div className="bg-muted/20 rounded-lg p-4 border border-border/50">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Sicherheitshinweis</p>
            <p>
              Ihr Bestätigungscode ist verschlüsselt und läuft automatisch ab. 
              Teilen Sie diesen Code niemals mit anderen.
            </p>
          </div>
        </div>
      </div>

      {/* Help Options */}
      <div className="flex items-center justify-center space-x-4 pt-2">
        <button className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-primary transition-colors">
          <Icon name="HelpCircle" size={14} />
          <span>Hilfe</span>
        </button>
        <button className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-primary transition-colors">
          <Icon name="MessageSquare" size={14} />
          <span>Support</span>
        </button>
      </div>
    </div>
  );
};

export default VerificationActions;