import { useState } from 'react'
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, BarChart3, CalendarDays,
  Check, ChevronDown, CircleDollarSign, Download, Lightbulb, Menu, Package,
  ShoppingBag, Sparkles, Truck, Users, X,
} from 'lucide-react'
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ComposedChart, Line,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import './App.css'

const monthlySales = [
  { month: 'Jan', sales: 12.8 }, { month: 'Feb', sales: 11.7 }, { month: 'Mar', sales: 14.4 },
  { month: 'Apr', sales: 12.1 }, { month: 'May', sales: 13.3 }, { month: 'Jun', sales: 12.1 },
  { month: 'Jul', sales: 12.6 }, { month: 'Aug', sales: 13.6 }, { month: 'Sep', sales: 13.8 },
  { month: 'Oct', sales: 13.3 }, { month: 'Nov', sales: 12.7 }, { month: 'Dec', sales: 11.9 },
]
const citySales = [
  { name: 'Christchurch', sales: 11.5 }, { name: 'Hamilton', sales: 11.5 },
  { name: 'Whakatane', sales: 11.2 }, { name: 'Manukau', sales: 9.8 },
  { name: 'Napier', sales: 7.7 }, { name: 'Auckland', sales: 7.5 }, { name: 'Palmerston N.', sales: 7.0 },
]
const channels = [
  { name: 'Wholesale', sales: 82.4, orders: 4250, margin: 37.04, color: '#138b78' },
  { name: 'Distributor', sales: 45.1, orders: 2500, margin: 37.63, color: '#e7834c' },
  { name: 'Export', sales: 27.07, orders: 1250, margin: 38.12, color: '#e5b94f' },
]
const products = [
  { name: 'Product 1', sales: 25.7, profit: 9.6 }, { name: 'Product 7', sales: 25.5, profit: 9.5 },
  { name: 'Product 2', sales: 22.8, profit: 8.7 }, { name: 'Product 4', sales: 17.6, profit: 6.4 },
  { name: 'Product 5', sales: 14.9, profit: 5.3 }, { name: 'Product 3', sales: 12.2, profit: 4.4 },
  { name: 'Product 6', sales: 10.8, profit: 3.9 },
]
const customers = [
  { name: 'Medline', sales: 4.1 }, { name: 'Pure Group', sales: 3.8 }, { name: 'OUR Ltd', sales: 3.7 },
  { name: 'Southern Health', sales: 3.2 }, { name: 'Northstar Co.', sales: 2.9 }, { name: 'Wellness Direct', sales: 2.4 },
]
const warehouses = [
  { name: 'AXW291', days: 10.44, orders: 3820 }, { name: 'NXH382', days: 10.32, orders: 1870 },
  { name: 'GUT930', days: 10.18, orders: 1580 }, { name: 'FLR025', days: 9.92, orders: 730 },
]
const shipping = [
  { days: '0–4', orders: 820 }, { days: '5–9', orders: 2580 },
  { days: '10–14', orders: 2570 }, { days: '15–19', orders: 1910 },
]
const pages = [
  { id: 'overview', label: 'Executive overview', icon: BarChart3 },
  { id: 'drivers', label: 'Sales drivers', icon: CircleDollarSign },
  { id: 'operations', label: 'Operations & insights', icon: Truck },
  { id: 'recommendations', label: 'Insights & recommendations', icon: Lightbulb },
]
const pageCopy = {
  overview: ['PERFORMANCE SNAPSHOT', 'Sales at a glance', 'A clear view of growth, profitability and customer demand.'],
  drivers: ['REVENUE INTELLIGENCE', 'What drives our business', 'Explore the products, customers and channels behind performance.'],
  operations: ['FULFILMENT HEALTH', 'Operations & insights', 'Understand shipping performance and warehouse efficiency.'],
  recommendations: ['NEXT BEST ACTIONS', 'Insights & recommendations', 'Turn performance signals into focused, practical next steps.'],
}
const kpis = [
  { label: 'Total sales', value: '$154.57M', change: '+12.8%', icon: CircleDollarSign, tone: 'green' },
  { label: 'Profit margin', value: '37.39%', change: '+2.4 pts', icon: Activity, tone: 'amber' },
  { label: 'Total orders', value: '8,000', change: '+8.6%', icon: ShoppingBag, tone: 'coral' },
  { label: 'Avg. shipping', value: '10.44 days', change: '−0.8 days', icon: Truck, tone: 'blue' },
  { label: 'Total profit', value: '$57.79M', change: '+15.2%', icon: CircleDollarSign, tone: 'violet' },
]
const tooltipStyle = { background: '#fff', border: '1px solid #e8e9e5', borderRadius: 8, boxShadow: '0 8px 24px rgba(29,43,38,.1)', fontSize: 12 }
const axisProps = { tickLine: false, axisLine: false, tick: { fill: '#8b928d', fontSize: 11 } }

