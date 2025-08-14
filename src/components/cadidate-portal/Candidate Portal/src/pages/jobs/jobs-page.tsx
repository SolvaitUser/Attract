import React from 'react';
    import { motion } from 'framer-motion';
    import { useLanguage } from '../../contexts/language-context';
    import { MainLayout } from '../../components/layout/main-layout';
    import { JobSearchFilters } from '../../components/jobs/job-search-filters';
    import { JobCard } from '../../components/jobs/job-card';
    import { Button } from '@heroui/react';
    import { Icon } from '@iconify/react';

    export const JobsPage: React.FC = () => {
      const { translate } = useLanguage();
      const [filters, setFilters] = React.useState({
        keyword: '',
        jobTypes: [],
        departments: [],
        countries: [],
      });

      // Sample jobs data
      const jobsData = [
        {
          id: 'job1',
          title: 'Senior Frontend Developer',
          company: 'TechCorp',
          location: 'San Francisco, CA',
          type: 'Full-time',
          department: 'Engineering',
          salary: '$120,000 - $150,000',
          postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
          description: 'Join our team as a Senior Frontend Developer...',
          matchScore: 92,
          isRecommended: true,
          companyLogo: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=1',
          skills: ['React', 'TypeScript', 'CSS', 'UI/UX', 'Jest'],
        },
        {
          id: 'job2',
          title: 'Product Manager',
          company: 'InnovateCo',
          location: 'New York, NY',
          type: 'Full-time',
          department: 'Product',
          salary: '$130,000 - $160,000',
          postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
          description: 'Looking for an experienced Product Manager...',
          matchScore: 85,
          isRecommended: true,
          companyLogo: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=2',
          skills: ['Product Strategy', 'Agile', 'User Research', 'Roadmapping'],
        },
        {
          id: 'job3',
          title: 'UX Designer',
          company: 'DesignHub',
          location: 'Remote',
          type: 'Full-time',
          department: 'Design',
          salary: '$100,000 - $130,000',
          postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
          description: 'Create amazing user experiences...',
          matchScore: 78,
          isRecommended: true,
          companyLogo: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=3',
          skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping'],
        },
        {
          id: 'job4',
          title: 'Backend Developer',
          company: 'DataSystems',
          location: 'Chicago, IL',
          type: 'Full-time',
          department: 'Engineering',
          salary: '$110,000 - $140,000',
          postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
          description: 'Work on scalable backend systems...',
          matchScore: 82,
          isRecommended: false,
          companyLogo: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=4',
          skills: ['Node.js', 'Python', 'AWS', 'MongoDB', 'Microservices'],
        },
      ];

      // Handle filter changes
      const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
      };

      return (
        <MainLayout requireAuth={true}>
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">{translate('jobs.search')}</h1>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Button
                    variant="flat"
                    startContent={<Icon icon="lucide:grid" width={16} />}
                    size="sm"
                  >
                    Grid
                  </Button>
                  <Button
                    variant="flat"
                    startContent={<Icon icon="lucide:list" width={16} />}
                    size="sm"
                  >
                    List
                  </Button>
                </div>
              </div>
            </motion.div>

            <div className="mb-6">
              <JobSearchFilters filters={filters} onFilterChange={handleFilterChange} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobsData.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                variant="flat"
                color="primary"
                endContent={<Icon icon="lucide:more-horizontal" width={16} />}
              >
                Load More
              </Button>
            </div>
          </div>
        </MainLayout>
      );
    };