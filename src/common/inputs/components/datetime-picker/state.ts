import { atom } from 'recoil'

export const INPUTS_datetime = atom<DateTimePickerRangeValue>({
  key: 'INPUTS_datetime',
  default: {
    from: new Date(),
    to: new Date()
  }
});