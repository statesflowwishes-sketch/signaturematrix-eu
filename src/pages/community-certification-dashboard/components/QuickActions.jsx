import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onQuickAction }) => {
  const actions = [
    {
      id: 'new-certification',
      label: 'Neue Zertifizierung',
      description: 'Starten Sie einen neuen Zertifizierungsprozess',
      icon: 'Plus',
      variant: 'default',
      color: 'primary'
    },
    {
      id: 'verify-credentials',
      label: 'Credentials Prüfen',
      description: 'EU-Credential Verifikation durchführen',
      icon: 'Shield',
      variant: 'outline',
      color: 'category-blue'
    },
    {
      id: 'generate-document',
      label: 'Dokument Generieren',
      description: 'Offizielle Dokumente erstellen',
      icon: 'FileText',
      variant: 'outline',
      color: 'category-green'
    },
    {
      id: 'community-review',
      label: 'Community Bewertung',
      description: 'Peer Review Prozess starten',
      icon: 'Users',
      variant: 'outline',
      color: 'category-gold'
    }
  ];

  return (
    <div className="bg-surface/50 backdrop-matrix rounded-lg border border-border p-6 mb-8 shadow-matrix">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            Schnellaktionen
          </h2>
          <p className="text-sm text-muted-foreground">
            Häufig verwendete Zertifizierungs- und Validierungsaktionen
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions?.map((action) => (
          <div
            key={action?.id}
            className={`
              group relative p-4 rounded-lg border-2 border-${action?.color}/20 
              bg-${action?.color}/5 hover:bg-${action?.color}/10 
              transition-all duration-300 cursor-pointer
              hover:border-${action?.color}/40 hover:shadow-lg
            `}
            onClick={() => onQuickAction?.(action?.id)}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`
                p-3 rounded-full bg-${action?.color}/10 border border-${action?.color}/30
                group-hover:bg-${action?.color}/20 group-hover:scale-110
                transition-all duration-300
              `}>
                <div className={`w-6 h-6 text-${action?.color}`}>
                  {/* Using a placeholder div since we can't dynamically import Icon */}
                  <div className="w-full h-full bg-current opacity-80 rounded" />
                </div>
              </div>
              
              <div>
                <h3 className={`font-semibold text-foreground text-sm mb-1 group-hover:text-${action?.color} transition-colors`}>
                  {action?.label}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {action?.description}
                </p>
              </div>
              
              <Button
                variant={action?.variant}
                size="sm"
                className={`
                  w-full mt-2 opacity-80 group-hover:opacity-100
                  ${action?.variant === 'default' ? 'matrix-glow' : ''}
                `}
                onClick={(e) => {
                  e?.stopPropagation();
                  onQuickAction?.(action?.id);
                }}
              >
                {action?.label}
              </Button>
            </div>
            
            {/* Subtle glow effect on hover */}
            <div className={`
              absolute inset-0 rounded-lg bg-${action?.color}/5 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
            `} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;