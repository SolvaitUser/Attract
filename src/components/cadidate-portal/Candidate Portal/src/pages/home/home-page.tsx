import React from 'react';
import { Card, CardBody, Button } from '@heroui/react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/language-context';
import { useAuth } from '../../contexts/auth-context';
import { MainLayout } from '../../components/layout/main-layout';
import { JobCard } from '../../components/jobs/job-card';

export const HomePage: React.FC = () => {
  const { translate } = useLanguage();
  const { isAuthenticated, user } = useAuth();

  // Sample recommended jobs
  const recommendedJobs = [
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
  ];

  return (
    <MainLayout requireAuth={false}>
      {isAuthenticated ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8 max-w-6xl"
        >
          {/* User Welcome */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {translate('nav.home')}, {user?.fullName.split(' ')[0]}!
            </h1>
            <p className="text-default-500">
              {user?.profileCompleted === 100 
                ? 'Your profile is complete! Check out these recommended jobs.'
                : `Complete your profile (${user?.profileCompleted}%) to get better job matches.`
              }
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card shadow="sm">
              <CardBody className="flex items-center p-4">
                <div className="p-3 rounded-full bg-primary-100/50 dark:bg-primary-900/30 mr-4">
                  <Icon icon="lucide:briefcase" className="text-primary-500" width={24} height={24} />
                </div>
                <div>
                  <p className="text-default-500 text-sm">Applied Jobs</p>
                  <h3 className="text-2xl font-bold">12</h3>
                </div>
              </CardBody>
            </Card>

            <Card shadow="sm">
              <CardBody className="flex items-center p-4">
                <div className="p-3 rounded-full bg-warning-100/50 dark:bg-warning-900/30 mr-4">
                  <Icon icon="lucide:calendar" className="text-warning-500" width={24} height={24} />
                </div>
                <div>
                  <p className="text-default-500 text-sm">Upcoming Interviews</p>
                  <h3 className="text-2xl font-bold">2</h3>
                </div>
              </CardBody>
            </Card>

            <Card shadow="sm">
              <CardBody className="flex items-center p-4">
                <div className="p-3 rounded-full bg-secondary-100/50 dark:bg-secondary-900/30 mr-4">
                  <Icon icon="lucide:sparkles" className="text-secondary-500" width={24} height={24} />
                </div>
                <div>
                  <p className="text-default-500 text-sm">Profile Match Score</p>
                  <h3 className="text-2xl font-bold">{user?.profileCompleted}%</h3>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Recommended Jobs */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{translate('jobs.recommended')}</h2>
              <Button
                as={RouterLink}
                to="/jobs"
                variant="light"
                color="primary"
                endContent={<Icon icon="lucide:chevron-right" width={16} />}
              >
                View All Jobs
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <Card className="mb-8 bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800">
            <CardBody className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary-100 dark:bg-primary-800/50 p-2 rounded-full">
                  <Icon icon="lucide:brain-circuit" className="text-primary-500" width={24} height={24} />
                </div>
                <h2 className="text-xl font-bold">AI Insights</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="text-primary-500 mt-1">
                    <Icon icon="lucide:zap" width={18} />
                  </div>
                  <div>
                    <p className="font-medium">You have 2 high-fit jobs not applied to yet</p>
                    <p className="text-sm text-default-500">Based on your skills and experience</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="text-primary-500 mt-1">
                    <Icon icon="lucide:trending-up" width={18} />
                  </div>
                  <div>
                    <p className="font-medium">Adding "Project Management" to your skills could increase matches by 15%</p>
                    <p className="text-sm text-default-500">Based on your work experience</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="text-primary-500 mt-1">
                    <Icon icon="lucide:calendar-clock" width={18} />
                  </div>
                  <div>
                    <p className="font-medium">Your next interview is in 2 days</p>
                    <p className="text-sm text-default-500">Product Manager at InnovateCo</p>
                  </div>
                </div>
              </div>
              
              <Button
                color="primary"
                className="mt-4"
                startContent={<Icon icon="lucide:sparkles" />}
                as={RouterLink}
                to="/profile"
              >
                Enhance Your Profile
              </Button>
            </CardBody>
          </Card>
        </motion.div>
      ) : (
        // Landing page for unauthenticated users
        <div className="min-h-[80vh]">
          <div className="bg-gradient-to-b from-primary-50 to-background dark:from-primary-900/20 dark:to-background py-16">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="md:w-1/2"
                >
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Find Your Dream Job with AI-Powered Precision
                  </h1>
                  <p className="text-xl text-default-600 mb-8">
                    Wise uses advanced AI to match your skills and experience with the perfect job opportunities.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button
                      as={RouterLink}
                      to="/register"
                      color="primary"
                      size="lg"
                      className="font-medium"
                      startContent={<Icon icon="lucide:user-plus" />}
                    >
                      Create Account
                    </Button>
                    <Button
                      as={RouterLink}
                      to="/login"
                      variant="flat"
                      color="default"
                      size="lg"
                      className="font-medium"
                    >
                      Sign In
                    </Button>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="md:w-1/2"
                >
                  <img 
                    src="https://img.heroui.chat/image/ai?w=600&h=400&u=123" 
                    alt="AI-powered job matching" 
                    className="w-full rounded-lg shadow-lg"
                  />
                </motion.div>
              </div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-16 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">How Wise Works for You</h2>
              <p className="text-xl text-default-600 max-w-3xl mx-auto">
                Our AI-powered platform simplifies every step of your job search journey
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center"
              >
                <div className="bg-primary-100 dark:bg-primary-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon icon="lucide:file-text" className="text-primary-500" width={32} height={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Intelligent Resume Parsing</h3>
                <p className="text-default-600">
                  Our AI extracts your skills and experience automatically from your resume
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-center"
              >
                <div className="bg-primary-100 dark:bg-primary-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon icon="lucide:target" className="text-primary-500" width={32} height={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Precise Job Matching</h3>
                <p className="text-default-600">
                  Find jobs that match your unique skills and career goals with AI scoring
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center"
              >
                <div className="bg-primary-100 dark:bg-primary-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon icon="lucide:brain-circuit" className="text-primary-500" width={32} height={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Interview Preparation</h3>
                <p className="text-default-600">
                  AI-generated practice questions and personalized preparation tips
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};
