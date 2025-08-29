import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CategorySelector = ({ 
  selectedCategory = 'green', 
  onCategoryChange, 
  isProcessing = false 
}) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = [
    { 
      id: 'gold', 
      label: 'Premium', 
      color: '#FFD700', 
      icon: 'Crown',
      description: 'Hochwertige Premium-Signatur für wichtige Dokumente'
    },
    { 
      id: 'red', 
      label: 'Dringend', 
      color: '#FF4757', 
      icon: 'AlertTriangle',
      description: 'Für zeitkritische und dringende Angelegenheiten'
    },
    { 
      id: 'blue', 
      label: 'Standard', 
      color: '#4A90E2', 
      icon: 'FileText',
      description: 'Standardsignatur für allgemeine Dokumente'
    },
    { 
      id: 'pink', 
      label: 'Persönlich', 
      color: '#FF69B4', 
      icon: 'Heart',
      description: 'Für persönliche und private Dokumente'
    },
    { 
      id: 'green', 
      label: 'Verifiziert', 
      color: '#00FF88', 
      icon: 'Shield',
      description: 'Vollständig verifizierte und sichere Signatur'
    },
    { 
      id: 'silver', 
      label: 'Basis', 
      color: '#C0C0C0', 
      icon: 'File',
      description: 'Einfache Basissignatur für grundlegende Dokumente'
    }
  ];

  const handleCategorySelect = (categoryId) => {
    if (!isProcessing) {
      onCategoryChange?.(categoryId);
    }
  };

  const selectedCategoryData = categories?.find(cat => cat?.id === selectedCategory);

  return (
    <div className="relative z-10 bg-surface/80 backdrop-matrix rounded-lg border border-border p-6 shadow-matrix">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
          <Icon name="Palette" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Signatur-Kategorie
          </h2>
          <p className="text-sm text-muted-foreground">
            Wählen Sie die passende Kategorie für Ihre Signatur
          </p>
        </div>
      </div>
      {/* Current Selection Display */}
      <div className="bg-muted/30 rounded-lg p-4 border border-border/50 mb-6">
        <div className="flex items-center space-x-4">
          <div 
            className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center shadow-lg"
            style={{ backgroundColor: selectedCategoryData?.color }}
          >
            <Icon 
              name={selectedCategoryData?.icon} 
              size={20} 
              className="text-white drop-shadow-sm" 
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-foreground">
              {selectedCategoryData?.label}
            </h3>
            <p className="text-sm text-muted-foreground">
              {selectedCategoryData?.description}
            </p>
          </div>
          <Icon name="Check" size={20} className="text-success" />
        </div>
      </div>
      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {categories?.map((category) => {
          const isSelected = selectedCategory === category?.id;
          const isHovered = hoveredCategory === category?.id;
          
          return (
            <button
              key={category?.id}
              onClick={() => handleCategorySelect(category?.id)}
              onMouseEnter={() => setHoveredCategory(category?.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              disabled={isProcessing}
              className={`relative p-4 rounded-lg border-2 transition-all duration-300 group ${
                isSelected
                  ? 'border-primary bg-primary/10 shadow-matrix'
                  : isHovered
                  ? 'border-border/60 bg-muted/30 shadow-lg'
                  : 'border-border/30 bg-surface/30 hover:border-border/50'
              } ${
                isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              {/* Category Color Circle */}
              <div className="flex items-center justify-center mb-3">
                <div 
                  className={`w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center transition-all duration-300 ${
                    isSelected || isHovered ? 'scale-110 shadow-lg' : 'scale-100'
                  }`}
                  style={{ backgroundColor: category?.color }}
                >
                  <Icon 
                    name={category?.icon} 
                    size={18} 
                    className="text-white drop-shadow-sm" 
                  />
                </div>
              </div>
              {/* Category Label */}
              <div className="text-center">
                <h4 className={`font-medium text-sm transition-colors duration-200 ${
                  isSelected ? 'text-primary' : 'text-foreground'
                }`}>
                  {category?.label}
                </h4>
              </div>
              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full border-2 border-background flex items-center justify-center">
                  <Icon name="Check" size={12} className="text-primary-foreground" />
                </div>
              )}
              {/* Hover Glow Effect */}
              {(isSelected || isHovered) && (
                <div 
                  className="absolute inset-0 rounded-lg opacity-20 blur-sm -z-10"
                  style={{ backgroundColor: category?.color }}
                />
              )}
            </button>
          );
        })}
      </div>
      {/* Category Description */}
      {hoveredCategory && (
        <div className="mt-4 p-3 bg-popover rounded-lg border border-border shadow-lg animate-slide-down">
          <div className="flex items-start space-x-3">
            <div 
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: categories?.find(c => c?.id === hoveredCategory)?.color }}
            >
              <Icon 
                name={categories?.find(c => c?.id === hoveredCategory)?.icon} 
                size={14} 
                className="text-white" 
              />
            </div>
            <div>
              <h4 className="font-medium text-foreground text-sm">
                {categories?.find(c => c?.id === hoveredCategory)?.label}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {categories?.find(c => c?.id === hoveredCategory)?.description}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Usage Statistics */}
      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-semibold text-foreground">2.847</p>
            <p className="text-xs text-muted-foreground">Heute erstellt</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">98,7%</p>
            <p className="text-xs text-muted-foreground">Erfolgsrate</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">256-bit</p>
            <p className="text-xs text-muted-foreground">Verschlüsselung</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;