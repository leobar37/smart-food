import { ArmPlatePage } from '../../features/landing';
import { armYourPlateHandler } from '@App/core/server';

export const getServerSideProps = armYourPlateHandler;

export default ArmPlatePage;
