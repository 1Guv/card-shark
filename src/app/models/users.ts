export interface GoogleUser {
  idToken?: string;
  id?: string;
  name?: string;
  email?: string;
  photoUrl?: string;
  firstName?: string;
  lastName?: string;
  provider?: string;
}

export interface AWSUser extends GoogleUser {
  signInDetails?: {
    authFlowType?: string;
    loginId?: string;
  };
  userId?: string;
  username?: string;
  photoUrl?: string;
}

