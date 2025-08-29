import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import MatrixBackground from './components/MatrixBackground';
import CertificationTabs from './components/CertificationTabs';
import ActiveCertifications from './components/ActiveCertifications';
import CommunityMembers from './components/CommunityMembers';
import DocumentArchive from './components/DocumentArchive';
import CertificationMetrics from './components/CertificationMetrics';
import QuickActions from './components/QuickActions';

const CommunityCertificationDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active-certifications');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for the dashboard
  const mockMetrics = {
    totalCertifications: 1247,
    activeCertifications: 89,
    completedCertifications: 1158,
    communityMembers: 3521,
    documentsGenerated: 2847,
    averageValidationTime: 2.8
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'new-certification':
        navigate('/signature-collection-canvas');
        break;
      case 'verify-credentials':
        navigate('/eu-credential-verification-hub');
        break;
      case 'generate-document':
        navigate('/official-document-generator');
        break;
      case 'community-review': setActiveTab('community-members');
        break;
      default:
        console.log(`Quick action: ${action}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <MatrixBackground />
        <Header />
        <div className="pt-16">
          <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="text-center relative z-10">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Community Certification Dashboard wird geladen...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'active-certifications':
        return <ActiveCertifications />;
      case 'community-members':
        return <CommunityMembers />;
      case 'document-archive':
        return <DocumentArchive />;
      default:
        return <ActiveCertifications />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <MatrixBackground />
      <Header />
      
      <div className="pt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2 text-glow">
                Community Certification Dashboard
              </h1>
              <p className="text-muted-foreground">
                Verwalten Sie Zertifizierungs-Workflows, validieren Sie Community-Credentials und überwachen Sie offizielle Dokumentenerstellung
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Users"
                iconPosition="left"
                iconSize={16}
                onClick={() => handleQuickAction('community-review')}
              >
                Community Bewertung
              </Button>
              <Button
                variant="default"
                iconName="Award"
                iconPosition="left"
                iconSize={16}
                onClick={() => handleQuickAction('new-certification')}
                className="matrix-glow"
              >
                Neue Zertifizierung
              </Button>
            </div>
          </div>

          {/* Certification Metrics */}
          <CertificationMetrics metrics={mockMetrics} />

          {/* Quick Actions Panel */}
          <QuickActions onQuickAction={handleQuickAction} />

          {/* Main Dashboard Content */}
          <div className="bg-surface/50 backdrop-matrix rounded-lg border border-border p-6 shadow-matrix">
            {/* Tab Navigation */}
            <CertificationTabs 
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />

            {/* Tab Content */}
            <div className="mt-8">
              {renderTabContent()}
            </div>
          </div>

          {/* Community Engagement Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="bg-surface/50 backdrop-matrix rounded-lg border border-border p-4 text-center">
              <Icon name="Award" size={24} className="text-category-gold mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">89</div>
              <div className="text-xs text-muted-foreground">Aktive Validierungen</div>
            </div>
            
            <div className="bg-surface/50 backdrop-matrix rounded-lg border border-border p-4 text-center">
              <Icon name="Users" size={24} className="text-category-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">3.521</div>
              <div className="text-xs text-muted-foreground">Community Mitglieder</div>
            </div>
            
            <div className="bg-surface/50 backdrop-matrix rounded-lg border border-border p-4 text-center">
              <Icon name="FileText" size={24} className="text-category-green mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">2.847</div>
              <div className="text-xs text-muted-foreground">Generierte Dokumente</div>
            </div>
            
            <div className="bg-surface/50 backdrop-matrix rounded-lg border border-border p-4 text-center">
              <Icon name="Clock" size={24} className="text-category-pink mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">2,8</div>
              <div className="text-xs text-muted-foreground">Ø Validierungszeit (Min)</div>
            </div>
            
            <div className="bg-surface/50 backdrop-matrix rounded-lg border border-border p-4 text-center">
              <Icon name="CheckCircle" size={24} className="text-success mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">92,8%</div>
              <div className="text-xs text-muted-foreground">Erfolgsrate</div>
            </div>
            
            <div className="bg-surface/50 backdrop-matrix rounded-lg border border-border p-4 text-center">
              <Icon name="TrendingUp" size={24} className="text-category-silver mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">+15%</div>
              <div className="text-xs text-muted-foreground">Wachstum diese Woche</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCertificationDashboard;