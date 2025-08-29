import React, { useRef, useEffect, useState, useCallback } from 'react';
import Icon from '../../../components/AppIcon';

const SignatureCanvas = ({ 
  onSignatureChange, 
  selectedCategory = 'green',
  isProcessing = false,
  onClear,
  onComplete 
}) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [strokeHistory, setStrokeHistory] = useState([]);
  const [currentStroke, setCurrentStroke] = useState([]);

  const categoryColors = {
    gold: '#FFD700',
    red: '#FF4757',
    blue: '#4A90E2',
    pink: '#FF69B4',
    green: '#00FF88',
    silver: '#C0C0C0'
  };

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const rect = canvas?.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = rect?.width * dpr;
    canvas.height = rect?.height * dpr;
    
    const ctx = canvas?.getContext('2d');
    ctx?.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = categoryColors?.[selectedCategory];
    ctx.lineWidth = 3;
    
    // Clear canvas with transparent background
    ctx?.clearRect(0, 0, canvas?.width, canvas?.height);
    
    // Redraw all strokes
    strokeHistory?.forEach(stroke => {
      if (stroke?.length > 1) {
        ctx.strokeStyle = stroke?.color || categoryColors?.[selectedCategory];
        ctx.lineWidth = stroke?.width || 3;
        ctx?.beginPath();
        ctx?.moveTo(stroke?.[0]?.x, stroke?.[0]?.y);
        stroke?.forEach(point => {
          ctx?.lineTo(point?.x, point?.y);
        });
        ctx?.stroke();
      }
    });
  }, [selectedCategory, strokeHistory, categoryColors]);

  useEffect(() => {
    setupCanvas();
  }, [setupCanvas]);

  useEffect(() => {
    const handleResize = () => {
      setTimeout(setupCanvas, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setupCanvas]);

  const getEventPos = (e) => {
    const canvas = canvasRef?.current;
    const rect = canvas?.getBoundingClientRect();
    
    const clientX = e?.clientX || (e?.touches && e?.touches?.[0]?.clientX);
    const clientY = e?.clientY || (e?.touches && e?.touches?.[0]?.clientY);
    
    return {
      x: clientX - rect?.left,
      y: clientY - rect?.top
    };
  };

  const startDrawing = (e) => {
    if (isProcessing) return;
    
    e?.preventDefault();
    setIsDrawing(true);
    
    const pos = getEventPos(e);
    const newStroke = [{ ...pos, color: categoryColors?.[selectedCategory], width: 3 }];
    setCurrentStroke(newStroke);
    
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext('2d');
    ctx.strokeStyle = categoryColors?.[selectedCategory];
    ctx.lineWidth = 3;
    ctx?.beginPath();
    ctx?.moveTo(pos?.x, pos?.y);
  };

  const draw = (e) => {
    if (!isDrawing || isProcessing) return;
    
    e?.preventDefault();
    const pos = getEventPos(e);
    
    setCurrentStroke(prev => [...prev, pos]);
    
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext('2d');
    ctx?.lineTo(pos?.x, pos?.y);
    ctx?.stroke();
  };

  const stopDrawing = (e) => {
    if (!isDrawing) return;
    
    e?.preventDefault();
    setIsDrawing(false);
    
    if (currentStroke?.length > 1) {
      const strokeWithMetadata = {
        ...currentStroke,
        color: categoryColors?.[selectedCategory],
        width: 3,
        category: selectedCategory,
        timestamp: new Date()?.toISOString()
      };
      
      setStrokeHistory(prev => [...prev, strokeWithMetadata]);
      setHasSignature(true);
      onSignatureChange?.(true);
    }
    
    setCurrentStroke([]);
  };

  const clearCanvas = () => {
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext('2d');
    ctx?.clearRect(0, 0, canvas?.width, canvas?.height);
    
    setStrokeHistory([]);
    setCurrentStroke([]);
    setHasSignature(false);
    setIsDrawing(false);
    onSignatureChange?.(false);
    onClear?.();
  };

  const exportSignature = () => {
    const canvas = canvasRef?.current;
    return {
      dataURL: canvas?.toDataURL('image/png'),
      strokes: strokeHistory,
      category: selectedCategory,
      timestamp: new Date()?.toISOString(),
      dimensions: {
        width: canvas?.width,
        height: canvas?.height
      }
    };
  };

  const handleComplete = () => {
    if (hasSignature && !isProcessing) {
      const signatureData = exportSignature();
      onComplete?.(signatureData);
    }
  };

  return (
    <div className="relative z-10 bg-surface/80 backdrop-matrix rounded-lg border border-border p-6 shadow-matrix">
      {/* Canvas Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
            <Icon name="PenTool" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Digitale Signatur
            </h2>
            <p className="text-sm text-muted-foreground">
              Zeichnen Sie Ihre Signatur in das Feld
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${hasSignature ? 'bg-success' : 'bg-muted'} transition-colors duration-200`} />
          <span className={`text-sm ${hasSignature ? 'text-success' : 'text-muted-foreground'}`}>
            {hasSignature ? 'Signatur erfasst' : 'Bereit zum Zeichnen'}
          </span>
        </div>
      </div>
      {/* Canvas Container */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          className={`signature-canvas w-full transition-all duration-300 ${
            isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-crosshair'
          }`}
          style={{ 
            height: 'clamp(200px, 50vh, 400px)',
            touchAction: 'none'
          }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          disabled={isProcessing}
        />
        
        {/* Canvas Overlay Instructions */}
        {!hasSignature && !isDrawing && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <Icon name="Edit3" size={32} className="text-muted-foreground/50 mx-auto mb-2" />
              <p className="text-muted-foreground/70 text-sm">
                Hier unterschreiben
              </p>
            </div>
          </div>
        )}

        {/* Processing Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-foreground">Verarbeitung...</span>
            </div>
          </div>
        )}
      </div>
      {/* Canvas Controls */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center space-x-2">
          <button
            onClick={clearCanvas}
            disabled={!hasSignature || isProcessing}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
              hasSignature && !isProcessing
                ? 'bg-error/10 text-error hover:bg-error/20 border border-error/20' :'bg-muted/50 text-muted-foreground cursor-not-allowed'
            }`}
          >
            <Icon name="Trash2" size={16} />
            <span>Löschen</span>
          </button>
        </div>

        <div className="flex items-center space-x-3">
          {/* Category Indicator */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Kategorie:</span>
            <div 
              className="w-4 h-4 rounded-full border-2 border-white/20"
              style={{ backgroundColor: categoryColors?.[selectedCategory] }}
            />
          </div>

          {/* Signature Quality */}
          {hasSignature && (
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-xs text-success">Qualität: Gut</span>
            </div>
          )}
        </div>
      </div>
      {/* Security Notice */}
      <div className="bg-muted/20 rounded-lg p-3 border border-border/50 mt-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Sicherheitshinweis</p>
            <p>
              Ihre Signatur wird verschlüsselt gespeichert und kann nur mit Ihrer 
              Verifizierung verwendet werden. Zeichnen Sie natürlich und deutlich.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureCanvas;