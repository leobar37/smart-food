import { BuildPlatePage } from '../../modules/landing';
import { buildPlateHandler } from '../../modules/landing/server';

export const getServerSideProps = buildPlateHandler;

export default BuildPlatePage;
