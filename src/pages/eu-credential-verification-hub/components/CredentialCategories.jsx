import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CredentialCategories = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect, 
  batchMode, 
  onToggleBatch 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success';
      case 'pending': return 'text-warning';
      case 'expired': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'expired': return 'AlertCircle';
      default: return 'HelpCircle';
    }
  };

  return (
    <div className="space-y-4">
      {/* Categories Header */}
      <div className="bg-surface/30 backdrop-matrix rounded-lg border border-border p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="FolderOpen" size={20} className="text-primary" />
          <span>Credential-Kategorien</span>
        </h3>
        
        {/* Category List */}
        <div className="space-y-2">
          {categories?.map((category) => (
            <div
              key={category?.id}
              onClick={() => onCategorySelect(category?.id)}
              className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-lg ${
                selectedCategory === category?.id
                  ? `bg-${category?.color}/10 border-${category?.color}/30 shadow-sm`
                  : 'bg-surface/20 border-border/50 hover:bg-surface/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={category?.icon} 
                    size={18} 
                    className={`text-${category?.color}`} 
                  />
                  <span className="text-sm font-medium text-foreground">
                    {category?.name}
                  </span>
                </div>
                <Icon
                  name={getStatusIcon(category?.status)}
                  size={14}
                  className={getStatusColor(category?.status)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className={`inline-flex items-center px-2 py-1 rounded-full bg-${category?.color}/20`}>
                  <span className={`text-xs font-medium text-${category?.color}`}>
                    {category?.count} Zertifikate
                  </span>
                </div>
                
                <span className="text-xs text-muted-foreground">
                  {category?.status === 'verified' ? 'Validiert' :
                   category?.status === 'pending' ? 'Ausstehend' :
                   category?.status === 'expired' ? 'Abgelaufen' : 'Unbekannt'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Batch Processing Controls */}
      <div className="bg-surface/30 backdrop-matrix rounded-lg border border-border p-4">
        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Layers" size={16} className="text-primary" />
          <span>Batch-Verarbeitung</span>
        </h4>
        
        <Button
          variant={batchMode ? "success" : "outline"}
          size="sm"
          iconName={batchMode ? "CheckSquare" : "Square"}
          iconPosition="left"
          onClick={onToggleBatch}
          className="w-full mb-3"
        >
          {batchMode ? 'Batch-Modus aktiv' : 'Batch-Modus aktivieren'}
        </Button>
        
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={12} className="text-primary" />
            <span>Bis zu 100 Dateien gleichzeitig</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={12} className="text-success" />
            <span>Automatische Compliance-Prüfung</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={12} className="text-warning" />
            <span>Parallele Verarbeitung</span>
          </div>
        </div>
      </div>

      {/* EU Compliance Info */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-2 flex items-center space-x-2">
          <Icon name="Flag" size={16} className="text-primary" />
          <span>EU-Konformität</span>
        </h4>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={12} className="text-success" />
            <span className="text-xs text-muted-foreground">eIDAS-Verordnung konform</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={12} className="text-success" />
            <span className="text-xs text-muted-foreground">DSGVO-compliant</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={12} className="text-success" />
            <span className="text-xs text-muted-foreground">Qualifizierte Zeitstempel</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={12} className="text-success" />
            <span className="text-xs text-muted-foreground">EU Wallet Integration</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CredentialCategories;