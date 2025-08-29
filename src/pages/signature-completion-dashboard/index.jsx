import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import WorkflowProgress from '../../components/ui/WorkflowProgress';
import CompletionCelebration from './components/CompletionCelebration';
import SignatureSummaryCard from './components/SignatureSummaryCard';
import ActionButtonsPanel from './components/ActionButtonsPanel';
import VerificationStatusPanel from './components/VerificationStatusPanel';
import DesktopAnalytics from './components/DesktopAnalytics';

const SignatureCompletionDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('green');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  const mockUserDetails = {
    name: "Max Mustermann",
    email: "max.mustermann@email.de",
    phone: "+49 123 456 7890",
    location: "Berlin, Deutschland",
    age: "28"
  };

  const mockVerificationTimestamps = {
    email: new Date(Date.now() - 300000), // 5 minutes ago
    sms: new Date(Date.now() - 180000),   // 3 minutes ago
    signature: new Date()                  // now
  };

  useEffect(() => {
    // Simulate loading completion
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center animate-pulse">
            <div className="w-8 h-8 rounded-full bg-primary animate-ping" />
          </div>
          <p className="text-foreground font-medium">Signatur wird verarbeitet...</p>
          <p className="text-sm text-muted-foreground mt-1">Bitte warten Sie einen Moment</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Signatur Abgeschlossen - SignatureMatrix</title>
        <meta name="description" content="Ihre digitale Signatur wurde erfolgreich erfasst und verifiziert. Verwalten Sie Ihre Signatur und laden Sie Dokumente herunter." />
        <meta name="keywords" content="digitale signatur, verifizierung, abgeschlossen, download, pdf export" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Workflow Progress */}
        <WorkflowProgress />

        {/* Matrix Background Animation */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)]?.map((_, i) => (
            <div
              key={i}
              className="matrix-bg absolute bg-primary/3 rounded-full animate-matrix-float"
              style={{
                width: `${Math.random() * 12 + 4}px`,
                height: `${Math.random() * 12 + 4}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 3}s`
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative pt-24 pb-12 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Completion Celebration */}
            <CompletionCelebration selectedCategory={selectedCategory} />

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              {/* Left Column - Summary and Actions */}
              <div className="lg:col-span-2 space-y-8">
                {/* Signature Summary */}
                <SignatureSummaryCard
                  selectedCategory={selectedCategory}
                  userDetails={mockUserDetails}
                  verificationTimestamps={mockVerificationTimestamps}
                />

                {/* Desktop Analytics */}
                <DesktopAnalytics selectedCategory={selectedCategory} />
              </div>

              {/* Right Column - Status and Actions */}
              <div className="space-y-8">
                {/* Verification Status */}
                <VerificationStatusPanel
                  selectedCategory={selectedCategory}
                />

                {/* Action Buttons */}
                <ActionButtonsPanel
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                />
              </div>
            </div>

            {/* Mobile Analytics - Shown only on mobile */}
            <div className="lg:hidden mt-8">
              <div className="bg-surface/80 backdrop-matrix rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary">
                    <path d="M3 3V21H21V3H3Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9 9H15V15H9V9Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>Schnellstatistiken</span>
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/20 rounded-lg border border-border/50">
                    <p className="text-xl font-bold text-foreground">401</p>
                    <p className="text-xs text-muted-foreground">Gesamt Signaturen</p>
                  </div>
                  <div className="text-center p-3 bg-muted/20 rounded-lg border border-border/50">
                    <p className="text-xl font-bold text-foreground">98.2%</p>
                    <p className="text-xs text-muted-foreground">Erfolgsrate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Information */}
            <div className="mt-12 text-center">
              <div className="bg-muted/20 rounded-lg p-6 border border-border/50">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <h3 className="text-lg font-semibold text-foreground">SignatureMatrix</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Ihre Signatur wurde sicher gespeichert und entspricht den deutschen E-Signatur-Standards.
                </p>
                <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-success">
                      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>DSGVO-konform</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-success">
                      <rect x="3" y="11" width="18" height="10" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="16" r="1" stroke="currentColor" strokeWidth="2"/>
                      <path d="M7 11V7A5 5 0 0 1 17 7V11" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>256-bit verschlüsselt</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-success">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>Zeitstempel-Nachweis</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  © {new Date()?.getFullYear()} SignatureMatrix. Alle Rechte vorbehalten.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignatureCompletionDashboard;