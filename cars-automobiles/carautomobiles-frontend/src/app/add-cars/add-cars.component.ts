import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

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
  onInit;

  constructor() {
    this.addCar = new FormGroup({
      carName: new FormControl('', { validators: [Validators.required] }),
      modelName: new FormControl('', { validators: [Validators.required] }),
      image: new FormControl('', { validators: [Validators.required] }),
      description: new FormControl('', { validators: [Validators.required] })
    })
  }

  ngOnInit() {
    this.onInit = false;
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
      console.log(splitted);
    }
  }

  onSubmit() {
    if (this.addCar.invalid) {
      this.onInit = true;
    }
    else {
      const formData = new FormData();
      formData.append('file', this.fileData);
    }

  }


}
