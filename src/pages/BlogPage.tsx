import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { BlogCategoryId } from '../i18n/types';
import { SectionHeading } from '../components/SectionHeading';
import { BlogEditorialArt } from '../components/artwork/BlogEditorialArt';
import { Link } from '../components/Link';

interface BlogPageProps {
  articleSlug?: string;
}

type FilterCategory = 'all' | BlogCategoryId;

export function BlogPage({ articleSlug }: BlogPageProps) {
  const { t } = useLanguage();
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('all');

  const selectedArticle = articleSlug
    ? t.blog.articles.find((a) => a.slug === articleSlug)
    : undefined;

  if (selectedArticle) {
    const related = t.blog.articles.filter((a) => a.slug !== selectedArticle.slug).slice(0, 3);
    return (
      <article className="bg-[#F8F0E3]">
        <section className="bg-[#351016] text-[#F8F0E3] border-b border-[#D8AD59]/30 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#EBD08D] hover:text-[#F8F0E3] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.blog.backToBlog}</span>
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#EBD08D]/90">
              <span>{selectedArticle.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedArticle.date}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedArticle.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedArticle.author}</span>
            </div>

            <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-[1.18] text-[#F8F0E3] [text-wrap:balance]">
              {selectedArticle.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#F8F0E3]/82 leading-relaxed">
              {selectedArticle.excerpt}
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="rounded-lg overflow-hidden border border-[#D8AD59]/40 aspect-[16/9] sm:aspect-[21/10]">
            <BlogEditorialArt artworkId={selectedArticle.artworkId} className="w-full h-full" />
          </div>

          <div className="mt-10 max-w-2xl mx-auto space-y-6 text-base text-[#3A1B16] leading-[1.85]">
            {selectedArticle.paragraphs.map((para, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? 'first-letter:text-4xl first-letter:font-display first-letter:font-semibold first-letter:text-[#351016] first-letter:mr-1'
                    : ''
                }
              >
                {para}
              </p>
            ))}

            <div className="mt-10 pt-8 border-t border-[#D8AD59]/35">
              <h2 className="font-display text-xl font-semibold text-[#351016]">
                {t.blog.keyTakeawaysTitle}
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm sm:text-[15px] text-[#542D24]">
                {selectedArticle.keyTakeaways.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="text-[#C47616] mt-0.5" aria-hidden="true">
                      ◆
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16 pt-10 border-t border-[#D8AD59]/35">
            <h2 className="font-display text-2xl font-semibold text-[#351016]">
              {t.blog.viewAllArticlesCta}
            </h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to={`/blog/${item.slug}`}
                  className="group p-5 rounded-lg bg-[#FDF9F2] border border-[#D8AD59]/35 hover:border-[#B08532] transition-colors flex flex-col justify-between"
                >
                  <div>
                    <p className="text-xs text-[#8C5320] font-medium">
                      {item.categoryLabel} · {item.readTime}
                    </p>
                    <h3 className="mt-2 font-display text-base font-semibold text-[#351016] group-hover:text-[#7C3A12]">
                      {item.title}
                    </h3>
                  </div>
                  <span className="mt-4 text-xs font-semibold text-[#351016]">
                    {t.blog.readArticleCta} →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>
    );
  }

  const filteredArticles =
    categoryFilter === 'all'
      ? t.blog.articles
      : t.blog.articles.filter((a) => a.category === categoryFilter);

  return (
    <div className="bg-[#F8F0E3]">
      <section className="bg-[#351016] text-[#F8F0E3] border-b border-[#D8AD59]/30 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            as="h1"
            kicker={t.blog.kicker}
            title={t.blog.title}
            subtitle={t.blog.subtitle}
            align="left"
            theme="dark"
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Category Filter Tabs */}
        <div className="inline-flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#EFE3CE] border border-[#D8AD59]/40">
          {(
            [
              { id: 'all', label: t.blog.categories.all },
              { id: 'vedic', label: t.blog.categories.vedic },
              { id: 'nakshatra', label: t.blog.categories.nakshatra },
              { id: 'panchang', label: t.blog.categories.panchang },
              { id: 'festivals', label: t.blog.categories.festivals },
            ] as const
          ).map((cat) => {
            const active = categoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryFilter(cat.id)}
                aria-pressed={active}
                className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[#351016] text-[#F8F0E3]'
                    : 'text-[#542D24] hover:text-[#351016]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-7">
          {filteredArticles.map((article) => (
            <article
              key={article.slug}
              className="group flex flex-col sm:flex-row rounded-lg overflow-hidden bg-[#FDF9F2] border border-[#D8AD59]/35 hover:border-[#B08532] transition-colors"
            >
              <Link
                to={`/blog/${article.slug}`}
                className="sm:w-48 lg:w-56 shrink-0 aspect-[3/2] sm:aspect-auto overflow-hidden block"
              >
                <BlogEditorialArt
                  artworkId={article.artworkId}
                  className="w-full h-full transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </Link>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#8C5320]">
                    <span className="font-medium">{article.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h2 className="mt-2 font-display text-xl font-semibold text-[#351016] leading-snug group-hover:text-[#7C3A12]">
                    <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                  </h2>

                  <p className="mt-2 text-sm text-[#542D24] leading-relaxed">{article.excerpt}</p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#D8AD59]/20 flex items-center justify-between text-xs">
                  <span className="text-[#542D24]/75">{article.author}</span>
                  <Link
                    to={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-[#351016] hover:text-[#C47616]"
                  >
                    <span>{t.blog.readArticleCta}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
