import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ActiveCertifications = () => {
  const [selectedCertifications, setSelectedCertifications] = useState([]);

  // Mock active certifications data
  const activeCertifications = [
    {
      id: 1,
      title: 'EU Digital Skills Zertifikat',
      requester: 'Maria Schmidt',
      category: 'gold',
      stage: 'community-validation',
      progress: 65,
      votes: { positive: 24, negative: 3 },
      submissionDate: '2025-08-26T10:30:00Z',
      estimatedCompletion: '2025-08-30T15:00:00Z',
      credentialType: 'Professional Certificate',
      validators: ['Tech Community Berlin', 'EU Skills Network'],
      reputation: 4.8
    },
    {
      id: 2,
      title: 'Blockchain Development Expertise',
      requester: 'Thomas Weber',
      category: 'blue',
      stage: 'credential-submission',
      progress: 25,
      votes: { positive: 12, negative: 1 },
      submissionDate: '2025-08-27T14:15:00Z',
      estimatedCompletion: '2025-09-02T12:00:00Z',
      credentialType: 'Technical Certification',
      validators: ['Blockchain Alliance', 'Developer Community'],
      reputation: 4.6
    },
    {
      id: 3,
      title: 'Sustainable Energy Consulting',
      requester: 'Anna Müller',
      category: 'green',
      stage: 'official-verification',
      progress: 85,
      votes: { positive: 31, negative: 2 },
      submissionDate: '2025-08-25T09:45:00Z',
      estimatedCompletion: '2025-08-29T10:00:00Z',
      credentialType: 'Professional License',
      validators: ['Green Energy Council', 'EU Environmental Board'],
      reputation: 4.9
    },
    {
      id: 4,
      title: 'AI Ethics Certification',
      requester: 'David Fischer',
      category: 'pink',
      stage: 'certificate-issuance',
      progress: 95,
      votes: { positive: 28, negative: 1 },
      submissionDate: '2025-08-24T16:20:00Z',
      estimatedCompletion: '2025-08-28T14:00:00Z',
      credentialType: 'Ethics Certification',
      validators: ['AI Ethics Committee', 'Digital Rights Foundation'],
      reputation: 4.7
    }
  ];

  const getStageInfo = (stage) => {
    const stages = {
      'credential-submission': {
        label: 'Credential Einreichung',
        color: 'category-blue',
        icon: 'Upload'
      },
      'community-validation': {
        label: 'Community Validierung',
        color: 'category-gold',
        icon: 'Users'
      },
      'official-verification': {
        label: 'Offizielle Verifizierung',
        color: 'category-green',
        icon: 'Shield'
      },
      'certificate-issuance': {
        label: 'Zertifikat Ausstellung',
        color: 'category-pink',
        icon: 'Award'
      }
    };
    return stages?.[stage] || stages?.['credential-submission'];
  };

  const handleCertificationAction = (certificationId, action) => {
    console.log(`Action ${action} on certification ${certificationId}`);
    // Handle actions like approve, reject, review, etc.
  };

  const handleSelectionChange = (certificationId) => {
    setSelectedCertifications(prev => 
      prev?.includes(certificationId)
        ? prev?.filter(id => id !== certificationId)
        : [...prev, certificationId]
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Aktive Zertifizierungsprozesse
          </h3>
          <p className="text-sm text-muted-foreground">
            {activeCertifications?.length} aktive Validierungen
            {selectedCertifications?.length > 0 && (
              <span className="ml-2 text-primary">
                • {selectedCertifications?.length} ausgewählt
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
          >
            Filter
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            iconSize={14}
          >
            Exportieren
          </Button>
        </div>
      </div>
      {/* Certifications List */}
      <div className="space-y-4">
        {activeCertifications?.map((cert) => {
          const stageInfo = getStageInfo(cert?.stage);
          const isSelected = selectedCertifications?.includes(cert?.id);
          
          return (
            <div
              key={cert?.id}
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
                    onClick={() => handleSelectionChange(cert?.id)}
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

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-lg font-semibold text-foreground">
                        {cert?.title}
                      </h4>
                      <span className={`category-badge ${cert?.category}`}>
                        {cert?.category?.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Icon name="Star" size={14} className="text-category-gold" />
                        <span>{cert?.reputation}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="MoreHorizontal"
                        onClick={() => handleCertificationAction(cert?.id, 'menu')}
                      />
                    </div>
                  </div>

                  {/* Requester & Type */}
                  <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="User" size={14} />
                      <span>{cert?.requester}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Award" size={14} />
                      <span>{cert?.credentialType}</span>
                    </div>
                  </div>

                  {/* Progress & Stage */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={stageInfo?.icon} 
                          size={16} 
                          className={`text-${stageInfo?.color}`}
                        />
                        <span className={`text-sm font-medium text-${stageInfo?.color}`}>
                          {stageInfo?.label}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {cert?.progress}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 bg-${stageInfo?.color} rounded-full transition-all duration-500`}
                        style={{ width: `${cert?.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Voting & Validators */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <Icon name="ThumbsUp" size={14} className="text-success" />
                        <span className="text-success">{cert?.votes?.positive}</span>
                        <Icon name="ThumbsDown" size={14} className="text-error" />
                        <span className="text-error">{cert?.votes?.negative}</span>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        {cert?.validators?.join(', ')}
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      Eingereicht: {formatDate(cert?.submissionDate)}
                    </span>
                    <span>
                      Geschätzte Fertigstellung: {formatDate(cert?.estimatedCompletion)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex-shrink-0">
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="default"
                      size="sm"
                      iconName="Eye"
                      iconPosition="left"
                      iconSize={14}
                      onClick={() => handleCertificationAction(cert?.id, 'view')}
                    >
                      Ansehen
                    </Button>
                    
                    {cert?.stage === 'community-validation' && (
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Vote"
                        iconPosition="left"
                        iconSize={14}
                        onClick={() => handleCertificationAction(cert?.id, 'vote')}
                      >
                        Abstimmen
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Bulk Actions */}
      {selectedCertifications?.length > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {selectedCertifications?.length} Zertifizierung(en) ausgewählt
            </span>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="CheckCircle"
                iconPosition="left"
                iconSize={14}
              >
                Genehmigen
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="XCircle"
                iconPosition="left"
                iconSize={14}
              >
                Ablehnen
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="X"
                onClick={() => setSelectedCertifications([])}
              >
                Auswahl aufheben
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveCertifications;