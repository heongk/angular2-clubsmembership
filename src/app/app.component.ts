import { Inject,Component } from '@angular/core';
import { FirebaseAuthState ,FirebaseApp, AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { BehaviorSubject} from 'rxjs/BehaviorSubject'
import {	AsyncSubject } from 'rxjs/AsyncSubject'
import {	ReplaySubject } from 'rxjs/ReplaySubject'
import { Subject} from 'rxjs/Subject'
import {Subscriber }  from 'rxjs/Subscriber'

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import 'rxjs/add/observable/interval';
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
    

<div class="container">
  <div [hidden]="submitted">
    <h1>Club form</h1>
    <form (ngSubmit)="onSubmit()" #clubForm="ngForm">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name"
               required
               [(ngModel)]="model.name" name="name"
               #name="ngModel">
        <div [hidden]="name.valid || name.pristine"
             class="alert alert-danger">
          Name is required
        </div>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
               [(ngModel)]="model.description" name="description">
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <input type='file' class="form-control" id="image"
                required accept="image/png,image/gif,image/jpeg"
                [(ngModel)]="model.imageurl" name="image"
                #image="ngModel" (change)='updatePreview($event.target.files[0])' style="padding:unset">
		<img [hidden]="image.invalid || image.pristine || !model.preview" src='{{model.preview}}' style="max-width:100%;max-height:100%;">                
        <div [hidden]="image.valid || image.pristine" class="alert alert-danger">
          Power is required
        </div>
      </div>

      <button type="submit" class="btn btn-success" [disabled]="!clubForm.form.valid">Submit</button>
      <button type="button" class="btn btn-default" (click)="newClub(); clubForm.reset()">New Club</button>
      <i>with</i> reset

     
    </form>
  </div>

  <div [hidden]="!submitted">
    <h2>You submitted the following:</h2>
    <div class="row">
      <div class="col-xs-3">Name</div>
      <div class="col-xs-9  pull-left">{{ model.name }}</div>
    </div>
    <div class="row">
      <div class="col-xs-3">Description</div>
      <div class="col-xs-9 pull-left">{{ model.description }}</div>
    </div>
    <div class="row">
      <div class="col-xs-3">Image</div>
      <div class="col-xs-9 pull-left">{{ model.imageurl }}</div>
      <img [hidden]="!model.preview" src='{{model.preview}}' style="max-width:100%;max-height:100%;">                
    </div>
    <br>
    <button class="btn btn-primary" (click)="submitted=false">Edit</button>
  </div>
</div>

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
  <md-list-item  style="max-height:inherit;width:100%" *ngFor="let key of viewitemkeys">
     <a md-line >{{ viewitems[key].name }}</a>
     <img md-list-avatar src='{{viewitems[key].imageurl}}' style="max-height:inherit;max-width:inherit;">
     <button md-icon-button (click)="viewDetail(viewitems[key])">
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
<md-grid-list rowHeight="1:1" style="" cols="{{ 4}}"  *ngIf='activated'>
<md-grid-tile  *ngFor="let key of viewitemkeys">

<div class="club-card" *ngIf='viewitems.hasOwnProperty(key)' style.background-image="{{'url(' + viewitems[key].imageurl + ')'}}"  style="width:100%;height:100%;background-repeat:no-repeat; background-position:center center;background-size:cover;" >
      <md-grid-tile-header>{{viewitems[key].name}}</md-grid-tile-header>
  
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
styleUrls:['./app.component.css'],
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
  //items: FirebaseListObservable<any[]>;
  items : Observable<any[]>;

  viewitems: any[] = new Array<any>();
  viewitemkeys: any[] = new Array<any>();
  viewsubscriber ;
  activated: boolean = true;


  public viewitemsworker = (item,prev) =>{
	    		console.log(prev+' '+item.key+' '+ JSON.stringify(item.val()) ) ;
	    		this.viewitemkeys.push(item.key);
	    		this.viewitems[item.key] = item.val();
	    		if(item.val() && item.val().imageurl)
	    		{
	    			let storRef = this.firebaseApp.storage().ref('images/'+item.key);
					storRef.getDownloadURL().then((url) => {
							console.log(item.val().imageurl+' was resolved to '+url);
							this.viewitems[item.key].imageurl = url;
						}).catch((e) => {console.log(item.val().imageurl+' was unresolved '+e);})
    					
	    		}
	    		console.log(Object.keys(this.viewitems).length);//item.val();
	    		
  }
  public viewitemsworkerchanged = (item,prev) =>{
	    		console.log(prev+' '+item.key+' '+ JSON.stringify(item.val()) ) ;
	    		if(item.val() && item.val().imageurl)
	    		{
	    			let storRef = this.firebaseApp.storage().ref('images/'+item.key);
					storRef.getDownloadURL().then((url) => {
							console.log(item.val().imageurl+' was resolved to '+url);
							this.viewitems[item.key].imageurl = url;
						}).catch((e) => {console.log(item.val().imageurl+' was unresolved '+e);})
    					
	    		}
	    		console.log(Object.keys(this.viewitems).length);//item.val();
	    		
  }

  constructor(af: AngularFire, @Inject(FirebaseApp) firebaseApp: any ) {
  	
    this.af = af;
    this.firebaseApp = firebaseApp;
    
    this.af.auth.login();
    this.firebaseApp.auth().onAuthStateChanged((state) =>
    {
    	if(state && state.uid){
	    	console.log(JSON.stringify(state));
	    	this.items = af.database.list('clubs');
	    	if(!this.viewsubscriber)
	    	{
	    		this.viewsubscriber = this.firebaseApp.database().ref('clubs').on('child_added',this.viewitemsworker);
	    		this.viewsubscriber = this.firebaseApp.database().ref('clubs').on('child_changed',this.viewitemsworkerchanged);
	    	}
	    	
    	}

    	//let subject = new Subject();
    	//this.items = subject;
    	//let ref = this.firebaseApp.database().ref('clubs');
    	//ref.on('value',(snapshot)=>{
    			//subject.next(snapshot);
    	//}
    		//)
    })
    	
    


    
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

  
  

  model = new ClubModel('', '', '');
  uploadTask;
  submitted = false;

  onSubmit() {
  	let postRef;
  	if(!this.model.$key){
    	postRef = this.firebaseApp.database().ref('clubs').push();
    	this.model.$key = postRef.key;
    }
    else{
    	postRef = this.firebaseApp.database().ref('clubs/'+this.model.$key)
    }
    let storRef = this.firebaseApp.storage().ref('images/'+this.model.$key);
    
    postRef.update({name: this.model.name, description: this.model.description});

    if(!this.model.preview)
    {
    	console.log('preview  == null')
    	return;
    }


    if(this.uploadTask)
    {
    	this.uploadTask.cancel();
    }

    this.uploadTask = storRef.putString(this.model.preview,'data_url').then(()=>{
    	postRef.update({imageurl:'gs://'+storRef.bucket+'/'+storRef.fullPath});
    });
   	this.submitted = true; 
	}

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  newClub() {
  	this.model.reset();    
  }
  updatePreview(file: File){
  	
  	let reader = new FileReader();
  	reader.addEventListener('load', () => {
  		this.model.preview = reader.result;
  	}
  		)
  	reader.readAsDataURL(file);
  	
  }



  

  
  

  }




export class ClubModel {
	public constructor (
		  public name: string,
		  public description: string,
		  public imageurl: string,
		  public $key: string = null,
		  public preview: string = null,
		
	){}
	public reset(){
		this.name = '';
		this.description = '';
		this.imageurl = '';
		this.$key = null;
		this.preview = null;
	}
}

