import { IAfasConfig } from '../models';
import Connector from './Connector';
export default class CustomConnector extends Connector {
    constructor(AfasConfig: IAfasConfig);
    /**
     * Gets current profit version
     */
    version(): Promise<{
        version: string;
    }>;
    /**
     * Gets a file from AFAS
     * @param fileId {string} ID of a file in AFAS
     * @param fileName {string} Filename of a file in AFAS
     *
     */
    file(fileId: string, fileName: string): Promise<any>;
    /**
     * Gets an image from AFAS
     * @param format 0: original, 1: thumbnail, 2: medium, sets image format
     * @param imageId {string} ID of image in AFAS
     * @param inBinary {bool} If true, will return the file in binary instead of { filedata, mimetype }
     *
     */
    image(format: 0 | 1 | 2, imageId: string, inBinary?: boolean): Promise<any>;
    /**
     * Gets a subject from AFAS
     * @param subjectId {string} ID of subject in AFAS
     * @param fileId {string} ID of file in AFAS
     */
    subject(subjectId: string, fileId: string): Promise<any>;
    /**
     * Gets report from AFAS
     * @param reportId {string} ID of report in AFAS
     * @param additionalFilter {string} filters could be: /parsetid/paramid,paramid,../value,value,.. or ?filterfieldids=fieldid,fieldid&filtervalues=value,value&operatortypes=type,type or ?filterjson=json
     */
    report(reportId: string, additionalFilter: string): Promise<{
        data: string;
    }>;
}
