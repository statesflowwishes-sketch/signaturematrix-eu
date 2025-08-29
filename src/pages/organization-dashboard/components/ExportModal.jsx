import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ExportModal = ({ isOpen, onClose, selectedSignatures, totalSignatures }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'csv',
    includeFields: {
      name: true,
      email: true,
      phone: true,
      age: true,
      location: true,
      category: true,
      status: true,
      timestamp: true,
      signature: false
    },
    dateRange: 'all',
    categories: [],
    status: 'all'
  });

  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const formatOptions = [
    { value: 'csv', label: 'CSV (Komma-getrennt)' },
    { value: 'xlsx', label: 'Excel (.xlsx)' },
    { value: 'pdf', label: 'PDF-Bericht' },
    { value: 'json', label: 'JSON-Daten' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'Alle Zeiträume' },
    { value: 'today', label: 'Heute' },
    { value: 'week', label: 'Diese Woche' },
    { value: 'month', label: 'Dieser Monat' },
    { value: 'quarter', label: 'Dieses Quartal' },
    { value: 'year', label: 'Dieses Jahr' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Alle Status' },
    { value: 'verified', label: 'Nur verifizierte' },
    { value: 'pending', label: 'Nur ausstehende' },
    { value: 'failed', label: 'Nur fehlgeschlagene' }
  ];

  const fieldLabels = {
    name: 'Name',
    email: 'E-Mail-Adresse',
    phone: 'Telefonnummer',
    age: 'Alter',
    location: 'Standort',
    category: 'Kategorie',
    status: 'Verifizierungsstatus',
    timestamp: 'Zeitstempel',
    signature: 'Unterschrift-Daten (Base64)'
  };

  const handleFieldToggle = (field, checked) => {
    setExportConfig(prev => ({
      ...prev,
      includeFields: {
        ...prev?.includeFields,
        [field]: checked
      }
    }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Exporting with config:', exportConfig);
    console.log('Selected signatures:', selectedSignatures);
    
    setIsExporting(false);
    onClose();
  };

  const getSelectedCount = () => {
    return selectedSignatures?.length || 0;
  };

  const getEstimatedFileSize = () => {
    const count = getSelectedCount() || totalSignatures;
    const fieldsCount = Object.values(exportConfig?.includeFields)?.filter(Boolean)?.length;
    const estimatedKB = Math.ceil((count * fieldsCount * 50) / 1024);
    
    if (estimatedKB < 1024) {
      return `~${estimatedKB} KB`;
    } else {
      return `~${(estimatedKB / 1024)?.toFixed(1)} MB`;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-lg shadow-matrix-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
              <Icon name="Download" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Unterschriften exportieren</h2>
              <p className="text-sm text-muted-foreground">
                {getSelectedCount() > 0 
                  ? `${getSelectedCount()} ausgewählte Unterschriften exportieren`
                  : `Alle ${totalSignatures} Unterschriften exportieren`
                }
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            iconSize={20}
            onClick={onClose}
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Export Format */}
          <div>
            <Select
              label="Export-Format"
              description="Wählen Sie das gewünschte Dateiformat"
              options={formatOptions}
              value={exportConfig?.format}
              onChange={(value) => setExportConfig(prev => ({ ...prev, format: value }))}
            />
          </div>

          {/* Date Range Filter */}
          <div>
            <Select
              label="Zeitraum"
              description="Filtern Sie nach Erstellungsdatum"
              options={dateRangeOptions}
              value={exportConfig?.dateRange}
              onChange={(value) => setExportConfig(prev => ({ ...prev, dateRange: value }))}
            />
          </div>

          {/* Status Filter */}
          <div>
            <Select
              label="Status-Filter"
              description="Filtern Sie nach Verifizierungsstatus"
              options={statusOptions}
              value={exportConfig?.status}
              onChange={(value) => setExportConfig(prev => ({ ...prev, status: value }))}
            />
          </div>

          {/* Field Selection */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">
              Zu exportierende Felder
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(fieldLabels)?.map(([field, label]) => (
                <Checkbox
                  key={field}
                  label={label}
                  checked={exportConfig?.includeFields?.[field]}
                  onChange={(e) => handleFieldToggle(field, e?.target?.checked)}
                  description={field === 'signature' ? 'Warnung: Große Dateigröße' : undefined}
                />
              ))}
            </div>
          </div>

          {/* Export Summary */}
          <div className="bg-muted/20 rounded-lg p-4 border border-border/50">
            <h4 className="text-sm font-medium text-foreground mb-3">Export-Zusammenfassung</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Anzahl Datensätze:</span>
                <span className="text-foreground font-medium">
                  {getSelectedCount() > 0 ? getSelectedCount() : totalSignatures}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ausgewählte Felder:</span>
                <span className="text-foreground font-medium">
                  {Object.values(exportConfig?.includeFields)?.filter(Boolean)?.length} von {Object.keys(fieldLabels)?.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Geschätzte Dateigröße:</span>
                <span className="text-foreground font-medium">{getEstimatedFileSize()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Format:</span>
                <span className="text-foreground font-medium">
                  {formatOptions?.find(opt => opt?.value === exportConfig?.format)?.label}
                </span>
              </div>
            </div>
          </div>

          {/* GDPR Notice */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={16} className="text-warning mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-warning mb-1">DSGVO-Hinweis</p>
                <p className="text-muted-foreground">
                  Der Export personenbezogener Daten unterliegt den DSGVO-Bestimmungen. 
                  Stellen Sie sicher, dass Sie berechtigt sind, diese Daten zu exportieren 
                  und angemessene Sicherheitsmaßnahmen treffen.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border/50">
          <div className="text-xs text-muted-foreground">
            Export wird verschlüsselt und sicher übertragen
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isExporting}
            >
              Abbrechen
            </Button>
            <Button
              variant="default"
              iconName="Download"
              iconPosition="left"
              iconSize={16}
              onClick={handleExport}
              loading={isExporting}
              disabled={Object.values(exportConfig?.includeFields)?.every(field => !field)}
            >
              {isExporting ? 'Exportiere...' : 'Export starten'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;