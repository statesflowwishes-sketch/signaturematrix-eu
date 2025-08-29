import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const WorkflowProgress = () => {
  const location = useLocation();
  
  // Only show on signature workflow pages
  const workflowPaths = [
    '/signature-collection-canvas',
    '/email-verification', 
    '/sms-verification',
    '/signature-completion-dashboard'
  ];
  
  const isWorkflowPage = workflowPaths?.includes(location?.pathname);
  
  if (!isWorkflowPage) {
    return null;
  }

  const steps = [
    {
      id: 1,
      label: 'Sign Document',
      path: '/signature-collection-canvas',
      icon: 'PenTool',
      description: 'Create your digital signature'
    },
    {
      id: 2,
      label: 'Verify Email',
      path: '/email-verification',
      icon: 'Mail',
      description: 'Confirm your email address'
    },
    {
      id: 3,
      label: 'Verify Phone',
      path: '/sms-verification',
      icon: 'Smartphone',
      description: 'Verify via SMS code'
    },
    {
      id: 4,
      label: 'Complete',
      path: '/signature-completion-dashboard',
      icon: 'CheckCircle',
      description: 'Signature verified successfully'
    }
  ];

  const getCurrentStep = () => {
    const currentIndex = steps?.findIndex(step => step?.path === location?.pathname);
    return currentIndex !== -1 ? currentIndex + 1 : 1;
  };

  const currentStep = getCurrentStep();

  const getStepStatus = (stepNumber) => {
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'active';
    return 'pending';
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-100 bg-background/95 backdrop-matrix border-b border-border">
      <div className="max-w-4xl mx-auto px-6 py-4">
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="text-primary"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-semibold font-heading text-foreground">
                SignatureMatrix
              </h1>
              <p className="text-xs text-muted-foreground font-mono">
                Secure Digital Verification
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">
              Step {currentStep} of {steps?.length}
            </p>
            <p className="text-xs text-muted-foreground">
              {steps?.[currentStep - 1]?.description}
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-border">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${((currentStep - 1) / (steps?.length - 1)) * 100}%` }}
            />
          </div>

          {/* Step Indicators */}
          {steps?.map((step, index) => {
            const status = getStepStatus(step?.id);
            
            return (
              <div key={step?.id} className="flex flex-col items-center relative z-10">
                <div
                  className={`progress-step ${status} transition-all duration-300`}
                >
                  {status === 'completed' ? (
                    <Icon name="Check" size={16} className="text-success-foreground" />
                  ) : status === 'active' ? (
                    <Icon name={step?.icon} size={16} className="text-primary-foreground" />
                  ) : (
                    <Icon name={step?.icon} size={16} className="text-muted-foreground" />
                  )}
                </div>
                {/* Step Label - Hidden on mobile, shown on desktop */}
                <div className="mt-2 text-center hidden sm:block">
                  <p className={`text-xs font-medium transition-colors duration-200 ${
                    status === 'active' ?'text-primary' 
                      : status === 'completed' ?'text-success' :'text-muted-foreground'
                  }`}>
                    {step?.label}
                  </p>
                </div>
                {/* Mobile Step Label - Only show current step */}
                {status === 'active' && (
                  <div className="mt-2 text-center sm:hidden">
                    <p className="text-xs font-medium text-primary">
                      {step?.label}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Current Step Info - Mobile Only */}
        <div className="mt-4 sm:hidden">
          <div className="bg-surface/50 rounded-lg p-3 border border-border">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
                <Icon 
                  name={steps?.[currentStep - 1]?.icon} 
                  size={16} 
                  className="text-primary" 
                />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {steps?.[currentStep - 1]?.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {steps?.[currentStep - 1]?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Matrix Animation Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="matrix-bg absolute -top-4 -left-4 w-8 h-8 bg-primary/5 rounded-full" />
        <div className="matrix-bg absolute -top-2 right-1/4 w-6 h-6 bg-primary/3 rounded-full" style={{ animationDelay: '1s' }} />
        <div className="matrix-bg absolute -bottom-3 right-1/3 w-4 h-4 bg-primary/4 rounded-full" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

export default WorkflowProgress;