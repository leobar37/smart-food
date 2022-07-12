import { ArmPlatePage } from '../../modules/landing';
import { armYourPlateHandler } from '../../modules/landing/server';

export const getServerSideProps = armYourPlateHandler;

export default ArmPlatePage;
