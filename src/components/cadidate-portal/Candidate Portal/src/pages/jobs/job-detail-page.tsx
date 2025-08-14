import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader, Button, Chip, Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Textarea, Spinner, Progress, Tabs, Tab } from '@heroui/react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/language-context';
import { MainLayout } from '../../components/layout/main-layout';
import { AiJobMatch } from '../../components/jobs/ai-job-match';
import { addToast } from '@heroui/react';
import { useAuth } from '../../contexts/auth-context';

export const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { translate } = useLanguage();
  const { user } = useAuth();
  const history = useHistory();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [uploadedResume, setUploadedResume] = React.useState<File | null>(null);
  const [coverLetter, setCoverLetter] = React.useState('');
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = React.useState(false);
  const [useProfileResume, setUseProfileResume] = React.useState(true);
  const [currentStep, setCurrentStep] = React.useState(1);
  const [applyWithProfile, setApplyWithProfile] = React.useState(true);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  // Sample job data - in a real app, this would come from an API
  const job = {
    id,
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'Full-time',
    department: 'Engineering',
    salary: '$120,000 - $150,000',
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    description: `
      <h4>About the Role</h4>
      <p>We're looking for a Senior Frontend Developer to join our engineering team. You'll be responsible for building and maintaining high-quality web applications using React, TypeScript, and modern frontend technologies.</p>
      
      <h4>Responsibilities</h4>
      <ul>
        <li>Design, build, and maintain efficient, reusable, and reliable frontend code</li>
        <li>Collaborate with designers, product managers, and other engineers</li>
        <li>Identify and address performance bottlenecks</li>
        <li>Implement responsive design and ensure cross-browser compatibility</li>
        <li>Participate in code reviews and mentor junior developers</li>
      </ul>
      
      <h4>Requirements</h4>
      <ul>
        <li>5+ years of experience in frontend development</li>
        <li>Proficiency with React, TypeScript, and modern frontend tools</li>
        <li>Strong understanding of web fundamentals (HTML, CSS, JavaScript)</li>
        <li>Experience with state management libraries (Redux, MobX, etc.)</li>
        <li>Knowledge of responsive design and cross-browser compatibility</li>
        <li>Excellent problem-solving and communication skills</li>
      </ul>
    `,
    matchScore: 92,
    isRecommended: true,
    companyLogo: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=1',
    skills: ['React', 'TypeScript', 'CSS', 'UI/UX', 'Jest', 'Redux', 'Responsive Design'],
    benefits: ['Health Insurance', 'Flexible Hours', 'Remote Work', '401(k) Matching', 'Professional Development'],
    employmentType: 'Full-time',
    experienceLevel: 'Senior',
  };

  // AI suggested improvements
  const suggestedImprovements = [
    'Highlight your React and TypeScript experience in your cover letter',
    'Add specific UI/UX projects to your profile',
    'Mention your experience with state management libraries like Redux',
    'Include your experience with responsive design in your application'
  ];

  // Similar jobs
  const similarJobs = [
    {
      id: 'job2',
      title: 'Frontend Developer',
      company: 'WebSolutions Inc.',
      matchScore: 88,
    },
    {
      id: 'job3',
      title: 'UI Engineer',
      company: 'DesignTech',
      matchScore: 82,
    },
    {
      id: 'job4',
      title: 'React Developer',
      company: 'AppWorks',
      matchScore: 78,
    }
  ];

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedResume(e.target.files[0]);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle apply
  const handleApply = () => {
    setCurrentStep(1);
    onOpen();
  };

  // Generate AI cover letter
  const handleGenerateCoverLetter = async () => {
    setIsGeneratingCoverLetter(true);
    
    // Simulate API call to generate cover letter
    setTimeout(() => {
      const generatedCoverLetter = `Dear Hiring Manager,

I am writing to express my interest in the ${job.title} position at ${job.company}. With over 5 years of experience in frontend development using React, TypeScript, and modern JavaScript frameworks, I believe I would be a valuable addition to your team.

My experience includes designing and implementing responsive user interfaces, optimizing application performance, and mentoring junior developers. I have a strong background in state management using Redux and have worked extensively with UI/UX teams to create intuitive user experiences.

I am particularly excited about this role because of ${job.company}'s reputation for innovation and commitment to quality. I am confident that my technical skills and collaborative approach would make me a great fit for your engineering team.

Thank you for considering my application. I look forward to the opportunity to discuss how my background, skills, and experiences would benefit ${job.company}.

Sincerely,
${user?.fullName}`;
      
      setCoverLetter(generatedCoverLetter);
      setIsGeneratingCoverLetter(false);
    }, 2000);
  };

  // Handle next step
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Submit application
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call to submit application
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(3); // Move to confirmation step
      
      addToast({
        title: translate('jobs.applicationSubmitted'),
        description: `Your application for ${job.title} has been submitted successfully.`,
        color: "success",
      });
    }, 2000);
  };

  // Navigate to applications page
  const goToApplications = () => {
    history.push('/applications');
    onClose();
  };

  return (
    <MainLayout requireAuth={true}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Button
              variant="light"
              size="sm"
              as="a"
              href="/jobs"
              startContent={<Icon icon="lucide:chevron-left" width={16} />}
            >
              {translate('jobs.search')}
            </Button>
            <span className="text-default-500">/</span>
            <span className="text-default-500">{job.title}</span>
          </div>

          {/* Job Header */}
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              {job.companyLogo ? (
                <img 
                  src={job.companyLogo} 
                  alt={job.company} 
                  className="w-16 h-16 rounded-lg object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-default-100 flex items-center justify-center rounded-lg">
                  <span className="text-2xl font-bold text-default-500">
                    {job.company.charAt(0)}
                  </span>
                </div>
              )}
              
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{job.title}</h1>
                <div className="flex items-center gap-2 text-default-500">
                  <span className="font-medium">{job.company}</span>
                  <span>•</span>
                  <span>{job.location}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                color="primary"
                size="lg"
                startContent={<Icon icon="lucide:send" width={18} />}
                onPress={handleApply}
                className="min-w-[150px]"
              >
                {translate('jobs.apply')}
              </Button>
              
              <Button
                variant="flat"
                size="lg"
                startContent={<Icon icon="lucide:bookmark" width={18} />}
              >
                Save
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Job Overview */}
              <Card className="mb-6">
                <CardBody className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-default-500">Department</p>
                      <p className="font-medium">{job.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-default-500">Employment Type</p>
                      <p className="font-medium">{job.employmentType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-default-500">Experience Level</p>
                      <p className="font-medium">{job.experienceLevel}</p>
                    </div>
                    <div>
                      <p className="text-sm text-default-500">Salary Range</p>
                      <p className="font-medium">{job.salary}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <Chip key={index} color="primary" variant="flat">
                          {skill}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Benefits</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.benefits.map((benefit, index) => (
                        <Chip key={index} color="secondary" variant="flat">
                          {benefit}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-default-500">Posted Date</p>
                      <p className="font-medium">{formatDate(job.postedDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-default-500">Application Deadline</p>
                      <p className="font-medium">{formatDate(job.deadline)}</p>
                    </div>
                  </div>
                  
                  <Divider className="my-6" />
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Job Description</h3>
                    <div 
                      className="prose dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: job.description }}
                    />
                  </div>
                </CardBody>
              </Card>
            </div>
            
            <div>
              {/* AI Job Match */}
              <AiJobMatch 
                matchScore={job.matchScore} 
                jobTitle={job.title} 
                suggestedImprovements={suggestedImprovements}
              />
              
              {/* Similar Jobs */}
              <Card className="mt-6">
                <CardHeader>
                  <h3 className="text-lg font-semibold">{translate('jobs.similarJobs')}</h3>
                </CardHeader>
                <CardBody className="p-4">
                  <div className="space-y-4">
                    {similarJobs.map(similarJob => (
                      <div 
                        key={similarJob.id}
                        className="p-3 border border-divider rounded-lg hover:bg-default-50 dark:hover:bg-default-100/10 transition-colors cursor-pointer"
                        onClick={() => history.push(`/jobs/${similarJob.id}`)}
                      >
                        <h4 className="font-medium">{similarJob.title}</h4>
                        <p className="text-sm text-default-500">{similarJob.company}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Icon icon="lucide:zap" className="text-warning-500" width={14} />
                          <span className="text-xs font-medium">{similarJob.matchScore}% {translate('jobs.matchScore')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
              
              {/* Apply Now (Sticky) */}
              <div className="hidden lg:block sticky top-20 mt-6">
                <Button
                  color="primary"
                  fullWidth
                  size="lg"
                  startContent={<Icon icon="lucide:send" width={18} />}
                  onPress={handleApply}
                >
                  {translate('jobs.apply')}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Application Modal */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {currentStep === 3 
                  ? translate('jobs.applicationSubmitted')
                  : `${translate('jobs.apply')} - ${job.title}`
                }
              </ModalHeader>
              <ModalBody>
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">How would you like to apply?</h3>
                    
                    <div className="space-y-4">
                      <Card 
                        isPressable
                        onPress={() => setApplyWithProfile(true)}
                        className={`border-2 ${applyWithProfile ? 'border-primary' : 'border-divider'}`}
                      >
                        <CardBody className="p-4 flex gap-3">
                          <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-full h-fit">
                            <Icon icon="lucide:user" className="text-primary-500" width={24} height={24} />
                          </div>
                          <div>
                            <h4 className="font-medium">{translate('jobs.applyWithProfile')}</h4>
                            <p className="text-sm text-default-500">
                              Use your existing profile information and resume
                            </p>
                            {user?.profileCompleted && user.profileCompleted < 100 && (
                              <div className="mt-2">
                                <p className="text-xs text-warning-500">
                                  Your profile is {user.profileCompleted}% complete. Consider completing your profile for better results.
                                </p>
                              </div>
                            )}
                          </div>
                        </CardBody>
                      </Card>
                      
                      <Card 
                        isPressable
                        onPress={() => setApplyWithProfile(false)}
                        className={`border-2 ${!applyWithProfile ? 'border-primary' : 'border-divider'}`}
                      >
                        <CardBody className="p-4 flex gap-3">
                          <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-full h-fit">
                            <Icon icon="lucide:file-plus" className="text-primary-500" width={24} height={24} />
                          </div>
                          <div>
                            <h4 className="font-medium">{translate('jobs.uploadResume')}</h4>
                            <p className="text-sm text-default-500">
                              Upload a specific resume for this application
                            </p>
                          </div>
                        </CardBody>
                      </Card>
                      
                      {!applyWithProfile && (
                        <>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                          />
                          
                          {uploadedResume ? (
                            <div className="p-4 border border-divider rounded-lg">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Icon icon="lucide:file-text" className="text-primary-500" width={20} />
                                  <span className="font-medium">{uploadedResume.name}</span>
                                </div>
                                <Button
                                  size="sm"
                                  variant="light"
                                  color="danger"
                                  isIconOnly
                                  onPress={() => setUploadedResume(null)}
                                >
                                  <Icon icon="lucide:x" width={16} />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Button
                              variant="flat"
                              color="primary"
                              startContent={<Icon icon="lucide:upload" width={16} />}
                              onPress={triggerFileInput}
                              className="w-full"
                            >
                              Select Resume
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
                
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">{translate('jobs.coverLetter')}</h3>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">Write a cover letter (optional)</label>
                        <Button
                          size="sm"
                          variant="flat"
                          color="primary"
                          startContent={<Icon icon="lucide:sparkles" width={16} />}
                          isLoading={isGeneratingCoverLetter}
                          onPress={handleGenerateCoverLetter}
                          isDisabled={isGeneratingCoverLetter}
                        >
                          {translate('jobs.generateCoverLetter')}
                        </Button>
                      </div>
                      
                      <Textarea
                        placeholder="Enter your cover letter here..."
                        value={coverLetter}
                        onValueChange={setCoverLetter}
                        minRows={10}
                        maxRows={15}
                        className="w-full"
                      />
                      
                      {isGeneratingCoverLetter && (
                        <div className="mt-4">
                          <p className="text-sm text-default-500 mb-2">Generating AI cover letter...</p>
                          <Progress
                            size="sm"
                            isIndeterminate
                            aria-label="Generating AI cover letter"
                            className="max-w-md"
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                      <p className="text-sm flex items-center gap-1">
                        <Icon icon="lucide:info" width={16} className="text-primary-500" />
                        A personalized cover letter can increase your chances of getting an interview.
                      </p>
                    </div>
                  </div>
                )}
                
                {currentStep === 3 && (
                  <div className="flex flex-col items-center py-6">
                    <div className="bg-success-100 dark:bg-success-900/20 rounded-full p-6 mb-6">
                      <Icon icon="lucide:check-circle" className="text-success-500 w-16 h-16" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">Application Submitted Successfully!</h3>
                    <p className="text-default-500 text-center mb-6">
                      Your application for {job.title} at {job.company} has been successfully submitted. You can track your application status in the Applications section.
                    </p>
                    
                    <div className="p-4 w-full bg-default-50 dark:bg-default-100/10 rounded-lg">
                      <h4 className="font-medium mb-2">What happens next?</h4>
                      <ol className="list-decimal ml-5 space-y-2">
                        <li>The hiring team will review your application</li>
                        <li>You'll receive a notification if you're selected for the next steps</li>
                        <li>Prepare for potential interviews using our AI Interview Prep tool</li>
                      </ol>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                {currentStep === 1 && (
                  <>
                    <Button variant="flat" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button 
                      color="primary" 
                      onPress={handleNextStep}
                      isDisabled={!applyWithProfile && !uploadedResume}
                    >
                      Continue
                    </Button>
                  </>
                )}
                
                {currentStep === 2 && (
                  <>
                    <Button variant="flat" onPress={handlePrevStep}>
                      Back
                    </Button>
                    <Button 
                      color="primary" 
                      onPress={handleSubmit}
                      isLoading={isSubmitting}
                    >
                      Submit Application
                    </Button>
                  </>
                )}
                
                {currentStep === 3 && (
                  <div className="flex w-full justify-center gap-2">
                    <Button 
                      color="primary" 
                      onPress={goToApplications}
                      className="px-8"
                    >
                      View Applications
                    </Button>
                  </div>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </MainLayout>
  );
};