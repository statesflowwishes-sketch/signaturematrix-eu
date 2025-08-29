import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DocumentEditor = ({ 
  selectedTemplate, 
  documentData, 
  onDocumentChange, 
  verifiedCredentials, 
  generationStatus,
  onGenerate,
  templates,
  previewMode,
  onTogglePreview
}) => {
  const [activeTab, setActiveTab] = useState('content');
  const currentTemplate = templates?.find(t => t?.id === selectedTemplate);

  const handleFieldChange = (field, value) => {
    onDocumentChange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const tabs = [
    { id: 'content', name: 'Inhalt', icon: 'FileText' },
    { id: 'signatures', name: 'Signaturen', icon: 'Signature' },
    { id: 'credentials', name: 'Credentials', icon: 'Shield' },
    { id: 'metadata', name: 'Metadaten', icon: 'Info' }
  ];

  return (
    <div className="space-y-6">
      {/* Editor Header */}
      <div className="bg-surface/30 backdrop-matrix rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon 
              name={currentTemplate?.icon} 
              size={24} 
              className={`text-${currentTemplate?.color}`} 
            />
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {currentTemplate?.name} Editor
              </h2>
              <p className="text-sm text-muted-foreground">
                Dokumenterstellung mit Live-Vorschau
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={previewMode ? "success" : "outline"}
              size="sm"
              iconName="Eye"
              iconPosition="left"
              onClick={onTogglePreview}
            >
              {previewMode ? 'Vorschau aktiv' : 'Live-Vorschau'}
            </Button>
            
            <Button
              variant="primary"
              size="sm"
              iconName="Download"
              iconPosition="left"
              onClick={onGenerate}
              loading={generationStatus === 'generating'}
            >
              {generationStatus === 'generating' ? 'Generiere...' : 'Erstellen'}
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-surface/20 rounded-lg p-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab?.id
                  ? 'bg-primary/20 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-surface/30'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Editor Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Editor Panel */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-surface/30 backdrop-matrix rounded-lg border border-border p-6">
            {/* Content Tab */}
            {activeTab === 'content' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Dokumenttitel
                  </label>
                  <Input
                    value={documentData?.title || ''}
                    onChange={(e) => handleFieldChange('title', e?.target?.value)}
                    placeholder={`${currentTemplate?.name} - ${new Date()?.toLocaleDateString('de-DE')}`}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Dokumentinhalt
                  </label>
                  <textarea
                    value={documentData?.content || ''}
                    onChange={(e) => handleFieldChange('content', e?.target?.value)}
                    placeholder="Hier können Sie den Hauptinhalt Ihres Dokuments eingeben..."
                    rows={8}
                    className="w-full p-3 bg-surface/40 border border-border rounded-lg text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Sprache
                    </label>
                    <select className="w-full p-2 bg-surface/40 border border-border rounded-lg text-foreground">
                      <option value="de">Deutsch</option>
                      <option value="en">English</option>
                      <option value="both">Zweisprachig</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Format
                    </label>
                    <select className="w-full p-2 bg-surface/40 border border-border rounded-lg text-foreground">
                      <option value="pdf-a">PDF/A</option>
                      <option value="pdf">Standard PDF</option>
                      <option value="docx">Word Document</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Signatures Tab */}
            {activeTab === 'signatures' && (
              <div className="space-y-4">
                <div className="text-center py-8">
                  <Icon name="Signature" size={48} className="text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Signatur-Integration
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Signaturen werden automatisch aus der aktuellen Sammlung integriert
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="bg-gold/10 border border-gold/20 rounded-lg p-3">
                      <Icon name="Award" size={20} className="text-gold mx-auto mb-1" />
                      <p className="text-xs font-medium text-foreground">Gold</p>
                      <p className="text-xs text-muted-foreground">127 Signaturen</p>
                    </div>
                    
                    <div className="bg-blue/10 border border-blue/20 rounded-lg p-3">
                      <Icon name="Star" size={20} className="text-blue mx-auto mb-1" />
                      <p className="text-xs font-medium text-foreground">Blue</p>
                      <p className="text-xs text-muted-foreground">89 Signaturen</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Credentials Tab */}
            {activeTab === 'credentials' && (
              <div className="space-y-4">
                {verifiedCredentials?.length > 0 ? (
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-4">
                      Verfügbare Credentials ({verifiedCredentials?.length})
                    </h3>
                    <div className="space-y-2">
                      {verifiedCredentials?.map((credential, index) => (
                        <div key={index} className="bg-success/10 border border-success/20 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Icon name="Shield" size={16} className="text-success" />
                              <span className="text-sm font-medium text-foreground">
                                {credential?.name}
                              </span>
                            </div>
                            <span className="text-xs text-success">Verifiziert</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Icon name="Shield" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      Keine Credentials verfügbar
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Besuchen Sie den EU Credential Hub um Credentials zu verifizieren
                    </p>
                    <Button
                      variant="primary"
                      size="sm"
                      iconName="Shield"
                      iconPosition="left"
                      onClick={() => window.location.href = '/eu-credential-verification-hub'}
                    >
                      Credential Hub besuchen
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Metadata Tab */}
            {activeTab === 'metadata' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Autor
                    </label>
                    <Input
                      value={documentData?.metadata?.author || ''}
                      onChange={(e) => handleFieldChange('metadata', { 
                        ...documentData?.metadata, 
                        author: e?.target?.value 
                      })}
                      placeholder="Dokumentautor"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Organisation
                    </label>
                    <Input
                      value={documentData?.metadata?.organization || ''}
                      onChange={(e) => handleFieldChange('metadata', { 
                        ...documentData?.metadata, 
                        organization: e?.target?.value 
                      })}
                      placeholder="Organisation"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Kategorie
                    </label>
                    <select 
                      value={documentData?.metadata?.category || ''}
                      onChange={(e) => handleFieldChange('metadata', { 
                        ...documentData?.metadata, 
                        category: e?.target?.value 
                      })}
                      className="w-full p-2 bg-surface/40 border border-border rounded-lg text-foreground"
                    >
                      <option value="">Kategorie auswählen</option>
                      <option value="petition">Petition</option>
                      <option value="certificate">Zertifikat</option>
                      <option value="report">Bericht</option>
                      <option value="legal">Rechtsdokument</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Klassifizierung
                    </label>
                    <select 
                      value={documentData?.metadata?.classification || 'public'}
                      onChange={(e) => handleFieldChange('metadata', { 
                        ...documentData?.metadata, 
                        classification: e?.target?.value 
                      })}
                      className="w-full p-2 bg-surface/40 border border-border rounded-lg text-foreground"
                    >
                      <option value="public">Öffentlich</option>
                      <option value="internal">Intern</option>
                      <option value="confidential">Vertraulich</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Beschreibung
                  </label>
                  <textarea
                    value={documentData?.metadata?.description || ''}
                    onChange={(e) => handleFieldChange('metadata', { 
                      ...documentData?.metadata, 
                      description: e?.target?.value 
                    })}
                    placeholder="Kurze Beschreibung des Dokuments"
                    rows={3}
                    className="w-full p-3 bg-surface/40 border border-border rounded-lg text-foreground placeholder-muted-foreground resize-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Live Preview */}
        {previewMode && (
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-surface/30 backdrop-matrix rounded-lg border border-border p-6 sticky top-36">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                <Icon name="Eye" size={20} className="text-primary" />
                <span>Live-Vorschau</span>
              </h3>
              
              <div className="bg-white rounded border border-border/50 p-4 min-h-[400px]">
                <div className="text-gray-800">
                  <h4 className="text-lg font-bold mb-2 border-b pb-2">
                    {documentData?.title || `${currentTemplate?.name} - Vorschau`}
                  </h4>
                  
                  <div className="text-sm space-y-2">
                    <p><strong>Template:</strong> {currentTemplate?.name}</p>
                    <p><strong>Erstellt:</strong> {new Date()?.toLocaleDateString('de-DE')}</p>
                    {verifiedCredentials?.length > 0 && (
                      <p><strong>Credentials:</strong> {verifiedCredentials?.length} integriert</p>
                    )}
                  </div>
                  
                  {documentData?.content && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="whitespace-pre-wrap text-sm">
                        {documentData?.content}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4 pt-4 border-t text-xs text-gray-500">
                    <p>Signiert durch: SignatureMatrix System</p>
                    <p>Zeitstempel: {new Date()?.toISOString()}</p>
                    <p>Format: PDF/A - Archivierungskonform</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Generation Status */}
      {generationStatus === 'generating' && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="Loader" size={20} className="text-warning animate-spin" />
            <div>
              <h4 className="text-sm font-medium text-foreground">Dokument wird generiert...</h4>
              <p className="text-xs text-muted-foreground">
                Signatur-Integration, Credential-Validierung und Formatierung werden verarbeitet
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentEditor;