declare module 'react-native-password-strength-meter-bar' {
  import React from 'react';
  import { ViewProps } from 'react-native';

  export interface PasswordStrengthMeterBarProps extends ViewProps {
    password: string;
    showStrenghtText?: boolean;
    height?: number;
    radius?: number;
    unfilledColor?: string;
  }

  const PasswordStrengthMeterBar: React.FC<PasswordStrengthMeterBarProps>;
  
  export default PasswordStrengthMeterBar;
}
