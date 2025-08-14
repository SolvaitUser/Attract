import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useLanguage } from '../../../contexts/LanguageContext';

const chartData = [
  { month: 'Jan', admin: 75, compliance: 82, training: 65, tech: 50, total: 70 },
  { month: 'Feb', admin: 80, compliance: 78, training: 72, tech: 60, total: 73 },
  { month: 'Mar', admin: 85, compliance: 80, training: 75, tech: 68, total: 77 },
  { month: 'Apr', admin: 88, compliance: 85, training: 74, tech: 70, total: 80 },
  { month: 'May', admin: 92, compliance: 87, training: 78, tech: 64, total: 82 },
  { month: 'Jun', admin: 90, compliance: 85, training: 76, tech: 69, total: 80 },
  { month: 'Jul', admin: 92, compliance: 89, training: 80, tech: 73, total: 85 },
];

export const OnboardingChart: React.FC = () => {
  const { t, direction } = useLanguage();
  
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          direction={direction}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }} 
            tickLine={false}
            axisLine={{ stroke: '#E0E0E0' }}
          />
          <YAxis 
            tickFormatter={(value) => `${value}%`}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#E0E0E0' }}
            domain={[0, 100]}
          />
          <Tooltip
            formatter={(value) => [`${value}%`, '']}
            labelFormatter={(label) => t('month') + ': ' + label}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              padding: '8px',
            }}
          />
          <Legend verticalAlign="top" height={36} />
          <Area 
            type="monotone" 
            dataKey="admin" 
            name={t('adminTasks')}
            stroke="#006FEE" 
            fill="#006FEE" 
            fillOpacity={0.1}
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="compliance" 
            name={t('complianceTasks')}
            stroke="#17C964" 
            fill="#17C964" 
            fillOpacity={0.1}
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="training" 
            name={t('trainingTasks')}
            stroke="#7828C8" 
            fill="#7828C8" 
            fillOpacity={0.1}
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="tech" 
            name={t('techSetupTasks')}
            stroke="#F5A524" 
            fill="#F5A524" 
            fillOpacity={0.1}
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="total" 
            name={t('totalCompletion')}
            stroke="#71717A" 
            fill="#71717A" 
            fillOpacity={0.1}
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};