import React, { useState } from 'react';
import Button from './Button';
import Icon from '../AppIcon';

const SignatureCanvasControls = ({ 
  onClear, 
  onUndo, 
  onRedo, 
  onComplete, 
  selectedCategory = 'green',
  onCategoryChange,
  canUndo = false,
  canRedo = false,
  hasSignature = false,
  isProcessing = false 
}) => {
  const [showCategories, setShowCategories] = useState(false);

  const categories = [
    { id: 'gold', label: 'Premium', color: 'gold', icon: 'Crown' },
    { id: 'red', label: 'Urgent', color: 'red', icon: 'AlertTriangle' },
    { id: 'blue', label: 'Standard', color: 'blue', icon: 'FileText' },
    { id: 'pink', label: 'Personal', color: 'pink', icon: 'Heart' },
    { id: 'green', label: 'Verified', color: 'green', icon: 'Shield' },
    { id: 'silver', label: 'Basic', color: 'silver', icon: 'File' }
  ];

  const selectedCategoryData = categories?.find(cat => cat?.id === selectedCategory);

  const handleCategorySelect = (categoryId) => {
    onCategoryChange?.(categoryId);
    setShowCategories(false);
  };

  return (
    <div className="bg-surface/80 backdrop-matrix rounded-lg border border-border p-4 space-y-4">
      {/* Drawing Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
            onClick={onUndo}
            disabled={!canUndo || isProcessing}
          >
            Undo
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCw"
            iconPosition="left"
            iconSize={16}
            onClick={onRedo}
            disabled={!canRedo || isProcessing}
          >
            Redo
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Trash2"
            iconPosition="left"
            iconSize={16}
            onClick={onClear}
            disabled={!hasSignature || isProcessing}
          >
            Clear
          </Button>
        </div>

        {/* Signature Category Selector */}
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCategories(!showCategories)}
            disabled={isProcessing}
            className="flex items-center space-x-2"
          >
            <Icon name={selectedCategoryData?.icon} size={16} />
            <span className={`category-badge ${selectedCategory} px-2 py-1 text-xs`}>
              {selectedCategoryData?.label}
            </span>
            <Icon 
              name="ChevronDown" 
              size={14} 
              className={`transition-transform duration-200 ${showCategories ? 'rotate-180' : ''}`}
            />
          </Button>

          {/* Category Dropdown */}
          {showCategories && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-matrix-lg z-50 animate-slide-down">
              <div className="p-2">
                <p className="text-xs font-medium text-muted-foreground mb-2 px-2">
                  Signature Category
                </p>
                {categories?.map((category) => (
                  <button
                    key={category?.id}
                    onClick={() => handleCategorySelect(category?.id)}
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
      {/* Canvas Instructions */}
      <div className="bg-muted/30 rounded-lg p-3 border border-border/50">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-foreground font-medium mb-1">
              Drawing Instructions
            </p>
            <ul className="text-muted-foreground space-y-1 text-xs">
              <li>• Use your finger or stylus to draw your signature</li>
              <li>• Press firmly for thicker lines, lightly for thinner lines</li>
              <li>• Select appropriate category before completing</li>
              <li>• Ensure signature is clear and legible</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Shield" size={14} className="text-primary" />
          <span>256-bit encrypted signature</span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            iconSize={16}
            disabled={!hasSignature || isProcessing}
            onClick={() => console.log('Download signature')}
          >
            Download
          </Button>
          
          <Button
            variant="default"
            size="sm"
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={16}
            onClick={onComplete}
            disabled={!hasSignature || isProcessing}
            loading={isProcessing}
          >
            Complete Signature
          </Button>
        </div>
      </div>
      {/* Signature Quality Indicator */}
      {hasSignature && (
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={14} className="text-success" />
            <span className="text-xs text-success">Signature Quality: Good</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-success"></div>
            <div className="w-2 h-2 rounded-full bg-success"></div>
            <div className="w-2 h-2 rounded-full bg-success"></div>
            <div className="w-2 h-2 rounded-full bg-muted"></div>
            <div className="w-2 h-2 rounded-full bg-muted"></div>
          </div>
        </div>
      )}
      {/* Overlay for category dropdown */}
      {showCategories && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowCategories(false)}
        />
      )}
    </div>
  );
};

export default SignatureCanvasControls;