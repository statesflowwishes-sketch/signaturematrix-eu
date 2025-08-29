import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkflowProgress from '../../components/ui/WorkflowProgress';
import CredentialCategories from './components/CredentialCategories';
import VerificationPanel from './components/VerificationPanel';
import AuditTrailPanel from './components/AuditTrailPanel';
import MatrixBackground from './components/MatrixBackground';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const EuCredentialVerificationHub = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('eidas');
  const [verificationStatus, setVerificationStatus] = useState('idle');
  const [uploadedCredentials, setUploadedCredentials] = useState([]);
  const [auditLog, setAuditLog] = useState([]);
  const [batchMode, setBatchMode] = useState(false);

  // Mock credential categories with color coding
  const credentialCategories = [
    {
      id: 'eidas',
      name: 'eIDAS Zertifikate',
      color: 'gold',
      status: 'verified',
      count: 23,
      icon: 'Shield'
    },
    {
      id: 'professional',
      name: 'Berufsqualifikationen',
      color: 'blue',
      status: 'pending',
      count: 15,
      icon: 'Award'
    },
    {
      id: 'educational',
      name: 'Bildungsnachweise',
      color: 'green',
      status: 'verified',
      count: 31,
      icon: 'GraduationCap'
    },
    {
      id: 'identity',
      name: 'Identitätsnachweise',
      color: 'red',
      status: 'expired',
      count: 8,
      icon: 'User'
    },
    {
      id: 'medical',
      name: 'Medizinische Zertifikate',
      color: 'pink',
      status: 'verified',
      count: 12,
      icon: 'Heart'
    },
    {
      id: 'technical',
      name: 'Technische Qualifikationen',
      color: 'silver',
      status: 'pending',
      count: 19,
      icon: 'Settings'
    }
  ];

  // Mock verification process
  const handleCredentialUpload = (files) => {
    const newCredentials = Array.from(files)?.map((file, index) => ({
      id: Date.now() + index,
      name: file?.name,
      type: selectedCategory,
      status: 'processing',
      uploadTime: new Date(),
      validationProgress: 0
    }));

    setUploadedCredentials(prev => [...prev, ...newCredentials]);
    setVerificationStatus('processing');

    // Mock validation progress
    newCredentials?.forEach((credential, index) => {
      const progressInterval = setInterval(() => {
        setUploadedCredentials(prev => 
          prev?.map(cred => 
            cred?.id === credential?.id 
              ? { ...cred, validationProgress: Math.min(cred?.validationProgress + 10, 100) }
              : cred
          )
        );

        if (credential?.validationProgress >= 100) {
          clearInterval(progressInterval);
          // Simulate random verification result
          const isValid = Math.random() > 0.3;
          setUploadedCredentials(prev => 
            prev?.map(cred => 
              cred?.id === credential?.id 
                ? { ...cred, status: isValid ? 'verified' : 'invalid', validationProgress: 100 }
                : cred
            )
          );
          
          // Add to audit log
          setAuditLog(prev => [...prev, {
            id: Date.now(),
            type: isValid ? 'success' : 'error',
            message: `Credential "${credential?.name}" ${isValid ? 'verified' : 'validation failed'}`,
            timestamp: new Date(),
            details: {
              credentialType: selectedCategory,
              validator: 'EU Digital Signature System',
              complianceCheck: isValid
            }
          }]);
        }
      }, 500);
    });
  };

  const handleBatchProcessing = () => {
    setBatchMode(!batchMode);
    if (!batchMode) {
      setAuditLog(prev => [...prev, {
        id: Date.now(),
        type: 'info',
        message: 'Batch processing mode activated',
        timestamp: new Date(),
        details: { mode: 'batch', queueSize: uploadedCredentials?.length }
      }]);
    }
  };

  const handleIntegrateWithSignatures = () => {
    const verifiedCredentials = uploadedCredentials?.filter(cred => cred?.status === 'verified');
    if (verifiedCredentials?.length > 0) {
      navigate('/signature-collection-canvas', {
        state: { 
          verifiedCredentials: verifiedCredentials,
          credentialMapping: true 
        }
      });
    }
  };

  // Mobile layout detection
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    // Mobile: Stacked card layout with swipe navigation
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <MatrixBackground />
        <WorkflowProgress />
        
        <div className="relative z-10 pt-32 pb-16 px-4">
          <div className="max-w-md mx-auto">
            {/* Mobile Header */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 border border-primary/20">
                <Icon name="Shield" size={24} className="text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                EU Credential Hub
              </h1>
              <p className="text-sm text-muted-foreground">
                Validierung europäischer Digitaler Zertifikate
              </p>
            </div>

            {/* Mobile Category Swiper */}
            <div className="mb-6">
              <div className="flex overflow-x-auto gap-3 pb-2">
                {credentialCategories?.map((category) => (
                  <div
                    key={category?.id}
                    onClick={() => setSelectedCategory(category?.id)}
                    className={`flex-shrink-0 p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedCategory === category?.id
                        ? `bg-${category?.color}/10 border-${category?.color}/30`
                        : 'bg-surface/20 border-border/50'
                    }`}
                  >
                    <Icon name={category?.icon} size={20} className={`text-${category?.color} mb-1`} />
                    <p className="text-xs font-medium text-foreground">{category?.name}</p>
                    <p className="text-xs text-muted-foreground">{category?.count}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Upload Area */}
            <div className="bg-surface/30 backdrop-matrix rounded-lg border border-border p-4 mb-4">
              <div className="text-center">
                <Icon name="Upload" size={32} className="text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground mb-1">Credential hochladen</p>
                <p className="text-xs text-muted-foreground mb-3">
                  Unterstützt: PDF, XML, JSON
                </p>
                <input
                  type="file"
                  multiple={batchMode}
                  accept=".pdf,.xml,.json"
                  onChange={(e) => handleCredentialUpload(e?.target?.files)}
                  className="hidden"
                  id="mobile-upload"
                />
                <label htmlFor="mobile-upload">
                  <Button variant="primary" size="sm" className="w-full">
                    Dateien auswählen
                  </Button>
                </label>
              </div>
            </div>

            {/* Mobile Verification Results */}
            {uploadedCredentials?.length > 0 && (
              <div className="space-y-3 mb-4">
                {uploadedCredentials?.map((credential) => (
                  <div
                    key={credential?.id}
                    className="bg-surface/20 backdrop-matrix rounded-lg border border-border p-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-foreground truncate">
                        {credential?.name}
                      </p>
                      <div className={`w-2 h-2 rounded-full ${
                        credential?.status === 'verified' ? 'bg-success' :
                        credential?.status === 'invalid'? 'bg-error' : 'bg-warning animate-pulse'
                      }`} />
                    </div>
                    {credential?.status === 'processing' && (
                      <div className="w-full bg-muted/20 rounded-full h-1 mb-2">
                        <div 
                          className="bg-primary h-1 rounded-full transition-all"
                          style={{ width: `${credential?.validationProgress}%` }}
                        />
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {credential?.status === 'verified' ? 'Verifiziert' :
                       credential?.status === 'invalid' ? 'Ungültig' : 'Wird verarbeitet...'}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Mobile Actions */}
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Layers"
                iconPosition="left"
                onClick={handleBatchProcessing}
                className={`w-full ${batchMode ? 'bg-primary/10 border-primary/20' : ''}`}
              >
                {batchMode ? 'Batch-Modus aktiv' : 'Batch-Verarbeitung'}
              </Button>
              
              {uploadedCredentials?.some(cred => cred?.status === 'verified') && (
                <Button
                  variant="success"
                  size="sm"
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={handleIntegrateWithSignatures}
                  className="w-full"
                >
                  Mit Signaturen verknüpfen
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop: Three-panel layout
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <MatrixBackground />
      <WorkflowProgress />
      
      <div className="relative z-10 pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 border border-primary/20">
              <Icon name="Shield" size={32} className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              EU Credential Verification Hub
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Zentrale Schnittstelle zur Validierung europäischer digitaler Zertifikate und Ausweise 
              im SignatureMatrix-Ökosystem mit nahtloser Integration in Unterschriftensammlungen
            </p>
          </div>

          {/* Three-Panel Desktop Layout */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Sidebar - Credential Categories */}
            <div className="col-span-3">
              <CredentialCategories
                categories={credentialCategories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
                batchMode={batchMode}
                onToggleBatch={handleBatchProcessing}
              />
            </div>

            {/* Central Verification Panel */}
            <div className="col-span-6">
              <VerificationPanel
                selectedCategory={selectedCategory}
                verificationStatus={verificationStatus}
                uploadedCredentials={uploadedCredentials}
                onCredentialUpload={handleCredentialUpload}
                batchMode={batchMode}
                categories={credentialCategories}
              />
            </div>

            {/* Right Panel - Audit Trail & Integration */}
            <div className="col-span-3">
              <AuditTrailPanel
                auditLog={auditLog}
                uploadedCredentials={uploadedCredentials}
                onIntegrateWithSignatures={handleIntegrateWithSignatures}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-border/50 bg-surface/20 backdrop-matrix">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span>© {new Date()?.getFullYear()} SignatureMatrix</span>
              <span>•</span>
              <span>EU-DSGVO konform</span>
              <span>•</span>
              <span>eIDAS-zertifiziert</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={12} className="text-success" />
              <span>Sichere EU-Credential Validierung</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EuCredentialVerificationHub;