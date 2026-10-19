import React from 'react';

export default function KpiCard({ title, value, subtitle, icon: Icon, badgeText, badgeType = 'neutral' }) {
  return (
    <div className="kpi-card">
      <div className="kpi-header">
        <span className="kpi-title">{title}</span>
        {Icon && (
          <div className="kpi-icon-wrapper">
            <Icon size={20} strokeWidth={2.2} />
          </div>
        )}
      </div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-subtitle">
        {badgeText && (
          <span className={`badge ${badgeType === 'success' ? 'badge-success' : 'badge-rank'}`}>
            {badgeText}
          </span>
        )}
        <span>{subtitle}</span>
      </div>
    </div>
  );
}
