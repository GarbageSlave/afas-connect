import { IAfasConfig, TUpdateConnectorName, TAfasRestResponse } from '../models/index';
import Connector from './Connector';

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
  public async insert(updateConnectorName: TUpdateConnectorName, payload: object) {
    try {
      return await this.http(this.connectorUrl + updateConnectorName, 'POST', payload);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates a record
   * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
   * @param payload {object} valid AFAS JSON payload
   * 
   * @returns for certain UpdateConnectors it returns an ID in either string or object, for others it returns nothing
   */
  public async update(updateConnectorName: TUpdateConnectorName, payload: object) {
    try {
      return await this.http(this.connectorUrl + updateConnectorName, 'PUT', payload);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Deletes a record
   * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
   * @param payload {string} URL param string, example: /KnAppointment/ApId/11.
   * 
   * @returns for certain UpdateConnectors it returns an ID in either string or object, for others it returns nothing
   */
  public async delete(updateConnectorName: TUpdateConnectorName, payload: string) {
    try {
      return await this.http(this.connectorUrl + updateConnectorName + payload, 'DELETE');
    } catch (error) {
      throw error;
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
  public async insertSubUpdateMain(updateConnectorName: TUpdateConnectorName, subUpdateConnectorName: string, payload: object) {
    try {
      return await this.http(
        this.connectorUrl + updateConnectorName + '/' + subUpdateConnectorName,
        'POST',
        payload,
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Fetch the metadata of an UpdateConnector
   * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
   * 
   * @returns { skip: number, take: number, rows: object[] }
   */
  public async metainfo(updateConnectorName: TUpdateConnectorName): Promise<TAfasRestResponse> {
    try {
      return await this.http(this.metainfoUrl + 'update/' + updateConnectorName, 'GET');
    } catch (error) {
      throw error;
    }
  }
}
