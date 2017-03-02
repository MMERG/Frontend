/**
 * Created by Marius on 2017.02.27.
 */
import { Component, OnInit, Input, Output, OnChanges, EventEmitter, trigger, state, style, animate, transition } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.css'],

  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class DialogComponent implements OnInit  {
  @Input() closable = true;
  @Input() visible: boolean;


  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  // isValid = false;

  constructor() { }

ngOnInit(){}


  // count(income:number, loan:number) {
  //
  //     this.isValid = true;
  //
  //     return income + loan;
  //
  //   }




close(){
  this.visible = false;
  this.visibleChange.emit(this.visible);
}

}
