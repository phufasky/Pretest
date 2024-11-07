import prisma from "../utils/db";
import { revalidatePath } from "next/cache";

export default async function Page() {
    let data = [];

    try {
        data = await prisma.todo.findMany();
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    async function createTask(formData: FormData) {
        "use server";

        try {
            const title = formData.get("name") as string;
            const brand = formData.get("brand") as string;
            const price = formData.get("price") as string;

            if (!title || !brand || !price) {
                throw new Error("All fields are required");
            }

            await prisma.todo.create({ data: { title, brand, price } });
            revalidatePath('/simple_db');
        } catch (error) {
            console.error("Error creating task:", error);
        }
    }

    return (
        <div>
            <h1>Sample DB</h1>
            <div>
                {data.length > 0 ? (
                    data.map((item) => (
                        <div key={item.id}>
                            {item.title} : {item.done ? "Yes" : "No"}
                        </div>
                    ))
                ) : (
                    <p>No tasks available.</p>
                )}
            </div>

            <hr />
            <div>
                <h2>Add task</h2>
                <form action={createTask} method="post">
                    <input
                        className="border-2 border-black"
                        type="text"
                        name="name"
                        placeholder="Title"
                        required
                    />
                    <input
                        className="border-2 border-black"
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        required
                    />
                    <input
                        className="border-2 border-black"
                        type="text"
                        name="price"
                        placeholder="Price"
                        required
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
}
