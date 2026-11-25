import React, { useState } from 'react';
import { Info, Mail, Clock, Copy, Check, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CALC_UI } from '../i18n/vedicLabels';
import { validateContactForm, type ContactFormInput, type ValidationErrorKey } from '../utils/validation';
import { SectionHeading } from '../components/SectionHeading';
import { NavagrahaDiagram } from '../components/artwork/NavagrahaDiagram';

export function AboutPage() {
  const { t } = useLanguage();
  const { about } = t.infoPages;

  return (
    <div className="bg-[#F8F0E3]">
      <section className="bg-[#351016] text-[#F8F0E3] border-b border-[#D8AD59]/30 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            as="h1"
            kicker={about.kicker}
            title={about.title}
            subtitle={about.lead}
            align="left"
            theme="dark"
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-5 text-[15px] sm:text-base text-[#3A1B16] leading-[1.85]">
            {about.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}

            <div className="pt-8 mt-8 border-t border-[#D8AD59]/35">
              <h2 className="font-display text-2xl font-semibold text-[#351016]">
                {about.pillarsTitle}
              </h2>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
                {about.pillars.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="p-5 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/35"
                  >
                    <h3 className="font-display text-base font-semibold text-[#351016]">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#542D24] leading-relaxed">{pillar.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="max-w-sm mx-auto">
              <NavagrahaDiagram className="w-full h-auto rounded-xl shadow-md" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function ContactPage() {
  const { language, t } = useLanguage();
  const { contact } = t.infoPages;
  const ui = CALC_UI[language];

  const [form, setForm] = useState<ContactFormInput>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormInput, ValidationErrorKey>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (field: keyof ContactFormInput, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateContactForm(form);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setCopied(false);
    setSubmitted(true);
  };

  const formattedBody = `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\nSubject: ${form.subject.trim()}\n\n${form.message.trim()}`;
  const mailtoHref = `mailto:namaste@jyotishsetu.in?subject=${encodeURIComponent(
    form.subject.trim(),
  )}&body=${encodeURIComponent(formattedBody)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedBody);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="bg-[#F8F0E3]">
      <section className="bg-[#351016] text-[#F8F0E3] border-b border-[#D8AD59]/30 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            as="h1"
            kicker={contact.kicker}
            title={contact.title}
            subtitle={contact.lead}
            align="left"
            theme="dark"
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/40">
              <div
                role="note"
                className="mb-6 p-3.5 rounded-md bg-[#EFE3CE]/80 border border-[#D8AD59]/50 flex items-start gap-2.5 text-xs sm:text-sm text-[#542D24]"
              >
                <Info className="w-4 h-4 text-[#8C5320] shrink-0 mt-0.5" aria-hidden="true" />
                <p className="leading-relaxed">{contact.previewNotice}</p>
              </div>
              {submitted ? (
                <div className="py-4 space-y-4">
                  <div className="w-11 h-11 rounded-full bg-[#2B5A3C]/12 border border-[#2B5A3C]/40 text-[#2B5A3C] flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-[#351016]">
                    {contact.successTitle}
                  </h2>
                  <p className="text-sm sm:text-[15px] text-[#542D24] leading-relaxed">
                    {contact.successBody}
                  </p>
                  <pre className="p-4 rounded-md bg-[#F8F0E3] border border-[#D8AD59]/40 text-xs text-[#351016] whitespace-pre-wrap font-sans leading-relaxed">
                    {formattedBody}
                  </pre>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-gradient-to-r from-[#D8AD59] to-[#E99A32] text-[#2B0A10] text-sm font-semibold hover:brightness-105 transition-all"
                    >
                      <Mail className="w-4 h-4" aria-hidden="true" />
                      <span>{ui.openEmailBtn}</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-[#D8AD59] bg-white text-[#351016] text-sm font-medium hover:bg-[#EFE3CE] transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-[#2B5A3C]" aria-hidden="true" />
                      ) : (
                        <Copy className="w-4 h-4 text-[#8C5320]" aria-hidden="true" />
                      )}
                      <span>{copied ? ui.copiedBtn : ui.copyInquiryBtn}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="inline-flex items-center px-4 py-2.5 rounded-md bg-[#351016] text-[#F8F0E3] text-sm font-medium hover:bg-[#4A1820] transition-colors cursor-pointer"
                    >
                      {contact.sendAnotherBtn}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-[#351016] mb-1.5">
                        {contact.nameLabel}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder={contact.namePlaceholder}
                        className="w-full h-11 px-3.5 rounded-md bg-white border border-[#D8AD59]/50 text-sm text-[#351016]"
                      />
                      {errors.name && (
                        <p role="alert" className="mt-1.5 text-xs text-[#8E1C28]">
                          {t.validation[errors.name]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-[#351016] mb-1.5">
                        {contact.emailLabel}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder={contact.emailPlaceholder}
                        className="w-full h-11 px-3.5 rounded-md bg-white border border-[#D8AD59]/50 text-sm text-[#351016]"
                      />
                      {errors.email && (
                        <p role="alert" className="mt-1.5 text-xs text-[#8E1C28]">
                          {t.validation[errors.email]}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-semibold text-[#351016] mb-1.5">
                      {contact.subjectLabel}
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={form.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      placeholder={contact.subjectPlaceholder}
                      className="w-full h-11 px-3.5 rounded-md bg-white border border-[#D8AD59]/50 text-sm text-[#351016]"
                    />
                    {errors.subject && (
                      <p role="alert" className="mt-1.5 text-xs text-[#8E1C28]">
                        {t.validation[errors.subject]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-[#351016] mb-1.5">
                      {contact.messageLabel}
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder={contact.messagePlaceholder}
                      className="w-full p-3.5 rounded-md bg-white border border-[#D8AD59]/50 text-sm text-[#351016]"
                    />
                    {errors.message && (
                      <p role="alert" className="mt-1.5 text-xs text-[#8E1C28]">
                        {t.validation[errors.message]}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#351016] text-[#F8F0E3] text-sm font-semibold hover:bg-[#4A1820] transition-colors cursor-pointer"
                  >
                    {contact.submitBtn}
                  </button>
                </form>
              )}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-lg bg-[#351016] text-[#F8F0E3] border border-[#D8AD59]/30 space-y-6">
              <div>
                <h2 className="font-display text-2xl font-semibold text-[#EBD08D]">
                  {contact.officeTitle}
                </h2>
                <p className="mt-2 text-sm text-[#F8F0E3]/82 leading-relaxed">
                  {contact.officeBody}
                </p>
              </div>

              <div className="pt-5 border-t border-[#D8AD59]/20 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#D8AD59] mt-1 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-[#D8AD59]">{contact.emailSupportLabel}</p>
                    <p className="mt-0.5 text-[#F8F0E3]">namaste@jyotishsetu.in</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#D8AD59] mt-1 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-[#D8AD59]">{contact.hoursLabel}</p>
                    <p className="mt-0.5 text-[#F8F0E3]">{contact.hoursValue}</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

interface LegalPageProps {
  kind: 'privacy' | 'terms' | 'disclaimer';
}

export function LegalPolicyPage({ kind }: LegalPageProps) {
  const { t } = useLanguage();
  const doc = t.infoPages[kind];

  return (
    <div className="bg-[#F8F0E3]">
      <section className="bg-[#351016] text-[#F8F0E3] border-b border-[#D8AD59]/30 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium tracking-[0.14em] text-[#EBD08D]">{doc.kicker}</p>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-[#F8F0E3]">
            {doc.title}
          </h1>
          <p className="mt-3 text-xs text-[#EBD08D]/85">{doc.updated}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="p-6 sm:p-10 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/35 space-y-8">
          {doc.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display text-xl font-semibold text-[#351016]">
                {section.heading}
              </h2>
              <p className="mt-2.5 text-[15px] text-[#542D24] leading-[1.8]">{section.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
