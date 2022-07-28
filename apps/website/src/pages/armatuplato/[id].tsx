import { BuildPLatePage } from '@App/features/buildPlate';
import { buildPlateHandler } from '@App/core/server';

export const getServerSideProps = buildPlateHandler;

export default BuildPLatePage;
