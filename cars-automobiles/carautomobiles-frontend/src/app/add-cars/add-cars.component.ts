import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CarsService } from '../cars.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ListCarsComponent } from '../list-cars/list-cars.component';

@Component({
  selector: 'app-add-cars',
  templateUrl: './add-cars.component.html',
  styleUrls: ['./add-cars.component.css']
})
export class AddCarsComponent implements OnInit {


  addCar: FormGroup;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  imgUrl : string = null;
  onInit;
  isActive: boolean = false;

  constructor(private carService: CarsService, private route: Router, private _snackBar: MatSnackBar) {
    this.addCar = new FormGroup({
      carName: new FormControl('', { validators: [Validators.required] }),
      modelName: new FormControl('', { validators: [Validators.required] }),
      image: new FormControl('', { validators: [Validators.required] }),
      price:  new FormControl('', { validators: [Validators.required] }),
      description: new FormControl('', { validators: [Validators.required] })
    })
  }

  ngOnInit() {
    this.onInit = false;
    this.isActive = false;
    var carInfo = JSON.parse(sessionStorage.getItem('carInfo'))
    if(carInfo){
      this.carService.getCar(carInfo).subscribe(response=>{
        console.log(response)
        this.isActive = true;
        this.imgUrl = response['image_url']
        this.addCar.patchValue({
          carName: response['car_name'], 
          modelName: response['model'],
          price: response['price'],
          description: response['description']
        });
      })
    }
  }

  update(){
    var carInfo = JSON.parse(sessionStorage.getItem('carInfo'))

    this.carService.updateCar({
      'car_name': carInfo['car_name'],
      'model': carInfo['model'],
      'change':{
        'car_name': this.addCar.get('carName').value,
        'model': this.addCar.get('modelName').value,
        'image_url': this.imgUrl,
        'description': this.addCar.get('description').value,
        'price': this.addCar.get('price').value
        
      }
    }).subscribe(response=>{
      if(response['status']){
        this._snackBar.open(response['message'], 'ok', {
          duration: 30000
        });
        sessionStorage.removeItem('carInfo')
        this.route.navigate([''])
       
      }else{
        this._snackBar.open(response['message'], 'ok', {
          duration: 30000
        });
      }
    })
  }

  delete(){
    this.carService.deleteCar({  'car_name': this.addCar.get('carName').value,
    'model': this.addCar.get('modelName').value}).subscribe(response=>{
      if(response['status']){
        this._snackBar.open(response['message'], 'ok', {
          duration: 30000
        });
        sessionStorage.removeItem('carInfo')
        this.route.navigate([''])
        
      }else{
        
        this._snackBar.open(response['message'], 'ok', {
          duration: 30000
        });
      }
    });
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.previewImage();
  }

  previewImage() {
    var imageType = this.fileData.type;
    if (imageType.match(/image\/*/) == null) {
      return;
    }
    var image = new FileReader();
    image.readAsDataURL(this.fileData);
    image.onload = (_event) => {
      console.log(image.result);
      this.previewUrl = image.result;
      var splitted = this.previewUrl.split(",");
      console.log('checl'+splitted[1]);
      console.log('chec2'+this.addCar.get('carName').value);
      var randomNumb = this.getRandomInt(3000)
      this.carService.saveImgToS3({'imgBase64':splitted[1],
      'fileName': this.addCar.get('carName').value +'-'+ this.addCar.get('modelName').value+'-'+randomNumb }).subscribe(response=>{
        this.imgUrl = response['imgUrl']
        console.log('url:'+this.imgUrl)
      })
    }
  }

   getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  onSubmit() {
    
    if (this.addCar.invalid) {
      console.log('dfdgfcbdfg')
      this.onInit = true;
    }
    else {

      const formData = new FormData();
      formData.append('file', this.fileData);
      this.carService.insertCar({
        'car_name': this.addCar.get('carName').value,
        'model': this.addCar.get('modelName').value,
        'image_url': this.imgUrl,
        'description': this.addCar.get('description').value,
        'price': this.addCar.get('price').value
        
      }).subscribe(response=>{
        if(response['status']){
          this._snackBar.open(response['message'], 'ok', {
            duration: 30000
          });
          sessionStorage.removeItem('carInfo')

          this.route.navigate([''])
          
        }else{
          this._snackBar.open(response['message'], 'ok', {
            duration: 30000
          });
        }
      })
    }

  }


}
