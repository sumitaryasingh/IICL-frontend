export interface BatchData {
    _id: string;
    course: string;
    time: string;
    franchiseId?: string;
}
export declare const addBatch: (data: BatchData) => Promise<any>;
export declare const deleteBatchData: (batchId: string) => Promise<any>;
export declare const fetchBatchOptions: (franchiseId: string) => Promise<BatchData[]>;
export declare const getBatchById: (id: string) => Promise<BatchData>;
export declare const updateBatch: (id: string, data: BatchData) => Promise<any>;
