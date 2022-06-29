import { AccessArgs } from './types';
import { Rol } from './types';
export const isSignedIn = ({ session }: AccessArgs) => {
  return !!session;
};

export const generatedPermissions = Object.fromEntries(
  Object.keys(Rol).map((key) => [
    Rol[key],
    ({ session }: AccessArgs) => {    
      return session && session.data.rol === Rol[key];
    },
  ]),
);

export const permissions = {
  ...generatedPermissions,
};

const baseRule = (callback: (args: AccessArgs) => boolean) => {
  return ({ session }: AccessArgs) => {
    if (!isSignedIn({ session })) {
      return false;
    }
    return callback({ session });
  };
};

const completeOperation = (rol: Rol) => ({
  create: baseRule(permissions[rol]),
  delete: baseRule(permissions[rol]),
  update: baseRule(permissions[rol]),
  query: baseRule(permissions[rol]),
});

export const rules = {
  isSignedIn,
  completeOperation,
};
