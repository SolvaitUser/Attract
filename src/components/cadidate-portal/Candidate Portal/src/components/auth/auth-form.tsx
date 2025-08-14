import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Input, Button, Checkbox, Card, Link, Spinner } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/language-context';
import { useAuth } from '../../contexts/auth-context';

type AuthFormType = 'login' | 'register';

interface AuthFormProps {
  type: AuthFormType;
  onSuccess?: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ type, onSuccess }) => {
  const { translate } = useLanguage();
  const { login, register, googleSignIn, linkedInSignIn, appleSignIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  // Form states
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [acceptTerms, setAcceptTerms] = React.useState(false);

  // Form validation
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = translate('auth.email') + ' ' + translate('common.error');
    } else if (!validateEmail(email)) {
      newErrors.email = translate('auth.email') + ' invalid';
    }
    
    if (!password) {
      newErrors.password = translate('auth.password') + ' ' + translate('common.error');
    } else if (password.length < 6) {
      newErrors.password = translate('auth.password') + ' too short';
    }
    
    if (type === 'register') {
      if (!fullName) {
        newErrors.fullName = translate('auth.fullName') + ' ' + translate('common.error');
      }
      
      if (!country) {
        newErrors.country = translate('auth.country') + ' ' + translate('common.error');
      }
      
      if (confirmPassword !== password) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      
      if (!acceptTerms) {
        newErrors.acceptTerms = 'You must accept the terms';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (type === 'login') {
        await login(email, password);
      } else {
        await register({
          email,
          password,
          fullName,
          country,
          mobile: mobile || undefined,
        });
      }
      
      onSuccess?.();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle OAuth sign-in
  const handleOAuthSignIn = async (provider: 'google' | 'linkedin' | 'apple') => {
    setIsAuthenticating(true);
    
    try {
      switch (provider) {
        case 'google':
          await googleSignIn();
          break;
        case 'linkedin':
          await linkedInSignIn();
          break;
        case 'apple':
          await appleSignIn();
          break;
      }
      
      onSuccess?.();
    } catch (error) {
      console.error(error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Animation variants for form elements
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    }),
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-2">
          {type === 'login' 
            ? translate('auth.welcomeBack')
            : translate('auth.createAccount')
          }
        </h2>
        <p className="text-default-500">
          {type === 'login'
            ? translate('auth.noAccount')
            : translate('auth.haveAccount')
          }
          {' '}
          <Link 
            as={RouterLink} 
            to={type === 'login' ? '/register' : '/login'}
            color="primary"
          >
            {type === 'login' 
              ? translate('auth.register')
              : translate('auth.login')
            }
          </Link>
        </p>
      </motion.div>

      <div className="space-y-4">
        <motion.div
          custom={0}
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          <Button
            fullWidth
            variant="bordered"
            color="default"
            onPress={() => handleOAuthSignIn('google')}
            startContent={<Icon icon="logos:google-icon" width={20} height={20} />}
            isDisabled={isSubmitting || isAuthenticating}
          >
            {isAuthenticating ? (
              <Spinner size="sm" color="current" />
            ) : (
              translate('auth.continueWithGoogle')
            )}
          </Button>

          <Button
            fullWidth
            variant="bordered"
            color="default"
            onPress={() => handleOAuthSignIn('linkedin')}
            startContent={<Icon icon="logos:linkedin-icon" width={20} height={20} />}
            isDisabled={isSubmitting || isAuthenticating}
          >
            {isAuthenticating ? (
              <Spinner size="sm" color="current" />
            ) : (
              translate('auth.continueWithLinkedIn')
            )}
          </Button>

          <Button
            fullWidth
            variant="bordered"
            color="default"
            onPress={() => handleOAuthSignIn('apple')}
            startContent={<Icon icon="logos:apple" width={20} height={20} />}
            isDisabled={isSubmitting || isAuthenticating}
          >
            {isAuthenticating ? (
              <Spinner size="sm" color="current" />
            ) : (
              translate('auth.continueWithApple')
            )}
          </Button>
        </motion.div>

        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-divider"></div>
          <span className="flex-shrink mx-4 text-default-500 text-sm">{translate('auth.or')}</span>
          <div className="flex-grow border-t border-divider"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {type === 'register' && (
            <motion.div
              custom={1}
              variants={formVariants}
              initial="hidden"
              animate="visible"
            >
              <Input
                label={translate('auth.fullName')}
                placeholder="John Doe"
                value={fullName}
                onValueChange={setFullName}
                isInvalid={!!errors.fullName}
                errorMessage={errors.fullName}
                isDisabled={isSubmitting}
                variant="bordered"
                fullWidth
              />
            </motion.div>
          )}

          <motion.div
            custom={2}
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <Input
              type="email"
              label={translate('auth.email')}
              placeholder="email@example.com"
              value={email}
              onValueChange={setEmail}
              isInvalid={!!errors.email}
              errorMessage={errors.email}
              isDisabled={isSubmitting}
              variant="bordered"
              fullWidth
            />
          </motion.div>

          <motion.div
            custom={3}
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <Input
              type={showPassword ? "text" : "password"}
              label={translate('auth.password')}
              placeholder="•••••••••"
              value={password}
              onValueChange={setPassword}
              isInvalid={!!errors.password}
              errorMessage={errors.password}
              isDisabled={isSubmitting}
              endContent={
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onPress={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <Icon icon="lucide:eye-off" className="text-default-500" />
                  ) : (
                    <Icon icon="lucide:eye" className="text-default-500" />
                  )}
                </Button>
              }
              variant="bordered"
              fullWidth
            />
          </motion.div>

          {type === 'register' && (
            <>
              <motion.div
                custom={4}
                variants={formVariants}
                initial="hidden"
                animate="visible"
              >
                <Input
                  type={showPassword ? "text" : "password"}
                  label={translate('auth.confirmPassword')}
                  placeholder="•••••••••"
                  value={confirmPassword}
                  onValueChange={setConfirmPassword}
                  isInvalid={!!errors.confirmPassword}
                  errorMessage={errors.confirmPassword}
                  isDisabled={isSubmitting}
                  variant="bordered"
                  fullWidth
                />
              </motion.div>

              <motion.div
                custom={5}
                variants={formVariants}
                initial="hidden"
                animate="visible"
              >
                <Input
                  label={translate('auth.country')}
                  placeholder="United States"
                  value={country}
                  onValueChange={setCountry}
                  isInvalid={!!errors.country}
                  errorMessage={errors.country}
                  isDisabled={isSubmitting}
                  variant="bordered"
                  fullWidth
                />
              </motion.div>

              <motion.div
                custom={6}
                variants={formVariants}
                initial="hidden"
                animate="visible"
              >
                <Input
                  type="tel"
                  label={translate('auth.mobile')}
                  placeholder="+1 (123) 456-7890"
                  value={mobile}
                  onValueChange={setMobile}
                  isDisabled={isSubmitting}
                  variant="bordered"
                  fullWidth
                />
              </motion.div>

              <motion.div
                custom={7}
                variants={formVariants}
                initial="hidden"
                animate="visible"
              >
                <Checkbox
                  isSelected={acceptTerms}
                  onValueChange={setAcceptTerms}
                  isInvalid={!!errors.acceptTerms}
                  isDisabled={isSubmitting}
                >
                  {translate('auth.termsAndConditions')}
                </Checkbox>
                {errors.acceptTerms && (
                  <p className="text-danger text-tiny mt-1">{errors.acceptTerms}</p>
                )}
              </motion.div>
            </>
          )}

          {type === 'login' && (
            <motion.div
              custom={4}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className="flex justify-end"
            >
              <Link as={RouterLink} to="/forgot-password" size="sm" color="primary">
                {translate('auth.forgotPassword')}
              </Link>
            </motion.div>
          )}

          <motion.div
            custom={8}
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <Button
              type="submit"
              fullWidth
              color="primary"
              isLoading={isSubmitting}
              isDisabled={isSubmitting || isAuthenticating}
            >
              {type === 'login'
                ? translate('auth.login')
                : translate('auth.register')
              }
            </Button>
          </motion.div>
        </form>
      </div>
    </Card>
  );
};
