import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

import Icon from '../../../components/AppIcon';

const UserInfoForm = ({ onFormSubmit, isProcessing = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    location: ''
  });

  const [errors, setErrors] = useState({});

  const locationOptions = [
    { value: 'berlin', label: 'Berlin' },
    { value: 'munich', label: 'München' },
    { value: 'hamburg', label: 'Hamburg' },
    { value: 'cologne', label: 'Köln' },
    { value: 'frankfurt', label: 'Frankfurt am Main' },
    { value: 'stuttgart', label: 'Stuttgart' },
    { value: 'dusseldorf', label: 'Düsseldorf' },
    { value: 'dortmund', label: 'Dortmund' },
    { value: 'essen', label: 'Essen' },
    { value: 'leipzig', label: 'Leipzig' },
    { value: 'bremen', label: 'Bremen' },
    { value: 'dresden', label: 'Dresden' },
    { value: 'hannover', label: 'Hannover' },
    { value: 'nuremberg', label: 'Nürnberg' },
    { value: 'duisburg', label: 'Duisburg' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Name ist erforderlich';
    } else if (formData?.name?.trim()?.length < 2) {
      newErrors.name = 'Name muss mindestens 2 Zeichen lang sein';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Telefonnummer ist erforderlich';
    } else if (!/^(\+49|0)[1-9][0-9]{8,11}$/?.test(formData?.phone?.replace(/\s/g, ''))) {
      newErrors.phone = 'Ungültige deutsche Telefonnummer';
    }

    if (!formData?.age) {
      newErrors.age = 'Alter ist erforderlich';
    } else if (parseInt(formData?.age) < 18 || parseInt(formData?.age) > 120) {
      newErrors.age = 'Alter muss zwischen 18 und 120 Jahren liegen';
    }

    if (!formData?.location) {
      newErrors.location = 'Standort ist erforderlich';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field) => (e) => {
    const value = e?.target?.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleLocationChange = (value) => {
    setFormData(prev => ({ ...prev, location: value }));
    if (errors?.location) {
      setErrors(prev => ({ ...prev, location: '' }));
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onFormSubmit?.(formData);
    }
  };

  const isFormValid = () => {
    return formData?.name?.trim() && 
           formData?.email?.trim() && 
           formData?.phone?.trim() && 
           formData?.age && 
           formData?.location &&
           Object.keys(errors)?.length === 0;
  };

  return (
    <div className="relative z-10 bg-surface/80 backdrop-matrix rounded-lg border border-border p-6 shadow-matrix">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
          <Icon name="UserCheck" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Persönliche Informationen
          </h2>
          <p className="text-sm text-muted-foreground">
            Erforderlich für die Signaturverifizierung
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Vollständiger Name"
            type="text"
            placeholder="Max Mustermann"
            value={formData?.name}
            onChange={handleInputChange('name')}
            error={errors?.name}
            required
            disabled={isProcessing}
            className="transition-all duration-200"
          />

          <Input
            label="Alter"
            type="number"
            placeholder="25"
            value={formData?.age}
            onChange={handleInputChange('age')}
            error={errors?.age}
            min="18"
            max="120"
            required
            disabled={isProcessing}
          />
        </div>

        <Input
          label="E-Mail-Adresse"
          type="email"
          placeholder="max.mustermann@email.de"
          value={formData?.email}
          onChange={handleInputChange('email')}
          error={errors?.email}
          description="Wird für die E-Mail-Verifizierung verwendet"
          required
          disabled={isProcessing}
        />

        <Input
          label="Telefonnummer"
          type="tel"
          placeholder="+49 123 456 7890"
          value={formData?.phone}
          onChange={handleInputChange('phone')}
          error={errors?.phone}
          description="Wird für die SMS-Verifizierung verwendet"
          required
          disabled={isProcessing}
        />

        <Select
          label="Standort"
          placeholder="Stadt auswählen"
          options={locationOptions}
          value={formData?.location}
          onChange={handleLocationChange}
          error={errors?.location}
          searchable
          required
          disabled={isProcessing}
        />

        {/* Form Status Indicator */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center space-x-2">
            <Icon 
              name={isFormValid() ? "CheckCircle" : "AlertCircle"} 
              size={16} 
              className={isFormValid() ? "text-success" : "text-warning"} 
            />
            <span className={`text-sm ${isFormValid() ? "text-success" : "text-warning"}`}>
              {isFormValid() ? "Formular vollständig" : "Felder ausfüllen"}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5]?.map((step) => {
              const fieldsCompleted = [
                formData?.name?.trim(),
                formData?.email?.trim(),
                formData?.phone?.trim(),
                formData?.age,
                formData?.location
              ]?.filter(Boolean)?.length;
              
              return (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    step <= fieldsCompleted ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-muted/20 rounded-lg p-3 border border-border/50 mt-4">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Datenschutz & Sicherheit</p>
              <p>
                Ihre Daten werden verschlüsselt übertragen und gemäß DSGVO verarbeitet. 
                Die Verifizierung erfolgt über sichere Kanäle.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserInfoForm;