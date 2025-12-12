declare module 'react-native-calendars' {
  import { ComponentType } from 'react';
  export const Calendar: ComponentType<any> & ((props: any) => any);
  export default { Calendar } as any;
}
