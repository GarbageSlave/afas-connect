import { IAfasConfig, TUpdateConnectorName, TAfasRestDataResponse } from '../models/index';
import Connector from './Connector';
import { ProfitError } from './ProfitError';

export default class UpdateConnector extends Connector {
  constructor(AfasConfig: IAfasConfig) {
    super({...AfasConfig, type: 'rest'});
  }

  /**
   * Inserts a record
   * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example: "KnAppointment"
   * @param payload {object} valid AFAS JSON payload
   * 
   * @returns for certain UpdateConnectors it returns an ID in either string or object, for others it returns nothing
   */
  public async insert(updateConnectorName: TUpdateConnectorName, payload: Record<string, any>): Promise<any> {
    try {
      return await this.http(this.connectorUrl + updateConnectorName, 'POST', payload);
    } catch (error:any) {
      throw new ProfitError('An error occured trying to insert ' + updateConnectorName, error);
    }
  }

  /**
   * Updates a record
   * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
   * @param payload {object} valid AFAS JSON payload
   * 
   * @returns for certain UpdateConnectors it returns an ID in either string or object, for others it returns nothing
   */
  public async update(updateConnectorName: TUpdateConnectorName, payload: Record<string, any>): Promise<any> {
    try {
      return await this.http(this.connectorUrl + updateConnectorName, 'PUT', payload);
    } catch (error:any) {
      throw new ProfitError('An error occured trying to update ' + updateConnectorName, error);
    }
  }

  /**
   * Deletes a record
   * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
   * @param payload {string} URL param string, example: /KnAppointment/ApId/11.
   * 
   * @returns for certain UpdateConnectors it returns an ID in either string or object, for others it returns nothing
   */
  public async delete(updateConnectorName: TUpdateConnectorName, payload: string): Promise<any> {
    try {
      return await this.http(this.connectorUrl + updateConnectorName + payload, 'DELETE');
    } catch (error:any) {
      throw new ProfitError('An error occured trying to delete ' + updateConnectorName, error);
    }
  }

  /**
   * Inserts sub record, updates main record
   * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
   * @param subUpdateConnectorName {string} sub UpdateConnector name, example "KnAppointmentLines"
   * @param payload {object} valid AFAS JSON payload
   * 
   * @returns for certain UpdateConnectors it returns an ID in either string or object, for others it returns nothing
   */
  public async insertSubUpdateMain(updateConnectorName: TUpdateConnectorName, subUpdateConnectorName: string, payload: Record<string, any>): Promise<any> {
    try {
      return await this.http(
        this.connectorUrl + updateConnectorName + '/' + subUpdateConnectorName,
        'POST',
        payload,
      );
    } catch (error:any) {
      throw new ProfitError('An error occured trying to insert and update ' + updateConnectorName, error);
    }
  }

  /**
   * Fetch the metadata of an UpdateConnector
   * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
   * 
   * @returns { skip: number, take: number, rows: Record<string, any>[] }
   */
  public async metainfo(updateConnectorName: TUpdateConnectorName): Promise<TAfasRestDataResponse> {
    try {
      return await this.http(this.metainfoUrl + 'update/' + updateConnectorName, 'GET');
    } catch (error:any) {
      throw new ProfitError('An error occured trying to get Metainfo of ' + updateConnectorName, error);
    }
  }
}
