import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from './Button';
import Input from './Input';
import Icon from '../AppIcon';

const VerificationStatusDisplay = ({ 
  verificationType = 'email',
  status = 'pending',
  onResend,
  onVerify,
  onSkip,
  contactInfo = '',
  timeRemaining = 300,
  attempts = 0,
  maxAttempts = 3
}) => {
  const location = useLocation();
  const [verificationCode, setVerificationCode] = useState('');
  const [countdown, setCountdown] = useState(timeRemaining);
  const [canResend, setCanResend] = useState(false);

  const isEmailVerification = location?.pathname === '/email-verification';
  const isSmsVerification = location?.pathname === '/sms-verification';
  
  if (!isEmailVerification && !isSmsVerification) {
    return null;
  }

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          icon: 'Clock',
          iconColor: 'text-warning',
          title: `Verification ${verificationType === 'email' ? 'Email' : 'SMS'} Sent`,
          description: `We've sent a verification code to ${contactInfo}`,
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20'
        };
      case 'success':
        return {
          icon: 'CheckCircle',
          iconColor: 'text-success',
          title: 'Verification Successful',
          description: 'Your identity has been verified successfully',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20'
        };
      case 'error':
        return {
          icon: 'XCircle',
          iconColor: 'text-error',
          title: 'Verification Failed',
          description: 'The code you entered is incorrect. Please try again.',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20'
        };
      case 'expired':
        return {
          icon: 'AlertTriangle',
          iconColor: 'text-warning',
          title: 'Code Expired',
          description: 'Your verification code has expired. Please request a new one.',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20'
        };
      default:
        return {
          icon: 'Mail',
          iconColor: 'text-primary',
          title: 'Verification Required',
          description: 'Please complete verification to continue',
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary/20'
        };
    }
  };

  const statusConfig = getStatusConfig();

  const handleVerify = () => {
    if (verificationCode?.length >= 4) {
      onVerify?.(verificationCode);
    }
  };

  const handleResend = () => {
    setCountdown(timeRemaining);
    setCanResend(false);
    setVerificationCode('');
    onResend?.();
  };

  const handleCodeChange = (e) => {
    const value = e?.target?.value?.replace(/\D/g, '')?.slice(0, 6);
    setVerificationCode(value);
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Status Display */}
      <div className={`${statusConfig?.bgColor} ${statusConfig?.borderColor} border rounded-lg p-6 mb-6`}>
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-surface border border-border">
            <Icon 
              name={statusConfig?.icon} 
              size={32} 
              className={`${statusConfig?.iconColor} animate-pulse-glow`}
            />
          </div>
          
          <h2 className="text-xl font-semibold text-foreground mb-2">
            {statusConfig?.title}
          </h2>
          
          <p className="text-muted-foreground text-sm mb-4">
            {statusConfig?.description}
          </p>

          {/* Contact Info Display */}
          {contactInfo && status === 'pending' && (
            <div className="bg-surface/50 rounded-lg p-3 mb-4 border border-border/50">
              <div className="flex items-center justify-center space-x-2">
                <Icon 
                  name={verificationType === 'email' ? 'Mail' : 'Smartphone'} 
                  size={16} 
                  className="text-primary" 
                />
                <span className="text-sm font-mono text-foreground">
                  {contactInfo}
                </span>
              </div>
            </div>
          )}

          {/* Countdown Timer */}
          {status === 'pending' && countdown > 0 && (
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Icon name="Timer" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground font-mono">
                Code expires in {formatTime(countdown)}
              </span>
            </div>
          )}
        </div>
      </div>
      {/* Verification Code Input */}
      {(status === 'pending' || status === 'error') && (
        <div className="space-y-4 mb-6">
          <Input
            label="Verification Code"
            type="text"
            placeholder="Enter 6-digit code"
            value={verificationCode}
            onChange={handleCodeChange}
            className="text-center text-lg font-mono tracking-widest"
            maxLength={6}
            description={`Enter the ${verificationType === 'email' ? 'email' : 'SMS'} verification code`}
          />

          <Button
            variant="default"
            size="lg"
            fullWidth
            iconName="Shield"
            iconPosition="left"
            iconSize={18}
            onClick={handleVerify}
            disabled={verificationCode?.length < 4}
          >
            Verify Code
          </Button>
        </div>
      )}
      {/* Action Buttons */}
      <div className="space-y-3">
        {/* Resend Button */}
        {(status === 'pending' || status === 'expired' || status === 'error') && (
          <Button
            variant="outline"
            size="default"
            fullWidth
            iconName="RefreshCw"
            iconPosition="left"
            iconSize={16}
            onClick={handleResend}
            disabled={!canResend}
          >
            {canResend ? 'Resend Code' : `Resend in ${formatTime(countdown)}`}
          </Button>
        )}

        {/* Success Continue Button */}
        {status === 'success' && (
          <Button
            variant="default"
            size="lg"
            fullWidth
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={18}
            onClick={() => console.log('Continue to next step')}
          >
            Continue
          </Button>
        )}

        {/* Skip Option */}
        {status === 'pending' && onSkip && (
          <Button
            variant="ghost"
            size="default"
            fullWidth
            iconName="SkipForward"
            iconPosition="left"
            iconSize={16}
            onClick={onSkip}
            className="text-muted-foreground"
          >
            Skip Verification
          </Button>
        )}
      </div>
      {/* Attempts Counter */}
      {attempts > 0 && (
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Attempts: {attempts} of {maxAttempts}
          </p>
          {attempts >= maxAttempts - 1 && (
            <p className="text-xs text-warning mt-1">
              ⚠️ Last attempt remaining
            </p>
          )}
        </div>
      )}
      {/* Security Notice */}
      <div className="mt-6 bg-muted/20 rounded-lg p-4 border border-border/50">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Security Notice</p>
            <p>
              Your verification code is encrypted and expires automatically. 
              Never share this code with anyone.
            </p>
          </div>
        </div>
      </div>
      {/* Matrix Animation Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="matrix-bg absolute top-1/4 left-1/4 w-6 h-6 bg-primary/5 rounded-full" />
        <div className="matrix-bg absolute top-1/3 right-1/4 w-4 h-4 bg-primary/3 rounded-full" style={{ animationDelay: '1.5s' }} />
        <div className="matrix-bg absolute bottom-1/4 left-1/3 w-8 h-8 bg-primary/4 rounded-full" style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  );
};

export default VerificationStatusDisplay;