import { IAfasConfig, IFilterConfig, TAfasRestResponse } from '../models';
import Connector from './Connector';

export default class GetConnector extends Connector {
  constructor(AfasConfig: IAfasConfig) {
    super({...AfasConfig, type: 'rest'});
  }

  private parseConfig(config: IFilterConfig): string {
    try {
      let result = '';

      // check if there are keys in the config
      if (Object.keys(config || {}).length) {
        // If there are, initiate the string with a ? to start adding queries
        result = '?';

        // set skip query
        if (config.skip) {
          result += 'skip=' + config.skip + '&';
        }
        // set take query
        if (config.take) {
          result += 'take=' + config.take + '&';
        }

        // Sort on field query

        if (config.orderby?.length) {
          let sortResult = 'orderbyfieldids=';

          for (const el of config.orderby) {
            if (el.order === 'DESC'){
              sortResult += '-' + el.fieldId + '&'
            } else {
              sortResult += el.fieldId + '&'
            }
          }

          result = result + sortResult;
        }

        // filter query

        if (config.filter?.length) {
          let filterfieldidsResult = ''
          let filtervaluesResult = ''
          let operatortypesResult = ''

          const orDepth:{id: string, filtervalue: string, operatortype: number}[][] = [];
          for (const [i, filter] of config.filter.entries()) {
            const comma = (i < config.filter.length - 1) ? ',' : ''

            filterfieldidsResult += filter.filterfieldid + comma
            filtervaluesResult += filter.filtervalue + comma
            operatortypesResult += filter.operatortype + comma

            if (filter.or?.length) {
              for (const [iJ, orFilter] of filter.or.entries()) {
                if (!(orDepth[iJ] instanceof Array)) {
                  orDepth[iJ] = []
                }
                orDepth[iJ].push({...orFilter, id: filter.filterfieldid})
              }
            }
          }

          // handle ORs
          if (orDepth.length) {
            for (const or of orDepth) {
              filterfieldidsResult += ';'
              filtervaluesResult += ';'
              operatortypesResult += ';'
              for (let iJ = 0; iJ < or.length; iJ++) {
                const filter = or[iJ];
                const comma = (iJ < or.length - 1) ? ',' : ''
                filterfieldidsResult += filter.id + comma
                filtervaluesResult += filter.filtervalue + comma
                operatortypesResult += filter.operatortype + comma
              }
            }
          }
          result += `filterfieldids=${filterfieldidsResult}&filtervalues=${filtervaluesResult}&operatortypes=${operatortypesResult}`
        }

      // JSONfilter query
      // check if the property exists
      if (Object.keys(config.jsonFilter || {}).length) {
        result = result + 'filterjson=' + encodeURI(JSON.stringify(config.jsonFilter));
      }
    }

    return encodeURI(result);

    } catch (error) {
      throw error;
    }
  }

  /**
   * Get data from GetConnector
   * @param getConnectorName {string} GetConnector name, example: Profit_Article
   * @param config {IFilterConfig} Filter config
   * 
   * @returns { skip: number, take: number, rows: object[] }
   */
  public async get(getConnectorName: string, config?: IFilterConfig): Promise<TAfasRestResponse> {
    try {
      return await this.http(this.connectorUrl + getConnectorName + this.parseConfig(config || {}), 'GET');
    } catch (error) {
      throw error;
    }
  }

  /**
   * Fetch the metadata of a GetConnector
   * @param getConnectorName {string} GetConnector name, example: Profit_Article
   * 
   * @returns { skip: number, take: number, rows: object[] }
   */
  public async metainfo(getConnectorName:string): Promise<TAfasRestResponse> {
    try {
      return await this.http(this.metainfoUrl + 'get/' + getConnectorName, 'GET');
    } catch (error) {
      throw error;
    }
  }
}
