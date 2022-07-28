import Header from '../components/armaplate/header';
import TutorialSection from '../components/armaplate/tutorial';
import { LandingLayout } from '@App/core/shared-components';
import { ArmedProducts } from '@App/core/modules/product';
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
