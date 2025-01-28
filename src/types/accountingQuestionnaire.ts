export interface AccountingQuestionnaireData {
  internalControls: "yes" | "no";
  disruptionsAvailable: "not-available" | "available";
  disruptionsExplanation: string;
  germanAccounting: "yes" | "no";
  dataRetention: "yes" | "no";
  riskManagement: "yes" | "no";
  bookkeeping: "internal" | "external";
  statementsExist: "yes" | "no";
  statements: Array<{
    statement: string;
    setupDate: string;
    establishedDate: string;
    hasProtocol: "yes" | "no";
  }>;
  preparedBy: "cooperative" | "consultant";
  consultantDetails: string;
  compliesWithLaw: "yes" | "no" | "justify";
  estimatedValues: "yes" | "no" | "justify";
  specialCircumstances: "none" | "exist";
  circumstances: string;
  legalDisputesHandled: "yes" | "no";
  taxReturnsSubmittedBy: string;
  taxAssessmentNoticesUntil: string;
  taxReturnsPreparedBy: "cooperative" | "consultant";
  taxConsultantDetails: string;
  multipleCooperativeMandates: "yes" | "no";
  taxAuditsCarriedOut: "yes" | "no";
  taxAuditDetails: string;
  supervisoryInstructions: "yes" | "no";
  supervisoryInstructionsDetails: string;
}