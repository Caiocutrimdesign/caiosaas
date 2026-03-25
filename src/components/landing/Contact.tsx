import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => (
  <section id="contact" className="py-20 px-6 bg-card">
    <div className="max-w-lg mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center">Get in Touch</h2>
      <p className="text-center text-muted-foreground text-sm">
        Questions? Send us a message and we'll get back to you.
      </p>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Input placeholder="Your email" type="email" />
        <Textarea placeholder="Your message" rows={4} />
        <Button type="submit" className="w-full">Send Message</Button>
      </form>
    </div>
  </section>
);

export default Contact;
