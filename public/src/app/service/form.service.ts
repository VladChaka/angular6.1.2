import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FormService {
    userAuthentication: any = null;
    showUserProfile: boolean = false;
    showLibraryCard: boolean = false;
    showFormAddUser: boolean = false;
    
    constructor() { }

    openAddForm(): void {
        this.showFormAddUser = true;
    }

    openUserProfile(): void {
        this.showUserProfile = true;
    }

    openLibraryCard(): void {
        this.showLibraryCard = true;
    }

    closeUserProfile(): void {
        this.showUserProfile = false;
    }

    closeLibraryCard = function(){
        this.showLibraryCard = false;
    };

    closeFormAddUser(): void {
        this.showFormAddUser = false;
    }
}
