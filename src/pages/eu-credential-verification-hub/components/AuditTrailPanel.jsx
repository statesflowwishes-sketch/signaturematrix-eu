import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AuditTrailPanel = ({ auditLog, uploadedCredentials, onIntegrateWithSignatures }) => {
  const getLogTypeIcon = (type) => {
    switch (type) {
      case 'success': return 'CheckCircle';
      case 'error': return 'AlertCircle';
      case 'warning': return 'AlertTriangle';
      case 'info': return 'Info';
      default: return 'Circle';
    }
  };

  const getLogTypeColor = (type) => {
    switch (type) {
      case 'success': return 'text-success';
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      case 'info': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const verifiedCredentials = uploadedCredentials?.filter(cred => cred?.status === 'verified');
  const processingCredentials = uploadedCredentials?.filter(cred => cred?.status === 'processing');
  const invalidCredentials = uploadedCredentials?.filter(cred => cred?.status === 'invalid');

  return (
    <div className="space-y-4">
      {/* Verification Summary */}
      <div className="bg-surface/30 backdrop-matrix rounded-lg border border-border p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="BarChart" size={20} className="text-primary" />
          <span>Validierungsübersicht</span>
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-2 rounded bg-success/10 border border-success/20">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-medium text-foreground">Validiert</span>
            </div>
            <span className="text-sm font-bold text-success">{verifiedCredentials?.length}</span>
          </div>
          
          <div className="flex items-center justify-between p-2 rounded bg-warning/10 border border-warning/20">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-warning" />
              <span className="text-sm font-medium text-foreground">Verarbeitung</span>
            </div>
            <span className="text-sm font-bold text-warning">{processingCredentials?.length}</span>
          </div>
          
          <div className="flex items-center justify-between p-2 rounded bg-error/10 border border-error/20">
            <div className="flex items-center space-x-2">
              <Icon name="XCircle" size={16} className="text-error" />
              <span className="text-sm font-medium text-foreground">Ungültig</span>
            </div>
            <span className="text-sm font-bold text-error">{invalidCredentials?.length}</span>
          </div>
        </div>
      </div>

      {/* Integration Actions */}
      {verifiedCredentials?.length > 0 && (
        <div className="bg-surface/30 backdrop-matrix rounded-lg border border-border p-4">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="Link" size={16} className="text-primary" />
            <span>Integration</span>
          </h4>
          
          <div className="space-y-2">
            <Button
              variant="success"
              size="sm"
              iconName="Signature"
              iconPosition="left"
              onClick={onIntegrateWithSignatures}
              className="w-full"
            >
              Mit Signaturen verknüpfen
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              className="w-full"
            >
              Validierungsreport exportieren
            </Button>
          </div>
          
          <div className="mt-3 p-2 bg-success/5 border border-success/20 rounded text-xs text-muted-foreground">
            <Icon name="Info" size={12} className="text-success inline mr-1" />
            {verifiedCredentials?.length} validierte Credentials verfügbar für Signaturmapping
          </div>
        </div>
      )}

      {/* Audit Trail */}
      <div className="bg-surface/30 backdrop-matrix rounded-lg border border-border p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="FileText" size={20} className="text-primary" />
          <span>Audit-Trail</span>
        </h3>
        
        <div className="max-h-64 overflow-y-auto space-y-2">
          {auditLog?.length === 0 ? (
            <div className="text-center py-4">
              <Icon name="FileText" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Keine Aktivitäten vorhanden</p>
            </div>
          ) : (
            auditLog?.map((log) => (
              <div
                key={log?.id}
                className="bg-surface/40 backdrop-blur rounded border border-border/50 p-3"
              >
                <div className="flex items-start space-x-2">
                  <Icon
                    name={getLogTypeIcon(log?.type)}
                    size={16}
                    className={`${getLogTypeColor(log?.type)} flex-shrink-0 mt-0.5`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{log?.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {log?.timestamp?.toLocaleTimeString('de-DE')}
                    </p>
                    {log?.details && (
                      <div className="mt-1 text-xs text-muted-foreground">
                        {Object.entries(log?.details)?.map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span>{key}:</span>
                            <span>{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Compliance Status */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-primary" />
          <span>Compliance-Status</span>
        </h4>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">EU-Verordnung erfüllt</span>
            <Icon name="Check" size={12} className="text-success" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">DSGVO-konform</span>
            <Icon name="Check" size={12} className="text-success" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Qualifizierte Zeitstempel</span>
            <Icon name="Check" size={12} className="text-success" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Verschlüsselung aktiv</span>
            <Icon name="Check" size={12} className="text-success" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditTrailPanel;