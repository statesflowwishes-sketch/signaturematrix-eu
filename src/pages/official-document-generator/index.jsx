import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import WorkflowProgress from '../../components/ui/WorkflowProgress';
import DocumentTemplateSelector from './components/DocumentTemplateSelector';
import DocumentEditor from './components/DocumentEditor';
import QualityAssurance from './components/QualityAssurance';
import MatrixBackground from './components/MatrixBackground';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const OfficialDocumentGenerator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get verified credentials from navigation state if available
  const [verifiedCredentials] = useState(location?.state?.verifiedCredentials || []);
  const [selectedTemplate, setSelectedTemplate] = useState('eu-petition');
  const [documentData, setDocumentData] = useState({
    title: '',
    content: '',
    signatures: [],
    credentials: [],
    metadata: {}
  });
  const [generationStatus, setGenerationStatus] = useState('idle');
  const [generatedDocuments, setGeneratedDocuments] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [batchMode, setBatchMode] = useState(false);

  // Document templates with SignatureMatrix integration
  const documentTemplates = [
    {
      id: 'eu-petition',
      name: 'EU Petition',
      color: 'gold',
      icon: 'FileText',
      description: 'Offizielle EU-Petition mit Signaturvalidierung',
      features: ['Credential Integration', 'Multi-Language', 'eIDAS Compliant']
    },
    {
      id: 'certificate',
      name: 'Zertifikat',
      color: 'blue',
      icon: 'Award',
      description: 'Validierungszertifikat für Unterschriftensammlungen',
      features: ['Digital Stamping', 'Credential Embedding', 'PDF/A Format']
    },
    {
      id: 'compliance-report',
      name: 'Compliance Report',
      color: 'green',
      icon: 'FileCheck',
      description: 'Detaillierter Compliance-Bericht',
      features: ['Audit Trail', 'Legal Validation', 'Export Ready']
    },
    {
      id: 'authenticity-statement',
      name: 'Authentizitätserklärung',
      color: 'red',
      icon: 'Shield',
      description: 'Nachweis der Signatur-Authentizität',
      features: ['Blockchain Integration', 'Tamper Proof', 'Legal Binding']
    },
    {
      id: 'summary-document',
      name: 'Zusammenfassung',
      color: 'pink',
      icon: 'BarChart',
      description: 'Statistische Zusammenfassung der Sammlung',
      features: ['Data Visualization', 'Category Breakdown', 'Trend Analysis']
    },
    {
      id: 'legal-notice',
      name: 'Rechtliche Hinweise',
      color: 'silver',
      icon: 'Scale',
      description: 'Rechtliche Dokumentation und Hinweise',
      features: ['Legal Compliance', 'Jurisdiction Info', 'Disclaimer']
    }
  ];

  // Mock document generation process
  const handleGenerateDocument = async () => {
    setGenerationStatus('generating');
    
    // Mock generation steps
    const steps = [
      'Signatur-Integration wird verarbeitet...',
      'Credential-Validierung läuft...',
      'Dokumentformatierung wird angewendet...',
      'PDF/A-Export wird erstellt...',
      'Digitale Signatur wird angebracht...',
      'Qualitätsprüfung läuft...'
    ];

    for (let i = 0; i < steps?.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Update status display could be added here
    }

    // Create mock generated document
    const newDocument = {
      id: Date.now(),
      template: selectedTemplate,
      templateName: documentTemplates?.find(t => t?.id === selectedTemplate)?.name,
      title: documentData?.title || `Dokument ${new Date()?.toLocaleDateString('de-DE')}`,
      createdAt: new Date(),
      status: 'completed',
      fileSize: Math.floor(Math.random() * 5000 + 500) + ' KB',
      signatureCount: documentData?.signatures?.length || Math.floor(Math.random() * 100 + 50),
      credentialCount: verifiedCredentials?.length || Math.floor(Math.random() * 20 + 5),
      format: 'PDF/A',
      downloadUrl: '#'
    };

    setGeneratedDocuments(prev => [...prev, newDocument]);
    setGenerationStatus('completed');
  };

  const handleBatchGeneration = () => {
    setBatchMode(!batchMode);
    if (!batchMode) {
      // Mock batch setup
      console.log('Batch generation mode activated');
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
    // Mobile: Stacked card layout
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <MatrixBackground />
        <WorkflowProgress />
        
        <div className="relative z-10 pt-32 pb-16 px-4">
          <div className="max-w-md mx-auto">
            {/* Mobile Header */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 border border-primary/20">
                <Icon name="FileText" size={24} className="text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Document Generator
              </h1>
              <p className="text-sm text-muted-foreground">
                Erstelle offizielle Dokumente aus verifizierten Signaturen
              </p>
            </div>

            {/* Template Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Template auswählen</h3>
              <div className="grid grid-cols-2 gap-3">
                {documentTemplates?.slice(0, 4)?.map((template) => (
                  <div
                    key={template?.id}
                    onClick={() => setSelectedTemplate(template?.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedTemplate === template?.id
                        ? `bg-${template?.color}/10 border-${template?.color}/30`
                        : 'bg-surface/20 border-border/50'
                    }`}
                  >
                    <Icon name={template?.icon} size={20} className={`text-${template?.color} mb-2`} />
                    <p className="text-sm font-medium text-foreground mb-1">{template?.name}</p>
                    <p className="text-xs text-muted-foreground">{template?.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Settings */}
            <div className="bg-surface/30 backdrop-matrix rounded-lg border border-border p-4 mb-4">
              <h4 className="text-sm font-medium text-foreground mb-3">Einstellungen</h4>
              
              <div className="space-y-2">
                <Button
                  variant={batchMode ? "success" : "outline"}
                  size="sm"
                  iconName="Layers"
                  iconPosition="left"
                  onClick={handleBatchGeneration}
                  className="w-full"
                >
                  {batchMode ? 'Batch-Modus aktiv' : 'Batch-Generierung'}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Eye"
                  iconPosition="left"
                  onClick={() => setPreviewMode(!previewMode)}
                  className="w-full"
                >
                  Live-Vorschau
                </Button>
              </div>
            </div>

            {/* Generation Action */}
            <div className="space-y-3">
              <Button
                variant="primary"
                size="lg"
                iconName="FileDown"
                iconPosition="left"
                onClick={handleGenerateDocument}
                loading={generationStatus === 'generating'}
                className="w-full"
              >
                {generationStatus === 'generating' ? 'Generiere...' : 'Dokument erstellen'}
              </Button>
              
              {verifiedCredentials?.length > 0 && (
                <div className="bg-success/10 border border-success/20 rounded p-2 text-center">
                  <Icon name="Shield" size={16} className="text-success inline mr-1" />
                  <span className="text-xs text-success">
                    {verifiedCredentials?.length} Credentials verfügbar
                  </span>
                </div>
              )}
            </div>

            {/* Generated Documents */}
            {generatedDocuments?.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-foreground mb-3">Erstelle Dokumente</h4>
                <div className="space-y-2">
                  {generatedDocuments?.map((doc) => (
                    <div key={doc?.id} className="bg-surface/20 backdrop-matrix rounded-lg border border-border p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-foreground">{doc?.title}</p>
                        <Icon name="Download" size={16} className="text-primary" />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{doc?.templateName}</span>
                        <span>{doc?.fileSize}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Desktop: Side-by-side layout with live preview
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <MatrixBackground />
      <WorkflowProgress />
      
      <div className="relative z-10 pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 border border-primary/20">
              <Icon name="FileText" size={32} className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Official Document Generator
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transformiert gesammelte Signaturen und verifizierte Credentials in rechtskonformes 
              Petitionsdokumente und Zertifikate mit erweiterten Formatierungs- und Exportoptionen
            </p>
          </div>

          {/* Desktop Layout */}
          <div className="grid grid-cols-12 gap-6">
            {/* Template Selection Sidebar */}
            <div className="col-span-3">
              <DocumentTemplateSelector
                templates={documentTemplates}
                selectedTemplate={selectedTemplate}
                onTemplateSelect={setSelectedTemplate}
                verifiedCredentials={verifiedCredentials}
                batchMode={batchMode}
                onToggleBatch={handleBatchGeneration}
              />
            </div>

            {/* Document Editor */}
            <div className="col-span-6">
              <DocumentEditor
                selectedTemplate={selectedTemplate}
                documentData={documentData}
                onDocumentChange={setDocumentData}
                verifiedCredentials={verifiedCredentials}
                generationStatus={generationStatus}
                onGenerate={handleGenerateDocument}
                templates={documentTemplates}
                previewMode={previewMode}
                onTogglePreview={() => setPreviewMode(!previewMode)}
              />
            </div>

            {/* Quality Assurance & Export */}
            <div className="col-span-3">
              <QualityAssurance
                generatedDocuments={generatedDocuments}
                generationStatus={generationStatus}
                documentData={documentData}
                selectedTemplate={selectedTemplate}
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
              <span>PDF/A-konform</span>
              <span>•</span>
              <span>Rechtssicher</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="FileCheck" size={12} className="text-success" />
              <span>Offizielle Dokument-Generierung</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficialDocumentGenerator;