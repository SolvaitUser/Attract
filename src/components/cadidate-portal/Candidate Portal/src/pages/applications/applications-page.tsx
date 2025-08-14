import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/language-context';
import { MainLayout } from '../../components/layout/main-layout';
import { ApplicationTracker, Application } from '../../components/applications/application-tracker';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tabs, Tab, Chip, Divider, Progress, Avatar, CircularProgress } from '@heroui/react';
import { Icon } from '@iconify/react';
import { addToast } from '@heroui/react';
import { useHistory } from 'react-router-dom';

export const ApplicationsPage: React.FC = () => {
  const { translate } = useLanguage();
  const { isOpen: isWithdrawOpen, onOpen: onWithdrawOpen, onOpenChange: onWithdrawOpenChange } = useDisclosure();
  const [selectedApplication, setSelectedApplication] = React.useState<string | null>(null);
  const history = useHistory();
  
  // Sample applications data with enhanced information
  const applications: Application[] = [
    {
      id: 'app1',
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp',
      appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      status: 'under_review',
      recruiterNotes: 'Your application is currently being reviewed by our hiring team.',
      aiScore: 92,
      nextSteps: 'Technical assessment will be sent if shortlisted.',
      companyLogo: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=1',
      lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      jobId: 'job1',
      allowWithdraw: true,
      applicationHistory: [
        { status: 'applied', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), note: 'Application submitted successfully' },
        { status: 'under_review', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), note: 'Application being reviewed by hiring team' }
      ],
      coverletter: "Dear Hiring Manager,\n\nI'm excited to apply for the Senior Frontend Developer position at TechCorp. With 5+ years of experience in building modern web applications using React, TypeScript, and state-of-the-art frontend technologies, I believe I'd be a valuable addition to your team...",
      hiringManager: {
        name: "Sarah Thompson",
        role: "Engineering Lead",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=8"
      },
      aiInsights: [
        "Your experience with React matches 95% of the job requirements",
        "Consider highlighting your leadership experience in your next communication",
        "85% of successful candidates had strong TypeScript skills"
      ],
      skillsMatch: {
        matched: ["React", "TypeScript", "CSS", "Jest", "GraphQL"],
        missing: ["Next.js", "Performance Optimization"]
      }
    },
    {
      id: 'app2',
      jobTitle: 'Product Manager',
      company: 'InnovateCo',
      appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      status: 'interview',
      aiScore: 85,
      nextSteps: 'Interview scheduled for next week.',
      companyLogo: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=2',
      lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      jobId: 'job2',
      allowWithdraw: true,
      applicationHistory: [
        { status: 'applied', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), note: 'Application submitted successfully' },
        { status: 'under_review', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), note: 'Application being reviewed by hiring team' },
        { status: 'interview', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), note: 'Selected for interview round' }
      ],
      coverletter: "Dear Hiring Team,\n\nI'm excited to apply for the Product Manager role at InnovateCo. With my background in product development and user-centered design approach, I believe I can help drive innovation and growth for your products...",
      hiringManager: {
        name: "David Chen",
        role: "Product Director",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=9"
      },
      aiInsights: [
        "Your experience with Agile methodologies is a strong match",
        "Consider preparing examples of how you've led cross-functional teams",
        "75% of candidates are asked about product metrics in interviews"
      ],
      skillsMatch: {
        matched: ["Product Strategy", "User Research", "Agile", "Roadmapping"],
        missing: ["SQL", "Data Analysis"]
      },
      interview: {
        date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
        type: "online",
        interviewers: ["David Chen", "Maria Garcia"],
        preparation: {
          suggestedTopics: ["Product Strategy", "Leadership", "Analytics"],
          resources: ["Interview Guide", "Company Culture Overview"]
        }
      }
    },
    {
      id: 'app3',
      jobTitle: 'UX Designer',
      company: 'DesignHub',
      appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
      status: 'applied',
      aiScore: 78,
      companyLogo: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=3',
      lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
      jobId: 'job3',
      allowWithdraw: true,
      applicationHistory: [
        { status: 'applied', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), note: 'Application submitted successfully' }
      ],
      coverletter: "Dear Hiring Manager,\n\nI'm writing to express my interest in the UX Designer position at DesignHub. With my strong background in user-centered design and expertise in creating intuitive interfaces, I believe I can help enhance your product experience...",
      hiringManager: {
        name: "Alex Johnson",
        role: "Design Lead",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=10"
      },
      aiInsights: [
        "Your portfolio shows strong visual design skills that match requirements",
        "Consider highlighting your user research experience",
        "90% of selected candidates had experience with design systems"
      ],
      skillsMatch: {
        matched: ["Figma", "User Research", "Wireframing", "Prototyping"],
        missing: ["Design Systems", "Accessibility"]
      }
    },
    {
      id: 'app4',
      jobTitle: 'Data Scientist',
      company: 'AnalyticsPro',
      appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      status: 'rejected',
      aiScore: 65,
      recruiterNotes: "Thank you for your interest in AnalyticsPro. While we were impressed with your qualifications, we've decided to move forward with candidates whose experience more closely aligns with our current needs.",
      companyLogo: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=4',
      lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
      jobId: 'job4',
      allowWithdraw: false,
      applicationHistory: [
        { status: 'applied', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), note: 'Application submitted successfully' },
        { status: 'under_review', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25), note: 'Application being reviewed by hiring team' },
        { status: 'rejected', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20), note: 'Application not selected for further rounds' }
      ],
      coverletter: "Dear Hiring Team,\n\nI'm applying for the Data Scientist position at AnalyticsPro. With my background in statistical analysis and machine learning, I'm confident I can help drive data-based decision making in your organization...",
      hiringManager: {
        name: "Michael Lee",
        role: "Head of Analytics",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=11"
      },
      aiInsights: [
        "Your Python skills match 80% of the job requirements",
        "The position required deep expertise in neural networks",
        "Consider improving your cloud computing skills for similar roles"
      ],
      skillsMatch: {
        matched: ["Python", "Data Analysis", "Machine Learning", "SQL"],
        missing: ["Deep Learning", "AWS", "Spark"]
      }
    },
    {
      id: 'app5',
      jobTitle: 'DevOps Engineer',
      company: 'CloudNative',
      appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
      status: 'offer',
      aiScore: 88,
      recruiterNotes: "Congratulations! We're pleased to offer you the DevOps Engineer position at CloudNative. Please review the offer letter in your email.",
      companyLogo: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=5',
      lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
      jobId: 'job5',
      allowWithdraw: false,
      applicationHistory: [
        { status: 'applied', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), note: 'Application submitted successfully' },
        { status: 'under_review', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8), note: 'Application being reviewed by hiring team' },
        { status: 'interview', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6), note: 'Selected for interview round' },
        { status: 'offer', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), note: 'Offer extended' }
      ],
      coverletter: "Dear Hiring Manager,\n\nI'm excited to apply for the DevOps Engineer position at CloudNative. With my extensive experience in CI/CD pipelines, Kubernetes orchestration, and cloud infrastructure management, I believe I can help streamline your development processes...",
      hiringManager: {
        name: "Jennifer Wong",
        role: "DevOps Lead",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=12"
      },
      aiInsights: [
        "Your Kubernetes and Docker skills were highly valued",
        "Your experience with CI/CD pipelines matched perfectly",
        "95% of offers for this role required cloud platform expertise"
      ],
      skillsMatch: {
        matched: ["Kubernetes", "Docker", "AWS", "Terraform", "CI/CD"],
        missing: []
      },
      offer: {
        salary: "$145,000/year",
        startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
        benefits: ["Health Insurance", "401k Matching", "Remote Work Option", "Professional Development Budget"],
        expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        responseRequired: true
      }
    }
  ];

  // Handle withdraw application
  const handleWithdraw = (applicationId: string) => {
    setSelectedApplication(applicationId);
    onWithdrawOpen();
  };

  // Confirm withdrawal
  const confirmWithdrawal = () => {
    addToast({
      title: "Application Withdrawn",
      description: "Your application has been successfully withdrawn.",
      color: "success",
    });
    onWithdrawOpenChange(false);
  };

  // View application details
  const handleViewDetails = (applicationId: string) => {
    history.push(`/applications/${applicationId}`);
  };

  // Format date helper
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Get status information helper
  const getStatusInfo = (status: Application['status']) => {
    switch (status) {
      case 'applied':
        return { color: 'default', label: 'Applied', icon: 'lucide:send' };
      case 'under_review':
        return { color: 'primary', label: 'Under Review', icon: 'lucide:eye' };
      case 'interview':
        return { color: 'secondary', label: 'Interview', icon: 'lucide:calendar' };
      case 'offer':
        return { color: 'success', label: 'Offer', icon: 'lucide:check-circle' };
      case 'rejected':
        return { color: 'danger', label: 'Rejected', icon: 'lucide:x-circle' };
      case 'withdrawn':
        return { color: 'warning', label: 'Withdrawn', icon: 'lucide:undo' };
      default:
        return { color: 'default', label: 'Unknown', icon: 'lucide:help-circle' };
    }
  };

  return (
    <MainLayout requireAuth={true}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold">{translate('applications.title')}</h1>
          <p className="text-default-500 mt-2">
            Track the status of all your job applications
          </p>
        </motion.div>

        <ApplicationTracker
          applications={applications}
          onWithdraw={handleWithdraw}
          onViewDetails={handleViewDetails}
        />

        {/* Withdraw Confirmation Modal */}
        <Modal isOpen={isWithdrawOpen} onOpenChange={onWithdrawOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Confirm Withdrawal</ModalHeader>
                <ModalBody>
                  <p>
                    Are you sure you want to withdraw this application? This action cannot be undone.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="danger" onPress={confirmWithdrawal}>
                    Withdraw Application
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </MainLayout>
  );
};