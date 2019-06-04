import { Component, OnInit, Input } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { MenuModel } from '../../models/menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() public menuItems
  public menu: MenuModel[] = [];
  public assetsUrl: any;
  public moduleName: string;
  constructor(
    public navService: NavigationService) {
    this.assetsUrl = '/';
  }
  public togglemenu = true;
  public togglesidebar = true;
  ngOnInit() {

  }

  public myFunction() {
    if (this.togglemenu) {
      this.togglemenu = false;
      this.togglesidebar = false;
    } else {
      this.togglemenu = true;
      this.togglesidebar = false;
    }
  }
  // Method invoked on the click of side panel menu
  public menuClicked(option: any) {
    if (option.name === 'Chat') {

    } else if (option.name === 'Chat') {

      this.moduleName = 'chat';
    } else if (option.name === 'Stores') {

      this.moduleName = 'stores';
    }

    this.navService.navigateByUrl(option.url);

  }

}
