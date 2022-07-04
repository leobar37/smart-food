import Header from '../components/armaplate/header';
import TutorialSection from '../components/armaplate/tutorial';
import { LandingLayout } from '../landingLayout';
import { ArmedProducts } from '../shared/ArmedProducts';
const ArmPlatePage = () => {
  return (
    <LandingLayout>
      <Header />
      <ArmedProducts />
      <TutorialSection />
    </LandingLayout>
  );
};

export default ArmPlatePage;
