declare type TOperatorTypes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
export declare type TAfasRestDataResponse = {
    skip: number;
    take: number;
    rows: object[];
};
export declare type TAfasRestProfileResponse = {
    environmentId: string;
    sessionId: string;
    userId: string;
    personCode: string;
    contactId: string;
    organizationCode: string;
    employeeId: string;
    cssUrl: string;
    scriptUrl: string;
};
declare type TAfasConfigEnvType = 'production' | 'test' | 'accept';
export declare type TUpdateConnectorName = 'KnAppointment' | 'KnUser' | 'KnCustomK01' | 'KnCustomK02' | 'KnCustomK03' | 'KnCustomK04' | 'KnCustomK05' | 'KnCustomK06' | 'KnCustomK07' | 'KnCustomK08' | 'KnCustomK09' | 'KnCustomK10' | 'KnPerson' | 'KnOrganisation' | 'KnContact' | 'KnSubject' | 'KnSubjectWorkflowReaction' | 'KnSubjectWorkflowReaction' | 'KnCoursGroupLines' | 'KnCourseMember' | 'KnCourseSessionMember' | 'KnCourseEvent' | 'KnProvApplication' | 'CmForecast' | 'KnSalesRelationOrg' | 'KnSalesRelationPer' | 'KnPurchaseRelationOrg' | 'KnPurchaseRelationPer' | 'KnAccount' | 'KnDimCode' | 'FiEntries' | 'FiEntriesCustom' | 'FiBudget' | 'FiInvoice' | 'FiElectronicInvoicePurchase' | 'KnCurrencyRates' | 'FiSepaDirectDebit' | 'KnBankTransaction' | 'FiContract' | 'FiReservation' | 'FiCommitment' | 'FiProcuration' | 'FiFixedAssets' | 'FiFixedAssetsSale' | 'FiFixedAssetsBuy' | 'PtDeclarationCorrection' | 'PtDeclaration' | 'PtFunction' | 'PtItemSet' | 'KnSreCostCentre' | 'PtCostPriceModel' | 'HrSalTable' | 'PtPlacementContract' | 'PtConceptPlacementContract' | 'PtPriceAgreement' | 'HrEmployeeDeposit' | 'FbItemCodeCustomer' | 'PtProject' | 'TxClientIB2019' | 'TxCFVpb2019' | 'TxClientVpb2019' | 'TxMachtiging' | 'TxKlaarzettenAangifte' | 'KnEmployee' | 'KnOrgUnit' | 'HrApplicant' | 'HrCreateApplicant' | 'HrOrgUnit' | 'HrCompMut' | 'HrVarValue' | 'HrIllness' | 'HrWellnessInSite' | 'HrAbsence' | 'HrAbsCorrection' | 'HrAbsCorrection' | 'HrDeclarationInSite' | 'HrCostCentre' | 'HrCostCarrier' | 'KnOrgEmrFun' | 'HrJudgement' | 'HrEmpCourse' | 'HrTimeRegSocSec' | 'KnDayContract' | 'HrEmpPaySlip' | 'FbSalesQuotation' | 'FbDirectInvoice' | 'FbSales' | 'FbFreeOrder' | 'FbSettleOrder' | 'FbPurch' | 'FbPurRequisition' | 'FbGoodsReceived' | 'FbConfrontation' | 'FbDeliveryNote' | 'FbDelNoteReceived' | 'FbItemArticle' | 'FbItemCodeCustomer' | 'FbProductGroup' | 'FbProductGroupLines' | 'FbWarTransferPrep' | 'FbWarTransferOut' | 'FbWarTransferIn' | 'FbUnitBasicItem' | 'FbExtraBarcode' | 'FbUpdateAdB' | 'FbComposition' | 'FbAssemblyPrep' | 'FbAssembly' | 'FbSalesPrice' | 'FbPurchPrice' | 'FbCostPrice' | 'FbStandardPrice' | 'FbItemCodeWarehouse' | 'FbItemCodeSupplier' | 'FbBitVatTarifGroup' | 'FbStockMutation' | 'FbStockMutation' | 'PtRealization' | 'PtRealizationWeek' | 'PtLinesToBeInvoiced' | 'PtProject' | 'KnTeamMember' | 'KnQuotation' | 'PtProjectProgress' | 'FbInstalment' | 'PtMonitor' | 'PtConProjectForecast' | 'PtMeasurement';
export declare type TCustomConnectorName = '';
export interface IAfasConfig {
    env: string;
    envType: TAfasConfigEnvType;
    token: string;
}
export interface IAfasConnectorConfig extends IAfasConfig {
    type: 'rest' | 'soap';
}
export declare type TOrderBy = {
    order: 'ASC' | 'DESC';
    fieldId: string;
}[];
export declare type TFilterOr = {
    filtervalue: string;
    operatortype: TOperatorTypes;
}[];
export declare type TFilter = {
    filterfieldid: string;
    filtervalue: string;
    operatortype: TOperatorTypes;
    or?: TFilterOr;
}[];
export interface IFilterConfig {
    skip?: number;
    take?: number;
    orderby?: TOrderBy;
    filter?: TFilter;
    jsonFilter?: object;
}
export interface ISoapFilterConfig {
    skip?: number;
    take?: number;
    filtersXml?: string;
}
export interface IEndpoints {
    production: string;
    test: string;
    accept: string;
}
export declare type THttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';
export interface IAfasGetResponse {
    skip: number;
    take: number;
    rows: object[];
}
export interface IAfasMetaInfo {
    id: string;
    description?: string;
    name?: string;
    fields: object[];
    objects?: IAfasMetaInfo[];
}
export {};