function KpiCard({ label, value, change, icon: Icon, tone }) {
  const favorable = change.startsWith('−')
  return <article className="kpi-card">
    <div className={`kpi-icon ${tone}`}><Icon size={18} strokeWidth={1.8} /></div>
    <div className="kpi-copy"><span className="kpi-label">{label}</span><strong>{value}</strong>
      <span className="kpi-change">{favorable ? <ArrowDownRight size={13} /> : <ArrowUpRight size={13} />}{change}<span>vs last year</span></span>
    </div>
  </article>
}

function Panel({ title, detail, action, children }) {
  return <section className="panel chart-panel"><div className="panel-heading"><div><h2>{title}</h2><p>{detail}</p></div><span className="panel-action">{action}</span></div><div className="chart-wrap">{children}</div></section>
}

function TrendChart({ period }) {
  return <ResponsiveContainer width="100%" height="100%"><AreaChart data={monthlySales.slice(-period)} margin={{ top: 14, right: 12, left: -18, bottom: 0 }}>
    <defs><linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#138b78" stopOpacity={0.2} /><stop offset="100%" stopColor="#138b78" stopOpacity={0} /></linearGradient></defs>
    <CartesianGrid vertical={false} stroke="#edf0ec" strokeDasharray="3 4" /><XAxis dataKey="month" {...axisProps} tickMargin={10} /><YAxis {...axisProps} tickFormatter={(v) => `$${v}M`} />
    <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`$${v}M`, 'Sales']} /><Area type="monotone" dataKey="sales" stroke="#138b78" strokeWidth={2.5} fill="url(#salesFill)" activeDot={{ r: 5, fill: '#138b78', stroke: '#fff', strokeWidth: 2 }} />
  </AreaChart></ResponsiveContainer>
}

function ChannelDonut({ metric = 'sales' }) {
  return <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={channels} dataKey={metric} nameKey="name" innerRadius="57%" outerRadius="78%" paddingAngle={3} stroke="none">
    {channels.map((item) => <Cell key={item.name} fill={item.color} />)}
  </Pie><Tooltip contentStyle={tooltipStyle} formatter={(v, name) => [metric === 'sales' ? `$${v}M` : v.toLocaleString(), name]} /></PieChart></ResponsiveContainer>
}

function HorizontalBar({ data, dataKey = 'sales', color = '#138b78', width = 90, formatter }) {
  return <ResponsiveContainer width="100%" height="100%"><BarChart data={data} layout="vertical" margin={{ top: 2, right: 26, left: 14, bottom: 0 }}>
    <CartesianGrid horizontal={false} stroke="#edf0ec" /><XAxis type="number" {...axisProps} tickFormatter={formatter || ((v) => `$${v}M`)} /><YAxis type="category" dataKey="name" {...axisProps} width={width} />
    <Tooltip contentStyle={tooltipStyle} formatter={(v) => [formatter ? formatter(v) : `$${v}M`, dataKey === 'profit' ? 'Profit' : 'Sales']} /><Bar dataKey={dataKey} fill={color} radius={[0, 4, 4, 0]} barSize={16} />
  </BarChart></ResponsiveContainer>
}

