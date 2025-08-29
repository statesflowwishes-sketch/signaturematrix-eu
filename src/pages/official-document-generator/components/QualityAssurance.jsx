import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QualityAssurance = ({ 
  generatedDocuments, 
  generationStatus, 
  documentData, 
  selectedTemplate 
}) => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Mock quality checks
  const qualityChecks = [
    { id: 'signature', name: 'Signatur-Authentizität', status: 'passed', icon: 'CheckCircle' },
    { id: 'credential', name: 'Credential-Validierung', status: 'passed', icon: 'Shield' },
    { id: 'format', name: 'PDF/A-Konformität', status: 'passed', icon: 'FileCheck' },
    { id: 'legal', name: 'Rechtliche Compliance', status: 'passed', icon: 'Scale' },
    { id: 'encryption', name: 'Verschlüsselung', status: 'passed', icon: 'Lock' },
    { id: 'timestamp', name: 'Zeitstempel-Gültigkeit', status: 'passed', icon: 'Clock' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'passed': return 'text-success';
      case 'warning': return 'text-warning';
      case 'failed': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'passed': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'failed': return 'XCircle';
      default: return 'HelpCircle';
    }
  };

  return (
    <div className="space-y-4">
      {/* Quality Assurance Panel */}
      <div className="bg-surface/30 backdrop-matrix rounded-lg border border-border p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="CheckSquare" size={20} className="text-primary" />
          <span>Qualitätssicherung</span>
        </h3>
        
        {/* Quality Checks */}
        <div className="space-y-2">
          {qualityChecks?.map((check) => (
            <div
              key={check?.id}
              className="flex items-center justify-between p-2 rounded bg-surface/20 border border-border/50"
            >
              <div className="flex items-center space-x-2">
                <Icon name={check?.icon} size={14} className={getStatusColor(check?.status)} />
                <span className="text-sm text-foreground">{check?.name}</span>
              </div>
              <Icon 
                name={getStatusIcon(check?.status)} 
                size={14} 
                className={getStatusColor(check?.status)} 
              />
            </div>
          ))}
        </div>
        
        {/* Overall Status */}
        <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Award" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">Qualitätsprüfung bestanden</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Alle Compliance-Anforderungen erfüllt
          </p>
        </div>
      </div>

      {/* Generated Documents */}
      <div className="bg-surface/30 backdrop-matrix rounded-lg border border-border p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="FileText" size={20} className="text-primary" />
          <span>Generierte Dokumente</span>
          {generatedDocuments?.length > 0 && (
            <div className="bg-primary/10 border border-primary/20 rounded-full px-2 py-1">
              <span className="text-xs font-medium text-primary">
                {generatedDocuments?.length}
              </span>
            </div>
          )}
        </h3>
        
        {generatedDocuments?.length === 0 ? (
          <div className="text-center py-6">
            <Icon name="FileText" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Noch keine Dokumente generiert</p>
          </div>
        ) : (
          <div className="space-y-2">
            {generatedDocuments?.map((doc) => (
              <div
                key={doc?.id}
                className="bg-surface/40 backdrop-blur rounded-lg border border-border/50 p-3 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setSelectedDocument(doc)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="FileCheck" size={16} className="text-success" />
                    <span className="text-sm font-medium text-foreground truncate">
                      {doc?.title}
                    </span>
                  </div>
                  <Icon name="Download" size={14} className="text-primary" />
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div>Template: {doc?.templateName}</div>
                  <div>Größe: {doc?.fileSize}</div>
                  <div>Signaturen: {doc?.signatureCount}</div>
                  <div>Format: {doc?.format}</div>
                </div>
                
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {doc?.createdAt?.toLocaleString('de-DE')}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Shield" size={12} className="text-success" />
                    <span className="text-xs text-success">Validiert</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Export Options */}
      {generatedDocuments?.length > 0 && (
        <div className="bg-surface/30 backdrop-matrix rounded-lg border border-border p-4">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="Download" size={16} className="text-primary" />
            <span>Export-Optionen</span>
          </h4>
          
          <div className="space-y-2">
            <Button
              variant="primary"
              size="sm"
              iconName="FileDown"
              iconPosition="left"
              className="w-full"
            >
              Alle als ZIP herunterladen
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Mail"
              iconPosition="left"
              className="w-full"
            >
              Per E-Mail versenden
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Archive"
              iconPosition="left"
              className="w-full"
            >
              Langzeitarchivierung
            </Button>
          </div>
        </div>
      )}

      {/* Compliance Summary */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Scale" size={16} className="text-primary" />
          <span>Compliance-Zusammenfassung</span>
        </h4>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">eIDAS-konform</span>
            <Icon name="Check" size={12} className="text-success" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">DSGVO-compliant</span>
            <Icon name="Check" size={12} className="text-success" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">PDF/A-Standard</span>
            <Icon name="Check" size={12} className="text-success" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Rechtssicher</span>
            <Icon name="Check" size={12} className="text-success" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Langzeitarchivierung</span>
            <Icon name="Check" size={12} className="text-success" />
          </div>
        </div>
      </div>

      {/* Document Details Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface/90 backdrop-matrix rounded-lg border border-border max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Dokument Details
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="X"
                  onClick={() => setSelectedDocument(null)}
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Titel</label>
                  <p className="text-foreground">{selectedDocument?.title}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Template</label>
                    <p className="text-foreground">{selectedDocument?.templateName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Format</label>
                    <p className="text-foreground">{selectedDocument?.format}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Dateigröße</label>
                    <p className="text-foreground">{selectedDocument?.fileSize}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <div className="flex items-center space-x-1">
                      <Icon name="CheckCircle" size={14} className="text-success" />
                      <span className="text-success text-sm">Validiert</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button
                    variant="primary"
                    size="sm"
                    iconName="Download"
                    iconPosition="left"
                    className="w-full"
                    onClick={() => console.log('Download document:', selectedDocument?.id)}
                  >
                    Dokument herunterladen
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QualityAssurance;