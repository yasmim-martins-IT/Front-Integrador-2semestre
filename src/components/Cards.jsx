import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styles from './Cards.module.css';

const blue = '#3A9EDD';
const blue_strong = '#428CE2' ; 
const black = '#000';

export function ChartCard({ title, type = 'line' }) {
  const sampleData = [
    { name: 'Jan', value: 30 },
    { name: 'Feb', value: 20 },
    { name: 'Mar', value: 40 },
    { name: 'Apr', value: 35 },
    { name: 'May', value: 50 },
    { name: 'Jun', value: 45 },
  ];

  const pieData = [
    { name: 'A', value: 40 },
    { name: 'B', value: 30 },
    { name: 'C', value: 20 },
    { name: 'D', value: 10 },
  ];

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={sampleData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke={blue_strong} />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart data={sampleData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill={blue} />
          </BarChart>
        );
      case 'area':
        return (
          <AreaChart data={sampleData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke={black} fill={blue} />
          </AreaChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Tooltip />
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill={blue}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index % 2 === 0 ? blue : blue_strong}
                />
              ))}
            </Pie>
          </PieChart>
        );
      default:
        return <p>Tipo de gráfico inválido</p>;
    }
  };

  return (
    <div className={styles.chart_card}>
      <h3 className={styles.chart_title}>{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}
