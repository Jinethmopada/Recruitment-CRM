import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import {useJobs} from '../../context/jobContext';
import {useCandidates} from "../../context/candidateContext";
import { useEmployees } from "../../context/employeeContext";

const COLORS = ["#4f46e5", "#8b5cf6", "#10b981", "#f59e0b", "#ec4899", "#06b6d4"];

const Charts = () => {
  const { jobs, openJobsCount } = useJobs();
  const { candidatesList, interviewCount, hireCount, rejectedCount, screeningCount } = useCandidates();
  const { employeeCount } = useEmployees();

  // Jobs by location
  const jobsByLocation = Object.entries(
    jobs.reduce((acc, job) => {
      const location = job.location || "Unknown";
      acc[location] = (acc[location] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  // Jobs by posted date
  const jobsByPostedDate = Object.entries(
    jobs.reduce((acc, job) => {
      const dateValue = job.postedDate || job.createdAt || new Date().toISOString();
      const dateKey = new Date(dateValue).toISOString().slice(0, 10);
      acc[dateKey] = (acc[dateKey] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([date, jobsCount]) => ({
      date,
      jobs: jobsCount,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Candidate hiring status
  const candidateStatusData = [
    { name: "Interview", value: interviewCount },
    { name: "Hired", value: hireCount },
    { name: "Rejected", value: rejectedCount },
    { name: "Screening", value: screeningCount }
  ];

  // Candidate experience / score distribution example
  const candidateScoreData = [
    { x: 5, y: 12 },
    { x: 10, y: 18 },
    { x: 15, y: 10 },
    { x: 20, y: 24 },
    { x: 25, y: 16 },
    { x: 30, y: 14 }
  ];

  // Live system distribution
  const systemCountData = [
    { name: "Employees", count: employeeCount || 0 },
    { name: "Candidates", count: candidatesList.length || 0 }
  ];

  return (
    <div data-testid="reports-section" className="space-y-6">
      <div data-testid="reports-metric-placeholder" className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {/* keep your existing metric cards here */}
      </div>

      <div data-testid="reports-chart-grid" className="grid gap-6 xl:grid-cols-2">
        {/* 1. Bar Chart */}
        <div data-testid="jobs-by-location-chart" className="rounded-xl bg-white p-4 shadow">
          <h3 className="mb-4 font-semibold">Jobs by Location</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={jobsByLocation}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Line Chart */}
        <div data-testid="jobs-by-posted-date-chart" className="rounded-xl bg-white p-4 shadow">
          <h3 className="mb-4 font-semibold">Jobs by Posted Date</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={jobsByPostedDate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="jobs" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Pie Chart */}
        <div data-testid="candidate-hiring-status-chart" className="rounded-xl bg-white p-4 shadow">
          <h3 className="mb-4 font-semibold">Candidate Hiring Status</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={candidateStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {candidateStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Area Chart */}
        <div data-testid="jobs-vs-open-jobs-chart" className="rounded-xl bg-white p-4 shadow">
          <h3 className="mb-4 font-semibold">Open Jobs vs Total Jobs</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { name: "Total Jobs", total: jobs.length },
                { name: "Open Jobs", total: openJobsCount }
              ]}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#8b5cf6"
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 5. Employee vs Candidate System Count Chart */}
        <div data-testid="system-count-chart" className="rounded-xl bg-white p-4 shadow">
          <h3 className="mb-4 font-semibold">Employees vs Candidates in System</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={systemCountData} barCategoryGap="42%">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" name="Total" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Charts;