import { Injectable } from "@angular/core";
import { State, StateOptions, StorageType } from "@maja.id/state";

export class SidebarModel {
  open: boolean = true;
}

@Injectable({ providedIn: 'root' })
export class SidebarState extends State<SidebarModel> {
  constructor() {
    const options: StateOptions = {
      storageType: StorageType.LOCAL_STORAGE,
      key: 'SIDEBAR',
    };
    super(new SidebarModel(), options);
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }
}
