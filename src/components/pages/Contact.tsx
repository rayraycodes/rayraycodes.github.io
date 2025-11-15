import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, Twitter, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import contentData from '../../data/content';
import { getPageTitleColor } from '../../utils/brandColorsConfig';

const iconMap: Record<string, typeof Mail> = {
  'Email': Mail,
  'LinkedIn': Linkedin,
  'GitHub': Github,
  'Twitter': Twitter,
};

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission would be handled here
    console.log('Form submitted:', formData);
  };

  const { hero, form, social, opportunities, cta } = contentData.contact;
  const { links } = contentData.assets;
  
  // Map social links with icons
  const socialLinks = social.links.map((link) => ({
    ...link,
    icon: iconMap[link.label] || Mail,
  }));

  return (
    <div className="min-h-screen pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-blue-50/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-6xl tracking-tight mb-6" style={{ color: getPageTitleColor('contact') }}>
              {hero.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="surface-elevated rounded-2xl p-8">
                <h2 className="text-3xl tracking-tight mb-6">{form.title}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">{form.fields.name.label}</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder={form.fields.name.placeholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-2 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">{form.fields.email.label}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={form.fields.email.placeholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">{form.fields.message.label}</Label>
                    <Textarea
                      id="message"
                      placeholder={form.fields.message.placeholder}
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-2 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full rounded-full group">
                    {form.submit}
                    <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Social Links & Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl tracking-tight mb-6">{social.title}</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {social.subtitle}
                </p>
                
                <div className="space-y-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-4 p-4 surface-elevated rounded-xl transition-all duration-300 hover:shadow-md group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <link.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="mb-1">{link.label}</div>
                        <div className="text-sm text-muted-foreground">{link.handle}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="surface-elevated rounded-2xl p-8">
                <h3 className="text-xl mb-4">{opportunities.title}</h3>
                <ul className="space-y-3">
                  {opportunities.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-blue-50/20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl tracking-tight mb-6">
              {cta.title}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={links.email}>
                <Button size="lg" className="rounded-full px-8">
                  {cta.primary}
                </Button>
              </a>
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  {cta.secondary}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}