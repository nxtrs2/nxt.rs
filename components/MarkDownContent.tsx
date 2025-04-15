"use client";

import type React from "react";

import { useEffect, useRef } from "react";

interface MarkdownContentProps {
  content: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add custom styling to elements inside the markdown content
    if (contentRef.current) {
      // Style headings
      const headings = contentRef.current.querySelectorAll(
        "h1, h2, h3, h4, h5, h6"
      );
      headings.forEach((heading) => {
        heading.classList.add("font-heading", "my-4");

        if (heading.tagName === "H1") {
          heading.classList.add("text-xl");
        } else if (heading.tagName === "H2") {
          heading.classList.add("text-xl");
        }
      });

      // Style paragraphs
      const paragraphs = contentRef.current.querySelectorAll("p");
      paragraphs.forEach((p) => {
        p.classList.add("leading-relaxed");
      });

      // Style lists
      const lists = contentRef.current.querySelectorAll("ul, ol");
      lists.forEach((list) => {
        list.classList.add("my-4", "ml-6", "mx-4");

        if (list.tagName === "UL") {
          list.classList.add("list-disc");
        } else {
          list.classList.add("list-decimal");
        }
      });

      // Style list items
      const listItems = contentRef.current.querySelectorAll("li");
      listItems.forEach((item) => {
        item.classList.add("mb-2");
      });

      // Style images
      const images = contentRef.current.querySelectorAll("img");
      images.forEach((img) => {
        img.classList.add("my-4");

        // Create a wrapper for the image to maintain aspect ratio
        const wrapper = document.createElement("div");
        wrapper.classList.add("relative", "h-64", "md:h-96", "my-6");

        // Replace the img with a Next.js Image component
        const imgSrc = img.getAttribute("src") || "";
        const imgAlt = img.getAttribute("alt") || "";

        // We can't directly create a Next.js Image component here,
        // so we'll use a placeholder and style it
        wrapper.innerHTML = `<img src="${imgSrc}" alt="${imgAlt}" class="object-cover w-full h-full" />`;

        img.parentNode?.replaceChild(wrapper, img);
      });
    }
  }, [content]);

  return (
    <div
      ref={contentRef}
      className="prose prose-invert prose-blue max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default MarkdownContent;