function DonutPanel({ orders = false }) {
  return <Panel title={orders ? 'Orders by channel' : 'Sales by channel'} detail={orders ? 'Wholesale accounts for the largest share' : 'Wholesale leads overall revenue'} action={orders ? 'Order share' : 'Share of sales'}>
    <div className="donut-layout"><div className="donut-chart"><ChannelDonut metric={orders ? 'orders' : 'sales'} /></div>
      <div className="donut-center"><span>{orders ? 'Total orders' : 'Total sales'}</span><strong>{orders ? '8,000' : '$154.6M'}</strong></div>
      <div className="donut-legend">{channels.map((channel) => <div className="legend-row" key={channel.name}><i style={{ background: channel.color }} /><span>{channel.name}</span><strong>{Math.round(channel[orders ? 'orders' : 'sales'] / (orders ? 8000 : 154.57) * 100)}%</strong></div>)}</div>
    </div>
  </Panel>
}

function Overview({ period }) {
  return <><div className="kpi-grid five">{kpis.map((item) => <KpiCard key={item.label} {...item} />)}</div>
    <div className="chart-grid overview-grid">
      <Panel title="Monthly sales trend" detail="Revenue performance across the year" action="NZD · millions"><TrendChart period={period} /></Panel>
      <Panel title="Sales by city" detail="Top 7 markets by sales" action="NZD · millions"><HorizontalBar data={citySales} color="#e7834c" width={108} /></Panel>
      <DonutPanel />
      <Panel title="Top products by sales" detail="Best-selling products in the portfolio" action="NZD · millions"><HorizontalBar data={products.slice(0, 5)} /></Panel>
    </div>
  </>
}

function Drivers() {
  return <><div className="kpi-grid four">{[kpis[0], kpis[4], kpis[1], kpis[2]].map((item) => <KpiCard key={item.label} {...item} />)}</div>
    <div className="chart-grid drivers-grid">
      <Panel title="Profit by product" detail="Profit contribution from leading products" action="NZD · millions"><HorizontalBar data={products.slice(0, 5)} dataKey="profit" /></Panel>
      <Panel title="Sales by customer" detail="Largest customer accounts" action="NZD · millions"><HorizontalBar data={customers} color="#e7834c" width={112} /></Panel>
      <Panel title="Sales and profit by product" detail="Compare revenue scale with profit contribution" action="NZD · millions">
        <ResponsiveContainer width="100%" height="100%"><ComposedChart data={products} margin={{ top: 12, right: 10, left: -18, bottom: 0 }}><CartesianGrid vertical={false} stroke="#edf0ec" />
          <XAxis dataKey="name" {...axisProps} interval={0} angle={-24} textAnchor="end" height={54} /><YAxis {...axisProps} tickFormatter={(v) => `$${v}M`} />
          <Tooltip contentStyle={tooltipStyle} formatter={(v, name) => [`$${v}M`, name === 'sales' ? 'Sales' : 'Profit']} /><Bar dataKey="sales" fill="#dcebe6" radius={[4, 4, 0, 0]} barSize={21} /><Line dataKey="profit" stroke="#e7834c" strokeWidth={2.5} dot={{ r: 3, fill: '#e7834c' }} />
        </ComposedChart></ResponsiveContainer><div className="chart-legend"><span><i className="legend-sales" />Sales</span><span><i className="legend-profit" />Profit</span></div>
      </Panel>
      <Panel title="Profit margin by channel" detail="Margins remain consistent across channels" action="Percent">
        <ResponsiveContainer width="100%" height="100%"><BarChart data={channels} margin={{ top: 18, right: 10, left: -18, bottom: 0 }}><CartesianGrid vertical={false} stroke="#edf0ec" />
          <XAxis dataKey="name" {...axisProps} /><YAxis domain={[0, 45]} {...axisProps} tickFormatter={(v) => `${v}%`} /><Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, 'Profit margin']} />
          <Bar dataKey="margin" radius={[4, 4, 0, 0]} barSize={42}>{channels.map((item) => <Cell key={item.name} fill={item.color} />)}</Bar>
        </BarChart></ResponsiveContainer>
      </Panel>
    </div>
  </>
}

