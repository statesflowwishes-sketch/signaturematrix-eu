import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const CampaignFilters = ({ onFiltersChange, totalSignatures }) => {
  const [filters, setFilters] = useState({
    dateRange: 'all',
    category: 'all',
    status: 'all',
    search: ''
  });

  const dateRangeOptions = [
    { value: 'all', label: 'Alle Zeiträume' },
    { value: 'today', label: 'Heute' },
    { value: 'week', label: 'Diese Woche' },
    { value: 'month', label: 'Dieser Monat' },
    { value: 'quarter', label: 'Dieses Quartal' },
    { value: 'year', label: 'Dieses Jahr' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'Alle Kategorien' },
    { value: 'gold', label: 'Premium' },
    { value: 'red', label: 'Dringend' },
    { value: 'blue', label: 'Standard' },
    { value: 'pink', label: 'Persönlich' },
    { value: 'green', label: 'Verifiziert' },
    { value: 'silver', label: 'Basis' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Alle Status' },
    { value: 'pending', label: 'Ausstehend' },
    { value: 'verified', label: 'Verifiziert' },
    { value: 'failed', label: 'Fehlgeschlagen' },
    { value: 'expired', label: 'Abgelaufen' }
  ];

  const categoryStats = [
    { id: 'gold', label: 'Premium', count: 245, color: 'gold', icon: 'Crown' },
    { id: 'red', label: 'Dringend', count: 189, color: 'red', icon: 'AlertTriangle' },
    { id: 'blue', label: 'Standard', count: 567, color: 'blue', icon: 'FileText' },
    { id: 'pink', label: 'Persönlich', count: 123, color: 'pink', icon: 'Heart' },
    { id: 'green', label: 'Verifiziert', count: 892, color: 'green', icon: 'Shield' },
    { id: 'silver', label: 'Basis', count: 334, color: 'silver', icon: 'File' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      dateRange: 'all',
      category: 'all',
      status: 'all',
      search: ''
    };
    setFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const hasActiveFilters = filters?.dateRange !== 'all' || filters?.category !== 'all' || 
                          filters?.status !== 'all' || filters?.search !== '';

  return (
    <div className="bg-surface/80 backdrop-matrix rounded-lg border border-border p-6 space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Filter</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconPosition="left"
            iconSize={14}
            onClick={clearFilters}
            className="text-muted-foreground"
          >
            Zurücksetzen
          </Button>
        )}
      </div>
      {/* Search */}
      <div>
        <Input
          type="search"
          placeholder="Nach Name, E-Mail oder Telefon suchen..."
          value={filters?.search}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Date Range Filter */}
      <div>
        <Select
          label="Zeitraum"
          options={dateRangeOptions}
          value={filters?.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
        />
      </div>
      {/* Category Filter */}
      <div>
        <Select
          label="Kategorie"
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => handleFilterChange('category', value)}
        />
      </div>
      {/* Status Filter */}
      <div>
        <Select
          label="Verifizierungsstatus"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
        />
      </div>
      {/* Category Statistics */}
      <div className="pt-4 border-t border-border/50">
        <h4 className="text-sm font-medium text-foreground mb-4">Kategorie-Übersicht</h4>
        <div className="space-y-3">
          {categoryStats?.map((category) => (
            <div
              key={category?.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30 hover:bg-muted/30 transition-colors cursor-pointer"
              onClick={() => handleFilterChange('category', category?.id)}
            >
              <div className="flex items-center space-x-3">
                <Icon name={category?.icon} size={16} />
                <div>
                  <span className={`category-badge ${category?.color} text-xs`}>
                    {category?.label}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-foreground">
                  {category?.count?.toLocaleString('de-DE')}
                </span>
                <div className="text-xs text-muted-foreground">
                  {((category?.count / totalSignatures) * 100)?.toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="pt-4 border-t border-border/50">
        <h4 className="text-sm font-medium text-foreground mb-3">Schnellaktionen</h4>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Download"
            iconPosition="left"
            iconSize={14}
            onClick={() => console.log('Export all')}
          >
            Alle exportieren
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="RefreshCw"
            iconPosition="left"
            iconSize={14}
            onClick={() => console.log('Refresh data')}
          >
            Daten aktualisieren
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Settings"
            iconPosition="left"
            iconSize={14}
            onClick={() => console.log('Campaign settings')}
          >
            Kampagnen-Einstellungen
          </Button>
        </div>
      </div>
      {/* Filter Summary */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-border/50">
          <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Info" size={14} className="text-primary" />
              <span className="text-xs font-medium text-primary">Aktive Filter</span>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              {filters?.search && (
                <div>Suche: "{filters?.search}"</div>
              )}
              {filters?.dateRange !== 'all' && (
                <div>Zeitraum: {dateRangeOptions?.find(opt => opt?.value === filters?.dateRange)?.label}</div>
              )}
              {filters?.category !== 'all' && (
                <div>Kategorie: {categoryOptions?.find(opt => opt?.value === filters?.category)?.label}</div>
              )}
              {filters?.status !== 'all' && (
                <div>Status: {statusOptions?.find(opt => opt?.value === filters?.status)?.label}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignFilters;