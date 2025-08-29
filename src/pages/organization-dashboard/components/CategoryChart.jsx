import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const CategoryChart = ({ data }) => {
  const chartData = [
    { name: 'Premium', value: 245, color: '#FFD700', icon: 'Crown' },
    { name: 'Dringend', value: 189, color: '#FF4757', icon: 'AlertTriangle' },
    { name: 'Standard', value: 567, color: '#4A90E2', icon: 'FileText' },
    { name: 'Persönlich', value: 123, color: '#FF69B4', icon: 'Heart' },
    { name: 'Verifiziert', value: 892, color: '#00FF88', icon: 'Shield' },
    { name: 'Basis', value: 334, color: '#C0C0C0', icon: 'File' }
  ];

  const total = chartData?.reduce((sum, item) => sum + item?.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-matrix">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name={data?.icon} size={16} style={{ color: data?.color }} />
            <span className="font-medium text-foreground">{data?.name}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            <div>Anzahl: {data?.value?.toLocaleString('de-DE')}</div>
            <div>Anteil: {((data?.value / total) * 100)?.toFixed(1)}%</div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="grid grid-cols-2 gap-2 mt-4">
        {payload?.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry?.color }}
            />
            <span className="text-foreground">{entry?.value}</span>
            <span className="text-muted-foreground text-xs">
              ({chartData?.find(item => item?.name === entry?.value)?.value || 0})
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-surface/80 backdrop-matrix rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="PieChart" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Kategorie-Verteilung</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">
            {total?.toLocaleString('de-DE')}
          </div>
          <div className="text-xs text-muted-foreground">Gesamte Unterschriften</div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Category Details */}
      <div className="mt-6 space-y-3">
        <h4 className="text-sm font-medium text-foreground mb-3">Detaillierte Aufschlüsselung</h4>
        {chartData?.map((category, index) => {
          const percentage = ((category?.value / total) * 100)?.toFixed(1);
          return (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30"
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category?.color }}
                />
                <div className="flex items-center space-x-2">
                  <Icon name={category?.icon} size={16} />
                  <span className="text-sm font-medium text-foreground">
                    {category?.name}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-foreground">
                  {category?.value?.toLocaleString('de-DE')}
                </div>
                <div className="text-xs text-muted-foreground">
                  {percentage}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Chart Actions */}
      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Letzte Aktualisierung: {new Date()?.toLocaleString('de-DE')}
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-xs text-primary hover:text-primary/80 transition-colors">
              Diagramm exportieren
            </button>
            <span className="text-muted-foreground">•</span>
            <button className="text-xs text-primary hover:text-primary/80 transition-colors">
              Vollbild anzeigen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryChart;