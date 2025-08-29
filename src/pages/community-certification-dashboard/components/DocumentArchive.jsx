import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const DocumentArchive = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [selectedDocs, setSelectedDocs] = useState([]);

  // Mock document archive data
  const archivedDocuments = [
    {
      id: 1,
      title: 'EU Digital Skills Certificate - Maria Schmidt',
      type: 'certificate',
      category: 'gold',
      format: 'PDF',
      size: '2.4 MB',
      downloadCount: 15,
      createdDate: '2025-08-28T09:30:00Z',
      expiryDate: '2026-08-28T09:30:00Z',
      issuer: 'EU Skills Certification Board',
      recipient: 'Dr. Maria Schmidt',
      documentId: 'EU-DSC-2025-001247',
      status: 'active',
      digitalSignature: true,
      blockchain: true,
      credentialUrl: 'https://verify.eu-skills.org/certificates/2025-001247',
      tags: ['Digital Skills', 'AI/ML', 'Professional Development']
    },
    {
      id: 2,
      title: 'Blockchain Development Expertise - Thomas Weber',
      type: 'expertise-certificate',
      category: 'blue',
      format: 'PDF',
      size: '1.8 MB',
      downloadCount: 8,
      createdDate: '2025-08-27T14:15:00Z',
      expiryDate: '2026-08-27T14:15:00Z',
      issuer: 'Blockchain Alliance Europe',
      recipient: 'Thomas Weber',
      documentId: 'BAE-BDE-2025-000892',
      status: 'active',
      digitalSignature: true,
      blockchain: true,
      credentialUrl: 'https://verify.blockchain-alliance.eu/892',
      tags: ['Blockchain', 'Smart Contracts', 'Technical Certification']
    },
    {
      id: 3,
      title: 'Sustainable Energy Consulting License - Anna Müller',
      type: 'professional-license',
      category: 'green',
      format: 'PDF',
      size: '3.1 MB',
      downloadCount: 23,
      createdDate: '2025-08-26T11:45:00Z',
      expiryDate: '2027-08-26T11:45:00Z',
      issuer: 'EU Environmental Certification Board',
      recipient: 'Anna Müller',
      documentId: 'EECB-SEC-2025-001034',
      status: 'active',
      digitalSignature: true,
      blockchain: true,
      credentialUrl: 'https://verify.eu-environmental.org/1034',
      tags: ['Sustainable Energy', 'Environmental Consulting', 'Green Tech']
    },
    {
      id: 4,
      title: 'AI Ethics Certification - David Fischer',
      type: 'ethics-certificate',
      category: 'pink',
      format: 'PDF',
      size: '2.7 MB',
      downloadCount: 12,
      createdDate: '2025-08-25T16:20:00Z',
      expiryDate: '2026-08-25T16:20:00Z',
      issuer: 'Digital Rights Foundation',
      recipient: 'David Fischer',
      documentId: 'DRF-AEC-2025-000678',
      status: 'active',
      digitalSignature: true,
      blockchain: true,
      credentialUrl: 'https://verify.digital-rights.eu/678',
      tags: ['AI Ethics', 'Digital Rights', 'Policy Certification']
    },
    {
      id: 5,
      title: 'Cybersecurity Risk Assessment Certificate - Lisa Hoffmann',
      type: 'security-certificate',
      category: 'red',
      format: 'PDF',
      size: '2.2 MB',
      downloadCount: 7,
      createdDate: '2025-08-24T13:10:00Z',
      expiryDate: '2026-08-24T13:10:00Z',
      issuer: 'European Cybersecurity Institute',
      recipient: 'Lisa Hoffmann',
      documentId: 'ECI-CRA-2025-000523',
      status: 'active',
      digitalSignature: true,
      blockchain: false,
      credentialUrl: 'https://verify.eu-cybersecurity.org/523',
      tags: ['Cybersecurity', 'Risk Management', 'IT Security']
    }
  ];

  const getDocumentTypeInfo = (type) => {
    const types = {
      'certificate': { label: 'Zertifikat', icon: 'Award', color: 'category-gold' },
      'expertise-certificate': { label: 'Expertise Zertifikat', icon: 'Shield', color: 'category-blue' },
      'professional-license': { label: 'Professionelle Lizenz', icon: 'FileCheck', color: 'category-green' },
      'ethics-certificate': { label: 'Ethik Zertifikat', icon: 'Heart', color: 'category-pink' },
      'security-certificate': { label: 'Sicherheitszertifikat', icon: 'Lock', color: 'category-red' }
    };
    return types?.[type] || types?.['certificate'];
  };

  const filteredDocuments = archivedDocuments?.filter(doc => {
    const matchesSearch = doc?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         doc?.recipient?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         doc?.documentId?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         doc?.tags?.some(tag => tag?.toLowerCase()?.includes(searchTerm?.toLowerCase()));
    
    const matchesType = filterType === 'all' || doc?.type === filterType;
    
    return matchesSearch && matchesType;
  });

  // Sort documents
  const sortedDocuments = [...filteredDocuments]?.sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b?.createdDate) - new Date(a?.createdDate);
      case 'date-asc':
        return new Date(a?.createdDate) - new Date(b?.createdDate);
      case 'downloads-desc':
        return b?.downloadCount - a?.downloadCount;
      case 'name-asc':
        return a?.title?.localeCompare(b?.title);
      default:
        return 0;
    }
  });

  const handleDocumentAction = (docId, action) => {
    console.log(`Action ${action} on document ${docId}`);
  };

  const handleSelectionChange = (docId) => {
    setSelectedDocs(prev => 
      prev?.includes(docId)
        ? prev?.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatFileSize = (size) => {
    return size;
  };

  const getStatusInfo = (status, expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
    
    if (status === 'active' && daysUntilExpiry > 30) {
      return { label: 'Aktiv', color: 'success', icon: 'CheckCircle' };
    } else if (status === 'active' && daysUntilExpiry <= 30) {
      return { label: 'Läuft bald ab', color: 'warning', icon: 'Clock' };
    } else if (status === 'expired') {
      return { label: 'Abgelaufen', color: 'error', icon: 'XCircle' };
    }
    return { label: 'Aktiv', color: 'success', icon: 'CheckCircle' };
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex-1 max-w-md">
          <Input
            type="text"
            placeholder="Dokumente durchsuchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            iconName="Search"
            iconPosition="left"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e?.target?.value)}
            className="px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Alle Dokumenttypen</option>
            <option value="certificate">Zertifikate</option>
            <option value="expertise-certificate">Expertise Zertifikate</option>
            <option value="professional-license">Professionelle Lizenzen</option>
            <option value="ethics-certificate">Ethik Zertifikate</option>
            <option value="security-certificate">Sicherheitszertifikate</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="date-desc">Neueste zuerst</option>
            <option value="date-asc">Älteste zuerst</option>
            <option value="downloads-desc">Meist heruntergeladen</option>
            <option value="name-asc">Name A-Z</option>
          </select>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Filter"
            iconPosition="left"
            iconSize={14}
          >
            Erweiterte Filter
          </Button>
        </div>
      </div>
      {/* Documents List */}
      <div className="space-y-4">
        {sortedDocuments?.map((doc) => {
          const typeInfo = getDocumentTypeInfo(doc?.type);
          const statusInfo = getStatusInfo(doc?.status, doc?.expiryDate);
          const isSelected = selectedDocs?.includes(doc?.id);
          
          return (
            <div
              key={doc?.id}
              className={`
                bg-card/50 backdrop-matrix rounded-lg border-2 p-6 transition-all duration-300
                ${isSelected 
                  ? 'border-primary shadow-matrix-lg' 
                  : 'border-border hover:border-border/50'
                }
              `}
            >
              <div className="flex items-start space-x-4">
                {/* Selection Checkbox */}
                <div className="flex-shrink-0 pt-1">
                  <button
                    onClick={() => handleSelectionChange(doc?.id)}
                    className={`
                      w-5 h-5 border-2 rounded transition-all duration-200
                      ${isSelected 
                        ? 'border-primary bg-primary' :'border-border hover:border-primary/50'
                      }
                    `}
                  >
                    {isSelected && (
                      <Icon name="Check" size={12} className="text-primary-foreground" />
                    )}
                  </button>
                </div>

                {/* Document Icon */}
                <div className={`flex-shrink-0 p-3 bg-${typeInfo?.color}/10 border border-${typeInfo?.color}/20 rounded-lg`}>
                  <Icon 
                    name={typeInfo?.icon} 
                    size={24} 
                    className={`text-${typeInfo?.color}`}
                  />
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-1">
                        {doc?.title}
                      </h4>
                      <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                        <span>ID: {doc?.documentId}</span>
                        <span>•</span>
                        <span>{doc?.recipient}</span>
                        <span>•</span>
                        <span>{doc?.issuer}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`category-badge ${doc?.category}`}>
                        {doc?.category?.toUpperCase()}
                      </span>
                      <div className={`flex items-center space-x-1 px-2 py-1 bg-${statusInfo?.color}/10 border border-${statusInfo?.color}/20 rounded-md`}>
                        <Icon 
                          name={statusInfo?.icon} 
                          size={12} 
                          className={`text-${statusInfo?.color}`}
                        />
                        <span className={`text-xs text-${statusInfo?.color}`}>
                          {statusInfo?.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Document Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Typ:</span>
                      <div className="flex items-center space-x-1 mt-1">
                        <Icon name={typeInfo?.icon} size={14} className={`text-${typeInfo?.color}`} />
                        <span className="text-foreground">{typeInfo?.label}</span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Format:</span>
                      <div className="flex items-center space-x-1 mt-1">
                        <Icon name="FileText" size={14} className="text-muted-foreground" />
                        <span className="text-foreground">{doc?.format} ({formatFileSize(doc?.size)})</span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Erstellt:</span>
                      <div className="flex items-center space-x-1 mt-1">
                        <Icon name="Calendar" size={14} className="text-muted-foreground" />
                        <span className="text-foreground">{formatDate(doc?.createdDate)}</span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Downloads:</span>
                      <div className="flex items-center space-x-1 mt-1">
                        <Icon name="Download" size={14} className="text-muted-foreground" />
                        <span className="text-foreground">{doc?.downloadCount}</span>
                      </div>
                    </div>
                  </div>

                  {/* Security Features */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <Icon 
                        name="Shield" 
                        size={14} 
                        className={doc?.digitalSignature ? 'text-success' : 'text-muted-foreground'}
                      />
                      <span className={`text-xs ${doc?.digitalSignature ? 'text-success' : 'text-muted-foreground'}`}>
                        Digital signiert
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Icon 
                        name="Link" 
                        size={14} 
                        className={doc?.blockchain ? 'text-primary' : 'text-muted-foreground'}
                      />
                      <span className={`text-xs ${doc?.blockchain ? 'text-primary' : 'text-muted-foreground'}`}>
                        Blockchain verifiziert
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Icon name="ExternalLink" size={14} className="text-category-blue" />
                      <span className="text-xs text-category-blue">
                        Online verifizierbar
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {doc?.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-muted/50 text-xs text-muted-foreground rounded-md border border-border/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expiry Information */}
                  <div className="text-xs text-muted-foreground">
                    Gültig bis: {formatDate(doc?.expiryDate)}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex-shrink-0">
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="default"
                      size="sm"
                      iconName="Download"
                      iconPosition="left"
                      iconSize={14}
                      onClick={() => handleDocumentAction(doc?.id, 'download')}
                    >
                      Download
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Eye"
                      iconPosition="left"
                      iconSize={14}
                      onClick={() => handleDocumentAction(doc?.id, 'preview')}
                    >
                      Vorschau
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="ExternalLink"
                      iconPosition="left"
                      iconSize={14}
                      onClick={() => handleDocumentAction(doc?.id, 'verify')}
                    >
                      Verifizieren
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* No Results */}
      {sortedDocuments?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Keine Dokumente gefunden
          </h3>
          <p className="text-muted-foreground">
            Versuchen Sie es mit anderen Suchbegriffen oder Filtern.
          </p>
        </div>
      )}
      {/* Bulk Actions */}
      {selectedDocs?.length > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {selectedDocs?.length} Dokument(e) ausgewählt
            </span>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                iconSize={14}
              >
                Alle herunterladen
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Archive"
                iconPosition="left"
                iconSize={14}
              >
                Archivieren
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="X"
                onClick={() => setSelectedDocs([])}
              >
                Auswahl aufheben
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Archive Stats */}
      <div className="bg-card/30 backdrop-matrix rounded-lg border border-border/50 p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-foreground">{archivedDocuments?.length}</div>
            <div className="text-xs text-muted-foreground">Gesamt Dokumente</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">
              {archivedDocuments?.reduce((sum, doc) => sum + doc?.downloadCount, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Gesamt Downloads</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">
              {archivedDocuments?.filter(doc => doc?.digitalSignature)?.length}
            </div>
            <div className="text-xs text-muted-foreground">Digital Signiert</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">
              {archivedDocuments?.filter(doc => doc?.blockchain)?.length}
            </div>
            <div className="text-xs text-muted-foreground">Blockchain Verifiziert</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentArchive;