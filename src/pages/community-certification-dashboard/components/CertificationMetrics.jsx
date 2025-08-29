import React from 'react';
import Icon from '../../../components/AppIcon';

const CertificationMetrics = ({ metrics }) => {
  const metricCards = [
    {
      title: 'Gesamt Zertifizierungen',
      value: metrics?.totalCertifications,
      icon: 'Award',
      color: 'category-gold',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Aktive Validierungen',
      value: metrics?.activeCertifications,
      icon: 'Activity',
      color: 'primary',
      change: '+5',
      changeType: 'positive'
    },
    {
      title: 'Abgeschlossen',
      value: metrics?.completedCertifications,
      icon: 'CheckCircle',
      color: 'success',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Community Mitglieder',
      value: metrics?.communityMembers,
      icon: 'Users',
      color: 'category-blue',
      change: '+15%',
      changeType: 'positive'
    },
    {
      title: 'Generierte Dokumente',
      value: metrics?.documentsGenerated,
      icon: 'FileText',
      color: 'category-green',
      change: '+23',
      changeType: 'positive'
    },
    {
      title: 'Ø Validierungszeit',
      value: `${metrics?.averageValidationTime} Min`,
      icon: 'Clock',
      color: 'category-pink',
      change: '-0.2 Min',
      changeType: 'positive'
    }
  ];

  const getChangeColor = (changeType) => {
    return changeType === 'positive' ? 'text-success' : 'text-error';
  };

  const getChangeIcon = (changeType) => {
    return changeType === 'positive' ? 'TrendingUp' : 'TrendingDown';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      {metricCards?.map((metric, index) => (
        <div
          key={index}
          className="bg-surface/50 backdrop-matrix rounded-lg border border-border p-6 shadow-matrix hover:shadow-matrix-lg transition-all duration-300 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg bg-${metric?.color}/10 border border-${metric?.color}/20`}>
              <Icon 
                name={metric?.icon} 
                size={24} 
                className={`text-${metric?.color} group-hover:scale-110 transition-transform duration-300`}
              />
            </div>
            
            <div className="flex items-center space-x-1 text-sm">
              <Icon 
                name={getChangeIcon(metric?.changeType)} 
                size={14} 
                className={getChangeColor(metric?.changeType)}
              />
              <span className={getChangeColor(metric?.changeType)}>
                {metric?.change}
              </span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-glow transition-all duration-300">
              {typeof metric?.value === 'number' ? metric?.value?.toLocaleString() : metric?.value}
            </h3>
            <p className="text-sm text-muted-foreground">
              {metric?.title}
            </p>
          </div>
          
          {/* Subtle animated border */}
          <div className={`absolute inset-0 rounded-lg border-2 border-${metric?.color}/0 group-hover:border-${metric?.color}/20 transition-all duration-500`} />
        </div>
      ))}
    </div>
  );
};

export default CertificationMetrics;