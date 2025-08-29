import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkflowProgress from '../../components/ui/WorkflowProgress';
import PhoneNumberDisplay from './components/PhoneNumberDisplay';
import CodeInputField from './components/CodeInputField';
import CountdownTimer from './components/CountdownTimer';
import VerificationActions from './components/VerificationActions';
import AnimatedBackground from './components/AnimatedBackground';

const SmsVerification = () => {
  const navigate = useNavigate();
  
  // Mock data
  const [phoneNumber, setPhoneNumber] = useState('+49 176 12345678');
  const [verificationCode, setVerificationCode] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isCodeExpired, setIsCodeExpired] = useState(false);

  const maxAttempts = 3;
  const correctCode = '123456'; // Mock verification code

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handlePhoneEdit = () => {
    setIsEditing(true);
  };

  const handlePhoneSave = (newNumber) => {
    setPhoneNumber(newNumber);
    setIsEditing(false);
    // Reset verification state when phone number changes
    setVerificationCode('');
    setError('');
    setAttempts(0);
    setIsCodeExpired(false);
  };

  const handlePhoneCancel = () => {
    setIsEditing(false);
  };

  const handleCodeChange = (code) => {
    setVerificationCode(code);
    setError('');
  };

  const handleCodeComplete = (code) => {
    // Auto-verify when 6 digits are entered
    if (code?.length === 6 && !isVerifying) {
      handleVerify();
    }
  };

  const handleVerify = async () => {
    if (verificationCode?.length !== 6) {
      setError('Bitte geben Sie den vollständigen 6-stelligen Code ein');
      return;
    }

    if (isCodeExpired) {
      setError('Der Code ist abgelaufen. Bitte fordern Sie einen neuen an.');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (verificationCode === correctCode) {
        // Success - navigate to completion
        navigate('/signature-completion-dashboard');
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        
        if (newAttempts >= maxAttempts) {
          setError('Maximale Anzahl von Versuchen erreicht. Bitte fordern Sie einen neuen Code an.');
          setVerificationCode('');
        } else {
          setError(`Ungültiger Code. ${maxAttempts - newAttempts} Versuche verbleibend.`);
          setVerificationCode('');
        }
      }
    } catch (err) {
      setError('Fehler bei der Verifizierung. Bitte versuchen Sie es erneut.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError('');
    setVerificationCode('');
    setAttempts(0);
    setIsCodeExpired(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Set cooldown period
      setResendCooldown(60);
      
      console.log('SMS resent to:', phoneNumber);
    } catch (err) {
      setError('Fehler beim Senden der SMS. Bitte versuchen Sie es erneut.');
    } finally {
      setIsResending(false);
    }
  };

  const handleSkip = () => {
    // Navigate to completion with warning
    navigate('/signature-completion-dashboard', { 
      state: { skippedSmsVerification: true } 
    });
  };

  const handleTimerExpire = () => {
    setIsCodeExpired(true);
    setError('Der Bestätigungscode ist abgelaufen. Bitte fordern Sie einen neuen an.');
  };

  const canVerify = verificationCode?.length === 6 && !isCodeExpired && attempts < maxAttempts;
  const canResend = !isResending && resendCooldown === 0;

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Workflow Progress */}
      <WorkflowProgress />
      
      {/* Main Content */}
      <div className="relative z-10 pt-32 pb-16 px-6">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-heading text-foreground mb-2">
              SMS-Verifizierung
            </h1>
            <p className="text-muted-foreground">
              Schritt 3 von 3 - Bestätigen Sie Ihre Telefonnummer
            </p>
          </div>

          {/* Phone Number Display */}
          <PhoneNumberDisplay
            phoneNumber={phoneNumber}
            onEdit={handlePhoneEdit}
            isEditing={isEditing}
            onSave={handlePhoneSave}
            onCancel={handlePhoneCancel}
          />

          {/* Countdown Timer */}
          {!isCodeExpired && (
            <div className="mb-6">
              <CountdownTimer
                initialTime={600} // 10 minutes
                onExpire={handleTimerExpire}
                isActive={!isEditing}
              />
            </div>
          )}

          {/* Code Input */}
          <div className="mb-6">
            <CodeInputField
              value={verificationCode}
              onChange={handleCodeChange}
              onComplete={handleCodeComplete}
              error={error}
              disabled={isVerifying || isCodeExpired || attempts >= maxAttempts}
            />
          </div>

          {/* Verification Actions */}
          <VerificationActions
            onVerify={handleVerify}
            onResend={handleResend}
            onSkip={handleSkip}
            canVerify={canVerify}
            canResend={canResend}
            isVerifying={isVerifying}
            isResending={isResending}
            resendCooldown={resendCooldown}
            attempts={attempts}
            maxAttempts={maxAttempts}
          />

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              Probleme beim Empfang der SMS?{' '}
              <button className="text-primary hover:underline">
                Kontaktieren Sie den Support
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Matrix Animation Overlay */}
      <div className="fixed inset-0 pointer-events-none z-5">
        <div className="matrix-bg absolute top-1/4 left-1/4 w-8 h-8 bg-primary/5 rounded-full" />
        <div className="matrix-bg absolute top-1/3 right-1/4 w-6 h-6 bg-primary/3 rounded-full" style={{ animationDelay: '1s' }} />
        <div className="matrix-bg absolute bottom-1/4 left-1/3 w-4 h-4 bg-primary/4 rounded-full" style={{ animationDelay: '2s' }} />
        <div className="matrix-bg absolute top-1/2 right-1/3 w-5 h-5 bg-primary/6 rounded-full" style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  );
};

export default SmsVerification;