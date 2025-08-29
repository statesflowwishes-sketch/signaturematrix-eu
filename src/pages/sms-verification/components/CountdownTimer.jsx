import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const CountdownTimer = ({ initialTime = 600, onExpire, isActive = true }) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    if (!isActive || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          onExpire?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isActive, onExpire]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return ((initialTime - timeRemaining) / initialTime) * 100;
  };

  const getTimerColor = () => {
    if (timeRemaining <= 60) return 'text-error';
    if (timeRemaining <= 180) return 'text-warning';
    return 'text-primary';
  };

  const getProgressColor = () => {
    if (timeRemaining <= 60) return 'bg-error';
    if (timeRemaining <= 180) return 'bg-warning';
    return 'bg-primary';
  };

  if (timeRemaining <= 0) {
    return (
      <div className="bg-error/10 border border-error/20 rounded-lg p-4">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="AlertTriangle" size={20} className="text-error" />
          <span className="text-error font-medium">Code abgelaufen</span>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">
          Bitte fordern Sie einen neuen Code an
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface/50 rounded-lg border border-border p-4">
      <div className="text-center">
        {/* Timer Display */}
        <div className="flex items-center justify-center space-x-2 mb-3">
          <Icon name="Timer" size={20} className={getTimerColor()} />
          <span className={`text-2xl font-mono font-bold ${getTimerColor()}`}>
            {formatTime(timeRemaining)}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted/30 rounded-full h-2 mb-3">
          <div
            className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor()}`}
            style={{ width: `${100 - getProgressPercentage()}%` }}
          />
        </div>

        {/* Timer Status */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">
            Code läuft ab in
          </p>
          <p className="text-xs text-muted-foreground">
            {timeRemaining <= 60 
              ? '⚠️ Weniger als 1 Minute verbleibend'
              : timeRemaining <= 180
              ? '⏰ Weniger als 3 Minuten verbleibend' :'Ihr Code ist noch gültig'
            }
          </p>
        </div>

        {/* Urgency Indicator */}
        {timeRemaining <= 60 && (
          <div className="mt-3 animate-pulse-glow">
            <div className="bg-error/20 border border-error/30 rounded-lg p-2">
              <p className="text-xs text-error font-medium">
                Bitte geben Sie den Code schnell ein!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;