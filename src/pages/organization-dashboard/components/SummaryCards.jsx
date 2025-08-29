import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryCards = ({ data }) => {
  const summaryData = [
    {
      id: 'total',
      title: 'Gesamte Unterschriften',
      value: data?.totalSignatures?.toLocaleString('de-DE'),
      change: '+12,5%',
      changeType: 'positive',
      icon: 'FileSignature',
      description: 'Seit letztem Monat'
    },
    {
      id: 'verified',
      title: 'Verifizierte Unterschriften',
      value: data?.verifiedSignatures?.toLocaleString('de-DE'),
      change: '+8,3%',
      changeType: 'positive',
      icon: 'ShieldCheck',
      description: `${((data?.verifiedSignatures / data?.totalSignatures) * 100)?.toFixed(1)}% Verifizierungsrate`
    },
    {
      id: 'pending',
      title: 'Ausstehende Verifizierung',
      value: data?.pendingVerification?.toLocaleString('de-DE'),
      change: '-5,2%',
      changeType: 'negative',
      icon: 'Clock',
      description: 'Warten auf Bestätigung'
    },
    {
      id: 'today',
      title: 'Heute gesammelt',
      value: data?.todaySignatures?.toLocaleString('de-DE'),
      change: '+23,1%',
      changeType: 'positive',
      icon: 'TrendingUp',
      description: 'Verglichen mit gestern'
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case 'positive':
        return 'TrendingUp';
      case 'negative':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {summaryData?.map((item) => (
        <div
          key={item?.id}
          className="bg-surface/80 backdrop-matrix rounded-lg border border-border p-6 hover:shadow-matrix transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/20">
              <Icon name={item?.icon} size={24} className="text-primary" />
            </div>
            <div className={`flex items-center space-x-1 ${getChangeColor(item?.changeType)}`}>
              <Icon name={getChangeIcon(item?.changeType)} size={16} />
              <span className="text-sm font-medium">{item?.change}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              {item?.title}
            </h3>
            <div className="text-2xl font-bold text-foreground">
              {item?.value}
            </div>
            <p className="text-xs text-muted-foreground">
              {item?.description}
            </p>
          </div>

          {/* Mini Progress Bar for Verification Rate */}
          {item?.id === 'verified' && (
            <div className="mt-4">
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div
                  className="bg-success h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(data?.verifiedSignatures / data?.totalSignatures) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Mini Progress Bar for Pending */}
          {item?.id === 'pending' && (
            <div className="mt-4">
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div
                  className="bg-warning h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(data?.pendingVerification / data?.totalSignatures) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;