export var OperatorTypes;
(function (OperatorTypes) {
    OperatorTypes[OperatorTypes["EqualTo"] = 1] = "EqualTo";
    OperatorTypes[OperatorTypes["GreaterOrEqualTo"] = 2] = "GreaterOrEqualTo";
    OperatorTypes[OperatorTypes["LesserOrEqualTo"] = 3] = "LesserOrEqualTo";
    OperatorTypes[OperatorTypes["GreaterThan"] = 4] = "GreaterThan";
    OperatorTypes[OperatorTypes["LesserThan"] = 5] = "LesserThan";
    OperatorTypes[OperatorTypes["ContainsText"] = 6] = "ContainsText";
    OperatorTypes[OperatorTypes["NotEqualTo"] = 7] = "NotEqualTo";
    OperatorTypes[OperatorTypes["Empty"] = 8] = "Empty";
    OperatorTypes[OperatorTypes["NotEmpty"] = 9] = "NotEmpty";
    OperatorTypes[OperatorTypes["StartsWith"] = 10] = "StartsWith";
    OperatorTypes[OperatorTypes["DoesNotContainText"] = 11] = "DoesNotContainText";
    OperatorTypes[OperatorTypes["DoesNotStartWith"] = 12] = "DoesNotStartWith";
    OperatorTypes[OperatorTypes["EndsWith"] = 13] = "EndsWith";
    OperatorTypes[OperatorTypes["DoesNotEndWith"] = 14] = "DoesNotEndWith";
    OperatorTypes[OperatorTypes["QuickFilter"] = 15] = "QuickFilter";
})(OperatorTypes || (OperatorTypes = {}));
export var Languages;
(function (Languages) {
    Languages["Dutch"] = "nl-nl";
    Languages["Flemish"] = "nl-be";
    Languages["French"] = "fr-fr";
    Languages["German"] = "de-de";
    // English = 'en-us',
    Languages["English"] = "en-en";
})(Languages || (Languages = {}));
export var EnvTypes;
(function (EnvTypes) {
    EnvTypes["Production"] = "production";
    EnvTypes["Test"] = "test";
    EnvTypes["Accept"] = "accept";
})(EnvTypes || (EnvTypes = {}));
export var OrderBy;
(function (OrderBy) {
    OrderBy["Ascending"] = "ASC";
    OrderBy["Descending"] = "DESC";
})(OrderBy || (OrderBy = {}));
export var ImageSizes;
(function (ImageSizes) {
    ImageSizes[ImageSizes["Original"] = 0] = "Original";
    ImageSizes[ImageSizes["Medium"] = 2] = "Medium";
    ImageSizes[ImageSizes["Thumbnail"] = 1] = "Thumbnail";
})(ImageSizes || (ImageSizes = {}));
