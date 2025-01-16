import { BlogProps } from "@/Types/Blogs.type";

export const sampleBlogsData:BlogProps[] = [
    {
      _id:"12",
      title: "Introduction to Web Development",
      content: "Web development is the process of building websites and web applications. It encompasses various aspects such as front-end, back-end, and full-stack development.",
      creatorId: "603d9f6baf129d4567bcd123", // Example User ObjectId (replace with actual ObjectId)
      status: "Approved",
    },
    {
      _id:"12",
      title: "Understanding Node.js",
      content: "Node.js is a JavaScript runtime that allows you to run JavaScript code server-side. It's known for its non-blocking, event-driven architecture.",
      creatorId: "603d9f6baf129d4567bcd124", // Example User ObjectId (replace with actual ObjectId)
      status: "Pending",
    },
    {
      _id:"12",
      title: "JavaScript Best Practices",
      content: "There are several best practices to follow when writing JavaScript, such as using 'const' and 'let' over 'var', and avoiding global variables.",
      creatorId: "603d9f6baf129d4567bcd125", // Example User ObjectId (replace with actual ObjectId)
      status: "Rejected",
    }
  ];
  