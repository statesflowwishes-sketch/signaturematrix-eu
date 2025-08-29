import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const DesktopAnalytics = ({ selectedCategory = 'green' }) => {
  // Mock analytics data
  const signaturesByCategory = [
    { name: 'Premium', value: 45, color: '#FFD700' },
    { name: 'Dringend', value: 32, color: '#FF4757' },
    { name: 'Standard', value: 78, color: '#4A90E2' },
    { name: 'Persönlich', value: 23, color: '#FF69B4' },
    { name: 'Verifiziert', value: 156, color: '#00FF88' },
    { name: 'Basis', value: 67, color: '#C0C0C0' }
  ];

  const dailySignatures = [
    { date: '20.08', signatures: 12, verifications: 11 },
    { date: '21.08', signatures: 19, verifications: 18 },
    { date: '22.08', signatures: 8, verifications: 8 },
    { date: '23.08', signatures: 27, verifications: 25 },
    { date: '24.08', signatures: 15, verifications: 14 },
    { date: '25.08', signatures: 22, verifications: 21 },
    { date: '26.08', signatures: 18, verifications: 17 },
    { date: '27.08', signatures: 31, verifications: 29 }
  ];

  const verificationStats = [
    { method: 'E-Mail', success: 98.5, failed: 1.5 },
    { method: 'SMS', success: 96.2, failed: 3.8 },
    { method: 'Signatur', success: 99.1, failed: 0.9 }
  ];

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
    <div className="hidden lg:block space-y-6">
      {/* Analytics Header */}
      <div className="bg-surface/80 backdrop-matrix rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="BarChart3" size={24} className="text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Signatur-Analytik
              </h2>
              <p className="text-sm text-muted-foreground">
                Detaillierte Statistiken und Trends
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm text-success font-medium">+23% diese Woche</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted/20 rounded-lg border border-border/50">
            <Icon name="FileSignature" size={20} className="text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">401</p>
            <p className="text-xs text-muted-foreground">Gesamt Signaturen</p>
          </div>
          <div className="text-center p-3 bg-muted/20 rounded-lg border border-border/50">
            <Icon name="CheckCircle" size={20} className="text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">98.2%</p>
            <p className="text-xs text-muted-foreground">Erfolgsrate</p>
          </div>
          <div className="text-center p-3 bg-muted/20 rounded-lg border border-border/50">
            <Icon name="Clock" size={20} className="text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">2:34</p>
            <p className="text-xs text-muted-foreground">Ø Bearbeitungszeit</p>
          </div>
          <div className="text-center p-3 bg-muted/20 rounded-lg border border-border/50">
            <Icon name="Users" size={20} className="text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">287</p>
            <p className="text-xs text-muted-foreground">Eindeutige Nutzer</p>
          </div>
        </div>
      </div>
      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-surface/80 backdrop-matrix rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Icon name="PieChart" size={20} className="text-primary" />
            <span>Kategorienverteilung</span>
          </h3>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={signaturesByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {signaturesByCategory?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    color: 'var(--color-foreground)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
            {signaturesByCategory?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item?.color }}
                />
                <span className="text-muted-foreground">{item?.name}: {item?.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Trend */}
        <div className="bg-surface/80 backdrop-matrix rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Icon name="TrendingUp" size={20} className="text-primary" />
            <span>Täglicher Trend</span>
          </h3>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailySignatures}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="date" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    color: 'var(--color-foreground)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="signatures" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  name="Signaturen"
                />
                <Line 
                  type="monotone" 
                  dataKey="verifications" 
                  stroke="var(--color-success)" 
                  strokeWidth={2}
                  name="Verifizierungen"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Verification Success Rates */}
      <div className="bg-surface/80 backdrop-matrix rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Shield" size={20} className="text-primary" />
          <span>Verifizierungs-Erfolgsraten</span>
        </h3>
        
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={verificationStats} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                type="number" 
                domain={[0, 100]}
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                type="category" 
                dataKey="method"
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-foreground)'
                }}
                formatter={(value) => [`${value}%`, 'Erfolgsrate']}
              />
              <Bar 
                dataKey="success" 
                fill="var(--color-success)" 
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Export Options */}
      <div className="bg-surface/80 backdrop-matrix rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Download" size={20} className="text-primary" />
          <span>Batch-Export Optionen</span>
        </h3>
        
        <div className="grid grid-cols-3 gap-4">
          <button className="flex flex-col items-center space-y-2 p-4 bg-muted/20 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
            <Icon name="FileSpreadsheet" size={24} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Excel Export</span>
            <span className="text-xs text-muted-foreground">Alle Signaturen</span>
          </button>
          
          <button className="flex flex-col items-center space-y-2 p-4 bg-muted/20 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
            <Icon name="FileText" size={24} className="text-primary" />
            <span className="text-sm font-medium text-foreground">PDF Report</span>
            <span className="text-xs text-muted-foreground">Zusammenfassung</span>
          </button>
          
          <button className="flex flex-col items-center space-y-2 p-4 bg-muted/20 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
            <Icon name="Archive" size={24} className="text-primary" />
            <span className="text-sm font-medium text-foreground">ZIP Archiv</span>
            <span className="text-xs text-muted-foreground">Alle Dateien</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesktopAnalytics;