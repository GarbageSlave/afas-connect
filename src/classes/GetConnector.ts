import { IAfasConfig, IFilterConfig, TAfasRestDataResponse } from '../models';
import { ProfitError } from './ProfitError';
import Connector from './Connector';

export default class GetConnector extends Connector {
  constructor(AfasConfig: IAfasConfig) {
    super({...AfasConfig, type: 'rest'});
  }

  private parseConfig(config: IFilterConfig): string {
    try {
      const result: any = {};

      // check if there are keys in the config
      if (Object.keys(config || {}).length) {
        // If there are, initiate the string with a ? to start adding queries

        // set skip query
        if (config.skip) {
          result.skip = config.skip
        }
        // set take query
        if (config.take) {
          result.take = config.take
        }

        // Sort on field query

        if (config.orderby?.length) {
          for (const el of config.orderby) {
            if (el.order === 'DESC'){
              result.orderbyfieldids = '-' + el.fieldId
            } else {
              result.orderbyfieldids = el.fieldId
            }
          }
        }

        if (config.filter?.length) {
          let filterfieldidsResult = ''
          let filtervaluesResult = ''
          let operatortypesResult = ''

          const orDepth:{id: string, filtervalue: string, operatortype: number}[][] = [];

          for (const [i, filter] of config.filter.entries()) {
            const divider = (i < config.filter.length - 1) ? ',' : ''

            filterfieldidsResult += filter.filterfieldid + divider
            filtervaluesResult += filter.filtervalue + divider
            operatortypesResult += filter.operatortype + divider

            if (filter.or?.length) {
              for (const [j, orFilter] of filter.or.entries()) {
                if (!(orDepth[j] instanceof Array)) {
                  orDepth[j] = []
                }
                orDepth[j].push({...orFilter, id: filter.filterfieldid})
              }
            }
          }

          // handle ORs
          if (orDepth.length) {
            for (const or of orDepth) {
              filterfieldidsResult += ';'
              filtervaluesResult += ';'
              operatortypesResult += ';'
              for (let i = 0; i < or.length; i++) {
                const filter = or[i];
                const divider = (i < or.length - 1) ? ',' : ''
                filterfieldidsResult += filter.id + divider
                filtervaluesResult += filter.filtervalue + divider
                operatortypesResult += filter.operatortype + divider
              }
            }
          }

          result.filterfieldids = filterfieldidsResult
          result.filtervalues = filtervaluesResult
          result.operatortypes = operatortypesResult
        }

      // JSONfilter query
      // check if the property exists
      if (Object.keys(config.jsonFilter || {}).length) {
        result.filterjson = encodeURI(JSON.stringify(config.jsonFilter))
      }
    }

    // map query
    const query = Object.keys(result).map(k => `${k}=${result[k]}`).join('&');
    return encodeURI('?' + query);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get data from GetConnector
   * @param getConnectorName {string} GetConnector name, example: Profit_Article
   * @param config {IFilterConfig} Filter config
   * 
   * @returns Example: { skip: 0, take: 100, rows: [your data] }
   */
  public async get(getConnectorName: string, config?: IFilterConfig): Promise<TAfasRestDataResponse> {
    try {
      return await this.http(this.connectorUrl + getConnectorName + this.parseConfig(config || {}), 'GET');
    } catch (error: any) {
      throw new ProfitError('An error occured trying to Get ' + getConnectorName, error);
    }
  }

  /**
   * Get just one row from GetConnector
   * @param getConnectorName {string} GetConnector name, example: Profit_Article
   * @param config {IFilterConfig} Filter config
   * 
   * @returns the first entry as an Object. If nothing was found returns Null
   */
  public async getOne(getConnectorName: string, config?: IFilterConfig): Promise<TAfasRestDataResponse> {
    try {
      const response = await this.http(this.connectorUrl + getConnectorName + this.parseConfig({...config, skip: 0, take: 1} || {}), 'GET');
      return response.rows[0] || null
    } catch (error: any) {
      throw new ProfitError('An error occured trying to Get one of ' + getConnectorName, error);
    }
  }

  /**
   * Fetch the metadata of a GetConnector
   * If getConnectorName is left empty, gives the list of all connectors, use Profit.metainfo() then instead
   * @param getConnectorName {string} GetConnector name, example: Profit_Article
   */
  public async metainfo(getConnectorName?:string): Promise<TAfasRestDataResponse> {
    try {
      if (getConnectorName) {
        return await this.http(this.metainfoUrl + 'get/' + getConnectorName, 'GET');
      } else {
        return await this.http(this.afasUrl + 'metainfo', 'GET');
      }
    } catch (error: any) {
      throw new ProfitError('An error occured trying to get Metainfo of ' + getConnectorName, error);
    }
  }
}
