import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentTemplateSelector = ({ 
  templates, 
  selectedTemplate, 
  onTemplateSelect, 
  verifiedCredentials, 
  batchMode, 
  onToggleBatch 
}) => {
  const currentTemplate = templates?.find(t => t?.id === selectedTemplate);

  return (
    <div className="space-y-4">
      {/* Template Categories */}
      <div className="bg-surface/30 backdrop-matrix rounded-lg border border-border p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Layout" size={20} className="text-primary" />
          <span>Document Templates</span>
        </h3>
        
        {/* Template Grid */}
        <div className="space-y-2">
          {templates?.map((template) => (
            <div
              key={template?.id}
              onClick={() => onTemplateSelect(template?.id)}
              className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-lg ${
                selectedTemplate === template?.id
                  ? `bg-${template?.color}/10 border-${template?.color}/30 shadow-sm`
                  : 'bg-surface/20 border-border/50 hover:bg-surface/40'
              }`}
            >
              <div className="flex items-start space-x-3">
                <Icon 
                  name={template?.icon} 
                  size={20} 
                  className={`text-${template?.color} flex-shrink-0 mt-0.5`} 
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    {template?.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2 leading-tight">
                    {template?.description}
                  </p>
                  
                  {/* Template Features */}
                  <div className="flex flex-wrap gap-1">
                    {template?.features?.map((feature) => (
                      <span 
                        key={feature}
                        className={`inline-block text-xs px-2 py-0.5 rounded bg-${template?.color}/20 text-${template?.color}`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {selectedTemplate === template?.id && (
                <div className="mt-2 pt-2 border-t border-border/30">
                  <Icon name="Check" size={14} className={`text-${template?.color}`} />
                  <span className={`text-xs font-medium text-${template?.color} ml-1`}>
                    Template ausgewählt
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Template Customization */}
      {currentTemplate && (
        <div className="bg-surface/30 backdrop-matrix rounded-lg border border-border p-4">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="Palette" size={16} className="text-primary" />
            <span>Anpassungsoptionen</span>
          </h4>
          
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Globe"
              iconPosition="left"
              className="w-full justify-start"
            >
              Mehrsprachig (DE/EN)
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Brush"
              iconPosition="left"
              className="w-full justify-start"
            >
              Custom Branding
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Shield"
              iconPosition="left"
              className="w-full justify-start"
            >
              eIDAS Signatur
            </Button>
          </div>
        </div>
      )}

      {/* Batch Processing */}
      <div className="bg-surface/30 backdrop-matrix rounded-lg border border-border p-4">
        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Layers" size={16} className="text-primary" />
          <span>Batch-Generierung</span>
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
            <span>Mehrere Dokumente gleichzeitig</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="FileCheck" size={12} className="text-success" />
            <span>Automatische Qualitätsprüfung</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Download" size={12} className="text-warning" />
            <span>ZIP-Export verfügbar</span>
          </div>
        </div>
      </div>

      {/* Credential Integration */}
      {verifiedCredentials?.length > 0 && (
        <div className="bg-success/5 border border-success/20 rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-2 flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span>Credential Integration</span>
          </h4>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Verfügbare Credentials</span>
              <span className="text-xs font-medium text-success">
                {verifiedCredentials?.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Auto-Embedding</span>
              <Icon name="Check" size={12} className="text-success" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Validierung</span>
              <Icon name="Check" size={12} className="text-success" />
            </div>
          </div>
        </div>
      )}

      {/* Export Formats */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-2 flex items-center space-x-2">
          <Icon name="FileDown" size={16} className="text-primary" />
          <span>Export-Formate</span>
        </h4>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">PDF/A (Archivierung)</span>
            <Icon name="Check" size={12} className="text-success" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Digital signiert</span>
            <Icon name="Check" size={12} className="text-success" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Rechtssicher</span>
            <Icon name="Check" size={12} className="text-success" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Langzeitarchivierung</span>
            <Icon name="Check" size={12} className="text-success" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentTemplateSelector;