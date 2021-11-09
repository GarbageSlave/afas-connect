import { IAfasConfig, TUpdateConnectorName, TAfasRestDataResponse } from '../models/index';
import Connector from './Connector';
export default class UpdateConnector extends Connector {
    constructor(AfasConfig: IAfasConfig);
    /**
     * Inserts a record
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example: "KnAppointment"
     * @param payload {object} valid AFAS JSON payload
     *
     * @returns for certain UpdateConnectors it returns an ID in either string or object, for others it returns nothing
     */
    insert(updateConnectorName: TUpdateConnectorName, payload: object): Promise<any>;
    /**
     * Updates a record
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
     * @param payload {object} valid AFAS JSON payload
     *
     * @returns for certain UpdateConnectors it returns an ID in either string or object, for others it returns nothing
     */
    update(updateConnectorName: TUpdateConnectorName, payload: object): Promise<any>;
    /**
     * Deletes a record
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
     * @param payload {string} URL param string, example: /KnAppointment/ApId/11.
     *
     * @returns for certain UpdateConnectors it returns an ID in either string or object, for others it returns nothing
     */
    delete(updateConnectorName: TUpdateConnectorName, payload: string): Promise<any>;
    /**
     * Inserts sub record, updates main record
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
     * @param subUpdateConnectorName {string} sub UpdateConnector name, example "KnAppointmentLines"
     * @param payload {object} valid AFAS JSON payload
     *
     * @returns for certain UpdateConnectors it returns an ID in either string or object, for others it returns nothing
     */
    insertSubUpdateMain(updateConnectorName: TUpdateConnectorName, subUpdateConnectorName: string, payload: object): Promise<any>;
    /**
     * Fetch the metadata of an UpdateConnector
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
     *
     * @returns { skip: number, take: number, rows: object[] }
     */
    metainfo(updateConnectorName: TUpdateConnectorName): Promise<TAfasRestDataResponse>;
}
