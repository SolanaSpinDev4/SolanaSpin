import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WheelService } from './Services/wheel.service';
import {VgApiService, VgCoreModule} from '@videogular/ngx-videogular/core';

@Component({
    standalone: true,
    imports: [CommonModule, VgCoreModule],
    selector: 'video-component',
    template: `
        <div>
        <vg-player (onPlayerReady)="onPlayerReady($event)">
            <video class="main-video">
                <source [src]="videoUrl" type="video/mp4">
            </video>
        </vg-player>
</div>
        `,
})
export class VideoComponent implements OnInit {

    private wheelService = inject(WheelService);
    public videoUrl : string = "";
    api: VgApiService = new VgApiService();
    
    ngOnInit(): void {
        this.GetWheel();
    }

    private async GetWheel() {
        let wheel = await this.wheelService.getWheelAsync();
        this.videoUrl = wheel.remoteVideoStartUrls[0];
    }

    onPlayerReady(api: VgApiService) {
        this.api = api;
    }
}