import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Chip } from '@nextui-org/chip';
import { Image } from '@nextui-org/image';
import Link from 'next/link';
import { bebas } from '@/config/fonts';
import BlogCard from '@/components/ui/BlogCard';
import { Key } from 'react';

export default async function ArticlesPage() {
  const res = await fetch('http://localhost:3000/api/articles/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    console.error('Failed to fetch articles:', res.statusText);
    return (
      <div className="container mx-auto p-4">
        <h2>Failed to load articles</h2>
      </div>
    );
  }

  const articles = await res.json();

  return (
    <div className="container mx-auto p-4 md:p-4">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 bg-white text-foreground rounded-2xl">
        {/* Title */}
        <div className="mx-auto mb-10 max-w-7xl text-left lg:mb-14 p-4 md:p-8 md:rounded-2xl">
          <h2
            className={`${bebas.className} text-2xl dark:text-white md:text-4xl md:leading-tight`}>
            News & Articles
          </h2>
          <p className="mt-1 max-w-4xl text-gray-600 dark:text-neutral-400">
            Welcome to our News and Articles section, where we dive into
            Africa's evolving markets, exploring the power of trade, technology,
            and sustainability.
          </p>
          <br />
          <p className="mt-1 max-w-4xl text-gray-600 dark:text-neutral-400">
            From the game-changing African Continental Free Trade Area (AfCFTA)
            to the leading commodities of 2024, discover fresh insights that
            drive regional growth, support sustainable investment, and empower
            Africa's economic transformation.
          </p>
        </div>
        {/* End Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article: { id: Key | null | undefined; slug: any; author: { name: string | undefined; avatar: any; }; excerpt: any; featuredImage: string | undefined; title: string; }) => (
            <BlogCard
              key={article.id}
              url={`/news/${article.slug}`}
              author={article.author.name}
              avatarSrc={article.author.avatar || ''}
              description={
                <div
                  className="line-clamp-4 text-small"
                  dangerouslySetInnerHTML={{ __html: article.excerpt || '' }}
                />
              }
              imageAlt="Intra-African Trade"
              imageSrc={
                article.featuredImage
                  ? article.featuredImage
                  : '/images/aaha.jpg'
              }
              title={article.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
