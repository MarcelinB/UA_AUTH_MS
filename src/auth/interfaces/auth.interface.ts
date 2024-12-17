export interface UserResponse {
    uid: string;
    email: string;
    emailVerified: boolean;
    displayName?: string;
    photoURL?: string;
    disabled: boolean;
    metadata: {
      lastSignInTime?: string;
      creationTime?: string;
    };
  }
  
  export interface AuthResponse {
    user: UserResponse;
    token: string;
  }
  
  export interface MessagePatternPayload<T> {
    pattern: string;
    data: T;
  }