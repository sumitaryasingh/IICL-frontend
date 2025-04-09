export interface BatchData {
    course: string;
    time: string;
    franchiseId?: string;
}
export declare const addBatch: (data: BatchData) => Promise<any>;
export declare const fetchBatchOptions: (franchiseId: string) => Promise<BatchData[]>;
