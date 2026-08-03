import {useState,useEffect} from 'react';
import { useJobs } from "../../context/jobContext";
import {useCandidates} from "../../context/candidateContext";
import CountComponent from "../../components/Dashboard/countComponent";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { RxPeople } from "react-icons/rx";
import { BiTask } from "react-icons/bi";
import { HiOutlineBriefcase } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import Charts from '../../components/Dashboard/reportsSection.jsx';

const Dashboard = () => {
  const { jobs,openJobsCount } = useJobs();
  const { candidatesList, interviewCount, hireCount } = useCandidates();

  const metrics = [
    { Icon: PiSuitcaseSimpleLight, count: jobs.length, text: 'Total Jobs', accent: 'indigo' },
    { Icon: PiSuitcaseSimpleLight, count: openJobsCount, text: 'Open Jobs', accent: 'purple' },
    { Icon: RxPeople, count: candidatesList.length, text: 'Total Candidates', accent: 'green' },
    { Icon: HiOutlineBriefcase, count: interviewCount, text: 'Interviews', accent: 'pink' },
    { Icon: FaStar, count: hireCount, text: 'Hired', accent: 'amber' },
  ];

  return (
    <div data-testid="dashboard-page" className="space-y-6">
      <div data-testid="dashboard-metrics" className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {metrics.map((metric, index) => (
          <div key={index} data-testid={`metric-${metric.text.toLowerCase().replace(/\s+/g, '-')}`}>
            <CountComponent {...metric} />
          </div>
        ))}
      </div>
      <div data-testid="dashboard-charts">
        <Charts/>
      </div>
    </div>
  );
};

export default Dashboard