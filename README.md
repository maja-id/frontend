# Frontend

Build library:
```
ng build @maja.id/<library> 
```
contoh:
```
ng build @maja.id/ui
```

Build and Watch
```
ng build @maja.id/ui --watch
```

Run Example project:
```
ng serve
```


### @maja.id/state
Merupakan state management sederhana menggunakan Rxjs
Contoh penggunaan:
1. Buat State Model
```
export class Profile {
  name: string;
  email: string;
  photo: string;
}

```

2. Buat State Class
```
import { State, StateOptions, StorageType } from '@maja.ui/state';
import { Profile } from './profile';

export class ProfileState extends State<Profile> {
  constructor() {
    const options: StateOptions = {
      key: 'PROFILE',
      persist: true,
      storageType: StorageType.LOCAL_STORAGE
    };
    super(new Profile(), options);
  }
}
```

3. Menggunakan State
```
const profileState = inject(ProfileState);

getProfile() {
  return this.profileState.state;
}

setProfile(profile: any) {
  this.profileState.setState(profile);
}

profile?: any | undefined;
subscribeProfileChanged() {
  this.profileState.state$.subscribe((data: any) => {
    this.profile = data;
  });
}
```

#### Konfigurasi
1. key (string)
digunakan sebagai key pada localStorage dan localstorage atau sebagai table pada IndexedDB
2. persist (boolean)
Simpan state di localStorage, sessionStorage atau IndexedDB
3. storageType
- StorageType.LOCAL_STORAGE : Browser localstorage
- StorageType.SESSION_STORAGE : Browser Session Storage
- StorageType.INDEXED_DB : IndexedDB


