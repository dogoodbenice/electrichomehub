import { Card, CardContent } from "@/components/ui/card";

export default function FAQ() {
  const faqs = [
    {
      question: "How does Electric Home Hub work with different device brands?",
      answer: "Our platform uses a universal device identification system that works across all major appliance and device manufacturers. Simply add your device model and serial number to start tracking."
    },
    {
      question: "Is my device data secure?",
      answer: "Yes, we use enterprise-grade encryption and comply with all major privacy regulations. Your device information is stored securely and never shared with third parties without your consent."
    },
    {
      question: "What types of alerts will I receive?",
      answer: "You'll receive notifications about recalls, firmware updates, warranty expirations, maintenance reminders, and emerging issues affecting your specific device models."
    },
    {
      question: "Can I integrate Electric Home Hub with my existing smart home system?",
      answer: "Absolutely! We offer APIs and integrations with popular platforms like SmartThings, Hubitat, and Home Assistant. Check our Developer API section for implementation details."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index} className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
