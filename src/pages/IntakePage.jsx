import React, { useState, useEffect } from 'react';
import StepSidebar from '../components/intake/StepSidebar';
import StepProgressBar from '../components/intake/StepProgressBar';
import Step1About from '../components/intake/Step1About';
import Step2Profile from '../components/intake/Step2Profile';
import Step3Topics from '../components/intake/Step3Topics';
import Step4Media from '../components/intake/Step4Media';
import Step5Finish from '../components/intake/Step5Finish';
import SuccessScreen from '../components/intake/SuccessScreen';
import { validateStep1, validateStep2, validateStep3, validateStep4, validateStep5 } from '../lib/validation';
import { submitIntake } from '../lib/submitIntake';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import ShaderWaving from '../components/ShaderWaving';

const IntakePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('oppskalert_intake_form');
    return saved ? JSON.parse(saved) : {
      topics: [{ title: '', takeaways: '', tags: [] }],
      extraVideoUrls: [],
      testimonials: [{ quote: '', name: '', role: '', stars: 5 }],
      imageFiles: [] // These won't be saved to localStorage correctly as they are File objects
    };
  });

  useEffect(() => {
    const { imageFiles, ...savableData } = formData;
    localStorage.setItem('oppskalert_intake_form', JSON.stringify(savableData));
  }, [formData]);

  const handleNext = () => {
    let stepErrors = {};
    if (currentStep === 1) stepErrors = validateStep1(formData);
    if (currentStep === 2) stepErrors = validateStep2(formData);
    if (currentStep === 3) stepErrors = validateStep3(formData);
    if (currentStep === 4) stepErrors = validateStep4(formData);
    
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setErrors({});
    setCurrentStep(prev => Math.min(prev + 1, 5));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    const stepErrors = validateStep5(formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    try {
      await submitIntake(formData, formData.imageFiles);
      setIsSubmitted(true);
      localStorage.removeItem('oppskalert_intake_form');
    } catch (err) {
      console.error('Submission error:', err);
      alert('Noe gikk galt under innsending. Vennligst prøv igjen.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: 1, name: 'Om deg', component: Step1About },
    { id: 2, name: 'Din profil', component: Step2Profile },
    { id: 3, name: 'Foredrag', component: Step3Topics },
    { id: 4, name: 'Medier', component: Step4Media },
    { id: 5, name: 'Innspurt', component: Step5Finish },
  ];

  if (isSubmitted) {
    return <SuccessScreen name={formData.fullName} email={formData.email} />;
  }

  const ActiveStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-background text-primary font-sans flex flex-col md:flex-row relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <ShaderWaving className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
      </div>

      <div className="hidden md:block w-[280px] shrink-0 sticky top-0 h-screen border-r border-primary/10 p-8 z-10 backdrop-blur-sm bg-background/20">
        <StepSidebar 
          current={currentStep} 
          onStepClick={(s) => setCurrentStep(s)} 
        />
      </div>

      <div className="md:hidden sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-primary/10 p-6">
        <StepProgressBar current={currentStep} />
      </div>

      <main className="flex-1 overflow-y-auto pb-32 relative z-10">
        <div className="max-w-[680px] mx-auto w-full p-6 md:p-12 lg:p-24">
          <ActiveStepComponent 
            data={formData} 
            onChange={setFormData}
            errors={errors}
            onJumpToStep={(s) => setCurrentStep(s)}
            isSubmitting={isSubmitting}
          />

          {/* Navigation Buttons */}
          <div className="mt-16 flex items-center justify-between gap-4">
            {currentStep > 1 ? (
              <button
                onClick={handleBack}
                disabled={isSubmitting}
                className="flex items-center gap-2 text-primary/50 hover:text-primary transition-colors font-mono text-sm uppercase tracking-widest disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" /> Tilbake
              </button>
            ) : <div />}

            {currentStep < 5 ? (
              <button
                onClick={handleNext}
                className="group relative overflow-hidden bg-accent text-background px-8 py-4 rounded-full font-sans font-bold transition-transform hover:scale-[1.03] duration-300"
              >
                <span className="relative z-10 transition-colors duration-300 flex items-center gap-2">
                  Fortsett <ArrowRight className="w-4 h-4" />
                </span>
                <div className="absolute inset-0 bg-surface translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="group relative overflow-hidden bg-accent text-background px-12 py-4 rounded-full font-sans font-bold transition-transform hover:scale-[1.03] duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 transition-colors duration-300 flex items-center gap-2">
                  {isSubmitting ? (
                    <>Sender inn... <Loader2 className="w-4 h-4 animate-spin" /></>
                  ) : (
                    <>Send inn <ArrowRight className="w-4 h-4" /></>
                  )}
                </span>
                <div className="absolute inset-0 bg-surface translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            )}
          </div>
        </div>

        {/* Sticky Mobile button */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-primary/10 z-40">
           {currentStep < 5 ? (
              <button
                onClick={handleNext}
                className="w-full bg-accent text-background px-8 py-4 rounded-full font-sans font-bold flex items-center justify-center gap-2"
              >
                Fortsett <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-accent text-background px-8 py-4 rounded-full font-sans font-bold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send inn'}
              </button>
            )}
        </div>
      </main>
    </div>
  );
};

export default IntakePage;
