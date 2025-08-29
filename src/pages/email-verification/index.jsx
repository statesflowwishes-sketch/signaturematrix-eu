import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkflowProgress from '../../components/ui/WorkflowProgress';
import EmailVerificationStatus from './components/EmailVerificationStatus';
import EmailInstructions from './components/EmailInstructions';
import MatrixBackground from './components/MatrixBackground';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const EmailVerification = () => {
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('sent');
  const [userEmail, setUserEmail] = useState('benutzer@beispiel.de');
  const [showInstructions, setShowInstructions] = useState(false);
  const [resendCount, setResendCount] = useState(0);

  // Mock verification process simulation
  useEffect(() => {
    const simulateVerification = () => {
      // Simulate email opened after 10 seconds
      setTimeout(() => {
        if (verificationStatus === 'sent') {
          setVerificationStatus('opened');
        }
      }, 10000);

      // Simulate verification completed after 25 seconds
      setTimeout(() => {
        if (verificationStatus === 'opened') {
          setVerificationStatus('verified');
        }
      }, 25000);
    };

    if (verificationStatus === 'sent') {
      simulateVerification();
    }
  }, [verificationStatus, resendCount]);

  const handleResendEmail = () => {
    setVerificationStatus('sent');
    setResendCount(prev => prev + 1);
    console.log('Bestätigungs-E-Mail erneut gesendet');
  };

  const handleEditEmail = () => {
    const newEmail = prompt('Neue E-Mail-Adresse eingeben:', userEmail);
    if (newEmail && newEmail !== userEmail) {
      setUserEmail(newEmail);
      setVerificationStatus('sent');
      console.log('E-Mail-Adresse aktualisiert:', newEmail);
    }
  };

  const handleContinue = () => {
    if (verificationStatus === 'verified') {
      navigate('/sms-verification');
    }
  };

  const handleSkipVerification = () => {
    const confirmed = window.confirm(
      'Sind Sie sicher, dass Sie die E-Mail-Bestätigung überspringen möchten? Dies kann die Sicherheit Ihrer Signatur beeinträchtigen.'
    );
    if (confirmed) {
      navigate('/sms-verification');
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Matrix Background Animation */}
      <MatrixBackground />
      {/* Workflow Progress */}
      <WorkflowProgress />
      {/* Main Content */}
      <div className="relative z-10 pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Verification Area */}
            <div className="lg:col-span-2">
              {/* Page Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 border border-primary/20">
                  <Icon name="Mail" size={32} className="text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  E-Mail-Bestätigung
                </h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Bestätigen Sie Ihre E-Mail-Adresse, um die Authentizität Ihrer digitalen Signatur zu gewährleisten
                </p>
              </div>

              {/* Verification Status Component */}
              <EmailVerificationStatus
                email={userEmail}
                verificationStatus={verificationStatus}
                onResendEmail={handleResendEmail}
                onEditEmail={handleEditEmail}
              />

              {/* Additional Actions */}
              <div className="mt-8 space-y-4">
                {verificationStatus === 'verified' && (
                  <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Icon name="CheckCircle" size={20} className="text-success" />
                      <div>
                        <h3 className="text-sm font-medium text-foreground">
                          E-Mail erfolgreich bestätigt!
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Sie können nun mit der SMS-Bestätigung fortfahren.
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="success"
                      size="sm"
                      iconName="ArrowRight"
                      iconPosition="right"
                      iconSize={16}
                      onClick={handleContinue}
                      className="mt-3"
                    >
                      Weiter zur SMS-Bestätigung
                    </Button>
                  </div>
                )}

                {/* Help Toggle */}
                <div className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName={showInstructions ? "ChevronUp" : "ChevronDown"}
                    iconPosition="right"
                    iconSize={16}
                    onClick={() => setShowInstructions(!showInstructions)}
                    className="text-muted-foreground"
                  >
                    {showInstructions ? 'Hilfe ausblenden' : 'Benötigen Sie Hilfe?'}
                  </Button>
                </div>

                {/* Instructions Panel */}
                {showInstructions && (
                  <div className="bg-surface/30 backdrop-matrix rounded-lg border border-border p-6 animate-slide-down">
                    <EmailInstructions />
                  </div>
                )}

                {/* Skip Option */}
                <div className="text-center pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-2">
                    Probleme mit der E-Mail-Bestätigung?
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="SkipForward"
                    iconPosition="left"
                    iconSize={16}
                    onClick={handleSkipVerification}
                    className="text-muted-foreground hover:text-warning"
                  >
                    E-Mail-Bestätigung überspringen
                  </Button>
                </div>
              </div>
            </div>

            {/* Desktop Sidebar - Instructions & Tips */}
            <div className="hidden lg:block">
              <div className="sticky top-36 space-y-6">
                {/* Quick Tips */}
                <div className="bg-surface/30 backdrop-matrix rounded-lg border border-border p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                    <Icon name="Lightbulb" size={18} className="text-primary" />
                    <span>Schnelle Tipps</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Icon name="Clock" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Zeitlimit</p>
                        <p className="text-xs text-muted-foreground">
                          Der Bestätigungslink ist 24 Stunden gültig
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Icon name="Spam" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Spam-Ordner</p>
                        <p className="text-xs text-muted-foreground">
                          Prüfen Sie auch Ihren Spam/Junk-Ordner
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Icon name="Shield" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Sicherheit</p>
                        <p className="text-xs text-muted-foreground">
                          256-Bit-Verschlüsselung für maximale Sicherheit
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Info */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">
                    Verifikationsprozess
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Icon name="Check" size={14} className="text-success" />
                      <span className="text-xs text-muted-foreground">Signatur erstellt</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={14} className="text-primary" />
                      <span className="text-xs text-foreground font-medium">E-Mail-Bestätigung</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Smartphone" size={14} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">SMS-Bestätigung</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={14} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Abschluss</span>
                    </div>
                  </div>
                </div>

                {/* Contact Support */}
                <div className="bg-surface/20 rounded-lg border border-border/50 p-4">
                  <h4 className="text-sm font-medium text-foreground mb-2 flex items-center space-x-2">
                    <Icon name="HelpCircle" size={16} className="text-primary" />
                    <span>Benötigen Sie Hilfe?</span>
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Unser Support-Team hilft Ihnen gerne weiter.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="MessageCircle"
                    iconPosition="left"
                    iconSize={14}
                    onClick={() => console.log('Support kontaktieren')}
                    className="w-full"
                  >
                    Support kontaktieren
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="relative z-10 border-t border-border/50 bg-surface/20 backdrop-matrix">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span>© {new Date()?.getFullYear()} SignatureMatrix</span>
              <span>•</span>
              <span>DSGVO-konform</span>
              <span>•</span>
              <span>SSL-verschlüsselt</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={12} className="text-primary" />
              <span>Sichere Verifikation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;