import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const CompletionCelebration = ({ selectedCategory = 'green' }) => {
  const [showStars, setShowStars] = useState(true);
  const [animationPhase, setAnimationPhase] = useState('initial');

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationPhase('celebration'), 500);
    const timer2 = setTimeout(() => setAnimationPhase('complete'), 2000);
    const timer3 = setTimeout(() => setShowStars(false), 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const getCategoryConfig = () => {
    const configs = {
      gold: { color: 'text-category-gold', bg: 'bg-category-gold/10', border: 'border-category-gold/20' },
      red: { color: 'text-category-red', bg: 'bg-category-red/10', border: 'border-category-red/20' },
      blue: { color: 'text-category-blue', bg: 'bg-category-blue/10', border: 'border-category-blue/20' },
      pink: { color: 'text-category-pink', bg: 'bg-category-pink/10', border: 'border-category-pink/20' },
      green: { color: 'text-category-green', bg: 'bg-category-green/10', border: 'border-category-green/20' },
      silver: { color: 'text-category-silver', bg: 'bg-category-silver/10', border: 'border-category-silver/20' }
    };
    return configs?.[selectedCategory] || configs?.green;
  };

  const categoryConfig = getCategoryConfig();

  return (
    <div className="relative text-center py-8">
      {/* Shooting Stars Animation */}
      {showStars && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)]?.map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 ${categoryConfig?.color} rounded-full animate-pulse`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: '2s'
              }}
            >
              <div className={`absolute inset-0 ${categoryConfig?.color} rounded-full animate-ping`} />
            </div>
          ))}
        </div>
      )}
      {/* Success Icon with Animation */}
      <div className={`relative mx-auto mb-6 transition-all duration-1000 ${
        animationPhase === 'initial' ? 'scale-0 rotate-180' : 
        animationPhase === 'celebration' ? 'scale-125 rotate-0' : 'scale-100 rotate-0'
      }`}>
        <div className={`w-24 h-24 mx-auto rounded-full ${categoryConfig?.bg} ${categoryConfig?.border} border-2 flex items-center justify-center matrix-glow`}>
          <Icon 
            name="CheckCircle" 
            size={48} 
            className={`${categoryConfig?.color} ${animationPhase === 'celebration' ? 'animate-pulse' : ''}`}
          />
        </div>
        
        {/* Ripple Effect */}
        {animationPhase === 'celebration' && (
          <div className={`absolute inset-0 rounded-full ${categoryConfig?.border} border-2 animate-ping`} />
        )}
      </div>
      {/* Success Message */}
      <div className={`transition-all duration-1000 ${
        animationPhase === 'initial' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Signatur erfolgreich erfasst!
        </h1>
        <p className="text-lg text-muted-foreground mb-2">
          Ihre digitale Signatur wurde sicher gespeichert
        </p>
        <p className="text-sm text-muted-foreground">
          Alle Verifizierungsschritte wurden erfolgreich abgeschlossen
        </p>
      </div>
      {/* Category Badge */}
      <div className={`inline-flex items-center space-x-2 mt-4 px-4 py-2 rounded-full ${categoryConfig?.bg} ${categoryConfig?.border} border transition-all duration-500 ${
        animationPhase === 'complete' ? 'scale-100 opacity-100' : 'scale-95 opacity-80'
      }`}>
        <Icon name="Award" size={16} className={categoryConfig?.color} />
        <span className={`text-sm font-medium ${categoryConfig?.color}`}>
          {selectedCategory?.charAt(0)?.toUpperCase() + selectedCategory?.slice(1)} Kategorie
        </span>
      </div>
      {/* Matrix Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="matrix-bg absolute top-1/4 left-1/4 w-8 h-8 bg-primary/5 rounded-full" />
        <div className="matrix-bg absolute top-1/3 right-1/4 w-6 h-6 bg-primary/3 rounded-full" style={{ animationDelay: '1s' }} />
        <div className="matrix-bg absolute bottom-1/4 left-1/3 w-10 h-10 bg-primary/4 rounded-full" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

export default CompletionCelebration;