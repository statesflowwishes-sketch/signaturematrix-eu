import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import CampaignFilters from './components/CampaignFilters';
import SummaryCards from './components/SummaryCards';
import SignatureTable from './components/SignatureTable';
import CategoryChart from './components/CategoryChart';
import ExportModal from './components/ExportModal';

const OrganizationDashboard = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    dateRange: 'all',
    category: 'all',
    status: 'all',
    search: ''
  });
  const [selectedSignatures, setSelectedSignatures] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
  const [showExportModal, setShowExportModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  const mockSummaryData = {
    totalSignatures: 2350,
    verifiedSignatures: 1987,
    pendingVerification: 298,
    todaySignatures: 47
  };

  const mockSignatures = [
    {
      id: 1,
      name: "Anna Müller",
      email: "anna.mueller@email.de",
      phone: "+49 30 12345678",
      age: 34,
      location: "Berlin, Deutschland",
      status: "verified",
      category: "green",
      timestamp: "2025-08-27T14:30:00Z"
    },
    {
      id: 2,
      name: "Thomas Schmidt",
      email: "thomas.schmidt@email.de",
      phone: "+49 89 87654321",
      age: 42,
      location: "München, Deutschland",
      status: "pending",
      category: "gold",
      timestamp: "2025-08-27T13:15:00Z"
    },
    {
      id: 3,
      name: "Sarah Weber",
      email: "sarah.weber@email.de",
      phone: "+49 40 11223344",
      age: 28,
      location: "Hamburg, Deutschland",
      status: "verified",
      category: "blue",
      timestamp: "2025-08-27T12:45:00Z"
    },
    {
      id: 4,
      name: "Michael Fischer",
      email: "michael.fischer@email.de",
      phone: "+49 221 55667788",
      age: 39,
      location: "Köln, Deutschland",
      status: "failed",
      category: "red",
      timestamp: "2025-08-27T11:20:00Z"
    },
    {
      id: 5,
      name: "Julia Becker",
      email: "julia.becker@email.de",
      phone: "+49 711 99887766",
      age: 31,
      location: "Stuttgart, Deutschland",
      status: "verified",
      category: "pink",
      timestamp: "2025-08-27T10:30:00Z"
    },
    {
      id: 6,
      name: "David Wagner",
      email: "david.wagner@email.de",
      phone: "+49 69 44556677",
      age: 45,
      location: "Frankfurt, Deutschland",
      status: "pending",
      category: "silver",
      timestamp: "2025-08-27T09:15:00Z"
    },
    {
      id: 7,
      name: "Lisa Hoffmann",
      email: "lisa.hoffmann@email.de",
      phone: "+49 351 22334455",
      age: 26,
      location: "Dresden, Deutschland",
      status: "verified",
      category: "green",
      timestamp: "2025-08-27T08:45:00Z"
    },
    {
      id: 8,
      name: "Robert Klein",
      email: "robert.klein@email.de",
      phone: "+49 511 66778899",
      age: 37,
      location: "Hannover, Deutschland",
      status: "expired",
      category: "blue",
      timestamp: "2025-08-26T16:20:00Z"
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters changed:', newFilters);
  };

  const handleSort = (sortConfig) => {
    setSortConfig(sortConfig);
    console.log('Sort changed:', sortConfig);
  };

  const handleSelectionChange = (selectedIds) => {
    setSelectedSignatures(selectedIds);
  };

  const handleExport = (signatureIds) => {
    if (signatureIds && signatureIds?.length > 0) {
      setSelectedSignatures(signatureIds);
    }
    setShowExportModal(true);
  };

  const handlePreview = (signature) => {
    console.log('Preview signature:', signature);
    // Navigate to signature preview or open modal
  };

  const filteredSignatures = mockSignatures?.filter(signature => {
    // Apply search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      const matchesSearch = 
        signature?.name?.toLowerCase()?.includes(searchTerm) ||
        signature?.email?.toLowerCase()?.includes(searchTerm) ||
        signature?.phone?.includes(searchTerm);
      if (!matchesSearch) return false;
    }

    // Apply category filter
    if (filters?.category !== 'all' && signature?.category !== filters?.category) {
      return false;
    }

    // Apply status filter
    if (filters?.status !== 'all' && signature?.status !== filters?.status) {
      return false;
    }

    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Dashboard wird geladen...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Matrix Animation Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="matrix-bg absolute top-1/4 left-1/4 w-12 h-12 bg-primary/3 rounded-full" />
        <div className="matrix-bg absolute top-1/3 right-1/4 w-8 h-8 bg-primary/2 rounded-full" style={{ animationDelay: '1s' }} />
        <div className="matrix-bg absolute bottom-1/4 left-1/3 w-16 h-16 bg-primary/4 rounded-full" style={{ animationDelay: '2s' }} />
        <div className="matrix-bg absolute bottom-1/3 right-1/3 w-6 h-6 bg-primary/3 rounded-full" style={{ animationDelay: '0.5s' }} />
        <div className="matrix-bg absolute top-1/2 left-1/6 w-10 h-10 bg-primary/2 rounded-full" style={{ animationDelay: '1.5s' }} />
      </div>
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Organisations-Dashboard
              </h1>
              <p className="text-muted-foreground">
                Verwalten Sie Ihre Unterschriftenkampagnen und überwachen Sie den Verifizierungsfortschritt
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
                onClick={() => navigate('/signature-collection-canvas')}
              >
                Neue Kampagne
              </Button>
              <Button
                variant="default"
                iconName="BarChart3"
                iconPosition="left"
                iconSize={16}
                onClick={() => console.log('Analytics')}
              >
                Analytics anzeigen
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <SummaryCards data={mockSummaryData} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar - Filters */}
            <div className="lg:col-span-3">
              <CampaignFilters 
                onFiltersChange={handleFiltersChange}
                totalSignatures={mockSummaryData?.totalSignatures}
              />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9 space-y-8">
              {/* Category Chart */}
              <CategoryChart data={mockSummaryData} />

              {/* Signatures Table */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Unterschriften-Übersicht
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {filteredSignatures?.length} von {mockSignatures?.length} Unterschriften
                      {selectedSignatures?.length > 0 && (
                        <span className="ml-2 text-primary">
                          • {selectedSignatures?.length} ausgewählt
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Filter"
                      iconPosition="left"
                      iconSize={14}
                      onClick={() => console.log('Advanced filters')}
                    >
                      Erweiterte Filter
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Download"
                      iconPosition="left"
                      iconSize={14}
                      onClick={() => handleExport()}
                    >
                      Exportieren
                    </Button>
                  </div>
                </div>

                <SignatureTable
                  signatures={filteredSignatures}
                  onSelectionChange={handleSelectionChange}
                  onSort={handleSort}
                  onExport={handleExport}
                  onPreview={handlePreview}
                />
              </div>
            </div>
          </div>

          {/* Quick Stats Footer */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-surface/50 backdrop-matrix rounded-lg border border-border p-4 text-center">
              <Icon name="Users" size={24} className="text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">2.350</div>
              <div className="text-xs text-muted-foreground">Gesamte Teilnehmer</div>
            </div>
            <div className="bg-surface/50 backdrop-matrix rounded-lg border border-border p-4 text-center">
              <Icon name="CheckCircle" size={24} className="text-success mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">84,5%</div>
              <div className="text-xs text-muted-foreground">Verifizierungsrate</div>
            </div>
            <div className="bg-surface/50 backdrop-matrix rounded-lg border border-border p-4 text-center">
              <Icon name="Clock" size={24} className="text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">2,3 Min</div>
              <div className="text-xs text-muted-foreground">Ø Verifizierungszeit</div>
            </div>
            <div className="bg-surface/50 backdrop-matrix rounded-lg border border-border p-4 text-center">
              <Icon name="Globe" size={24} className="text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">16</div>
              <div className="text-xs text-muted-foreground">Bundesländer</div>
            </div>
          </div>
        </div>
      </div>
      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        selectedSignatures={selectedSignatures}
        totalSignatures={mockSummaryData?.totalSignatures}
      />
    </div>
  );
};

export default OrganizationDashboard;