import React from 'react';
import Icon from '../../../components/AppIcon';

const CertificationTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'active-certifications',
      label: 'Aktive Zertifizierungen',
      icon: 'Activity',
      count: 89,
      color: 'primary'
    },
    {
      id: 'community-members',
      label: 'Community Mitglieder',
      icon: 'Users',
      count: 3521,
      color: 'category-blue'
    },
    {
      id: 'document-archive',
      label: 'Dokument Archiv',
      icon: 'FileText',
      count: 2847,
      color: 'category-green'
    }
  ];

  return (
    <div className="border-b border-border">
      <nav className="flex space-x-8" aria-label="Certification Dashboard Tabs">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange?.(tab?.id)}
            className={`
              relative flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-all duration-300
              ${activeTab === tab?.id 
                ? `border-${tab?.color} text-${tab?.color} bg-${tab?.color}/5` 
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }
            `}
            aria-current={activeTab === tab?.id ? 'page' : undefined}
          >
            <Icon 
              name={tab?.icon} 
              size={18} 
              className={`
                transition-colors duration-300
                ${activeTab === tab?.id ? `text-${tab?.color}` : 'text-muted-foreground'}
              `}
            />
            <span>{tab?.label}</span>
            {tab?.count && (
              <span className={`
                inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${activeTab === tab?.id 
                  ? `bg-${tab?.color} text-background` 
                  : 'bg-muted text-muted-foreground'
                }
              `}>
                {tab?.count?.toLocaleString()}
              </span>
            )}
            
            {/* Active tab indicator */}
            {activeTab === tab?.id && (
              <div className={`
                absolute -bottom-0.5 left-0 right-0 h-0.5 bg-${tab?.color} rounded-full
                animate-pulse-glow
              `} />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default CertificationTabs;