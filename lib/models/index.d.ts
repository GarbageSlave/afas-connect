export declare enum OperatorTypes {
    EqualTo = 1,
    GreaterOrEqualTo = 2,
    LesserOrEqualTo = 3,
    GreaterThan = 4,
    LesserThan = 5,
    ContainsText = 6,
    NotEqualTo = 7,
    Empty = 8,
    NotEmpty = 9,
    StartsWith = 10,
    DoesNotContainText = 11,
    DoesNotStartWith = 12,
    EndsWith = 13,
    DoesNotEndWith = 14,
    QuickFilter = 15
}
export declare enum Languages {
    Dutch = "nl-nl",
    Flemish = "nl-be",
    French = "fr-fr",
    German = "de-de",
    English = "en-en"
}
export declare enum EnvTypes {
    Production = "production",
    Test = "test",
    Accept = "accept"
}
export declare enum OrderBy {
    Ascending = "ASC",
    Descending = "DESC"
}
export declare enum ImageSizes {
    Original = 0,
    Medium = 2,
    Thumbnail = 1
}
export type TImageSizes = 0 | 1 | 2;
type TOperatorTypes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
export type TAfasRestDataResponse = {
    skip: number;
    take: number;
    rows: object[];
};
export type TAfasRestProfileResponse = {
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
type TAfasConfigEnvType = 'production' | 'test' | 'accept';
export type TUpdateConnectorName = 'KnAppointment' | 'KnUser' | 'KnCustomK01' | 'KnCustomK02' | 'KnCustomK03' | 'KnCustomK04' | 'KnCustomK05' | 'KnCustomK06' | 'KnCustomK07' | 'KnCustomK08' | 'KnCustomK09' | 'KnCustomK10' | 'KnPerson' | 'KnOrganisation' | 'KnContact' | 'KnSubject' | 'KnSubjectWorkflowReaction' | 'KnSubjectWorkflowReaction' | 'KnCoursGroupLines' | 'KnCourseMember' | 'KnCourseSessionMember' | 'KnCourseEvent' | 'KnProvApplication' | 'CmForecast' | 'KnSalesRelationOrg' | 'KnSalesRelationPer' | 'KnPurchaseRelationOrg' | 'KnPurchaseRelationPer' | 'KnAccount' | 'KnDimCode' | 'FiEntries' | 'FiEntriesCustom' | 'FiBudget' | 'FiInvoice' | 'FiElectronicInvoicePurchase' | 'KnCurrencyRates' | 'FiSepaDirectDebit' | 'KnBankTransaction' | 'FiContract' | 'FiReservation' | 'FiCommitment' | 'FiProcuration' | 'FiFixedAssets' | 'FiFixedAssetsSale' | 'FiFixedAssetsBuy' | 'PtDeclarationCorrection' | 'PtDeclaration' | 'PtFunction' | 'PtItemSet' | 'KnSreCostCentre' | 'PtCostPriceModel' | 'HrSalTable' | 'PtPlacementContract' | 'PtConceptPlacementContract' | 'PtPriceAgreement' | 'HrEmployeeDeposit' | 'FbItemCodeCustomer' | 'PtProject' | 'TxClientIB2019' | 'TxCFVpb2019' | 'TxClientVpb2019' | 'TxMachtiging' | 'TxKlaarzettenAangifte' | 'KnEmployee' | 'KnOrgUnit' | 'HrApplicant' | 'HrCreateApplicant' | 'HrOrgUnit' | 'HrCompMut' | 'HrVarValue' | 'HrIllness' | 'HrWellnessInSite' | 'HrAbsence' | 'HrAbsCorrection' | 'HrAbsCorrection' | 'HrDeclarationInSite' | 'HrCostCentre' | 'HrCostCarrier' | 'KnOrgEmrFun' | 'HrJudgement' | 'HrEmpCourse' | 'HrTimeRegSocSec' | 'KnDayContract' | 'HrEmpPaySlip' | 'FbSalesQuotation' | 'FbDirectInvoice' | 'FbSales' | 'FbFreeOrder' | 'FbSettleOrder' | 'FbPurch' | 'FbPurRequisition' | 'FbGoodsReceived' | 'FbConfrontation' | 'FbDeliveryNote' | 'FbDelNoteReceived' | 'FbItemArticle' | 'FbItemCodeCustomer' | 'FbProductGroup' | 'FbProductGroupLines' | 'FbWarTransferPrep' | 'FbWarTransferOut' | 'FbWarTransferIn' | 'FbUnitBasicItem' | 'FbExtraBarcode' | 'FbUpdateAdB' | 'FbComposition' | 'FbAssemblyPrep' | 'FbAssembly' | 'FbSalesPrice' | 'FbPurchPrice' | 'FbCostPrice' | 'FbStandardPrice' | 'FbItemCodeWarehouse' | 'FbItemCodeSupplier' | 'FbBitVatTarifGroup' | 'FbStockMutation' | 'FbStockMutation' | 'PtRealization' | 'PtRealizationWeek' | 'PtLinesToBeInvoiced' | 'PtProject' | 'KnTeamMember' | 'KnQuotation' | 'PtProjectProgress' | 'FbInstalment' | 'PtMonitor' | 'PtConProjectForecast' | 'PtMeasurement';
type TLanguages = 'nl-nl' | 'nl-be' | 'fr-fr' | 'de-de' | 'en-en';
export interface IAfasConfig {
    env: string;
    envType: TAfasConfigEnvType | EnvTypes;
    token: string;
    language?: TLanguages | Languages;
}
export interface IAfasConnectorConfig extends IAfasConfig {
    type: 'rest' | 'soap';
}
type TOrderByTypes = 'ASC' | 'DESC';
export type TOrderBy = {
    order: TOrderByTypes | OrderBy;
    fieldId: string;
}[];
export type TFilterOr = {
    filtervalue: string;
    operatortype: TOperatorTypes | OperatorTypes;
}[];
export type TFilter = {
    filterfieldid: string;
    filtervalue: string;
    operatortype: TOperatorTypes | OperatorTypes;
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
export type THttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';
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
export interface IOtpResponse {
    token: string;
}
export {};
