import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header-modal',
  templateUrl: './header-modal.component.html',
  styleUrls: ['./header-modal.component.scss'],
})
export class HeaderModalComponent  implements OnInit {

  constructor(
    private utilsService: UtilsService
  ) { }

  ngOnInit() {}

  dismissModal(){
    this.utilsService.dismissModal();
  }

}
