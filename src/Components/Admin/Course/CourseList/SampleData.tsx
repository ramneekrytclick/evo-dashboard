export const sampleCoursesData = [
    {
        id: 1,
        courseName: "Full Stack Web Development",
        category: "Technology",
        subcategory: "Frontend Development",
        description: "Learn to build full-stack web applications using the MERN stack.",
        duration: "6 Months",
        mentorAssigned: "John Doe",
        managerAssigned: "Sarah Connor",
        batchesAvailable: [
            { id: 101, name: "Batch A", startDate: "2025-02-01", endDate: "2025-07-31" },
            { id: 102, name: "Batch B", startDate: "2025-03-01", endDate: "2025-08-31" },
        ],
        promoCodes: [
            { code: "NEWYEAR2025", discountPercentage: 10, expiryDate: "2025-01-31" },
            { code: "SUMMER25", discountPercentage: 15, expiryDate: "2025-06-30" },
        ],
        price: 50000,
    },
    {
        id: 2,
        courseName: "Digital Marketing Mastery",
        category: "Marketing",
        subcategory: "SEO",
        description: "Learn the art of digital marketing and website optimization.",
        duration: "3 Months",
        mentorAssigned: "Jane Smith",
        managerAssigned: "David Williams",
        batchesAvailable: [
            { id: 201, name: "Batch C", startDate: "2025-03-15", endDate: "2025-06-14" },
        ],
        promoCodes: [
            { code: "STUDENT50", discountPercentage: 50, expiryDate: "2025-04-30" },
        ],
        price: 30000,
    },
    {
        id: 3,
        courseName: "Data Science Essentials",
        category: "Data Analysis",
        subcategory: "Machine Learning",
        description: "Get hands-on with data analysis and machine learning techniques.",
        duration: "1 Year",
        mentorAssigned: "Alice Brown",
        managerAssigned: "Emily Johnson",
        batchesAvailable: [
            { id: 301, name: "Batch D", startDate: "2025-01-15", endDate: "2025-12-31" },
        ],
        promoCodes: [
            { code: "FREESHIP", discountPercentage: 0, expiryDate: "2025-12-31" },
        ],
        price: 60000,
    },
];