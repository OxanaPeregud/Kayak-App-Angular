import {animate, state, style, transition, trigger} from "@angular/animations";

export function visibility() {
  return trigger('visibility', [
    state('shown', style({
      transform: 'scale(1.0)',
      opacity: 1
    })),
    state('hidden', style({
      transform: 'scale(0.5)',
      opacity: 0
    })),
    transition('* => *', animate('0.5s ease-in-out'))
  ]);
}

export function flyIn() {
  return trigger('flyIn', [
    state('*', style({
      transform: 'translateX(0)',
      opacity: 1
    })),
    transition(':enter', [
      style({
        transform: 'translateX(-100%)',
        opacity: 0
      }),
      animate('500ms ease-in')
    ])
  ]);
}
