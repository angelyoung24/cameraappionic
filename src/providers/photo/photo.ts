import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';

class Photo {
  data: any;
}

/*
  Generated class for the PhotoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PhotoProvider {
  public photos: Photo[] = [];

  constructor(private camera: Camera, private storage: Storage) {
  }

  loadSaved() {
    this.storage.get('photos').then((photos) => {
      this.photos = photos || [];
    });
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // add new photos
      this.photos.unshift({
        data: 'data:image/jpeg;base64,' + imageData
      });

    // saves photos
    this.storage.set('photos', this.photos);
    }, (err) => {
    // error handler
      console.log("Camera issue:" + err);
      });
  }
  
}

