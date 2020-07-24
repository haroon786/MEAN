import {Component,EventEmitter,Output} from '@angular/core';
import { IPost } from '../post-modal/post';
import { NgForm } from '@angular/forms';
import { PostsService } from '../PostService/posts.service';
@Component({
  selector:'app-post-create',
  templateUrl:'./post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent
{
    enteredTitle="";
    enteredContent="";
 postcreated
  constructor(private postservice:PostsService){}
  onAddPost(form:NgForm)
    {
      console.log(form.value.title,form.value.content)
     this.postservice.addPost(form.value.title,form.value.content)
     form.reset();
    }

   
}