function Operations() {
  const operationKpis = [{ ...kpis[3], label: 'Avg. shipping days' }, kpis[2], kpis[0], kpis[4]]
  return <><div className="kpi-grid four">{operationKpis.map((item) => <KpiCard key={item.label} {...item} />)}</div>
    <div className="chart-grid operations-grid">
      <Panel title="Average shipping by warehouse" detail="Delivery time by fulfilment centre" action="Days"><HorizontalBar data={warehouses} dataKey="days" width={70} formatter={(v) => `${v} days`} /></Panel>
      <Panel title="Orders by warehouse" detail="Order volume across fulfilment centres" action="Orders">
        <ResponsiveContainer width="100%" height="100%"><BarChart data={warehouses} margin={{ top: 12, right: 10, left: -12, bottom: 0 }}><CartesianGrid vertical={false} stroke="#edf0ec" /><XAxis dataKey="name" {...axisProps} />
          <YAxis {...axisProps} tickFormatter={(v) => `${v / 1000}k`} /><Tooltip contentStyle={tooltipStyle} formatter={(v) => [v.toLocaleString(), 'Orders']} /><Bar dataKey="orders" fill="#138b78" radius={[4, 4, 0, 0]} barSize={38} />
        </BarChart></ResponsiveContainer>
      </Panel>
      <Panel title="Shipping days distribution" detail="Most orders arrive within 5–14 days" action="Orders">
        <ResponsiveContainer width="100%" height="100%"><BarChart data={shipping} margin={{ top: 12, right: 10, left: -10, bottom: 0 }}><CartesianGrid vertical={false} stroke="#edf0ec" /><XAxis dataKey="days" {...axisProps} />
          <YAxis {...axisProps} tickFormatter={(v) => `${v / 1000}k`} /><Tooltip contentStyle={tooltipStyle} formatter={(v) => [v.toLocaleString(), 'Orders']} /><Bar dataKey="orders" fill="#e5b94f" radius={[4, 4, 0, 0]} barSize={42} />
        </BarChart></ResponsiveContainer>
      </Panel>
      <DonutPanel orders />
    </div>
  </>
}

const recommendations = [
  { number: '01', title: 'Protect the wholesale growth engine', type: 'GROWTH OPPORTUNITY', color: 'green', icon: Users, description: 'Wholesale contributes 53% of sales and remains the largest channel. Prioritize retention plans for top accounts while testing targeted bundles for high-potential customers.', impact: '+$4.2M', impactLabel: 'potential revenue', action: 'Build account plans' },
  { number: '02', title: 'Scale the products with the strongest returns', type: 'PROFIT DRIVER', color: 'amber', icon: Package, description: 'Products 1 and 7 lead the portfolio in both revenue and profit. Review inventory cover and merchandising placement before expanding promotional support.', impact: '33%', impactLabel: 'of total profit', action: 'Review product mix' },
  { number: '03', title: 'Reduce delivery-time variation', type: 'OPERATIONAL FOCUS', color: 'coral', icon: Truck, description: 'Average shipping is 10.44 days, with AXW291 taking the longest. Compare carrier hand-offs and pick-pack cut-offs across warehouses to pinpoint avoidable delays.', impact: '−1 day', impactLabel: 'target improvement', action: 'Audit warehouse flow' },
]

