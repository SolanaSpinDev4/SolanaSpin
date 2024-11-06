export enum FaceResultType {
    Empty = 0,
    Multiplier = 1,
    FixedAmount = 2,
    NewDicePlay = 3,
    RaffleTicket = 4
}

export class Face {
    resultType: FaceResultType;
    resultValue: string | null;
    weight: number;

    constructor(resultType: FaceResultType, resultValue: string | null, weight: number) {
        this.resultType = resultType;
        this.resultValue = resultValue;
        this.weight = weight;
    }
}

export class Dice {
    id: string;
    title: string;
    slug: string;
    isPubliclyPlayable: boolean;
    maximumPlayAmount: number | null;
    minimumPlayAmount: number | null;
    faces: Face[];

    constructor(id: string, title: string, slug: string, isPubliclyPlayable: boolean, maximumPlayAmount: number | null, minimumPlayAmount: number | null, faces: Face[]) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.isPubliclyPlayable = isPubliclyPlayable;
        this.maximumPlayAmount = maximumPlayAmount;
        this.minimumPlayAmount = minimumPlayAmount;
        this.faces = faces;
    }
}

export class Wheel {
    isLoaded: boolean = false;
    dice: Dice | null = null;
    remoteVideoStartUrls: string[] = [];
    remoteVideoStopUrls: string[] = [];
    blobVideoStartUrls: string[] = [];
    blobVideoStopUrls: string[] = [];
}
