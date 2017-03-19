import { Inject,Component } from '@angular/core';
import { FirebaseApp, AngularFire } from 'angularfire2';
import * as firebase from 'firebase/app';

class ClubModel {
  public constructor (
      public name: string = null,
      public description: string = null,
      public imageurl: string = null,
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

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styleUrls:['./app.component.css'],
})


export class AppComponent {
  title = 'Club list view';
  club = new ClubModel();
  clubview = new ClubModel();
  model = new ClubModel('', '', '');
  uploadTask;
  submitted = false;
  af : any;
  firebaseApp: firebase.app.App;
  viewitems: any[] = new Array<any>();
  viewitemkeys: any[] = new Array<any>();
  viewsubscriber;
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

  }
  public viewitemsworkerchanged = (item,prev) =>{
	    		console.log(prev+' '+item.key+' '+ JSON.stringify(item.val()) ) ;
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

  constructor(af: AngularFire, @Inject(FirebaseApp) firebaseApp: any ) {

    this.af = af;
    this.firebaseApp = firebaseApp;

    this.af.auth.login();
    this.firebaseApp.auth().onAuthStateChanged((state) =>
    {
    	if(state && state.uid){
	    	console.log(JSON.stringify(state));
	    	if(!this.viewsubscriber)
	    	{
	    		this.viewsubscriber = this.firebaseApp.database().ref('clubs').on('child_added',this.viewitemsworker);
	    		this.viewsubscriber = this.firebaseApp.database().ref('clubs').on('child_changed',this.viewitemsworkerchanged);
	    	}

    	}

    })

  }

  	public viewDetail(key){
  		this.clubview.$key = key;
  	}

  editItem(key,item){
    if(this.model.$key != key)
    {
      this.submitted = false;
      this.model.$key = key;
      this.model.name = item.name;
      this.model.preview = null;
      this.model.imageurl = item.imageurl;
      this.model.description = item.description;
      this.uploadTask = null;
    }
  }

  onSubmit() {
    console.log('submitted '+JSON.stringify(this.model));
   	this.submitted = true; 
    let postRef;
    if(!this.model.$key){
      postRef = this.firebaseApp.database().ref('clubs').push();
      this.model.$key = postRef.key;
    }
    else{
      postRef = this.firebaseApp.database().ref('clubs/'+this.model.$key)
    }
    let storRef = this.firebaseApp.storage().ref('images/'+this.model.$key);

    console.log('submitted '+JSON.stringify(this.model))

    postRef.update({name: this.model.name, description: this.model.description, timestamp:{'.sv': "timestamp"}});

    if(!this.model.preview)
    {
      console.log('preview  == null')
      return 0;
    }

    if(this.uploadTask)
    {
      try{
        this.uploadTask.cancel();
      }
      catch(e){
        console.log(e)
      }
    }

    this.uploadTask = storRef.putString(this.model.preview,'data_url')
    this.uploadTask.then(()=>{
      console.log('uploaded '+'gs://'+storRef.bucket+'/'+storRef.fullPath);
      postRef.update({imageurl:'gs://'+storRef.bucket+'/'+storRef.fullPath});
      this.uploadTask = null;
      postRef.update({timestamp:{'.sv': "timestamp"}});
    }).catch((e)=>{console.log()});
    return 0;
	}

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
