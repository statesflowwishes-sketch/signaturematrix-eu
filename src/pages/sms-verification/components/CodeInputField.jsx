import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const CodeInputField = ({ value, onChange, onComplete, error, disabled }) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRefs = useRef([]);

  const codeLength = 6;
  const codeArray = value?.padEnd(codeLength, ' ')?.split('')?.slice(0, codeLength);

  useEffect(() => {
    if (value?.length === codeLength) {
      onComplete?.(value);
    }
  }, [value, codeLength, onComplete]);

  const handleInputChange = (index, inputValue) => {
    const digit = inputValue?.replace(/\D/g, '')?.slice(-1);
    const newCode = [...codeArray];
    newCode[index] = digit;
    
    const newValue = newCode?.join('')?.trim();
    onChange(newValue);

    // Auto-advance to next input
    if (digit && index < codeLength - 1) {
      setFocusedIndex(index + 1);
      inputRefs?.current?.[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e?.key === 'Backspace') {
      if (!codeArray?.[index] && index > 0) {
        setFocusedIndex(index - 1);
        inputRefs?.current?.[index - 1]?.focus();
      }
    } else if (e?.key === 'ArrowLeft' && index > 0) {
      setFocusedIndex(index - 1);
      inputRefs?.current?.[index - 1]?.focus();
    } else if (e?.key === 'ArrowRight' && index < codeLength - 1) {
      setFocusedIndex(index + 1);
      inputRefs?.current?.[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e?.preventDefault();
    const pastedData = e?.clipboardData?.getData('text')?.replace(/\D/g, '')?.slice(0, codeLength);
    onChange(pastedData);
    
    if (pastedData?.length === codeLength) {
      inputRefs?.current?.[codeLength - 1]?.focus();
    } else if (pastedData?.length > 0) {
      inputRefs?.current?.[Math.min(pastedData?.length, codeLength - 1)]?.focus();
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Bestätigungscode eingeben
        </h3>
        <p className="text-sm text-muted-foreground">
          Geben Sie den 6-stelligen Code ein, den Sie per SMS erhalten haben
        </p>
      </div>
      {/* Code Input Boxes */}
      <div className="flex items-center justify-center space-x-3">
        {codeArray?.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit?.trim()}
            onChange={(e) => handleInputChange(index, e?.target?.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={() => setFocusedIndex(index)}
            disabled={disabled}
            className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-mono bg-input border-2 rounded-lg transition-all duration-200 focus:outline-none ${
              error
                ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20'
                : focusedIndex === index
                ? 'border-primary focus:border-primary focus:ring-2 focus:ring-primary/20' :'border-border hover:border-primary/50'
            } ${
              digit?.trim() ? 'text-foreground' : 'text-muted-foreground'
            } ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'
            }`}
          />
        ))}
      </div>
      {/* Error Message */}
      {error && (
        <div className="flex items-center justify-center space-x-2 text-error">
          <Icon name="AlertCircle" size={16} />
          <span className="text-sm">{error}</span>
        </div>
      )}
      {/* Input Instructions */}
      <div className="bg-muted/20 rounded-lg p-3 border border-border/50">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Eingabe-Tipps</p>
            <ul className="space-y-1">
              <li>• Code automatisch aus SMS kopieren</li>
              <li>• Pfeiltasten zur Navigation verwenden</li>
              <li>• Backspace zum Löschen</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeInputField;