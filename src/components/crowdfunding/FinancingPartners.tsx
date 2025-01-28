import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FinancingPartner {
  name: string;
  logo: string;
  description: string;
  amount: string;
  duration: string;
  interestRate: string;
  type: string;
}

const partners: FinancingPartner[] = [
  {
    name: "Banxware",
    logo: "/banxware-logo.png",
    description: "Fast financing for SMEs from all industries. Fully digital application. Instant eligibility check.",
    amount: "€1K to €250K",
    duration: "3 to 12 months",
    interestRate: "1% monthly",
    type: "Short-term financing"
  },
  {
    name: "Defacto",
    logo: "/defacto-logo.png",
    description: "Dynamic line of credit for SMEs. Get funds for your stock as well as for supplier and B2B customer invoices. Upload invoices and increase your cash flow. Instant eligibility check.",
    amount: "€500 to €1M",
    duration: "1 to 4 months",
    interestRate: "0.03% to 0.08% daily",
    type: "Short-term financing"
  },
  {
    name: "Iwoca",
    logo: "/iwoca-logo.png",
    description: "Fast business loans for SMEs. No early repayment charges.",
    amount: "€1K to €500K",
    duration: "1 to 24 months",
    interestRate: "From 1% monthly",
    type: "Short-term financing"
  },
  {
    name: "Silvr",
    logo: "/silvr-logo.png",
    description: "Financing for e-commerce, marketplace, SaaS, subscription service, and mobile app businesses. Fund your marketing campaigns, recruitment, inventory and SaaS tools.",
    amount: "€10K to €1M",
    duration: "1 to 24 months",
    interestRate: "5% to 9%",
    type: "Short-term financing"
  }
];

export const FinancingPartners = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Financing Partners</h2>
        <p className="text-muted-foreground">
          Boost your cash flow with flexible financing from our recommended partners.
          Apply through our platform to skip the bureaucracy and get a response faster.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {partners.map((partner) => (
          <Card key={partner.name} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">{partner.name}</CardTitle>
                <Badge variant="secondary">{partner.type}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{partner.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Amount</p>
                  <p className="text-muted-foreground">{partner.amount}</p>
                </div>
                <div>
                  <p className="font-medium">Duration</p>
                  <p className="text-muted-foreground">{partner.duration}</p>
                </div>
                <div>
                  <p className="font-medium">Interest Rate</p>
                  <p className="text-muted-foreground">{partner.interestRate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};