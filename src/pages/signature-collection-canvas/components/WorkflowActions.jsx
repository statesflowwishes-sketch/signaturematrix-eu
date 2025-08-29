import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const WorkflowActions = ({ 
  hasSignature = false, 
  isFormValid = false, 
  signatureData = null,
  userFormData = null,
  selectedCategory = 'green',
  isProcessing = false,
  onStartWorkflow
}) => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const isReadyToComplete = hasSignature && isFormValid && !isProcessing;

  const handleCompleteSignature = () => {
    if (isReadyToComplete) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmWorkflow = () => {
    const workflowData = {
      signature: signatureData,
      userInfo: userFormData,
      category: selectedCategory,
      timestamp: new Date()?.toISOString(),
      sessionId: `sig_${Date.now()}_${Math.random()?.toString(36)?.substr(2, 9)}`
    };

    onStartWorkflow?.(workflowData);
    
    // Navigate to email verification
    navigate('/email-verification', {
      state: { workflowData }
    });
  };

  const getCompletionStatus = () => {
    if (!hasSignature && !isFormValid) {
      return {
        icon: 'AlertCircle',
        text: 'Signatur und Formular erforderlich',
        color: 'text-warning'
      };
    } else if (!hasSignature) {
      return {
        icon: 'PenTool',
        text: 'Signatur erforderlich',
        color: 'text-warning'
      };
    } else if (!isFormValid) {
      return {
        icon: 'FileText',
        text: 'Formular vervollständigen',
        color: 'text-warning'
      };
    } else {
      return {
        icon: 'CheckCircle',
        text: 'Bereit zur Verifizierung',
        color: 'text-success'
      };
    }
  };

  const status = getCompletionStatus();

  return (
    <div className="relative z-10 bg-surface/80 backdrop-matrix rounded-lg border border-border p-6 shadow-matrix">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
          <Icon name="Workflow" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Signatur-Workflow
          </h2>
          <p className="text-sm text-muted-foreground">
            Starten Sie den Verifizierungsprozess
          </p>
        </div>
      </div>
      {/* Status Display */}
      <div className="bg-muted/30 rounded-lg p-4 border border-border/50 mb-6">
        <div className="flex items-center space-x-3">
          <Icon name={status?.icon} size={20} className={status?.color} />
          <div className="flex-1">
            <p className={`font-medium ${status?.color}`}>
              {status?.text}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {isReadyToComplete 
                ? 'Alle Anforderungen erfüllt - bereit zum Fortfahren'
                : 'Vervollständigen Sie alle Schritte um fortzufahren'
              }
            </p>
          </div>
        </div>
      </div>
      {/* Progress Checklist */}
      <div className="space-y-3 mb-6">
        <div className={`flex items-center space-x-3 p-3 rounded-lg border ${
          hasSignature 
            ? 'bg-success/10 border-success/20' :'bg-muted/20 border-border/50'
        }`}>
          <Icon 
            name={hasSignature ? "CheckCircle" : "Circle"} 
            size={18} 
            className={hasSignature ? "text-success" : "text-muted-foreground"} 
          />
          <div className="flex-1">
            <p className={`text-sm font-medium ${
              hasSignature ? 'text-success' : 'text-muted-foreground'
            }`}>
              Digitale Signatur erstellt
            </p>
            <p className="text-xs text-muted-foreground">
              Signatur auf dem Canvas gezeichnet
            </p>
          </div>
        </div>

        <div className={`flex items-center space-x-3 p-3 rounded-lg border ${
          isFormValid 
            ? 'bg-success/10 border-success/20' :'bg-muted/20 border-border/50'
        }`}>
          <Icon 
            name={isFormValid ? "CheckCircle" : "Circle"} 
            size={18} 
            className={isFormValid ? "text-success" : "text-muted-foreground"} 
          />
          <div className="flex-1">
            <p className={`text-sm font-medium ${
              isFormValid ? 'text-success' : 'text-muted-foreground'
            }`}>
              Persönliche Daten eingegeben
            </p>
            <p className="text-xs text-muted-foreground">
              Alle erforderlichen Felder ausgefüllt
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 bg-muted/20">
          <Icon name="Circle" size={18} className="text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">
              E-Mail-Verifizierung
            </p>
            <p className="text-xs text-muted-foreground">
              Wird im nächsten Schritt durchgeführt
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 bg-muted/20">
          <Icon name="Circle" size={18} className="text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">
              SMS-Verifizierung
            </p>
            <p className="text-xs text-muted-foreground">
              Abschließende Telefonnummer-Bestätigung
            </p>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          size="lg"
          fullWidth
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={18}
          onClick={handleCompleteSignature}
          disabled={!isReadyToComplete}
          loading={isProcessing}
        >
          Signatur vervollständigen
        </Button>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="default"
            iconName="Download"
            iconPosition="left"
            iconSize={16}
            disabled={!hasSignature}
            onClick={() => console.log('Download signature')}
            className="flex-1"
          >
            Herunterladen
          </Button>

          <Button
            variant="ghost"
            size="default"
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
            onClick={() => window.location?.reload()}
            className="flex-1"
          >
            Neu starten
          </Button>
        </div>
      </div>
      {/* Workflow Information */}
      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <Icon name="Shield" size={20} className="text-primary mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">256-bit Verschlüsselung</p>
          </div>
          <div>
            <Icon name="Clock" size={20} className="text-primary mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">~3 Min. Verifizierung</p>
          </div>
          <div>
            <Icon name="CheckCircle" size={20} className="text-primary mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">DSGVO-konform</p>
          </div>
        </div>
      </div>
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-popover border border-border rounded-lg shadow-matrix-lg max-w-md w-full p-6 animate-slide-down">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 border border-primary/20">
                <Icon name="AlertTriangle" size={32} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Verifizierung starten?
              </h3>
              <p className="text-sm text-muted-foreground">
                Sie werden zur E-Mail-Verifizierung weitergeleitet. 
                Stellen Sie sicher, dass alle Daten korrekt sind.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="default"
                fullWidth
                onClick={() => setShowConfirmation(false)}
              >
                Abbrechen
              </Button>
              <Button
                variant="default"
                size="default"
                fullWidth
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={16}
                onClick={handleConfirmWorkflow}
              >
                Fortfahren
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowActions;