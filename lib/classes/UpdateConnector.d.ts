import { IAfasConnectorConfig, TUpdateConnectorName } from '../models/index';
import Connector from './Connector';
export default class UpdateConnector extends Connector {
    constructor(AfasConfig: IAfasConnectorConfig);
    /**
     * Inserts record
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example: "KnAppointment"
     * @param payload {string} valid AFAS JSON string
     */
    insert(updateConnectorName: TUpdateConnectorName, payload: string): Promise<any>;
    /**
     * Updates record
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
     * @param payload {string} valid AFAS JSON string
     */
    update(updateConnectorName: TUpdateConnectorName, payload: string): Promise<any>;
    /**
     * Deletes record
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
     * @param payload {string} URL param string, example: /KnAppointment/ApId/11.
     */
    delete(updateConnectorName: TUpdateConnectorName, payload: string): Promise<any>;
    /**
     * Deletes record
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
     * @param id {string} example SbId
     * @param idValue {string} example "24"
     */
    /**
     * Inserts sub record, updates main record
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
     * @param subUpdateConnectorName {string} sub UpdateConnector name, example "KnAppointmentLines"
     * @param payload {string} valid AFAS JSON string
     */
    insertSubUpdateMain(updateConnectorName: TUpdateConnectorName, subUpdateConnectorName: string, payload: string): Promise<any>;
    metainfo(updateConnectorName: TUpdateConnectorName): Promise<any>;
}
