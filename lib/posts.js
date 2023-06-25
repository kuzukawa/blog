import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDir = path.join(process.cwd(), 'pages/posts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDir)

  const allPostsData = fileNames.filter((fileName) => {
    return fileName.endsWith('.md')
  }).map((fileName) => {
    const id = fileName.replace(/\.md$/,'');
    const fullPath = path.join(postsDir, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData.sort((a,b) => {
    if(a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDir);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.filter((fileName) => {
    return fileName.endsWith('.md')
  }).map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/,''),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDir, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
  const contentHtml = processedContent.toString();
  
  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
