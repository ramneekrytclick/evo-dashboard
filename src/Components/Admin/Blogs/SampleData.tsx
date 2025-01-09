import { BlogProps } from "@/Types/Blogs.type";

export const sampleBlogsData:BlogProps[] = [
    {
      id:1,
      title: "Introduction to Web Development",
      content: "Web development is the process of building websites and web applications. It encompasses various aspects such as front-end, back-end, and full-stack development.",
      creatorId: "603d9f6baf129d4567bcd123", // Example User ObjectId (replace with actual ObjectId)
      status: "Approved",
      createdAt: "2024-10-1",
      category:"new1",
      tags:["","new","tags"]
    },
    {
      id:2,
      title: "Understanding Node.js",
      content: "Node.js is a JavaScript runtime that allows you to run JavaScript code server-side. It's known for its non-blocking, event-driven architecture.",
      creatorId: "603d9f6baf129d4567bcd124", // Example User ObjectId (replace with actual ObjectId)
      status: "Pending",
      createdAt: "2024-10-2",
      category:"new2",
      tags:["","new","tags"]
    },
    {
      id:3,
      title: "JavaScript Best Practices",
      content: "There are several best practices to follow when writing JavaScript, such as using 'const' and 'let' over 'var', and avoiding global variables.",
      creatorId: "603d9f6baf129d4567bcd125", // Example User ObjectId (replace with actual ObjectId)
      status: "Rejected",
      createdAt: "2024-10-3",
      category:"new3",
      tags:["","new","tags"]
    }
  ];
  