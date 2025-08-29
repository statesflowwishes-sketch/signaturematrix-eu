import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ActionButtonsPanel = ({ 
  selectedCategory = 'green',
  onCategoryChange,
  signatureId = 'SIG-12345678'
}) => {
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);
  const [showCategorySelector, setShowCategorySelector] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const categories = [
    { id: 'gold', label: 'Premium', icon: 'Crown', color: 'gold' },
    { id: 'red', label: 'Dringend', icon: 'AlertTriangle', color: 'red' },
    { id: 'blue', label: 'Standard', icon: 'FileText', color: 'blue' },
    { id: 'pink', label: 'Persönlich', icon: 'Heart', color: 'pink' },
    { id: 'green', label: 'Verifiziert', icon: 'Shield', color: 'green' },
    { id: 'silver', label: 'Basis', icon: 'File', color: 'silver' }
  ];

  const shareOptions = [
    { id: 'email', label: 'Per E-Mail teilen', icon: 'Mail' },
    { id: 'link', label: 'Link kopieren', icon: 'Link' },
    { id: 'qr', label: 'QR-Code generieren', icon: 'QrCode' },
    { id: 'download', label: 'Als Datei herunterladen', icon: 'Download' }
  ];

  const handleExportPDF = async () => {
    setIsExporting(true);
    // Simulate PDF export
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsExporting(false);
    console.log('PDF exported successfully');
  };

  const handleCategoryChange = (categoryId) => {
    onCategoryChange?.(categoryId);
    setShowCategorySelector(false);
  };

  const handleShare = (shareType) => {
    console.log(`Sharing via ${shareType}`);
    setShowShareOptions(false);
  };

  const handleNewSignature = () => {
    navigate('/signature-collection-canvas');
  };

  const handleReturnToDashboard = () => {
    navigate('/organization-dashboard');
  };

  return (
    <div className="space-y-6">
      {/* Primary Actions */}
      <div className="bg-surface/80 backdrop-matrix rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Settings" size={20} className="text-primary" />
          <span>Signatur-Aktionen</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Export PDF */}
          <Button
            variant="default"
            size="lg"
            iconName="Download"
            iconPosition="left"
            iconSize={18}
            onClick={handleExportPDF}
            loading={isExporting}
            className="w-full"
          >
            {isExporting ? 'PDF wird erstellt...' : 'Als PDF exportieren'}
          </Button>

          {/* Share Options */}
          <div className="relative">
            <Button
              variant="outline"
              size="lg"
              iconName="Share2"
              iconPosition="left"
              iconSize={18}
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="w-full"
            >
              Teilen
            </Button>

            {showShareOptions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-matrix-lg z-50 animate-slide-down">
                <div className="p-2">
                  {shareOptions?.map((option) => (
                    <button
                      key={option?.id}
                      onClick={() => handleShare(option?.id)}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors hover:bg-muted/50"
                    >
                      <Icon name={option?.icon} size={16} />
                      <span>{option?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Category Change */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">
              Kategorie ändern:
            </span>
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCategorySelector(!showCategorySelector)}
                className="flex items-center space-x-2"
              >
                <span className={`category-badge ${selectedCategory} px-2 py-1 text-xs`}>
                  {categories?.find(cat => cat?.id === selectedCategory)?.label}
                </span>
                <Icon 
                  name="ChevronDown" 
                  size={14} 
                  className={`transition-transform duration-200 ${showCategorySelector ? 'rotate-180' : ''}`}
                />
              </Button>

              {showCategorySelector && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-matrix-lg z-50 animate-slide-down">
                  <div className="p-2">
                    {categories?.map((category) => (
                      <button
                        key={category?.id}
                        onClick={() => handleCategoryChange(category?.id)}
                        className={`w-full flex items-center space-x-3 px-2 py-2 rounded-md text-sm transition-colors hover:bg-muted/50 ${
                          selectedCategory === category?.id ? 'bg-muted' : ''
                        }`}
                      >
                        <Icon name={category?.icon} size={16} />
                        <span className={`category-badge ${category?.color} flex-1 text-left`}>
                          {category?.label}
                        </span>
                        {selectedCategory === category?.id && (
                          <Icon name="Check" size={14} className="text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Actions */}
      <div className="bg-surface/80 backdrop-matrix rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Navigation" size={20} className="text-primary" />
          <span>Weitere Aktionen</span>
        </h3>

        <div className="space-y-3">
          <Button
            variant="outline"
            size="default"
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
            onClick={handleNewSignature}
            className="w-full justify-start"
          >
            Neue Signatur erfassen
          </Button>

          <Button
            variant="ghost"
            size="default"
            iconName="BarChart3"
            iconPosition="left"
            iconSize={16}
            onClick={handleReturnToDashboard}
            className="w-full justify-start"
          >
            Zum Dashboard zurückkehren
          </Button>

          <Button
            variant="ghost"
            size="default"
            iconName="HelpCircle"
            iconPosition="left"
            iconSize={16}
            onClick={() => console.log('Help clicked')}
            className="w-full justify-start"
          >
            Hilfe & Support
          </Button>
        </div>
      </div>
      {/* Signature Info */}
      <div className="bg-muted/20 rounded-lg p-4 border border-border/50">
        <div className="flex items-center space-x-3">
          <Icon name="Info" size={16} className="text-primary flex-shrink-0" />
          <div className="text-xs">
            <p className="text-foreground font-medium mb-1">
              Signatur-ID: {signatureId}
            </p>
            <p className="text-muted-foreground">
              Diese Signatur ist rechtsgültig und entspricht den deutschen E-Signatur-Standards.
            </p>
          </div>
        </div>
      </div>
      {/* Overlay for dropdowns */}
      {(showCategorySelector || showShareOptions) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowCategorySelector(false);
            setShowShareOptions(false);
          }}
        />
      )}
    </div>
  );
};

export default ActionButtonsPanel;