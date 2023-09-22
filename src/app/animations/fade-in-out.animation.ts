import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  state('void', style({ opacity: 0 })),
  transition(':enter, :leave', [
    animate('1000ms ease-in-out', style({ opacity: '*' })),
  ]),
]);
