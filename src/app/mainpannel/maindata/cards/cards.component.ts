import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  animations: [

    // Trigger animation cards array
    trigger('cardAnimation', [
      // Transition from any state to any state
      transition('* => *', [
        // Initially the all cards are not visible
        query(':enter', style({ opacity: 0 }), { optional: true }),

        // Each card will appear sequentially with the delay of 300ms
        query(':enter', stagger('300ms', [
          animate('.5s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-50%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(-10px) scale(1.1)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ]))]), { optional: true }),

        // Cards will disappear sequentially with the delay of 300ms
        query(':leave', stagger('300ms', [
          animate('500ms ease-out', keyframes([
            style({ opacity: 1, transform: 'scale(1.1)', offset: 0 }),
            style({ opacity: .5, transform: 'scale(.5)', offset: 0.3 }),
            style({ opacity: 0, transform: 'scale(0)', offset: 1 }),
          ]))]), { optional: true })
      ]),
    ]),

    // Trigger animation for plus button
    trigger('plusAnimation', [

      // Transition from any state to any state
      transition('* => *', [
        query('.plus-card', style({ opacity: 0, transform: 'translateY(-40px)' })),
        query('.plus-card', stagger('500ms', [
          animate('300ms 1.1s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
        ])),
      ])
    ])
  ]
})
export class CardsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  index = 3;
  cards = ['Note 1', 'Note 2 sdfsgdv ksjfkfksdfkahfkank khkhvks hk hskvk hksgsgs gsg dg  s wgs g  gs gsgsgs s  sgs s gsk s ks sh  s kgksksgkskgsk skskf s f fkgfskfks  ksgsk sk sk rs rks sk y sks hk hks hskh kh kk hk hkhk shkshs kh skh ', 'Note 3'];
  addCard() {
    this.cards.push('Note ' + (++this.index));
  }

  deleteCard(i) {
    this.cards.splice(i, 1);
  }
}
