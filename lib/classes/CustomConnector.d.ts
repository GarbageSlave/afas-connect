import { IAfasConfig } from '../models';
import Connector from './Connector';
export default class GetConnector extends Connector {
    constructor(AfasConfig: IAfasConfig);
    /**
     * @returns Profit version
     */
    version(): Promise<any>;
    /**
     * Gets a file from AFAS
     * @param fileId {string} ID of a file in AFAS
     * @param fileName {string} Filename of a file in AFAS
     *
     * @returns
     */
    file(fileId: string, fileName: string): Promise<any>;
    /**
     * Gets an image from AFAS
     * @param format 0: original, 1: thumbnail, 2: medium, sets image format
     * @param imageId {string} ID of image in AFAS
     */
    image(format: 0 | 1 | 2, imageId: string): Promise<any>;
    /**
     * Gets a subject from AFAS
     * @param subjectId {string} ID of subject in AFAS
     * @param fileId {string} ID of file in AFAS
     */
    subject(subjectId: string, fileId: string): Promise<any>;
    /**
     *
     * @param reportId {string} ID of report in AFAS
     * @param additionalFilter {string} filters could be: /parsetid/paramid,paramid,../value,value,.. or
     *                                           ?filterfieldids=fieldid,fieldid&filtervalues=value,value&operatortypes=type,type or
     *                                           ?filterjson=json
     */
    report(reportId: string, additionalFilter: string): Promise<any>;
}