function Recommendations() {
  return <div className="insights-content">
    <section className="insight-summary"><div className="summary-icon"><Sparkles size={20} /></div><div><span className="eyebrow">THE BIG PICTURE</span><h2>Strong growth, with room to sharpen fulfilment.</h2><p>Revenue and profit are moving in the right direction. The clearest opportunities are to deepen wholesale relationships, keep winning products in stock and narrow delivery variation.</p></div><div className="summary-score"><strong>3</strong><span>priority actions</span></div></section>
    <div className="recommendation-list">{recommendations.map(({ number, title, type, color, icon: Icon, description, impact, impactLabel, action }) => <article className="recommendation-card" key={number}>
      <div className="recommendation-mark">{number}</div><div className={`recommendation-icon ${color}`}><Icon size={19} /></div>
      <div className="recommendation-copy"><span className={`recommendation-type ${color}`}>{type}</span><h3>{title}</h3><p>{description}</p><button type="button" className="text-action">{action}<ArrowRight size={15} /></button></div>
      <div className="recommendation-impact"><strong>{impact}</strong><span>{impactLabel}</span></div>
    </article>)}</div>
    <section className="panel signals-panel"><div className="panel-heading"><div><h2>Signals worth watching</h2><p>Metrics to revisit in the next review</p></div><span className="signal-status"><Check size={13} />Updated today</span></div>
      <div className="signal-grid"><div><span>Margin stability</span><strong>37.39%</strong><small>Above 35% target</small></div><div><span>Top customer share</span><strong>7.5%</strong><small>Healthy concentration</small></div><div><span>Order fulfilment</span><strong>10.44 days</strong><small>Improve by 1 day</small></div></div>
    </section>
  </div>
}

export default function Dashboard() {
  const [activePage, setActivePage] = useState('overview')
  const [period, setPeriod] = useState(12)
  const [menuOpen, setMenuOpen] = useState(false)
  const [eyebrow, title, subtitle] = pageCopy[activePage]
  const navigate = (page) => { setActivePage(page); setMenuOpen(false) }
  const exportReport = () => {
    const rows = [['Metric', 'Value'], ...kpis.map(({ label, value }) => [label, value])]
    const csv = rows.map((row) => row.map((value) => `"${value}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'sales-performance.csv'
    link.click()
    URL.revokeObjectURL(url)
  }
  const content = activePage === 'drivers' ? <Drivers /> : activePage === 'operations' ? <Operations /> : activePage === 'recommendations' ? <Recommendations /> : <Overview period={period} />

  return <div className="app-shell">
    <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
      <a className="brand" href="#overview" onClick={() => navigate('overview')}><span className="brand-mark"><BarChart3 size={20} strokeWidth={2.3} /></span><span className="brand-name">northstar<span>analytics</span></span></a>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="side-nav" aria-label="Dashboard pages">{pages.map(({ id, label, icon: Icon }, index) => <button className={`nav-item ${activePage === id ? 'active' : ''}`} key={id} onClick={() => navigate(id)} aria-current={activePage === id ? 'page' : undefined}>
        <Icon size={18} strokeWidth={1.8} /><span>{label}</span>{index === 3 && <span className="new-indicator" />}
      </button>)}</nav>
      <div className="sidebar-spacer" />
      <div className="sidebar-note"><div className="note-icon"><Sparkles size={16} /></div><strong>Good momentum</strong><p>Sales are up 12.8% year over year.</p><button type="button" onClick={() => navigate('recommendations')}>View insights <ArrowRight size={13} /></button></div>
      <div className="profile-row"><div className="avatar">JD</div><div><strong>Jordan Davis</strong><span>Sales analyst</span></div><ChevronDown size={15} /></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><button type="button" className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        <div className="breadcrumbs"><span>Workspace</span><span className="crumb-divider">/</span><strong>{title}</strong></div>
        <div className="topbar-actions"><label className="period-select"><CalendarDays size={15} /><select value={period} onChange={(event) => setPeriod(Number(event.target.value))} aria-label="Sales trend period"><option value="12">Last 12 months</option><option value="6">Last 6 months</option><option value="3">Last 3 months</option></select><ChevronDown size={14} /></label>
          <button className="export-button" onClick={exportReport}><Download size={15} /><span>Export</span></button>
        </div>
      </header>
      <div className="page-content"><div className="page-heading"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{subtitle}</p></div><div className="updated-label"><span />Data updated <strong>today</strong></div></div>
        {content}<footer className="page-footer"><span>Northstar Analytics <span className="footer-dot">·</span> Sample data for portfolio demonstration</span><span>Reporting period: Jan – Dec 2025</span></footer>
      </div>
    </main>
  </div>
}
