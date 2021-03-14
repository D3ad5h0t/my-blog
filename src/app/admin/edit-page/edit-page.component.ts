import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PostsService } from 'src/app/shared/posts.service';
import { Post } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs/internal/Subscription';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  post?: Post;
  submitted = false;
  updateSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getById(params['id'])
      })
    ).subscribe((post: Post) => {
      this.post = post;
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      })
    })
  }

  ngOnDestroy() {
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const updatedPost = {
      ...this.post,
      title: this.form.value.title,
      text: this.form.value.text
    } as Post

    this.updateSub = this.postsService.update(updatedPost).subscribe(() => {
      this.submitted = false;
      this.alert.warning('Пост был изменен');
    })
  }

}
