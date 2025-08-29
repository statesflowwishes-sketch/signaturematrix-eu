import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PhoneNumberDisplay = ({ phoneNumber, onEdit, isEditing, onSave, onCancel }) => {
  const [editedNumber, setEditedNumber] = useState(phoneNumber);

  const formatGermanPhoneNumber = (number) => {
    // Format German phone number: +49 XXX XXXXXXX
    const cleaned = number?.replace(/\D/g, '');
    if (cleaned?.startsWith('49')) {
      const formatted = cleaned?.replace(/^49(\d{3})(\d{7,8})$/, '+49 $1 $2');
      return formatted;
    }
    return number;
  };

  const handleSave = () => {
    onSave(editedNumber);
  };

  return (
    <div className="bg-surface/80 backdrop-matrix rounded-lg border border-border p-6 mb-6">
      <div className="text-center">
        {/* Phone Icon with Signal Animation */}
        <div className="relative flex items-center justify-center w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse-glow"></div>
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 border border-primary/30">
            <Icon name="Smartphone" size={32} className="text-primary" />
          </div>
          
          {/* Signal Wave Animation */}
          <div className="absolute -top-2 -right-2">
            <div className="flex space-x-1">
              <div className="w-1 h-3 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
              <div className="w-1 h-4 bg-primary/80 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-2">
          SMS wird gesendet an
        </h3>

        {/* Phone Number Display/Edit */}
        {isEditing ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <input
                type="tel"
                value={editedNumber}
                onChange={(e) => setEditedNumber(e?.target?.value)}
                className="bg-input border border-border rounded-lg px-4 py-2 text-center text-lg font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="+49 XXX XXXXXXX"
              />
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="X"
                iconPosition="left"
                iconSize={16}
                onClick={onCancel}
              >
                Abbrechen
              </Button>
              <Button
                variant="default"
                size="sm"
                iconName="Check"
                iconPosition="left"
                iconSize={16}
                onClick={handleSave}
              >
                Speichern
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
              <p className="text-xl font-mono text-foreground">
                {formatGermanPhoneNumber(phoneNumber)}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="Edit2"
              iconPosition="left"
              iconSize={16}
              onClick={onEdit}
              className="text-muted-foreground"
            >
              Nummer bearbeiten
            </Button>
          </div>
        )}

        {/* SMS Status */}
        <div className="mt-4 flex items-center justify-center space-x-2">
          <Icon name="MessageSquare" size={16} className="text-primary" />
          <span className="text-sm text-muted-foreground">
            SMS-Code wurde gesendet
          </span>
        </div>
      </div>
    </div>
  );
};

export default PhoneNumberDisplay;