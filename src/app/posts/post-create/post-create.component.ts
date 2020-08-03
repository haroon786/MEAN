import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { IPost } from "../post-modal/post";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { PostsService } from "../PostService/posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { mimeType } from "../post-create/mime-type.validator";
@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent implements OnInit {
  postcreated: any;
  private mode = "create";
  private postId: string;
  post: IPost;
  imagePreview: any;
  isLoading = false;
  form: FormGroup;

  constructor(
    private postservice: PostsService,
    private route: ActivatedRoute
  ) {
    console.log(`post  create constructor`);
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, {
        validators: [Validators.required],
      }),
      image: new FormControl(null, {
       
        asyncValidators: [mimeType],
      }),
    });
    this.route.paramMap.subscribe((parammap: ParamMap) => {
      if (parammap.has("postId")) {
        this.mode = "edit";
        this.postId = parammap.get("postId");
        this.isLoading = true;
        this.postservice.getSinglePost(this.postId).subscribe((postdata) => {
          this.isLoading = false;
          this.post = {
            id: postdata._id,
            title: postdata.title,
            content: postdata.content,
            imagePath: postdata.imagePath
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image:this.post.imagePath
          });
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: false });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode == "create") {

      this.postservice.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
      this.form.reset();
    } else {
      this.postservice.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    }
  }
}
