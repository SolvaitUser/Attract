import React from 'react';
import { Button, Card, Progress, Spinner } from '@heroui/react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/language-context';
import { useAuth } from '../../contexts/auth-context';

interface ResumeUploadProps {
  onUploadComplete?: (resumeUrl: string) => void;
  onAiProcessComplete?: () => void;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({ onUploadComplete, onAiProcessComplete }) => {
  const { translate } = useLanguage();
  const { uploadResume } = useAuth();
  const [file, setFile] = React.useState<File | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [isUploading, setIsUploading] = React.useState(false);
  const [aiProcessing, setAiProcessing] = React.useState(false);
  const [aiProgress, setAiProgress] = React.useState(0);
  const [uploadComplete, setUploadComplete] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 200);
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Start AI processing
      setIsUploading(false);
      setUploadComplete(true);
      setAiProcessing(true);
      
      // Simulate AI processing
      let progress = 0;
      const aiProcessInterval = setInterval(() => {
        progress += Math.random() * 5;
        if (progress >= 100) {
          progress = 100;
          clearInterval(aiProcessInterval);
          
          // Complete AI processing
          setTimeout(() => {
            setAiProcessing(false);
            setAiProgress(100);
            onAiProcessComplete?.();
          }, 500);
        }
        setAiProgress(progress);
      }, 300);
      
      // Perform actual upload
      const resumeUrl = await uploadResume(file);
      onUploadComplete?.(resumeUrl);
    } catch (error) {
      console.error('Error uploading resume:', error);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const resetUpload = () => {
    setFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setAiProcessing(false);
    setAiProgress(0);
    setUploadComplete(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {!uploadComplete || aiProcessing ? (
        <Card 
          className={`p-6 border-2 border-dashed ${
            isDragging 
              ? 'border-primary bg-primary-100/20 dark:bg-primary-800/10' 
              : 'border-default-300'
          } transition-all`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="text-center py-4">
            {!file ? (
              <>
                <div className="flex justify-center mb-4">
                  <motion.div
                    animate={{ 
                      scale: isDragging ? 1.1 : 1,
                      y: isDragging ? -5 : 0
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Icon 
                      icon="lucide:file-text" 
                      className="text-primary-500" 
                      width={48} 
                      height={48} 
                    />
                  </motion.div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{translate('auth.resumeUpload')}</h3>
                <p className="text-default-500 mb-4">PDF or Word document (Max 5MB)</p>
                <Button
                  color="primary"
                  variant="flat"
                  onPress={triggerFileInput}
                  startContent={<Icon icon="lucide:upload" />}
                >
                  {translate('common.upload')}
                </Button>
              </>
            ) : isUploading ? (
              <div className="space-y-4">
                <Icon 
                  icon="lucide:file-upload" 
                  className="text-primary-500 mx-auto" 
                  width={36} 
                  height={36} 
                />
                <h3 className="text-lg font-semibold">{translate('common.upload')}</h3>
                <p className="text-default-500">{file.name}</p>
                <Progress 
                  aria-label="Upload progress" 
                  value={uploadProgress} 
                  color="primary" 
                  className="max-w-md mx-auto"
                />
              </div>
            ) : aiProcessing ? (
              <div className="space-y-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                >
                  <Icon 
                    icon="lucide:brain-circuit" 
                    className="text-primary-500 mx-auto" 
                    width={36} 
                    height={36} 
                  />
                </motion.div>
                <h3 className="text-lg font-semibold">{translate('ai.processing')}</h3>
                <p className="text-default-500">Extracting information from your resume...</p>
                <Progress 
                  aria-label="AI processing progress" 
                  value={aiProgress} 
                  color="secondary" 
                  className="max-w-md mx-auto"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <Icon 
                  icon="lucide:file-check" 
                  className="text-success-500 mx-auto" 
                  width={36} 
                  height={36} 
                />
                <h3 className="text-lg font-semibold">{file.name}</h3>
                <div className="flex justify-center gap-2">
                  <Button
                    color="primary"
                    onPress={handleUpload}
                    startContent={<Icon icon="lucide:upload-cloud" />}
                  >
                    {translate('common.upload')}
                  </Button>
                  <Button
                    variant="flat"
                    color="danger"
                    onPress={resetUpload}
                    startContent={<Icon icon="lucide:x" />}
                  >
                    {translate('common.cancel')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center p-6"
        >
          <div className="rounded-full bg-success-100 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Icon icon="lucide:check" className="text-success-500" width={32} height={32} />
          </div>
          <h3 className="text-xl font-semibold mb-2">{translate('common.success')}!</h3>
          <p className="text-default-500 mb-4">Your resume has been uploaded and processed.</p>
          <Button
            size="sm"
            variant="flat"
            color="default"
            onPress={resetUpload}
          >
            {translate('common.upload')} {translate('common.retry')}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};
