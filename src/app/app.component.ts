import { Inject,Component } from '@angular/core';
import { FirebaseAuthState ,FirebaseApp, AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';


import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

export class Club {
  $key: string;
  name: string;
  description: string;
  imageurl: string;
}

@Component({
  selector: 'app-root',
  template: `

 
	  {{title}}
<div> {{ (af.auth | async)?.uid }} </div>

	
	<md-tab-group dynamicHeight='true' >






  <md-tab label="add New">
    

<md-grid-list rowHeight="1:1" style="" cols="{{ 2}}"  >
<md-grid-tile  >
<div class="club-card" [style.background-image]="'url(' + club.imageurl + ')'"  style="width:100%;height:100%;background-repeat:no-repeat; background-position:center center;background-size:cover;" >

      <md-grid-tile-header>
      <md-input-container ><input mdInput [(ngModel)] = 'club.name'/> </md-input-container> </md-grid-tile-header>

  <input #imagepicker  type=file (change)='onChange($event.target.files[0])' style="display:none;position:absolute;" /> 
    <md-input-container style="position:absolute; bottom:10%">
    	<textarea mdInput [(ngModel)] ='club.description' placeholder='Descripton'> </textarea>
    </md-input-container >
  <md-grid-tile-footer  >
    <button md-button (click)='imagepicker.click()'>load logo</button>
    <button md-button (click)='addNew()'>add</button>
    <button md-button (click)='update(club)'>edit</button>
  </md-grid-tile-footer>
</div >
	</md-grid-tile>
</md-grid-list>

</md-tab>


	  






  <md-tab label="View details">

<md-sidenav-container>
  <md-sidenav mode="over" opened="false" style=" width: 20%; " #sidenav>
<md-list>
  <md-list-item (click)='view(item)' style="" *ngFor="let item of items | async">
     <a md-line >{{ item.name }}</a>
     <img md-list-avatar src='{{item.imageurl}}' style="height:inherit">
     <button md-icon-button (click)="viewDetail(item)">
        <md-icon>info</md-icon>
     </button>
  </md-list-item>
</md-list>
    
  </md-sidenav>
 
<md-grid-list rowHeight="1:1" style="" cols="{{ 2}}"  >
<md-grid-tile  >
<div class="club-card" [style.background-image]="'url(' + clubview.imageurl + ')'"  style="width:100%;height:100%;background-repeat:no-repeat; background-position:center center;background-size:cover;" >
      <md-grid-tile-header>{{clubview.name}}</md-grid-tile-header>
  
  <md-grid-tile-footer>
  	<p>{{clubview.description}}</p>
    <button md-button (click)="clubEdit(clubview)">edit </button>
  </md-grid-tile-footer>
</div >
	</md-grid-tile>
</md-grid-list>


<md-card class="club-card" style="width:50%">
  <md-card-header>
    <div md-card-avatar class="example-header-image"></div>
    <md-card-title>{{clubview.name}}</md-card-title>
  </md-card-header>
  <img md-card-image [src]="clubview.imageurl" >
  <md-card-content>
    <p>
      {{clubview.description}}
    </p>
  </md-card-content>
  <md-card-actions>
    <button md-button (click)="clubEdit(clubview)">edit </button>
  </md-card-actions>
</md-card>
   
    <div style="position:fixed;top:50px;right:50px;z-index=99"> <button md-mini-fab (click)='sidenav.toggle()' > <md-icon>add</md-icon></button></div>
  </md-sidenav-container>
  </md-tab>




<md-tab label="List ">
<md-grid-list rowHeight="1:1" style="" cols="{{ 4}}"  >
<md-grid-tile  *ngFor="let item of items | async">
<div class="club-card" [style.background-image]="'url(' + item.imageurl + ')'"  style="width:100%;height:100%;background-repeat:no-repeat; background-position:center center;background-size:cover;" >
      <md-grid-tile-header>{{item.name}}</md-grid-tile-header>
  
  <md-grid-tile-footer>
    <button md-button>View</button>
  </md-grid-tile-footer>
</div >
	</md-grid-tile>
</md-grid-list>
    
  </md-tab>

</md-tab-group>






`,
  styles:[ `
  	
`],
styleUrls:['../../node_modules/@angular/material/core/theming/prebuilt/deeppurple-amber.css','../../node_modules/@angular/material/core/theming/prebuilt/indigo-pink.css']
})

export class AppComponent {
  title = 'Club list view';
  club: Club = {
    $key: '1',
    name: 'Club name',
    description: 'brief description',
    imageurl: 'https://firebasestorage.googleapis.com/v0/b/hhhd-27e4f.appspot.com/o/clavesin.jpg?alt=media&token=3f09d6cc-9fc8-4011-a8ec-70abaaaf2f39',
  };
  clubview: Club = {
    $key: '1',
    name: 'Club name',
    description: 'brief description',
    imageurl: 'https://firebasestorage.googleapis.com/v0/b/hhhd-27e4f.appspot.com/o/clavesin.jpg?alt=media&token=3f09d6cc-9fc8-4011-a8ec-70abaaaf2f39',
  };
  file : any;
  decoded: any;
  af : any;
  firebaseApp: firebase.app.App;
  items: FirebaseListObservable<any[]>;

  
  

  constructor(af: AngularFire, @Inject(FirebaseApp) firebaseApp: any ) {
    this.af = af;
    this.firebaseApp = firebaseApp;
    
    this.af.auth.login()
    this.af.auth.subscribe(
    	(state: firebase.Promise<FirebaseAuthState>) =>
    {

    	this.items = af.database.list('clubs');
    }
    	)



    
  }

	public addNew() {
    const club = {name: this.club.name, description: this.club.description,imageurl : this.club.imageurl};
    let postRef = this.firebaseApp.database().ref('clubs').push();
    this.club.$key = postRef.key;
    postRef.update({name: this.club.name, description: this.club.description,}).then( () => {
	    		this.club.name = '';
	    		this.club.description = '';
	    		this.club.$key = '';
    		}
    	)

    if(this.decoded != this.club.imageurl)
    {
    	console.log('file <> imageurl')
    	return;
    }
    let storRef = this.firebaseApp.storage().ref('images/'+this.club.$key);
    storRef.putString(club.imageurl,'data_url').then(() => storRef.getDownloadURL().then((url) => {
    		this.club.imageurl = 'unset';
    		postRef.update({imageurl:url})
    		}
    	).catch((e) => {this.club.imageurl = 'unset'})
    )

    
  }

  public clubEdit(item){
  	this.club.name = item.name;
  	this.club.description = item.description;
  	this.club.imageurl = item.imageurl;
  	this.club.$key = item.$key;
  }

  public update(item){

  	let postRef = this.firebaseApp.database().ref('clubs/'+item.$key);
    postRef.update({name: item.name, description: item.description,}).then( () => {

    		}
    	)
    if(this.decoded != item.imageurl)
    {
    	console.log('file <> imageurl')
    	return;
    }
    let storRef = this.firebaseApp.storage().ref('images/'+item.$key);
    storRef.putString(item.imageurl,'data_url').then(() => storRef.getDownloadURL().then((url) => {
    		postRef.update({imageurl:url})
    		}
    	).catch((e) => {})
    )
  }

  public onChange(file: File){
  	
  	let reader = new FileReader();
  	reader.addEventListener('load', () => {
  		console.log('pick image')
  		this.file = file;
  		this.decoded = reader.result;
  		this.club.imageurl = reader.result;
  	}
  		)
  	reader.readAsDataURL(file);
  	
  }
  	public viewDetail(item){
  		this.clubview.name = item.name;
  		this.clubview.description = item.description;
  		this.clubview.imageurl = item.imageurl;
  		this.clubview.$key = item.$key;
  	}

  
  
  

 


}



