import { IAfasConnectorConfig, TUpdateConnectorName } from '../models/index';
import Connector from './Connector';
export default class UpdateConnector extends Connector {
    constructor(AfasConfig: IAfasConnectorConfig);
    /**
     * Inserts record
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example: "KnAppointment"
     * @param payload {object} valid AFAS JSON string
     */
    insert(updateConnectorName: TUpdateConnectorName, payload: object): Promise<any>;
    /**
     * Updates record
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
     * @param payload {object} valid AFAS JSON string
     */
    update(updateConnectorName: TUpdateConnectorName, payload: object): Promise<any>;
    /**
     * Deletes record
     * @param updateConnectorName {TUpdateConnectorName} UpdateConnector name, example "KnAppointment"
     * @param payload {object} URL param string, example: /KnAppointment/ApId/11.
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
     * @param payload {object} valid AFAS object
     */
    insertSubUpdateMain(updateConnectorName: TUpdateConnectorName, subUpdateConnectorName: string, payload: object): Promise<any>;
    metainfo(updateConnectorName: TUpdateConnectorName): Promise<any>;
}
