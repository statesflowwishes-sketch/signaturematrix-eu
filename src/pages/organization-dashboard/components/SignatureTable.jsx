import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const SignatureTable = ({ signatures, onSelectionChange, onSort, onExport, onPreview }) => {
  const [selectedSignatures, setSelectedSignatures] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });

  const handleSelectAll = (checked) => {
    if (checked) {
      const allIds = signatures?.map(sig => sig?.id);
      setSelectedSignatures(allIds);
      onSelectionChange?.(allIds);
    } else {
      setSelectedSignatures([]);
      onSelectionChange?.([]);
    }
  };

  const handleSelectSignature = (signatureId, checked) => {
    let newSelection;
    if (checked) {
      newSelection = [...selectedSignatures, signatureId];
    } else {
      newSelection = selectedSignatures?.filter(id => id !== signatureId);
    }
    setSelectedSignatures(newSelection);
    onSelectionChange?.(newSelection);
  };

  const handleSort = (key) => {
    const direction = sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
    onSort?.({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      verified: { label: 'Verifiziert', color: 'text-success bg-success/10 border-success/20' },
      pending: { label: 'Ausstehend', color: 'text-warning bg-warning/10 border-warning/20' },
      failed: { label: 'Fehlgeschlagen', color: 'text-error bg-error/10 border-error/20' },
      expired: { label: 'Abgelaufen', color: 'text-muted-foreground bg-muted/10 border-muted/20' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getCategoryBadge = (category) => {
    const categories = {
      gold: { label: 'Premium', icon: 'Crown' },
      red: { label: 'Dringend', icon: 'AlertTriangle' },
      blue: { label: 'Standard', icon: 'FileText' },
      pink: { label: 'Persönlich', icon: 'Heart' },
      green: { label: 'Verifiziert', icon: 'Shield' },
      silver: { label: 'Basis', icon: 'File' }
    };

    const categoryData = categories?.[category] || categories?.green;
    return (
      <div className="flex items-center space-x-2">
        <Icon name={categoryData?.icon} size={14} />
        <span className={`category-badge ${category} text-xs`}>
          {categoryData?.label}
        </span>
      </div>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isAllSelected = signatures?.length > 0 && selectedSignatures?.length === signatures?.length;
  const isIndeterminate = selectedSignatures?.length > 0 && selectedSignatures?.length < signatures?.length;

  return (
    <div className="bg-surface/80 backdrop-matrix rounded-lg border border-border overflow-hidden">
      {/* Table Header with Actions */}
      <div className="flex items-center justify-between p-6 border-b border-border/50">
        <div className="flex items-center space-x-4">
          <Checkbox
            checked={isAllSelected}
            indeterminate={isIndeterminate}
            onChange={(e) => handleSelectAll(e?.target?.checked)}
            label={`${selectedSignatures?.length} von ${signatures?.length} ausgewählt`}
          />
        </div>

        <div className="flex items-center space-x-2">
          {selectedSignatures?.length > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                iconSize={14}
                onClick={() => onExport?.(selectedSignatures)}
              >
                Ausgewählte exportieren ({selectedSignatures?.length})
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Trash2"
                iconPosition="left"
                iconSize={14}
                onClick={() => console.log('Delete selected')}
              >
                Löschen
              </Button>
            </>
          )}
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            iconSize={14}
            onClick={() => console.log('Refresh table')}
          >
            Aktualisieren
          </Button>
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/20 border-b border-border/50">
            <tr>
              <th className="w-12 p-4">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName={getSortIcon('name')}
                  iconPosition="right"
                  iconSize={14}
                  onClick={() => handleSort('name')}
                  className="font-medium text-foreground"
                >
                  Name
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName={getSortIcon('email')}
                  iconPosition="right"
                  iconSize={14}
                  onClick={() => handleSort('email')}
                  className="font-medium text-foreground"
                >
                  E-Mail
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName={getSortIcon('phone')}
                  iconPosition="right"
                  iconSize={14}
                  onClick={() => handleSort('phone')}
                  className="font-medium text-foreground"
                >
                  Telefon
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName={getSortIcon('status')}
                  iconPosition="right"
                  iconSize={14}
                  onClick={() => handleSort('status')}
                  className="font-medium text-foreground"
                >
                  Status
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName={getSortIcon('category')}
                  iconPosition="right"
                  iconSize={14}
                  onClick={() => handleSort('category')}
                  className="font-medium text-foreground"
                >
                  Kategorie
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName={getSortIcon('timestamp')}
                  iconPosition="right"
                  iconSize={14}
                  onClick={() => handleSort('timestamp')}
                  className="font-medium text-foreground"
                >
                  Zeitstempel
                </Button>
              </th>
              <th className="text-center p-4 w-32">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {signatures?.map((signature) => (
              <tr
                key={signature?.id}
                className="border-b border-border/30 hover:bg-muted/20 transition-colors"
              >
                <td className="p-4">
                  <Checkbox
                    checked={selectedSignatures?.includes(signature?.id)}
                    onChange={(e) => handleSelectSignature(signature?.id, e?.target?.checked)}
                  />
                </td>
                <td className="p-4">
                  <div className="font-medium text-foreground">{signature?.name}</div>
                  <div className="text-sm text-muted-foreground">{signature?.age} Jahre</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground font-mono">{signature?.email}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground font-mono">{signature?.phone}</div>
                </td>
                <td className="p-4">
                  {getStatusBadge(signature?.status)}
                </td>
                <td className="p-4">
                  {getCategoryBadge(signature?.category)}
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">{formatDate(signature?.timestamp)}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Eye"
                      iconSize={14}
                      onClick={() => onPreview?.(signature)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Download"
                      iconSize={14}
                      onClick={() => onExport?.([signature?.id])}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="MoreHorizontal"
                      iconSize={14}
                      onClick={() => console.log('More actions', signature?.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border/30">
        {signatures?.map((signature) => (
          <div key={signature?.id} className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Checkbox
                checked={selectedSignatures?.includes(signature?.id)}
                onChange={(e) => handleSelectSignature(signature?.id, e?.target?.checked)}
                label={signature?.name}
              />
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Eye"
                  iconSize={14}
                  onClick={() => onPreview?.(signature)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Download"
                  iconSize={14}
                  onClick={() => onExport?.([signature?.id])}
                />
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">E-Mail:</span>
                <span className="text-foreground font-mono">{signature?.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Telefon:</span>
                <span className="text-foreground font-mono">{signature?.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status:</span>
                {getStatusBadge(signature?.status)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Kategorie:</span>
                {getCategoryBadge(signature?.category)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Zeitstempel:</span>
                <span className="text-foreground text-xs">{formatDate(signature?.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {signatures?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileSignature" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Keine Unterschriften gefunden
          </h3>
          <p className="text-muted-foreground mb-4">
            Es wurden noch keine Unterschriften gesammelt oder Ihre Filter ergaben keine Treffer.
          </p>
          <Button
            variant="outline"
            iconName="RefreshCw"
            iconPosition="left"
            iconSize={16}
            onClick={() => console.log('Refresh')}
          >
            Aktualisieren
          </Button>
        </div>
      )}
    </div>
  );
};

export default SignatureTable;