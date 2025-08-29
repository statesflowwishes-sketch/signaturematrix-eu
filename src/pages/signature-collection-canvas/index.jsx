import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import MatrixBackground from './components/MatrixBackground';
import UserInfoForm from './components/UserInfoForm';
import SignatureCanvas from './components/SignatureCanvas';
import CategorySelector from './components/CategorySelector';
import WorkflowActions from './components/WorkflowActions';
import WorkflowProgress from '../../components/ui/WorkflowProgress';
import Icon from '../../components/AppIcon';

const SignatureCollectionCanvas = () => {
  const [userFormData, setUserFormData] = useState(null);
  const [hasSignature, setHasSignature] = useState(false);
  const [signatureData, setSignatureData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('green');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState('form');

  // Check if form is valid
  const isFormValid = userFormData && 
    userFormData?.name?.trim() && 
    userFormData?.email?.trim() && 
    userFormData?.phone?.trim() && 
    userFormData?.age && 
    userFormData?.location;

  useEffect(() => {
    // Set page title and meta
    document.title = 'SignatureMatrix - Digitale Signatur erstellen';
  }, []);

  const handleFormSubmit = (formData) => {
    setUserFormData(formData);
    setCurrentStep('signature');
    
    // Smooth scroll to signature canvas on mobile
    if (window.innerWidth < 768) {
      setTimeout(() => {
        document.getElementById('signature-section')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };

  const handleSignatureChange = (hasSignatureValue) => {
    setHasSignature(hasSignatureValue);
    if (hasSignatureValue) {
      setCurrentStep('category');
    }
  };

  const handleSignatureComplete = (signature) => {
    setSignatureData(signature);
    setCurrentStep('complete');
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleStartWorkflow = (workflowData) => {
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      console.log('Starting workflow with data:', workflowData);
      // Navigation will be handled by WorkflowActions component
    }, 1000);
  };

  const handleClearSignature = () => {
    setHasSignature(false);
    setSignatureData(null);
    setCurrentStep(isFormValid ? 'signature' : 'form');
  };

  return (
    <>
      <Helmet>
        <title>SignatureMatrix - Digitale Signatur erstellen</title>
        <meta name="description" content="Erstellen Sie Ihre rechtsgültige digitale Signatur mit unserem sicheren Canvas-Interface. DSGVO-konform mit E-Mail und SMS-Verifizierung." />
        <meta name="keywords" content="digitale signatur, elektronische unterschrift, signatur erstellen, verifizierung, DSGVO" />
        <meta property="og:title" content="SignatureMatrix - Digitale Signatur erstellen" />
        <meta property="og:description" content="Sichere digitale Signaturerstellung mit Verifizierung" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Matrix Background Animation */}
        <MatrixBackground />
        
        {/* Workflow Progress */}
        <WorkflowProgress />
        
        {/* Main Content */}
        <div className="relative z-10 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 border border-primary/20 shadow-matrix">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-primary"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-heading">
                Digitale Signatur
                <span className="text-primary"> erstellen</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Erstellen Sie Ihre rechtsgültige digitale Signatur mit unserem sicheren 
                Canvas-Interface. Vollständig DSGVO-konform mit mehrstufiger Verifizierung.
              </p>

              {/* Progress Indicators */}
              <div className="flex items-center justify-center space-x-4 mt-8">
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                  currentStep === 'form' || isFormValid
                    ? 'bg-success/10 border-success/20 text-success' :'bg-muted/20 border-border text-muted-foreground'
                }`}>
                  <Icon name="FileText" size={16} />
                  <span className="text-sm font-medium">Formular</span>
                </div>
                
                <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                  currentStep === 'signature' || hasSignature ?'bg-success/10 border-success/20 text-success' :'bg-muted/20 border-border text-muted-foreground'
                }`}>
                  <Icon name="PenTool" size={16} />
                  <span className="text-sm font-medium">Signatur</span>
                </div>
                
                <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                  currentStep === 'category' ?'bg-primary/10 border-primary/20 text-primary' :'bg-muted/20 border-border text-muted-foreground'
                }`}>
                  <Icon name="Palette" size={16} />
                  <span className="text-sm font-medium">Kategorie</span>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Left Column - Form and Category */}
              <div className="space-y-8">
                {/* User Information Form */}
                <UserInfoForm
                  onFormSubmit={handleFormSubmit}
                  isProcessing={isProcessing}
                />

                {/* Category Selector - Show after form is filled */}
                {isFormValid && (
                  <CategorySelector
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                    isProcessing={isProcessing}
                  />
                )}
              </div>

              {/* Right Column - Signature Canvas */}
              <div id="signature-section" className="space-y-8">
                <SignatureCanvas
                  onSignatureChange={handleSignatureChange}
                  selectedCategory={selectedCategory}
                  isProcessing={isProcessing}
                  onClear={handleClearSignature}
                  onComplete={handleSignatureComplete}
                />

                {/* Workflow Actions - Show when both form and signature are ready */}
                {(isFormValid || hasSignature) && (
                  <WorkflowActions
                    hasSignature={hasSignature}
                    isFormValid={isFormValid}
                    signatureData={signatureData}
                    userFormData={userFormData}
                    selectedCategory={selectedCategory}
                    isProcessing={isProcessing}
                    onStartWorkflow={handleStartWorkflow}
                  />
                )}
              </div>
            </div>

            {/* Security & Trust Section */}
            <div className="bg-surface/60 backdrop-matrix rounded-2xl border border-border p-8 shadow-matrix">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Sicherheit & Vertrauen
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Ihre Signatur wird mit höchsten Sicherheitsstandards verarbeitet 
                  und ist vollständig DSGVO-konform.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 border border-primary/20">
                    <Icon name="Shield" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">256-bit Verschlüsselung</h3>
                  <p className="text-sm text-muted-foreground">
                    Militärische Verschlüsselung für maximale Sicherheit
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 border border-success/20">
                    <Icon name="CheckCircle" size={24} className="text-success" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">DSGVO-konform</h3>
                  <p className="text-sm text-muted-foreground">
                    Vollständige Einhaltung europäischer Datenschutzgesetze
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-warning/10 border border-warning/20">
                    <Icon name="Zap" size={24} className="text-warning" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Sofortige Verifizierung</h3>
                  <p className="text-sm text-muted-foreground">
                    E-Mail und SMS-Bestätigung in wenigen Minuten
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 border border-accent/20">
                    <Icon name="Award" size={24} className="text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Rechtsgültig</h3>
                  <p className="text-sm text-muted-foreground">
                    Anerkannt nach deutschem und EU-Recht
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Processing Overlay */}
        {isProcessing && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-surface/90 backdrop-matrix rounded-lg border border-border p-8 shadow-matrix-lg text-center max-w-sm mx-4">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Verarbeitung läuft...
              </h3>
              <p className="text-sm text-muted-foreground">
                Ihre Signatur wird vorbereitet und verschlüsselt.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SignatureCollectionCanvas;