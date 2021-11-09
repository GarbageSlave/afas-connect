import { IAfasConfig } from '../models';
import Connector from './Connector';

export default class GetConnector extends Connector {
  constructor(AfasConfig: IAfasConfig) {
    super({...AfasConfig, type: 'soap'});
  }

  /**
   * Gets current profit version
   */
  public async version(): Promise<{version: string}> {
    try {
      return await this.http(this.afasUrl + 'profitversion', 'GET');
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets a file from AFAS
   * @param fileId {string} ID of a file in AFAS
   * @param fileName {string} Filename of a file in AFAS
   * 
   */
  public async file(fileId: string, fileName: string): Promise<any> {
    try {
      return await this.http(this.afasUrl + 'fileconnector/' + encodeURI(fileId) + '/' + encodeURI(fileName), 'GET');
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets an image from AFAS
   * @param format 0: original, 1: thumbnail, 2: medium, sets image format
   * @param imageId {string} ID of image in AFAS
   * 
   */
  public async image(format: 0 | 1 | 2, imageId: string): Promise<any> {
    try {
      return await this.http(this.afasUrl + 'imageconnector/' + imageId + '?format=' + format, 'GET');
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets a subject from AFAS
   * @param subjectId {string} ID of subject in AFAS
   * @param fileId {string} ID of file in AFAS
   */
  public async subject(subjectId: string, fileId: string): Promise<any> {
    try {
      return await this.http(
        this.afasUrl + 'subjectconnector/' + encodeURI(subjectId) + '/' + encodeURI(fileId),
        'GET',
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets report from AFAS
   * @param reportId {string} ID of report in AFAS
   * @param additionalFilter {string} filters could be: /parsetid/paramid,paramid,../value,value,.. or ?filterfieldids=fieldid,fieldid&filtervalues=value,value&operatortypes=type,type or ?filterjson=json
   */
  public async report(reportId: string, additionalFilter: string): Promise<{data: string}> {
    try {
      return await this.http(this.afasUrl + 'reportconnector/' + encodeURI(reportId) + additionalFilter, 'GET');
    } catch (error) {
      throw error;
    }
  }
}
