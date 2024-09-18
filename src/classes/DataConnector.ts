import { IAfasConfig, TImageSizes, ImageSizes } from '../models';
import Connector from './Connector';
import { ProfitError } from './ProfitError';

export default class DataConnector extends Connector {
  constructor(AfasConfig: IAfasConfig) {
    super({...AfasConfig, type: 'rest'});
  }

  /**
   * Gets current profit version
   */
  public async version(): Promise<{version: string}> {
    try {
      return await this.http(this.afasUrl + 'profitversion', 'GET');
    } catch (error:any) {
      throw new ProfitError('An error occured trying to get the AFAS version', error);
    }
  }

  /**
   * Gets a file from AFAS
   * @param fileId {string} ID of a file in AFAS
   * @param fileName {string} Filename of a file in AFAS
   * @param binary {boolean} If true, will return the file in binary instead of { filedata, mimetype }
   * 
   */
  public async file(fileId: string | number, fileName: string, binary: boolean = false): Promise<any> {
    try {
      return await this.http(this.afasUrl + 'fileconnector/' + encodeURIComponent(fileId) + '/' + encodeURIComponent(fileName), 'GET', undefined, { SendFileAsBinary : binary ? "1" : "0" });
    } catch (error:any) {
      throw new ProfitError('An error occured trying to get a file', error);
    }
  }

  /**
   * Gets an image from AFAS
   * @param format 0: original, 1: thumbnail, 2: medium, sets image format
   * @param imageId {string} ID of image in AFAS
   * @param binary {boolean} If true, will return the file in binary instead of { filedata, mimetype }
   * 
   */
  public async image(format: TImageSizes | ImageSizes, imageId: string | number, binary: boolean = false): Promise<any> {
    try {
      return await this.http(this.afasUrl + 'imageconnector/' + imageId + '?format=' + format, 'GET', undefined, { SendFileAsBinary : binary ? "1" : "0" });
    } catch (error:any) {
      throw new ProfitError('An error occured trying get an image', error);
    }
  }

  /**
   * Gets a subject from AFAS
   * @param subjectId {string} ID of subject in AFAS
   * @param fileId {string} ID of file in AFAS
   */
  public async subject(subjectId: string | number, fileId: string | number): Promise<any> {
    try {
      return await this.http(
        this.afasUrl + 'subjectconnector/' + encodeURIComponent(subjectId) + '/' + encodeURIComponent(fileId),
        'GET',
      );
    } catch (error:any) {
      throw new ProfitError('An error occured trying to get a subject', error);
    }
  }

  /**
   * Gets report from AFAS
   * @param reportId {string} ID of report in AFAS
   * @param additionalFilter {string} filters could be: /parsetid/paramid,paramid,../value,value,.. or ?filterfieldids=fieldid,fieldid&filtervalues=value,value&operatortypes=type,type or ?filterjson=json
   * @param binary {boolean} If true, will return the file in binary instead of { filedata, mimetype }
   */
  public async report(reportId: string | number, additionalFilter: string, binary: boolean = false): Promise<{data: string}> {
    try {
      return await this.http(this.afasUrl + 'reportconnector/' + encodeURIComponent(reportId) + additionalFilter, 'GET', undefined, { SendFileAsBinary : binary ? "1" : "0" });
    } catch (error:any) {
      throw new ProfitError('An error occured trying to get a report', error);
    }
  }
}
