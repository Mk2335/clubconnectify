import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  return (
    <div className="bg-muted rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Frequently asked questions and answers:</h3>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>The page does not load / crashes or does not respond.</AccordionTrigger>
          <AccordionContent>
            Please try refreshing the page or using a different browser.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>My microphone / camera cannot be activated.</AccordionTrigger>
          <AccordionContent>
            Check your browser permissions and make sure your devices are properly connected.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Picture or sound are jerky or have short dropouts.</AccordionTrigger>
          <AccordionContent>
            This might be due to network issues. Try enabling simulcast or checking your internet connection.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>The connection is very poor and breaks down frequently.</AccordionTrigger>
          <AccordionContent>
            Check your internet connection stability and try reducing video quality or disabling video.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>The screen sharing cannot be started.</AccordionTrigger>
          <AccordionContent>
            Make sure you're using a supported browser like Google Chrome and have granted the necessary permissions.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};