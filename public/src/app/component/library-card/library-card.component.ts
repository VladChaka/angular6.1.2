import { Component, OnInit } from '@angular/core';
import { FormService } from '../../service/form.service';

@Component({
  selector: 'library-card',
  templateUrl: './library-card.component.html',
  styleUrls: ['./library-card.component.less']
})
export class LibraryCardComponent implements OnInit { 

  constructor(protected formService: FormService) { }

    closeLibraryCard = function(){
        this.formService.showLibraryCard = false;
    };
  ngOnInit() {
  }

}
