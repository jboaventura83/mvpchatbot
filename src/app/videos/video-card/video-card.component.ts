import { Component, OnInit, Input } from '@angular/core';
import { Video } from 'src/app/_models/video';
import { DomSanitizer } from '@angular/platform-browser';
import { VideosService } from 'src/app/_services/videos.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css']
})
export class VideoCardComponent implements OnInit {
  @Input() video: Video;

  constructor(private sanitizer: DomSanitizer, private videosService: VideosService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    if (localStorage.getItem(`base64Image[${this.video.id}]`) === null) {
      this.loadBase64Thumbnail();
    } else {
      this.video.base64ThumbnailImage = localStorage.getItem(`base64Image[${this.video.id}]`);
    }
  }

  getTrustedImage() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64,${this.video.base64ThumbnailImage}`);
  }

  loadBase64Thumbnail() {
    this.videosService.getVideoThumbnail(this.video.id, this.video.thumbnailId).subscribe((resp: any) => {
           if (resp) {
              this.video.base64ThumbnailImage = resp.base64image;
              localStorage.setItem(`base64Image[${this.video.id}]`, resp.base64image);
           }
         }, error => {
           this.alertify.error(error);
           console.log(error);
         });
  }

}
