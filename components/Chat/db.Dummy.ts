// Dummy data for the 'product' table
export const products = [
    {
        Product_ID: "1",
        Seller: "101",
        Total_Quantity_Available: 50,
        Product_Name: 'Smartphone XYZ',
        Description: 'High-end smartphone with advanced features.',
        Price: 799.99,
        Images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
        Category: ['Electronics', 'Mobile'],
        expires_in: new Date('2024-12-31T23:59:59'),
        is_archived: false,
        Created_Timestamp: new Date(),
        Updated_Timestamp: new Date(),
    },
];

// Dummy data for the 'user' table
export const users = [
    {
        User_ID: "101",
        First_Name: 'John',
        Last_Name: 'Doe',
        Password: 'securepassword',
        Phone_Number: '123-456-7890',
        Avatar: 'https://example.com/avatar.jpg',
        Email: 'john.doe@example.com',
        Chat_IDs: [1, 2],
        Owned_Products: [1],
        address: '123 Main St, City',
        Ordered_Products: [1],
    },
];

// Dummy data for the 'order' table
export const orders = [
    {
        Order_ID: "1",
        User: "101",
        Products_in_Order: [{ Product_ID: 1, Quantity: 2 }],
        Total_Amount: 1599.98,
        Status: 'pending',
        Hostel_no: 42,
        Created_Timestamp: new Date(),
        Updated_Timestamp: new Date(),
    },
];

// Dummy data for the 'chat' table
export const chats = [
    {
        Chat_ID: "1",
        Seller: "101",
        Buyer: "102",
        productId: "1",
        Messages: [
            { Sender: 101, Message: 'Hi there!', Timestamp: new Date() },
            { Sender: 102, Message: 'Hello!', Timestamp: new Date() },
        ],
        Created_Timestamp: new Date(),
        Updated_Timestamp: new Date(),
    },
];
