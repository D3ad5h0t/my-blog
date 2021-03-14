import { AlertService } from './../shared/services/alert.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  postSub?: Subscription;
  deleteSub?: Subscription;
  searchStr = '';

  constructor(
    private postsService: PostsService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.deleteSub = this.postSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    })
  }

  remove(id: string) {
    this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alert.danger('Пост был удален');
    })
  }

  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }

    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }
}
