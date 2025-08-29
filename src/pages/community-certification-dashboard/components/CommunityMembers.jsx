import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const CommunityMembers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');

  // Mock community members data
  const communityMembers = [
    {
      id: 1,
      name: 'Dr. Maria Schmidt',
      email: 'maria.schmidt@tech-berlin.de',
      credentialLevel: 'gold',
      reputation: 4.9,
      contributionScore: 1247,
      validationsCompleted: 89,
      expertiseAreas: ['AI/ML', 'Data Science', 'Digital Transformation'],
      memberSince: '2023-03-15',
      lastActivity: '2025-08-28T10:30:00Z',
      status: 'active',
      location: 'Berlin, Deutschland',
      achievements: ['Top Validator', 'Community Leader', 'Expert Reviewer']
    },
    {
      id: 2,
      name: 'Thomas Weber',
      email: 'thomas.weber@blockchain-dev.eu',
      credentialLevel: 'silver',
      reputation: 4.7,
      contributionScore: 892,
      validationsCompleted: 56,
      expertiseAreas: ['Blockchain', 'Smart Contracts', 'DeFi'],
      memberSince: '2023-07-22',
      lastActivity: '2025-08-27T16:45:00Z',
      status: 'active',
      location: 'München, Deutschland',
      achievements: ['Blockchain Expert', 'Reliable Validator']
    },
    {
      id: 3,
      name: 'Anna Müller',
      email: 'anna.mueller@green-energy.org',
      credentialLevel: 'green',
      reputation: 4.8,
      contributionScore: 1034,
      validationsCompleted: 73,
      expertiseAreas: ['Sustainable Energy', 'Environmental Consulting', 'Green Tech'],
      memberSince: '2023-01-10',
      lastActivity: '2025-08-28T08:20:00Z',
      status: 'active',
      location: 'Hamburg, Deutschland',
      achievements: ['Green Champion', 'Sustainability Expert', 'Top Contributor']
    },
    {
      id: 4,
      name: 'David Fischer',
      email: 'david.fischer@ai-ethics.eu',
      credentialLevel: 'blue',
      reputation: 4.6,
      contributionScore: 678,
      validationsCompleted: 42,
      expertiseAreas: ['AI Ethics', 'Digital Rights', 'Technology Policy'],
      memberSince: '2023-09-05',
      lastActivity: '2025-08-26T14:10:00Z',
      status: 'active',
      location: 'Frankfurt, Deutschland',
      achievements: ['Ethics Advocate', 'Policy Expert']
    },
    {
      id: 5,
      name: 'Lisa Hoffmann',
      email: 'lisa.hoffmann@cyber-security.de',
      credentialLevel: 'red',
      reputation: 4.5,
      contributionScore: 523,
      validationsCompleted: 34,
      expertiseAreas: ['Cybersecurity', 'IT Security', 'Risk Management'],
      memberSince: '2024-02-14',
      lastActivity: '2025-08-25T11:30:00Z',
      status: 'active',
      location: 'Köln, Deutschland',
      achievements: ['Security Expert', 'Risk Specialist']
    }
  ];

  const getCredentialLevelInfo = (level) => {
    const levels = {
      'gold': { label: 'Gold Expert', color: 'category-gold', icon: 'Crown' },
      'silver': { label: 'Silver Expert', color: 'category-silver', icon: 'Award' },
      'green': { label: 'Green Expert', color: 'category-green', icon: 'Leaf' },
      'blue': { label: 'Blue Expert', color: 'category-blue', icon: 'Shield' },
      'red': { label: 'Red Expert', color: 'category-red', icon: 'Zap' },
      'pink': { label: 'Pink Expert', color: 'category-pink', icon: 'Heart' }
    };
    return levels?.[level] || levels?.['silver'];
  };

  const filteredMembers = communityMembers?.filter(member => {
    const matchesSearch = member?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         member?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         member?.expertiseAreas?.some(area => 
                           area?.toLowerCase()?.includes(searchTerm?.toLowerCase())
                         );
    
    const matchesLevel = filterLevel === 'all' || member?.credentialLevel === filterLevel;
    
    return matchesSearch && matchesLevel;
  });

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatLastActivity = (dateString) => {
    const now = new Date();
    const activity = new Date(dateString);
    const diffMs = now - activity;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 1) return 'Vor wenigen Minuten';
    if (diffHours < 24) return `Vor ${diffHours} Stunden`;
    if (diffDays < 7) return `Vor ${diffDays} Tagen`;
    return formatDate(dateString);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex-1 max-w-md">
          <Input
            type="text"
            placeholder="Mitglieder durchsuchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            iconName="Search"
            iconPosition="left"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e?.target?.value)}
            className="px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Alle Expertenlevel</option>
            <option value="gold">Gold Expert</option>
            <option value="silver">Silver Expert</option>
            <option value="green">Green Expert</option>
            <option value="blue">Blue Expert</option>
            <option value="red">Red Expert</option>
            <option value="pink">Pink Expert</option>
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
      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers?.map((member) => {
          const levelInfo = getCredentialLevelInfo(member?.credentialLevel);
          
          return (
            <div
              key={member?.id}
              className="bg-card/50 backdrop-matrix rounded-lg border border-border p-6 hover:border-border/50 hover:shadow-matrix-lg transition-all duration-300 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {/* Avatar Placeholder */}
                  <div className={`w-12 h-12 bg-${levelInfo?.color}/20 border border-${levelInfo?.color}/30 rounded-full flex items-center justify-center`}>
                    <Icon 
                      name={levelInfo?.icon} 
                      size={20} 
                      className={`text-${levelInfo?.color}`}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-foreground group-hover:text-glow transition-all duration-300">
                      {member?.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {member?.location}
                    </p>
                  </div>
                </div>
                
                <span className={`category-badge ${member?.credentialLevel}`}>
                  {levelInfo?.label}
                </span>
              </div>

              {/* Reputation & Contribution */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={16} className="text-category-gold" />
                  <span className="text-sm font-medium text-foreground">
                    {member?.reputation}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({member?.validationsCompleted} Validierungen)
                  </span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Icon name="Trophy" size={16} className="text-category-silver" />
                  <span className="text-sm font-medium text-foreground">
                    {member?.contributionScore}
                  </span>
                </div>
              </div>

              {/* Expertise Areas */}
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Expertise:</p>
                <div className="flex flex-wrap gap-1">
                  {member?.expertiseAreas?.slice(0, 3)?.map((area, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted/50 text-xs text-muted-foreground rounded-md border border-border/50"
                    >
                      {area}
                    </span>
                  ))}
                  {member?.expertiseAreas?.length > 3 && (
                    <span className="px-2 py-1 bg-muted/50 text-xs text-muted-foreground rounded-md border border-border/50">
                      +{member?.expertiseAreas?.length - 3} mehr
                    </span>
                  )}
                </div>
              </div>

              {/* Achievements */}
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Auszeichnungen:</p>
                <div className="flex items-center space-x-1">
                  {member?.achievements?.slice(0, 2)?.map((achievement, index) => (
                    <Icon 
                      key={index}
                      name="Award" 
                      size={14} 
                      className="text-category-gold" 
                      title={achievement}
                    />
                  ))}
                  {member?.achievements?.length > 2 && (
                    <span className="text-xs text-muted-foreground ml-1">
                      +{member?.achievements?.length - 2}
                    </span>
                  )}
                </div>
              </div>

              {/* Member Since & Last Activity */}
              <div className="text-xs text-muted-foreground mb-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span>Mitglied seit:</span>
                  <span>{formatDate(member?.memberSince)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Letzte Aktivität:</span>
                  <span>{formatLastActivity(member?.lastActivity)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="MessageCircle"
                  iconPosition="left"
                  iconSize={14}
                  className="flex-1"
                >
                  Kontaktieren
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Eye"
                  iconPosition="left"
                  iconSize={14}
                  className="flex-1"
                >
                  Profil
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      {/* No Results */}
      {filteredMembers?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Keine Mitglieder gefunden
          </h3>
          <p className="text-muted-foreground">
            Versuchen Sie es mit anderen Suchbegriffen oder Filtern.
          </p>
        </div>
      )}
      {/* Stats Summary */}
      <div className="bg-card/30 backdrop-matrix rounded-lg border border-border/50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            {filteredMembers?.length} von {communityMembers?.length} Mitgliedern angezeigt
          </span>
          
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span>Aktive Mitglieder: {communityMembers?.filter(m => m?.status === 'active')?.length}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-category-gold" />
              <span>Ø Bewertung: {(communityMembers?.reduce((sum, m) => sum + m?.reputation, 0) / communityMembers?.length)?.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityMembers;