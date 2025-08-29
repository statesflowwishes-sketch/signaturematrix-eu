import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VerificationPanel = ({ 
  selectedCategory, 
  verificationStatus, 
  uploadedCredentials, 
  onCredentialUpload, 
  batchMode,
  categories 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewCredential, setPreviewCredential] = useState(null);

  // Get selected category details
  const currentCategory = categories?.find(cat => cat?.id === selectedCategory);

  // Handle drag and drop
  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      onCredentialUpload(e?.dataTransfer?.files);
    }
  };

  // Mock credential preview
  const handlePreviewCredential = (credential) => {
    setPreviewCredential({
      ...credential,
      mockDetails: {
        issuer: 'Deutsche Bundesregierung',
        issuedDate: '2024-01-15',
        expiryDate: '2026-01-15',
        certificateLevel: 'Qualifiziert',
        trustServiceProvider: 'Bundesdruckerei GmbH',
        validationPoints: [
          'Digitale Signatur gültig',
          'Zeitstempel validiert',
          'Zertifikatskette vollständig',
          'Widerrufsstatus geprüft'
        ]
      }
    });
  };

  const getCredentialStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success';
      case 'invalid': return 'text-error';
      case 'processing': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getCredentialStatusIcon = (status) => {
    switch (status) {
      case 'verified': return 'CheckCircle';
      case 'invalid': return 'XCircle';
      case 'processing': return 'Loader';
      default: return 'Clock';
    }
  };

  return (
    <div className="space-y-6">
      {/* Verification Panel Header */}
      <div className="bg-surface/30 backdrop-matrix rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon 
              name={currentCategory?.icon} 
              size={24} 
              className={`text-${currentCategory?.color}`} 
            />
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {currentCategory?.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                Sichere EU-Credential Validierung
              </p>
            </div>
          </div>
          
          {batchMode && (
            <div className="bg-success/10 border border-success/20 rounded-lg px-3 py-1">
              <span className="text-xs font-medium text-success">Batch-Modus</span>
            </div>
          )}
        </div>

        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            dragActive 
              ? `border-${currentCategory?.color}/50 bg-${currentCategory?.color}/5`
              : 'border-border/50 hover:border-border'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Icon 
            name={dragActive ? "Download" : "Upload"} 
            size={48} 
            className={`text-${currentCategory?.color} mx-auto mb-4`} 
          />
          <h3 className="text-lg font-medium text-foreground mb-2">
            {dragActive 
              ? `Dateien für ${currentCategory?.name} ablegen`
              : `${currentCategory?.name} hochladen`
            }
          </h3>
          <p className="text-muted-foreground mb-4">
            {batchMode 
              ? 'Mehrere Dateien gleichzeitig unterstützt (max. 100)'
              : 'PDF, XML, JSON oder P7S Dateien'
            }
          </p>
          
          <input
            type="file"
            multiple={batchMode}
            accept=".pdf,.xml,.json,.p7s"
            onChange={(e) => onCredentialUpload(e?.target?.files)}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button 
              variant="primary" 
              size="lg"
              iconName="FolderPlus"
              iconPosition="left"
              className="cursor-pointer"
            >
              Dateien auswählen
            </Button>
          </label>
          
          <div className="mt-4 text-xs text-muted-foreground">
            <div className="flex items-center justify-center space-x-4">
              <span>Max. 50MB pro Datei</span>
              <span>•</span>
              <span>256-Bit verschlüsselt</span>
              <span>•</span>
              <span>EU-DSGVO konform</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Verification Results */}
      {uploadedCredentials?.length > 0 && (
        <div className="bg-surface/30 backdrop-matrix rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Activity" size={20} className="text-primary" />
            <span>Validierungsergebnisse</span>
            <div className="bg-primary/10 border border-primary/20 rounded-full px-2 py-1">
              <span className="text-xs font-medium text-primary">
                {uploadedCredentials?.length}
              </span>
            </div>
          </h3>
          
          <div className="space-y-3">
            {uploadedCredentials?.map((credential) => (
              <div
                key={credential?.id}
                className="bg-surface/40 backdrop-blur rounded-lg border border-border/50 p-4 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => handlePreviewCredential(credential)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Icon
                      name={getCredentialStatusIcon(credential?.status)}
                      size={20}
                      className={`${getCredentialStatusColor(credential?.status)} ${
                        credential?.status === 'processing' ? 'animate-spin' : ''
                      }`}
                    />
                    <div>
                      <p className="font-medium text-foreground">{credential?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Hochgeladen: {credential?.uploadTime?.toLocaleTimeString('de-DE')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 rounded-full bg-${currentCategory?.color}/20`}>
                      <span className={`text-xs font-medium text-${currentCategory?.color}`}>
                        {currentCategory?.name}
                      </span>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                  </div>
                </div>
                
                {credential?.status === 'processing' && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Validierung läuft...</span>
                      <span className="text-xs text-primary">{credential?.validationProgress}%</span>
                    </div>
                    <div className="w-full bg-muted/20 rounded-full h-2">
                      <div 
                        className={`bg-${currentCategory?.color} h-2 rounded-full transition-all animate-pulse`}
                        style={{ width: `${credential?.validationProgress}%` }}
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${getCredentialStatusColor(credential?.status)}`}>
                    {credential?.status === 'verified' ? 'Erfolgreich validiert' :
                     credential?.status === 'invalid'? 'Validierung fehlgeschlagen' : 'Wird verarbeitet...'}
                  </span>
                  
                  {credential?.status === 'verified' && (
                    <div className="flex items-center space-x-1 text-success">
                      <Icon name="Shield" size={14} />
                      <span className="text-xs">EU-konform</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Credential Preview Modal */}
      {previewCredential && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface/90 backdrop-matrix rounded-lg border border-border max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">
                  Credential Details
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="X"
                  onClick={() => setPreviewCredential(null)}
                />
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Dateiname</label>
                    <p className="text-foreground">{previewCredential?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Aussteller</label>
                    <p className="text-foreground">{previewCredential?.mockDetails?.issuer}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Ausgestellt</label>
                    <p className="text-foreground">{previewCredential?.mockDetails?.issuedDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Gültig bis</label>
                    <p className="text-foreground">{previewCredential?.mockDetails?.expiryDate}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Validierungsprüfungen
                  </label>
                  <div className="space-y-2">
                    {previewCredential?.mockDetails?.validationPoints?.map((point, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Icon name="CheckCircle" size={16} className="text-success" />
                        <span className="text-sm text-foreground">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationPanel;