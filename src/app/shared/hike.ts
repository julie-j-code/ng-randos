export interface Hike {
    id:number;
    name: string;
    area: string;
    region: string;
    startingPoint: string;
    distance: number;
    distanceUnit: string;
    duration: number;
    heightDifference: number;
    description: string;
    evaluation: number;
    dateAddedAsTodo?: number;
    
}
