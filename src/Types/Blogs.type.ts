export interface BlogProps {
    id: string|number;
    title: string;
    content: string;
    creatorId: string;
    category: string;
    tags: string[];
    status: string;
    createdAt: string;
}