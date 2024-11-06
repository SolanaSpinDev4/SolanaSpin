import { Injectable } from "@angular/core";
import { Wheel } from "../Structures/Wheel";

@Injectable({
    providedIn: "root",
})
export class WheelService {
    public async getWheelAsync() : Promise<Wheel> {
        let wheel: Wheel = {
            isLoaded: false,
            dice: null,
            remoteVideoStartUrls: [
                "https://solanaspin.io/videos/start/S_W_Separate_Wood_Start_Gift_Box_640X360.mp4",
                "https://solanaspin.io/videos/start/S_W_Separate_Wood_Start_No_Win_A_640X360.mp4",
                "https://solanaspin.io/videos/start/S_W_Separate_Wood_Start_No_Win_B_640X360.mp4",
                "https://solanaspin.io/videos/start/S_W_Separate_Wood_Start_No_Win_C_640X360.mp4",
                "https://solanaspin.io/videos/start/S_W_Separate_Wood_Start_Ticket_640X360.mp4",
                "https://solanaspin.io/videos/start/S_W_Separate_Wood_Start_X1A_640X360.mp4",
                "https://solanaspin.io/videos/start/S_W_Separate_Wood_Start_X1B_640X360.mp4",
                "https://solanaspin.io/videos/start/S_W_Separate_Wood_Start_X1C_640X360.mp4",
                "https://solanaspin.io/videos/start/S_W_Separate_Wood_Start_X1D_640X360.mp4",
                "https://solanaspin.io/videos/start/S_W_Separate_Wood_Start_X2A_640X360.mp4",
                "https://solanaspin.io/videos/start/S_W_Separate_Wood_Start_X2B_640X360.mp4",
                "https://solanaspin.io/videos/start/S_W_Separate_Wood_Start_X2C_640X360.mp4",
                "https://solanaspin.io/videos/start/S_W_Separate_Wood_Start_X5A_640X360.mp4",
                "https://solanaspin.io/videos/start/S_W_Separate_Wood_Start_X5B_640X360.mp4",
            ],
            remoteVideoStopUrls: [
                "https://solanaspin.io/videos/stop/S_W_Separate_Wood_Stop_Gift_Box_640X360.mp4",
                "https://solanaspin.io/videos/stop/S_W_Separate_Wood_Stop_No_Win_A_640X360.mp4",
                "https://solanaspin.io/videos/stop/S_W_Separate_Wood_Stop_No_Win_B_640X360.mp4",
                "https://solanaspin.io/videos/stop/S_W_Separate_Wood_Stop_No_Win_C_640X360.mp4",
                "https://solanaspin.io/videos/stop/S_W_Separate_Wood_Stop_Ticket_640X360.mp4",
                "https://solanaspin.io/videos/stop/S_W_Separate_Wood_Stop_X1A_640X360.mp4",
                "https://solanaspin.io/videos/stop/S_W_Separate_Wood_Stop_X1B_640X360.mp4",
                "https://solanaspin.io/videos/stop/S_W_Separate_Wood_Stop_X1C_640X360.mp4",
                "https://solanaspin.io/videos/stop/S_W_Separate_Wood_Stop_X1D_640X360.mp4",
                "https://solanaspin.io/videos/stop/S_W_Separate_Wood_Stop_X2A_640X360.mp4",
                "https://solanaspin.io/videos/stop/S_W_Separate_Wood_Stop_X2B_640X360.mp4",
                "https://solanaspin.io/videos/stop/S_W_Separate_Wood_Stop_X2C_640X360.mp4",
                "https://solanaspin.io/videos/stop/S_W_Separate_Wood_Stop_X5A_640X360.mp4",
                "https://solanaspin.io/videos/stop/S_W_Separate_Wood_Stop_X5B_640X360.mp4",
            ],
            blobVideoStartUrls: [] as string[],
            blobVideoStopUrls: [] as string[],
        }
        await Promise.all([
            async () => wheel.blobVideoStartUrls = await this.downloadToBlobUrlsAsync(wheel.remoteVideoStartUrls),
            async () => wheel.blobVideoStopUrls = await this.downloadToBlobUrlsAsync(wheel.remoteVideoStopUrls),
        ]);
        return wheel;
    }

    private async downloadToBlobUrlsAsync(urls: string[]): Promise<string[]> {
        try {
            const blobUrls = await Promise.all(urls.map(url => this.downloadToBlobUrlAsync(url)));
            console.log('All videos downloaded successfully');
            return blobUrls;
        } catch (error) {
            console.error('Error downloading videos:', error);
            throw error;
        }
    }

    private async downloadToBlobUrlAsync(url: string): Promise<string> {
        let response = await fetch(url);
        let blob = await response.blob();
        return URL.createObjectURL(blob);
    }
}
